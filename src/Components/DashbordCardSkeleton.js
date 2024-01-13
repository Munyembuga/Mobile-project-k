import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { Skeleton } from "moti/skeleton";

const DashbordCardSkeleton = (props) => {
    const SkeletonCommon = {
        colorMode: "light",
        transition: {
          type: "timing",
          duration: 1000,
        },
        backgroundColor: "#D4D4D4",
      };
  return (
    <View className="bg-[#D4D4D4] py-2 px-3 rounded flex-row justify-between my-1 relative">
      <Skeleton.Group show={props.load}>
  {/* <TouchableOpacity onPress={() => { navigation.navigate("DetailOrder", { "order_id": props?.Id }) }} style={{ backgroundColor: '#D4D4D4', padding: 10, borderRadius: 8, marginBottom: 10 }}> */}
    <View className="space-y-1 ">
        <View className="mb-1">
        <Skeleton {...SkeletonCommon} width={62} height={14}  />
        </View>
        <View>
        <Skeleton {...SkeletonCommon} width={62} height={19} />
        </View>
   
      
    </View>
    <View className="space-y-1 ">
        <View className="mb-1">
        <Skeleton {...SkeletonCommon} width={62} height={14}  />
        </View>
        <View>
        <Skeleton {...SkeletonCommon} width={62} height={19} />
        </View>
   
      
    </View>
    <View className="space-y-1 ">
        <View className="mb-1">
        <Skeleton {...SkeletonCommon} width={62} height={14}  />
        </View>
        <View>
        <Skeleton {...SkeletonCommon} width={62} height={19} />
        </View>
   
      
    </View>
    <View className="space-y-1 ">
        <View className="mb-1">
        <Skeleton {...SkeletonCommon} width={62} height={14}  />
        </View>
        <View>
        <Skeleton {...SkeletonCommon} width={62} height={19} />
        </View>
   
      
    </View>
  {/* </TouchableOpacity> */}
</Skeleton.Group>

    </View>
  )
}

export default DashbordCardSkeleton