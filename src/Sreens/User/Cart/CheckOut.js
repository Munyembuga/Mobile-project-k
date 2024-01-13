import { View, Text,TouchableOpacity, ScrollView, ToastAndroid, SafeAreaView, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import CheckOutCompent from "./CheckOutCompent";
import { Entypo } from "@expo/vector-icons";
import BackButton from "../../../Components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from 'moment';

const CheckOut = ({route}) => {
  const totalPrice  = route.params.totalPrice
  const cartId = route.params.cartId
  const receiverPhone = route.params.receiverPhone
  const address = route.params.address
  const deliveryMethod = route.params.deliveryMethod
  const fee = route.params.deliveryFee
  const [deliveryFee, setDeliveryFee] = useState(1000)
  const navigation = useNavigation()
  const { authToken } = useSelector((state) => state.auth);
  const currentDate = moment().format('MMMM Do YYYY');
  const currentTime = moment().format(' h:mm:ss a');
  const [order, setOrder] = useState([])
  const [isLoading, setIsLoading] = useState(false)


  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const handleCheckout = async () => {
    axios({
      method: "POST",
      url: `https://sp-gas-api.onrender.com/api/v1/order/addOrder`,
  
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        CartId: cartId,
        phoneNumber: receiverPhone,
        address: address.join(""),
        TotalOrder: totalPrice + deliveryFee 
      },
    })
      .then((response) => {
       setOrder(response.data)
        showToast("Order made successfull")  
        setIsLoading(false)
        navigation.navigate("PaymentPage",{totalPrice: totalPrice + deliveryFee, cartId:cartId, order: response?.data})  
      })
      .catch((error) => {
        console.log("error in checkout", error);
        showToast("An error occured")
  
      });
  };

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-10">
    <View className=" relative py-10">
      <BackButton />
    </View>
      
      <View>
        <View className="items-center">
          <Text
            className="text-[#000000] text-[18px]"
            style={{
              fontFamily: "poppins_semibold",
            }}
          >
            Order Confirmation
          </Text>
        </View>

        <View className="w-[90%] mx-auto">
          <Text
            className=""
            style={{
              fontFamily: "poppins_semibold",
            }}
          >
            Total
          </Text>
        </View>
        <View className="border border-gray-300 w-[85%] mx-auto rounded my-3">
        <View className="flex flex-row justify-between px-10 py-1">
        <Text style={{fontFamily:"poppins"}}>Order Total</Text>
        <Text style={{fontFamily:"poppins"}}>{totalPrice} Rwf</Text>
        </View>
        <View className="flex flex-row justify-between px-10 py-1">
        <Text style={{fontFamily:"poppins"}}>Delivery Type: </Text>
        <Text style={{fontFamily:"poppins"}}>{deliveryMethod}</Text>
        </View>
        <View className="flex flex-row justify-between px-10 py-1">
        <Text style={{fontFamily:"poppins"}}>Delivery Fee:</Text>
        <Text style={{fontFamily:"poppins"}}>{fee} Rwf</Text>
        </View>
        <View className="flex flex-row justify-between px-10 py-2 border-t-[1px] border-gray-200">
        <Text style={{fontFamily:"poppins_semibold"}}>Total Amount</Text>
        <Text style={{fontFamily:"poppins_semibold"}}>{totalPrice + fee} Rwf</Text>
        </View>
        </View>
      </View>

      <View className=" w-[85%] my-3 mx-auto">
        <Text style={{fontFamily: "poppins_semibold",}}>Location </Text>
        <View className="border border-gray-300 p-2 rounded space-y-1 my-3">
        <View className="flex flex-row justify-between px-10 py-1">
        <Text style={{fontFamily:"poppins"}}>Address</Text>
        <Text style={{fontFamily:"poppins"}}>{address}</Text>
        </View>
      
        <View className="flex flex-row justify-between px-10 py-1">
        <Text style={{fontFamily:"poppins"}}>Receiver's Tel:</Text>
        <Text style={{fontFamily:"poppins"}}>{receiverPhone}</Text>
        </View>
      </View>
      </View>
 
      <View className=" ml-7 mt-2">
        <Text
          className="text-[12px]"
          style={{
            fontFamily: "poppins_bold",
          }}
        >
          Delivery Date
        </Text>
      </View>
      <View
        className=" mt-3  bg-white   rounded border border-gray-300 ml-6 mr-7 flex flex-row justify-around  space-x-7"
        style={{
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <View className="space-y-5 mt-3 mb-3">
          <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>Date :</Text>
             <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins'
            }}>Time :</Text>
           
         
        </View>
        <View className="space-y-5 mt-3 mb-3"> 
          <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins_semibold'
            }}>{currentDate}</Text>
             <Text className="text-[12px] text-[#000000]" 
            style={{
                fontFamily:'poppins_semibold'
            }}>{currentTime}</Text>
        </View>
      </View>
      <TouchableOpacity className="mt-14 bg-primary px-3 py-2 w-[89%] items-center  mx-5 rounded-md absolute bottom-10 left-[0%]" onPress={async ()=> {
        setIsLoading(true);
        handleCheckout()
       
      }}>
      {!isLoading ? <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
      Proceed to Payment
    </Text>:<ActivityIndicator color="white"/>}
      
    </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CheckOut;
