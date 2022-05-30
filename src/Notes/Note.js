const { v4: uuidv4 } = require("uuid");

class Note {
  constructor(description) {
    this.id = uuidv4();

    this.status = false;
    this.created = new Date().toLocaleString();
    this.description = description;
  }
}

module.exports = {
  Note,
};
