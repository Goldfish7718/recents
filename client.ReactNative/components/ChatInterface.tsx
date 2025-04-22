import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  SafeAreaView,
  ToastAndroid,
  Alert,
  Linking,
} from "react-native";
import { Clipboard, SendHorizonal, Check, Trash2 } from "lucide-react-native";
import * as ClipboardAPI from "expo-clipboard";
import axios from "axios";
import styles from "./ChatStyles";

const LimelightMobile = () => {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");
  const [copyFeedback, setCopyFeedback] = useState<number | null>(null);
  const scrollRef = useRef<ScrollView>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await ClipboardAPI.setStringAsync(text);
    setCopyFeedback(index);

    // Show toast on Android
    if (Platform.OS === "android") {
      ToastAndroid.show("Copied to clipboard!", ToastAndroid.SHORT);
    }

    // Reset copy feedback after 2 seconds
    setTimeout(() => {
      setCopyFeedback(null);
    }, 2000);
  };

  const clearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to clear all conversations?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Clear",
          onPress: () => {
            setPrompts([]);
            setResponses([]);
          },
          style: "destructive",
        },
      ]
    );
  };

  const getLimelightResponse = async (currentPrompt: string) => {
    const updatedPrompts = [...prompts, currentPrompt];
    setPrompts(updatedPrompts);
    setPrompt("");
    try {
      const res = await axios.post(
        `https://f206-117-217-70-255.ngrok-free.app/news/limelight/`,
        {
          prompt: currentPrompt,
        }
      );

      console.log(res.data);
      setResponses((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error fetching Limelight response:", error);
      setResponses((prev) => [...prev, { error: true }]);
    }
  };

  const handleSuggestedPrompt = (text: string) => {
    setPrompt(text);
    getLimelightResponse(text);
  };

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [prompts, responses]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Recents</Text>
        {prompts.length > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={clearChat}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Trash2 size={20} color="#FFFFFF" />
          </Pressable>
        )}
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        enabled>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() =>
            scrollRef.current?.scrollToEnd({ animated: true })
          }>
          {prompts.length === 0 ? (
            <View style={styles.intro}>
              <View style={styles.logoContainer}>
                <Image
                  source={{
                    uri: "https://placehold.co/200x200/10b981/FFFFFF?text=LM&font=montserrat",
                  }}
                  style={styles.logo}
                />
                <View style={styles.logoGlow} />
              </View>

              <Text style={styles.title}>
                <Text style={styles.titleAccent}>Limelight</Text> AI
              </Text>

              <Text style={styles.subtitle}>
                Your intelligent news assistant
              </Text>

              {/* Grid Container */}
              <View style={styles.gridContainer}>
                {/* Row 1 */}
                <View style={styles.gridRow}>
                  <Pressable
                    style={[styles.gridCard, { backgroundColor: "#F59E0B" }]}
                    onPress={() =>
                      handleSuggestedPrompt("Who won the British Grand Prix?")
                    }>
                    <Text style={styles.gridCardIcon}>🏎️</Text>
                    <Text style={styles.gridCardText}>Sports News</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.gridCard, { backgroundColor: "#3B82F6" }]}
                    onPress={() =>
                      handleSuggestedPrompt("What's the weather in Mumbai?")
                    }>
                    <Text style={styles.gridCardIcon}>⛅</Text>
                    <Text style={styles.gridCardText}>Weather</Text>
                  </Pressable>
                </View>

                {/* Row 2 */}
                <View style={styles.gridRow}>
                  <Pressable
                    style={[styles.gridCard, { backgroundColor: "#10B981" }]}
                    onPress={() =>
                      handleSuggestedPrompt("Who won the Lok Sabha elections?")
                    }>
                    <Text style={styles.gridCardIcon}>🏛️</Text>
                    <Text style={styles.gridCardText}>Politics</Text>
                  </Pressable>

                  <Pressable
                    style={[styles.gridCard, { backgroundColor: "#8B5CF6" }]}
                    onPress={() =>
                      handleSuggestedPrompt("When is the G20 summit?")
                    }>
                    <Text style={styles.gridCardIcon}>🌐</Text>
                    <Text style={styles.gridCardText}>Global Events</Text>
                  </Pressable>
                </View>

                {/* Row 3 - Single centered card */}
                <View style={styles.gridRow}>
                  <Pressable
                    style={[
                      styles.gridCard,
                      styles.gridCardWide,
                      { backgroundColor: "#EC4899" },
                    ]}
                    onPress={() =>
                      handleSuggestedPrompt("What are today's top headlines?")
                    }>
                    <Text style={styles.gridCardIcon}>📰</Text>
                    <Text style={styles.gridCardText}>Top Headlines</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.watermark}>
                <Text style={styles.watermarkText}>
                  Ask anything about current events
                </Text>
              </View>
            </View>
          ) : (
            prompts.map((item, index) => (
              <View key={index}>
                <View style={styles.userBubble}>
                  <Text style={styles.messageText}>{item}</Text>
                  <Pressable
                    onPress={() => copyToClipboard(item, index)}
                    style={styles.iconBtn}>
                    {copyFeedback === index ? (
                      <Check size={16} color="#10b981" />
                    ) : (
                      <Clipboard size={16} color="#6b7280" />
                    )}
                  </Pressable>
                </View>

                {responses[index] ? (
                  responses[index].error ? (
                    <View style={styles.errorBubble}>
                      <Text style={styles.errorTitle}>
                        Error generating response
                      </Text>
                      <Text style={styles.errorText}>
                        Please try again later.
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.botBubble}>
                      {responses[index].image ? (
                        <View style={styles.imageWrapper}>
                          <Image
                            source={{
                              uri:
                                responses[index].image +
                                "?cachebust=" +
                                Date.now(),
                            }}
                            style={styles.image}
                            resizeMode="cover"
                            onLoad={() => console.log("✅ Image loaded")}
                            onError={(e) =>
                              console.log(
                                "❌ Image failed to load",
                                e.nativeEvent
                              )
                            }
                          />
                        </View>
                      ) : null}
                      <Text style={styles.messageText}>
                        {responses[index].response}
                      </Text>

                      {/* Sources Section */}
                      {responses[index].sourceNames &&
                        responses[index].sourceLinks &&
                        responses[index].sourceNames.length > 0 && (
                          <View style={styles.sourcesContainer}>
                            <Text style={styles.sourcesTitle}>Sources:</Text>
                            {responses[index].sourceNames.map(
                              (name: string, idx: number) => (
                                <Pressable
                                  key={idx}
                                  onPress={() =>
                                    Linking.openURL(
                                      responses[index].sourceLinks[idx]
                                    )
                                  }
                                  style={styles.sourceBox}>
                                  <Text style={styles.sourceName}>{name}</Text>
                                </Pressable>
                              )
                            )}
                          </View>
                        )}

                      <Pressable
                        onPress={() =>
                          copyToClipboard(
                            responses[index].response,
                            index + 100
                          )
                        }
                        style={styles.iconBtn}>
                        {copyFeedback === index + 100 ? (
                          <Check size={16} color="#10b981" />
                        ) : (
                          <Clipboard size={16} color="#6b7280" />
                        )}
                      </Pressable>
                    </View>
                  )
                ) : (
                  <View style={styles.loadingBubble}>
                    <Text style={styles.loadingText}>Loading response...</Text>
                  </View>
                )}
              </View>
            ))
          )}

          {/* Small padding at bottom to ensure last message is visible above input box */}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            value={prompt}
            onChangeText={setPrompt}
            onSubmitEditing={() =>
              prompt.trim() && getLimelightResponse(prompt)
            }
            placeholder="Chat with Limelight"
            style={styles.input}
            placeholderTextColor="#9ca3af"
          />
          <Pressable
            disabled={!prompt.trim()}
            onPress={() => getLimelightResponse(prompt)}
            style={[styles.sendBtn, !prompt.trim() && styles.sendBtnDisabled]}>
            <SendHorizonal
              size={20}
              color={prompt.trim() ? "#10b981" : "#9ca3af"}
            />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LimelightMobile;
