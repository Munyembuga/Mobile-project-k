import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';


const DropDownComponent = (props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { authToken, authProfile } =useSelector((state) => state.auth);
  const [product, setProduct] = useState([]);
  const [elements, setElements] = useState([]);

let dataArray = []
  const fetchProduct = async () => {
    setIsLoading(true);

    axios({
      method: "GET",
      url: `https://sp-gas-api.onrender.com/api/v1/product`,
    })
      .then((response) => {
        setProduct(response?.data.data);
        setIsLoading(false);
        
        for (var i =0; i< response?.data.data.length; i++){
            dataArray.push({
                value: response?.data?.data[i]._id,
                label: response?.data?.data[i].Type,
            })
            setElements(dataArray)
         }
      })
      .catch((error) => {
        console.log("error fetching products - drop component:",error);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProduct()
    }, [])
  );
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'rgb(8 194 94)' }]}>
          Products
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container} className="bg-gray-400">
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'rgb(8 194 94)' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={props.elements}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Product' : '...'}
        searchPlaceholder="Search..."
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={props.onChange}
   
      />

    </View>
  );
};

export default DropDownComponent;

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