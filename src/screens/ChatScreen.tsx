import { router } from 'expo-router';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ChatBubble from '@/src/components/chat/ChatBubble';
import ChatInput from '@/src/components/chat/ChatInput';
import IconButton from '@/src/components/ui/IconButton';
import { ChatMessage, sendMessageToAssistant } from '@/src/services/gemini';
import { colors, spacing, typography } from '@/src/theme';

const GREETING: ChatMessage = {
  role: 'model',
  text: 'Oi! Eu sou o assistente do PetFacil. Posso ajudar com produtos, pedidos, pets e agendamentos. Como posso ajudar?',
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const history = messages;
    const userMessage: ChatMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setSending(true);

    const response = await sendMessageToAssistant(history, text);
    setMessages((prev) => [...prev, { role: 'model', text: response }]);
    setSending(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <IconButton
            icon={<ArrowLeftIcon size={18} color={colors.textPrimary} weight="regular" />}
            onPress={() => router.back()}
            accessibilityLabel="Voltar"
          />
          <Text style={styles.title}>Assistente PetFacil</Text>
          <View style={styles.headerSpacer} />
        </View>

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ChatBubble message={item} />}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <ChatInput value={input} onChangeText={setInput} onSend={handleSend} disabled={sending} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  headerSpacer: {
    width: 38,
  },
  title: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
  listContent: {
    padding: spacing.lg,
  },
});
