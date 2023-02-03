import axios from "axios";
import { useState } from "react";

// const DATAKEY = "Kp8sABnsI9uXte44um5itP+RBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB/7vf4eGbKHUA==";
const DATAKEY = "Kp8sABnsI9uXte44um5itP%2BRBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB%2F7vf4eGbKHUA%3D%3D";

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

//'http://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getSenTaIdxV3?ServiceKey=서비스키&ServiceKey=-&pageNo=1&numOfRows=10&dataType=XML&areaNo=1100000000&time=2021070618&requestCode=A41
export default function AirQuality() {
    const [air, setAir] = useState([0, "x"]);
    const area = "구로구";

    const API = axios
        .get(`https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${DATAKEY}&returnType=json&numOfRows=100&pageNo=1&stationName=${area}&dataTerm=DAILY&ver=1.0`)
        .then((result) => {
            const value = result.data.response.body.items[0].khaiValue;
            const detailGrade = result.data.response.body.items[0].khaiGrade;
            let grade;
            switch (detailGrade) {
                case 1:
                    grade = "좋음";
                    break;
                case 2:
                    grade = "보통";
                    break;
                case 3:
                    grade = "나쁨";
                    break;
                case 4:
                    grade = "매우 나쁨";
                    break;
                default:
                    grade = "error";
                    break;
            }
            setAir([value, grade]);
        })
        .catch((error) => source.cancel("Operation canceled by the user."));

    return (
        <div>
            {air[0]} - {air[1]}
        </div>
    );
}

//https://apis.data.go.kr/1360000/LivingWthrIdxServiceV3/getSenTaIdxV3?ServiceKey=Kp8sABnsI9uXte44um5itP%2BRBcqtw4K7J3zRmT09rwySwX2BhnwvGbtGMVSrjP56IULG8UdLHB%2F7vf4eGbKHUA%3D%3D&ServiceKey=-&pageNo=1&numOfRows=10&dataType=JSON&areaNo=1153000000&time=2023020119&requestCode=A41
