import React, { useContext } from "react";
import { View, Text } from "react-native";
import UserContext from "../context/UserContext";

const MoreInfoComponent = () => {
	const { state } = useContext(UserContext);

	return (
		<View className="mt-5 w-full">
			<Text className="font-bold ">More Info</Text>
			<View className=" flex-row justify-between w-full mt-3">
				<View className="flex flex-col items-center">
					<Text className="text-gray-400 font-semibold">
						Pressure
					</Text>
					<Text className="font-bold">
						{state.weather.main.pressure} hPa
					</Text>
				</View>
				<View className="flex flex-col items-center">
					<Text className="text-gray-400 font-semibold test">
						Humidity
					</Text>
					<Text className="font-bold">
						{state.weather.main.humidity}%
					</Text>
				</View>
				<View className="flex flex-col items-center">
					<Text className="text-gray-400 font-semibold">Windy</Text>
					<Text className="font-bold">
						{state.weather.wind.speed} m/s
					</Text>
				</View>
			</View>
		</View>
	);
};

export default MoreInfoComponent;
