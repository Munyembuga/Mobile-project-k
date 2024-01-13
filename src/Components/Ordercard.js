import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const Ordercard = (props) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={props.singleView} className="m-2 flex-row items-center justify-between border-gray-300 border-[1px] p-2 rounded-lg  py-3 mx-auto w-[90%]">
    <View className="flex-row space-x-2 items-center">
    <View className="Image bg-secondary p-1 rounded-full w-10 h-10 items-center justify-center">
    <Image
      source={require("../../assets/images/red-gas-vector.png")}
      className="h-full w-full"
      style={{ resizeMode: "contain" }}
      />
    </View>
    <View className=" px-2 space-y-1">
    <View className="flex-row items-center space-x-2">
    <FontAwesome name={props.icon} size={16} color="#08C25E"/>
    <Text style={{fontFamily:"poppins"}} className={props.status=="Delivering"?"text-primary":"text-blacky"}>{props.status}</Text>
    </View>
    <View className="flex ">
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">{props.date}</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">{props.time}</Text>
    </View>
    <View className="flex flex-row space-x-1">
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">Paid Status:</Text>
    <Text style={{fontFamily:props.isPaid== "Paid" ?"poppins_semibold":"poppins", color:props.isPaid== "Paid" ?"rgb(8 194 94)":"orange" }} className={"text-xs"} >{props.isPaid}</Text>
    </View>

    </View>
    </View>
   
    <View>
    <Text className="text-black text-sm" style={{fontFamily:"poppins"}}>Total Amount:<Text className="text-sm"></Text></Text>
    <Text className=" text-base" style={{fontFamily:"poppins"}}>{props.amount} Rwf</Text>
    </View>
  
    
      
    </TouchableOpacity>
  )
}

export default Ordercard