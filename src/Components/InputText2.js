import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
    ToastAndroid,  TouchableWithoutFeedback, Keyboard
  } from "react-native";
import React , {useEffect, useState} from 'react'
import { Octicons, Feather } from "@expo/vector-icons";

const InputText2 = (props) => {
    const [focused, setFocused] = useState(false)
  return (
    <View
    className=" mx-auto my-2 w-[85%] relative">
    {props.field && <Text style={{fontFamily:"poppins"}} className={focused ?"absolute left-3 top-[-5px] z-10 text-xs text-primary bg-white px-1 text-md transition-all delay-150":"absolute left-3 top-3 text-gray-400 text-md"}>{props.field}</Text>}
    <View className="flex-row px-2 border-[1px] border-gray-400 justify-between  mb-3 rounded items-center" style={{borderColor:!focused? "rgb(156 163 175)":"rgb(8 194 94)"}}>
            <TextInput 
              placeholder=""
              onChangeText={props.onChangeText}
              value={props.value}
              className="w-[75%] py-2 items-center "
              secureTextEntry={props.secureInput}
              style={{fontFamily:"poppins"}}
              onBlur={props.onBlur}
              onFocus={()=>{setFocused(true)}}

            />
            <TouchableOpacity style={{marginTop:0}} onPress={props.handleSecure} >
            <Feather name={props.Icon} size={20} color="green" />
            </TouchableOpacity>
            
</View>
    </View>

  )
}

export default InputText2