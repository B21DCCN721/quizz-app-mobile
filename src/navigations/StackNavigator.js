import React from "react";

import PublicStack from "./PublicStack";
import PrivateStack from "./PrivateStack";
import { useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
/*
main stack của app
*/
const Stack = createStackNavigator();


export default function StackNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated )

  return isAuthenticated ? <PrivateStack /> : <PublicStack />;
}
