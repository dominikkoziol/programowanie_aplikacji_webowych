class WeatherApp {
    private readonly API_KEY: string = "0b5f6e80c44cf739a9c9a0a61c79140e";
    private readonly API_URL: string = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}&units=metric`;

    constructor() {
        this.init();
    }

    private init(): void {
        this.addSubmitListener();
        this.getSavedCities();
    }

    public getSavedCities(): void {

    }
    private addSubmitListener(): void {
        const button = document.querySelector("#submit-search");
        console.log("BUTTON", button)
        button.addEventListener("click", async () => {
            const city = this.getInputValue();
            if (city) await this.searchData(city);
            else this.showFormError("Aby wyszukać, uzupełnij pole miasto");
        });
    }

    private async searchData(city: string): Promise<void> {
        const url = this.API_URL + `&q=${city}`
        const weatherQuery = await fetch(url);
        const weatherData = weatherQuery.json();

        weatherData.then((data: WeatherAPI) => {
            if (data.cod == 200) {
                this.saveData("city", city);
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
        if(element) element.remove();
    }

    private createSuccessContainer(data: WeatherAPI): void {
        this.cleanError();
        this.cleanData();

        console.log(data);

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
        tempValue.innerHTML= `<b>${Math.round(data.main.temp)}&#8451;</b>`;

        tempWrapper.appendChild(tempTitle);
        tempWrapper.appendChild(tempValue);

        
        const humidityWrapper = document.createElement("div");
        humidityWrapper.classList.add("stats");

        const humidityTitle = document.createElement("span");
        const humidityValue = document.createElement("span");

        humidityTitle.innerHTML = "Wilgotność: ";
        humidityValue.innerHTML= `<b>${data.main.humidity}%</b>`;

        humidityWrapper.appendChild(humidityTitle);
        humidityWrapper.appendChild(humidityValue);


                
        const pressureWrapper = document.createElement("div");
        pressureWrapper.classList.add("stats");

        const pressureTitle = document.createElement("span");
        const pressureValue = document.createElement("span");

        pressureTitle.innerHTML = "Ciśnienie: ";
        pressureValue.innerHTML= `<b>${data.main.pressure}hPa</b>`;

        pressureWrapper.appendChild(pressureTitle);
        pressureWrapper.appendChild(pressureValue);


        const windWrapper = document.createElement("div");
        windWrapper.classList.add("stats");

        const windTitle = document.createElement("span");
        const windValue = document.createElement("span");

        windTitle.innerHTML = "Prędkość wiatru: ";
        windValue.innerHTML= `<b>${data.wind.speed}m/s</b>`;

        windWrapper.appendChild(windTitle);
        windWrapper.appendChild(windValue);

        


        statsWrapper.appendChild(tempWrapper);
        statsWrapper.appendChild(humidityWrapper);
        statsWrapper.appendChild(pressureWrapper);
        statsWrapper.appendChild(windWrapper);

        dataWrapper.appendChild(statsWrapper)
    }



    private saveData(key: string, value: string): void {
        localStorage.setItem(key, value);
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