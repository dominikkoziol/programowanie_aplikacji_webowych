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
        this.API_KEY = "ef96327aa7b0e4dce3e88d08907eb642";
        this.API_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${this.API_KEY}&units=metric`;
        this.refreshInterval = null;
        this.cities = [];
        this.init();
    }
    init() {
        this.addSubmitListener();
        this.getSavedCities();
    }
    getSavedCities() {
        this.cities = localStorage.getItem("cities") ? JSON.parse(localStorage.getItem("cities")) : [];
        this.refreshQuickChoose();
    }
    refreshQuickChoose() {
        const quickChooseWrapper = document.querySelector("#quick-choose");
        quickChooseWrapper.innerHTML = null;
        this.cities.forEach(c => {
            const button = document.createElement("button");
            button.classList.add("quick");
            button.innerHTML = c;
            button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                const input = document.querySelector("input[name='search-value']");
                input.value = c;
                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                    this.refreshInterval = null;
                }
                yield this.searchData(c);
            }));
            quickChooseWrapper.appendChild(button);
        });
    }
    addSubmitListener() {
        const button = document.querySelector("#submit-search");
        button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const city = this.getInputValue();
            if (city) {
                if (this.refreshInterval) {
                    clearInterval(this.refreshInterval);
                    this.refreshInterval = null;
                }
                yield this.searchData(city);
            }
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
                    this.saveData(city);
                    if (!this.refreshInterval)
                        this.addRefreshListeners(data.name);
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
    addRefreshListeners(data) {
        this.refreshTime = "Następne odświeżenie nastąpi o: <b>" + getTime();
        +"</b>";
        this.refreshInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            this.refreshTime = "Następne odświeżenie nastąpi o: <b>" + getTime();
            +"</b>";
            this.searchData(data);
        }), 120000);
        function getTime() {
            const newDate = new Date(new Date().getTime() + 2 * 60000);
            const hours = newDate.getHours();
            const minutes = newDate.getMinutes();
            return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
        }
    }
    saveData(value) {
        const city = this.cities.find(q => q == value);
        if (city)
            return;
        this.cities.push(value);
        localStorage.setItem("cities", JSON.stringify(this.cities));
        this.refreshQuickChoose();
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
