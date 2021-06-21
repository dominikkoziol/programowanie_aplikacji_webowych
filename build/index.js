System.register("config", [], function (exports_1, context_1) {
    "use strict";
    var config;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("config", config = {
                usingLocalStorage: true,
                firebaseConfig: {}
            });
        }
    };
});
System.register("models/note", [], function (exports_2, context_2) {
    "use strict";
    var Note;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [],
        execute: function () {
            Note = (function () {
                function Note() {
                    this.id = '';
                    this.title = '';
                    this.color = '';
                    this.isPinned = false;
                }
                return Note;
            }());
            exports_2("default", Note);
        }
    };
});
System.register("services/storage/IAppStorage", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("services/storage/firebase/FirebaseService", [], function (exports_4, context_4) {
    "use strict";
    var FirebaseService;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            FirebaseService = (function () {
                function FirebaseService() {
                }
                FirebaseService.prototype.save = function (note) {
                    throw new Error("Method not implemented.");
                };
                FirebaseService.prototype["delete"] = function (id) {
                    throw new Error("Method not implemented.");
                };
                FirebaseService.prototype.getNote = function (id) {
                    throw new Error("Method not implemented.");
                };
                FirebaseService.prototype.getNotes = function () {
                    throw new Error("Method not implemented.");
                };
                return FirebaseService;
            }());
            exports_4("default", FirebaseService);
        }
    };
});
System.register("services/storage/localStorage/LocalStorageService", [], function (exports_5, context_5) {
    "use strict";
    var LocalStorageService;
    var __moduleName = context_5 && context_5.id;
    return {
        setters: [],
        execute: function () {
            LocalStorageService = (function () {
                function LocalStorageService() {
                }
                LocalStorageService.prototype.save = function (note) {
                    throw new Error("Method not implemented.");
                };
                LocalStorageService.prototype["delete"] = function (id) {
                    throw new Error("Method not implemented.");
                };
                LocalStorageService.prototype.getNote = function (id) {
                    throw new Error("Method not implemented.");
                };
                LocalStorageService.prototype.getNotes = function () {
                    throw new Error("Method not implemented.");
                };
                return LocalStorageService;
            }());
            exports_5("default", LocalStorageService);
        }
    };
});
System.register("index", ["config", "services/storage/firebase/FirebaseService", "services/storage/localStorage/LocalStorageService"], function (exports_6, context_6) {
    "use strict";
    var config_1, FirebaseService_1, LocalStorageService_1, App;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (config_1_1) {
                config_1 = config_1_1;
            },
            function (FirebaseService_1_1) {
                FirebaseService_1 = FirebaseService_1_1;
            },
            function (LocalStorageService_1_1) {
                LocalStorageService_1 = LocalStorageService_1_1;
            }
        ],
        execute: function () {
            App = (function () {
                function App() {
                    this._init();
                }
                App.prototype._init = function () {
                    this._storage = config_1.config.usingLocalStorage ? new LocalStorageService_1["default"]() : new FirebaseService_1["default"]();
                };
                return App;
            }());
        }
    };
});
//# sourceMappingURL=index.js.map