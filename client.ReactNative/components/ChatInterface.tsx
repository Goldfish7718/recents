import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Clipboard, SendHorizonal } from "lucide-react-native";
import * as ClipboardAPI from "expo-clipboard";
import axios from "axios";

const LimelightMobile = () => {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [responses, setResponses] = useState<any[]>([]);
  const [prompt, setPrompt] = useState("");
  const scrollRef = useRef<ScrollView>(null);

  const copyToClipboard = async (text: string) => {
    await ClipboardAPI.setStringAsync(text);
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}>
      <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
        {prompts.length === 0 ? (
          <View style={styles.intro}>
            <Text style={styles.title}>
              Introducing <Text style={styles.titleAccent}>Limelight AI</Text>{" "}
              <Text style={styles.version}>v1.5.2</Text>
            </Text>
            <Text style={styles.subtitle}>
              Your personalized news assistant.
            </Text>

            <View style={styles.grid}>
              {[
                "Who won the British Grand Prix?",
                "What's the weather in Mumbai?",
                "Who won the Lok Sabha elections?",
                "When is the G20 summit?",
              ].map((text, i) => (
                <Pressable
                  key={i}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
                  ]}
                  onPress={() => handleSuggestedPrompt(text)}>
                  <Text style={styles.cardText}>{text}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          prompts.map((item, index) => (
            <View key={index}>
              <View style={styles.userBubble}>
                <Text style={styles.messageText}>{item}</Text>
                <Pressable
                  onPress={() => copyToClipboard(item)}
                  style={styles.iconBtn}>
                  <Clipboard size={16} color="#6b7280" />
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
                        />
                      </View>
                    ) : null}
                    <Text style={styles.messageText}>
                      {responses[index].response}
                    </Text>
                    <Pressable
                      onPress={() => copyToClipboard(responses[index].response)}
                      style={styles.iconBtn}>
                      <Clipboard size={16} color="#6b7280" />
                    </Pressable>
                  </View>
                )
              ) : null}
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={prompt}
          onChangeText={setPrompt}
          onSubmitEditing={() => getLimelightResponse(prompt)}
          placeholder="Ask Limelight anything..."
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        <Pressable
          disabled={!prompt}
          onPress={() => getLimelightResponse(prompt)}
          style={({ pressed }) => [
            styles.sendBtn,
            pressed && { opacity: 0.7 },
          ]}>
          <SendHorizonal size={20} color={prompt ? "#10b981" : "#9ca3af"} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: Platform.OS === "ios" ? 60 : 30, // enough for Dynamic Island / notch
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 140,
  },
  intro: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  titleAccent: {
    color: "#10b981",
    fontWeight: "700",
  },
  version: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    marginTop: 24,
  },
  card: {
    backgroundColor: "#f0fdf4",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#047857",
  },
  userBubble: {
    backgroundColor: "#e0f2fe",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-end",
    marginVertical: 6,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  botBubble: {
    backgroundColor: "#f3f4f6",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginVertical: 6,
    maxWidth: "90%",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  errorBubble: {
    backgroundColor: "#fef2f2",
    padding: 12,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginVertical: 6,
    maxWidth: "90%",
  },
  errorTitle: {
    fontWeight: "600",
    color: "#b91c1c",
    marginBottom: 4,
  },
  errorText: {
    color: "#991b1b",
  },
  imageWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 320,
    height: 180,
    borderRadius: 16,
    backgroundColor: "#e5e7eb",
  },
  messageText: {
    fontSize: 15,
    color: "#111827",
    lineHeight: 20,
  },
  iconBtn: {
    marginTop: 6,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 14,
    paddingBottom: Platform.OS === "ios" ? 28 : 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
    color: "#111827",
  },
  sendBtn: {
    backgroundColor: "#ecfdf5",
    padding: 10,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LimelightMobile;
