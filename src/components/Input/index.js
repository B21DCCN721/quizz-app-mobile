import { TextInput, View } from "react-native";
import PropTypes from "prop-types";

/* 
value là giá trị thẻ input
placeholder tương tự placeholder của input web
hide nhận vào giá trị boolean để hiển thị hoặc ẩn text nhập trong ô input
edit cho phép nhập và chỉnh sửa input
onChange nhận vào 1 fun để lấy value của input
children thêm children cho thẻ input để thể input có thể bọc thêm element khác
*/

function Input({ value = '', placeholder = '', hide = false, edit = true, keyboardType = 'default', onChange, children }) {
  return (
    <View className='flex flex-row items-center bg-gray-input  border border-gray-border rounded-10 px-4 h-[48px]'>
      <TextInput
        className="flex-1 placeholder:text-semibold placeholder:text-base"
        placeholder={placeholder}
        value={value}
        secureTextEntry={hide}
        editable={edit}
        keyboardType={keyboardType}
        onChangeText={(text) => onChange(text)}
      />
      {children}
    </View>
  );
}
Input.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  hide: PropTypes.bool,
  edit: PropTypes.bool,
  keyboardType: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
}
export default Input;
