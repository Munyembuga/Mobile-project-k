import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const PhoneInputText = (props) => {
  return (
    <View className="mx-auto my-2 w-[85%]">
    <Text style={{fontFamily:"poppins_semibold"}}>{props.field} {props.required &&<Text className="text-red-500">*</Text>}</Text>
    <View className="flex-row justify-between" style={{borderColor:`${props.borderColor}`}}>
    <View className="border border-gray-500 p-1 text-xs rounded  w-[15%] flex items-center justify-center">
    <Image
      className="w-9 h-7 rounded"
      source={require("../../assets/images/rwanda.png")}
    />
  </View>
  <View className="border border-gray-400 w-[77%] flex-row items-center justify-between rounded px-3">
    <TextInput
    placeholder={props.placeholder}
    onChangeText={props.onChangeText}
    value={props.value}
    className="w-[75%] py-2 items-center"
    secureTextEntry={props.secureInput}
    style={{fontFamily:"poppins"}}
    onBlur={props.onBlur}
  />
  <TouchableOpacity style={{marginTop:0}} onPress={props.handleSecure} >
  <Feather name={props.Icon} size={20} color="green" />
  </TouchableOpacity>
    </View>        
  </View>
  <Text className="text-red-600 text-sm mx-2 ml-[25%] mt-1" style={{fontFamily:"poppins"}}>
    {props.Error}
  </Text>
</View>
  )
}

export default PhoneInputText