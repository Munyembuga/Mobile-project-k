import { View, Text,Image } from 'react-native'
import React from 'react'
import Stockfield from '../Components/stockfield'
const StockCard = (props) => {
  return (
    <View className="bg-white mt-4 border border-gray-300 rounded w-[90%] self-center  flex-row items-center p-2"
    style={{
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 1, 
    }}>
      <View className="bg-gray-100 p-1 rounded  justify-center self-center w-[25%]">
       {props.Image? <Image source={{uri:`${props.Image}`}}
        className=" self-center p-5 w-[50%] h-28"
        style={{
            objectFit:'contain'
        }}
        />: <Image source={require('../../assets/images/cylinder1.png')}
        className=" self-center p-5 w-[50%] h-28"
        style={{
            objectFit:'contain'
        }}
        />}
      </View>
      <View className=" w-[100%] ml-8 space-y-2">
        <View className="w-[100%]">
          <Text className="text-base text-blacky" style={{fontFamily:'poppins_semibold'}}>{props.name}</Text>
        </View>
        <View className="flex-row justify-between w-[50%] ">
          <View className="space-y-1">
          <Text className="text-xs" style={{fontFamily:'poppins_semibold'}}>Price</Text>
          <Text className="text-sm" style={{fontFamily:'poppins_medium'}}>{props.price}</Text>
          </View>
          <View  className="space-y-1">
          <Text className="text-xs" style={{fontFamily:'poppins_semibold'}}>Quantity</Text>
          <Text className="text-sm" style={{fontFamily:'poppins_medium'}}>{props.quantity}</Text>
          </View> 
        </View>
        <View  className="flex-row  flex space-x-4   w-[80%]">
          <View className="bg-white rounded flex items-center justify-center border-2 border-gray-200 px-3 py-1 w-20">
            <Text  className="text-xs text-blacky" style={{fontFamily:'poppins_semibold'}}>Full</Text>
            <Text className="text-base text-green-500" style={{fontFamily:'poppins_medium'}}>{props.full}</Text>
          </View>
          <View className="bg-white rounded flex items-center justify-center border-2 border-gray-200 px-3 py-1 w-20">
            <Text  className="text-xs text-blacky" style={{fontFamily:'poppins_semibold'}}>Empty</Text>
            <Text className="text-base text-red-500" style={{fontFamily:'poppins_medium'}}>{props.empty}</Text>
          </View>
        </View>
      </View>
      <View className=" ">
       
        {/* <View>
          
          <Text className="mt-2">Price</Text>
          <Text>12000 Rwf</Text>
        </View> */}
      </View>
      
      <View className="">
     
        
      </View>
    </View>
  )
}

export default StockCard

