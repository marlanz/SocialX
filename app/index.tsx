import { useClerk } from "@clerk/clerk-expo";
import React from "react";
import { Button, Text, View } from "react-native";

const HomeScreen = () => {
  const { signOut } = useClerk();
  return (
    <View>
      <Text>index</Text>
      <Button title="Sign out" onPress={() => signOut()}></Button>
    </View>
  );
};

export default HomeScreen;
