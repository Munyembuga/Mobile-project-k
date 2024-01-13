import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const NotificationBell = () => {
const navigation =useNavigation()
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate("ManagerNotificationPage")}} className="relative">
    {/*<View className="bg-red-600  rounded-full w-5 h-5  items-center justify-center absolute z-20 right-[-5px] top-[-5px]" >
    <Text  className="text-center  text-xs text-white "
    style={{fontFamily:"poppins_semibold"}}></Text>
  </View>*/}
    
    <Ionicons name="notifications" size={26} color="rgb(59 130 246)"/>
    </TouchableOpacity>
  )
}

export default NotificationBell