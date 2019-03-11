/*jshint esversion: 6 */

const storageName = "weather";
const myAPIkey = "f83e8db4191cc2a274fb9d3d6d2573e4";
		
window.onload = function () {
	"use strict";
	const today = new Date();
	document.getElementById("title2").innerHTML = today;
    getWeatherData();
	getToggle();
};

// toggle the temperature scale
function getToggle() {
	const far =document.getElementById("far");
far.addEventListener("click", switchTempScale);
}

// get location from browser
function getLocation() {
	"use strict";
	const loc = document.getElementById("state");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather,showError);
    } else {
        loc.innerHTML = "Geolocation is not supported by this browser.";
    }
}

// get weather data from to the location data
function getWeather(position) {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const root = "http://api.openweathermap.org/data/2.5/weather?";
    const url = `${root}lat=${lat}&lon=${long}&appid=${myAPIkey}`;
    fetch(url, { method: "get" })
        .then(resp => resp.json())
        .then(data => {
            updateDataToUI(data.name, data.weather, data.main.temp, data.sys.country, data.main.humidity, data.wind.speed, data.sys.sunset, data.sys.sunrise);
            createCookie(storageName,data);
        })
        .catch(function (err) {
            console.error(err);
        });
}

// update the data from API to DOM
function updateDataToUI(location, weather, temp, contry, hum, win, set, rise ) {
	const weatherCon = document.getElementById("cond");
	const weatherIcon = document.getElementById("weather-icon");
	const humidity = document.getElementById("humidity");
	const wind = document.getElementById("wind");
	const sunrise = document.getElementById("sunrise");
	const sunset = document.getElementById("sunset");
	const loc = document.getElementById("state");
	const con = document.getElementById("country");
	const temNum = document.getElementById("temp-num");
	
    weatherCon.innerHTML = weather[0].main;
	if(weather[0].main ==='Clouds'){
		weatherIcon.className = "cloudy";
	}
	else if(weather[0].main ==='sunny'){
		weatherIcon.className = "sunny";
	}
	else if(weather[0].main ==='Rain'){
		weatherIcon.className = "rainy";
	}
	else if(weather[0].main ==='Clear'){
		weatherIcon.className = "sunny";
	}
	else{
		weatherIcon.className = "rainbow";
	}	
    loc.innerHTML = location;
	if(contry ==='AU'){
		con.innerHTML = 'Australia';
	}
	   else{
	   	con.innerHTML = contry;
	   }
    const tempCelcius = kelcinToC(temp).toFixed(2);
    temNum.innerHTML = `${tempCelcius}`;
	if(temp<281.15){
		document.getElementById('test').classList.remove('snow');
	}
	else{
		document.getElementById('test').classList.add('snow');
	}
	humidity.innerHTML = hum +' %';
	wind.innerHTML = win +' M/S';
	sunset.innerHTML = convertTime(set);
	sunrise.innerHTML= convertTime(rise);
	
}
		
function convertTime(apiTime){
const date = new Date(apiTime*1000);
const hours = date.getHours();
const minutes = "0" + date.getMinutes();
const seconds = "0" + date.getSeconds();
return (hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2));
}

// helper function: change from kelvin to C
function kelcinToC(kelvin) {
    return (kelvin - 273.15);
}
// helper function change from C to F
function celsiusToFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}
// helper function: change from F to C
function fahrenheitToCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function switchTempScale() {
	const temScale = document.getElementById("temp-scale");
	const temNum = document.getElementById("temp-num");
	const far =document.getElementById("far");
    if (temScale.innerHTML === "C") {
        temNum.innerHTML = celsiusToFahrenheit(temNum.innerHTML).toFixed(2);
        temScale.innerHTML = "F";
		far.innerHTML = "| C";
    } else if (temScale.innerHTML === 'F') {
        temNum.innerHTML = fahrenheitToCelsius(temNum.innerHTML).toFixed(2);
        temScale.innerHTML = "C";		
		far.innerHTML ="| F";
    }
}

function createCookie(storageName, cookieValue) {
    sessionStorage.setItem(storageName, JSON.stringify(cookieValue));
}

function accessLocation(storageName) {
    const data = sessionStorage.getItem(storageName);
    if (data === null || data === ""|| typeof undefined === data) {
        return "";
    }
    return data;
}

function getWeatherData() {
    const data = accessLocation(storageName);
    if (data !== "") {
        const jsonData = JSON.parse(data);
        //console.log("using data from session storage");
        updateDataToUI(jsonData.name, jsonData.weather, jsonData.main.temp, jsonData.sys.country,jsonData.main.humidity, jsonData.wind.speed, jsonData.sys.sunset, jsonData.sys.sunrise);
    }
    else {
        //console.log("creating new session storage with name : " + storageName);
        getLocation();
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("Sorry, User denied the request for Geolocation. Can't show weather information!");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Sorry, Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("Sorry, he request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Sorry, An unknown error occurred.");
            break;
    }
}