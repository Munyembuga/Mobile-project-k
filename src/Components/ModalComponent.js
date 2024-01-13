import { View, Text,TouchableOpacity ,Image, TextInput, Modal } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';

const ModalComponent = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <Modal style={{height:100}} transparent={true}
    visible={props.visible} onRequestClose={()=> setIsModalVisible(false)} animationType="slide" 
     >
   <View className="bg-white border border-gray-300 flex-1 w-[90%] mx-auto my-40 rounded" style={{elevation:4}}>
   <TouchableOpacity onPress={()=>{setIsModalVisible(!isModalVisible)}} className="items-right justify-end w-full">
   <View className="text-right m-1 items-end p-2">
   <AntDesign name="closecircleo" size={24} color="black" />
   </View>
   </TouchableOpacity>
   <View className="content  w-[90%] mx-auto">
   <View className="flex-row justify-between my-2">
   <View className=" w-[45%]">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Name</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="">Kevin Ruzindana</Text>
   </View>
   <View className=" w-[45%]">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Location</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="">Muhanga Branch</Text>
   </View>
   </View>
   <View className="flex-row justify-between my-2">
   <View className=" w-[45%]">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Cart Quantity</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="text-lg">4</Text>
   </View>
   <View className="w-[45%]">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Phone Number</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="">078554321</Text>
   </View>
   </View>
   <View className="">
   <TouchableOpacity>
   <Text style={{fontFamily:"poppins"}} className="">Cart Details</Text>
   </TouchableOpacity>
   <View className="bg-green-200 w-[85%] mx-auto rounded p-2 space-y-1">
   <View className="flex-row justify-between">
   <Text className="w-[40%]" style={{fontFamily:"poppins_semibold"}}>Type</Text>
   <Text className="w-[35%]" style={{fontFamily:"poppins_semibold"}}>Price</Text>
   <Text className="w-[20%]" style={{fontFamily:"poppins_semibold"}}>Count</Text>
   </View>
   <View className="flex-row justify-between">
   <Text className="w-[40%]" style={{fontFamily:"poppins"}}>24 kg Cylinder</Text>
   <Text className="w-[35%]" style={{fontFamily:"poppins"}}>24,000</Text>
   <Text className="w-[20%]" style={{fontFamily:"poppins"}}>4</Text>
   </View>
   <View className="flex-row justify-between">
   <Text className="w-[40%]" style={{fontFamily:"poppins"}}>24 kg Cylinder</Text>
   <Text className="w-[35%]" style={{fontFamily:"poppins"}}>24,000</Text>
   <Text className="w-[20%]" style={{fontFamily:"poppins"}}>4</Text>
   </View>
   </View>
   </View>

   <View className="flex-row justify-between my-4">
   <View className=" w-[45%]">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Price</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="">60,000</Text>
   </View>
   <View className=" w-[45%] my-3">
   <Text style={{fontFamily:"poppins"}} className="text-xs">Payment Method</Text>
   <Text style={{fontFamily:"poppins_semibold"}} className="">Mobile Money</Text>
   </View>
   </View>
   </View>
   <TouchableOpacity onPress={()=>{}} className="items-center justify-center mx-auto px-3 py-2 my-3 rounded bg-primary">
   <Text style={{fontFamily:"poppins_semibold"}} className="text-white">Approve Order</Text>
   </TouchableOpacity>
   </View>
 
   
    </Modal>
  )
}

export default ModalComponent