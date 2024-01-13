import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DriverHome = (props) => {
 const  navigation=useNavigation() 
  return (
    <TouchableOpacity className="rounded border space-y-2 border-gray-300 mx-auto w-[90%] my-2  bg-white" onPress={props.onPress} style={{borderColor:props.status === "Completed"?"rgb(8 194 94)":"rgb(209 213 219)"}}>     

      <View className="flex space-y-4 mt-3 py-2">
      <View className="flex flex-row justify-between mx-1 mr-2 items-center">
       <View className=" bg-orange-200 rounded-full mx-1 self-start border-gray-50 " style={{
            elevation:0, backgroundColor: props.status === "Delivering"?"rgb(254 215 170)":"rgb(187 247 208) "
        }}>
            <Text className="px-2 py-1 text-primary text-xs"style={{
                fontFamily:"poppins_semibold", color: props.status === "Delivering"?"orange":"rgb(8 194 94)"
            }}>{props.status} </Text>
        </View>
        <View className="flex-row self-center space-x-1">
      
        <MaterialIcons name="date-range" size={14} color="black" style={{
            fontFamily:"poppins_bold" 
        }} />
            <Text className="text-xs justify-center "tyle={{
                fontFamily:"poppins_bold"
            }}>{props.date || "__:__"}</Text>
           
        </View>
        <View className="flex-row  space-x-1">
        <Ionicons name="ios-time-outline" size={14} color="black" style={{
            fontFamily:"poppins_bold" 
        }} />
       
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>{props.time || "__:__"}</Text>
        </View>
      </View>

      <View className="flex-row px-4 justify-between">
      <View className="">
       
      <View className="flex-row space-x-1 items-center my-1">
      <MaterialIcons name="person-outline" size={18} color="white" className="bg-primary p-2 rounded" style={{backgroundColor:"#08C25E", borderRadius:40, padding:2}}/>
        <Text className="text-xs text-blacky" style={{
              fontFamily:"poppins"
          }}>{props.name || "Not provided"}</Text>
          
      </View>
      <View className="flex-row space-x-1 items-center my-1">
      <MaterialIcons name="phone" size={12} color="white" style={{backgroundColor:"#08C25E", borderRadius:40, width:20, height:20, textAlign:"center", paddingTop:3}}/>
        <Text className="text-xs text-blacky" style={{
              fontFamily:"poppins"
          }}>{props.phone || "07*****"}</Text>
      </View>
      <View className="flex-row space-x-1 items-center my-1">
      <MaterialIcons name="location-pin" size={18} color="white" style={{backgroundColor:"#08C25E", borderRadius:40, padding:2}}/>
        <Text className="text-xs text-blacky" style={{
              fontFamily:"poppins"
          }}> {props.street || "Not provided"}</Text>
      </View>
      </View>

 
      <View className="space-y-1">
      <View className="flex-row  my-1">
      <Text className="text-xs" style={{
              fontFamily:"poppins_semibold"
          }}>Cylinders: </Text>
        <Text className="text-xs text-primary" style={{
              fontFamily:"poppins_semibold"
          }}>{props.cyilnder}</Text>
      </View>
      <View className="flex-row my-1">
      <Text className="text-xs" style={{
              fontFamily:"poppins_semibold"
          }}>Addons: </Text>
        <Text className="text-xs text-primary" style={{
              fontFamily:"poppins_semibold"
          }}>{props.addons}</Text>
      </View>
      <View className="flex-row my-1">
      <Text className="text-xs" style={{
              fontFamily:"poppins_semibold"
          }}>Status: </Text>
        <Text className="text-xs text-primary" style={{
              fontFamily:"poppins_semibold"
          }}>{props.paid}</Text>
      </View>
      <View className="flex-row my-1">
      <Text className="text-xs" style={{
              fontFamily:"poppins_semibold"
          }}>Amount: </Text>
        <Text className="text-xs text-primary" style={{
              fontFamily:"poppins_semibold"
          }}>{props.amount}</Text>
      </View>
      </View>
      </View>
       
       
      </View>
    
    </TouchableOpacity>
    
  )
}

export default DriverHome