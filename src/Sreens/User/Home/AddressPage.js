import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { EvilIcons, Octicons } from "@expo/vector-icons";
import InputText from "../../../Components/InputText";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import PhoneInputText from "../../../Components/PhoneInputText";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthRole,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../../../Redux/authSlice";
import * as yup from "yup"
import { Formik } from 'formik';
import { deleteItemAsync, setItemAsync, getItemAsync } from "expo-secure-store";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";


const AddressPage = ({route}) => {
    
  const totalPrice  = route.params.totalPrice
  const cartId  = route.params.cartId
  const [users, setUser] = useState(null);
  const navigation = useNavigation();
  const [receiverPhoneNumber, setReceiverPhoneNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { authProfile, authToken } =useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [district, setDistrict] = useState(null);
  const [street, setStreet] = useState();
  const [userAddress, setUserAddress] = useState([]);
  const isFocused = useIsFocused();
  const combineAddress = [district, ", ", street];
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(0);
  const [userId, setUserId] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [isDefaultNumber, setIsDefaultNumber] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("Delivery")
  const [isLoading, setIsLoading] = useState(true)
  const [DeliveryFee, setDeliveryFee] = useState(0)
  const [loadStatus, setLoadStatus] = useState(false)
  const [addressError, setAddressError] = useState("")

  const phonePattern =/(0(7[2|3|8|9][0-9]))\d{5}/
const loginSchema = yup.object().shape({
    phone: yup
    .string()
    .required('Phone is required')
    .matches(phonePattern,"Please enter a valid phone number")
    
});


function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}
  const profileId = authProfile?._id

  const fetchUserProfile = async () => {
    
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/users/${profileId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        setItemAsync("authProfile", JSON.stringify(response?.data?.data));
        console.log("User Profile", 
          response?.data?.data.Location         
        );
        dispatch(setAuthProfile(response?.data?.data));
        setUserAddress(response?.data?.data.Location,)
        // fetchAddress();
        setIsLoading(false)
        setLoadStatus(false)
      })
      .catch((error) => {
        console.log(error.response.data, "error to fetch");
      });
  };

   useEffect(
     ()=>{
      fetchUserProfile();
      }
     
     ,[])


  const AddAdress = async () => {
    setIsLoading(true)
    axios({
      method: "PUT",
      url: `https://sp-gas-api.onrender.com/api/v1/users/location`,
      data: {
        Location: combineAddress,
      },

      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // console.log("adress Added------------------", response?.data?.data);
        setIsModalVisible(false);
        // fetchAddress();
        fetchUserProfile();
        setLoadStatus(false)
        
      })
      .catch((error) => {
        alert("fail to add Address");
        console.log("error post Address :", error.response);
      });
  };

  const fetchDeliveryFee = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/deliveryfee/getAllDelFee`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // setUserCards(response.data.products);
        setDeliveryFee(response.data.Amount[0].Amount)
        console.log("+++++delivery response", response.data.Amount[0].Amount)
      })
      .catch((error) => {
        console.log(error.response.data, "error to fetch");
      });
  };

  useFocusEffect(React.useCallback(() => {
    fetchUserProfile()
    fetchDeliveryFee()
    // getProfile();
    // fetchAddress();
  }, []));

  const Validator = () => {
    if (receiverPhoneNumber.length === 0) {
      setPhoneError("Phone is required");
      setLoadStatus(false)
      console.log(phoneError)
      showToast("Phone is required")
    } else if(receiverPhoneNumber.length > 10){
      setLoadStatus(false)
      setPhoneError("Invalid Phone number");
      showToast("Invalid Phone number")
    }
    
    else if (!phonePattern.test(receiverPhoneNumber)) {
      setPhoneError("Invalid phone number");
      setLoadStatus(false)
      showToast("Invalid phone number")
    } else if (receiverPhoneNumber.indexOf(" ") >= 0) {
      setPhoneError("Phone can't contain space");
      setLoadStatus(false)
      showToast("Phone can't contain space")

    }
    else if(userAddress.length==0){
setAddressError("Please Add an Address")
setLoadStatus(false)
showToast("Please Add an Address")
setPhoneError("");
    }
    else {
      setLoadStatus(false)
      setPhoneError("");
      setAddressError("")
      navigation.navigate("CheckOut", {totalPrice:totalPrice, cartId:cartId, address:userAddress[defaultAddressIndex], receiverPhone:receiverPhoneNumber, deliveryMethod:deliveryMethod, deliveryFee:deliveryMethod == "Delivery"? DeliveryFee : 0 });

    }
  };
console.log(defaultAddressIndex)
  const validate =(item)=>{
    if(item.length == 0){
      setPhoneError("Field required")
    }else{
      setPhoneError("")
      navigation.navigate("CheckOut", {totalPrice:totalPrice, cartId:cartId, address:userAddress[defaultAddressIndex], receiverPhone:receiverPhoneNumber});

    }
  }

  const setDefaultNumber =()=> {
    if(isDefaultNumber){setReceiverPhoneNumber("")} 
    else{setReceiverPhoneNumber(authProfile.PhoneNumber[0])}
  }

const renderItem=({ item ,index }) => {
  const isDefaultAddress = index === defaultAddressIndex;

 
  return(
          
  <TouchableOpacity
    onPress={() => {
      setDefaultAddressIndex(index);
    }}
    className="flex-row bg-red space-x-5 my-3 border border-gray-300 space relative overflow-hidden p-2 rounded items-center justify-start"
  >
    {isDefaultAddress && (
      <View className=" z-20 absolute right-[-13] rotate-45 top-2 bg-primary px-3 rounded-ful">
        <Text
          style={{
            fontFamily: "poppins",
            fontSize: 10,
            color: "white",
          }}
        >
          Default
        </Text>
      </View>
    )}
    <View className="bg-slate-200 items-center justify-center w-12 h-12 rounded-full">
      <Octicons name="location" size={26} color="black" />
    </View>
    <View className="w-[70%]">
      <Text style={{ fontFamily: "poppins_semibold" }}>
        Address {index + 1}
      </Text>
      <Text style={{ fontFamily: "poppins" }}>{item}</Text>
 
    </View>
  </TouchableOpacity>
)}

  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2 pb-5">
    <Formik
    initialValues={{phone:"", password:""}}
    validateOnMount={true}
     
    onSubmit={values =>{
      handleLogin(values)
    }}
    validationSchema={loginSchema}
  >
  {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
    <KeyboardAvoidingView>

    <View className=" relative py-6">
      <BackButton />
    </View>

  
        <View className="w-[90%] mx-auto my-5 flex-row justify-between items-center">
          <Text style={{ fontFamily: "poppins_semibold" }}>
            Choose Your Location
          </Text>
          <TouchableOpacity
          
          onPress={() => {
            setIsModalVisible(!isModalVisible);
          }}
          className="px-2 py-2 bg-primary items-center rounded mx-auto self-end"
        >
          <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
            Create New Location
          </Text>
        </TouchableOpacity>
        </View>
        <ScrollView>
          <View className="w-[90%] mx-auto my-2">

          <Text style={{ fontFamily: "poppins_semibold"}} className="text-center text-red-500">{addressError}</Text>
          {(!isLoading && userAddress.length ==0)  && <View className="flex-col items-center">
            
            <Text style={{ fontFamily: "poppins_semibold"}}>No Addresses Registered,</Text>
            <Text style={{ fontFamily: "poppins_bold"}}>Create one</Text>
            </View>}
         {!isLoading ?  

          userAddress.map((item, index)=>{
            return(renderItem({item, index}))
          })
      :<View className="flex items-center h-[20%] justify-center"><ActivityIndicator/></View>}
          </View>

          <Modal
          style={{ height: 100 }}
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
          animationType="slide"
        >
          <KeyboardAvoidingView
            className="bg-white border border-gray-300 flex-1 w-[90%] mx-auto my-10 mb-40 rounded"
            style={{ elevation: 4 }}
          >
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(!isModalVisible);
              }}
              className="items-right justify-end w-full"
            >
              <View className="text-right m-1 items-end p-2">
                <AntDesign name="closecircleo" size={24} color="red" />
              </View>
            </TouchableOpacity>
            <View className="content  w-[90%] mx-auto">
              <View className="flex-col justify-between ">
                <View className=" mx-auto my-1 w-[80%]">
                  <Text style={{ fontFamily: "poppins_semibold" }}>
                    Cell
                  </Text>
                  <View
                    className="flex-row px-2  justify-between  mb-3 rounded items-center border border-gray-400"
                    // style={{ borderColor: `${props.borderColor}` }}
                  >
                    <TextInput
                      placeholder="Ex: Nyarugenge"
                      onChangeText={setDistrict}
                      value={district}
                      className="w-[75%] py-2 items-center"
                      style={{ fontFamily: "poppins" }}
                      
                    />
                  </View>
                  <Text
                    className="text-red-600 text-sm mt-[-10px] mx-2"
                    style={{ fontFamily: "poppins" }}
                  >
                    
                  </Text>
                </View>

                <View className=" mx-auto my-3 w-[80%]">
                  <Text style={{ fontFamily: "poppins_semibold" }}>
                    Street Address
                  </Text>
                  <View
                    className="flex-row px-2  justify-between  mb-3 rounded items-center border border-gray-400"
                    // style={{ borderColor: `${props.borderColor}` }}
                  >
                    <TextInput
                      placeholder="Ex: KN 34St"
                      onChangeText={setStreet}
                      value={street}
                      className="w-[75%] py-2 items-center"
                      style={{ fontFamily: "poppins" }}
                      // onBlur={props.onBlur}
                    />
                  </View>
                  <Text
                    className="text-red-600 text-sm mt-[-10px] mx-2"
                    style={{ fontFamily: "poppins" }}
                  >
                    
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                AddAdress();
              }}
              className="items-center justify-center mx-auto px-3 py-2 my-3 rounded bg-primary"
            >
              <Text
                style={{ fontFamily: "poppins_semibold" }}
                className="text-white"
              >
                Save Address
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
                
          <View className="w-[90%] mx-auto mt-3 bg-gray-100 p-2 rounded">
            <Text
              className="mt-3 w-[85%] mx-auto"
              style={{ fontFamily: "poppins" }}
            >
              Receivers Details:
            </Text>
            <PhoneInputText
            field="Receivers Number"
            required={null}
            placeholder="Phone Number, 078....."
            // onChangeText={(text)=>{setReceiverPhoneNumber(text)}}
            Icon="phone"
            onChangeText={(text)=>{handleChange('phone') , setReceiverPhoneNumber(text)} }
            onBlur={handleBlur('phone')}
            value={receiverPhoneNumber}
            Error={phoneError}
            borderColor={errors.phone && touched.phone ? `red` : "gray"}
            // Error={errors.phone && touched.phone ? `${errors.phone || phoneError}` : ""}
          />
          <View className=" w-[85%] mx-auto my-2 flex-row items-center space-x-2">
          <TouchableOpacity onPress={()=>{setIsDefaultNumber(!isDefaultNumber),setDefaultNumber()}} className="w-[20px] h-[20px] rounded border border-gray-300">
          {isDefaultNumber &&<AntDesign name="checksquare" size={18} color="rgb(8 194 94)" />}
          </TouchableOpacity>
          
          <Text
          className="  text-xs"
          style={{ fontFamily: "poppins" }}
        >Choose Your default Number</Text>
          
          </View>
            <Text
              className="w-[85%] mx-auto  text-xs"
              style={{ fontFamily: "poppins" }}
            >
              If you are not the receiver provide the information about the one
              to receive.
            </Text>
          </View>

          <View className=" w-[90%] mx-auto my-4 bg-gray-100 p-2 rounded">
          <Text style={{fontFamily:"poppins_semibold"}}>Delivery Method</Text>
          <View>
          <View></View>
      
          <View className=" w-[85%] mx-auto my-2 flex-row items-center space-x-2">
          <TouchableOpacity onPress={()=>{setDeliveryMethod("Delivery")}} className="w-[20px] h-[20px] rounded-full border border-gray-300 overflow-hidden">
          {deliveryMethod == "Delivery" &&<AntDesign name="checkcircle" size={18} color="blue" />}
          </TouchableOpacity>
          
          <Text
          className="  text-xs"
          style={{ fontFamily: "poppins" }}
        >Delivery ({DeliveryFee} Rfw)</Text>
          
          </View>
          <View className=" w-[85%] mx-auto my-2 flex-row items-center space-x-2">
          <TouchableOpacity onPress={()=>{setDeliveryMethod("Pick Up")}} className="w-[20px] h-[20px] rounded-full border border-gray-300 overflow-hidden">
          {deliveryMethod == "Pick Up" &&<AntDesign name="checkcircle" size={18} color="rgb(8 194 94)" />}
          </TouchableOpacity>
          
          <Text
          className="  text-xs"
          style={{ fontFamily: "poppins" }}
        >Pick Up</Text>
          
          </View>


          </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setLoadStatus(true)
              Validator()
            }}
            className="px-3 py-2 bg-primary items-center w-[90%] rounded mx-auto mt-2"
          >
          {!loadStatus ? <Text style={{ fontFamily: "poppins_semibold", color: "white" }}>
          Continue
        </Text>:<ActivityIndicator color="white"/>}
          </TouchableOpacity>
          <View className="mt-40"></View>
        </ScrollView>

      </KeyboardAvoidingView>
      )}
      </Formik>
    </SafeAreaView>
  );
};

export default AddressPage;