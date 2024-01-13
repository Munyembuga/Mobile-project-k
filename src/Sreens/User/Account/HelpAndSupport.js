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
import FAQ from "../../../Components/FAQ";
import { Octicons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HelpAndSupport = ({ navigation }, props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
      <View className=" relative py-4">
        <BackButton />
        <Text className="text-center mt-4" style={{fontFamily:"poppins_semibold"}}>FAQ</Text>
      </View>
      <View className="my-4">
        <FAQ 
        question="Can I order more that one gas bootle at once if it is all"
        answer="Yes, You can order as many gas cylinders as you like"
        />
        <FAQ 
        question="Where are SP gas centers"
        answer="We have very many branches accross the country, to get the one nearest to you open google maps and check 'SP Gas '"
        />
        <FAQ 
        question="Do you do delivery, or do Ihave to come and pick it"
        answer="We do both, if you have bootle you self a gas cylinder you can either come and take it at the nearest station to you or you can allow us to bring it to you."
        />
        <FAQ 
        question="Where are SP gas centers"
        answer="We have very many branches accross the country, to get the one nearest to you open google maps and check 'SP Gas '"
        />
        <FAQ 
        question="Where are SP gas centers"
        answer="We have very many branches accross the country, to get the one nearest to you open google maps and check 'SP Gas '"
        />
      </View>
  
    </SafeAreaView>
  );
};

export default HelpAndSupport;

