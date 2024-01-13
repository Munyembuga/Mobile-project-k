import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import PreviewCard from "../../../Components/PreviewCard";
import Menu from "../../../Components/Menu";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { useSelector } from "react-redux";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import {
  setAuthLoaded,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../../../Redux/authSlice";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import Skeleton from "../../../Components/Skeleton";
import { useBadgeStore } from "../../../Redux/zustandStore";


const gases = [
  {
    id: 1,
    type: "Double Acting Cylinder",
    size: "38kg",
    price: "25,000",
    picture: require("../../../../assets/images/cylinder1.png"),
  },
  {
    id: 2,
    type: "Single Acting Cylinder",
    size: "24kg",
    price: "20,000",
    picture: require("../../../../assets/images/cylinder2.png"),
  },
  {
    id: 3,
    type: "Tie-Rod Cylinder",
    size: "12kg",
    price: "16,000",
    picture: require("../../../../assets/images/cylinder3.png"),
  },
  {
    id: 4,
    type: "Telescropic Cylinder",
    size: "8kg",
    price: "8,000",
    picture: require("../../../../assets/images/cylinder4.png"),
  },
];

function showToast(message) {
  ToastAndroid.show(message, ToastAndroid.SHORT);
}

const HomePage = () => {
  const navigation = useNavigation();
  const { authToken, authProfile } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGas, setFilteredGas] = useState([]);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImage] = useState([]);
  const [page, setPage] = useState(1);
  const [tarrifs, setTarrifs] = useState([]);
  const [sliderActive, setSliderActive] = useState(0);
  const { width, height } = Dimensions.get("screen");
  const intervalRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isid, setId] = useState([]);
  const increaseBadge = useBadgeStore(state => state.increaseBadge)
  const setBadge = useBadgeStore(state => state.setBadge)
  const Badge = useBadgeStore(state => state.badge)
  const [userCards, setUserCards] = useState([]);
  const [product, setProduct] = useState([]);
  const [tarrifPrice, setTarrifPrice] = useState("")
const[ja,setja] = useState()

  const fetchProduct = async () => {
    setIsLoading(true);

    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/product`,
    })
      .then((response) => {
        setProduct(response?.data?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error fetching products homepage:",error);
      });
  };

  const handleAddToCart = async (productId) => {
    if (!productId) {
      console.error('Product ID is undefined or null');
      return;
    }
    axios({
      method: "POST",
      url: `https://sp-gas-api.onrender.com/api/v1/cart/addCart`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        "productId":productId,
        quantity:1,
      },
    })
      .then((response) => {
        console.log("Fetch Product homepage----------------------------",response.data);
        increaseBadge()       
        showToast("Successfull Add Cart");
      })
      .catch((error) => {
        console.log("error adding to cart: ",error.response.data);
        showToast(error.message);
      });
  };

  const fetchTarrifPrice = async () => {
    setIsLoading(false);

    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/tariff/latest`,
    })
      .then((response) => {
        setTarrifPrice(response?.data?.data?.Price);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error fetching tarrifs:", error);
      });
  };

  const fetchCards = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/cart`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        const filteredCart = response.data[0]?.products.filter((item)=> item.productId !==null)
        setUserCards(filteredCart);
        setBadge(filteredCart?.length)
        console.log(
          "User Cart",
          response?.data[0].products,  
        );
      })
      .catch((error) => {
        console.log(error.response.data, "error to fetch");
      });
  };

  // setBadge(userCards?.length)

  useEffect(() => {
    fetchTarrifPrice()
    fetchProduct();
    fetchCards ();
  }, []);
  const PlaceholderSkeleton = () => {
    const renderItem = ({ index }) => {
      return <PreviewCard key={index} load={true} />;
    };
  
    return (
      <FlatList
        data={Array.from({ length: 8 })}
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    );
  };
  useEffect(() => {
    const filteredData = product?.filter(
      (item) =>
        item?.Type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item?.Kilograms && item.Kilograms.toString().includes(searchQuery)) 
        // (item.Kilograms*tarrif && item.Kilograms*tarrif.toString().includes(searchQuery))
        );
    setFilteredGas(filteredData);
  }, [searchQuery, product, isFocused]);

  const slider = [
    {
      key: 1,
      icon: require("../../../../assets/images/star.png"),
      color: "#FFF95F",
      textTitle: "Gas",
      text: "at affordable price",
      image: require("../../../../assets/images/gas-3d.png"),
      titleColor: "#FFA31A",
    },
    {
      key: 2,
      icon: require("../../../../assets/images/bluestar.png"),
      color: "#ACE7FA",
      textTitle: "Prepare",
      text: "Elegant  meals with ease",
      image: require("../../../../assets/images/guy-bg.png"),
      titleColor: "#0050AA",
    },
    {
      key: 3,
      icon: require("../../../../assets/images/Lightning.png"),
      color: "#1EF481",
      textTitle: "Delivered",
      text: "at your doorsteps",
      image: require("../../../../assets/images/deliver-bg.png"),
      titleColor: "#048C43",
    },
  ];
  const onchange = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.floor(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== sliderActive) {
        setSliderActive(slide);
      }
    }
  };

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      if (!isSwiping) {
        const nextSlide = (sliderActive + 1) % slider?.length;
        setSliderActive(nextSlide);
        scrollViewRef.current.scrollTo({
          x: nextSlide * width,
          animated: true,
        });
      }
    }, 5000); 
  };

  const onScrollBeginDrag = () => {
    setIsSwiping(true);
    clearInterval(intervalRef.current);
  };

  const onScrollEndDrag = () => {
    setIsSwiping(false);
    startAutoPlay();
  };

  useEffect(() => {
    startAutoPlay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isSwiping, sliderActive]);

  console.log("]>Badge", Badge)
  const scrollViewRef = useRef();

  return (
    <SafeAreaView className="bg-white w-full h-full">
      <ScrollView className="w-full">
        <View className=" pt-10 bg-white h-full relative w-full">
          <View className="text-center flex-col items-center my-2">
            <View className="flex-row items-center space-x-2">
              <Image
                source={require("../../../../assets/icon.png")}
                style={{ resizeMode: "contain" }}
                className="w-10 h-10"
              />
              <Text
                style={{ fontFamily: "poppins_bold" }}
                className="text-xl text-primary"
              >
                SP GAS
              </Text>
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef}
            onScroll={({ nativeEvent }) => onchange(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            onTouchStart={onScrollBeginDrag}
            onTouchEnd={onScrollEndDrag}
          >
            {slider.map((item, index) => (
              <View
                className="space-x-2 mx-auto"
                style={{ width: width, height: height * 0.25 }}
              >
                <View
                  className=" h-full bg-white  flex-row items-center justify-between p-2 rounded px-4 my-3 relative mx-2"
                  style={{ backgroundColor: item.color }}
                >
                  <Image
                    key={item.key}
                    source={item.icon}
                    className="h-16 w-16 absolute left-[50%] top-[0px]"
                    style={{ resizeMode: "contain" }}
                  />
                  <View className="w-[60%]">
                    <Text
                      className=" text-3xl"
                      style={{
                        fontFamily: "poppins_bold",
                        color: item.titleColor,
                      }}
                    >
                      {item.textTitle}
                    </Text>
                    <Text
                      className="text-3xl"
                      style={{ fontFamily: "poppins_bold" }}
                    >
                      {item.text}
                    </Text>
                  </View>
                  <View className="h-[120%] items-start ">
                    {item.key == 2 && (
                      <Image
                        className=" w-[150px] h-[170px] absolute right-[-15px] bottom-[0px]"
                        source={require("../../../../assets/images/figure.png")}
                      />
                    )}
                    <Image
                      source={item.image}
                      className="h-full w-40  absolute right-[-10px] top-[-33px]"
                      style={{
                        resizeMode: "contain",
                        height: item.key != 1 ? "150%" : "100%",
                        top: item.key == 1 ? -20 : -65,
                      }}
                    />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View className="dots w-full my-1 mx-auto items-center flex-row justify-center">
            {slider.map((item, index) => (
              <Text
                key={item.key}
                className="rounded-full w-2 h-2   m-1"
                style={{
                  backgroundColor:
                    sliderActive == index ? "#FFA31A" : "#FFF95F",
                }}
              ></Text>
            ))}
          </View>

          <View className="flex-row w-[90%] mx-auto my-3 p-1 pl-2 bg-white rounded opacity-100 justify-between border border-gray-400 sticky top-0">
            <TextInput
              placeholder=" Search for Kilograms,Type ,Price "
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
              placeholderTextColor={"gray"}
              style={{
                fontFamily: "poppins_medium",
              }}
              className="w-[80%] text-xs"
            />
            <TouchableOpacity className="bg-primary p-1 rounded items-center justify-center">
              <Ionicons name="ios-search-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text
            style={{ fontFamily: "poppins_bold" }}
            className="text-primary text-lg uppercase text-center my-3"
          >
            Products available
          </Text>

          <View className="w-[80%] flex-row my-3 mx-auto">
            <Text
              className="pt-1 px-1 mx-1 text-xs"
              style={{ fontFamily: "poppins_semibold" }}
            >
              Filter:
            </Text>
            <Text
              className="pt-1 px-3 bg-green-200 rounded-full border border-green-400 mx-1 text-xs"
              style={{ fontFamily: "poppins" }}
            >
              All Categories
            </Text>

            <TouchableOpacity
              onPress={() => {}}
            >
              <Text
                className="pt-1 px-3  rounded-full  border border-gray-300 mx-1 text-xs"
                style={{ fontFamily: "poppins" }}
              >
                Gases
              </Text>
            </TouchableOpacity>

            <Text
              className="pt-1 px-3  rounded-full border border-gray-300  mx-1 text-xs"
              style={{ fontFamily: "poppins" }}
            >
              Oil
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-2 justify-center">
          {isLoading ?(<View>
                {PlaceholderSkeleton()}
              </View>):(<View>
                <FlatList
                  data={filteredGas}
                  numColumns={2}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <PreviewCard
                      type={item?.Type}
                      size={item.Kilograms+" kg"}
                      price={item.Kilograms * tarrifPrice}
                      ImageURL={item.Image}
                      carts={() => handleAddToCart(item?._id)}
                      onPress ={()=>{navigation.navigate("SingleItem",{item:item, price:item.Kilograms * tarrifPrice})}}
                    />
                  )}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;