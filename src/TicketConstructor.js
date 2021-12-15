const { Ticket, TicketFull } = require("./Ticket");

class TicketConstructor {
  constructor(ticketsArr) {
    this.ticketsArr = ticketsArr; //это массив тикетов
  }
  allTickets() {
    return this.ticketsArr.map((elem) => new Ticket(elem));
  }

  getStartedTickets() {
    const ticket1 = new TicketFull(
     "name",
      
      new Date().toLocaleString(),
      "description"
    );
    const ticket2 = new TicketFull(
      "name2",
      
      new Date().toLocaleString(),
      "description2"
    );
    this.ticketsArr = [ticket1, ticket2];
    return this.ticketsArr;
  }

  createTicket(name, description) {
    const ticket = new TicketFull(
      name,
      new Date().toLocaleString(),
      description
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
