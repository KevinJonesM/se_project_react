import Sunnyday from "../assets/Sunnyday.svg";
import Sunnynight from "../assets/Sunnynight.svg";
import Cloudyday from "../assets/Cloudyday.svg";
import Cloudynight from "../assets/Cloudynight.svg";
import Stormday from "../assets/Stormday.svg";
import Stormnight from "../assets/Stormnight.svg";
import Rainday from "../assets/Rainday.svg";
import Rainnight from "../assets/Rainnight.svg";
import Snowday from "../assets/Snowday.svg";
import Snownight from "../assets/Snownight.svg";
import Fogday from "../assets/Fogday.svg";
import Fognight from "../assets/Fognight.svg";

export function getWeatherBackground(weatherId, isDay) {
  if (weatherId >= 200 && weatherId < 300) {
    return isDay ? Stormday : Stormnight;
  } else if (weatherId >= 300 && weatherId < 600) {
    return isDay ? Rainday : Rainnight;
  } else if (weatherId >= 600 && weatherId < 700) {
    return isDay ? Snowday : Snownight;
  } else if (weatherId >= 700 && weatherId < 800) {
    return isDay ? Fogday : Fognight;
  } else if (weatherId === 800) {
    return isDay ? Sunnyday : Sunnynight;
  } else if (weatherId > 800 && weatherId < 900) {
    return isDay ? Cloudyday : Cloudynight;
  } 
}
