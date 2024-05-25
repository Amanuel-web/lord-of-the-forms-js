import { allCities } from "./all-cities";

function isCityValid(city) {
  return allCities.some((c) => c.toLowerCase() === city.toLowerCase());
}

export default isCityValid;
