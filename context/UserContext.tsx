import React from "react";
import { userContextType } from "../types/type";

export const defaultUserValues: userContextType = {
	city: "0",
	temperatureMode: "celcius",
	countryName: "0",

	search: "",

	weather: {
		coord: {
			lon: 0,
			lat: 0,
		},
		weather: [
			{
				id: 0,
				main: "",
				description: "",
				icon: "50d",
			},
		],
		base: "stations",
		main: {
			temp: 0,
			feels_like: 0,
			temp_min: 0,
			temp_max: 0,
			pressure: 0,
			humidity: 0,
		},
		visibility: 0,
		wind: {
			speed: 0,
			deg: 0,
		},
		clouds: {
			all: 0,
		},
		dt: 0,
		sys: {
			type: 1,
			id: 0,
			country: "IN",
			sunrise: 0,
			sunset: 0,
		},
		timezone: 0,
		id: 0,
		name: "",
		cod: 0,
	},
	loading: false,
	showSearch: false,

	errors: {
		search: false,
	},

	favourites: [],
};

const UserContext = React.createContext({
	state: defaultUserValues,
	setState: (value: React.SetStateAction<userContextType>) => {},
});

export default UserContext;
