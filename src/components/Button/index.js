import React from "react";
import { Text, TouchableOpacity } from "react-native";

function Button({ title, onClick, sxButton='', sxText='' }) {
    return (
        <TouchableOpacity className = {`p-4 rounded-[10px] border ${sxButton}`} onPress={onClick}>
            <Text className = {`${sxText}`}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;
