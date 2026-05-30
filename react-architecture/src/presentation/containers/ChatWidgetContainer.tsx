import React, { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '../../application/store/useChatStore';
import { SendMessageUseCase } from '../../application/useCases/SendMessageUseCase';
import { ApiChatRepository } from '../../infrastructure/repositories/ApiChatRepository';
import { ChatHeader } from '../components/chat/ChatHeader';
import { ChatBubble } from '../components/chat/ChatBubble';
import { ChatInput } from '../components/chat/ChatInput';
import { FloatingButton } from '../components/chat/FloatingButton';
import '../styles/chat.css';

const chatRepository = new ApiChatRepository();
const sendMessageUseCase = new SendMessageUseCase(chatRepository);

export const ChatWidgetContainer: React.FC = () => {
  const { isOpen, messages, isTyping, toggleChat, addMessage, setTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = useCallback(async (text: string) => {
    addMessage(text, 'user');
    setTyping(true);
    
    try {
      const response = await sendMessageUseCase.execute(text);
      addMessage(response, 'bot');
    } catch (error) {
      addMessage('Lo siento, ha ocurrido un error al conectarse con el servidor.', 'bot');
    } finally {
      setTyping(false);
    }
  }, [addMessage, setTyping]);

  return (
    <div className="chat-widget-root">
      {isOpen && (
        <div className="chat-window fade-in">
          <ChatHeader onClose={toggleChat} />
          
          <div className="chat-body">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            
            {isTyping && (
              <div className="chat-typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
        </div>
      )}
      
      <FloatingButton onClick={toggleChat} isOpen={isOpen} />
    </div>
  );
};
