import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import AddressCard from "../../../Components/AddressCard";
import { Octicons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const PrivacyPolicy = ({ navigation }, props) => {

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
      <View className=" relative py-4">
        <BackButton />
        <Text className="text-center mt-4" style={{fontFamily:"poppins_semibold"}}>Privacy Policies</Text>

      </View>
      <View className="my-4 mx-auto w-[90%]">
      <Text style={{ fontFamily: "poppins_semibold" }} className="text-center mb-3">Terms and condition</Text>
      <View className="my-2">
       <Text style={{ fontFamily: "poppins_semibold" }} className="">Introduction</Text>
      <Text style={{ fontFamily: "poppins" }} className="text-start text-xs">
      This privacy statement describes how we use data in our browsers, websites, and services. Some of the data we use is considered “personal data” under applicable law. However, even when we use personal data, we generally have no way of actually identifying you as an individual, and our users are essentially anonymous to us.
      The specific categories of data that we collect, use, or otherwise process can vary from product to product, from one purpose to another, and in some cases based on your location. This privacy statement sets out when, how, and why we process your data (including but not limited to personal data), as well as your rights under applicable law.
      </Text>
      </View>
      <View className="my-2">
       <Text style={{ fontFamily: "poppins_semibold" }} className="">Data Collection</Text>
      <Text style={{ fontFamily: "poppins" }} className="text-start text-xs">
      The specific categories of data that we collect, use, or otherwise process can vary from product to product, from one purpose to another, and in some cases based on your location. This privacy statement sets out when, how, and why we process your data (including but not limited to personal data), as well as your rights under applicable law.
      </Text>
      </View>
      <View className="my-2">
       <Text style={{ fontFamily: "poppins_semibold" }} className="">Loacation</Text>
      <Text style={{ fontFamily: "poppins" }} className="text-start text-xs">
      The specific categories of data that we collect, use, or otherwise process can vary from product to product, from one purpose to another, and in some cases based on your location. This privacy statement sets out when, how, and why we process your data (including but not limited to personal data), as well as your rights under applicable law.
      </Text>
      </View>
     
      
      </View>
   
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

