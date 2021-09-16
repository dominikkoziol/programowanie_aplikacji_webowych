import Note from "./models/note";

const icons = {
    close: "close"
}

export class UserInterface {
    private _notesWrapper: HTMLElement = document.getElementById("notes-wrapper");
    private _manageFormWrapper: HTMLElement = document.querySelector("#add-note-wrapper");
    public generateNote(note: Note, index: number) {
        const noteWrapper = document.createElement("div");
        const title = document.createElement("h3");
        const content = document.createElement("p");
        const date = document.createElement("span");
        const close = document.createElement("button");
        const closeIcon = document.createElement("span");
        const pinButton = document.createElement("button");
        const pinIcon = document.createElement("span");


        close.id = `close-${index}`;
        
        pinButton.id = `pin-${index}`;
        pinButton.classList.add("pin");
        pinIcon.classList.add("material-icons");
        pinIcon.innerText = "push_pin";
        if(note.isPinned) pinIcon.style.color = "#0037ff";
        pinButton.appendChild(pinIcon);

        noteWrapper.setAttribute("data-id", note.id);
        
        close.appendChild(closeIcon);
        closeIcon.innerHTML = icons.close;
        closeIcon.classList.add("material-icons")
        
        title.innerText = note.title;
        content.innerText = note.content;
        noteWrapper.style.background = note.color;

        date.innerText = `Created on: ${ this._parseDate(note.createdOn) }`;

        if(note.reminderOn) {
            const remindDate = document.createElement("span");
            remindDate.innerText = `Reminder on: ${this._parseDate(note.reminderOn)}`
            noteWrapper.appendChild(remindDate);
        }

        noteWrapper.classList.add("note");
        noteWrapper.appendChild(close);
        noteWrapper.appendChild(title);
        noteWrapper.appendChild(date);
        noteWrapper.appendChild(content);
        noteWrapper.appendChild(pinButton);
        this._notesWrapper.appendChild(noteWrapper);
    }

    public clearNotes() {
        this._notesWrapper.innerHTML = "";
    }

    // i, n.isPinned
    public changePinColor(index: number, isPinned: boolean) {
        document.querySelector(`#pin-${index}`);
    }

    public manageAddFormVisibility(show: boolean): void {
        this._manageFormWrapper.style.display= show ? "flex " : "none"
    }


    private _parseDate(date: Date) {
        const date2 = new Date(date);
        const mm = date2.getMonth() + 1; // getMonth() is zero-based
        const dd = date2.getDate();

        return [date2.getFullYear(),
            "-",
        (mm > 9 ? '' : '0') + mm,
            "-",
        (dd > 9 ? '' : '0') + dd
        ].join('');
    }

}

