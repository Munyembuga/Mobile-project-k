import { View, Text, SafeAreaView,FlatList , ScrollView, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import ManagerOrderCard from '../../../Components/ManagerOrderCard'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import Ordercard from '../../../Components/Ordercard';
import moment from 'moment';

const History = () => {
  const[AllUserOrders,setAllUserOrders] = useState([])
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  const station = authProfile?.StationId;
  const [IsLoading, setIsLoading]= useState(true)

  console.log("Email", authProfile.Email)

  const fetchUserOrders = async () => {
    setIsLoading(false)
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/getOrder`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        const order = response.data.filter((order)=>order.CartId?.UserId._id == authProfile._id)
        setAllUserOrders(order);
        // console.log(">>>>user Order",AllUserOrders[0].CartId.UserId.Email)
        console.log(">>>>user Order",order)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch in user order process"
        );
        setIsLoading(false)
      });
  };
  useEffect(() => {
    fetchUserOrders()  
  }, [isFocused]);


  // AllUserOrders.map((order, index)=>{
  //   console.log("-----Order At",index, "__and ", order.CartId?.UserId._id)
  // })
  // const myOrders = AllUserOrders.filter((order)=>order.CartId?.UserId._id == authProfile.Id)

  console.log("------My Orders", AllUserOrders[0]?.Status)
  return (
    <View className="bg-white h-full w-full">

    {IsLoading ?
      <View className="h-[40%] w-full items-center justify-center"><ActivityIndicator/></View>
      :
    <ScrollView className="my-4">
     {AllUserOrders.map((order, index)=>{
      
          return(
        <View key={index}>
     <Ordercard
     key={index} 
     icon= "dot-circle-o"
     status={order.Status}
     singleView={()=>{navigation.navigate("SingleOrder", {order: order, data: order.Status, index: index})}}
     statusView={()=>{navigation.navigate("OrderStatus")}}
     data= {order.Status || "date"}
     amount={order?.TotalOrder || 0 }
     date={moment(order.createdAt).format('MMM Do YYYY')}
     time={moment(order.createdAt).format('h:mm:ss a') || "date"}
     orderId={order._id || "date"}
     isPaid={order.Status == "Completed"?'Paid':'Not Paid'}
      />
    </View> 
      )
    })} 
    </ScrollView>

  }

  {(!IsLoading && AllUserOrders.length == 0  ) && <View className="w-full h-[200px] flex flex-col items-center justify-center ">
<Text style={{fontFamily:"poppins_semibold"}}>No Items In History</Text>
</View>}
    </View>
  )
}

export default History