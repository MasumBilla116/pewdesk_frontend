import axios from "axios"

export default async function getCountry() {
    const res =  await fetch("http://127.0.0.1:8000/api/get/country");
    const data = await res.json()
    return data;
}