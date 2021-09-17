import { config } from './config';
import FirebaseService from './services/storage/firebase/FirebaseService';
import IAppStorage from './services/storage/IAppStorage';
import LocalStorageService from './services/storage/localStorage/LocalStorageService';
import { UserInterface } from './UserInterface';

import "./style.scss";
import Note from './models/note';

const defaultColor: string = "#F79862";
export class App {
    private _storage?: IAppStorage;
    private _ui: UserInterface = new UserInterface();
    private _isNotificationPermitted: boolean = false;
    constructor() {
        this._init();
    }


    private _init(): void {
        this._initStorage();
        this._requestNotification();
        this._getNotes();
        this._addEventListiners();
    }

    private _noteHTML = {
        title: (document.querySelector("#title") as HTMLInputElement),
        content: (document.querySelector("#content") as HTMLTextAreaElement),
        reminderOn: document.querySelector("#reminder") as HTMLInputElement,
        color: document.querySelector("#color") as HTMLSelectElement,
        id: ''
    }

    private _addEventListiners() {
        document.querySelector("#add-button").addEventListener("click", () => {
            this._ui.manageAddFormVisibility(true);
        });

        document.querySelector("#note-form-close").addEventListener("click", () => {
            this._getNotes();
            this._ui.manageAddFormVisibility(false);
            this._clearForm();
        });

        

        document.querySelector("#submit-new-note").addEventListener("click", () => {
            const note = new Note();
            note.title = this._noteHTML.title.value;
            note.content = this._noteHTML.content.value;
            note.reminderOn = new Date(this._noteHTML.reminderOn.value);
            note.color = this._noteHTML.color.options[this._noteHTML.color.options.selectedIndex].value ?? defaultColor;
            note.id = this._noteHTML.id;

            if (note.title && note.content) {
                !note.id ? this._storage.save(note) : this._storage.update(note);
           
                if (!isNaN(note.reminderOn.getTime())) {
                    setTimeout(() => {
                        new Notification(note.title);
                    }, (note.reminderOn.getTime() - Date.now()));
                }

                this._clearForm();
            }
        })
    }

    private _initStorage(): void { this._storage = config.usingLocalStorage ? new LocalStorageService() : new FirebaseService(); }

    private async _getNotes(): Promise<void> {
        this._ui.clearNotes();
        const notes = this._sort(await this._storage.getNotes());
        notes.forEach((n, i) => {
           const note = this._ui.generateNote(n, i);

           note.addEventListener("click", async () => {
               
               var note = await this._storage.getNote(n.id);
               this._noteHTML.color.value = note.color;
               this._noteHTML.content.value = note.content;
               this._noteHTML.reminderOn.value = (<any>note.reminderOn);
               this._noteHTML.title.value = note.title;
               this._noteHTML.id = note.id;


               this._ui.manageAddFormVisibility(true);
           })
            document.getElementById(`close-${i}`).addEventListener('click', () => this._removeNote(n.id));

            if (this._isNotificationPermitted && n.reminderOn) {
                if (n.reminderOn.getTime() > Date.now()) {
                    setTimeout(() => {
                        new Notification(n.title);
                    }, (n.reminderOn.getTime() - Date.now()));

                }
            }

            document.querySelector(`#pin-${i}`).addEventListener("click", async () => {
                await this._storage.updatePin(n);
                this._ui.changePinColor(i, n.isPinned);
                this._getNotes();
            });

        });
    }


    private _requestNotification() {
        Notification.requestPermission().then(permissions => {
            this._isNotificationPermitted = permissions == "granted" ? true : false;
        });
    }

    private _removeNote(id: string) {
        this._storage.delete(id);
        const note = document.querySelector(`[data-id="${id}"]`);
        note.parentElement.removeChild(note);
    }


    private _clearForm(): void {
        this._noteHTML.color.value = null;
        this._noteHTML.content.value = null;
        this._noteHTML.reminderOn.value = null;
        this._noteHTML.title.value = null;
        this._noteHTML.id = null;
    }

     private _sort = (notes: Note[]): Note[] => notes.sort((el1: Note, el2: Note) =>  (el1.isPinned === el2.isPinned)? 0 : el1.isPinned? -1 : 1);
     
    
}

const app = new App();