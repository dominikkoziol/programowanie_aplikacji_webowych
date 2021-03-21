var Drumkit = /** @class */ (function () {
    function Drumkit() {
        this.appStart();
    }
    Drumkit.prototype.appStart = function () {
        var _this = this;
        this.setSounds();
        this.setChanels();
        document.addEventListener("keydown", function (event) { _this.onKeyDown(event); });
        var chanel1 = document.querySelector("#chanel-1");
        chanel1.addEventListener("click", function () { _this.playChanel1(); });
    };
    Drumkit.prototype.onKeyDown = function (event) {
        console.log(event);
        var key = event.key;
        var time = event.timeStamp;
        this.chanel1.push({ key: key, time: time });
        this.playSound(key);
    };
    Drumkit.prototype.playSound = function (key) {
        var audio = this.soundsDictionary[key];
        audio.currentTime = 0;
        audio.play();
    };
    Drumkit.prototype.setSounds = function () {
        this.soundsDictionary = {
            "q": new Audio('./assets/sounds/hihat.wav'),
            "w": new Audio('./assets/sounds/boom.wav'),
            "e": new Audio('./assets/sounds/clap.wav'),
            "r": new Audio('./assets/sounds/kick.wav'),
            "t": new Audio('./assets/sounds/openhat.wav'),
            "y": new Audio('./assets/sounds/ride.wav'),
            "u": new Audio('./assets/sounds/snare.wav'),
            "i": new Audio('./assets/sounds/tink.wav'),
            "o": new Audio('./assets/sounds/tom.wav')
        };
    };
    Drumkit.prototype.playChanel1 = function () {
        var _this = this;
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
