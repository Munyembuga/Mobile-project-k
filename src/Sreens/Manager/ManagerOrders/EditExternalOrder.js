import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    StyleSheet,
    ToastAndroid,  TouchableWithoutFeedback, Keyboard
  } from "react-native";
  import React, { useState, useEffect, useRef } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import BackButton from "../../../Components/BackButton";
  import AddressCard from "../../../Components/AddressCard";
  import { Octicons, Feather } from "@expo/vector-icons";
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
import InputText from "../../../Components/InputText";

  
  const EditExternalOrder = ({route}) => {
    const [isLoading, setIsLoading] = useState(false);
    const { authToken, authProfile } =useSelector((state) => state.auth);
    const [Order, setOrder] = useState([]);
    const [Amount, setAmount] =useState("")
    const [Quantity, setQuantity] =useState("")
    const [Receipt, setReceipt] =useState("")
    const Id  = route.params.Id
  
  let dataArray = []
    const fetchOrder = async () => {
      setIsLoading(true);
  
      axios({
        method: "GET",
        url: `https://sp-gas-api.onrender.com/api/v1/extOrder/${Id}`,
        headers: {
            Authorization: `Bearer ${authToken}`,
          },
      })
        .then((response) => {
          setOrder(response?.data);
          setIsLoading(false);
          setQuantity(response?.data.Quantity)
         setAmount(response?.data.Amount)
         setReceipt(response?.data.receiptNumber)
          
        })
        .catch((error) => {
          console.log("error fetching external orders:",error);
        });
    };
  
    useFocusEffect(
      React.useCallback(() => {
        fetchOrder()
      }, [])
    );  


    console.log("auth in ext orders ,", Order._id)
    console.log("items ,","Quan", Quantity,"Amou", Amount,"Rec", Receipt)
    // setStationId(authProfile.StationId)
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const editOrder = async () => {
        setIsLoading(true);
    
        axios({
          method: "PATCH",
          url: `https://sp-gas-api.onrender.com/api/v1/extOrder/${Id}`,
          headers: {
              Authorization: `Bearer ${authToken}`,
            },
            data:{
                id: Order._id,
                FullName: authProfile.fullName,
                PhoneNumber: authProfile.PhoneNumber,
                ProductId: "657ab3f3fe82bbbee86b2ce4",
                Quantity: Quantity,
                receiptNumber: Receipt,
                Amount: Amount
              },
        })
          .then((response) => {
            setOrder(response?.data);
            setIsLoading(false);
            console.log("external orders",response?.data)
            setQuantity(response?.data.Quantity)
         setAmount(response?.data.Amount)
         setReceipt(response?.data.receiptNumber)
            
          })
          .catch((error) => {
            console.log("error patching external orders:",error);
          });
      };
   

    return (
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
        <View className=" relative py-10">
          <BackButton />
          <Text className="text-center mt-4" style={{fontFamily:"poppins_semibold"}}>All External Orders</Text>
        </View>
    
        <View className="w-[90%] mx-auto"></View>
        <InputText
        field="Amount"
        onChangeText={(text)=>{setAmount(text)}}
        value={Amount+""}
        />
        <InputText
        field="Quantity"
        onChangeText={(text)=>{setQuantity(text)}}
        value={Quantity+""}
        />
        <InputText
        field="Receipt"
        onChangeText={(text)=>{setReceipt(text)}}
        value={Receipt}
        />
        <TouchableOpacity onPress={()=>{editOrder()}} className="mt-2 bg-primary w-[80%] mx-auto p-3 rounded flex items-center">
        <Text style={{fontFamily:"poppins", color:"white"}}>Save Edit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default EditExternalOrder;
  