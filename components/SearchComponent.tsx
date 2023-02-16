import { View } from "react-native";
import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import produce from "immer";
import { IconButton, TextInput, Text } from "react-native-paper";
import { codeToCountryName } from "../data/country";
import { useDebounce } from "use-debounce";
import { getCityURL, useEffectAsync } from "../util";
import axios from "axios";

const SearchComponent = () => {
	const { state, setState } = useContext(UserContext);

	const [text, setText] = useState<string>("london");
	const [search] = useDebounce<string>(text, 1000);

	const getCityData = async () => {
		if (search === "") {
			return;
		}

		const URL = getCityURL(search);

		try {
			const response = await axios.get(URL);

			if (response && response.data) {
				const data = response.data;
				setState(
					produce(state, (draft) => {
						draft.city = search;
						draft.countryName = codeToCountryName(
							data.sys.country as string
						);
						draft.weather = response.data;
						draft.errors.search = false;
					})
				);
				return;
			}
		} catch (error) {
			setState(
				produce(state, (draft) => {
					draft.errors.search = true;
				})
			);
			return;
		}
	};

	// handle initial page load
	useEffectAsync(async () => {
		await getCityData();
	}, [search]);

	return (
		<View className="w-full min-h-[50px] items-center justify-center mt-5 ">
			<View className="flex-1 flex-row items-center justify-center   max-w-[90%] ">
				<TextInput
					value={text}
					className="mx-2 "
					style={{
						width: "100%",
						borderWidth: 1,
						borderColor: "#000000",
						borderRadius: 5,
						backgroundColor: "#ffffff",
					}}
					onChangeText={(val) => {
						setText(val.toLowerCase());
						setState(
							produce(state, (draft) => {
								draft.errors.search = false;
							})
						);
					}}
					placeholder={"City Name"}
				/>
				<IconButton
					icon="keyboard-backspace"
					size={20}
					iconColor="black"
					style={{
						borderWidth: 1,
						borderColor: "#000000",
					}}
					onPress={() => {
						setText("");
						setState(
							produce(state, (draft) => {
								draft.errors.search = false;
							})
						);
					}}
				/>
			</View>

			{/* show error message in red  */}
			<Text className="text-red-500 font-bold mt-10 text-start ">
				{state.errors.search ? `${search} city not found` : ""}
			</Text>
		</View>
	);
};

export default SearchComponent;
