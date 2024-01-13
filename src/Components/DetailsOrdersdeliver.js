import { View, Text,SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import BackButton from './BackButton'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const DetailsOrdersdeliver = () => {
  return (
    <View className="mt-8">
        <View>
        <BackButton/>
        
        </View>
        <View className="mt-16 ml-8 space-x-3 space-y-2">
        <View className=" bg-green-200 rounded-full m-2 border-gray-50 w-24 " style={{
            elevation:2
        }}>
            <Text className="px-3 py-1  text-[#08C25E] text-[11px] "style={{
                fontFamily:"poppins_semibold"
            }}>Deliverying</Text>
        </View>
        <View className="flex-row  space-x-2 mt-2 items-center">
      
        <MaterialIcons name="date-range" size={14} color="black" style={{
            fontFamily:"poppins_bold" 
        }} />
          <Text className="  text-black text-xs  "style={{
                fontFamily:"poppins_semibold"
            }}>Date:</Text>
        
            <Text className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>November 21,2023</Text>
           
        </View>
        <View className="flex-row space-x-2 items-center ">
        <Ionicons name="ios-time-outline" size={14} color="black" style={{
            fontFamily:"poppins_bold" 
        }} />
            <Text className="  text-xs "style={{
                fontFamily:"poppins_semibold"
            }}>Time:</Text>
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>11:00AM </Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
      
            <Text className="  text-xs "style={{
                fontFamily:"poppins_semibold"
            }}>Name:</Text>
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>Munyembuga Jean  De D </Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
      
            <Text className="  text-xs "style={{
                fontFamily:"poppins_semibold"
            }}>Phone Number::</Text>
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>088389283</Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
      
            <Text className="  text-xs "style={{
                fontFamily:"poppins_semibold"
            }}>Street Number:</Text>
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}> kimirongo KNS 123</Text>
        </View>
        <View className="flex-row space-x-2 items-center ">
      
            <Text className="  text-xs "style={{
                fontFamily:"poppins_semibold"
            }}>Address:</Text>
            <Text  className=" text-xs  "style={{
                fontFamily:"poppins"
            }}>Kicukiro,Nyanza </Text>
        </View>
        <View className="mt-10 border rounded bg-white border-gray-500 mr-6"  >
            <View className="  items-center border-b border-gray-500 mx-3 ">
                <Text className="py-1 text-sm"style={{
                fontFamily:"poppins_semibold"
            }} >Items</Text>
            </View>
            <View className="flex-row justify-center space-x-5 ">
               
                <View className="border-r pr-4 mt-2 ">
                <Text className="py-1 text-sm text-black"style={{
                fontFamily:"poppins_semibold"
            }} >Cylinders</Text>
            <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >6 kg</Text>
              <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >12 kg</Text>
              <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >15 kg</Text>
             <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >38 kg</Text>
             <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins_semibold"
            }} >100 kg</Text>
           
                </View>
                <View className="  mt-2">
                <Text className="py-1 text-sm text-black"style={{
                fontFamily:"poppins_semibold"
            }} >Count</Text>
            <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >3</Text>
              <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >5</Text>
              <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >7</Text>
             <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins"
            }} >7</Text>
             <Text className="py-1 text-[10px] text-black"style={{
                fontFamily:"poppins_semibold"
            }} >27</Text>
            
                </View>
            </View>
            <View className="flex-row ">
            <Text className="py-1 text-sm text-black ml-2 mt-[-25px]"style={{
                fontFamily:"poppins_semibold"
            }} >Total</Text>
            {/* <Text>100 kg</Text>
            <Text>10</Text> */}
        </View>
        </View>
       
        
    </View>
     
    
    </View>
  )
}

export default DetailsOrdersdeliver