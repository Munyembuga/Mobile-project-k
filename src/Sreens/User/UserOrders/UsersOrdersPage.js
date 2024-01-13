import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ongoing from "./Ongoing";
import History from "./History";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from 'react-redux'
import NotificationBell from '../../../Components/NotificationBell';
import BackButton from '../../../Components/BackButton';


const Tab = createMaterialTopTabNavigator()
const UsersOrdersPage = () => {

  const { authStatus, authLoaded, authRole, authProfile } = useSelector((state) => state.auth);
  
  if (!authProfile){
    return(
      <SafeAreaView className="flex-1 w-full h-full bg-white pt-2 items-center justify-center">
      <TouchableOpacity className=" bg-primary p-3   mx-5 rounded"
      onPress={() => navigation.navigate("LoginWithPhone","CartPage")} >
      <Text style={{fontFamily:"poppins_semibold", color:"white"}}>Login to continue</Text>
      </TouchableOpacity>
      </SafeAreaView>
      
    )
  }
  return (
    <SafeAreaView className="bg-white">
    <View className=" relative py-4 items-end pr-6 justify-center mb-5">
    <BackButton />
    <View>
  
    </View>
   </View>

    <View className="relative h-full w-full bg-white ">
   <Tab.Navigator
   initialRouteName="Orders"
   options={{
    activeTintColor:"red",
    ActiveXObject:"red",
    labelStyle: { fontSize: 12 },
    headerShown: true,
    headerShadowVisible: true,
    headerTintColor: "#08C25E",
    style: {
      backgroundColor: "white",
      marginTop: 50,
      fontFamily: "poppins", 
    },
   }}>
   <Tab.Screen 
   name = "Ongoing"
   component={Ongoing}
   options={{tabBarLabel: "Ongoing",
  activeTintColor:"red"
  }}
   />
   <Tab.Screen 
   name = "History"
   component={History}
   options={{tabBarLabel: "History",activeTintColor:"red"}}
   />

   </Tab.Navigator>
   </View>
   </SafeAreaView>
  );
};

export default UsersOrdersPage;
