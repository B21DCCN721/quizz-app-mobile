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

function Input({ value = '', placeholder = '', hide = false, edit = true, onChange, children }) {
  return (
    <View className='flex flex-row items-center bg-grayInput  border border-grayBorder rounded-10 px-4 h-[48px]'>
      <TextInput
        className="flex-1 placeholder:text-semibold placeholder:text-base"
        placeholder={placeholder}
        value={value}
        secureTextEntry={hide}
        editable={edit}
        onChangeText={(text) => onChange(text)}
      />
      {children}
    </View>
  );
}
Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  hide: PropTypes.bool,
  edit: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node,
}
export default Input;
