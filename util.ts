/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect } from "react";

export const getWeatherIcon = (icon: string) => {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};


export const celciusToFarenheit = (celcius: number) => {
    return Number((celcius * (9 / 5) + 32).toFixed(1));
}


export const farenheitToCelcius = (farenheit: number) => {
    return Number((((farenheit - 32) * 5) / 9).toFixed(1))
}

export const getCityURL = (city: string) => {
    const API_KEY = "283df3341b6aa80a3cf6c19c665c2d9a"
    return `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&&lang=en`;
}


export function useEffectAsync(effect: any, inputs: any) {
    useEffect(() => {
        effect();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    }, inputs);
}


export function capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1);
}