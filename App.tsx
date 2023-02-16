import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import {
	useSafeAreaInsets,
	SafeAreaProvider,
} from "react-native-safe-area-context";
import InfoComponent from "./components/InfoComponent";
import MoreInfoComponent from "./components/MoreInfoComponent";
import SearchComponent from "./components/SearchComponent";
import WeatherComponent from "./components/WeatherComponent";
import FavouriteComponent from "./components/FavouriteComponent";
import UserContext, { defaultUserValues } from "./context/UserContext";
import { Provider as PaperProvider } from "react-native-paper";
import produce from "immer";
import axios from "axios";
import { IWeatherData } from "./types/type";
import { getCityURL, useEffectAsync } from "./util";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AppWrapper() {
	const [state, setState] = React.useState(defaultUserValues);

	useEffect(() => {
		AsyncStorage.getItem("favourites").then((favourites) => {
			if (favourites && favourites !== null) {
				setState(
					produce(state, (draft) => {
						draft.favourites = JSON.parse(favourites);
					})
				);
			}
		});
	}, []);

	useEffect(() => {
		// update weather data for all favourites city every minute
		const interval = setInterval(() => {
			console.log("refreshing....");

			// loop through the favourites and get the weather data
			const favourites = state.favourites;
			for (let i = 0; i < favourites.length; i++) {
				const city = favourites[i].city;
				const URL = getCityURL(city);
				axios
					.get(URL)
					.then((response) => {
						if (response && response.data) {
							setState(
								produce(state, (draft) => {
									draft.favourites[i].temperature =
										response.data.weather.main.temp;
								})
							);

							// update the favourites in async storage
							AsyncStorage.setItem(
								"favourites",
								JSON.stringify(state.favourites)
							);
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}, 60000);

		return () => clearInterval(interval);
	}, []);

	return (
		<SafeAreaProvider>
			<UserContext.Provider value={{ state, setState }}>
				<PaperProvider>
					<App />
				</PaperProvider>
			</UserContext.Provider>
		</SafeAreaProvider>
	);
}

const Section = ({ children }: { children?: React.ReactNode }) => {
	return (
		<View className="flex flex-row items-center justify-between w-full max-w-[90%] ">
			{children}
		</View>
	);
};

function App() {
	const insets = useSafeAreaInsets();
	const { state, setState } = useContext(UserContext);

	useEffectAsync(async () => {
		const URL = getCityURL("mumbai");

		const response = await axios.get(URL);

		if (response && response.data) {
			setState(
				produce(state, (draft) => {
					draft.temperatureMode = "celcius";
					draft.city = "mumbai";
					draft.countryName = "India";
					draft.weather = response.data as IWeatherData;
					draft.search = "mumbai";
				})
			);
		}
	}, []);

	return (
		<View
			className="flex w-full h-full "
			style={{
				paddingTop: insets.top,
			}}
		>
			<View className="flex flex-col w-full items-center my-5  ">
				<Section>
					<SearchComponent />
				</Section>

				<Section>
					<InfoComponent />
				</Section>

				<Section>
					<WeatherComponent />
				</Section>

				<View className="border-b-[2px] border-gray-100 w-full max-w-[90%] mt-10" />
				<Section>
					<MoreInfoComponent />
				</Section>
				<View className="border-b-[2px] border-gray-100 w-full max-w-[90%] mt-5" />

				<Section>
					<FavouriteComponent />
				</Section>
			</View>
		</View>
	);
}
