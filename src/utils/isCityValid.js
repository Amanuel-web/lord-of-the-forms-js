import { allCities } from "./all-cities";

function isCityValid(city) {
  return allCities.some(
    (cityProps) => cityProps.toLowerCase() === city.toLowerCase()
  );
}

export default isCityValid;
