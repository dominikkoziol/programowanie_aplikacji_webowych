import Note from "../../models/note";

export default interface IAppStorage {
    save(note: Note): void;
    delete(id: string): void;
    getNote(id: string): Promise<Note>;
    getNotes(): Promise<Note[]>;
    updatePin(note: Note): Promise<void>;
}