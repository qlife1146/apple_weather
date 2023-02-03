import axios from "axios";
import { useState, useEffect } from "react";

// const DATAKEY = "Kp8sABnsI9uXte44um5itP+RBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB/7vf4eGbKHUA==";
const DATAKEY = "Kp8sABnsI9uXte44um5itP%2BRBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB%2F7vf4eGbKHUA%3D%3D";

//'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getSenTaIdxV3?ServiceKey=서비스키&ServiceKey=-&pageNo=1&numOfRows=10&dataType=XML&areaNo=1100000000&time=2021070618&requestCode=A41
export default function UvIndex() {
    const [uv, setUv] = useState([0, "x"]);

    const areaNum = 1153000000;
    const today = new Date();
    const date = today.getFullYear().toString() + (today.getMonth() + 1 < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1).toString() + (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()).toString();
    const timeDate = date + "00";
    const currentTime = today.getHours().toString();
    useEffect(() => {
        const API = axios.get(`https://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getUVIdxV3?serviceKey=${DATAKEY}&pageNo=1&numOfRows=10&dataType=json&areaNo=${areaNum}&time=${timeDate}`).then((result) => {
            const uvDate = result.data.response.body.items.item[0];
            let a, b;
            if (currentTime < 3) {
                a = uvDate.h0;
            } else if (currentTime < 6) {
                a = uvDate.h3;
            } else if (currentTime < 9) {
                a = uvDate.h6;
            } else if (currentTime < 12) {
                a = uvDate.h9;
            } else if (currentTime < 15) {
                a = uvDate.h12;
            } else if (currentTime < 18) {
                a = uvDate.h15;
            } else if (currentTime < 21) {
                a = uvDate.h18;
            } else {
                a = uvDate.h21;
            }
            if (a > 11) {
                b = "위험";
            } else if (8 <= 10) {
                b = "매우 높음";
            } else if (6 <= 7) {
                b = "높음";
            } else if (3 <= 5) {
                b = "보통";
            } else {
                b = "낮음";
            }
            setUv([a, b]);
        });
    }, []);
    return <div>{uv[0] + "-" + uv[1]}</div>;
}
