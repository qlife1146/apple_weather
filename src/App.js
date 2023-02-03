import "./App.css";
import AirQuality from "./Components/AirQuality";
import SunTimes from "./Components/SunTimes";
import UvIndex from "./Components/UvIndex";
import WindInfo from "./Components/WindInfo";
const API = process.env.REACT_APP_API_KEY;

function App() {
    return (
        <div className="App">
            <div className="hours-weather">24시간</div>
            <div className="weeks-weather">10일간</div>
            <div className="air-quality">{/* <AirQuality /> */}</div>
            <div className="map">지도</div>
            <div className="uv-index">
                <UvIndex />
            </div>
            <div className="sun-times">
                <SunTimes />
            </div>
            <div className="wind-info">
                <WindInfo />
            </div>
            <div className="rainfall">강수량</div>
            <div className="sensory-temperature">체감온도</div>
            <div className="humidity">습도</div>
            <div className="visibility-range">가시거리</div>
            <div className="pressure">기압</div>
        </div>
    );
}

export default App;
