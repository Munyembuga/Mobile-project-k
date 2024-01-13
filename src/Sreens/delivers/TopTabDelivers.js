import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'

import { useNavigation, useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context' 
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AssignedDelivery from './AssignedDelivery'
import CancalledDeliver from './CancalledDeliver'
import CompletedDeliver from './CompletedDeliver'
import DeliveryDelivery from './DeliveryDelivery';
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator()


const TopTabDelivers= () => {
    const navigation = useNavigation()

    const[assignedOrder,setAssignrdOrder] = useState([])
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  
  const fetchNewAssigned= async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/by-driver/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "Driver Orde in driver tab",response.data
        );
        setAssignrdOrder(response?.data);
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch Driver Assigned orders"
        );
      });
  };

  useFocusEffect(React.useCallback(() => {
    fetchNewAssigned();
  }, []));

  let assigned = assignedOrder.filter(item => item.Status === "Assigned");
  let completed = assignedOrder.filter(item => item.Status === "Completed");
  let cancelled = assignedOrder.filter(item => item.Status === "Cancelled");
  let delivering = assignedOrder.filter(item => item.Status === "Delivering");

  console.log("Driver Profile in tab", authProfile)

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
  
<View>
<View className="self-start ml-5 flex-row   space-x-6">
        <View className="text-10    bg-white border p-4 rounded-full border-gray-100 " style={{
            elevation:0
        }}>
        <FontAwesome5 name="user-alt" size={24} color="black" />
        
        </View>
        <View className="mr-12 justify-center">
        <Text className="text-blacky " 
        style={{
            fontFamily:'poppins_semibold'
        }}>{authProfile.fullName || ""}</Text>
        <Text className="text-[#8E8E93] "  style={{
            fontFamily:'poppins'
        }}> {authProfile.PhoneNumber || "078*******"}</Text>
        </View>
  
    
        </View>
    <View className="flex-row justify-center my-3 p-2 flex-wrap space-x-1">
      <View className="h-[50] m-2  bg-white p-2 rounded border border-gray-300 w-[40%]" style={{
        elevation:0
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="rgb(156 163 175)" className="ml-5"/>
        <Text className="text-12 self-center text-blacky text-xl" style={{fontFamily:"poppins_semibold"}}>{assigned.length}</Text>

        <Text className="text-blacky justify-center text-xs w-[90%]" style={{fontFamily:"poppins"}}>New Orders</Text>
       
        </View>
      </View>
      <View className="h-[50] m-2  bg-white p-2 rounded border border-gray-400 w-[40%]" style={{
        elevation:0
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="orange" />
        <Text className="text-12 self-center text-blacky text-xl" style={{fontFamily:"poppins_semibold"}}>{delivering.length}</Text>

        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Delivering</Text>
       
        </View>
      </View>
      <View className="h-[50] m-2  bg-white p-2 rounded border border-gray-300 w-[40%]" style={{
        elevation:0
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="#08C25E" />
        <Text className="text-12 self-center text-blacky text-xl" style={{fontFamily:"poppins_semibold"}}>{completed.length}</Text>

        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Completed</Text>
       
        </View>
      </View>
      <View className="h-[50] m-2  bg-white p-2 rounded border border-gray-300 w-[40%]" style={{
        elevation:0
      }}>
        <View className="flex-row space-x-2 items-center">
           
            <FontAwesome name="dot-circle-o" size={14} color="red" />
        <Text className="text-12 self-center text-blacky text-xl" style={{fontFamily:"poppins_semibold"}}>{cancelled.length}</Text>

        <Text className="text-blacky justify-center text-xs" style={{fontFamily:"poppins"}}>Cancelled</Text>
       
        </View>
      </View>

    </View>
   
</View>
   <Tab.Navigator
   initialRouteName="AssignedDelivery"
   tabBarOptions={{
    activeTintColor:"#08C25E",
    inactiveTintColor: "#808080",
    indicatorStyle: { backgroundColor: "#08C25E" },
    labelStyle: { 
        fontSize: 10 ,
        fontFamily:'poppins_semibold'
    },

    style: {
      backgroundColor: "white",
      marginTop: 2,
      fontFamily: "poppins_semibold", 
      fontSize:4,
    },
   
   }}>
{/*   <Tab.Screen 
   name = "Assigned"
   component={AssignedDelivery}
   options={{tabBarLabel: "Assigned", style:{fontSize:6}}}
  /> */}
  <Tab.Screen 
   name = "Delivery"
   component={DeliveryDelivery}
   options={{tabBarLabel: "Delivering"}}
   />

    <Tab.Screen 
   name = "Completed"
   component={CompletedDeliver}
   options={{tabBarLabel: "Completed", style:{fontSize:6}}}
   />
 
   <Tab.Screen 
   name = "Cancelled"
   component={CancalledDeliver}
   options={{tabBarLabel: "Cancelled"}}
   />
   </Tab.Navigator> 
   </SafeAreaView>
  )
}

export default TopTabDelivers