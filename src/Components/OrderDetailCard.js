import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const OrderDetailCard = (props) => {
  return (
    <View className=" w-[98%] mx-auto rounded p-2 flex-row space-x-6 items-center my-2" >
    
    <View className="p-2 rounded-full border border-primary w-[40] h-[40] flex items-center justify-center" style={{borderColor:props.background}}>
    <FontAwesome name={props.icon} size={20} color={props.background}/></View>
      <View style={{backgroundColor:`${props.background}`}} className="w-[80%] p-1 px-2 rounded">
      <Text style={{fontFamily:"poppins_semibold"}} className="text-white">{props.title}</Text>
      <View>
      <Text style={{fontFamily:"poppins"}} className="text-gray-100">{props.date}</Text>
      <Text style={{fontFamily:"poppins"}} className="text-xs text-gray-100">{props.time}</Text>
      </View>
      </View>
    </View>
  )
}

export default OrderDetailCard