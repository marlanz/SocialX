import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const SignOutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <TouchableOpacity>
      <Feather name="log-out" size={24} color={"#E0245E"} />
    </TouchableOpacity>
  );
};

export default SignOutButton;
