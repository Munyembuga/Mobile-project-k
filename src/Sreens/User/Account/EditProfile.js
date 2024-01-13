import {
    View,
    Text,
    Image,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ToastAndroid,
    Platform
  } from "react-native";
  import React, { useState, useEffect } from "react";
  import { Feather } from "@expo/vector-icons";
  import { useSelector, useDispatch } from "react-redux";
  import * as ImagePicker from "expo-image-picker";
  import axios from "axios";
  import { setAuthProfile, setAuthStatus } from "../../../Redux/authSlice";
  import { setItemAsync, getItemAsync } from "expo-secure-store";
  // import DateTimePicker from '@react-native-community/datetimepicker';
  import BackButton from "../../../Components/BackButton";
  
  const EditProfile = ({ route }) => {
    const item = route.params;
    const { authToken, authProfile } = useSelector((state) => state.auth);
    // console.log("token in edit ", authToken)
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState(item?.email);
    const [photo, setPhoto] = useState();
    const [content, setContent] = useState({});
    const [image, setImage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(null);
    const [name, setName] = useState(item.fullName);
    const [newProfile, setNewProfile] = useState();
    const [phone, setPhone] = useState(item?.phone);
    const [DOB, setDOB] = useState(item?.DOB);
    // Date configs
    const [profile, setProfile] = useState({});
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState("date")
    const [show, setShow] = useState(false)
    const [text, setText] = useState(false)
  
  
    function showToast(message) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    useEffect(() => {
      (async () => {
        const galleryStatus =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermissions(galleryStatus.status === "granted");
      })();
    }, []);
  
    const formData = new FormData();
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result);
        setImageUri(result.assets[0].uri)
  
        // uriLink = image.assets[0].uri;
        // console.log("uriLink:", uriLink);
  
        // formData.append("profilePicture", {
        //   uri: image.assets[0].uri,
        //   type: "image/jpg",
        //   name: new Date() + "picture",
        // });
        // setContent({
        //   uri: image.assets[0],
        //   type: "image/jpg/png",
        //   name: new Date() + "picture",
        // })
      }
  
      if (hasGalleryPermissions === false) {
        return <Text> No Access to internal storage</Text>;
      }
    };
    console.log("imag URI : ", imageUri)
  
    const handleUpdateProfile = async () => {
      // console.log("Image assets: ", image?.uri);
      formData.append("picture",{
        uri: image?.assets[0].uri,
        type: "image/jpg/png",
        name: new Date() + "_picture",
      })
      // formData.append("profilePicture",image.assets[0].uri)
      formData.append("fullName", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("DateOfBirth", DOB);
      console.log("content on press: ", content)
      // console.log("FormData:", formData._parts[0]);
      // console.log("uriLink", image.assets[0].uri);
  
      await axios({
        method: "PATCH",
        url: `https://grocery-9znl.onrender.com/api/v1/auth/users/updateProfile`,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        data: formData,
        
      })
        .then((response) => {
          console.log(response.data);
          dispatch(setAuthProfile(response.data));
          setNewProfile(response.data);
          setItemAsync("authProfile", JSON.stringify(response.data));
          // alert("profile updated successfully")
          console.log("newProfile:__ ", newProfile);
          showToast("Profile updated successfully");
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    };
  
    const getProfile = async () => {
      let userProfile = await getItemAsync("authProfile");
      setProfile(JSON.parse(userProfile));
    };
    useEffect(() => {
      getProfile();
    }, []);
  
    // console.log("Profile from Edit:", profile);
  
    return (
      <KeyboardAvoidingView
        className="flex-1 w-full h-full bg-white pt-2"
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      ><View className=" relative py-4 ">
      <BackButton />
     </View>
        <View className="items-center justify-center gap-1 my-2 ">
          {image ? (
            <Image
              source={{ uri: image?.assets[0].uri }}
              className="w-40 h-40 rounded-full bg-slate-200"
            />
          ) : (
            <Image
              source={{ uri: profile.profilePicture }}
              className="w-40 h-40 rounded-full bg-slate-200"
            />
          )}
          <TouchableOpacity
            className="bg-primary p-2 text-primary rounded-full absolute bottom-0 right-[35%]"
            onPress={() => {
              pickImage();
            }}
          >
            <Feather name="edit-2" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <View className=" border-gray-300 border-[.5px] my-3 w-[95%] self-start ml-2 mt-[-2]"></View>
  
        <View>
          <View className="flex flex-col  mx-10 my-4 border-gray-400 border px-2 rounded py-2 relative">
            <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 " style={{fontFamily:"poppins_semibold"}}>
              Name:
            </Text>
            <TextInput
              placeholder="Name"
              onChangeText={(text) => setName(text)}
              value={name}
              style={{fontFamily:"poppins"}}
            />
          </View>
          <View className="flex flex-col  mx-10 my-4 border-gray-400 border px-2 rounded py-2 relative">
            <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 " style={{fontFamily:"poppins_semibold"}}>
              Email:
            </Text>
            <TextInput
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              style={{fontFamily:"poppins"}}
            />
          </View>
  
          <View className="flex flex-col  mx-10  border-gray-400 border px-2 rounded py-2 relative my-4">
            <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 " style={{fontFamily:"poppins_semibold"}}>
              Phone Number:
            </Text>
            <TextInput
              placeholder="Phone Number"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              style={{fontFamily:"poppins"}}
            />
          </View>
          <View className="flex flex-col  mx-10 border-gray-400 border px-2 rounded py-2 relative my-4">
            <Text className="absolute text-gray-500 text-xs left-2 top-[-10px] bg-white px-1 " style={{fontFamily:"poppins_semibold"}}>
              Date Of Birth
            </Text>
            <TextInput
              placeholder="DOB"
              onChangeText={(text) => setDOB(text)}
              value={DOB}
              style={{fontFamily:"poppins"}}
            />
          </View>
        </View>
  
        <View className=" gap-3 flex-col my-3 items-center justify-center   self-center">
          <TouchableOpacity
            className=" bg-[#08C25E] rounded flex-col px-6  py-[6px] w-[80%]  items-center justify-center gap-2"
            onPress={handleUpdateProfile}
          >
            <Text className="text-white mb-2 font-bold text-center" style={{fontFamily:"poppins_semibold"}}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  };
  
  export default EditProfile;
  