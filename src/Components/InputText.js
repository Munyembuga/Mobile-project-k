import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Feather } from "@expo/vector-icons";

const InputText = (props) => {
    const [secureInput, setSecureInput] = useState(false)
    const [passwordError, setPasswordError] = useState("")
  return (
    <View className=" mx-auto my-2 w-[85%]">
    <Text style={{fontFamily:"poppins_semibold"}}>{props.field} {props.required &&<Text className="text-red-500">*</Text>}</Text>
    <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center" style={{borderColor:`${props.borderColor}`}}>
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
          <Text className="text-red-600 text-sm mt-[-10px] mx-2" style={{fontFamily:"poppins"}}>
            {props.Error}
          </Text>
    </View>
  )
}

export default InputText