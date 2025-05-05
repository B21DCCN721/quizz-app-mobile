import React from "react";
import PublicStack from "./PublicStack";
import PrivateStack from "./PrivateStack";
import { useSelector } from "react-redux";

export default function StackNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated )

  return isAuthenticated ? <PrivateStack /> : <PublicStack />;
}
