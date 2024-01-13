import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Octicons, Feather } from '@expo/vector-icons'

const FAQ = (props) => {
    const [content, setContent] = useState(false)
  return (
    <View className="bg-white rounded  mx-auto my-2 w-[90%]">
    <Pressable onPress={()=>{setContent(!content)}}  className="flex-row space-x-5 justify-between pl-3 items-center rounded bg-red-30 z-10 border rounded-b-none  border-gray-200 bg-white" style={{elevetion:5}}>
    
    <View className="justify-center my-3  w-[80%] min-w-fit">
      <Text style={{ fontFamily: "poppins_semibold" }}>{props.question}</Text>
      
    </View>
    <TouchableOpacity onPress={()=>{setContent(!content)}} 
    className=" items-center justify-center rounded-l-none 
    rounded-b-none rounded-full w-10 h-10 ">
   {!content ? <Feather name="arrow-down" size={20} color="black"/> : <Feather name="arrow-up" size={20} color="black" /> }
  </TouchableOpacity>
  </Pressable>
  {content && <View className="rounded bg-green-100 p-2 border border-green-300 mt-[-5px] mx-auto shadow-inner w-full" style={{elevetion:5}}>
  <Text style={{ fontFamily: "poppins" }}>{props.answer}</Text>
  </View>}
    </View>
  )
}

export default FAQ