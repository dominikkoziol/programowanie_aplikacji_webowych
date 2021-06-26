class Drumkit {
    chanelDictionary: { [number: number]: RecordData[] };
    soundsDictionary: { [key: string]: HTMLAudioElement };
    divDictionary: { [char: string]: HTMLElement };
    private chanelNumber: number = 0;
    constructor() {
        this.appStart();
    }

    appStart(): void {
        this.setSounds();
        this.setDivs();
        this.setChanels();
        document.addEventListener("keydown", (event: KeyboardEvent) => { this.onKeyDown(event) });
        this.addEventsToPlayAndRecordButtons();
    }

    public addEventsToPlayAndRecordButtons(): void {
        for (let i = 1; i < 5; i++) {
            const playButton: HTMLButtonElement = document.querySelector(`[data-chanel-play="${i}"]`);
            const recordButton: HTMLButtonElement = document.querySelector(`[data-chanel-record="${i}"]`);
            playButton.addEventListener("click", () => this.playChanel(i));
            recordButton.addEventListener("click", () => this.recordChanel(i))
        }

        
    }

    public playChanel(chanelNumber: number): void {
        if (this.chanelNumber) {
            this.chanelDictionary[chanelNumber].forEach(element => {
                setTimeout(() => this.playSound(element.key), element.timeFromPreviousSong)
            });
        }
    }

    public recordChanel(chanelNumber: number): void {
        console.log(`Recording chanel: ${chanelNumber}`);
        this.chanelNumber = chanelNumber;
    }

    onKeyDown(event: KeyboardEvent): void {
        const key = event.key;
        // var timeFromBegin = event.timeStamp;
        if (this.chanelNumber) {
            const timeFromWebsiteInit = event.timeStamp;
            const chanel = this.chanelDictionary[this.chanelNumber];
            const timeFromPreviousSong = !chanel.length ? 0 : ((timeFromWebsiteInit - chanel[chanel.length - 1].timeFromWebsiteInit) + chanel[chanel.length - 1].timeFromPreviousSong);
            chanel.push({ key, timeFromWebsiteInit, timeFromPreviousSong });
            console.log(chanel);
        }

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

    setChanels(): void {
        this.chanelDictionary = {
            1: [],
            2: [],
            3: [],
            4: []
        };
    }

}
class RecordData {
    key: string;
    //timeFromWebsiteInit: Is timestamp, which contains value how many miliseconds pass from website init
    timeFromWebsiteInit: number;
    //timeFromPreviousSong: Is time, which passed since previous sound (pattern: timeFromWebsiteInit[i] - timeFromWebsiteInit[i - 1] + timeFromPreviousSong[i - 1])
    timeFromPreviousSong: number;
}


var app = new Drumkit();


