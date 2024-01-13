import { View, Text, Modal , TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'
import ModalComponent from './ModalComponent'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import DetailOrder from '../Sreens/Manager/ManagerOrders/DetailOrder';
import { Skeleton } from "moti/skeleton";
const DashboardCard = (props) => {
  const  navigation =useNavigation()
  const SkeletonCommon = {
    colorMode: "light",
    transition: {
      type: "timing",
      duration: 1000,
    },
    backgroundColor: "#D4D4D4",
  };
  // const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <Skeleton.Group show={props.load}>
    
    <TouchableOpacity onPress={()=> {navigation.navigate("DetailOrder", {"order_id":props?.Id, order:props.Order})}} className="border border-gray-300 py-2 px-3 rounded  my-2  relative">
   <View className="flex-row justify-detween  items-center ">
   <View className="space-y-2 w-[33%] ">
   <Skeleton  {...SkeletonCommon} width={62} height={14} >
       <Text className="text-xs " style={{fontFamily:"poppins"}}>Name</Text>
       </Skeleton>
       <Skeleton  {...SkeletonCommon}  width={62} height={19}>
       <Text className="text-sm text-blacky" style={{fontFamily:"poppins_semibold"}}>{props.name}</Text>
       </Skeleton>
       </View>
       <View className="space-y-1 w-[33%] ">
       <Skeleton  {...SkeletonCommon} width={60} height={14} >
       <Text className="text-xs" style={{fontFamily:"poppins"}}>Location</Text>
       </Skeleton>
       <Skeleton {...SkeletonCommon}width={62} height={19} >
       <Text className="text-xs text-blacky" style={{fontFamily:"poppins_semibold"}}>{props.location || "Kacyiru"}</Text>
       </Skeleton>
       </View>
      
       <View className="space-y-1 w-[30%] ">
       <Skeleton  {...SkeletonCommon} width={60} height={14} >
       <Text className="text-xs" style={{fontFamily:"poppins"}}>Telephone</Text>
       </Skeleton>
       <Skeleton  {...SkeletonCommon} width={62} height={19} >
       <Text className="text-xs text-blacky" style={{fontFamily:"poppins_semibold" }}>{props.telephone}</Text>
       </Skeleton>
       </View>
       
   </View>


   <View className="flex-row justify-between mt-2">

   <View className="space-y-1 w-[33%] ">
   <Skeleton  {...SkeletonCommon} width={60} height={14} >
   <Text className="text-xs" style={{fontFamily:"poppins"}}>Status</Text>
   </Skeleton>
   <Skeleton  {...SkeletonCommon} width={62} height={19} >
   <Text className="text-xs text-blacky" style={{fontFamily:"poppins_semibold" , color:props.statusColor}}>{props.status}</Text>
   </Skeleton>
   </View>

   <View className="space-y-1 w-[33%]  flex-col">
       <Skeleton  {...SkeletonCommon} width={60} height={14} >
       <Text className="text-xs" style={{fontFamily:"poppins"}}>Order Type:</Text>
       </Skeleton>
       <Skeleton  {...SkeletonCommon} width={62} height={19} >
       <Text className="text-xs text-blacky" style={{fontFamily:"poppins_semibold"}}>{props.orderType || "Delivery"}</Text>
       </Skeleton>
       </View> 
   <View className="w-[30%]  flex-col ">
       <Skeleton  {...SkeletonCommon} width={60} height={14} >
       <Text className="text-xs" style={{fontFamily:"poppins"}}>Paid:</Text>
       </Skeleton>
       <Skeleton  {...SkeletonCommon} width={62} height={19} >
       <Text className="text-xs text-blacky self-start text-start" style={{fontFamily:"poppins_semibold"}}>{props.isPaid?"Paid":"Not Paid"}</Text>
       </Skeleton>
       </View> 

       </View>
   <View>
   
   </View>

   <View className="flex-row my-1">
   <View className="flex-row mr-3">
<Text style={{fontFamily:"poppins"}} className="text-gray-400 text-xs">Date:</Text>
<Text style={{fontFamily:"poppins"}} className="text-gray-400 text-xs">{props.date}</Text>
</View>
<View className="flex-row">
<Text style={{fontFamily:"poppins"}} className="text-gray-400 text-xs">Time:</Text>
<Text style={{fontFamily:"poppins"}} className="text-gray-400 text-xs">{props.time}</Text>
</View>
   </View>

    </TouchableOpacity>
    </Skeleton.Group>
  )
}

export default DashboardCard