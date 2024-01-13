import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useFonts } from "expo-font";
import ScreenNavigator from "./src/Navigation/ScreenNavigation";
import { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppIntroSlider from "react-native-app-intro-slider";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/Redux/store";
import RootNavigation from "./src/Navigation/AuthNavigation";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import registerNNPushToken from 'native-notify'

const { width, height } = Dimensions.get("screen");

const slide = [
  {
    key: 1,
    title: "Welcome",
    text: "Your Best gas App",
    image: require("./assets/images/woman-green.png"),
  },
];


const button = (label) => {

  return (
    <View className="bg-primary rounded-full px-3 py-2 items-center justify-center">
      <Text
        className=" text-secondary"
        style={{ fontFamily: "poppins_semibold" }}
      >
        {label}
      </Text>
    </View>
  );
};

export default function App() {
  registerNNPushToken(16725, 'iNAzd8Nc8GdjOhwTviFq8Y');
  
  const [showRealApp, setShowRealApp] = useState(false);
  const [fontsLoaded] = useFonts({
    poppins: require("./assets/fonts/poppins/Poppins-Regular.ttf"),
    poppins_medium: require("./assets/fonts/poppins/Poppins-Medium.ttf"),
    poppins_semibold: require("./assets/fonts/poppins/Poppins-SemiBold.ttf"),
    poppins_bold: require("./assets/fonts/poppins/Poppins-ExtraBold.ttf"),
    sans: require("./assets/fonts/dm_sans/DMSans-Regular.ttf"),
    sans_bold: require("./assets/fonts/dm_sans/DMSans-Bold.ttf"),
    sans_semibold: require("./assets/fonts/dm_sans/DMSans-SemiBold.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    if (!fontsLoaded) {
      prepare();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  

  return showRealApp ? (
    <Provider store={store}>
    <NavigationContainer>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  ) : (
    <AppIntroSlider
      data={slide}
      onDone={() => setShowRealApp(true)}
      renderItem={({ item }) => {
        return (
          <ImageBackground
            source={item.image}
            className="w-full h-full items-center justify-evenly flex-col "
            resizeMode="contain"
            style={{ width: width, height: height}}
          >
            <Text
              className="font-semibold text-white uppercase text-3xl w-44 text-center py-4"
              style={{ fontFamily: "poppins_bold", width:width/2 }}
            >
              {item.text}
            </Text>
            <View className="flex-col space-y-6">
            <TouchableOpacity onPress={()=>{setShowRealApp(true)}}>
            <View className="bg-secondary rounded-full px-3 py-2 items-center justify-center">
              <Text
                className=" text-black"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Get Started
              </Text>
            </View>
          </TouchableOpacity>

            
            </View>
           
          </ImageBackground>
        );
      }}
      renderDoneButton={()=>{return(<View></View>)}}
    />
  );
}
