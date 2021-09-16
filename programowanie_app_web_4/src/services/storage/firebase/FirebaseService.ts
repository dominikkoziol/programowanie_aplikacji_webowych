import Note from "../../../models/note";
import IAppStorage from "../IAppStorage";
import Firebase from 'firebase';
import { config } from "../../../config";
import { generate } from 'shortid';
const collection: string = "notes";
export default class FirebaseService implements IAppStorage {
    private readonly _db: Firebase.firestore.Firestore;
    
    constructor() {
        const firebaseApp = Firebase.initializeApp(config.firebaseConfig);
        this._db = firebaseApp.firestore();
    }
 


    async save(note: Note): Promise<void> {
        note.createdOn = new Date();
        await this._db.collection(collection).add({ ...note });
    }
    
    delete(id: string): void { 
        this._db.collection(collection).doc(id).delete();
        // this._db.
    }

    async getNote(id: string): Promise<Note> {
        const response = await this._db.collection(collection).doc(id).get();
        const note: Note = new Note(response.data());
        note.id = response.id;

        return note;
    }

    async getNotes(): Promise<Note[]> {
        const response = await this._db.collection(collection).get();
        const notes: Note[] = response.docs.map(d => {
            const note = new Note(d.data())
            note.id = d.id;
            return note;
        });

        return notes;
    }


    async updatePin(note: Note): Promise<void> {
        note.isPinned = !note.isPinned;
        await this._db.collection('notes').doc(note.id).set({ ...note });   
    }


}