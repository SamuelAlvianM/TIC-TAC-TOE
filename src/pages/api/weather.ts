import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "../../utils/weather/callWeatherAPI";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests are allowed." });
    }

    const { location } = req.query;

    if (!location) {
    return res.status(400).json({ message: "Location is required." });
    }

    try {
    const { data } = await axiosInstance.get("", {
        params: {
        q: location,
        units: "metric",
        },
    });

    res.status(200).json(data);
} catch (error: any) {
    console.error(error);
    if (error.response?.status === 404) {
        res.status(404).json({ message: "Location not found." });
    } else {
        res.status(500).json({ message: "Failed to fetch weather data." });
        }
    }
}