import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    ToastAndroid,
  } from "react-native";
  import React, { useState, useEffect, useRef } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import BackButton from "../../../Components/BackButton";
  import AddressCard from "../../../Components/AddressCard";
  import { Octicons, Feather, Ionicons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import Regulator from "../../../../assets/images/regulator.jpg"
  import Cable from "../../../../assets/images/cablejpg.jpg"
  import Checkbox from "expo-checkbox";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import { useIsFocused, useNavigation } from "@react-navigation/native";
  import AddonCard from "../../../Components/AddonCard";
  import InputText2 from "../../../Components/InputText2";
  import { Dropdown } from 'react-native-element-dropdown';
import DropDownComponent from "../../../Components/DropDownComponent";
import { useFocusEffect } from '@react-navigation/native';


  
  const AllExternalOrders = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const { authToken, authProfile } =useSelector((state) => state.auth);
    const [Quantity, setQuantity] = useState("")
    const [receiptNumber, setReceiptNumber] = useState("")
    const [Orders, setOrders] = useState([]);
    const [elements, setElements] = useState([]);
    const navigation = useNavigation()
  
  let dataArray = []
    const fetchOrders = async () => {
      setIsLoading(true);
  
      axios({
        method: "GET",
        url: `https://sp-gas-api.onrender.com/api/v1/extOrder/getExtOrder`,
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
      })
        .then((response) => {
          setOrders(response?.data?.Orders);
          setIsLoading(false);
          console.log(response?.data?.Orders[0])
        })
        .catch((error) => {
          console.log("error fetching external orders:",error);
          setIsLoading(false);
        });
    };
  
    useFocusEffect(
      React.useCallback(() => {
        fetchOrders()
      }, [])
    );


    console.log("auth in ext orders ,", authProfile)
    // setStationId(authProfile.StationId)
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
   

    return (
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
        <View className=" relative pt-10">
          <BackButton />
          <Text className="text-center mt-4" style={{fontFamily:"poppins_semibold"}}>All External Orders</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate("ExternalOrdersPage")}} className="m-2 w-[80%] mx-auto rounded p-3 border-[1px] border-blue-200 flex flex-col items-center justify-center" style={{elevation:0}}>
        <Text style={{fontFamily:"poppins_semibold"}} className="text-">Add External Order</Text>
        <View className="rounded-full border-gray-300 w-6 h-6 border-[1px] flex items-center justify-center  p-1">
        <Ionicons name="add" size={16} color="black" />
        </View>
        </TouchableOpacity>
            {isLoading && <View className="w-full h-[60%] flex-row items-center justify-center"><ActivityIndicator size={"large"}/></View>}
       
        <ScrollView className="w-full h-[50%] py-3 mb-20">

        {Orders.map((item, index)=>{ 
            return(
                <View  key = {index} className="bg-white rounded p-4 border border-gray-300 my-2 w-[95%] mx-auto">
                <View className="bg-white rounded p-2 my-1  border-b border-gray-300 flex-row justify-between">
                <View className="flex-row space-x-4 w-[50%]">
                <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Amount:</Text>
                <Text style={{fontFamily:"poppins"}} className="text-blacky">{item.Amount}</Text>
                </View>
                <View className="flex-row space-x-4 w-[50%]">
                <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Quantity</Text>
                <Text style={{fontFamily:"poppins"}} className="text-blacky">{item.Quantity}</Text>
                </View> 
                </View>
                <View className="bg-white rounded my-1 p-2 flex-row justify-between">
                <View className="flex-col   w-[45%]">
                <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Date Occured</Text>
                <Text style={{fontFamily:"poppins"}} className="text-blacky">{item.createdAt}</Text>
                </View>
                <View className="flex-col   w-[50%]">
                <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky">Receipt Number</Text>
                <Text style={{fontFamily:"poppins"}} className="text-blacky">{item.receiptNumber}</Text>
                </View>
                </View>
                <TouchableOpacity onPress={()=>{navigation.navigate("EditExternalOrder", {Id:item._id})}} className="mt-2 bg-primary  p-3 rounded flex items-center">
                <Text style={{fontFamily:"poppins", color:"white"}}>Edit</Text>
                </TouchableOpacity>
                </View>
            )})}
        </ScrollView>
        
      </SafeAreaView>
    );
  };
  
  export default AllExternalOrders;
  