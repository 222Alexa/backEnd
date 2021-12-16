
const { v4: uuidv4 } = require("uuid");
const { Ticket, TicketFull } = require("./Ticket");

class TicketConstructor {
  constructor() {
    this.ticketsArr = []; //это массив тикетов
  }
  allTickets() {
    return this.ticketsArr.map(elem => new Ticket(elem.id, elem.name, elem.status, elem.created));
  }

  getStartedTickets() {
    const ticket1 = new TicketFull(
     "name","description");

    this.ticketsArr.push(ticket1);
    return this.ticketsArr;
  }
  
  createTicket(object) {
    const ticket = new TicketFull(
     
      object.name,
      
      object.description
    );

    this.ticketsArr.push(ticket);

    return this.allTickets();
  }

  getIndexId(id) {
    const index = this.ticketsArr.findIndex((elem) => elem.id === id);
    return index;
  }

  getTicketById(id) {
    const index = this.getIndexId(id);
    return index;
  }

  deleteTicket(id) {
    const item = this.getIndexId(id);
    return !!this.ticketsArr.splice(item, 1);
  }
}
module.exports = TicketConstructor;