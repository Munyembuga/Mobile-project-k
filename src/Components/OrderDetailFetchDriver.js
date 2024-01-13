import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const DropDownComponentDriver = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken, authProfile } =useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [elements, setElements] = useState([]);
  let tok ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcwOTYxMDNjMjBjMjU4MmYyYTM0ZWEiLCJpYXQiOjE3MDMxNzgwMjIsImV4cCI6MTcwMzE4NTIyMn0.oslTVHLyLgko5MWZgpq7MIwNG4NaKNeuR4H-iRat15g"

let dataArray = []


  const fetchDriver = async () => {
    setIsLoading(true);

    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/users`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(response,"order DETAILS")
        setProduct(response?.data);
        setIsLoading(false);
        
        const drivers = response?.data?.data.filter(
          (user) => user.Role === "Driver"
        );
  
        const dataArray = drivers.map((driver) => ({
          value: driver._id,
          label: driver.FullNames,
        }));
  
        setElements(dataArray);
      })
      .catch((error) => {
        console.log("error fetching order details -order detail driver:",error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchDriver()
      // fetchDriver()
    }, [])
  );

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'rgb(8 194 94)' }]}>
          Driver
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container} className="bg-white">
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'rgb(8 194 94)' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={elements}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? props.value? props.value: 'Select Driver' : '...'}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={props.onChange}
   
      />
      <Text>{props.value}</Text>

    </View>
  );
};

export default DropDownComponentDriver;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'rgb(156 163 175)',
    borderWidth: 0.5,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});