import { View, Text, SafeAreaView,FlatList , ScrollView, ActivityIndicator} from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import ManagerOrderCard from '../../../Components/ManagerOrderCard'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";
import Ordercard from '../../../Components/Ordercard';
import moment from 'moment';

const Ongoing = () => {
  const[AllUserOrders,setAllUserOrders] = useState([])
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  const station = authProfile?.StationId;
  const [IsLoading, setIsLoading]= useState(true)

  console.log("Authprofile from ongoing", authProfile._id)

  const fetchUserOrders = async () => {
    
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/getOrder`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        const order = response?.data.filter((order)=>order.CartId?.UserId._id == authProfile._id)
        setAllUserOrders(order);
        setIsLoading(false)
        console.log("orders3333", response.data)
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

console.log("****orders length" , AllUserOrders.length)

  return (
    <View className="bg-white h-full w-full">

 {IsLoading ?
  <View className="h-[40%] w-full items-center justify-center"><ActivityIndicator/></View>
  :
  <ScrollView className="my-4">
     {AllUserOrders.map((order, index)=>{
      if(order?.Status == "Pending" || order?.Status == "Processing"){
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
      )}
    })} 
    </ScrollView>}

{(!IsLoading && AllUserOrders.length == 0  ) && <View className="w-full h-[200px] flex flex-col items-center justify-center ">
<Text style={{fontFamily:"poppins_semibold"}}>No Items Being Processed</Text>
</View>}
      
    </View>
  )
}

export default Ongoing