// import React, { useState, useRef } from 'react';
// import { View, Button, Image, PermissionsAndroid, Platform } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import RNFS from 'react-native-fs';

// const PickCamer = () => {
//   const cameraRef = useRef(null);
//   const [capturedImage, setCapturedImage] = useState(null);

//   const takePicture = async () => {
//     if (cameraRef) {
//       try {
//         const options = { quality: 0.5, base64: true };
//         const data = await cameraRef.current.takePictureAsync(options);

//         if (Platform.OS === 'android') {
//           await requestStoragePermission();
//         }

//         saveImage(data.uri);
//       } catch (error) {
//         console.error('Failed to take picture: ', error);
//       }
//     }
//   };

//   const requestStoragePermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//           {
//             title: 'Storage Permission Required',
//             message: 'App needs access to your storage to save photos.',
//             buttonPositive: 'OK',
//           }
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Storage permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   const saveImage = async (imageUri) => {
//     try {
//       const newPath = `${RNFS.DocumentDirectoryPath}/captured_image.jpg`;

//       await RNFS.copyFile(imageUri, newPath);

//       setCapturedImage(newPath);
//     } catch (error) {
//       console.error('Failed to save image: ', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         {capturedImage && (
//           <Image
//             source={{ uri: capturedImage }}
//             style={{ flex: 1, resizeMode: 'contain' }}
//           />
//         )}
//       </View>
//       <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
//         <Button title="Take Picture" onPress={takePicture} />
//       </View>
//       <RNCamera
//         ref={cameraRef}
//         style={{ flex: 0 }}
//         type={RNCamera.Constants.Type.back}
//         captureAudio={false}
//       />
//     </View>
//   );
// };

// export default PickCamer;
