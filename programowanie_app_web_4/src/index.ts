import { config } from './config';
import FirebaseService from './services/storage/firebase/FirebaseService';
import IAppStorage from './services/storage/IAppStorage';
import LocalStorageService from './services/storage/localStorage/LocalStorageService';



class App {
    private _storage: IAppStorage;
    
    constructor() {
        this._init();
    }


    private _init(): void {
        this._storage = config.usingLocalStorage ? new LocalStorageService() : new FirebaseService();
    }
}