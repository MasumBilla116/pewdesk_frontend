import axios from "axios"

export default async function getLanguage() {
    const res = await fetch("http://127.0.0.1:8000/api/get/language");
    const data = await res.json();

    return data;
}