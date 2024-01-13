import { View, Text, TextInput } from 'react-native'
import React from 'react'
import DetailsOrdersdeliver from '../../Components/DetailsOrdersdeliver'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CameraComponent from './TakeCamera'
const ReachDestination = () => {
    const [values,setValues] = useState()
    const[showCamera,setShowCamera] = useState(false);
  return (
    <ScrollView className="h-full bg-white">
    <View>
     
      <DetailsOrdersdeliver/>
      <View className="ml-10 mt-6">
      <View className=" flex-row items-center space-x-5">
        <View>
            <Text className="text-xs" style={{fontFamily:"poppins_semibold"}}>Number Of Empty </Text>
            <Text className="text-xs" style={{fontFamily:"poppins_semibold"}}>Cylinders received</Text>
        </View>
        <View className="w-10 h-6 border rounded items-center ">
            <TextInput  placeholder={"20"}
              onChangeText={setValues}
              value={values} 
              />
        </View>
      </View>
      
    </View>
    <View className="flex-row space-x-4 mt-3 bg-primary p-1 rounded items-center justify-center mx-10">
      <Entypo name="camera" size={24} color="white" />
        <Text className="text-white " style={{fontFamily:'poppins'}}>Take Picture To confirm </Text>
      </View>
      <View className="bg-white border-gray-300 border self-center mt-2 justify-center items-center pb-5 ">
      <EvilIcons name="image" size={100} color="gray" />
      </View>
      <View className="flex-row justify-around
      ">
      <View className="flex-row space-x-2 mt-2 bg-primary p-1 rounded items-center justify-center">
      <AntDesign name="check" size={24} color="white" />
        <Text className="text-white text-xs  " style={{fontFamily:'poppins'}}>Complete Delivery</Text>
      </View>
      <View className="flex-row space-x-2 mt-2 bg-[#FF0303] p-2 rounded items-center ">
      <Entypo name="camera" size={24} color="white" />
        <Text className="text-white text-xs " style={{fontFamily:'poppins_semibold'}}>Cancel Delivery</Text>
      </View>
      </View>
    </View>
    </ScrollView>
  )
}

export default ReachDestination