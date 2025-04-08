import {
  View,
  Text,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { ArrowRight, Copy, SendHorizonal } from 'lucide-react-native';
import React, { useState } from 'react';
import ChatInterface, { ChatInterfaceProps } from '@/components/ChatInterface';
import axios from 'axios';
import data from '@/data/chat.json';

export interface LimelightResponse {
  response: string;
  sourceLinks: string[];
  sourceNames: string[];
  image: string;
  error: boolean;
}

const Home = () => {
  const [prompt, setPrompt] = useState('');

  const [prompts, setPrompts] = useState<string[]>([]);
  const [responses, setResponses] = useState<LimelightResponse[]>([]);

  const getLimelightResponse = async () => {
    try {
      console.log('hit');
      setPrompts((prev) => [...prev, prompt]);

      // const res = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/news/limelight`, {
      //   prompt,
      // });

      // console.log(res.data.finalResponse);
      setPrompt('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'} className="flex-1">
      <ScrollView contentContainerClassName="flex-grow justify-center items-center gap-8">
        {/* PARENT DIV FOR TITLE AND EXAMPLE PROMPTS */}
        <View className="h-screen flex justify-center items-center gap-8">
          {/* TITLE AND SUBTITLE */}
          {prompts.length < 1 ? (
            <>
              <View className="flex flex-col text-center justify-center items-center gap-4 mx-2">
                <View className="gap-2">
                  <Text className="underline md:text-6xl text-4xl decoration-yellow-400 decoration-8 text-[#242424] mt-6 font-extrabold">
                    Recents
                  </Text>
                  <Text className="text-sm text-neutral-700 text-center"> version 1.5.2</Text>
                </View>
                <Text className="text-neutral-600 text-lg md:text-2xl font-bold text-center">
                  Your daily news. Summarized with Generative-AI
                </Text>
              </View>

              {/* EXAMPLE PROMPTS */}
              <View className="flex gap-3">
                <View className="bg-red-200 p-4 rounded-md">
                  <Text className="text-sm text-neutral-700">Sports</Text>
                  <Text className="text-lg text-neutral-900">
                    When is IPL's next match? <ArrowRight />
                  </Text>
                </View>
                <View className="bg-blue-200 p-4 rounded-md">
                  <Text className="text-sm text-neutral-700">General</Text>
                  <Text className="text-lg text-neutral-900">
                    How's the weather in Mumbai? <ArrowRight />
                  </Text>
                </View>

                <View className="bg-green-200 p-4 rounded-md">
                  <Text className="text-sm text-neutral-700">Politics</Text>
                  <Text className="text-lg text-neutral-900">
                    What is Trump's tarrif war? <ArrowRight />
                  </Text>
                </View>
                <View className="bg-yellow-200 p-4 rounded-md">
                  <Text className="text-sm text-neutral-700">Global</Text>
                  <Text className="text-lg text-neutral-900">
                    What's the situation in Israel-Gaza war? <ArrowRight />
                  </Text>
                </View>
              </View>
            </>
          ) : (
            // <ChatInterface {...chatHistory} />
            <View className="flex-1">
              <View>
                {prompts.map((prompt, index) => (
                  <View style={styles.promptContainer} key={index}>
                    <Text style={styles.prompt}>{prompt}</Text>
                  </View>
                ))}

                {responses.map((response, index) => (
                  <View style={styles.responseContainer} key={index}>
                    <Text style={styles.response}>{response.response}</Text>

                    <Pressable style={styles.copyButton}>
                      <Copy color="gray" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* INPUT AND SEND */}
          <View className="flex bg-white p-4 w-full absolute bottom-0">
            <View className="fixed gap-2">
              <TextInput
                placeholder="Ask Anything"
                className="border-neutral-500 border-[1px] rounded-md p-3 focus:border-neutral-900 focus:border-[3px] focus:outline-none w-full placeholder:text-neutral-500"
                value={prompt}
                onChangeText={setPrompt}
              />
              <Pressable
                className="p-3 border-[1px] border-neutral-500 rounded-md flex flex-row justify-center items-center gap-2"
                onPress={getLimelightResponse}
              >
                <Text className="text-lg font-bold">Send</Text>
                <SendHorizonal color="black" />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  prompt: {
    fontSize: 24,
    fontWeight: 500,
  },
  promptContainer: {
    padding: 12,
  },
  response: {
    fontSize: 16,
    lineHeight: 24,
  },
  responseContainer: {
    padding: 12,
    backgroundColor: 'white',
  },
  copyButton: {
    marginTop: 8,
    padding: 12,
    alignSelf: 'flex-start',
  },
});

export default Home;
