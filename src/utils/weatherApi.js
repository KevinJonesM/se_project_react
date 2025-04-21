import { APIkey } from "./constants";

export function getWeatherData(latitude, longitude) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Error fetching weather");
    }
    return res.json();
  });
}

export function getWeatherType(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}