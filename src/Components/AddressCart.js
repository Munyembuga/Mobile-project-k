import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { EvilIcons, Octicons } from "@expo/vector-icons";

const AddressCart = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        className="flex-row bg-red-300 space-x-5 my-3 border border-gray-300 space relative overflow-hidden p-2 rounded items-center justify-evenly"
      >
        {props.defaultAddress == "Address 1" && (
          <View className="absolute right-[-13] rotate-45 top-2 bg-primary px-3 rounded-ful">
            <Text
              style={{ fontFamily: "poppins", fontSize: 10, color: "white" }}
            >
              Default
            </Text>
          </View>
        )}
        <View className="bg-slate-200 items-center justify-center w-12 h-12 rounded-full">
          <Octicons name="location" size={26} color="black" />
        </View>
        <View>
          <Text style={{ fontFamily: "poppins_semibold" }}>Address 1</Text>
          <Text style={{ fontFamily: "poppins" }}>
            {props.address}
            {/* { Nyamirambo, kosimos KN st34} */}
          </Text>
          <Text style={{ fontFamily: "poppins" }}>Tel: 0788345321</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCart;
