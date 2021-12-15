const { v4: uuidv4 } = require('uuid');

class Ticket {
    constructor( id, name, status, created) {
       this.id  = id;
       this.name = name;
       this.status = status || false;
       this.created = new Date().toLocaleString();;
       
    }
  }
  class TicketFull extends Ticket {
    constructor( id, name, status, created, description){
      super(id, name, status, created);
      this.id = uuidv4();
      this.name = name;
      this.status = status || false;
      this.created = new Date().toLocaleString();
      this.description = description || "";
    }
  }
    
 

 module.exports = {
    Ticket,TicketFull
   };