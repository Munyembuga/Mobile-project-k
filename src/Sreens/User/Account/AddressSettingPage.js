import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  ScrollView, KeyboardAvoidingView
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import AddressCard from "../../../Components/AddressCard";
import { Octicons, Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { getItemAsync, setItemAsync } from "expo-secure-store";
import { useIsFocused } from "@react-navigation/native";

const AddressSettingPage = ({ navigation }, props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addLocation, setLocation] = useState([]);
  const [street, setStreet] = useState();
  const [cell, setCell] = useState();
  const { authStatus, authLoaded, authRole, authProfile, authToken } =
    useSelector((state) => state.auth);
  const [users, setUser] = useState([]);
  const [userAddress, setUserAddress] = useState([]);
  const isFocused=useIsFocused()
  const combineAddress = [cell,", ",street];
  const AddAdress = async () => {
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
        setItemAsync("authProfile", JSON.stringify(response?.data?.data));
        console.log(
          "New Autho_Profile_______________________________",
          authProfile
        );

        console.log("adress Added------------------", response?.data?.data);
   
        alert("sucess to Address");
      })
      .catch((error) => {
        alert("fail to add Address");
        console.log("error post Address :", error.response);
      });
  }; 
  
  const fetchAddress = async () => {
    try {
      const authToken = await SecureStore.getItemAsync("authToken");
      const authProfile = await SecureStore.getItemAsync("authProfile"); 

    if (authToken && authProfile) {
      const parsedAuthProfile = JSON.parse(authProfile);
      setUserAddress(parsedAuthProfile.Location || []); // Set user addresses directly
    }
  }
     catch (error) {
      console.log(error, "Error fetching credentials from secure store");
    }
  };
  useEffect(() => {
    fetchAddress();
  }, [isFocused]);

  return (
    <KeyboardAvoidingView className="flex-1 w-full h-full bg-white pt-2">
    <SafeAreaView className="flex-1 w-full h-full bg-white">
    <View className=" relative py-4">
     <BackButton />
    </View>
 
   {/* <View className="my-8">
   <AddressCard/>
   <AddressCard/>
   </View>
   <TouchableOpacity onPress={()=>{setIsModalVisible(!isModalVisible)}} className="bg-white rounded border border-gray-300 w-[90%] mx-auto my-3 items-center py-2">
<Feather name="plus" size={40} color="gray" />
<Text style={{ fontFamily: "poppins_semibold" }} className="text-gray-500">Add Address</Text>
   </TouchableOpacity> */}

  {/*   <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
      <View className=" relative py-4">
        <BackButton />
      </View>*/}


      <ScrollView className="my-8">
        <View>
        <FlatList 
          data={userAddress}
          numColumns={1}
          // keyExtractor={(item)=>item?._id}
          renderItem={({item})=>(
            <AddressCard
            address={item}
           
           
            />
          )}
          />
        {/* <AddressCard address={"jjs"} />
        <AddressCard /> */}
        </View>
    
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(!isModalVisible);
        }}
        className="bg-white rounded border border-gray-300 w-[90%] mx-auto my-3 items-center py-2"
      >
        <Feather name="plus" size={40} color="gray" />
        <Text
          style={{ fontFamily: "poppins_semibold" }}
          className="text-gray-500"
        >
          Add Address
        </Text>
      </TouchableOpacity>
      </ScrollView>
      <Modal
        style={{ height: 100 }}
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
        animationType="slide"
      >
        <View
          className="bg-white border border-gray-300 flex-1 w-[90%] mx-auto my-60 rounded"
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
                <Text style={{ fontFamily: "poppins_semibold" }}>Cell</Text>
                <View
                  className="flex-row px-2  justify-between  mb-3 rounded items-center border border-gray-400"
                  style={{ borderColor: `${props.borderColor}` }}
                >
                  <TextInput
                    placeholder="Ex: Nyarugenge"
                    onChangeText={setCell}
                    value={cell}
                    className="w-[75%] py-2 items-center"
                    style={{ fontFamily: "poppins" }}
                    onBlur={props.onBlur}
                  />
                </View>
                <Text
                  className="text-red-600 text-sm mt-[-10px] mx-2"
                  style={{ fontFamily: "poppins" }}
                >
                  {props.Error}
                </Text>
              </View>

              <View className=" mx-auto my-3 w-[80%]">
                <Text style={{ fontFamily: "poppins_semibold" }}>
                  Street Address
                </Text>
                <View
                  className="flex-row px-2  justify-between  mb-3 rounded items-center border border-gray-400"
                  style={{ borderColor: `${props.borderColor}` }}
                >
                  <TextInput
                    placeholder="Ex: KN 34St"
                    onChangeText={setStreet}
                    value={street}
                    className="w-[75%] py-2 items-center"
                    style={{ fontFamily: "poppins" }}
                    onBlur={props.onBlur}
                  />
                </View>
                <Text
                  className="text-red-600 text-sm mt-[-10px] mx-2"
                  style={{ fontFamily: "poppins" }}
                >
                  {props.Error}
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
        </View>
      </Modal>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default AddressSettingPage;

