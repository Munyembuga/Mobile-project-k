import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Octicons, Feather } from '@expo/vector-icons'

const AddressCard = (props) => {
  return (
    <View className="bg-white rounded border border-gray-300 w-[90%] mx-auto my-2">
    <TouchableOpacity className="flex-row space-x-5 justify-between">
    <View className="bg-slate-200 items-center justify-center w-16 h-20 ">
      <Octicons name="location" size={26} color="black" />
    </View>
    <View className="justify-center">
      <Text style={{ fontFamily: "poppins_semibold" }}>Address 1</Text>
      <Text style={{ fontFamily: "poppins" }}>
      {props.address}
        {/* Nyamirambo, kosimos KN st34 */}
      </Text>
    </View>
    <TouchableOpacity className="bg-primary items-center justify-center rounded rounded-l-none rounded-b-none self-start justify-self-start   w-8 h-8 ">
    <Feather name="edit-2" size={20} color="white" />
  </TouchableOpacity>
  </TouchableOpacity>
    </View>
  )
}

export default AddressCard