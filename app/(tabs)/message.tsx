import { CONVERSATIONS, ConversationType } from "@/data/conversations";
import { Feather } from "@expo/vector-icons";
import cn from "clsx";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const MessageScreen = () => {
  const insets = useSafeAreaInsets();

  const [searchText, setSearchText] = useState("");

  const [conversationList, setConversationList] = useState(CONVERSATIONS);

  const [selectedConversation, setSelectedConversation] =
    useState<ConversationType | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [newMessage, setNewMessage] = useState("");

  const deleteConversation = (id: number) => {
    Alert.alert(
      "Delete Conversation",
      "Are you sure to delete this conversation?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setConversationList((prev) =>
              prev.filter((conv) => conv.id !== id)
            );
          },
        },
      ]
    );
  };

  const openConversation = (conversation: ConversationType) => {
    setSelectedConversation(conversation);
    setIsChatOpen(true);
  };

  const closeChatModal = () => {
    setIsChatOpen(false);
    setSelectedConversation(null);
    setNewMessage("");
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      setConversationList((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage, time: "now" }
            : conv
        )
      );
      setNewMessage("");
      Alert.alert(
        "Message Sent!",
        `Your message has been sent to ${selectedConversation.user.name}`
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Messages</Text>
        <TouchableOpacity>
          <Feather name="edit" size={24} color={"#1DA1F2"} />
        </TouchableOpacity>
      </View>
      <View className="px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <Feather name="search" color={"#657786"} size={20} />
          <TextInput
            placeholder="Search for people and groups"
            className="flex-1 ml-3 text-base"
            placeholderTextColor={"#657786"}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
      >
        {conversationList.map((c, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center p-4 border-b border-gray-50 active:bg-gray-50"
            onPress={() => openConversation(c)}
            onLongPress={() => deleteConversation(c.id)}
          >
            <Image
              source={{ uri: c.user.avatar }}
              className="size-12 rounded-full mr-3"
            />

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center gap-1">
                  <Text className="font-semibold text-gray-900">
                    {c.user.name}
                  </Text>
                  {c.user.verified && (
                    <Feather
                      name="check-circle"
                      size={16}
                      color={"#1DA1F2"}
                      className="ml-1"
                    />
                  )}
                  <Text className="text-gray-500 text-sm ml-1">
                    {c.user.username}
                  </Text>
                  <Text className="text-gray-500 text-sm">{c.time}</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-500" numberOfLines={1}>
                {c.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View className="px-4 py-2 border-t border-gray-100 bg-gray-50">
        <Text className="text-xs text-gray-500 text-center">
          Tap to open + Long press to delete
        </Text>
      </View>
      <Modal
        visible={isChatOpen}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        {selectedConversation && (
          <SafeAreaView className="flex-1">
            {/* chat header */}
            <View className="flex-row items-center px-4 border-b py-3 border-gray-100">
              <TouchableOpacity className="mr-3" onPress={closeChatModal}>
                <Feather name="arrow-left" size={24} color={"#1da1f2"} />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedConversation.user.avatar }}
                className="size-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="font-semibold text-gray-900 mr-1">
                    {selectedConversation.user.name}
                  </Text>
                  {selectedConversation.user.verified && (
                    <Feather name="check-circle" size={16} color={"#1da1f2"} />
                  )}
                </View>
                <Text className="text-gray-500 text-sm">
                  @{selectedConversation.user.username}
                </Text>
              </View>
            </View>

            {/* message area */}
            <ScrollView className="flex-1 px-4 py-4">
              <View className="mb-4">
                <Text className="text-center text-gray-400 text-sm mb-4">
                  This is the begining of your conversation with{" "}
                  {selectedConversation.user.name}
                </Text>

                {selectedConversation.messages.map((m, index) => (
                  <View
                    key={m.id}
                    className={cn(
                      "flex-row mb-3",
                      m.fromUser ? "justify-end" : ""
                    )}
                  >
                    {!m.fromUser && (
                      <Image
                        source={{ uri: selectedConversation.user.avatar }}
                        className="size-8 rounded-full mr-2"
                      />
                    )}
                    <View
                      className={cn("flex-1", m.fromUser ? "items-end" : "")}
                    >
                      <View
                        className={`rounded-2xl px-4 py-3 max-w-xs ${m.fromUser ? "bg-blue-500" : "bg-gray-100"}`}
                      >
                        <Text
                          className={
                            m.fromUser ? "text-white" : "text-gray-900"
                          }
                        >
                          {m.text}
                        </Text>
                      </View>
                      <Text className="text-xs text-gray-400 mt-1">
                        {m.time}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
            {/* messgae input */}
            <View className="flex-row items-center px-4 py-3 border-t border-gray-100">
              <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3 mr-3">
                <TextInput
                  className="flex-1 text-base"
                  placeholder="Start a message..."
                  placeholderTextColor={"#657786"}
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline
                />
              </View>
              <TouchableOpacity
                className={cn(
                  "size-10 rounded-full items-center justify-center",
                  newMessage.trim() ? "bg-blue-500" : "bg-gray-300"
                )}
                disabled={!newMessage.trim()}
              >
                <Feather name="send" size={24} color={"white"} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
};

export default MessageScreen;
