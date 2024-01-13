import ScreenNavigator from "./ScreenNavigation";
import FirstScreen from "../Sreens/User/Home/FirstScreen";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Sreens/User/Home/Login";
import Signup from "../Sreens/User/Home/Signup";
import LoginWithPhone from "../Sreens/User/Home/LoginWithPhone";
import { setAuthLoaded, setAuthProfile, setAuthStatus, setAuthToken, setAuthRole } from "../Redux/authSlice";
import { getItemAsync } from "expo-secure-store";
import TabNavigator from "./TabNavigation";
import ManagerTabNavigator from "./ManagerTabNavigator";
import DeliverHome from "../Sreens/delivers/DeliverHome";
import TopTabDelivers from "../Sreens/delivers/TopTabDelivers";
import DeliverDetails from "../Sreens/delivers/DeliverDetails";
import ReachDestination from "../Sreens/delivers/ReachDestination";
export const AuthNavigation = () => {

    const Stack = createStackNavigator();
      return (
        <Stack.Navigator>
        <Stack.Screen name="FirstScreen" component={FirstScreen} options={{
            headerShown: false,
          }}/>
         
        <Stack.Screen name="Signup" component={Signup} options={{
            headerShown: false,
          }}/>
        <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
          }}/>
          <Stack.Screen name="LoginWithPhone" component={LoginWithPhone} options={{ headerShown: false}}/>
        {/* <Stack.Screen name="HomePage" component={TabNavigator} options={{headerShown: false}}/>*/}
       
        </Stack.Navigator>
      );
    };
  
    export default RootNavigation = () => {
    const dispatch = useDispatch()
      const { authStatus, authLoaded, authRole } = useSelector((state) => state.auth);
   
  const handleAuth = async ()=>{
    let token = await getItemAsync("authToken")
    let user = await getItemAsync("authProfile");
    

    if(token){
      dispatch(setAuthStatus(true));
      dispatch(setAuthToken(token));
      dispatch(setAuthProfile(JSON.parse(user)));
    }
    dispatch(setAuthLoaded(true));
    // SplashScreen.hideAsync();
  }
  useEffect(() => {
    handleAuth();
  }, []); 
  if(!authLoaded){
    return null
  }
    
        return( authStatus ?(<ScreenNavigator />): (<AuthNavigation/>) )
       
      };