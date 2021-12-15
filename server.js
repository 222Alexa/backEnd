const Koa = require("koa");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const Router = require("koa-router");
const { v4: uuidv4 } = require('uuid');
const TicketConstructor = require("./src/TicketConstructor");
const ticketList = [];
const ctrl = new TicketConstructor(ticketList);
const { Ticket, TicketFull } = require("./src/Ticket");

const app = new Koa();
const PORT = process.env.PORT || 8000;
let router = new Router(); //Instantiate the router

app.use(cors());
app.use(koaBody({ text: true, urlencoded: true, json: true, multipart: true }));



app.use(async (ctx, next) => {
  const origin = ctx.request.get("Origin");
  if (!origin) {
    return await next();
  }
  const headers = { "Access-Control-Allow-Origin": "*" };
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
app.use(router.routes()).use(router.allowedMethods());

app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
  switch (method) {
    case "getStartedTickets":
      try {
        const result = ctrl.getStartedTickets()
        ctx.response.body = result;
        return;
      } catch (err) {
        console.error(err);
      }
    case "allTickets":
      try {
        const result = ctrl.allTickets();
        ctx.response.body = result;
        console.log(result)
      } catch (err) {
        console.error(err);
      }
      return;
    case "createTicket":
      try {
        const { name, description } = ctx.request.body;
        const result = ctrl.createTicket(name, description);
        ctx.response.body = result;
      } catch (err) {
        console.error(err);
      }
      return;
    case "getTicketById":
      try {
        const result = ctrl.getTicketById(id);
        ctx.response.bode = result;
      } catch (err) {
        console.error(err);
      }
      return;

    case "deleteTicket":
      try {
        const result = ctrl.deleteTicket(id);
        ctx.response.bode = result;
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

app.listen(PORT, () =>
  console.log(`Koa server has been started on port ${PORT} ...`)
);
