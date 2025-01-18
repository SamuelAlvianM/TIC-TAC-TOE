import { useState } from "react";
import axios from "axios";
import { WeatherData } from "./type";

export default function Weather() {
    const [location, setLocation] = useState("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const getWeather = async () => {
        if (!location) {
            setError("Please enter a location.");
            return;
        }

        setIsSubmitting(true);
        setError(null); 

        try {
            const { data } = await axios.get("/api/weather", {
                params: { 
                    location: location.trim()
                },
            });
            setWeather(data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch weather data. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-violet-300 shadow-lg rounded-lg p-6 mt-20">
            <h1 className="text-3xl font-semibold text-center mb-6 text-lime-900">Weather App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Enter city or country"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border-2 text-red-600 border-emerald-500 rounded-lg p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
            </div>
            <button
                onClick={getWeather}
                className={`w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition ${isSubmitting && "opacity-50 cursor-not-allowed"}`}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Loading..." : "Get Weather"}
            </button>

            {error && (
                <div className="mt-4 text-red-500 text-center">
                    <p>{error}</p>
                </div>
            )}

            {weather && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-center text-violet-700">
                        {weather.name}, {weather.sys.country}
                    </h2>
                    <div className="flex items-center justify-center mt-4">
                        <img
                            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt={weather.weather[0].description}
                            className="w-20 h-20"
                        />
                        <div className="ml-4 text-center">
                            <p className="text-5xl font-bold text-emerald-600">{weather.main.temp}°C</p>
                            <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
                        </div>
                    </div>
                    <div className="mt-6 text-violet-700">
                        <p>Feels Like: {weather.main.feels_like}°C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                        <p>Pressure: {weather.main.pressure} hPa</p>
                    </div>
                </div>
            )}
        </div>
    );
}
