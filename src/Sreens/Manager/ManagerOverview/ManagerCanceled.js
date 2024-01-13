import { View, Text, SafeAreaView,FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from "react";
import ManagerOrderCard from '../../../Components/ManagerOrderCard'
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useSelector } from "react-redux";

const ManagerCanceled = () => {
  const[newOrder,setNewOrder] = useState([])
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  const station = authProfile?.StationId;
  const [IsLoading, setIsLoading]= useState(true)

  const fetchNewOrder = async () => {
    setIsLoading(false)
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/by-station/${station}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // console.log("New order mangerRRRRRRRRRRRRR $$$$$$$$$$$$$$$$$$$$$$$$",response?.data);
        const order = response?.data?.filter(
          (orders) => orders?.Status === "Cancelled"
        );
        setNewOrder(order);
        console.log("New order manger Deliverying $$$$$$$$$$$$$$$$$$$$$$$$",newOrder)
        // setIsLoading(false)
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
        );
      });
  };
  useEffect(() => {
    fetchNewOrder()  
  }, [isFocused]);
  
  return (
    <SafeAreaView className="bg-white h-full w-full">
    {IsLoading && <View className="w-full h-[40%] flex items-center justify-center"><Text>Loading...</Text></View>}
    {newOrder.length > 0 ? (
          
      <View className="mb-12">
      <FlatList
                 data={newOrder}
                 numColumns={1}
                 keyExtractor={(item) => item._id}
                 renderItem={({ item }) => (
                   <ManagerOrderCard 
                   name={item?.CartId?.UserId?.FullNames}
                   location={item?.address}
                   status={item?.Status}
                   phone={item?.phoneNumber}
                   amount={item?.CartId?.TotalAmount}
                   icon="dot-circle-o"
                   iconColor="orange"
                   Navigate ={()=>{navigation.navigate("SingleManagerOrder", {order: item})}}
                   date={moment(item.createdAt).format('MMM Do YYYY')}
                   time={moment(item.createdAt).format('h:mm:ss a') || "date"}
                   
                   />
                 )}
                 />
               </View>)
    
    : <View className="w-full h-[40%] flex items-center justify-center"><Text style={{fontFamily:"poppins_semibold"}}>No Items Canceled</Text></View>}

  
   </SafeAreaView>
  )
}

export default ManagerCanceled