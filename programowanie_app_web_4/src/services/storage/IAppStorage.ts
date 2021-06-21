import Note from "../../models/note";

export default interface IAppStorage {
    save(note: Note): void;
    delete(id: string): void;
    getNote(id: string): Note;
    getNotes(): Note[];
}