import { View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import InputText from '../../../Components/InputText'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BackButton from '../../../Components/BackButton'
import * as yup from "yup"
import { Formik } from 'formik';
import axios from 'axios'
import { setAuthProfile, setAuthLoaded, setAuthRole, setAuthStatus, setAuthToken} from '../../../Redux/authSlice'
import { useDispatch, useSelector } from "react-redux";
import { setItemAsync, getItemAsync } from "expo-secure-store";
import PhoneInputText from '../../../Components/PhoneInputText'

const phonePattern =/(0(7[2|3|8|9][0-9]))\d{5}/
const loginSchema = yup.object().shape({
    phone: yup
    .string()
    .required('Phone is required')
    .matches(phonePattern,"Please enter a valid phone number")
    .min(10, 'Phone to small')
    .max(10, 'Phone to long')
    ,
    
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must contain at least 6 characters'),
});


const LoginWithPhone = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [secureInput, setSecureInput] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleLogin = async (values) => {
      axios({
        method: "POST",
        url: `https://sp-gas-api.onrender.com/api/v1/users/login`,
        data: {
          PhoneNumber:"" + values.phone,
          Password:values.password,
        },
      })
        .then((response) => {
          console.log("response data ",response.data);
          dispatch(setAuthProfile(response.data.data));
          dispatch(setAuthToken(response.data.access_token));
          dispatch(setAuthStatus(true));
          setItemAsync("authToken", response.data.access_token);
          setItemAsync("authProfile", JSON.stringify(response.data.data));
          setIsLoading(false);
          showToast("Welcome");
        })
        .catch((error) => {
          setIsLoading(false);
          if(error.message == "Request failed with status code 404"){
        showToast("User not found")
          }
          else if(error.message == "Request failed with status code 404"){
            showToast("Invalid credential")
          }
          console.log("error: ", error.message);
        });
    };
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <Formik
    initialValues={{phone:"", password:""}}
    validateOnMount={true}
     
    onSubmit={values =>{
      handleLogin(values)
    }}
    validationSchema={loginSchema}
  >
  {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
    <SafeAreaView className="bg-white">
   
    <View className="h-full bg-white relative pt-10">
    <BackButton/>

    <Text className="text-black text-center my-4" style={{fontFamily:"poppins_semibold"}}>Login To Continue</Text>
      <PhoneInputText
      field="Phone Number"
      required="true"
      placeholder="Phone Number"
      borderColor={errors.phone && touched.phone ? `red` : "gray"}
      Error={errors.phone && touched.phone ? `${errors.phone}` : ""}
      onChangeText={handleChange('phone')}
      onBlur={handleBlur('phone')}
      value={values.phone}
      Icon="phone"
      />
      <InputText 
      field="Password"
      required="true"
      placeholder="Password"
      secured = "true"
      Error= {errors.password && touched.password ? `${errors.password}` : ""}
      borderColor={errors.password && touched.password ? `red` : "gray"}
      onChangeText={handleChange('password')}
      onBlur={handleBlur('password')}
      value={values.password}
      secureInput = {secureInput}
      Icon ={secureInput? "eye": "eye-off"}
      handleSecure={()=>{setSecureInput(!secureInput);}}
      />

      <Text onPress={()=>{navigation.navigate("Login")}} className="w-[80%] mx-auto mb-2" style={{fontFamily:"poppins"}}>Login with Email instead </Text>
      <Text className="w-[80%] mx-auto" style={{fontFamily:"poppins_semibold"}}>Don't have an account <Text onPress={()=>{navigation.navigate("Signup")}} className="text-primary">Sign Up</Text></Text>

      <TouchableOpacity disabled={!isValid} onPress={()=>{setIsLoading(true);handleSubmit()}} className="bg-primary w-[80%] mx-auto py-2 items-center rounded top-10" style={{backgroundColor: !isValid? "#6BDA9E": "rgb(8 194 94)"}}>
    
      {isLoading ? (
        <ActivityIndicator color={"#fff"} size={20} />
      ) : (
        <Text className="text-white " style={{fontFamily:"poppins_semibold"}}>Log In</Text>
      )}
      </TouchableOpacity>
      </View>
      </SafeAreaView>
      )}
      </Formik>
      </KeyboardAvoidingView>
  )
}

export default LoginWithPhone