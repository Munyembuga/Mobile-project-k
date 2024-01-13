import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image
} from "react-native";
import { AntDesign, MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import BackButton from "../../../Components/BackButton";

import axios from "axios";
import { useSelector } from "react-redux";
import {
  setAuthLoaded,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../../../Redux/authSlice";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";
import OrderDetailscomponents from "../../../Components/OrderDetailscomponents";
import DropDownComponentDriver from "../../../Components/OrderDetailFetchDriver";


const DetailOrder = ({ route }) => {
  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
 const navigation =useNavigation();
  const Id = route.params.order_id;
  const singleOrder = route.params.order

  let tok =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcwOTYxMDNjMjBjMjU4MmYyYTM0ZWEiLCJpYXQiOjE3MDM4MzU2NzMsImV4cCI6MTcwMzg0Mjg3M30.FPUszoszHoMPhOPSS99EKZCR5t0nBvy1wFWgTGc-G0A";
  
    const isFocused = useIsFocused();
  const [elements, setElements] = useState([]);

  const [newOrder, setNewOrder] = useState([]);
  const [driver, setDriver] = useState([]);
  const { authStatus, authLoaded, authRole, authProfile, authToken } =
    useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState();
  const [product, setProduct] = useState([]);
  const [id, setId] = useState();
  const [cartId, setCartId] = useState();
  const [address, setAddress] = useState();
  const [phones, setPhones] = useState();
  const [totalOrder, setTotalOrder] = useState();
  const [status, setStatus] = useState();
  const[Loading,setIsLoading] = useState(true)
  const station = authProfile?.StationId;
  const [showCartItems, setShowCartItems] = useState(false)
  const [showAddons, setShowAddons] = useState(false)
  const [name, setName] = useState();
  const [userAddons, setUserAddons] = useState([]);
  const [addons, setAddons]= useState([])
  const [order, setOrder] = useState([]);
  const [addLoading, setAddLoading] = useState(true);


  const fetchDriver = () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/users`,
      headers: {
        Authorization: `Bearer ${tok}`,
      },
    })
      .then((response) => {
        const drivers = response?.data?.data.filter(
          (user) => user.Role === "Driver"
        );

        const dataArray = drivers.map((driver) => ({
          value: driver._id,
          label: driver.FullNames,
        }));

        setElements(dataArray);
      })
      .catch((error) => {
        console.log(
          "Error fetching driver",
          error.response
        );
      });
  };


  const fetchNewOrderDetails = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/${Id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "orderdetails",
          response?.data
        );
       
        setOrder(response?.data);
        setUserAddons(response?.data?.CartId?.addOns);
        setTotalAmount(response?.data?.TotalOrder);
        setProduct(response?.data?.CartId?.products);
        setId(response?.data?._id);
        setCartId(response?.data?.CartId?._id);
        setAddress(response?.data?.address);
        setPhones(response?.data?.phoneNumber);
        setName(response.data.CartId.UserId.FullNames);
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch"
        );
      });
  };
  const handleAddToAssignedOrder = async () => {
    setIsLoading(false)
 
    axios({
      method: "PUT",
      url: `https://sp-gas-api.onrender.com/api/v1/order/updateDriver/${id}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        id: id,
        CartId: cartId,
        address: address,
        phoneNumber: phones,
        TotalOrder: 0,
        Status: "string",
        StationId: station,
        DriverId: driver?.value,
      },
    })
      .then((response) => {
        console.log("Fetch Product----------------------------", response.data);
        setIsLoading(true)
        showToast("Successfull Add Assigned");
        navigation?.goBack()
       
      })
      .catch((error) => {
        console.log("error adding to cart: ", error.response.data);
        showToast(error.message);
      });
  };


  useEffect(() => { 
    fetchNewOrderDetails();
  }, [route.params.order_id]);
  useFocusEffect(
    React.useCallback(() => {
      fetchDriver();
    }, [])
  );


  const validate = ()=>{
    if(driver.length == 0){
      
      showToast("Please select a driver")
    }else{
      handleAddToAssignedOrder();
    }
  }

  return (
    <ScrollView className="pt-5 bg-white">
      <SafeAreaView className="bg-white">
        <View className="w-full h-full bg-white ">
          <View className="absolut mb-10">
            <BackButton />
          </View>
          <View
            className=" justify-self-center w-[90%] mx-auto rounded mt-10"
            style={{}}
          >
            {/* <TouchableOpacity onPress={()=>{setIsModalVisible(!isModalVisible)}} className="items-right justify-end w-full">
   <View className="text-right m-1 items-end p-2">
   <AntDesign name="closecircleo" size={24} color="red" />
   </View>
   </TouchableOpacity> */}

            <View className="bg-white">
              <View className="flex-row justify-between bg-white my-1">
              <View className="flex-row  w-[50%] items-center">
              <Ionicons name="person-outline" size={24} color="rgb(8 194 94)" className="mr-2"/>
              <View className=" w-[90%] bg-white  ml-3">
              <Text style={{ fontFamily: "poppins" }} className="text-xs">
                Name
              </Text>
              <Text style={{ fontFamily: "poppins_semibold" }} className="text-blacky text-sm">
                {name}
                
              </Text>
            </View>
              </View>
              
              <View className="flex-row  w-[50%] items-center">

              <Ionicons name="location-outline" size={24} color="rgb(8 194 94)" />
              <View className=" w-[90%] ml-3">
              <Text style={{ fontFamily: "poppins" }} className="text-xs">
                Location
              </Text>
              <Text style={{ fontFamily: "poppins_semibold" }} className="text-blacky text-sm">
                {address}
               
              </Text>
            </View>
              </View>
             
              </View>
              <View className="flex-row justify-between my-4">

              <View className="flex-row  w-[50%] items-center">

              <MaterialIcons name="attach-money" size={24} color="rgb(8 194 94)" />
              <View className=" w-[90%]">
              <Text style={{ fontFamily: "poppins" }} className="text-xs">
                Total Amount
              </Text>
              <Text
                style={{ fontFamily: "poppins_semibold" }}
                className=" text-blacky text-base"
              >
                {totalAmount}
              </Text>
            </View>
              </View>
            
              <View className="flex-row  w-[50%] items-center">
              <Feather name="phone" size={24} color="rgb(8 194 94)" />
              <View className="w-[90%] ml-3">
              <Text style={{ fontFamily: "poppins" }} className="text-xs">
                Phone Number
              </Text>
              <Text style={{ fontFamily: "poppins_semibold" }} className="text-blacky text-sm">
                {phones}
              </Text>
            </View>
              </View>
              
              </View>
            </View>

            <View className=" items-center my-3">
              <TouchableOpacity>
                <Text style={{ fontFamily: "poppins_semibold" }} className="">
                  Order Details
                </Text>
              </TouchableOpacity>
            </View>

            <View className=" my-3 mt-2  flex-col space-y-2 items-center">

            <TouchableOpacity onPress={()=>{setShowCartItems(!showCartItems)}} className="flex-row items-center justify-between w-[100%] p-2 self-start">
            <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky self-start"> Cart Items:  {order?.CartId?.products.length}</Text>
            {showCartItems?<MaterialIcons name="arrow-drop-up" size={24} color="black" />:<MaterialIcons name="arrow-drop-down" size={24} color="black" />}
            </TouchableOpacity>
        
           {showCartItems &&  <View className="w-full border border-gray-300 p-3 rounded">
            <View className="flex-row space-x-2 items-center r p-2 rounded  my-1">
            <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky w-[33%] text-xs">Name </Text>
            <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky w-[33%] text-xs">Kilograms</Text>
            <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky w-[33%] text-xs">Quantity</Text>
            </View>
            {order.CartId.products.map((item, index)=>{
              return(
                <View key={index} className="flex-row space-x-2 items-center border p-2 rounded border-gray-200 my-1">
            <Text style={{fontFamily:"poppins"}} className="text-blacky w-[33%] text-xs">{item.productId?.Type} </Text>
            <Text style={{fontFamily:"poppins"}} className="text-blacky w-[33%] text-xs">{item.productId?.Kilograms}</Text>
            <Text style={{fontFamily:"poppins"}} className="text-blacky w-[33%] text-xs">{item?.quantity}</Text>
            </View>
              )
            })}
            </View>}
            </View>

           
            <View className=" my-3 mt-2  flex-col space-y-2 items-center">
            <TouchableOpacity onPress={()=>{setShowAddons(!showAddons)}} className="flex-row items-center justify-between w-[100%] p-2 self-start">
            <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky"> Addons ({order?.CartId?.addOns.length}) </Text>
            {showAddons?<MaterialIcons name="arrow-drop-up" size={24} color="black" />:<MaterialIcons name="arrow-drop-down" size={24} color="black" />}
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

            {/* <View className="">
            <TouchableOpacity>
              <Text style={{ fontFamily: "poppins" }} className="">
                Gas Details
              </Text>
            </


        <View className="flex-row justify-between my-4">
            <View className=" w-[45%]">
              <Text style={{ fontFamily: "poppins" }} className="text-xs">
                Total Amount
              </Text>
              <Text style={{ fontFamily: "poppins_semibold" }} className="">
                
              
              </Text>
            </View>
            {/**/}
          </View>
          
          <View>
            <Text
              className="items-center self-center"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Assign to Drive
            </Text>

            <TouchableOpacity className="w-[80%] h-auto">
              <DropDownComponentDriver
                onChange={(item) => {
                  setDriver(item);
                }}
                elements={elements}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              validate()
            }}
            className="items-center justify-center mx-auto px-3 py-2 my-3 mb-28 rounded bg-primary"
          >
            {Loading?(<View>
              <Text
              style={{ fontFamily: "poppins_semibold" }}
              className="text-white"
            >
              Assign Order
            </Text>
            </View>)
          :(<View>
            <ActivityIndicator size={20} color={"#ffffff"}/>
          </View>)  
          }
          
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailOrder;
