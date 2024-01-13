import { View, Text, ScrollView } from 'react-native'
import React from 'react'

const CheckOutCompent = ({OrderTotal,DeliveryFee,Total,totalAmount,orderPrice,fees}) => {
  return (
    <View className="">
        
    <View className=" mt-2  bg-white   rounded ml-6 mr-7 flex flex-row justify-around  space-x-7 border border-gray-300"
    style={{
      shadowOpacity: 0.2,
      shadowRadius: 3,
            
    }}>
        <View className="space-y-1  ">
            <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>{OrderTotal}</Text>
            <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>{DeliveryFee}</Text>
            <Text className="text-[12px] text-[#000000]   " 
            style={{
                fontFamily:'poppins'
            }}>{Total} </Text>
        </View>
        <View  className="space-y-1 mt-3 mb-3 ">
            <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>{orderPrice}</Text>
            <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>{fees}</Text>
            
            <View className="  items-center justify-center "  style={{}}>
            <Text className="text-blacky text-[14px]" style={{
                fontFamily:'poppins_semibold'

            }}>{totalAmount}</Text>
            </View>
           
        </View>
       
    </View>
    </View>
  )
}

export default CheckOutCompent