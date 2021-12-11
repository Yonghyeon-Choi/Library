import axios from "axios";
import {serverURL} from "./serverURL";

export default axios.create({
    baseURL: serverURL + "/api",
    headers: {
        "Content-type": "application/json"
    }
});