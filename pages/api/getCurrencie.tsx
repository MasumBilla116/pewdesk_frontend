import axios from "axios"

export default async function getCurrency() {
    const res = await fetch("http://127.0.0.1:8000/api/get/currencie");
    const data = await res.json();
    return data;
}