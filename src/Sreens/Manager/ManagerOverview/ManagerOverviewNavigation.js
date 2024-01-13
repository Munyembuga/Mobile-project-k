import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import InputText from '../../../Components/InputText'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../Components/BackButton'
import NotificationCard from '../../../Components/NotificationCard'
import Menu from '../../../Components/Menu'
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ManagerCompleted from './ManagerCompleted'
import ManagerInProgress from './ManagerInProgress'
import ManagerCanceled from './ManagerCanceled'
import NotificationBell from '../../../Components/NotificationBell'

const Tab = createMaterialTopTabNavigator()
const ManagerOverViewNavigation = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
    <View className=" relative py-4 items-end pr-6 justify-center">
    <BackButton />
    <View>
    <NotificationBell/>
    </View>
   </View>

   <Tab.Navigator
   initialRouteName="ManagerCompleted"
   options={{
    activeTintColor:"#08C25E",
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
   name = "Completed"
   component={ManagerCompleted}
   options={{tabBarLabel: "Completed"}}
   />
   <Tab.Screen 
   name = "Delivering"
   component={ManagerInProgress}
   options={{tabBarLabel: "Delivering"}}
   />
   <Tab.Screen 
   name = "Canceled"
   component={ManagerCanceled}
   options={{tabBarLabel: "Canceled"}}
   />

   </Tab.Navigator>
   </SafeAreaView>
  )
}

export default ManagerOverViewNavigation