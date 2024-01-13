import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import { useBadgeStore } from '../../Redux/zustandStore';
import BackButton from '../../Components/BackButton';


const CameraComponent = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [visible,setVisible]  = useState(false)
  // const addImage = useBadgeStore(state => state.addImage)
  const Imager = useBadgeStore((state)=>state.Image)
const setImage = useBadgeStore((state) => state.setImage)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    try {
      if (cameraRef) {
        const photo = await cameraRef.takePictureAsync();
        console.log(photo); // This will log the photo object to the console
        setCapturedPhoto(photo); // Store the captured photo for display
        setShowCamera(false); // Hide the camera display after taking the picture
        setImage(photo.uri)
        setVisible(false)
        {props.onClose}
      }
    } catch (error) {
      console.error('Error taking picture:', error);
    }
  };
  console.log("Imager------",Imager)

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View className="bg-red-100">
    
  
    <Modal
      visible={props.visible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setVisible(false)}
    >
      {showCamera && (
        <Camera
          style={styles.camera}
          type={Camera.Constants.Type.back}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
        <TouchableOpacity className="absolute top-3 rounded-full right-3 z-50 bg-red-600" onPress={props.onClose}><Text className="text-white p-1 px-2 rounded-full">Close</Text></TouchableOpacity>
            {/* Camera buttons or UI elements */}
            <TouchableOpacity onPress={takePicture} className="absolute bottom-5 right-[40%]">
              <View className=" justify-center items-center self-center   bg-white w-14 h-14 rounded-full ">
              <View className="self-center justify-center items-center bg-black  w-12 h-12 rounded-full "></View>
              </View>
              
            </TouchableOpacity>
       
        </Camera>
      ) }
    
    {capturedPhoto && <TouchableOpacity className="absolute top-[0px] rounded-full right-3 z-50 bg-red-600" onPress={props.onClose}><Text className="text-white p-1 px-2 rounded-full">Close</Text></TouchableOpacity>}

    </Modal>

   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    alignItems: 'center',
    width:"40%",
    height:'40%'
  },
  camera: {
    flex: 1,
  },
  capturedImage: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  captureButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    height: 60,
    width: 60,
    marginBottom: 20,
  },
});

export default CameraComponent;
