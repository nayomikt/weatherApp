## Introduction

Melbourne weather is kind of awesome! So the aim of this simple awesome page is to display the current weather of current location.

## Initial requirement

The page should show these weather conditions for the current location with a toggle for celsius/farenheit:

 ┌───────────────────┐
 │ CURRENT WEATHER   │
 │ 22° C | CLOUDS    │
 │ KEW, AUSTRALIA    │
 │                   │ 
 │ HUMIDITY  73%     │
 │ WIND      6.2 M/S │
 │ SUNRISE   05:41   │
 │ SUNSET    20:06   │
 │                   │
 │ [c]|[f] (toggle)  │
 └───────────────────┘

## Design notes:

* App is using the free "openweathermap" api (https://openweathermap.org/)

* The current geo location taken using the browser (User has to allow )

* As the API has a call limit the results has to be cached. Sesssion storage has been used to cashing. 

* When click on C | F, the temperature is toggle without calling again to API.

* HTML5, ES6 Javascript, CSS with SASS has been used to build the page 

* Some animations - 
    *  Depend on weather condition (cloudy/sunny/rainy/sunny/rainbow) - CSS3 animation 
    *  If temperature is below 8° C (281.15 kelvin) - Snow falling

* Page is responsive to make it Mobile-friendly 