import { App } from "../src";
import Note from "../src/models/note";

describe("Test sort pinned", () => {
        let sorted: Note[] = [];

    beforeAll(() => {
        const notesMock: Note[] = [new Note({isPinned: false}), new Note({isPinned: true}), new Note({isPinned: false}), new Note({isPinned: false}), new Note({isPinned: false})];
        sorted = sort(notesMock);
    })

    it('Is first note pinned true?', () => {
        expect(sorted[0].isPinned).toBeTruthy();
    });

    
     function sort (notes: Note[]): Note[] {
       return notes.sort((el1: Note, el2: Note) =>  (el1.isPinned === el2.isPinned)? 0 : el1.isPinned? -1 : 1);
     }
});