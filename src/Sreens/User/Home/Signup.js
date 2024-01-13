import { View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, {useState, useEffect} from 'react'
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phonePattern =/(0(7[2|3|8|9][0-9]))\d{5}/

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email').matches(emailPattern,"Please enter a valid email"),
  name: yup
    .string()
    .required('Name is required'),

    phone: yup
    .string()
    .required('Phone is required')
    .matches(phonePattern,"Please enter a valid phone number")
    .min(10, 'Phone to small')
    .max(10, 'Phone to long'),
    
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must contain at least 8 characters'),
});

const Signup = () => {

    const navigation = useNavigation()
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const [secureInput, setSecureInput] = useState(true)

    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const handleRegister = async (values) => {
      axios({
        method: "POST",
      url: `https://sp-gas-api.onrender.com/api/v1/users/register`,
      data: {
          FullNames:values.name,
          Email:values.email,
          Password:values.password,
          PhoneNumber: "" + values.phone,
        },
      })
        .then((response) => {
          console.log(response.data);
          // dispatch(setAuthProfile(response.data.data));
          // dispatch(setAuthToken(response.data.access_token));
          // dispatch(setAuthStatus(true));
          // setItemAsync("authToken", response.data.access_token);
          // setItemAsync("authProfile", JSON.stringify(response.data.data));
          setIsLoading(false);
          setTimeout(() => {
            navigation.navigate("LoginWithPhone")
          }, 1500);
          
          showToast("Successfully registered")
        })
        .catch((error) => {
          setIsLoading(false)
          showToast(error.message)
          console.log("error: ", error);
          showToast("Error Occured")
        });
    };
  return (
    <SafeAreaView className="bg-white h-[100vh]">
    <KeyboardAwareScrollView className=" h-full " 
    innerRef={ref => {
      this.scroll = ref
    }}
    >
    <Formik
    initialValues={{name:"", email:'' ,phone:"", password:""}}
    validateOnMount={true}
    
    onSubmit={values =>{
      console.log(values)
      handleRegister(values)
      setTimeout(() => {
        navigation.navigate("LoginWithPhone")
      }, 1500);
    }}

    validationSchema={signUpSchema}
  >
  {({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid }) => (
    
   
    <View className="h-[100vh] relative pt-10">
    <BackButton/>

    <Text className="text-black text-center my-4" style={{fontFamily:"poppins_semibold"}}>Sign Up To Continue</Text>

      <InputText 
      field="Full Name"
      required=""
      placeholder="Full Name"
      secured = ""
      borderColor={errors.name && touched.name ? `red` : "gray"}
      Error={errors.name && touched.name ? `${errors.name}` : ""}
      onChangeText={handleChange('name')}
      onBlur={handleBlur('name')}
      value={values.name}
      Icon="user"
      />
      <InputText 
      field="Email"
      required="true"
      placeholder="Email"
      borderColor={errors.email && touched.email ? `red` : "gray"}
      Error={errors.email && touched.email ? `${errors.email}` : ""}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      value={values.email}
      Icon="mail"
      />
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

      <Text className="w-[80%] mx-auto" style={{fontFamily:"poppins_semibold"}}>Already have an account <Text onPress={()=>{navigation.navigate("LoginWithPhone")}} className="text-primary">Log In</Text></Text>
      <TouchableOpacity disabled={!isValid} onPress={()=>{setIsLoading(true);handleSubmit()}} className="bg-primary w-[80%] mx-auto py-2 items-center rounded top-10" style={{backgroundColor: !isValid? "#6BDA9E": "rgb(8 194 94)"}}>
      {isLoading ? (
        <ActivityIndicator color={"#fff"} size={20} />
      ) : (
        <Text className="text-white " style={{fontFamily:"poppins_semibold"}}>Log In</Text>
      )}
      </TouchableOpacity>
      </View>
      
      )}
      </Formik>
      <Text></Text>
      </KeyboardAwareScrollView>
      </SafeAreaView>
  )
}

export default Signup