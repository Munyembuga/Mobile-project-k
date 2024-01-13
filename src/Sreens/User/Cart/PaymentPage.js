import { View, Text, Button, TouchableOpacity ,Image, TextInput, ToastAndroid} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import InputText from "../../../Components/InputText";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import PhoneInputText from "../../../Components/PhoneInputText";
import { AntDesign } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";


const PaymentPage = ({route}) => {
  const totalPrice = route.params.totalPrice
  const cart = route.params.cartId
  const Order = route.params.order?.data
 const navigation = useNavigation()
 const [payType, setPayType] = useState("momo")
 const [paymentNumber, setPaymentNumber] = useState("")
 const {authToken } = useSelector((state) => state.auth);
const [cartId, setcartId] = useState("")
const [phoneError, setPhoneError] = useState("")
const [isDefaultNumber, setIsDefaultNumber] = useState(false)
const [isLoading, setIsLoading] = useState(false)
const { authStatus, authLoaded, authRole, authProfile } =useSelector((state) => state.auth);


 function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

console.log("Order in payment ", Order)
console.log("Authtoken in payment ", authToken)


 const handlePayment = async () => {
  axios({
    method: "POST",
    url: `https://sp-gas-api.onrender.com/api/v1/payment/pay`,

    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: {
      PhoneNumber : paymentNumber,
      orderId:Order?._id
    },
  })
    .then((response) => {
      setIsLoading(false)
      console.log("response from payment========: ", response?.data);
      showToast("Payment successfull")
      navigation.navigate("PaymentSuccessPage")
    })
    .catch((error) => {
      console.log("error in checkout", error);
      showToast("Error, Number not registered")
      setIsLoading(false)
    });
};

const fetchCart = async () => {
  axios({
    method: "GET",
    url: `https://sp-gas-api.onrender.com/api/v1/cart`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((response) => {
      // setUserCards(response.data.products);
      // 
      setcartId(response?.data[0]._id)
    })
    .catch((error) => {
      console.log(error.response.data, "error to fetch");
    });
};

const validate =(item)=>{
  if(item.length == 0){
    setPhoneError("Field required")
  }else{
    handlePayment();
  }
}
const phonePattern =/(0(7[2|3|8|9][0-9]))\d{5}/

const Validator = () => {
  if (paymentNumber.length === 0) {
    setPhoneError("Phone is requiredt");
    // setIsLoading(false);
    console.log(phoneError)
  } else if(paymentNumber.length > 10){
    setPhoneError("Invalid Phone number");
  }
  
  else if (!phonePattern.test(paymentNumber)) {
    setPhoneError("Invalid phone number");
    // setIsLoading(false);
    console.log(phoneError);
  } else if (paymentNumber.indexOf(" ") >= 0) {
    setPhoneError("phone can't contain space");
    // setIsLoading(false);
    console.log(phoneError);
  } else {
    setPhoneError("");
    setIsLoading(true)
    handlePayment();
  }
};

const setDefaultNumber =()=> {
  if(isDefaultNumber){setPaymentNumber("")} 
  else{setPaymentNumber(authProfile.PhoneNumber[0])}
}

console.log("paymentNumber", paymentNumber)
useEffect(()=>{fetchCart()},[])

  return (

    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
    <View className=" relative py-10">
      <BackButton />
    </View>
      <Text
        style={{ fontFamily: "poppins_semibold" }}
        className="text-center my-3"
      >
        Payment
      </Text>
      <View className="w-[90%] mx-auto bg-primary h-[25%] rounded p-3 px-5 justify-evenly relative mb-5">
      <View>
      <Image 
      className="absolute right-[-20px] top-[50%]"
      source={require("../../../../assets/images/pay-vector.png")}
      />
      </View>
      <View>
      <Text style={{ fontFamily: "poppins_semibold", color:"white" }}>Total Price</Text>
      <Text style={{ fontFamily: "poppins_semibold" }} className="text-xl text-secondary ">{totalPrice} Rwf</Text>
      </View>
     
      <View className=" ">
      <Text style={{ fontFamily: "poppins_semibold", color:"white" }} className="my-2">Payment Method</Text>
      <View className="flex-row space-x-4">
      <TouchableOpacity onPress={()=>setPayType("momo")}
       className="bg-secondary px-3 py-3 w-32 rounded items-center flex-row space-x-2">
      <View className="w-3 h-3 rounded-full bg-white border border-gray-300 items-center justify-center">
      {payType== "momo" && <View className="w-1 h-1 bg-blacky rounded-full"></View>}
      </View>
      <Text style={{ fontFamily: "poppins_semibold", color:"black" }} className="text-xs text-blacky">Mobile Money</Text>
      </TouchableOpacity>

      {/*<TouchableOpacity disabled onPress={()=>setPayType("cash")}
      className="bg-secondary opacity-60 px-3 py-3 w-36 rounded items-center flex-row space-x-2">
      <View className="w-3 h-3 rounded-full bg-white border border-gray-300 items-center justify-center">
      {payType== "cash" &&<View className="w-1 h-1 bg-blacky rounded-full"></View>}
      </View>
      <Text style={{ fontFamily: "poppins_semibold", color:"black" }} className="text-xs text-blacky">Cash on Delivery</Text>
  </TouchableOpacity>*/}
      </View>
      </View>
    
      </View>

      <View lassName="w-[90%] mx-auto my-3">
    
      <PhoneInputText
      field="Payment Number"
      required="true" 
      placeholder="Phone number, 078...."
      borderColor="gray"
      value={paymentNumber}
      Icon="phone"
      onChangeText={(text)=>{setPaymentNumber(text)}}
      Error={phoneError}
      />
      </View>

      <View className=" w-[85%] mx-auto my-2 flex-row items-center space-x-2">
      <TouchableOpacity onPress={()=>{setIsDefaultNumber(!isDefaultNumber),setDefaultNumber()}}  className="w-[20px] h-[20px] rounded border border-gray-300">
      {isDefaultNumber &&<AntDesign name="checksquare" size={18} color="rgb(8 194 94)" />}
      </TouchableOpacity>
      <Text
      className="  text-xs"
      style={{ fontFamily: "poppins" }}
    >Choose Your default Number</Text>
      </View>
      <TouchableOpacity
      onPress={()=>{
        
        Validator()
        // navigation.navigate("PaymentSuccessPage")
      }
      }
      className="px-3 py-2 bg-primary items-center w-[90%] rounded mx-auto absolute bottom-10 left-[5%]"
    >
     {!isLoading ? <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
        Pay
      </Text>:<ActivityIndicator color="white"/>}
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PaymentPage;
