import { View, Text,Modal,TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
const ModelCancelled = (props) => {

  return (
    <View className=" bg-white">
       <Modal
        visible={props.visible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
        slide
      >

         <View className="mt-[100%] border border-gray-500  mx-4 rounded py-2 justify-center bg-white">
         <TouchableOpacity onPress={() => props.visibleCancelled}>
         <View className="text-right m-1 items-end p-2 mt-[-50px]">
  <AntDesign name="closecircleo" size={24} color="red" />
  </View>
  </TouchableOpacity>
            <Text className="text-sm ml-10 mt-2"   
            style={{fontFamily: 'poppins_semibold '}}> Enter reason for cancelling </Text>
           <View className="rounded border border-gray-300 mt-2 mx-10 ">
            <TextInput 
            onChangeText={props.setValueArea}
            value={props.valueArea}
            placeholder="Customer doesn’t have enough cylinders as he requested for. "
            multiline={true}
            numberOfLines={4}
            className="h-40 w-[98%] mx-2"/>

           </View>
           <View className="flex-row space-x-2 mt-2 items-center bg-[#FF0303] p-2 rounded self-center ">
          <Entypo name="camera" size={24} color="white" />
          <Text
            className="text-white text-xs "
            style={{ fontFamily: "poppins_semibold" }}
          >
            Cancel Delivery
          </Text>
        </View>
        </View>
        </Modal>
    </View>
  )
}

export default ModelCancelled