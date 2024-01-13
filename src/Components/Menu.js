import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{navigation.openDrawer()}} className="w-11 h-11 bg-primary rounded-full items-center justify-center  flex-col absolute top-0 left-5">
     
      <Image 
      source={require("../../assets/images/menu-lines.png")}
      />
    </TouchableOpacity>
  )
}

export default Menu