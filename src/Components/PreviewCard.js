import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Skeleton } from "moti/skeleton";

const PreviewCard = (props) => {
  const SkeletonCommon = {
    colorMode: "light",
    transition: {
      type: "timing",
      duration: 1000,
    },
    backgroundColor: "#D4D4D4",
  };
  return (
    <Skeleton.Group show={props.load}>
      <TouchableOpacity
        onPress={props.onPress}
        className="p2 rounded bg-gray-00 w-40 py-2 border-[1px] border-gray-300 ring-2 shadow-xl m-2"
      >
        <View className="bg-gray-100 mx-2 rounded h-32 w-[90%] flex justify-center items-center">
          <Skeleton colorMode="light" width={144} {...SkeletonCommon}>
            <Image
              source={{ uri: props.ImageURL }}
              className="w-28 h-28 m-auto bg-white rounded"
              style={{ resizeMode: "contain" }}
            />
          </Skeleton>
        </View>
        <View>
          <View className="px-2 text-xs my-1" style={{ fontFamily: "poppins" }}>
            <Skeleton colorMode="light" {...SkeletonCommon}>
              <Text>{props.type}</Text>
            </Skeleton>
          </View>
          <View className="w-full justify-between items-center flex-row px-2 mt-1  ">
            <Skeleton colorMode="light" width={70} {...SkeletonCommon}>
              <Text
                style={{ fontFamily: "poppins_semibold" }}
                className=" text-xs"
              >
                {props.size}
              </Text>
            </Skeleton>
            <Skeleton colorMode="light" width={65} {...SkeletonCommon}>
              <Text
                className="text-gray-700 text-xs px-2  "
                style={{ fontFamily: "poppins_bold" }}
              >
                {props.price}
              </Text>
            </Skeleton>
          </View>
        </View>
        <View className="mt-1 ml-1">
        <Skeleton colorMode="light" width={150} {...SkeletonCommon}>
         
            <TouchableOpacity
              className="bg-primary justify-center items-center py-1 w-[90%] mx-auto rounded mt-1"
              onPress={props.carts}
            >
              <Text
                className="text-white"
                style={{ fontFamily: "poppins_semibold" }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
            </Skeleton>
         
        </View>
      </TouchableOpacity>
    </Skeleton.Group>
  );
};

export default PreviewCard;
