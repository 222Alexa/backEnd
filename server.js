const http = require("http");
const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const Router = require("koa-router");
const router = new Router();

const WS = require("ws");

const { v4: uuidv4 } = require("uuid");
const { UserConstructor } = require("./src/Chat/UserConstructor");
const ctrl = new UserConstructor();
const { User, UserAcc, Post } = require("./src/Chat/User");

/**CRUD */

const NotesConstructor = require("./src/Notes/NotesConstructor");
const notesCstr = new NotesConstructor();
notesCstr.getStartedNotes();

/**CRUD */

const user = new User(
  uuidv4(),
  "John Doe",
  "active",
  "user",
  "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png"
);

const postData = {
  author: "John Doe",
  type: "message",
  created: "20.01.2022, 15:30:22",
  message: "Hello!",
};
const post = new Post(postData);

ctrl.usersArr.push(user);
ctrl.postsList.push(post);

const app = new Koa();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app.callback());

/**/

app.use(cors());

app.use(koaBody({ text: true, urlencoded: true, json: true, multipart: true }));

app.use(async (ctx, next) => {
  const origin = ctx.request.get("Origin");
  if (!origin) {
    return await next();
  }

  const headers = { "Access-Control-Allow-Origin": "*" }; //сервер может быть вызван из любого источника
  if (ctx.request.method !== "OPTIONS") {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }
  if (ctx.request.get("Access-Control-Request-Method")) {
    ctx.response.set({
      ...headers,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH",
    });
    if (ctx.request.get("Access-Control-Request-Headers")) {
      ctx.response.set(
        "Access-Control-Allow-Headers",
        ctx.request.get("Access-Control-Allow-Request-Headers")
      );
    }
    ctx.response.status = 204; // No content
  }
});

app.use(async (ctx) => {
  const { method, id } = ctx.request.query;

  switch (method) {
    /**CRUD RA-LifeCicle */

    case "getStartedNotes":
      try {
        const result = notesCstr.getStartedNotes(); //test
        console.log(result, "start");
        ctx.response.body = result;
        return;
      } catch (err) {
        console.error(err);
      }

    case "createNotes":
      try {
        const object = ctx.request.body;

        ctx.response.body = notesCstr.createNote(object);
      } catch (err) {
        console.error(err);
      }
      return;

    case "getAllNotes":
      try {
        ctx.response.body = notesCstr.allNotes();
        console.log(ctx.response.body, "getAllNotes");
      } catch (err) {
        console.error(err);
      }
      return;

    case "deleteNote":
      try {
        ctx.response.body = notesCstr.deleteNote(id);
      } catch (err) {
        console.error(err);
      }
      return;

    default:
      ctx.response.body = `Method "${method}" is not known.`;
      ctx.response.status = 404;
      return;
  }
});

/*WebSockets Chat-RA-Lifecycle*/

const wsServer = new WS.Server({ server });

wsServer.on("connection", (ws, req) => {
  console.log("connection");

  const clients = ctrl.getActiveUsers();
  console.log(clients, "CLIENTS!!!!!");

  [...wsServer.clients]
    .filter((o) => {
      return o.readyState === WS.OPEN;
    })
    .forEach((o) =>
      o.send(
        JSON.stringify({
          type: "connect",
          users: ctrl.getActiveUsers(),
          posts: ctrl.postsList,
        })
      )
    );

  ws.on("message", (msg) => {
    const post = JSON.parse(msg);

    if (post.type === "message") {
      console.log(post, "postUser!!!!!!!!!!");
      ctrl.createData(post);
      console.log(ctrl.postsList, "ctrl.postsList");

      [...wsServer.clients]
        .filter((o) => {
          return o.readyState === WS.OPEN;
        })
        .forEach((o) =>
          o.send(JSON.stringify({ type: "message", messages: ctrl.postsList }))
        );
    }
    if (post.type === "add") {
      ctrl.createData(post);

      [...wsServer.clients]
        .filter((o) => {
          return o.readyState === WS.OPEN;
        })
        .forEach((o) => {
          o.send(JSON.stringify({ type: "add", users: ctrl.getActiveUsers() }));
        });
    }
    if (post.type === "exit") {
      const userDel = clients.findIndex((elem) => elem.id === post.id);
      clients.splice(userDel, 1);

      const userInactive = ctrl.getIndexId(ctrl.usersArr, post.id);
      ctrl.usersArr[userInactive].status = "inactive";

      [...wsServer.clients]
        .filter((o) => {
          return o.readyState === WS.OPEN;
        })
        .forEach((o) =>
          o.send(
            JSON.stringify({
              type: "exit",
              id: post.id,
              users: ctrl.getActiveUsers(),
            })
          )
        );
    }
  });
  ws.on("close", (msg) => {
    console.log("close");

    console.log(clients, "clientsExit");
    const userID = JSON.parse(msg);
    [...wsServer.clients]
      .filter((o) => {
        return o.readyState === WS.OPEN;
      })
      .forEach((o) => o.send(JSON.stringify(clients)));
    ws.close(1000, "disconnect");
  });
});
server.listen(PORT, () =>
  console.log(`Koa server has been started on port ${PORT} ...`)
);

/*app.listen(PORT, () =>
  console.log(`Koa server has been started on port ${PORT} ...`)
);*/
