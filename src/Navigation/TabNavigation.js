import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import HomePage from "../Sreens/User/Home/HomePage";
import AccountPage from "../Sreens/User/Account/AccountPage";
import UsersOrdersPage from "../Sreens/User/UserOrders/UsersOrdersPage";
import CartPage from "../Sreens/User/Cart/CartPage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { create } from "zustand";
import { useBadgeStore } from "../Redux/zustandStore";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthRole,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../Redux/authSlice";
import { deleteItemAsync, setItemAsync, getItemAsync } from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import {
  CustomerAccountNavigations,
  CustomerCartNavigations,
  CustomerHomeNavigations,
  CustomerOrdersNavigations,
} from "./ScreenNavigation";

const Tab = createMaterialBottomTabNavigator();
function TabNavigator() {
  const { authStatus, authLoaded, authRole, authProfile, authToken } =
    useSelector((state) => state.auth);
  const [cart, setcart] = useState([]);
  const [checkError, setCheckError] = useState("");
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const badge = useBadgeStore((state) => state.badge);
  const increaseBadge = useBadgeStore((state) => state.increaseBadge);
  const decreaseBadge = useBadgeStore((state) => state.decreaseBadge);
  const setBadge = useBadgeStore((state) => state.setBadge);

  useEffect(() => {});

  // Logout function
  const handleLogout = () => {
    dispatch(setAuthRole(null));
    dispatch(setAuthStatus(false));
    console.log("Logging Out");
    deleteItemAsync("authToken");
    deleteItemAsync("authProfile");
    deleteItemAsync("userCart");
    dispatch(setAuthToken(false));
    dispatch(setAuthProfile(null));
    dispatch(setAuthStatus(false));
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowaLabel: false,
        tabBarStyle: { backgroundColor: "red" },
      }}
      tabBarOptions={{
        showLabel: false,
        style: { backgroundColor: "red", border: 3 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CustomerHomeNavigations}
        options={{
          tabBarLabel: "",

          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center">
              <MaterialCommunityIcons
                name="home"
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
                className="my-1 text-xs text-gray-500 w-12 text-center"
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                HOME
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CustomerCartNavigations}
        options={{
          tabBarLabel: "",
          tabBarBadge: badge >= 1 && badge,
          tabBarBadgeStyle: { backgroundColor: "yellow" },
          tabBarIcon: ({ focused }) => (
            <View className="text-center  items-center rounded-full relative ">
              <MaterialIcons
                name="shopping-cart"
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
                className="my-1 text-xs text-gray-500 text-center"
                style={{
                  color: focused ? "#08C25E" : "gray",
                  fontFamily: focused ? "poppins_semibold" : "poppins",
                }}
              >
                Cart
              </Text>
            </View>
          ),
        }}
      />
      {authProfile && (
        <Tab.Screen
          name="userOrders"
          component={CustomerOrdersNavigations}
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
                  Orders
                </Text>
              </View>
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Account"
        component={CustomerAccountNavigations}
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

export default TabNavigator;
