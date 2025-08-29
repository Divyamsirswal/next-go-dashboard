import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081",
    headers: {
        "Content-Type": "application/json"
    },
});

export const getNotes = () => {
    return api.get("/notes");
};

export const createNote = (note) => {
    return api.post("/notes", note);
};