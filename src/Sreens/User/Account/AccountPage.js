
 import { View, Text, TouchableOpacity, Image, FlatList, ScrollView, SafeAreaView, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import AccountText from "../../../Components/AccountText";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Menu from "../../../Components/Menu";
import { useDispatch, useSelector } from "react-redux";
import { setAuthRole, setAuthStatus, setAuthProfile, setAuthToken } from "../../../Redux/authSlice";
import {deleteItemAsync,  setItemAsync, getItemAsync} from "expo-secure-store"
import { Ionicons } from "@expo/vector-icons";
import NotificationBell from "../../../Components/NotificationBell";
import * as SecureStore from "expo-secure-store";
const AccountPage = () => {
  const dispatch = useDispatch();
  const [profile, setProfile]= useState({})
  const { authProfile } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading]=useState(false)
  const [person, setPerson] =useState({
    fullName:"Izere Nolan",
    email:"izerenolan21@gmail.com",
    phone: "+1 (805) 479-3639",
    profile: require("../../../../assets/images/profile.jpeg"),
    DOB:"02/04/2000"
  })
  const [users,setUser] =useState(null)

  const fetchData = async () => {
    try {
      const authToken = await SecureStore.getItemAsync("authToken");
      const authProfile = await SecureStore.getItemAsync("authProfile");
     

      if (authToken && authProfile) {
        setUser({
          authToken: authToken,
          authProfile: JSON.parse(authProfile),
       
        });
        
      }
      // console.log("User Data",users.authProfile)
      // console.log(user.authProfile.email,"ggg")
      // console.log(user.authProfile, "ggg"); // This will log the correct email
    } catch (error) {
      console.log(error, "Error fetching credentials from secure store");
    }
  };
  useEffect(()=>{
    fetchData()
  },[isFocused])

const handleLogout = ()=>{

  dispatch(setAuthRole(null))
  dispatch(setAuthStatus(false))
  console.log("Logging Out")
  deleteItemAsync('authToken')
  deleteItemAsync("authProfile")
  deleteItemAsync("userCart")
  dispatch(setAuthToken(false))
  dispatch(setAuthProfile(null))
  dispatch(setAuthStatus(false))
  
}
const {authRole, authStatus, authLoaded } = useSelector((state) => state.auth);
const getProfile = async ()=>{

  let userProfile =await getItemAsync("authProfile")
  setProfile(JSON.parse(userProfile))
 };
 useEffect(
   ()=>{getProfile()}
   
   ,[])
 
 console.log("Profile from account:", (profile))
 
 
 if (!authProfile){
   return(
     <SafeAreaView className="flex-1 w-full h-full bg-white pt-2 items-center justify-center relative">
     <TouchableOpacity className=" bg-primary p-3   mx-5 rounded"
     onPress={() => navigation.navigate("LoginWithPhone","CartPage")} >
     <Text style={{fontFamily:"poppins_semibold", color:"white"}}>Login to continue</Text>
     </TouchableOpacity>
     </SafeAreaView>
     
   )
 }

  return (
    <SafeAreaView className="pt-10 px-2 h-full bg-white pb-10 relative">
    
      {isLoading ? (<View className="absolute h-[200px] w-full flex flex-row items-center justify-center bg-transparent z-10 top-[40%] mx-auto"><ActivityIndicator size="large" color={"rgb(8 194 94)"}/></View>):(<View></View>)}
    <View className="pt-10 px-2 h-full bg-white">

      <View className="items-center  gap-1 flex-row justify-between mb-3">
      <View className=" w-[40%] h-[90%]">
       <Image
          source={require("../../../../assets/images/profile.jpeg")}
          className="w-[120px] h-[120px] rounded-full bg-slate-200"
        />
        </View>
      <View className=" w-[60%]">
      <Text  style={{fontFamily:"poppins_semibold"}} className="font-semibold  ">{users?.authProfile?.fullName}</Text>
      <Text  style={{fontFamily:"poppins"}}className="font-semibold text-xs w-[80%]">Email: {users?.authProfile?.Email} </Text>
        <Text className=" text-normal text-gray-500 mb-3" style={{fontFamily:"poppins"}}>
        {users?.authProfile?.PhoneNumber}
        </Text>
        <TouchableOpacity
          className="bg-primary rounded my-2 flex flex-row gap-2 justify-center items-center pb-2 w-32 ml-1"
          onPress={() => {
            navigation.navigate("EditProfile", profile);
          }}
        >
        <Feather name="edit-2" size={16} color="white" />
          <Text className="text-white font-semibold">Edit Profile</Text>
        </TouchableOpacity>
        </View>
      </View>
          <AccountText
            title="Profile Settings"
            subtitle="Change Your Basic Profile"
          />

       {users?.authProfile?.Role == "Customer" && <AccountText 
        title="My Address"
        subtitle="Change or Add Address"
        onPress={()=>{navigation.navigate("AddressSettingPage")}}
        />
   }


     {users?.authProfile?.Role != "Driver" &&    <AccountText 
        title="Terms, Privacy & Policy"
        subtitle="Things you may want to know"
        onPress={()=>{navigation.navigate("PrivacyPolicy")}}
        />}
   
        <AccountText 
        title="Help & Support"
        subtitle="Get Support From Us"
        onPress={()=>{navigation.navigate("HelpAndSupport")}}
        />
   
        <TouchableOpacity onPress={()=>{setIsLoading(true); setTimeout(() => {
          handleLogout()
        }, 1500);}} className=" flex flex-row w-28 p-1 justify-center rounded space-x-2 items-center bg-primary mt-10 absolute bottom-[7%] left-3">
        <AntDesign name="logout" size={18} color="white" />
          <Text className="font-semibold  text-white" style={{fontFamily:"poppins_semibold"}}>Logout</Text> 
        </TouchableOpacity>
      </View>
     
      </SafeAreaView>
  );
};

export default AccountPage;
