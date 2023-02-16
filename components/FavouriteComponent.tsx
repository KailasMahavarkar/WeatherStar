import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { View, Pressable } from "react-native";
import UserContext from "../context/UserContext";
import produce from "immer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FavouriteComponent = () => {
	const { state, setState } = useContext(UserContext);

	return (
		<View className="w-full">
			{state.favourites.length === 0 ? (
				<Text className="text-center text-lg font-bold">
					No Favourites
				</Text>
			) : (
				<Text className="font-bold mt-5">Top Favourites</Text>
			)}

			{state.favourites.map((item, index) => {
				return (
					<View
						className="flex flex-row justify-between w-full my-2 border-2 border-primary rounded-md  p-2"
						key={index}
					>
						<Text className="flex-1 text-black ">{item.city}</Text>
						<Text className="text-black">{item.temperature}</Text>

						<Pressable
							className="flex-1  items-end  "
							onPress={() => {
								setState(
									produce(state, (draft) => {
										draft.favourites =
											draft.favourites.filter((x) => {
												return item.city !== x.city;
											});
									})
								);

								AsyncStorage.setItem(
									"favourites",
									JSON.stringify(state.favourites)
								).then(() => {
									console.log("saved");
								});
							}}
						>
							<FontAwesomeIcon size={25} icon={faTrash} />
						</Pressable>
					</View>
				);
			})}
		</View>
	);
};

export default FavouriteComponent;
