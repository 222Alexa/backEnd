const { v4: uuidv4 } = require("uuid");
const { User, UserAcc, Post } = require("./User");

class UserConstructor {
  constructor() {
    this.usersArr = []; //это массив users
    this.postsList = [];
  }

  getUserByName(name) {
    const searchName = this.usersArr.findIndex((elem) => elem.name === name);
    console.log(searchName, "name");
    return searchName;
  }

  allUsers() {
    return this.usersArr;
  }

  getActiveUsers() {
    const clientsActive = [];
    this.usersArr.filter((elem) => {
      elem === elem.status;
      if (elem.status === "active") {
        clientsActive.push(elem);
      }
    });
    return clientsActive;
  }

  createData(object) {
    console.log(object, "JSON");
    //const data = JSON.parse(object);
    let result;

    object.type === "add"
      ? (result = new UserAcc(object.user))
      : (result = new Post(object));
    object.type === "add"
      ? this.usersArr.push(result)
      : this.postsList.push(result);
console.log(this.postsList, 'this.postsList7777777777777777777777777777')
    console.log(result, "userDAta");
    return result;
  }

  deleteItem(arr, id) {
    const item = this.getIndexId(arr, id);
    return arr.splice(item, 1);
  }

  deleteAllUsers() {
    return (this.usersArr = []);
  }

  getIndexId(arr, id) {
    return arr.findIndex((elem) => elem.id === id);
  }
}
module.exports = { UserConstructor };
