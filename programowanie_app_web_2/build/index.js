var Drumkit = /** @class */ (function () {
    function Drumkit() {
        this.chanelNumber = 0;
        this.appStart();
    }
    Drumkit.prototype.appStart = function () {
        var _this = this;
        this.setSounds();
        this.setDivs();
        this.setChanels();
        document.addEventListener("keydown", function (event) { _this.onKeyDown(event); });
        this.addEventsToPlayAndRecordButtons();
    };
    Drumkit.prototype.addEventsToPlayAndRecordButtons = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var playButton = document.querySelector("[data-chanel-play=\"" + i + "\"]");
            var recordButton = document.querySelector("[data-chanel-record=\"" + i + "\"]");
            playButton.addEventListener("click", function () { return _this.playChanel(i); });
            recordButton.addEventListener("click", function () { return _this.recordChanel(i); });
        };
        for (var i = 1; i < 5; i++) {
            _loop_1(i);
        }
    };
    Drumkit.prototype.playChanel = function (chanelNumber) {
        var _this = this;
        if (this.chanelNumber) {
            this.chanelDictionary[chanelNumber].forEach(function (element) {
                setTimeout(function () { return _this.playSound(element.key); }, element.timeFromPreviousSong);
            });
        }
    };
    Drumkit.prototype.recordChanel = function (chanelNumber) {
        console.log("Recording chanel: " + chanelNumber);
        this.chanelNumber = chanelNumber;
    };
    Drumkit.prototype.onKeyDown = function (event) {
        var key = event.key;
        // var timeFromBegin = event.timeStamp;
        if (this.chanelNumber) {
            var timeFromWebsiteInit = event.timeStamp;
            var chanel = this.chanelDictionary[this.chanelNumber];
            var timeFromPreviousSong = !chanel.length ? 0 : ((timeFromWebsiteInit - chanel[chanel.length - 1].timeFromWebsiteInit) + chanel[chanel.length - 1].timeFromPreviousSong);
            chanel.push({ key: key, timeFromWebsiteInit: timeFromWebsiteInit, timeFromPreviousSong: timeFromPreviousSong });
            console.log(chanel);
        }
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
    Drumkit.prototype.setChanels = function () {
        this.chanelDictionary = {
            1: [],
            2: [],
            3: [],
            4: []
        };
    };
    return Drumkit;
}());
var RecordData = /** @class */ (function () {
    function RecordData() {
    }
    return RecordData;
}());
var app = new Drumkit();
