import { throws } from "assert/strict";
import { generate } from "shortid";
import Note from "../../../models/note";
import IAppStorage from "../IAppStorage";

export default class LocalStorageService implements IAppStorage {
    private _notes: Note[] = [];

    constructor() {
        this._notes = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d)) ?? [];
        console.log(this._notes);
    }
    updatePin(note: Note): Promise<void> {
        throw new Error("Method not implemented.");
    }
    save(note: Note) {
        note.id = generate();
        this._notes.push(note);
        localStorage.setItem("notes", JSON.stringify(this._notes))
    }

    delete(id: string) {
        this._notes = this._notes.filter(q => q.id != id);
        localStorage.setItem("notes", JSON.stringify(this._notes))
    }

    getNote(id: string): Promise<Note> {
        return new Promise(() =>this._notes.find(q => q.id == id));
    }

    getNotes(): Promise<Note[]> {
        this._notes = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d));
        return Promise.resolve().then(() => {
            return this._notes;
        });
    }

}