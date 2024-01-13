import { View, Text, Button, TouchableOpacity ,FlatList,Image, TextInput, Modal,ScrollView} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../Components/BackButton";
import Menu from "../../../Components/Menu";
import { Ionicons } from '@expo/vector-icons';
import DashboardCard from "../../../Components/DashboardCard";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import NotificationBell from "../../../Components/NotificationBell";
import axios from "axios";
import { useSelector } from "react-redux";
import { getItemAsync, deleteItemAsync } from "expo-secure-store";
import { setAuthLoaded,setAuthStatus, setAuthProfile, setAuthToken } from "../../../Redux/authSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useBadgeStore } from "../../../Redux/zustandStore";
import DashbordCardSkeleton from "../../../Components/DashbordCardSkeleton";
import moment from "moment";

const ManagerDashboard = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { authStatus, authLoaded, authRole, authProfile, authToken } = useSelector((state) => state.auth);

  const navigation = useNavigation()
  const [stock, setStock] = useState([]);
  const [stations, setStations] = useState([])
  const [tarrifs, setTarrifs] = useState([])
  const[newOrder,setNewOrder] = useState([])
  const [AllOrders, setAllOrders] = useState([])
  const station = authProfile?.StationId;
  const [isLoading,setIsLoading] = useState(true)
  const [showCartItems, setShowCartItems] = useState(false)
  const [showAddons, setShowAddons] = useState(false)

  const isFocused = useIsFocused();
  console.log(station,"Station iDDDDDDDDDD")
  const fetchStock = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/stock/station/${station}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        // console.log("Stock in mn. dash",response?.data);
     
        setStock(response?.data);
      })
      .catch((error) => {
        console.log(
          error.response,
          "error to fetch in man. dashboard"
        );
      });
  };
  const fetchNewOrder = async () => {
    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/order/by-station/${station}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log("New order $$$$$$$$$$$$$$$$$$$$$$$$",response?.data?.CartId);
        const order = response?.data?.filter(
          (orders) => orders?.Status === "Processing"
        );
        setNewOrder(order);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(
          error.response.data,
          "error to fetch"
        );
      });
  };
 
  useEffect(() => {
    fetchNewOrder()
    
      fetchStock()
   
  }, [isFocused]);
  const PlaceholderSkeleton = () => {
    const renderItem = ({ index }) => {
      return <DashbordCardSkeleton key={index} load={true} />;
    };
  
    return (
      
      <FlatList
        data={Array.from({ length: 6 })}
        numColumns={1}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    );
  };
  // console.log("_____-----order", newOrder)

  let Deliverying = AllOrders.filter(item => item.Status === "Processing");
  let completed = AllOrders.filter(item => item.Status === "Completed");
  let canceled = AllOrders.filter(item => item.Status === "Canceled");
  
  console.log("Orderssfgrg",newOrder[0]?.CartId?.UserId)
  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
      {/* <ScrollView className="h-full"> */}
    <View className=" relative py-4 items-end pr-6 justify-center ">
     <Menu />
     <View>
     <NotificationBell/>
     </View>
    </View>
    {/* {stock.map((item, index)=>(
      
        // index = item._id
        <View className="w-[70%] self-center space-y-2 mb-2" key={index}>
        <View className="flex-row">
        <Text className="text-sm" style={{fontFamily:'poppins_semibold'}}>Locatinn :</Text>
          <Text className="text-sm" style={{fontFamily:'poppins_medium'}}>{item?.stationId?.Location}</Text>
        </View>
        <View className="flex-row">
        <Text className="text-sm" style={{fontFamily:'poppins_semibold'}}>Branch name :</Text>
        </View>
         
        </View>

    ))

    } */}
   

    <View className="w-[92%] mx-auto flex-row flex-wrap justify-between">
    <View className="m-2   w-[45%] rounded p-3 border-[1px] border-blue-200" style={{elevation:0}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text- text-blacky">Total Orders</Text>
    <Text style={{fontFamily:"poppins_semibold"}} className="text- text-blue-500">{AllOrders.length}</Text>
    </View>

    <TouchableOpacity onPress={()=>{navigation.navigate("AllExternalOrders")}} className="m-2 bg-blacky   w-[45%] rounded p-3 border-[1px] border-white  flex items-center ">
    <Text style={{fontFamily:"poppins", color:"white", textAlign:"center"}}>All Extrenal Orders</Text>
    </TouchableOpacity>
    <View className="m-2  w-[29%] rounded p-2 border-[1px] border-green-200" style={{elevation:0}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Completed</Text>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs text-green-500">{completed.length}</Text>
    </View>
    <View className="m-2  w-[28%] rounded p-2 border-[1px] border-orange-200" style={{elevation:0}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">New</Text>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs text-yellow-500">{Deliverying.length}</Text>
    </View>
    <View className="m-2  w-[28%] rounded p-2 border-[1px] border-red-200" style={{elevation:0}}>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs">Canceled</Text>
    <Text style={{fontFamily:"poppins_semibold"}} className="text-xs text-red-500">{canceled.length}</Text>
    </View>
    </View>


    <Text style={{fontFamily:"poppins_bold"}} className="text-[16px] text-blacky w-[92%] mx-auto my-2">New Orders</Text>

    <View className="w-[94%] mx-auto my-4 mb-80">
    <View>
      {isLoading ?
      (<View className="">{PlaceholderSkeleton()}</View>) : (
    
    <FlatList
         data={newOrder}
                  numColumns={1}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <DashboardCard 
                    Id={item._id}
                    name={item?.CartId?.UserId?.FullNames}
                   telephone={item?.CartId?.UserId?.PhoneNumber}
                    status={item?.Status}
                    quantity="4s"
                    phoneNumber={item?.phoneNumber}
                    items={item?.phoneNumber}
                    method="Mobile Money"
                    Order={item}
                    location={item?.CartId.UserId.Location}
                    isPaid={item}
                    statusColor="rgb(8, 194, 94)"
                    date={moment(item.createdAt).format('MMM Do YYYY')}
                    time={moment(item.createdAt).format('h:mm:ss a') || "date"}
                    />
                  )}
                  />
   
                  )
                }
                </View>
                {newOrder?.length == 0 && (
      <View className="w-full h-[200px] flex flex-col items-center justify-center ">
    <Text style={{fontFamily:"poppins_semibold"}} className="text-base">No items Assigned</Text>
    </View>)}
 
    </View>
    
    {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default ManagerDashboard;