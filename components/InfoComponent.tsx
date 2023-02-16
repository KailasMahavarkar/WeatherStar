import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { produce } from "immer";
import { View, Text } from "react-native";
import { IconButton, Card, ToggleButton } from "react-native-paper";
import {
	capitalize,
	celciusToFarenheit,
	farenheitToCelcius,
	getWeatherIcon,
} from "../util";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InfoComponent = () => {
	const { state, setState } = useContext(UserContext);

	const D = Date().toString().split(" ");
	const today = (D[2] + "-" + D[1] + "-" + D[3])
		.replace("-", " ")
		.replace("-", " ");

	const tempeatureChangeHandler = (newmode: "fahrenheit" | "celcius") => {
		let tempFunc = celciusToFarenheit;
		if (newmode === "fahrenheit") {
			tempFunc = celciusToFarenheit;
		} else {
			tempFunc = farenheitToCelcius;
		}
		setState(
			produce(state, (draft) => {
				draft.temperatureMode = newmode;
				draft.weather.main.temp = tempFunc(state.weather.main.temp);
				draft.weather.main.temp_max = tempFunc(
					state.weather.main.temp_max
				);
				draft.weather.main.temp_min = tempFunc(
					state.weather.main.temp_min
				);

				// loop through all favourites and change its temp
				draft.favourites.forEach((fav) => {
					fav.temperature = tempFunc(fav.temperature);
				});
			})
		);
	};

	return (
		<View className="flex-row  w-full mt-5">
			<View className="flex-1">
				<View>
					<Text className="text-2xl font-bold ">
						{capitalize(state.city)},
					</Text>
				</View>
				<View>
					<Text className="text-2xl font-bold">
						{capitalize(state.countryName)}
					</Text>
				</View>
				<View>
					<Text className="text-lg font-semibold text-gray-400 ">
						{/* date in format of [2nd july 2023] */}
						{today}
					</Text>
				</View>
				<View className="flex-row ">
					<View className="font-bold text-[#2078fd] ">
						<Text className="text-xl font-bold text-gray-400 ">
							{state.weather.weather[0].description.toLowerCase()}
						</Text>
					</View>
				</View>
			</View>
			<View>
				<View className="w-[130px] max-h-[100px] justify-end ">
					<Card.Cover
						className="w-full h-full rounded-xl shadow-lg bg-white saturate-200 border-2 mb-1 border-gray-300 "
						source={{
							uri: getWeatherIcon(state.weather.weather[0].icon),
						}}
					/>
				</View>
				<View className="flex-row bg-white">
					<IconButton
						icon="star"
						iconColor="white"
						size={20}
						containerColor="black"
						onPress={() => {
							const cityCheck = state.favourites.find(
								(x) => x.city === state.city
							);

							if (!cityCheck) {
								setState(
									produce(state, (draft) => {
										// count elements in favourites
										// when elements are more than 4
										// remove oldest element then new element
										if (draft.favourites.length >= 3) {
											draft.favourites.shift();
										}
										draft.favourites.push({
											city: state.city,
											temperature:
												state.weather.main.temp,
										});
									})
								);

								// save favourites to AsyncStorage
								AsyncStorage.setItem(
									"favourites",
									JSON.stringify(state.favourites)
								)
									.then(() => {})
									.catch((error) => {
										console.log(error);
									});
							}
						}}
					/>
					<View className="flex-row">
						<ToggleButton
							icon="temperature-celsius"
							size={20}
							color='black'
							status={
								state.temperatureMode === "celcius"
									? "checked"
									: "unchecked"
							}
							disabled={state.temperatureMode === "celcius"}
							onPress={() => tempeatureChangeHandler("celcius")}
						/>
						<ToggleButton
							icon="temperature-fahrenheit"
							size={20}
							color='black'
							status={
								state.temperatureMode === "fahrenheit"
									? "checked"
									: "unchecked"
							}
							disabled={state.temperatureMode === "fahrenheit"}
							onPress={() =>
								tempeatureChangeHandler("fahrenheit")
							}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};

export default InfoComponent;
