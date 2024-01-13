import { View, Text, Image, TouchableOpacity, ActivityIndicator, Pressable } from "react-native";
import React, {useState, useEffect} from "react";
import { Entypo } from '@expo/vector-icons'; 
import Icon from "react-native-vector-icons/Ionicons";

const CartComponet = (props) => {
  
  return (
    <Pressable onPress={props.onPress}
      className=" mt-4  bg-white   rounded flex-row border border-gray-200 items-center w-[90%] mx-auto justify-between py-2"
      style={{
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
      }}
    >
      <View className="flex ml-3  py-1 bg-gray-100 h-[96%] rounded">
        <Image source={{uri:props.image}} className="mt-0  w-20 h-20"  style={{
          objectFit:'contain', resizeMode:"contain"
        }}/>
      </View>
      <View className="">
        <View>
          <Text className="text-blacky text-sm " style={{fontFamily:"poppins_semibold"}}>
           
            {props.name}
          </Text>
        </View>
        <View className="mt-3">
        <Text className="text-[#0050AA] " style={{fontFamily:"poppins_semibold"}}>
          {props.quantity} kg
      
          </Text>
        </View>
        <View className="mt-3">
          <Text className="text-blacky" style={{fontFamily:"poppins_semibold"}} >
            Price: {props.price}
          </Text>
        </View>
      </View>
     
      <View className="pr-2  h-full flex-col ">
      <TouchableOpacity className="flex-row justify-center rounded gap-2 my-1 mb-4" onPress={props.delete}>
        <Icon name="clipboard-outline" color="red" size={15} />
        <Text className="text-red-500" style={{fontFamily:"poppins_semibold"}}>Delete</Text>
      </TouchableOpacity>
      <View className="flex-row gap-1 text-lg bg-white h-[50px] self-end rounded justify-between align-center pr-1 border border-gray-300">
        <TouchableOpacity className="bg-primary flex-col h-10 rounded items-center justify-center p-1 " onPress={props.decrease}>
          <Text  className="text-2xl text-bold text-white  self-center" style={{fontFamily:"poppins"}}>-</Text>
        </TouchableOpacity>
        <View className="items-center justify-center"></View>
        <Text className="text-2xl m-auto mx-1 text-center  h-full pt-1" style={{fontFamily:"poppins_semibold"}}>{props.count}</Text>
       
        <TouchableOpacity  className="bg-primary flex-col h-10 rounded items-center justify-center p-1 " onPress={props.increment}>
          <Text className="text-2xl text-white text-bold" style={{fontFamily:"poppins"}}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
    </Pressable>
  );
};

export default CartComponet;
