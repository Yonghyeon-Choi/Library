import http from "./http-common";

const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/images/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
};

const getFiles = () => {
    return http.get("/images/list");
};

const imageService = {
    getFiles,
    upload,
};

export default imageService;