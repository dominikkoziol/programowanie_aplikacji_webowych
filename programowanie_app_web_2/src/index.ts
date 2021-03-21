class Drumkit {
    chanel1: Chanel[];
    chanel2: Chanel[];
    chanel3: Chanel[];
    chanel4: Chanel[];
    soundsDictionary: { [key: string]: HTMLAudioElement };
    constructor() {
        this.appStart();
    }

    appStart(): void {
        this.setSounds();
        this.setChanels();
        document.addEventListener("keydown", (event: KeyboardEvent) => { this.onKeyDown(event) });
        const chanel1 = document.querySelector("#chanel-1");
        chanel1.addEventListener("click", () => { this.playChanel1()} );
        
    }

    onKeyDown(event: KeyboardEvent): void {
        console.log(event);
        var key = event.key;
        var time = event.timeStamp;
        this.chanel1.push({ key, time });
        this.playSound(key);
    }

    playSound(key: string): void {
        var audio = this.soundsDictionary[key];
        audio.currentTime = 0
        audio.play();
    }

    setSounds(): void {
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
        }
    }

    playChanel1(): void {
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
}


var app = new Drumkit();


