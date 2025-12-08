import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import "../global.css";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/" as any} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
