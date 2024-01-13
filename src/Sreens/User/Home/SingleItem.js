import { View, Text, Image, TouchableOpacity, ToastAndroid } from "react-native";
import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";
import BackButton from "../../../Components/BackButton";
import { useNavigation } from "@react-navigation/native";


const SingleItem = ({route}) => {
  const product = route.params.item;
  const price = route.params.price;
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state) => state.auth);

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
  console.log("authToken in single item, " , authToken)

  const handleAddToCart = async () => {
    // dispatch(addToCart(grocery))
    axios({
      method: "POST",
      url: `https://sp-gas-api.onrender.com/api/v1/cart/addCart`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        tariffId:product._id,
        quantity:1,
      },
    })
      .then((response) => {
        console.log(response.data);
        showToast(response.data.status)
       
      })
      .catch((error) => {
        console.log("error adding to cart: ", error);
        showToast( error.message)
      });
  };
 
let groc =  {"_id": "653b9132fce2386e57532305", "count": 5, "grocery": {"__v": 0, "_id": "6537de18b79326529c5c40da", "amount": "1 pack", "category": "65357e54706788961a777b8b", "description": "Type of bread that is commonly used for making sandwiches", "name": "Italian Bread", "picture": "https://res.cloudinary.com/dkakh1m7u/image/upload/v1698160151/uploads/x99jh0inn9scggwbbclu.png", "price": 1000}}

  return (
    <View className="flex-col  h-full bg-white p-2 pt-4 shadow-xl w-full rounded-md   relative">
    <View className="mt-4 z-10">
        <BackButton/>
    </View>

      <View className="flex-row w-full justify-center items-center h-[35%]  p-1 rounded-md  shadow-inner "  >
        <Image
          source={{uri: product.Image}}
          style={{resizeMode:"contain"}}
          className="w-48 h-48 object-contain  "
        />
      </View>
      <View className=" w-full items-start justify-start gap-1 ">
        <View className="flex-row items-center gap-1">
          <Text className="text-center text-black  text-lg font-semibold" style={{fontFamily:"poppins_semibold"}} >
            {product.Type}
          </Text>
         
        </View>

        <View className="flex-row gap-1 items-center ">
          <Text className="text-center m-1 text-green-500  text-xl" style={{fontFamily:"poppins_semibold"}}>
            {product.Kilograms} Kg
          </Text>
          
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>

        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 " style={{fontFamily:"poppins_semibold"}}>
            Price
          </Text>
          <Text className=" text-blacky" style={{fontFamily:"poppins_semibold"}}>
            {price} Rwf
          </Text>
        </View>
        <View className="line w-full border-b-[1px] border-gray-200 my-2"></View>
        <View className="flex-col gap-1 items-start justify-center mb-2">
          <Text className=" text-gray-400 text-xs font-semibold" style={{fontFamily:"poppins_semibold"}}>
            Description
          </Text>
          <Text className=" text-gray-600  font-semibold px-3 my-1 " style={{fontFamily:"poppins"}}>
          
          SP Gas is an affordable, safe, efficient, sustainable and environmentally friendly cooking method and is available in 6kg, 12kg, 15kg, 20kg and
          </Text>
        </View>
   
      </View>
      <View className="w-full justify-self-end self-end my-3  rounded absolute bottom-0 left-2 mx-auto">
      <TouchableOpacity className="bg-primary rounded w-full p-2 items-center justify-self-end" 
      onPress={()=>{
        handleAddToCart()
      }}>
      <Text className=" text-white" style={{fontFamily:"poppins_semibold"}}> ADD TO CART</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleItem;
