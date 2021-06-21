import Note from "../../../models/note";
import IAppStorage from "../IAppStorage";

export default class LocalStorageService implements IAppStorage {
    save(note: Note) {
        throw new Error("Method not implemented.");
    }
    delete(id: string) {
        throw new Error("Method not implemented.");
    }
    getNote(id: string): Note {
        throw new Error("Method not implemented.");
    }
    getNotes(): Note[] {
        throw new Error("Method not implemented.");
    }

}