import { config } from "../src/config";
import FirebaseService from "../src/services/storage/firebase/FirebaseService";
import IAppStorage from "../src/services/storage/IAppStorage";
import LocalStorageService from "../src/services/storage/localStorage/LocalStorageService";

describe("Test get note", () =>{
    const storage: IAppStorage = config.usingLocalStorage ? new LocalStorageService() : new FirebaseService();;


    it("Get storage", async ()=> {
        const getItems = await storage.getNotes();
        expect(getItems.length).toBeGreaterThanOrEqual(0);
    })
});