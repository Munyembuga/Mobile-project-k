import {
    View,
    Text,
    Button,
    TouchableOpacity,
    ScrollView,
    Image,
    TextInput,
    Modal,
    ToastAndroid,
    ActivityIndicator
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
  
  
  const ExtraToolsPage = ({route}) => {

    const totalPrice  = route.params.totalAmount
    const cartId  = route.params.cartId
    const [isRegulatorChecked, setRecgulatorChecked] = useState(false);
    const [iscableChecked, setCableChecked] = useState(false);
    const [isChecked_3, setChecked_3] = useState(false);
    const [Tools, setTools] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [addons, setAddons] = useState([])
    const { authToken } =useSelector((state) => state.auth);
    const useFocused = useIsFocused()
    const navigation = useNavigation()
    // const [cartId, setCartId] = useState("")
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loadStatus, setLoadStatus] = useState(false)

    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleSelectChange = (addonId, Count) => {
      setSelectedItems((prevSelectedItems) => {
        const existingItemIndex = prevSelectedItems.findIndex((item) => item.addonId === addonId);
    
        if (Count === 0) {
          // Remove the item if Count becomes 0
          if (existingItemIndex !== -1) {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems.splice(existingItemIndex, 1);
            return updatedSelectedItems;
          }
        } else {
          // Update the Count for the selected item or add a new item
          if (existingItemIndex !== -1) {
            const updatedSelectedItems = [...prevSelectedItems];
            updatedSelectedItems[existingItemIndex] = { addonId, Count: parseInt(Count) };
            return updatedSelectedItems;
          } else {
            return [...prevSelectedItems, { addonId, Count: parseInt(Count) }];
          }
        }
    
        return prevSelectedItems;
      });
    };
    console.log("selected Items*******************", selectedItems)

    const calculateTotalPrice = () => {
      let totalPrice = 0;
      for (const selectedItem of selectedItems) {
        const item = Tools.find((tool) => tool._id === selectedItem.addonId);
        if (item) {
          totalPrice += item.Price * selectedItem.Count;
        }
        
      }
      
      return totalPrice;
    };

    useEffect(()=>{calculateTotalPrice()},[])


    console.log("totalPrice__ ", calculateTotalPrice())
    console.log("cartId__ ", cartId)

    const fetchTools = async () => {
      axios({
        method: "GET",
        url: `https://sp-gas-api.onrender.com/api/v1/addons`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
        .then((response) => {
          setTools(response.data.data);
          // console.log("Addons ----------",response.data.data);
          setIsLoading(false)
        })
        .catch((error) => {
          console.log(error.response.data, "error to fetch");
        });
    };

// console.log("Cartid in extro tools", cartId)

    const handleAddAddons = () => {
      setLoadStatus(true)
      axios({
        method: "PUT",
        url: `https://sp-gas-api.onrender.com/api/v1/cart/${cartId}/addons`,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data: {
          addOns: selectedItems,
          TotalAmount: calculateTotalPrice() + totalPrice
        },
      })
        .then((response) => {
      setLoadStatus(false)
          showToast("Addons added successfully");
          console.log(response.data.products, "Item Count updated successfully");
          navigation.navigate("AddressPage", {totalPrice:calculateTotalPrice() + totalPrice, cartId:cartId})
        })
        .catch((error) => {
          console.log("Error Adding Addon:", error);
          showToast("Error adding Addons")
        });
    };

    useEffect(() => {
      fetchTools();
    }, [useFocused]);
  
    return (
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
        <View className=" relative pt-10 pb-3">
          <BackButton />
          {/*loadStatus && <View className=" self-center mx-auto my-auto  w-full items-center justify-center h-[80vh] absolute "><ActivityIndicator  color="rgb(8 194 94)" size="large"/></View>*/}

          <Text className="text-center " style={{fontFamily:"poppins_semibold"}}>Select Extra items you might need</Text>
        </View>
        
        <View className="flex-row items-center justify-between w-[85%] mx-auto rounded p-2 ">
        <Text style={{fontFamily:"poppins_semibold"}}>Addon Price: </Text>
        <Text style={{fontFamily:"poppins_semibold", fontSize:16, color:"rgb(8 194 94)"}}>{calculateTotalPrice()} </Text>
        </View>
      {isLoading? <View className="h-[55%] flex flex-row items-center justify-center"><ActivityIndicator size={"large"}/></View>: <ScrollView className="w-[100%] px-[5%] mx-auto border-b border-gray-500">
        {Tools.map((item) => {
          return (
            <AddonCard
              key={item._id}
              id={item._id}
              Price={item.Price}
              image={item.Image}
              name={item.Name}
              price={item.Price}
              onSelectChange={handleSelectChange}
            />
          );
        })}
      </ScrollView>}

        
        <View className="flex-row items-center justify-between w-[85%] mx-auto rounded p-1 my-2 mt-4">
        <Text style={{fontFamily:"poppins_semibold"}}>Total Amount: </Text>
        <Text style={{fontFamily:"poppins_semibold", fontSize:16}} className="text-primary">{calculateTotalPrice() + totalPrice} Rwf</Text>
        </View>
        <TouchableOpacity onPress={()=>{
          handleAddAddons()
          // navigation.navigate("AddressPage", {totalPrice:calculateTotalPrice() + totalPrice, cartId:cartId})
        }}
        className="bg-primary w-[85%] rounded p-2 items-center justify-center my-4 mx-auto">
        {!loadStatus ? <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
        Continue
      </Text>:<ActivityIndicator color="white"/>}
        </TouchableOpacity>
     
      </SafeAreaView>
    );
  };
  
  export default ExtraToolsPage;
