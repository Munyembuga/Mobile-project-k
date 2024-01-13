import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import HomePage from "../Sreens/User/Home/HomePage";
import AccountPage from "../Sreens/User/Account/AccountPage";
import UsersOrdersPage from "../Sreens/User/UserOrders/UsersOrdersPage";
import CartPage from "../Sreens/User/Cart/CartPage";
import ManagerOverViewNavigation from "../Sreens/Manager/ManagerOverview/ManagerOverviewNavigation";
import ManagerDashboard from "../Sreens/Manager/ManagerOrders/ManagerDashboard";
import ManagerNotificatnPage from "../Sreens/Manager/ManagerNotifications/ManagerNotificationPage";
import DrawerNavigation from "./DrawerNavigation";
import StockDetails from "../Sreens/Manager/ManagerStock/StockDetails";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import TopTabDelivers from "../Sreens/delivers/TopTabDelivers";

const Tab = createMaterialBottomTabNavigator();

export const DriverTabNavigation= ()=>{
  return(
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        height: 100,
        position: "absolute",
        bottom: 16,
        right: 16,
        left: 16,
        backgroundColor: "white",
        borderRadius: 20,
      },
    }}
    tabBarOptions={{
      showLabel: false,
      style: { backgroundColor: "red", border: 3 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={TopTabDelivers}
      options={{
        tabBarLabel: "",

        tabBarIcon: ({ focused }) => (
          <View className="text-center  items-center">
            <MaterialCommunityIcons
              name="format-list-checkbox"
              size={22}
              color={focused ? "white" : "gray"}
              backgroundColor={focused ? "#08C25E" : "transparent"}
              style={{
                borderRadius: 120,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 7,
                paddingRight: 7,
                paddingBottom: 5,
                paddingTop: 5,
                textAlign: "center",
                margin: "auto",
              }}
              className="items-center justify-center flex-row text-center"
            />

            <Text
              className="my-1 text-xs text-gray-500 w-20 text-center"
              style={{
                color: focused ? "#08C25E" : "gray",
                fontFamily: focused ? "poppins_semibold" : "poppins",
              }}
            >
              Dashboard
            </Text>
          </View>
        ),
      }}
    />
    
    <Tab.Screen
      name="Account"
      component={AccountPage}
      options={{
        tabBarLabel: "",
        tabBarIcon: ({ focused }) => (
          <View className="text-center  items-center">
            <MaterialCommunityIcons
              name="account-multiple"
              size={20}
              color={focused ? "white" : "gray"}
              backgroundColor={focused ? "#08C25E" : "transparent"}
              style={{
                borderRadius: 120,
                alignItems: "center",
                justifyContent: "center",
                paddingLeft: 7,
                paddingRight: 7,
                paddingBottom: 5,
                paddingTop: 5,
                textAlign: "center",
                margin: "auto",
              }}
              className="items-center justify-center flex-row text-center"
            />
            <Text
              className="my-1 text-xs  text-center w-[100%] "
              style={{
                color: focused ? "#08C25E" : "gray",
                fontFamily: focused ? "poppins_semibold" : "poppins",
              }}
            >
              Account
            </Text>
          </View>
        ),
      }}
    />
  </Tab.Navigator>
  )

}
function ManagerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 100,
          position: "absolute",
          bottom: 16,
          right: 16,
          left: 16,
          backgroundColor: "white",
          borderRadius: 20,
        },
      }}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "red", border: 3 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={DrawerNavigation}
        options={{
          tabBarLabel: "",

          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="format-list-checkbox"
                size={22}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "#08C25E" : "transparent"}
                style={{
                  borderRadius: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 5,
                  paddingTop: 5,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />

              <Text
                className="my-1 text-xs text-gray-500 w-20 text-center"
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Dashboard
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Overview"
        component={ManagerOverViewNavigation}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="shopping-outline"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "#08C25E" : "transparent"}
                style={{
                  borderRadius: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 5,
                  paddingTop: 5,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-xs text-gray-500 text-center w-[100%]"
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Overview
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Stock"
        component={StockDetails}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <FontAwesome5
                name="box-open"
                size={18}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "#08C25E" : "transparent"}
                style={{
                  borderRadius: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 5,
                  paddingTop: 5,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-xs  text-center w-[100%] "
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Stock Details
              </Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen
        name="Account"
        component={AccountPage}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="account-multiple"
                size={20}
                color={focused ? "white" : "gray"}
                backgroundColor={focused ? "#08C25E" : "transparent"}
                style={{
                  borderRadius: 120,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 7,
                  paddingRight: 7,
                  paddingBottom: 5,
                  paddingTop: 5,
                  textAlign: "center",
                  margin: "auto",
                }}
                className="items-center justify-center flex-row text-center"
              />
              <Text
                className="my-1 text-xs  text-center w-[100%] "
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default ManagerTabNavigator;
