import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useEffect, useState} from 'react'
import BackButton from '../../Components/BackButton'
import { AntDesign, Entypo, FontAwesome,
  MaterialIcons, } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from 'axios';

const SingleDelivery = ({route}) => {
  const data = route.params.status
  const order = route.params.orders
  const evidence = route.params.evidence
  const navigation = useNavigation()
  const [addons, setAddons]= useState([])
  const {authToken } = useSelector((state) => state.auth);
  const [addLoading, setAddLoading] = useState(true)
  const [showCartItems, setShowCartItems] = useState(false);
  const [showAddons, setShowAddons] = useState(false);

  
  const handleChangeOrderStatus = async (Order) => {
 
    axios({
      method: "PUT",
      url: `https://sp-gas-api.onrender.com/api/v1/order/updateDriver/${Order._id}`,
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTZkZGE5MWVjMmI4OWJkZjk5ZTlkYmIiLCJpYXQiOjE3MDM3ODYwMTMsImV4cCI6MTcwMzc5MzIxM30.VRr8HxmGdn2xurpo0PC9AIRkkx-DlpNKRUN_86a4-i4"}`,
      },
      data: {
        id:Order._id,
        CartId:Order.CartId._id,
        address: Order.address,
        phoneNumber: Order.phoneNumber,
        TotalOrder: Order.TotalOrder,
        Status: "Assigned",
        StationId:Order.StationId._id,
        DriverId:Order.DriverId._id,
      },
    })
      .then((response) => {
        console.log("Response from change status----------------------------", response.data);
      })
      .catch((error) => {
        console.log("error changing status ", error.message);
      });
  };
  

  return (
    <SafeAreaView className="h-full  bg-white relative pb-10">
    <View className="absolute top-10 z-50"><BackButton/></View>

    <ScrollView className="mt-12 flex-col flex w-[100%] p-3 px-5 mx-auto">
    <View className="flex flex-row space-x-2 items-center bg-green-900/5 self-center p-3 rounded-full px-5" style={{backgroundColor:data=="Delivering"? "#FAD6B7" : "#F3F1F1"}}>
   {order?.Status=="Delivering" && <FontAwesome name="dot-circle-o" size={20} color="orange" className=""/>}
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">{order?.Status}</Text>
    </View>
    <View className="my-3 mt-5 space-y-2">
    <View className="flex-row space-x-2 items-center">
    <FontAwesome name="clock-o" size={20} color="black" style={{fontSize:20, fontWeight:500}} className=""/>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Date: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky">32/Dec/2023</Text>
    </View>
    <View className="flex-row space-x-2 items-center">
    <FontAwesome name="clock-o" size={20} color="black" style={{fontSize:20}} className=""/>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Date: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky">32/Dec/2023</Text>
    </View>
    </View>
 
    <View className="my-3 mt-5 space-y-2">
    <View className="flex-row space-x-2 items-center">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Name: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky">{order.CartId.UserId.FullNames}</Text>
    </View>
    <View className="flex-row space-x-2 items-center">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Phone Number: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky">{order.phoneNumber}</Text>
    </View>
    <View className="flex-row space-x-2 items-center">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Location: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky">{order.address}</Text>
    </View>
    </View>
 
    <View className="my-3 mt-2 space-y-2">
    <View className="flex-row space-x-2 items-center">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Message: </Text>
    <Text style={{fontFamily:"poppins"}} className="text-blacky bg-green-900/5 p-2 rounded">" Not included "</Text>
    </View>
    </View>

    {evidence && <View className="my-3 mt-2 space-y-2">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Evidence Image:</Text>
     <Image source={{uri: evidence}} className="object-contain w-[80%] h-48"/>
    </View>}
 
    <View className=" my-3 mt-2  flex-col space-y-2 items-center ">
    <TouchableOpacity
      onPress={() => {
        setShowCartItems(!showCartItems);
      }}
      className="flex-row items-center justify-between w-[100%] p-2 self-start"
    >
      <Text
        style={{ fontFamily: "poppins_semibold" }}
        className="text-blacky self-start"
      >Cart Items: {order?.CartId?.products.length}
      </Text>
      {showCartItems ? (
        <MaterialIcons name="arrow-drop-up" size={24} color="black" />
      ) : (
        <MaterialIcons name="arrow-drop-down" size={24} color="black" />
      )}
    </TouchableOpacity>

    {showCartItems && (
      <View className="w-full border border-gray-300 p-3 rounded">
        <View className="flex-row space-x-2 items-center r p-2 rounded  my-1">
          <Text
            style={{ fontFamily: "poppins_semibold" }}
            className="text-blacky w-[33%] text-xs"
          >
            Name
          </Text>
          <Text
            style={{ fontFamily: "poppins_semibold" }}
            className="text-blacky w-[33%] text-xs"
          >
            Kilograms
          </Text>
          <Text
            style={{ fontFamily: "poppins_semibold" }}
            className="text-blacky w-[33%] text-xs"
          >
            Quantity
          </Text>
        </View>
        {order?.CartId?.products.map((item, index) => {
          return (
            <View
              key={index}
              className="flex-row space-x-2 items-center border p-2 rounded border-gray-200 my-1"
            >
              <Text
                style={{ fontFamily: "poppins" }}
                className="text-blacky w-[33%] text-xs"
              >
                {item?.productId?.Type}
              </Text>
              <Text 
                style={{ fontFamily: "poppins" }}
                className="text-blacky w-[33%] text-xs"
              >
                {item?.productId?.Kilograms} kg
              </Text>
              <Text
                style={{ fontFamily: "poppins" }}
                className="text-blacky w-[33%] text-xs"
              >
                {item?.quantity}
              </Text>
            </View>
          );
        })}
      </View>
    )}
  </View>

    <View className=" my-3 mt-2  flex-col space-y-2 items-center">
    <TouchableOpacity
    onPress={() => {
      setShowAddons(!showAddons);
    }}
    className="flex-row items-center justify-between w-[100%] p-2 self-start"
  >
    <Text style={{ fontFamily: "poppins_semibold" }} className="text-blacky">
      Addons: {order?.CartId?.addOns.length}
    </Text>
    {showAddons ? (
      <MaterialIcons name="arrow-drop-up" size={24} color="black" />
    ) : (
      <MaterialIcons name="arrow-drop-down" size={24} color="black" />
    )}
  </TouchableOpacity>

    {showAddons &&<View className="w-full border border-gray-300 p-3 rounded">
    <View className="flex-row space-x-2 items-center r p-2 rounded  my-1">
      <Text style={{ fontFamily: "poppins_semibold" }} className="text-blacky w-[33%] text-xs">
        Name
      </Text>
      <Text style={{ fontFamily: "poppins_semibold" }}
        className="text-blacky w-[33%] text-xs">
        Image
      </Text>
        
      
      <Text
        style={{ fontFamily: "poppins_semibold" }}
        className="text-blacky w-[33%] text-xs "
      >
        Quantity
      </Text>
    </View>
    {order?.CartId?.addOns.map((item, index) => {
      return (
        <View
          key={index}
          className="flex-row space-x-2 items-center border p-2 rounded border-gray-200 my-1"
        >
          <Text
            style={{ fontFamily: "poppins" }}
            className="text-blacky w-[33%] text-xs"
          >
            {item?.addonId.Name}
          </Text>
          
          <View className="w-[33%] h-10 object-contain items-start justify-center flex">
            <Image
              source={{ uri: item?.addonId.Image }}
              className="w-[45%] h-10 object-contain"
              style={{ resizeMode: "contain" }}
            />
          </View>
          <Text
            style={{ fontFamily: "poppins" }}
            className="text-blacky w-[33%] text-xs"
          >
          {item.Count}
          </Text>
        </View>
      );
    })}
  </View>}
    </View>

    </ScrollView>
   {order?.Status=="Assigned" && <TouchableOpacity onPress={()=>{handleChangeOrderStatus(order);navigation.navigate("SingleDelivery", { status: "Assigned", orders:order })}}
     className="bg-primary self-center w-[90%] py-2 px-3 rounded flex-row items-center justify-center space-x-3 my-5">
    <FontAwesome name="car" size={20} color="white" style={{fontSize:20}} className=""/>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-white">Start Delivery</Text>
    </TouchableOpacity>}

    { order?.Status=="Delivering" && <TouchableOpacity onPress={()=>{navigation.navigate("TakePicturePage", {status:"Assigned", orders:order})}}
     className="bg-primary self-center w-[90%]  py-2 px-3 rounded flex-row items-center justify-center space-x-3 my-5">
     <AntDesign name="checkcircleo" size={20} color="white" />
    <Text style={{fontFamily:"poppins_semibold"}} className="text-white">Reach Destination</Text>
    </TouchableOpacity>}
    </SafeAreaView>
  )
}
 
export default SingleDelivery