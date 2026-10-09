import { router } from 'expo-router';
import { ArrowLeftIcon } from 'phosphor-react-native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChatMessage } from '@/src/@types/chat';
import ChatBubble from '@/src/components/chat/ChatBubble';
import ChatInput from '@/src/components/chat/ChatInput';
import IconButton from '@/src/components/ui/IconButton';
import { api, post } from '@/src/services/api';
import { colors, spacing, typography } from '@/src/theme';

const GREETING: ChatMessage = {
  id: 'greeting',
  role: 'assistant',
  text: 'Oi! Eu sou o assistente do PetFacil. Posso ajudar com produtos, pedidos, pets e agendamentos. Como posso ajudar?',
};

const TYPING: ChatMessage = { id: 'typing', role: 'assistant', text: 'Digitando...' };

interface SendResponse {
  userMessage: ChatMessage;
  reply: ChatMessage;
}

export default function ChatScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    api<ChatMessage[]>('/api/chat/messages')
      .then(setMessages)
      .catch((error: unknown) => console.warn('[chat] falha ao carregar o histórico:', error));
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;

    const temp: ChatMessage = { id: `tmp-${Date.now()}`, role: 'user', text };
    setMessages((prev) => [...prev, temp]);
    setInput('');
    setSending(true);

    try {
      const response = await post<SendResponse>('/api/chat/messages', { text });
      setMessages((prev) => [
        ...prev.filter((message) => message.id !== temp.id),
        response.userMessage,
        response.reply,
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          text: error instanceof Error ? error.message : 'Não consegui responder agora.',
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const data = [GREETING, ...messages, ...(sending ? [TYPING] : [])];

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
          data={data}
          keyExtractor={(item) => item.id}
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
