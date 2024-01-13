import { View, Text, TextInput } from 'react-native'
import React from 'react'

const StockTextfield = (props) => {
  return (
    <View className="my-2 ">
    <View className="bg-white rounded  border border-gray-400  relative p-1">
      <Text className="absolute px-1  bg-white top-[-10px] left-[5px]" 
        style={{
            fontFamily: "poppins",
          }}
        >Quantity</Text>
      <TextInput placeholder={props.placeholder}
      placeholderTextColor={"#F9F9F9"}
       className="w-24 px-2 py-1"  style={{
        fontFamily:'poppins'
       }}
       value={props.value}
       onChangeText={props.onChangeText}
       />
    </View>
      
      {props.Error && <Text className="px-1   bg-white text-red-500" 
        style={{
            fontFamily: "poppins",
          }}
         
        >{props.Error}</Text>}
    </View>
  )
}

export default StockTextfield