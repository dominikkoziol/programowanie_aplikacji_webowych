class Drumkit {
    chanel1: Chanel[];
    chanel2: Chanel[];
    chanel3: Chanel[];
    chanel4: Chanel[];
    soundsDictionary: { [key: string]: HTMLAudioElement };
    divDictionary: { [char: string]: HTMLElement };
    constructor() {
        this.appStart();
    }

    appStart(): void {
        this.setSounds();
        this.setDivs();
        this.setChanels();
        document.addEventListener("keydown", (event: KeyboardEvent) => { this.onKeyDown(event) });
        const chanel1 = document.querySelector("#chanel-1");
        chanel1.addEventListener("click", () => { this.playChanel1() });

    }

    public recordChanel1() {

    }

    onKeyDown(event: KeyboardEvent): void {
        var key = event.key;
        // var timeFromBegin = event.timeStamp;
        var time = event.timeStamp;
        this.chanel1.push({ key, time });
        this.playSound(key);
    }

    playSound(key: string): void {
       
        var div = this.divDictionary[key];
        div.style.backgroundColor = "#44fb38";
        var audio = this.soundsDictionary[key];
        audio.currentTime = 0
        audio.play();
        setTimeout(() => div.style.backgroundColor = "#efefef", 300)
        
    }

    setSounds(): void {
        var matches: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio[data-song]");
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
            "o": matches[8],

        }
    }
    setDivs(): void {
        this.divDictionary = {
            "q": document.querySelector("#q"),
            "w": document.querySelector("#w"),
            "e": document.querySelector("#e"),
            "r": document.querySelector("#r"),
            "t": document.querySelector("#t"),
            "y": document.querySelector("#y"),
            "u": document.querySelector("#u"),
            "i": document.querySelector("#i"),
            "o": document.querySelector("#o"),

        }
    }

    playChanel1(): void {
        console.log(this.chanel1)
        this.chanel1.forEach(element => {
            setTimeout(() => this.playSound(element.key), element.time)
        });
    }

    setChanels(): void {
        this.chanel1 = [];
        this.chanel2 = [];
        this.chanel3 = [];
        this.chanel4 = [];
    }

}
class Chanel {
    key: string;
    time: number;
    //timeFromBegin: number;
}


var app = new Drumkit();


