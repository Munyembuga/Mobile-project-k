import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import CartComponet from "./CartComponet";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import BackButton from "../../../Components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useBadgeStore } from "../../../Redux/zustandStore";

import axios from "axios";
const CartPage = () => {
  const navigation = useNavigation();
  const { authStatus, authLoaded, authRole, authProfile, authToken } =
    useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);
  const [userCards, setUserCards] = useState([]);
  const isFocused = useIsFocused();
  const [price, setPrice] = useState([]);
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadStatus, setLoadStatus] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartId, setCartId] = useState("")
  const increaseBadge = useBadgeStore(state => state.increaseBadge)
  const decreaseBadge = useBadgeStore(state => state.decreaseBadge)
  const setBadge = useBadgeStore(state => state.setBadge)
  const Badge = useBadgeStore(state => state.badge)
  const { width, height } = Dimensions.get("screen");

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  const fetchCards = async () => {
    setLoadStatus(true)
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/cart`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        const filteredCart = response.data[0]?.products.filter((item)=> item.productId !==null)
        setUserCards(filteredCart);
        console.log(
          "User Cart",
          response?.data[0].products,
          
        );
        setLoadStatus(false) 
        setCartId(response.data[0]._id)
        console.log(response.data,"Daaaaaaaa")
      })
      .catch((error) => {
        setLoadStatus(false)
        showToast("Error Ocurred")
        console.log("Error fetching cart",error.response.data);
      });
  };

  console.log("cart Id in cartpage", cartId)
  // console.log("cart Items**********", userCards)
  
  const fetchTarrif = async () => {
    setIsLoading(false);
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/tariff/latest`,
    })
      .then((response) => {
        setPrice(response?.data?.data?.Price);    
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false)
        console.log("error fetching tarrifs cartpage:", error);
      });
  };

  const deletecart = async (itemid) => {
    axios({
      method: "DELETE",
      url: `https://sp-gas-api.onrender.com/api/v1/cart/delete/${itemid}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(response, "user cards after delete");
        fetchCards();
        showToast("Item deleted successfully");
        setIsLoading(false)
        decreaseBadge()
      })
      .catch((error) => {
        showToast("fail");
        setIsLoading(false)
        console.log(error.data.message, "error to fetch");
      });
  };


  const incrementAmountCards = (itemId) => {
    const index = userCards.findIndex(
      (cartItem) => cartItem?.productId?._id === itemId
    );
    console.log(index, "Inedx");
    console.log(userCards[index], "Index");
    
    setIsLoading(true)
    axios({
      method: "PATCH",
      url: `https://sp-gas-api.onrender.com/api/v1/cart/update/`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        productId: userCards[index]?.productId?._id,
        quantity: userCards[index]?.quantity + 1,
      },
    })
      .then((response) => {
        showToast("Product Incremented");
        const updatedUserCards = [...userCards];
        updatedUserCards[index].quantity += 1;
        setUserCards(updatedUserCards);
        console.log(userCards, "userCardsss");
        console.log(response.data.products, "Item count updated successfully");
        setIsLoading(false)
        increaseBadge()
      })
      .catch((error) => {
        console.log("Error updating item count:", error.response.data.error);
      })
      .finally(() => {
        
        setIsLoading(false);
      });
  };

  const decreaseAmountCards = (itemId) => {
    setIsLoading(true)
    const index = userCards.findIndex(
      (cartItem) => cartItem?.productId?._id === itemId
    );
    console.log(index, "Inedx");
    console.log(userCards[index], "Inedx");
    // setIsLoading(true);
    if (userCards[index].quantity > 1) {
      axios({
        method: "PATCH",
        url: `https://sp-gas-api.onrender.com/api/v1/cart/update/`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          productId: userCards[index]?.productId?._id,
          quantity: userCards[index]?.quantity - 1,
        },
      })
        .then((response) => {
          showToast("Product decremented");
          setIsLoading(false)
          const updatedUserCards = [...userCards];
          updatedUserCards[index].quantity -= 1;
          setUserCards(updatedUserCards);
          console.log(response);
          console.log(userCards, "userCards Data");
          console.log(
            response.data.products,
            "Item count updated successfully"
          );
          showToast("Product updated")
          
        })
        .catch((error) => {
          console.log("Error updating item count:", error.response);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log("Item count cannot be less than 1");
    }
  };


  const calculateTotalPrice = (userCards) => {
    return userCards?.reduce(
      (total, item) => total + price * item?.productId?.Kilograms * item.quantity,
      0
    );
  };

  useEffect(() => {
    
    const newTotalAmount = calculateTotalPrice(userCards);
    setTotalAmount(newTotalAmount);
  }, [userCards]);


  useFocusEffect(React.useCallback(() => {
   fetchCards();
   fetchTarrif();

  }, []));

  const handledeletecart = (itemid) => {
    setIsLoading(true)
    deletecart(itemid);
    fetchCards();
  };
  const handleincrement = (itemId) => {
    setIsLoading(true)
    incrementAmountCards(itemId);
  };


  if (!authProfile) {
    return (
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2 items-center justify-center">
        <TouchableOpacity
          className=" bg-primary p-3   mx-5 rounded"
          onPress={() => navigation.navigate("LoginWithPhone")}
        >
          <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
            Login to continue
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2 relative">
      <ScrollView className=" w-full h-full ">

        <View className="absolute z-10">
          <BackButton />
        </View>

        {loadStatus ? (  
          <View className="bg- flex items-center justify-center flex-row space-x-3" style={{height:height/2}}><Text style={{ fontFamily: "poppins_semibold" }}>Loading...</Text><ActivityIndicator /></View>
        ) : (
          !userCards?.length ? (
            <View className="items-center justify-center  w-full" style={{height:height/1.5}}>
            <Image
              source={require("../../../../assets/images/nocart.png")}
              className="w-40 h-40"
              style={{ resizeMode: "contain" }}
            />
            <Text style={{ fontFamily: "poppins_semibold" }}>
              No Items in Cart Yet
            </Text>
            <TouchableOpacity className="rounded py-2 px-10 bg-primary my-5 " onPress={() => navigation.goBack()} >
              <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
          ) : (
            <View className="mt-12">

            {isLoading && <View className=" self-center  w-full items-center justify-center"><ActivityIndicator color="rgb(8 194 94)" size="small"/></View>}
            {userCards.map((item, index)=>{
              return(
                <CartComponet
                key={index}
                  name={item.productId?.Type}
                  quantity={item.productId?.Kilograms}
                  count={item.quantity}
                  price={(item.productId?.Kilograms * price ) * item.quantity || 0}
                  image={item.productId?.Image}
                  delete={() => handledeletecart(item?.productId?._id)}
                  increment={() => handleincrement(item?.productId?._id)}
                  decrease={() => decreaseAmountCards(item?.productId?._id)}
                  
                />
              )
            })}
            </View>
          )
        )}
        <View className=" my-10 h-full ">
   

          {/* <CartComponet name={"Double Acting Cylinder"} quantity="38 kg"  price={"2,000 rwf"}/> */}
          {/* <CartComponet name={"Double Acting Cylinder"} quantity="38 kg"  price={"2,000 rwf"}/>
      <CartComponet name={"Double Acting Cylinder"} quantity="38 kg"  price={"2,000 rwf"}/> */}
        </View>
      </ScrollView>
      <TouchableOpacity
      disabled= {!userCards?.length}
        onPress={() => navigation.navigate("ExtraToolsPage", {totalAmount:totalAmount, cartId: cartId})}
        className=" bg-primary p-2 w-[90%]  mx-5 rounded-md absolute bottom-10"
        style={{backgroundColor:!userCards?.length?"#6BDA9E": "rgb(8 194 94)"}}
      >
        <View className="flex-row justify-between  flex mx-1 ">
          <Text
            className="text-white text-[16px]"
            style={{ fontFamily: "poppins_semibold" }}
          >
            Order Now
          </Text>

          <Text
            className="text-[#fff] text-[16px]"
            style={{ fontFamily: "poppins_semibold" }}
          >
            ${totalAmount } 
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CartPage;


