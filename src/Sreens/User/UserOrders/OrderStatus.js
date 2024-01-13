import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import OrderDetailCard from "../../../Components/OrderDetailCard";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";

const OrderStatus = ({route}) => {
  const data = route.params?.status;
  const order = route.params?.order;
  const index = route.params?.index;
  const evidence = route.params?.evidence;
    const navigation = useNavigation();
    console.log("oreder in status", order)
  return (
    <SafeAreaView className="bg-white h-full">
    <View className="bg-white h-full">
    <TouchableOpacity onPress={()=>{
        navigation.goBack()
    }} className="bg-primary rounded-full p-1 absolute left-5 top-5 w-7 h-7">
    <Ionicons name="ios-arrow-back-outline" size={20} color="white" />
    </TouchableOpacity>

    <View className="items-center mt-7 ">
    <Text style={{fontFamily:"poppins_semibold"}}>Order Status Details</Text>
    <View className="flex-row w-[60%] mx-auto justify-between my-1 items-center">
    <Text style={{fontFamily:"poppins_semibold"}}>Order ID:</Text>
    <Text style={{fontFamily:"poppins"}} className="text-xs">{order._id}</Text>
    </View>
    <View className="flex-row  w-[60%] mx-auto justify-center space-x-4 items-center my-1 border-gray-300 border-b-2 mb-5 pb-5">
    <FontAwesome name="dot-circle-o" size={16} color="#007AFF"/>
    <Text style={{fontFamily:"poppins_semibold"}}>{order?.Status}</Text>
    </View> 
    </View>
     
      <OrderDetailCard
        icon={order?.Status =="Completed"?"check-circle":"dot-circle-o"}
        background={order?.Status =="Completed"? "rgb(8 194 94)": "#6BDA9E"}
        title={order?.Status =="Completed"?"Order Completed Successfully":"Waiting for Confirmation"}
        date={moment(order.updatedAt).format('MMM Do YYYY')}
      time={moment(order.updatedAt).format('h:mm:ss a') || "date"}
      />
      <OrderDetailCard
        icon={order?.Status =="Completed"?"check-circle":order?.Status =="Delivering"?"check-circle":"dot-circle-o"}
        background={order?.Status =="Completed"?"rgb(8 194 94)":order?.Status =="Delivering"? "rgb(8 194 94)": "#6BDA9E"}
        title={order?.Status =="Completed"?"Delivered Successfully":order?.Status =="Delivering"? "Order Delivering": "Order Processing..."}
        date={moment(order.createdAt).format('MMM Do YYYY')}
        time={moment(order.createdAt).format('h:mm:ss a')}
      />
     {order?.Status && <OrderDetailCard
        icon={order?.Status =="Completed"?"check-circle":order.isPaid?"check-circle":"dot-circle-o"}
        background={order?.Status =="Completed"?"rgb(8 194 94)":order.isPaid?"rgb(8 194 94)":"orange"}

        title= {order.isPaid ? "Payment Successfull":"Waiting for Payment"}
        date={moment(order.createdAt).format('MMM Do YYYY')}
        time={moment(order.createdAt).format('h:mm:ss a') }
      />}
     {order?.Status  && <OrderDetailCard
        icon="check-circle"
        background="rgb(8 194 94)"
        title="Order Initiated Successfully"
        date={moment(order.createdAt).format('MMM Do YYYY')}
      time={moment(order.createdAt).format('h:mm:ss a') }
      />}

      {order?.Status =="Completed" && (
        <View className="w-[80%] mx-auto items-center my-6 justify-center">
        <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky text-lg">Order Successful</Text>
        <Text style={{fontFamily:"poppins_semibold"}} className="text-orange-400">Give us feedback about the process</Text>
        </View>
      )

      }
      {/*<TouchableOpacity className="bg-primary w-[90%] mx-auto rounded p-2 py-3 items-center top-28">
      <Text style={{fontFamily:"poppins_semibold"}} className=" text-white">Approve </Text>
     </TouchableOpacity>*/}

    </View>
    </SafeAreaView>
  );
};

export default OrderStatus;
