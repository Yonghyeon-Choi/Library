import axios from "axios";

export default axios.create({
    baseURL: "http://203.237.183.42:7163/api",
    headers: {
        "Content-type": "application/json"
    }
});