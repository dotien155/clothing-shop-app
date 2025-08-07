import axios from "axios";

   const API = axios.create({
    baseURL:`http://localhost/laravel-api/laravel8/public/api/`
});

export default API;