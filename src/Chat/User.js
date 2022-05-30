const { v4: uuidv4 } = require("uuid");

class User {
  constructor(id, name, status, type, image) {
    this.id = id;
    this.name = name;
    this.status = "active" || "failed";
    this.type = type;
    this.image = image;
  }
}
class UserAcc extends User {
  constructor(name, status,type, image, posts = {}) {
    super(name, status, type, image);
    this.id = uuidv4();
    this.name = name;
    this.posts = posts;
    this.status = "active" || "failed";
    this.type = "user";
    this.image = "https://w7.pngwing.com/pngs/627/693/png-transparent-computer-icons-user-user-icon.png";
  }
}

class Post {
  constructor(object ){
    const{author, type,created, message} = object;
    this.id = uuidv4();
    this.author = author;
    this.type = type;
    this.created = created;
    this.message = message;
  } 
}
module.exports = {
  User,
  UserAcc,
  Post
};
