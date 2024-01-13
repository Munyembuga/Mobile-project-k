import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "../Sreens/User/Home/HomePage";
import CartPage from "../Sreens/User/Cart/CartPage";
import ManagerDashboard from "../Sreens/Manager/ManagerOrders/ManagerDashboard";
import ManagerNotificatnPage from "../Sreens/Manager/ManagerNotifications/ManagerNotificationPage";
import ManagerTabNavigator from "./ManagerTabNavigator";
import StockDetails from "../Sreens/Manager/ManagerStock/StockDetails";
import ManagerOverViewNavigation from "../Sreens/Manager/ManagerOverview/ManagerOverviewNavigation";
import AccountPage from "../Sreens/User/Account/AccountPage";
import { Dimensions } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { setItemAsync, getItemAsync } from "expo-secure-store";

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("screen");
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              className="h-32 bg-white border "
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderTopColor: "#f4f4f4",
                borderRightColor: "#f4f4f4",
                borderLeftColor: "#f4f4f4",
                backgoundColor: "blue",
              }}
            >
              <Image
                source={require("../../assets/images/sp-logo.png")}
                className="w-32 h-32"
                // style={{height:50, width:50}}
              />
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: width - 50,
        },
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={ManagerDashboard}
        options={{
          headerShown: false,
          title: "",
          drawerIcon: (focused) => (
            <View className="text-center  items-center flex-row  space-x-6">
              <MaterialCommunityIcons
                name="format-list-checkbox"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "gray" : "transparent"}
                style={{
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 7,
                  paddingTop: 7,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-gray-500  text-center"
                style={{
                  color: focused ? "gray" : "gray",
                  fontFamily: focused ? "poppins_bold" : "poppins",
                }}
              >
                DASHBOARD
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ManagerNotificatnPage"
        component={ManagerNotificatnPage}
        options={{
          headerShown: false,
          title: "",
          drawerIcon: (focused) => (
            <View className="text-center  items-center flex-row  space-x-6">
              <MaterialCommunityIcons
                name="bell"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "gray" : "transparent"}
                style={{
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 7,
                  paddingTop: 7,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-gray-500  text-center"
                style={{
                  color: focused ? "gray" : "gray",
                  fontFamily: focused ? "poppins_bold" : "poppins",
                }}
              >
                NOTIFICATION
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="ManagerOverView"
        component={ManagerOverViewNavigation}
        options={{
          headerShown: false,
          title: "",
          drawerIcon: (focused) => (
            <View className="text-center  items-center flex-row  space-x-6">
              <MaterialCommunityIcons
                name="shopping-outline"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "gray" : "transparent"}
                style={{
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 7,
                  paddingTop: 7,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-gray-500  text-center"
                style={{
                  color: focused ? "gray" : "gray",
                  fontFamily: focused ? "poppins_bold" : "poppins",
                }}
              >
                OVERVIEW
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="StockDetails"
        component={StockDetails}
        options={{
          headerShown: false,
          title: "",
          drawerIcon: (focused) => (
            <View className="text-center  items-center flex-row  space-x-6">
              <FontAwesome5
                name="box-open"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "gray" : "transparent"}
                style={{
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 7,
                  paddingTop: 7,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-gray-500  text-center"
                style={{
                  color: focused ? "gray" : "gray",
                  fontFamily: focused ? "poppins_bold" : "poppins",
                }}
              >
                STOCK DETAILS
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="AccountPage"
        component={AccountPage}
        options={{
          headerShown: false,
          title: "",
          drawerIcon: (focused) => (
            <View className="text-center  items-center flex-row  space-x-6">
              <FontAwesome5
                name="user"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "gray" : "transparent"}
                style={{
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 7,
                  paddingTop: 7,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-gray-500 text-lg text-center"
                style={{
                  color: focused ? "gray" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
    // <View></View>
  );
};

export default DrawerNavigation;
