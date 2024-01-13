import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';


const BackButton = () => {
    const navigation = useNavigation()

  return (
    <TouchableOpacity onPress={()=>{
        navigation.goBack()
    }} className="bg-primary  rounded-full p-1 absolute left-5 top-5 w-8 h-8 flex items-center justify-center ">
    <Ionicons name="ios-arrow-back-outline" size={20} color="white" />
    </TouchableOpacity>
  )
}

export default BackButton