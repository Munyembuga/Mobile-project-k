import { View, Text } from 'react-native'
import React from 'react'

const Stockfield = ({name,Type}) => {
  return (
    <View className="  bg-white my-3">
     <Text className="text-[10px] text-black"
  style={{fontFamily:'poppins'}}>{Type}:</Text>
     <Text className=" text-blacky text-xs" 
        style={{ fontFamily:'poppins_semibold'
     }}>{name}</Text>
    </View>
  )
}

export default Stockfield