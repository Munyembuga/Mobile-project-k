import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationCard = (props) => {
  return (
    <View className="m-2  w-[96%] mx-auto rounded p-3  flex-row justify-between items-center border-2 border-green-200" style={{elevation:0}}>
    <View className="">
    <Text style={{fontFamily:"poppins_semibold"}} className=" ">Ndayishimiye Ernest</Text>
    <Text style={{fontFamily:"poppins"}} className=" ">Requested  4 quantity of  38 kg cylinder</Text>
    
    <TouchableOpacity>
    <Text style={{fontFamily:"poppins"}} className=" ">Read more ...</Text>
    </TouchableOpacity>
    </View>
    <View className="bg-primary h-12 w-12 rounded-full items-center justify-center">
    <MaterialCommunityIcons name={props.icon} size={32} color="yellow" />
    </View>

   
    </View>
  )
}

export default NotificationCard