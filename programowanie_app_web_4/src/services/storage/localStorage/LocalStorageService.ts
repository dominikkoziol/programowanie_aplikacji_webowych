import { generate } from "shortid";
import Note from "../../../models/note";
import IAppStorage from "../IAppStorage";

export default class LocalStorageService implements IAppStorage {
    updatePin(note: Note): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(note: Note) {
        note.id = generate();
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }
    getNote(id: string): Promise<Note> {
        throw new Error("Method not implemented.");
    }
    getNotes(): Promise<Note[]> {
        throw new Error("Method not implemented.");
    }

}