import {LinearGradient} from "expo-linear-gradient"
import React from "react"
import { Animated, StyleSheet, View } from "react-native"

const Skeleton = (width, height, style) => {
  return (
    <View style={StyleSheet.flatten([{width: width, height:height, backgroundColor:"rgba(0,0,0.15)"}, style])}>

<Animated.View style={{width:"100%", height:"100%"}}>
<LinearGradient colors={["transparent",'#f5f6fa', 'transparent']} startPoint={{x: 0,y:1}}
/>
</Animated.View>
    </View>
  )
}

export default Skeleton

const styles = StyleSheet.create({})