import { View, Text, TouchableOpacity, TextInput, Modal, Image,ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, {useState} from 'react'
import BackButton from '../../Components/BackButton'
import {  SimpleLineIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
 import CameraComponent from './TakeCamera';
 import { useBadgeStore } from '../../Redux/zustandStore';
 import axios from 'axios';
 import { useSelector } from "react-redux";
 import InputText from '../../Components/InputText';
 
const TakePicturePage = ({route, props}) => {
  const data = route.params.status
  const Order = route.params.orders
  const navigation = useNavigation()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const[showCamera,setShowCamera] = useState(false);
  const Imager = useBadgeStore((state)=>state.Image)
  const [count, setCount] = useState("")
  const {authToken } = useSelector((state) => state.auth);
  const [countError, setCountError]= useState("")
  const [imageError, setImageError] = useState("")
  const[Loading,setIsLoading] = useState(true)
  console.log("order here--=--=--," , Order._id)


  const formData = new FormData();

  const handleChangeOrderStatus = async () => {
    formData.append("Image", {
      uri: Imager,
      type: "image/jpg/png",
      name: new Date().getTime() + "_proof_picture.jpg",
    });
  
    formData.append("orderId", Order._id);
  
    const config = {
      method: "put",
      url: "https://sp-gas-api.onrender.com/api/v1/driver/order/complete",
      headers: { 
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      data: formData,
    };
  
    axios(config)
      .then((response) => {
        console.log("Response from change status----------------------------", response.data);
      })
      .catch((error) => {
        console.log("error changing status ", error.message);
      });
  };

  const completeOrder = async () => {
    setIsLoading(false)
    formData.append("orderId", Order._id);
    formData.append("Image", {
      name: new Date() + "_picture",
      uri: Imager,
      type: "image/jpeg",
    });

    try {

      const response = await axios.put(
        "https://sp-gas-api.onrender.com/api/v1/driver/order/complete",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log( "Order complete response",response.data);
      alert("order completed successfully");
      navigation.navigate("DeliverHome")
      setIsLoading(true)
      // navigation.navigate("TopTabDelivery", screen("TotalAmount"))
      navigation.navigate("TopTabDelivery")
    } catch (error) {
      console.log(error, "error to update");
    }
  };

  const validate=()=>{
    if(count.length == 0){
      setCountError("Required")
    }else if(!Imager){
      setImageError("Upload Image is required")
    }else{
      completeOrder()
    }

  }
  // console.log("Image From pic page: -------", Imager)
  return (
    <SafeAreaView className="h-full p-3 bg-white relative flex flex-col justify-evenly">
    <View className="absolute top-10"><BackButton/></View>

    <View className="mt-12 flex-col flex w-[90%] mx-auto"> 
    <CameraComponent
    visible={showCamera}
    close={false}
    onClose={()=>{setShowCamera(false)}}
    />
    <View className="my-3 mt-5 space-y-2">
     
    <View className="flex-row space-x-2 items-center w-full justify-between">
 
    <Text style={{fontFamily:"poppins_semibold"}} className="text-blacky w-[65%]">Number Of Empty Cylinders Received: </Text>
    
  <View className="w-[35%] p-2 rounded relative z-0">
  <InputText placeholder='0' 
  style={{fontFamily:"poppins"}}
  field="Count"
  className="px-2"
  value={count}
  onChangeText={(text)=>{setCountError("");setCount(text)}}
  Error={countError}
  />
  </View>
    </View>
    </View>
    </View>

    <View className="flex-col space-y-2 items-center my-3 mt-2 w-[90%] mx-auto ">
    {imageError && <Text className="text-red-500" style={{fontFamily:"poppins_semibold"}}>Image Required</Text>}
    <View className="w-full border border-gray-300 p-3 rounded flex items-center justify-center h-[50%] " style={{borderColor:imageError?"red":""}}>
    
    {Imager ? <Image source={{uri: Imager}} className="object-contain w-full h-full"/>: (<SimpleLineIcons name="picture" size={30} color="gray" style={{fontSize:150}} />)}

    </View>
 <TouchableOpacity onPress={()=>{setShowCamera(true)}}
     className="bg-blacky self-center w-[90%] mt-5 py-2 px-3 rounded flex-row items-center justify-center space-x-3">
     <SimpleLineIcons name="camera" size={20} color="white" style={{fontSize:20}} />
    <Text style={{fontFamily:"poppins_semibold"}} className="text-white">Take Conformation Picture </Text>
    </TouchableOpacity>
    </View>
    <View className="flex flex-row items-center justify-between w-[94%] mx-auto">
     

    <TouchableOpacity onPress={()=>{validate()}}
     className="bg-primary self-center w-[48%] mt-5 py-2 p-3 rounded flex-row items-center justify-center space-x-3">
    
      {Loading ? (<View className="flex-row items-center justify-center space-x-2 self-center" >
        <SimpleLineIcons name="check" size={20} color="white" style={{fontSize:16}} />
       <Text style={{fontFamily:"poppins_semibold"}} className="text-white text-sm">Complete Delivery </Text>

        </View>)
      :
      (
      <View>
        <ActivityIndicator size={20} color={"#ffffff"}/>
        </View>)}
       
    
    </TouchableOpacity>

    <TouchableOpacity  onPress={()=>{setIsModalVisible(true)}}
     className="bg-red-500 self-center w-[48%] mt-5 py-2 p-3 rounded flex-row items-center justify-center space-x-3">
     <SimpleLineIcons name="close" size={20} color="white" style={{fontSize:16}} />
    <Text style={{fontFamily:"poppins_semibold"}} className="text-white text-sm">Cancel Delivery </Text>
    </TouchableOpacity>
    </View>
    <Modal style={{height:100}} transparent={true}
   visible={isModalVisible} onRequestClose={()=> setIsModalVisible(false)} animationType="slide" 
    >
  <View className="bg-white border border-gray-300 flex-1 w-[90%] mx-auto my-60 rounded" style={{elevation:4}}>
  <TouchableOpacity onPress={()=>{setIsModalVisible(!isModalVisible)}} className="items-right justify-end w-full">
  <View className="text-right m-1 items-end p-2">
  <AntDesign name="closecircleo" size={24} color="red" />
  </View>
  </TouchableOpacity>
  <View className="content  w-[90%] mx-auto">
  <View className="flex-col justify-between ">

  <View className=" mx-auto my-1 w-[80%] space-y-5">
  <Text style={{fontFamily:"poppins_semibold"}}>Enter Reason for cancelling</Text>
  <View className="flex-row px-2  justify-between  mb-3 rounded items-center border border-gray-400 h-20" style={{}}>
          <TextInput
            placeholder="Ex: Nyarugenge"
            // onChangeText={props.onChangeText}
            // value={props.value}
            className="w-[75%] py-2 items-center "
            style={{fontFamily:"poppins"}}
            // onBlur={props.onBlur}
          />
          
        </View>
       
  </View>
 
  </View>

  </View>
  <TouchableOpacity onPress={()=>{}} className="items-center justify-center mx-auto px-3 py-2 my-3 rounded bg-red-500 flex-row space-x-3">
  <SimpleLineIcons name="close" size={20} color="white" style={{fontSize:16}} /> 
  <Text style={{fontFamily:"poppins_semibold"}} className="text-white">Confirm Cancel</Text>
  </TouchableOpacity>
  </View>
   </Modal>
    </SafeAreaView>
  )
}

export default TakePicturePage