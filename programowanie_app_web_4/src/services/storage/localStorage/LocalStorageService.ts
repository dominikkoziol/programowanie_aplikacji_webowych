import { throws } from "assert/strict";
import { generate } from "shortid";
import Note from "../../../models/note";
import IAppStorage from "../IAppStorage";

export default class LocalStorageService implements IAppStorage {
    private _notes: Note[] = [];

    constructor() {
        this._notes = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d)) ?? [];

    }
    async update(note: Note): Promise<void> {
        const notes: Note[] = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d)) ?? [];
        var newNotes = notes.filter(q =>  q.id != note.id );       
        newNotes.push(note);     
        localStorage.setItem("notes", JSON.stringify(newNotes));
    }
    async updatePin(note: Note): Promise<void> {
        const notes: Note[] = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d)) ?? [];
        var newNotes = notes.filter(q =>  q.id != note.id );       
        note.isPinned = !note.isPinned;
        newNotes.push(note);     
        localStorage.setItem("notes", JSON.stringify(newNotes));
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
        return Promise.resolve().then(() => this._notes.find(q => q.id == id));
    }

    getNotes(): Promise<Note[]> {
        this._notes = JSON.parse(localStorage.getItem("notes")).map((d: Note) => new Note(d));
        return Promise.resolve().then(() => {
            return this._notes;
        });
    }

}