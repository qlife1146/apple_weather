import axios from "axios";
import { useState, useEffect } from "react";

// const DATAKEY = "Kp8sABnsI9uXte44um5itP+RBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB/7vf4eGbKHUA==";
const DATAKEY = "Kp8sABnsI9uXte44um5itP%2BRBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB%2F7vf4eGbKHUA%3D%3D";

//'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getSenTaIdxV3?ServiceKey=서비스키&ServiceKey=-&pageNo=1&numOfRows=10&dataType=XML&areaNo=1100000000&time=2021070618&requestCode=A41
export default function UvIndex() {
    const [windDirection, setWindDirection] = useState([]);
    const [windSpeed, setWindSpeed] = useState([]);
    const [windInfo, setWindInfo] = useState([]);

    const areaNX = "28";
    const areaNY = "125";
    const today = new Date();
    const date = today.getFullYear().toString() + (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1).toString() + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()).toString();
    const timeDate = "0500";
    const currentTime = today.getHours();

    useEffect(() => {
        const API = axios.get(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${DATAKEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${date}&base_time=${timeDate}&nx=${areaNX}&ny=${areaNY}`).then((result) => {
            const data = result.data.response.body.items.item;
            const loadDirection = [];
            const loadSpeed = [];
            let direction = 0;
            let speed = 0;
            for (let i = 0; i < data.length; i = i + 1) {
                if (data[i].category === "VEC") {
                    loadDirection.push(data[i].fcstValue);
                }
                if (data[i].category === "WSD") {
                    loadSpeed.push(data[i].fcstValue);
                }
            }
            setWindDirection(loadDirection);
            setWindSpeed(loadSpeed);
            speed = windSpeed[currentTime - 6];

            const roundDirection = Math.round(windDirection[currentTime - 6]);
            if (roundDirection <= 22) {
                direction = "북북동";
            } else if (roundDirection <= 45) {
                direction = "북동";
            } else if (roundDirection <= 68) {
                direction = "동북동";
            } else if (roundDirection <= 90) {
                direction = "동";
            } else if (roundDirection <= 112) {
                direction = "동남동";
            } else if (roundDirection <= 135) {
                direction = "남동";
            } else if (roundDirection <= 158) {
                direction = "남남동";
            } else if (roundDirection <= 180) {
                direction = "남";
            } else if (roundDirection <= 202) {
                direction = "남남서";
            } else if (roundDirection <= 225) {
                direction = "남서";
            } else if (roundDirection <= 248) {
                direction = "서남서";
            } else if (roundDirection <= 270) {
                direction = "서";
            } else if (roundDirection <= 292) {
                direction = "서북서";
            } else if (roundDirection <= 315) {
                direction = "북서";
            } else if (roundDirection <= 338) {
                direction = "북북서";
            } else {
                direction = "북";
            }

            setWindInfo([direction, speed]);
            console.log();
        });
    }, []);
    return (
        <div>
            <div>{"풍향: " + windInfo[0] + "풍"}</div>
            <div>{"풍속: " + windInfo[1] + " m/s"}</div>
        </div>
    );
}
