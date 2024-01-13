import { View, Text, ScrollView } from "react-native";
import React from "react";
import DriverHome from "../../Components/DriverHomeCompent";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

const AssignedDelivery = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const[assignedOrder,setAssignrdOrder] = useState([])
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading]= useState(true)
  
  const fetchNewAssigned= async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/by-driver/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setIsLoading(false)
        console.log(
          "Driver OrdeAssignedr",response.data
        );
        setAssignrdOrder(response?.data);
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch Driver Assigned orders"
        );
        setIsLoading(false)
      });
  };


  console.log("orders", assignedOrder)

  useFocusEffect(React.useCallback(() => {
    fetchNewAssigned();
  }, []));

  let assigned = assignedOrder.filter(item => item.Status === "Delivering");

  return (
    <ScrollView className="bg-white h-full pt-3 pb-5 mb-5">

    {isLoading && (<View className="w-full h-32 flex-row items-center justify-center"><Text>Loading...</Text></View>)}

    {assigned.map((item, index)=>{
      
         return( 
          <DriverHome
          key={index}
        status={item.Status}
        time= {moment(assigned.createdAt).format("h:mm:ss")}
        date= {moment(assigned?.createdAt).format("MMM Do YYYY")}
        name={item.CartId.UserId.FullNames}
        phone={item.phoneNumber}
        street={item.address}
        cyilnder={item?.CartId?.products?.length}
        addons={ item?.CartId?.addOns?.length || 0}
        amount={item.TotalOrder}
        paid={"Paid"}
        color={"green"}
        onPress={() =>
          navigation.navigate("SingleDelivery", { status: "Assigned", orders:assigned[index] })
        }
      />
      )
      }
    )
    }
    {(assigned.length == 0 && !isLoading) && (
      <View className="w-full h-[200px] flex flex-col items-center justify-center ">
    <Text style={{fontFamily:"poppins_semibold"}}>No items Assigned</Text>
    </View>)}
    </ScrollView>
  );
};

export default AssignedDelivery;
