import axios from "axios";
import { useState, useEffect } from "react";
const DATAKEY = "Kp8sABnsI9uXte44um5itP%2BRBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB%2F7vf4eGbKHUA%3D%3D";

export default function SunTimes() {
    const [location] = useState([37.48103367332515, 126.8979680867757]);
    const longitude = location[0];
    const latitude = location[1];
    const [sunTimes, setSunTimes] = useState(["", ""]);
    const today = new Date();
    const date = today.getFullYear().toString() + (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1).toString() + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()).toString();

    useEffect(() => {
        const API = axios.get(`https://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo?serviceKey=${DATAKEY}&locdate=${date}&longitude=${longitude}&latitude=${latitude}&dnYn=Y`).then((result) => {
            const sunrise = result.data.response.body.items.item.sunrise;
            const sunset = result.data.response.body.items.item.sunset;
            setSunTimes([sunrise, sunset]);
        });
    }, []);

    return (
        <div>
            <div>일출: {sunTimes[0].slice(0, 2) + ":" + sunTimes[0].slice(2)}</div>
            <div>일몰: {sunTimes[1].slice(0, 2) + ":" + sunTimes[1].slice(2)}</div>
        </div>
    );
}
