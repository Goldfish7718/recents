import { View, Text, ScrollView, FlatList, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Copy } from 'lucide-react-native';

export interface ChatInterfaceProps {
  prompt: string;
  response: LimelightResponse;
}

export interface LimelightResponse {
  response: string;
  sourceLinks: string[];
  sourceNames: string[];
  image: string;
  error: boolean;
}

const ChatInterface = (props: ChatInterfaceProps[]) => {
  return (
    <View className="flex-1">
      <FlatList
        data={props}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={index == props.length - 1 ? { paddingBottom: 120 } : null}>
            <View style={styles.promptContainer}>
              <Text style={styles.prompt}>{item.prompt}</Text>
            </View>

            <View style={styles.responseContainer}>
              <Text style={styles.response}>{item.response.response}</Text>

              <Pressable style={styles.copyButton}>
                <Copy color="gray" />
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
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

export default ChatInterface;
