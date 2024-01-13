import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import Menu from "../../../Components/Menu";
import StockCard from "../../../Components/stockCard";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import StockTextfield from "../../../Components/StockTextfield";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import NotificationBell from "../../../Components/NotificationBell";
import { useDispatch, useSelector } from "react-redux";
import {
  setAuthRole,
  setAuthStatus,
  setAuthProfile,
  setAuthToken,
} from "../../../Redux/authSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
const StockDetails = () => {
  const [isVisible, setVisible] = useState(false);
  const [isChecked_1, setChecked_1] = useState(false);
  const [isChecked_2, setChecked_2] = useState(false);
  const [isChecked_3, setChecked_3] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const { authStatus, authLoaded, authRole, authProfile, authToken } =
    useSelector((state) => state.auth);
  const [users, setUser] = useState([]);
  const [stationIds, setStationId] = useState(null);
  const [stock, setStock] = useState([]);
  const [tarrifs, setTarrifs] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  console.log("**************gg**", authProfile?.StationId);
  const [inputValue, setInputValue] = useState({});
  const [quantity, setQuantity] = useState({});
  const station = authProfile?.StationId;
  console.log(station);
  const [checkedItems, setCheckedItems] = useState({});
  const [InputError, setInputError] = useState("")

  function showToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  // Function to handle checkbox changes
  const handleCheckChange = (itemId, productId, newValue) => {
    setCheckedItems({ ...checkedItems, [itemId]: newValue });
    if (newValue) {
      setSelectedProductId(productId); // Set the selected productId
    } else {
      setSelectedProductId(null); // Clear the selected productId if unchecked
    }
  };
  console.log(selectedProductId, "??????????????????????????");

  const handleTextChange = (text, itemId) => {
    setInputValue({
      [itemId]: text, // Store the text value based on the itemId
    });
    setQuantity(text);
  };
  const fetchTarrif = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/tariff/latest`,
    })
      .then((response) => {
        setTarrifs(response?.data?.data?.Price);
        console.log("Tarriffs Price data: ", response?.data?.data?.Price);
        console.log(tarrifs, "useStateggg Tarriffs*******************");
      })
      .catch((error) => {
        console.log("error fetching tarrifs:", error);
      });
  };

  const fetchStock = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/stock/station/${station}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(
          "Stock Data_____&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",
          response.data
        );
        setStock(response.data);
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch@@@@@@@@@@@@@@@@@@h@@@@@@@@@@@@@@@@@@@@@@@@@@"
        );
      });
  };
  const handleRequestStock = async () => {
    axios({
      method: "POST",
      url: `https://sp-gas-api.onrender.com/api/v1/stOrder/addStOrder`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      data: {
        StationId: station,
        ProductId: selectedProductId,
        Quantity: quantity,
        Status: "string",
      },
    })
      .then((response) => {
        setInputValue({}); // Reset inputValue state to empty object
        setQuantity({}); // Reset quantity state to empty object
        setCheckedItems({}); // Reset checkedItems state to empty object
        showToast("Order Sent succcessfull")
        console.log(
          "Fetch Product homepage----------------------------",
          response.data
        );
        showToast("Successfull Request");
      })
      .catch((error) => {
        console.log("error adding to cart: ", error.response);
        showToast(error.message);
      });
  };
  console.log(inputValue, "IIIIIIIIIIIIIIIIIII");
  console.log(quantity, "IIIIIIIIIIIIIIIIIII");

  useEffect(() => {
    fetchTarrif();
    fetchStock();
  }, [isFocused]);

  const validate = ()=>{
    if (Object.keys(checkedItems).length === 0 ) {
      setInputError("Choose at least one")
      showToast("Choose at least one")
    }
    else{
      handleRequestStock();
      setVisible(false);
    }
  }

  return (
    <ScrollView className="pt-10 px-2 h-full bg-white pb-24  relative ">
      <View className=" relative py-4 items-end  justify-center  px-4">
        <View>
          <NotificationBell />
        </View>
      </View>
      <View className=" items-center">
        <Text
          className="text-[#000000] text-base"
          style={{
            fontFamily: "poppins_semibold",
          }}
        >
          Stock Details
        </Text>
      </View>
      <TouchableOpacity onPress={() => setVisible(true)} className="bg-[#08C25E] w-[120px] p-2 mt-4 items-center  self-end rounded-md mr-6 " 
      style={{
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
      }}
      >
          <Text
            className="text-[#fff]"
            style={{
              fontFamily: "poppins_medium",
            }}
          >
            Request More
          </Text>
      </TouchableOpacity>
      <View className="mb-5 pb-10">
        <FlatList
          data={stock}
          numColumns={1}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <StockCard
              name={item?.productId?.Type}
              price={tarrifs * item?.productId?.Kilograms}
              quantity={item?.productId?.Kilograms}
              full={item.Full}
              empty={item.Empty}
            />
          )}
        />
      </View>
      <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setVisible(false)}
        slide
      >
        <View className="bg-white border border-gray-300 flex-1 w-[90%] mx-auto mb-30 rounded p-3">
          <View className="justify-center items-center my-4">
            <Text
              className=" "
              style={{
                fontFamily: "poppins_semibold",
              }}
            >
              Request New Stock
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setVisible(!isVisible);
            }}
            className="items-right justify-end w-full absolute top-2 right-1"
          >
            <View className="text-right m-1 items-end p-2">
              <AntDesign name="closecircleo" size={24} color="red" />
            </View>
          </TouchableOpacity>

          <View className="flex justify-between">
            <Text
              className="my-4"
              style={{
                fontFamily: "poppins_semibold",
              }}
            >
              Select what you want
            </Text>
           {InputError&& <Text className="my-4 text-red-500" style={{fontFamily: "poppins_semibold",}}>
             {InputError}
            </Text>}
          </View>
          <View>
            <FlatList
              data={stock}
              numColumns={1}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                // <StockCard
                // name={item?.productId?.Type}
                // price={tarrifs * item?.productId?.Kilograms}
                // quantity={item?.productId?.Kilograms}
                // full={item.Full}
                // empty={item.Empty}
                //  />

                <View className="flex flex-col space-y-5">
                  <View className="flex-row items-center justify-around mx-auto w-[80%] my-2">
                    <Text
                      className=""
                      style={{
                        fontFamily: "poppins_medium",
                      }}
                    >
                      {item?.productId?.Kilograms}kg cylinder
                    </Text>

                    <Checkbox
                      value={checkedItems[item._id]} // Use unique item ID as value
                      onValueChange={(newValue) =>
                        handleCheckChange(
                          item._id,
                          item.productId._id,
                          newValue
                        )
                      }
                      color={checkedItems[item._id] ? "#08C25E" : undefined} // Change color based on state
                      className="rounded-[3px] "
                    />
                    <StockTextfield
                      placeholder={"0"}
                      value={inputValue[item._id] || ""} // Use the corresponding value from state
                      onChangeText={(text) => {setInputError(""); handleTextChange(text, item._id)}} 
                      // Pass the itemId along with text change
                    />
                  </View>
                  {/* <View className="flex-row items-center justify-around mx-auto w-[80%] my-2">
              <Text
                className=""
                style={{
                  fontFamily: "poppins_medium",
                }}
              >
                38 kg cylinder
              </Text>

              <Checkbox
                value={isChecked_3}
                onValueChange={setChecked_3}
                color={isChecked_3 ? "#007AFF" : undefined}
                className="rounded-[3px]"
              />
              <StockTextfield />
            </View> */}
                </View>
              )}
            />
          </View>

          <TouchableOpacity
          className=" bg-[#08C25E] py-3 px-3 rounded-md mt-12 self-center "
              style={{
                elevation: 1,
              }}
            onPress={() => {
              validate();
              
            }}>
             <Text className="text-[#fff] text-[14px] ">Make Request </Text>
           
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default StockDetails;
