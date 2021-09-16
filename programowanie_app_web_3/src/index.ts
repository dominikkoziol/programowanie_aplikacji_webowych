class WeatherApp {
    private readonly API_KEY: string = "ef96327aa7b0e4dce3e88d08907eb642";
    private readonly API_URL: string = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}&units=metric`;
    private refreshInterval = null;
    private refreshTime: string
    private cities: string[] = [];
    constructor() {
        this.init();
    }

    private init(): void {
        this.addSubmitListener();
        this.getSavedCities();
    }

    public getSavedCities(): void {
        this.cities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];
        this.refreshQuickChoose();
    }

    private refreshQuickChoose() {
        const quickChooseWrapper = document.querySelector("#quick-choose");
        quickChooseWrapper.innerHTML = null;
        this.cities.forEach(c => {
            const button = document.createElement("button");
            button.classList.add("quick")
            button.innerHTML = c;

            button.addEventListener("click", async ()=> {
                const input: HTMLInputElement = document.querySelector("input[name='search-value']");
                input.value = c;

                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                    this.refreshInterval = null;
                }

                await this.searchData(c);
            })
            quickChooseWrapper.appendChild(button);
        });
    }
    private addSubmitListener(): void {
        const button = document.querySelector("#submit-search");
        button.addEventListener("click", async () => {
            const city = this.getInputValue();
            if (city) {
                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                    this.refreshInterval = null;
                }

                await this.searchData(city);
            }

            else this.showFormError("Aby wyszukać, uzupełnij pole miasto");
        });
    }

    private async searchData(city: string): Promise<void> {
        const url = this.API_URL + `&q=${city}`
        const weatherQuery = await fetch(url);
        const weatherData = weatherQuery.json();

        weatherData.then((data: WeatherAPI) => {
            if (data.cod == 200) {
                this.saveData(city);
                if(!this.refreshInterval) this.addRefreshListeners(data.name);
                this.createSuccessContainer(data);
            }

            else this.showFormError(data.cod == '404' ? 'Nie znaleziono podanego miasta' : 'Wystąpił błąd prosimy spróbować ponownie później');

        })
    }

    private showFormError(error: string) {
        this.cleanError();
        const formWrapper: HTMLDivElement = document.querySelector("#form-wrapper");
        const errorElement = document.createElement("span");
        errorElement.innerHTML = error;
        errorElement.id = "error";

        formWrapper.appendChild(errorElement);
    }

    private cleanError(): void {
        const error = document.querySelector("#error");
        if (error) error.remove();
    }

    private cleanData(): void {
        const element = document.querySelector("#data");
        if (element) element.remove();
    }

    private createSuccessContainer(data: WeatherAPI): void {
        this.cleanError();
        this.cleanData();

        const container = document.querySelector("#container");

        const dataWrapper = document.createElement("div");
        dataWrapper.id = "data";
        container.appendChild(dataWrapper);

        const header = document.createElement("div");
        header.classList.add("header");

        const title = document.createElement("h2");
        title.innerHTML = data.name;

        const imageWrapper = document.createElement("div");
        const img = document.createElement("img");

        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        imageWrapper.appendChild(img)
        header.appendChild(title);
        header.appendChild(imageWrapper);

        dataWrapper.appendChild(header);

        const statsWrapper = document.createElement("div");
        statsWrapper.classList.add("stats-wrapper");

        const tempWrapper = document.createElement("div");
        tempWrapper.classList.add("stats");

        const tempTitle = document.createElement("span");
        const tempValue = document.createElement("span");

        tempTitle.innerHTML = "Temperatura: ";
        tempValue.innerHTML = `<b>${Math.round(data.main.temp)}&#8451;</b>`;

        tempWrapper.appendChild(tempTitle);
        tempWrapper.appendChild(tempValue);

        const tempFeelWrapper = document.createElement("div");
        tempFeelWrapper.classList.add("stats");

        const tempFeelTitle = document.createElement("span");
        const tempFeelValue = document.createElement("span");

        tempFeelTitle.innerHTML = "Odczuwalna: ";
        tempFeelValue.innerHTML = `<b>${Math.round(data.main.feels_like)}&#8451;</b>`;

        tempFeelWrapper.appendChild(tempFeelTitle);
        tempFeelWrapper.appendChild(tempFeelValue);


        const humidityWrapper = document.createElement("div");
        humidityWrapper.classList.add("stats");

        const humidityTitle = document.createElement("span");
        const humidityValue = document.createElement("span");

        humidityTitle.innerHTML = "Wilgotność: ";
        humidityValue.innerHTML = `<b>${data.main.humidity}%</b>`;

        humidityWrapper.appendChild(humidityTitle);
        humidityWrapper.appendChild(humidityValue);



        const pressureWrapper = document.createElement("div");
        pressureWrapper.classList.add("stats");

        const pressureTitle = document.createElement("span");
        const pressureValue = document.createElement("span");

        pressureTitle.innerHTML = "Ciśnienie: ";
        pressureValue.innerHTML = `<b>${data.main.pressure}hPa</b>`;

        pressureWrapper.appendChild(pressureTitle);
        pressureWrapper.appendChild(pressureValue);


        const windWrapper = document.createElement("div");
        windWrapper.classList.add("stats");

        const windTitle = document.createElement("span");
        const windValue = document.createElement("span");

        windTitle.innerHTML = "Prędkość wiatru: ";
        windValue.innerHTML = `<b>${data.wind.speed}m/s</b>`;

        windWrapper.appendChild(windTitle);
        windWrapper.appendChild(windValue);



        const cloudWrapper = document.createElement("div");
        cloudWrapper.classList.add("stats");

        const cloudTitle = document.createElement("span");
        const cloudValue = document.createElement("span");

        cloudTitle.innerHTML = "Zachmnurzenie: ";
        cloudValue.innerHTML = `<b>${data.clouds.all}%</b>`;

        cloudWrapper.appendChild(cloudTitle);
        cloudWrapper.appendChild(cloudValue);


        statsWrapper.appendChild(tempWrapper);
        statsWrapper.appendChild(tempFeelWrapper);
        statsWrapper.appendChild(humidityWrapper);
        statsWrapper.appendChild(pressureWrapper);
        statsWrapper.appendChild(windWrapper);
        statsWrapper.appendChild(cloudWrapper);
        dataWrapper.appendChild(statsWrapper);
        const refreshInfo = document.createElement("span");
        refreshInfo.id = "refresh-info";
        refreshInfo.innerHTML = this.refreshTime;
        dataWrapper.appendChild(refreshInfo);
    }


    private addRefreshListeners(data: string) {
        this.refreshTime = "Następne odświeżenie nastąpi o: <b>" + getTime(); + "</b>"
        this.refreshInterval = setInterval(async () => {
            this.refreshTime = "Następne odświeżenie nastąpi o: <b>" + getTime(); + "</b>"
            this.searchData(data);
        }, 120_000)


        function getTime(): string {
            const newDate = new Date(new Date().getTime() + 2 * 60000);
            const hours = newDate.getHours();
            const minutes = newDate.getMinutes();
            return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        }
    }

    private saveData(value: string): void {
        const city = this.cities.find(q => q == value);
        if(city) return;

        this.cities.push(value);
        localStorage.setItem("cities", JSON.stringify(this.cities));
        this.refreshQuickChoose();
    }


    private getInputValue(): string {
        const input: HTMLInputElement = document.querySelector("input[name='search-value']");
        return input.value;
    }

}


class Coord {
    public lon: number;
    public lat: number;
}

class Weather {
    public id: number;
    public main: string;
    public description: string;
    public icon: string;
}

class Main {
    public temp: number;
    public pressure: number;
    public humidity: number;
    public temp_min: number;
    public temp_max: number;
    public feels_like: number;
}

class Wind {
    public speed: number;
    public deg: number;
}

class Clouds {
    public all: number;
}

class Sys {
    public type: number;
    public id: number;
    public message: number;
    public country: string;
    public sunrise: number;
    public sunset: number;
}

class WeatherAPI {
    public coord: Coord;
    public weather: Weather[];
    public base: string;
    public main: Main;
    public visibility: number;
    public wind: Wind;
    public clouds: Clouds;
    public dt: number;
    public sys: Sys;
    public id: number;
    public name: string;
    public cod: number | string;
    public message?: string;
}

const app = new WeatherApp();