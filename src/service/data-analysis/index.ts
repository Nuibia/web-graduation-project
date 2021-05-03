import axios from "axios";

export const getData = (countryNames:string) =>
  axios.get(`http://111.231.75.86:8000/api/countries/daily/?countryNames=${countryNames}`,);
