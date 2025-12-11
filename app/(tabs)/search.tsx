import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TRENDING = [
  { topic: "#ReactNative", tweets: "125K" },
  { topic: "#JavaScript", tweets: "98K" },
  { topic: "#Expo", tweets: "54K" },
  { topic: "#TypeScript", tweets: "76K" },
  { topic: "#MobileDev", tweets: "33K" },
  { topic: "#OpenAI", tweets: "210K" },
  { topic: "#Expo", tweets: "54K" },
  { topic: "#TypeScript", tweets: "76K" },
  { topic: "#MobileDev", tweets: "33K" },
  { topic: "#OpenAI", tweets: "210K" },
];

const SearchScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" size={20} color={"#657786"} />
          <TextInput
            placeholder="Search Twitter"
            className="flex-1 ml-3 text-base"
            placeholderTextColor={"#657786"}
          />
        </View>
      </View>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="p-4">
          <Text className="text-xl font-bold text-gray-900 mb-4">
            Trending for you
          </Text>
          {TRENDING.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="py-3 border-b border-gray-100"
            >
              <Text className="text-gray-500 text-sm">
                Trending in Technology
              </Text>
              <Text className="font-bold text-gray-900 text-lg">
                {item.topic}
              </Text>
              <Text className="text-gray-500 text-sm">{item.tweets}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
