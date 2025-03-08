import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

/*
checked nhận vào boolean kiểm tra trạng thái checkbox
onToggle nhận vào func xử lý sự kiện click vào checkbox
size độ lớn checkbox
color màu của checkbox
label mô tả cho checkbox
*/

const Checkbox = ({ checked, onToggle, size = 24, color = '#333', label = '' }) => {
  return (
    <TouchableOpacity onPress={onToggle} className = "flex flex-row items-center">
      <Icon name={checked ? 'check-box' : 'check-box-outline-blank'} size={size} color={color} />
      <Text className = "font-interRegular pl-2">{label}</Text>
    </TouchableOpacity>
  );
};
Checkbox.propTypes = {
    checked: PropTypes.bool.isRequired,
    onToggle: PropTypes.func,
    size: PropTypes.number,
    color: PropTypes.string,
    label: PropTypes.string,
}
export default Checkbox;
