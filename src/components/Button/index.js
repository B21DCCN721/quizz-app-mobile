import React from "react";
import { Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
/*
title chữ nằm trong button
onClick là fun xử lý xự kiện click vào button
sxButton để css cho button
sxText để css cho title
*/
function Button({ title, onClick, sxButton='', sxText='' }) {
    return (
        <TouchableOpacity className = {`p-4 rounded-10 border ${sxButton}`} onPress={onClick}>
            <Text className = {`text-center font-interRegular ${sxText}`}>{title}</Text>
        </TouchableOpacity>
    );
}
Button.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    sxButton: PropTypes.string,
    sxText: PropTypes.string,
}
export default Button;
