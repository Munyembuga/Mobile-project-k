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


  
  const ExternalOrdersPage = (props) => {

    const [Tools, setTools] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { authToken, authProfile } =useSelector((state) => state.auth);
    const [focused, setFocused] = useState(false)
    const navigation = useNavigation()
    const [FullName, setFullName] = useState("")
    const [PhoneNumber, setPhoneNumber] = useState("")
    const [StationId, setStationId] = useState("")
    const [ProductId, setProductId] = useState("")
    const [Quantity, setQuantity] = useState("")
    const [receiptNumber, setReceiptNumber] = useState("")
    const [Amount, setAmount] = useState("")
    const [product, setProduct] = useState([]);
    const [elements, setElements] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
  
  let dataArray = []
    const fetchProduct = async () => {
      setIsLoading(true);
  
      axios({
        method: "GET",
        url: `https://sp-gas-api.onrender.com/api/v1/product`,
      })
        .then((response) => {
          setProduct(response?.data.data);
          setIsLoading(false);
          
          for (var i =0; i< response?.data.data.length; i++){
              dataArray.push({
                  value: response?.data?.data[i]._id,
                  label: response?.data?.data[i].Type,
              })
              setElements(dataArray)
           }
        })
        .catch((error) => {
          console.log("Error getting products:",error);
        });
    };
  
    useFocusEffect(
      React.useCallback(() => {
        fetchProduct()
      }, [])
    );


    console.log("auth in ext oreders ,", authProfile)
    // setStationId(authProfile.StationId)
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  
    const AddExternalOrder = async () => {
        axios({
          method: "POST",
          url: `https://sp-gas-api.onrender.com/api/v1/extOrder/addExtOrder`,
      
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          data: {
            FullName: FullName,
            PhoneNumber:PhoneNumber,
            StationId:authProfile.StationId,
            ProductId:product.value,
            Quantity:Quantity,
            receiptNumber:receiptNumber,
            Amount:Amount, 
          },
        })
          .then((response) => {
            console.log("response from external orders ", response.data);
            showToast("Order Set successfully")
            // setIsloading(false)
          })
          .catch((error) => {
            console.log("error in external orders", error);
          });
      };

      console.log("value in ,,,",product.value)
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };
  }
      

    return (
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
        <View className=" relative py-10">
          <BackButton />
          <Text className="text-center mt-4" style={{fontFamily:"poppins_semibold"}}>External Orders</Text>
        </View>

        <ScrollView className="w-[90%] mx-auto my-2 p-1 ">
        <InputText2 
        field="Full Name"
        onChangeText={(text)=>{setFullName(text)}}
        value={FullName}
        />
        <InputText2 
        field="Phone Number"
        onChangeText={(text)=>{setPhoneNumber(text)}}
        value={PhoneNumber}
        />
    
       
        <DropDownComponent 
        onChange= {item => {
            setValue(item);
            setProduct(item)
            setIsFocus(false);
          }}
        elements= {elements}
        value={value}
        />

        <InputText2 
        field="Quantity"
        onChangeText={(text)=>{setQuantity(text)}}
        value={Quantity}
        />
        <InputText2 
        field="Receipt "
        onChangeText={(text)=>{setReceiptNumber(text)}}
        value={receiptNumber}
        />
        <InputText2 
        field="Amount"
        onChangeText={(text)=>{setAmount(text)}}
        value={Amount}
        />

       
        </ScrollView>
        <TouchableOpacity onPress={()=>{AddExternalOrder()}} className="bg-primary w-[80%] p-3 rounded mx-auto flex items-center ">
        <Text style={{fontFamily:"poppins", color:"white"}}>Add</Text>
        </TouchableOpacity>
        
        <View className="my-3 mt-10 items-start flex-row justify-start w-[80%] mx-auto" >
      
        </View>
      </SafeAreaView>
    );
  };
  
  export default ExternalOrdersPage;
  

//   className="absolute left-3 top-3 text-gray-400 text-md"


const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'rgb(156 163 175)',
      borderWidth: 0.5,
      borderRadius: 4,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });