import { View, Text } from 'react-native'
import React from 'react'

const OrderDetailscomponents = (props) => {
  return (
    <View className=" w-[95%] mx-auto rounded p-2 space-y-1 b flex-row justify-between border-b-2 border-gray-400 ">
  
    <View className="flex-row  ">
      <View  className="space-y-1">
      <Text className=" text-xs " style={{fontFamily:"poppins_semibold"}}>Type: </Text>
      <Text className=" text-xs " style={{fontFamily:"poppins_semibold"}}>Kilo: </Text>
   
      </View>
      <View  className="space-y-1">
      <Text className="text-xs " style={{fontFamily:"poppins"}}>{props.Type}</Text>
    <Text className="text-xs" style={{fontFamily:"poppins"}}>{props.kilo} </Text>
    {/* <Text className="" style={{fontFamily:"poppins"}}>{props.count}</Text> */}
      </View>
   
    </View>
    <View className=" flex-row ">
      <View className="space-y-1">
      <Text className=" text-xs " style={{fontFamily:"poppins_semibold"}}>Count: </Text>
      <Text className=" text-xs " style={{fontFamily:"poppins_semibold"}}>Price: </Text>
   
      </View>
      <View  className="space-y-1">
      <Text className="text-xs " style={{fontFamily:"poppins"}}>{props.count}</Text>
    <Text className="text-xs" style={{fontFamily:"poppins"}}>{props.price} </Text>
    {/* <Text className="" style={{fontFamily:"poppins"}}>{props.count}</Text> */}
      </View>
   
    </View>
    {/* <View className=" border-b-2 ">
    <Text className="" style={{fontFamily:"poppins"}}>count {props.kilo} kg Cylinder</Text>
    <Text className="" style={{fontFamily:"poppins"}}> price{props.price}</Text>
    <Text className="" style={{fontFamily:"poppins"}}>{props.count}</Text>
    </View> */}
    </View>
  )
}

export default OrderDetailscomponents