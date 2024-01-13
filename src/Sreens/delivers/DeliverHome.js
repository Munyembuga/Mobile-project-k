import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import TopTabDelivers from './TopTabDelivers';
const DeliverHome = () => {
    
  return (
    <SafeAreaView className="bg-white h-full">
        <View className="self-start ml-10 flex-row mt-10  space-x-6">
        <View className="text-10    bg-white border p-4 rounded-full border-gray-100 " style={{
            elevation:4
        }}>
        <FontAwesome5 name="user-alt" size={24} color="black" />
        
        </View>
        <View className="mr-12 justify-center">
        <Text className="text-[#8E8E93] ">Jean De Dieu</Text>
        <Text className="text-[#8E8E93] ">07848576789</Text>
        </View>
  
    
        </View>
    <View className="flex-row justify-center my-3 p-2 flex-wrap space-x-1 bg-red-400">
      <View className="h-[80] m-2  bg-white p-2 rounded border border-gray-400 w-[42%]" style={{
        elevation:1
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={10} color="#08C25E" />
        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Completed</Text>
        </View>
      
        <Text className="text-12 self-center text-blacky text-lg" style={{fontFamily:"poppins_semibold"}}>13</Text>
       
      </View>
      <View className="h-[80] w-[42%] m-2 bg-white p-2 rounded border border-gray-400" style={{
        elevation:1
      }}>
        <View className="flex-row space-x-2 items-center ">
           
            <FontAwesome name="dot-circle-o" size={14} color="#08C25E" />
        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Completed</Text>
        </View>
      
        <Text className="text-12 self-center text-blacky text-lg" style={{fontFamily:"poppins_semibold"}}>13</Text>
       
      </View>
      <View className="h-[80] w-[42%] m-2 bg-white p-2 rounded border border-gray-400" style={{
        elevation:1
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="#08C25E" />
        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Completed</Text>
        </View>
      
        <Text className="text-12 self-center text-blacky text-lg" style={{fontFamily:"poppins_semibold"}}>13</Text>
       
      </View>
      <View className="h-[80] w-[42%] m-2 bg-white p-2 rounded border border-gray-400" style={{
        elevation:1
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="#08C25E" />
        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Completed</Text>
        </View>
      
        <Text className="text-12 self-center text-blacky text-lg" style={{fontFamily:"poppins_semibold"}}>13</Text>
       
      </View>
 
    </View>
    <View className="mt-[10px]">
   <TopTabDelivers/> 
    </View>
    </SafeAreaView>
  )
}

export default DeliverHome

