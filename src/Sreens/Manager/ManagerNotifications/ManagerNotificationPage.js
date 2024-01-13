import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import InputText from '../../../Components/InputText'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../Components/BackButton'
import NotificationCard from '../../../Components/NotificationCard'
import { Ionicons } from '@expo/vector-icons'
import Menu from '../../../Components/Menu'
import NotificationBell from '../../../Components/NotificationBell'

const ManagerNotificatnPage = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView className="flex-1 w-full h-full bg-white pt-2">
    <View className=" relative py-4 items-end  justify-center px-4">
    <BackButton />
 
   </View>
    <View className=" relative py-4 items-center pr-6 justify-center">
     
    <Text style={{fontFamily:"poppins_semibold"}} className="text-[16px] text-blacky">Notifications</Text>

     </View>
<View className="w-[94%] mx-auto my-2">
<NotificationCard
icon="account"
/>
<NotificationCard
icon="gas-cylinder"
/>
<NotificationCard
icon="account"
/>
<NotificationCard
icon="gas-cylinder"
/>
</View>

   </SafeAreaView>
  )
}

export default ManagerNotificatnPage