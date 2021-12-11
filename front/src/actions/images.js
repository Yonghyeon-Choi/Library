import {
    CREATE_IMAGE,
    RETRIEVE_IMAGES,
} from "./types";

import ImageDataService from "../services/image.service";

export const createImage = (title, description) => async (dispatch) => {
    try {
        const res = await ImageDataService.upload({ title, description });

        dispatch({
            type: CREATE_IMAGE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveImages = () => async (dispatch) => {
    try {
        const res = await ImageDataService.getFiles();

        dispatch({
            type: RETRIEVE_IMAGES,
            payload: res.data,
        });
        console.log(res);
    } catch (err) {
        console.log(err);
    }
};
