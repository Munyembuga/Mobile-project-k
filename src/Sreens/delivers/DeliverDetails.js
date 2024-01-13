import { View, Text, TouchableOpacity, TextInput,Modal } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import DetailsOrdersdeliver from "../../Components/DetailsOrdersdeliver";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import ModelCancelled from "./ModelCancelled";
const DeliverDetails = () => {
  const [values, setValues] = useState();
  const [valuesArea, setValuesArea] = useState();
  const [render, setRender] = useState();
  const navigation = useNavigation();
  const [isVisible, setVisible] = useState(false);
  const showpage = () => {
    return (
    <View>
      
        <View className=" flex-row items-center space-x-5 w-[80%] mx-auto my-3 ">
          <View className="w-[60%]">
            <Text
              className="text-xs"
              style={{fontFamily:"poppins_semibold"}}
            >
              Number Of Empty Cylinders received
            </Text>
            
          </View>
          <View className="w-20 h-10 border rounded items-center relative">
          <Text className="absolute bg-white top-[-10px] px-1 left-[3px] text-xs" style={{ fontFamily: "poppins" }}>Count</Text>
            <TextInput
              placeholder={"20"}
              onChangeText={setValues}
              value={values}
              style={{ fontFamily: "poppins" }}
              className="p-2"
            />
          </View>
        </View>
   
      <View className="flex-row space-x-4 mt-3 bg-primary p-1 rounded items-center justify-center mx-10">
        <Entypo name="camera" size={24} color="white" />
        <Text className="text-white " style={{ fontFamily: "poppins" }}>
          Take Picture To confirm
        </Text>
      </View>
      <View className="bg-white border-gray-300 border self-center mt-2 justify-center items-center pb-5 ">
        <EvilIcons name="image" size={100} color="gray" />
      </View>
      <View
        className="flex-row justify-around">
        <View className="flex-row space-x-2 mt-2 bg-primary p-1 rounded items-center justify-center">
          <AntDesign name="check" size={20} color="white" />
          <Text
            className="text-white text-xs"
            style={{ fontFamily: "poppins" }}
          >
            Complete Delivery
          </Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
        <View className="flex-row space-x-2 mt-2 bg-[#FF0303] p-2 rounded items-center ">
          <Entypo name="camera" size={24} color="white" />
          <Text
            className="text-white text-xs "
            style={{fontFamily:"poppins_semibold"}}
          >
            Cancel Delivery
          </Text>
        </View>
        </TouchableOpacity>
      </View>
     
    </View>)
  };

  const Reach = () => {
    return (
    <TouchableOpacity onPress={() => setRender(1)}>
      <View className="  bg-[#08C25E] flex-row space-x-3 mt-36 items-center  self-center p-2 rounded">
        <AntDesign name="check" size={24} color="white" />
        <Text
          className="  text-white text-base"
          style={{fontFamily:"poppins_semibold"}}
        >
          Reached Destination
        </Text>
      </View>
    </TouchableOpacity>)
  };

  const renderView = () => {
    switch (render) {
      case 1:
        return showpage();
        case 2:
        return Cancelled();
      default:
        return Reach();
    }
  };
  return (
    <ScrollView className="bg-white">
      <View>
        <DetailsOrdersdeliver />
        <View>
            {renderView()}</View>
      </View>
   
        <View className="mt-10">
        <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}>

         <View className="mt-[50%] border border-gray-500  mx-4 rounded py-2 justify-center bg-white">
         <TouchableOpacity onPress={() =>setVisible(false)}>
         <View className="text-right m-1 items-end p-2 mt-[-50px]">
  <AntDesign name="closecircleo" size={24} color="red" />
  </View>
  </TouchableOpacity>
            <Text className="text-sm ml-10 mt-2"   
            style={{fontFamily:"poppins_semibold"}}> Enter reason for cancelling </Text>
           <View className="rounded border border-gray-300 mt-5 mx-4  ">
            <TextInput 
            onChangeText={setValuesArea}
            value={valuesArea}
            placeholder="Customer doesn’t have enough cylinders as he requested for. "
            multiline={true}
            numberOfLines={6}
            className="h-20 w-[98%] p-3"/>

           </View>
           <View className="flex-row space-x-2 mt-2 items-center bg-[#FF0303] p-2 rounded self-center ">
          <Entypo name="camera" size={24} color="white" />
          <Text
            className="text-white text-xs "
            style={{fontFamily:"poppins_semibold"}}
          >
            Cancel Delivery
          </Text>
        </View>
        </View>
        </Modal>
       
        </View>
       
    </ScrollView>
  );
};

export default DeliverDetails;