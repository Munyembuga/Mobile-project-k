import { View, Text, Button, TouchableOpacity ,Image, TextInput} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import InputText from "../../../Components/InputText";
import LottieView from "lottie-react-native"
import AnimatedLottieView from "lottie-react-native";
import Gif from 'react-native-gif';

// import { Player, Controls } from '@lottiefiles/react-lottie-player';
const PaymentSuccessPage = ({navigation}) => {

  const [tick, setTick] = useState(false)
  const [showGif, setShowGif] = useState(true); 
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowGif(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);
    const animation = useRef(null);
    useEffect(() => {
      // You can control the ref programmatically, rather than using autoPlay
      // animation.current?.play();
    }, []);

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
    <View className=" relative py-4">
     <BackButton />
    </View>
 
      <View className="w-full items-center my-4 flex-col space-y-10 justify-evenly h-[60%]">


<Image 
      className="absolute top-[-10px]"
      source={require("../../../../assets/images/stars.png")}
      />
     {/*  <Image 
      className=""
      source={require("../../../../assets/images/success.png")}
  />*/}

  {showGif ? (
  <Gif
  source={require("../../../../assets/images/tick.gif")}
  repeat={false} // repeats 3 times
  loop={false}
  className=" w-[80%] h-[60%] rounded-full border bg-transparent top-7 transition-all delay-75"
/>):(
  <Image
  source={require("../../../../assets/images/tick.png")}
  className="w-[80%] h-[60%] rounded-full border bg-transparent top-7 transition-all delay-75"
/>)}
 

      <View className="top-[50%] w-full space-y-10 ">
      <View className="w-[80%] mx-auto items-center space-y-3">
       <Text style={{ fontFamily: "poppins_bold" }} className="text-lg text-primary"> Order Initiated Successfully</Text>
      <Text style={{ fontFamily: "poppins_semibold" }}> Please Conform Payment</Text>
      </View>
     

      <TouchableOpacity
      onPress={()=>navigation.navigate("Home")}
      className="px-3 py-2 bg-primary items-center w-[80%] rounded mx-auto self-end"
    >
      <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
        Track Order
      </Text>
    </TouchableOpacity>
      </View>
     
      </View>
     
    </SafeAreaView>
  );
};

export default PaymentSuccessPage;

// <LottieView 
// className="w-[80%] h-[80%] m-auto"
// source ={require("../../../../assets/animation/check-lottie.json")}
// autoPlay
// />