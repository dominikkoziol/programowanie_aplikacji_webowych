var Drumkit = /** @class */ (function () {
    function Drumkit() {
        this.appStart();
    }
    Drumkit.prototype.appStart = function () {
        var _this = this;
        this.setSounds();
        this.setDivs();
        this.setChanels();
        document.addEventListener("keydown", function (event) { _this.onKeyDown(event); });
        var chanel1 = document.querySelector("#chanel-1");
        chanel1.addEventListener("click", function () { _this.playChanel1(); });
    };
    Drumkit.prototype.recordChanel1 = function () {
    };
    Drumkit.prototype.onKeyDown = function (event) {
        var key = event.key;
        // var timeFromBegin = event.timeStamp;
        var time = event.timeStamp;
        this.chanel1.push({ key: key, time: time });
        this.playSound(key);
    };
    Drumkit.prototype.playSound = function (key) {
        var div = this.divDictionary[key];
        div.style.backgroundColor = "#44fb38";
        var audio = this.soundsDictionary[key];
        audio.currentTime = 0;
        audio.play();
        setTimeout(function () { return div.style.backgroundColor = "#efefef"; }, 300);
    };
    Drumkit.prototype.setSounds = function () {
        var matches = document.querySelectorAll("audio[data-song]");
        console.log(matches);
        this.soundsDictionary = {
            "q": matches[0],
            "w": matches[1],
            "e": matches[2],
            "r": matches[3],
            "t": matches[4],
            "y": matches[5],
            "u": matches[6],
            "i": matches[7],
            "o": matches[8]
        };
    };
    Drumkit.prototype.setDivs = function () {
        this.divDictionary = {
            "q": document.querySelector("#q"),
            "w": document.querySelector("#w"),
            "e": document.querySelector("#e"),
            "r": document.querySelector("#r"),
            "t": document.querySelector("#t"),
            "y": document.querySelector("#y"),
            "u": document.querySelector("#u"),
            "i": document.querySelector("#i"),
            "o": document.querySelector("#o")
        };
    };
    Drumkit.prototype.playChanel1 = function () {
        var _this = this;
        console.log(this.chanel1);
        this.chanel1.forEach(function (element) {
            setTimeout(function () { return _this.playSound(element.key); }, element.time);
        });
    };
    Drumkit.prototype.setChanels = function () {
        this.chanel1 = [];
        this.chanel2 = [];
        this.chanel3 = [];
        this.chanel4 = [];
    };
    return Drumkit;
}());
var Chanel = /** @class */ (function () {
    function Chanel() {
    }
    return Chanel;
}());
var app = new Drumkit();
