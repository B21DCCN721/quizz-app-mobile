import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import PropTypes from "prop-types";

// cơ chế giống thẻ select option web
/*
label tương tự thẻ label nhận vào 1 String
items nhận vào 1 mảng obj gồm 2 key label, value
placeholder mô tả cho thẻ
value giá trị mặc định của thẻ
setValue cập nhật giá trị value
TRONG ĐÓ value và setValue LÀ VALUE VÀ SETTER CỦA USESTATEUSESTATE
*/

function Select({ label='', items, placeholder='', value, setValue, disabled=false }) {
  const [open, setOpen] = useState(false);
  return (
    <View className="my-5">
      <Text className="text-bold font-semibold my-2">{label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholder}
        disabled={disabled}
        listMode="SCROLLVIEW"
        style={{
          backgroundColor: "#F1F1F1",
          borderColor: "#DFDFDF",
          borderWidth: 1,
          paddingLeft: 16,
        }}
        placeholderStyle={{ fontFamily: "InterRegular", color: "#707070" }}
        dropDownContainerStyle={{
          borderColor: "#DFDFDF",
          borderWidth: 1,
          borderRadius: 8,
        }}
      />
    </View>
  );
}

Select.propTypes = {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    items: PropTypes.array,
    value: PropTypes.any,
    setValue: PropTypes.func,
    disabled: PropTypes.bool,
}

export default Select;
