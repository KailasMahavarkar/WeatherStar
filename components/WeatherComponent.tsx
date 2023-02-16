import React, { useContext } from "react";
import { View, Text } from "react-native";
import UserContext from "../context/UserContext";

const WeatherComponent = () => {
	const { state } = useContext(UserContext);

	const formatTemperature = (temp: number) => {
		return `${temp} °${state.temperatureMode === "celcius" ? "C" : "F"}`;
	};

	return (
		<View className="flex-row w-full justify-between px-5 py-3 rounded-xl  bg-gray-900 text-white mt-10">
			<View className={`items-center p-2 rounded-xl  `}>
				<Text className="text-white">Min Temp</Text>
				<Text className="text-white"></Text>
				<Text className="text-white">
					{formatTemperature(state.weather.main.temp_min)}
				</Text>
			</View>
			<View className={`items-center p-2 rounded-xl bg-[#ffffff] `}>
				<Text className="text-black font-bold">Avg Temp</Text>
				<Text className="text-black font-bold"></Text>
				<Text className="text-black font-bold">
					{formatTemperature(state.weather.main.temp)}
				</Text>
			</View>
			<View className={`items-center p-2 rounded-xl  `}>
				<Text className="text-white">Max Temp</Text>
				<Text className="text-white"></Text>
				<Text className="text-white">
					{formatTemperature(state.weather.main.temp_max)}
				</Text>
			</View>
		</View>
	);
};

export default WeatherComponent;
