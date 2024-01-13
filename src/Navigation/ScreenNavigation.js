import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigation";
import { useState, useEffect } from "react";
import CartPage from "../Sreens/User/Cart/CartPage";
import AccountPage from "../Sreens/User/Account/AccountPage";
import UsersOrdersPage from "../Sreens/User/UserOrders/UsersOrdersPage";
import SingleOrder from "../Sreens/User/UserOrders/SingleOrder";
import Login from "../Sreens/User/Home/Login";
import Signup from "../Sreens/User/Home/Signup";
import LoginWithPhone from "../Sreens/User/Home/LoginWithPhone";
import AddressPage from "../Sreens/User/Home/AddressPage";
import PaymentPage from "../Sreens/User/Cart/PaymentPage";
import { View, Text } from "react-native";
import StockDetails from "../Sreens/Manager/ManagerStock/StockDetails";
import FirstScreen from "../Sreens/User/Home/FirstScreen";
import CheckOut from "../Sreens/User/Cart/CheckOut";
import PaymentSuccessPage from "../Sreens/User/Cart/PaymentSuccessPage";
import EditProfile from "../Sreens/User/Account/EditProfile";
import HomePage from "../Sreens/User/Home/HomePage";
import ManagerDashboard from "../Sreens/Manager/ManagerOrders/ManagerDashboard";
import ManagerNotificationPage from "../Sreens/Manager/ManagerNotifications/ManagerNotificationPage";
import ManagerOverviewNavigation from "../Sreens/Manager/ManagerOverview/ManagerOverviewNavigation";
import { useDispatch, useSelector } from "react-redux";
import ManagerTabNavigator from "./ManagerTabNavigator";
import DrawerNavigation from "./DrawerNavigation";
import AddressSettingPage from "../Sreens/User/Account/AddressSettingPage";
import HelpAndSupport from "../Sreens/User/Account/HelpAndSupport";
import PrivacyPolicy from "../Sreens/User/Account/PrivacyPolicy";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import ManagerNotificatnPage from "../Sreens/Manager/ManagerNotifications/ManagerNotificationPage";
import SingleItem from "../Sreens/User/Home/SingleItem";
import ExtraToolsPage from "../Sreens/User/Cart/ExtraToolsPage";
import DeliverHome from "../Sreens/delivers/DeliverHome";
import TopTabDelivers from "../Sreens/delivers/TopTabDelivers";
import DeliverDetails from "../Sreens/delivers/DeliverDetails";
import ReachDestination from "../Sreens/delivers/ReachDestination";
import { DriverTabNavigation } from "./ManagerTabNavigator";
import SingleDelivery from "../Sreens/delivers/SingleDelivery";
import TakePicturePage from "../Sreens/delivers/TakePicturePage";
import ExternalOrdersPage from "../Sreens/Manager/ManagerOrders/ExternalOrdersPage";
import AllExternalOrders from "../Sreens/Manager/ManagerOrders/AllExternalOrders";
import EditExternalOrder from "../Sreens/Manager/ManagerOrders/EditExternalOrder";
import DetailOrder from "../Sreens/Manager/ManagerOrders/DetailOrder";
import SingleManagerOrder from "../Sreens/Manager/ManagerOverview/SingleManagerOrder";
import CompletedDeliver from "../Sreens/delivers/CompletedDeliver";
import OrderStatus from "../Sreens/User/UserOrders/OrderStatus";

const Stack = createStackNavigator();

export const CustomerHomeNavigations = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SingleItem"
        component={SingleItem}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="Login"
      component={Login}
      options={{
        headerShown: false,
      }}
    />
    </Stack.Navigator>
  );
};

export const CustomerCartNavigations = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="CartPage">
      <Stack.Screen
        name="CartPage"
        component={CartPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddressPage"
        component={AddressPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentPage"
        component={PaymentPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentSuccessPage"
        component={PaymentSuccessPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckOut"
        component={CheckOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExtraToolsPage"
        component={ExtraToolsPage}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
};

export const CustomerOrdersNavigations = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="CustomerOrderScreens">
      <Stack.Screen
        name="UsersOrdersPage"
        component={UsersOrdersPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingleOrder"
        component={SingleOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderStatus"
        component={OrderStatus}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


export const CustomerAccountNavigations = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="AccountPage ">
      <Stack.Screen
        name="AccountPage"
        component={AccountPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddressSettingPage"
        component={AddressSettingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};


function ScreenNavigator() {
  const { authRole, authStatus, authProfile, authLoaded } = useSelector(
    (state) => state.auth
  );

  const [profile, setProfile] = useState({});
  const getProfile = async () => {
    let userProfile = await getItemAsync("authProfile");
    setProfile(JSON.parse(userProfile));
  };
  useEffect(() => {
    getProfile();
  }, []);

  if (!authLoaded) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName="HomePage">
      {authProfile?.Role === "Driver" && (
        <>
          <Stack.Screen
            name="DeliverHome"
            component={DriverTabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DeliverDetails"
            component={DeliverDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ReachDestination"
            component={ReachDestination}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SingleDelivery"
            component={SingleDelivery}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TakePicturePage"
            component={TakePicturePage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      {authProfile?.Role == "Customer" && (
        <>
          <Stack.Screen
            name="HomePage"
            component={TabNavigator}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Account"
            component={AccountPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddressPage"
            component={AddressPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserOrders"
            component={UsersOrdersPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleOrder"
            component={SingleOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentPage"
            component={PaymentPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentSuccessPage"
            component={PaymentSuccessPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOut}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddressSettingPage"
            component={AddressSettingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelpAndSupport"
            component={HelpAndSupport}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleItem"
            component={SingleItem}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExtraToolsPage"
            component={ExtraToolsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}

      {authProfile?.Role == "Manager" && (
        <>
          <Stack.Screen
            name="ManagerDashboard"
            component={ManagerTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SingleManagerOrder"
            component={SingleManagerOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DetailOrder"
            component={DetailOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManagerNotificationPage"
            component={ManagerNotificationPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManagerOverviewNavigation"
            component={ManagerOverviewNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StockDetails"
            component={StockDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Account"
            component={AccountPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ManagerNotificatnPage"
            component={ManagerNotificatnPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExtraToolsPage"
            component={ExtraToolsPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExternalOrdersPage"
            component={ExternalOrdersPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllExternalOrders"
            component={AllExternalOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditExternalOrder"
            component={EditExternalOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default ScreenNavigator;
