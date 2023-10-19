import axios from "axios"

export default async function getDesignation() {
    const res = await fetch("http://127.0.0.1:8000/api/get/designation");
    const data = await res.json();
    return data;
}