import { View, Text, Image, TextInput, Pressable, TouchableOpacity, ToastAndroid } from 'react-native'
import React , {useEffect, useState}from 'react'
import Cable from "../../assets/images/cablejpg.jpg"
import Checkbox from "expo-checkbox";

const AddonCard = (props) => {
  const [iscableChecked, setCableChecked] = useState(false);
  const [pressed, setPressed] = useState(props.pressed)
  const [count, setCount ] = useState(null)

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  
  // useEffect(()=>{if(!pressed){
  //     setCount("0")
  // }},[]) 

  // console.log("Value from add cord",count)
  return (
    <View className="my-4 mx-auto w-[100%] border-[1px] border-gray-300 p-3 rounded-lg relative" style={{ borderColor: pressed ? "rgb(8 194 94)" : "rgb(209 213 219)", borderWidth: 3 }}>
    <Text style={{fontFamily:"poppins_semibold"}}>{props.name}</Text>
    <View className="flex-row space-x-2 items-center justify-around" >
    <View>
    <Image source={{uri:props.image}} className="w-20 h-20" style={{resizeMode:"contain"}}/>
    <Text style={{fontFamily:"poppins"}}>{props.price}</Text>
    <Text style={{fontFamily:"poppins"}}>T: {props.price * (parseInt(count) || 1)}</Text>
    </View>

 {pressed &&   <Checkbox
    disabled={props.disabled}
    value={pressed}
    onValueChange={()=>{setPressed(false); setCount("")}}
    color={iscableChecked ? "rgb(8 194 94)" : undefined}
    className="rounded-full  w-5 h-5 absolute right-4 top-[-15px]"
  />}
  
    <View>
     <TextInput
      className="border border-gray-300 w-16 h-12 rounded p-2"
      placeholder="count"
      value={parseInt(count)}
      onChangeText={(text) => setCount(text)}
      style={{ fontFamily: "poppins" }}
        />

        <TouchableOpacity  disabled={!count}  onPress={()=>{setPressed(!pressed),props.onSelectChange(props.id, count, props.Price)}}  className="bg-primary my-2 rounded p-2 flex items-center justify-center" style={{backgroundColor: !count? "#6BDA9E": "rgb(8 194 94)"}}>
        <Text style={{ fontFamily: "poppins_semibold", color:"white" }}>Add</Text>
        </TouchableOpacity>
    </View>
    </View>
    
    </View>
  )
}

export default AddonCard



// <TextInput 
// disabled
// className="border border-gray-300 w-16 h-12 rounded p-2"
// placeholder="count"
// value={count}
// style={{fontFamily:"poppins"}}
// onChangeText={setCount}

// />