import { images } from "@/constants";
import { useSocialAuth } from "@/hooks/useSocialAuth";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { handleSocialAuth, loading } = useSocialAuth();

  return (
    <SafeAreaView className="flex-1 bg-white items-center px-8">
      <Image
        source={images.login_bg}
        resizeMode="contain"
        className="size-96"
      />
      <View className="flex-col gap-5 w-full">
        <TouchableOpacity
          className=" w-full bg-white border border-gray-300 rounded-full py-3 px-6"
          onPress={() => {
            handleSocialAuth("oauth_google");
          }}
          disabled={false}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#000"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={images.google}
                className="size-10 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">
                Continue with Google
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className=" w-full bg-white border border-gray-300 rounded-full py-3 px-6"
          onPress={() => {
            handleSocialAuth("oauth_apple");
          }}
          disabled={false}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={"#000"} />
          ) : (
            <View className="flex-row items-center justify-center">
              <Image
                source={images.apple}
                className="size-8 mr-3"
                resizeMode="contain"
              />
              <Text className="text-black font-medium text-base">
                Continue with Apple
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
