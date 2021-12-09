class Ticket {
    constructor({ id, name, status, created }) {
       this.id = id;
       this.name = name;
       this.status = status;
       this.created = created;
    }
 }
 
 class TicketFull extends Ticket {
    constructor({ id, name, status, created, description }) {
       super({ id, name, status, created });
       this.description = description;
    }
 }
 
 module.exports = {
    Ticket,
    TicketFull,
 };