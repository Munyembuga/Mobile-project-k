import { View, Text, ScrollView } from "react-native";
import React from "react";
import DriverHome from "../../Components/DriverHomeCompent";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useFocusEffect } from "@react-navigation/native";


const DeliveryDelivery = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const[assignedOrder,setAssignedOrder] = useState([])
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true)
  
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
          "Driver OrdeAssignedr",response.data
        );
        setAssignedOrder(response?.data);
        setIsLoading(false)

      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch Driver Assigned orders"
        );
        setIsLoading(false)

      });
  };

  const handleChangeOrderStatus = async (Order) => {
 
    axios({
      method: "PUT",
      url: `https://sp-gas-api.onrender.com/api/v1/order/updateDriver/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        id:Order._id,
        CartId:Order.CartId._id,
        address: Order.address,
        phoneNumber: Order.phoneNumber,
        TotalOrder: Order.TotalOrder,
        Status: "Completed",
        StationId:Order.StationId._id,
        DriverId:Order.DriverId._id,
      },
    })
      .then((response) => {
        console.log("Response from change status----------------------------", response.data);
      })
      setIsLoading(false)

      .catch((error) => {
        setIsLoading(false)
        console.log("error changing status ", error.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      
    }, [])
  );


  console.log("Driver token", authToken)

  useFocusEffect(React.useCallback(() => {
    fetchNewAssigned();
  }, []));

  let delivering = assignedOrder.filter(item => item.Status === "Delivering");


  return (
    <ScrollView className="bg-white h-full pb-5 mb-5">

    {isLoading && (<View className="w-full h-32 flex-row items-center justify-center"><Text>Loading...</Text></View>)}

    {delivering.map((item, index)=>{
      
         return( 
          <DriverHome
          key={index}
        status={item.Status}
        time= {moment(delivering.createdAt).format("h:mm:ss")}
        date= {moment(delivering?.createdAt).format("MMM Do YYYY")}
        name={item.CartId.UserId.FullNames}
        phone={item.phoneNumber}
        street={item.address}
        cyilnder={item?.CartId?.products?.length}
        addons={ item?.CartId?.addOns?.length || 0}
        amount={item.TotalOrder}
        paid={"Paid"}
        color={"green"}
        onPress={() =>
          navigation.navigate("SingleDelivery", { status: "Assigned", orders:delivering[index] })
        }
      />
      )
      }     
    )
    }
    {(delivering.length == 0 && !isLoading) && (
      <View className="w-full h-[200px] flex flex-col items-center justify-center ">
    <Text style={{fontFamily:"poppins_semibold"}}>No items Delivering</Text>
    </View>)}
    
    </ScrollView>
  );
};

export default DeliveryDelivery;
