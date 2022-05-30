const { v4: uuidv4 } = require("uuid");
const { Note } = require("./Note");

class NotesConstructor {
  constructor() {
    this.notesArr = []; //это массив заметок
  }
  allNotes() {
    return this.notesArr;
  }

  getStartedNotes() {
    const fakeNotes = [
      "Как спрыгнуть с десятиметровой лестницы и не ушибиться?",
      "Почему дикобраз не может утонуть?",
      "Мышцы после долгого периода неподвижности нуждаются в мягком, но сильном напряжении, которое подготавливает их к режиму активности.",
    ];

    fakeNotes.map((el) => {
      const elem = new Note(el);
      this.notesArr.push(elem);
      console.log(this.notesArr, 'notesArr')
    });

    return this.notesArr;
  }

  createNote(value) {
    const newNote = new Note(value);

    this.notesArr.push(newNote);

    return newNote;
  }

  getIndexId(id) {
    const index = this.notesArr.findIndex((elem) => elem.id === id);
    return index;
  }

  deleteNote(id) {
    console.log(id, 'ID')
    const item = this.getIndexId(id);
    return !!this.notesArr.splice(item, 1);
  }
}
module.exports = NotesConstructor;
