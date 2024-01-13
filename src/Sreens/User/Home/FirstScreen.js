import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../../../Components/BackButton'
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthRole, setAuthStatus, setAuthLoaded
} from "../../../Redux/authSlice";
import { setItemAsync, getItemAsync } from "expo-secure-store";

const FirstScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

const handleSetRole =(role)=>{
    dispatch(setAuthRole(role));
    dispatch(setAuthStatus(true));
}
const {authRole } = useSelector((state) => state.auth);
  return (
    <View className=" bg-primary h-full flex-col justify-around">
 
    <View className="items-center justify-center gap-6 top-24">
    <Image source={require('../../../../assets/images/sp-logo.png')} className="w-[150px] h-[150px] "/>
    <Text className="font-semibold text-lg text-white "> Gas For Better</Text>
    
  </View>
{ /* <View className="w-full items-center self-end  h-[30%]  justify-end justify-self-end mb-10" >
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{handleSetRole("admin")}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-primary font-semibold p-1">Admin</Text>
    </TouchableOpacity>
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{handleSetRole("manager")}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-primary font-semibold p-1">Manager</Text>
    </TouchableOpacity>
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{handleSetRole("user")}}>
    <Text style={{fontFamily:"poppins_semibold"}}  className="text-primary font-semibold p-1">User</Text>
    </TouchableOpacity>

    
  </View>*/}

  <View className="w-full items-center self-end  h-[30%]  justify-end justify-self-end mb-10" >
  <TouchableOpacity className="bg-transparent border border-white  p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{navigation.navigate("LoginWithPhone")}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-white font-semibold p-1">Login</Text>
    </TouchableOpacity>
  <TouchableOpacity className="bg-white p-2 px-6 rounded w-[80%] items-center my-3" onPress={()=>{navigation.navigate("Signup")}}>
    <Text style={{fontFamily:"poppins_semibold"}}  className="text-primary font-semibold p-1">Register</Text>
    </TouchableOpacity>

    
  </View>
  
    </View>
  )
}

export default FirstScreen