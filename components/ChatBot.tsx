import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { sendMessageToChef } from '../services/geminiService';
import { translations } from '../translations';

interface ChatBotProps {
  lang: Language;
}

const ChatBot: React.FC<ChatBotProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([{
      id: 'welcome-' + lang,
      role: 'model',
      text: t.chatWelcome,
      timestamp: new Date()
    }]);
  }, [lang, t.chatWelcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const responseText = await sendMessageToChef(input, lang, history);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: t.chatError,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-chef-600'
        } text-white`}
      >
        {isOpen ? <i className="fas fa-times text-xl"></i> : <i className="fas fa-comment-dots text-2xl"></i>}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-40 transition-all duration-300 transform origin-bottom-right flex flex-col ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-chef-600 p-4 text-white flex items-center shadow-md">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
             <i className="fas fa-robot"></i>
          </div>
          <div>
            <h3 className="font-bold">Chef Gemini</h3>
            <p className="text-xs text-chef-100">
               {(lang === 'zh-TW' || lang === 'zh-CN') ? '随时为您服务' : 'Always here to help'}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50 scrollbar-hide">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-chef-600 text-white rounded-tr-none'
                    : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-stone-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex space-x-1 items-center">
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.chatPlaceholder}
            className="flex-1 p-2 px-4 rounded-full border border-stone-200 bg-white text-stone-800 placeholder-stone-400 focus:border-chef-500 focus:outline-none focus:ring-1 focus:ring-chef-500 text-sm"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-chef-600 text-white flex items-center justify-center hover:bg-chef-700 disabled:opacity-50 transition-colors"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatBot;