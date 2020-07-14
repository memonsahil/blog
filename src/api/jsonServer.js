import axios from "axios";

//With ngrok, the baseURL changes every 8 hours.
export default axios.create({
  baseURL: "http://1c766752d708.ngrok.io",
});
