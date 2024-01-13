import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';

const ManagerOrderCard = (props) => {
const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={props.Navigate} className="m-1 my-3 flex-row items-center justify-between border-gray-300 border p-3 rounded mx-auto w-[92%]">
    <View className="space-y-2">

    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Order ID:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">#2341</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Name:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">{props.name}</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Method:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">MoMo</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Amount:</Text>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-primary text-xs">{props.amount || 0} Rwf</Text>
    </View>
    
    </View>
    <View className="space-y-2 min-w-[45%]">

    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Date:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">{props.date}</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Location:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs"> {props.location}</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Phone:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky text-xs">{props.phone}</Text>
    </View>
    
    <View className="flex-row space-x-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Status: </Text>
    <View className="flex-row space-x-2">
    <FontAwesome name={props.icon} size={16} color={props.iconColor}/>
    <Text style={{fontFamily:"poppins", color: `${props.iconColor}`}} className="text-primary text-xs">{props.status}</Text>

    </View>
    </View>
    
    </View>
   
    </TouchableOpacity>
  )
}

export default ManagerOrderCard