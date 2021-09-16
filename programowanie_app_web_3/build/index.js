var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WeatherApp {
    constructor() {
        this.API_KEY = "0b5f6e80c44cf739a9c9a0a61c79140e";
        this.API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}&units=metric`;
        this.init();
    }
    init() {
        this.addSubmitListener();
        this.getSavedCities();
    }
    getSavedCities() {
    }
    addSubmitListener() {
        const button = document.querySelector("#submit-search");
        console.log("BUTTON", button);
        button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const city = this.getInputValue();
            if (city)
                yield this.searchData(city);
            else
                this.showFormError("Aby wyszukać, uzupełnij pole miasto");
        }));
    }
    searchData(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.API_URL + `&q=${city}`;
            const weatherQuery = yield fetch(url);
            const weatherData = weatherQuery.json();
            weatherData.then((data) => {
                if (data.cod == 200) {
                    this.saveData("city", city);
                    this.createSuccessContainer(data);
                }
                else
                    this.showFormError(data.cod == '404' ? 'Nie znaleziono podanego miasta' : 'Wystąpił błąd prosimy spróbować ponownie później');
            });
        });
    }
    showFormError(error) {
        this.cleanError();
        const formWrapper = document.querySelector("#form-wrapper");
        const errorElement = document.createElement("span");
        errorElement.innerHTML = error;
        errorElement.id = "error";
        formWrapper.appendChild(errorElement);
    }
    cleanError() {
        const error = document.querySelector("#error");
        if (error)
            error.remove();
    }
    cleanData() {
        const element = document.querySelector("#data");
        if (element)
            element.remove();
    }
    createSuccessContainer(data) {
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
        img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        imageWrapper.appendChild(img);
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
        statsWrapper.appendChild(tempWrapper);
        statsWrapper.appendChild(humidityWrapper);
        statsWrapper.appendChild(pressureWrapper);
        statsWrapper.appendChild(windWrapper);
        dataWrapper.appendChild(statsWrapper);
    }
    saveData(key, value) {
        localStorage.setItem(key, value);
    }
    getInputValue() {
        const input = document.querySelector("input[name='search-value']");
        return input.value;
    }
}
class Coord {
}
class Weather {
}
class Main {
}
class Wind {
}
class Clouds {
}
class Sys {
}
class WeatherAPI {
}
const app = new WeatherApp();
