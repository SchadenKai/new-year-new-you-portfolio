"use client";

import React, { useState, useRef, useEffect } from 'react';
import { FaTerminal, FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa6';
import { useLayoutStore, SectionName } from '@/store/useLayoutStore';
import TextareaAutosize from 'react-textarea-autosize';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function HeroChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Identify yourself. How should I reconfigure this portfolio for you?" }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  const setLayout = useLayoutStore((state) => state.setLayout);

  const prompts = [
    { label: "Recruiter", text: "I'm a technical recruiter looking for a Senior Frontend Engineer." },
    { label: "Hiring Manager", text: "I'm an Engineering Manager interested in your system design skills." },
    { label: "Developer", text: "I'm a fellow developer. Show me your coolest side project." },
  ];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || status === 'loading') return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setStatus('loading');
    
    try {
        // Send last 10 messages context
        const historyContext = [...messages, { role: 'user', content: userMessage }].slice(-10);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: userMessage,
                history: historyContext
            }),
        });
        
        const data = await res.json();
        
        if (data.layout_order && Array.isArray(data.layout_order)) {
            setLayout(data.layout_order as SectionName[], data.highlight_ids || []);
            setMessages(prev => [...prev, { role: 'assistant', content: data.message || "Portfolio reconfigured." }]);
            setStatus('success');
            
            // Unveiling transition
            setTimeout(() => {
                const portfolio = document.getElementById('portfolio');
                if (portfolio) {
                    portfolio.scrollIntoView({ behavior: 'smooth' });
                }
            }, 1000);
        } else {
             console.error("Invalid API response", data);
             setStatus('error');
             setMessages(prev => [...prev, { role: 'assistant', content: "System malfunction. Default layout active." }]);
        }
    } catch (err) {
        console.error(err);
        setStatus('error');
        setMessages(prev => [...prev, { role: 'assistant', content: "Connection failed. Please reticulate splines." }]);
    }
  };

  const handlePromptClick = (text: string) => {
    setInput(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex flex-col justify-center max-w-4xl mx-auto font-mono">
      <div className="border-2 border-border bg-surface flex flex-col h-[600px] max-h-screen relative overflow-hidden group shadow-[8px_8px_0px_0px_var(--border-color)] rounded-lg">
        
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b-2 border-border bg-secondary z-10 text-black shrink-0">
          <div className="w-4 h-4 bg-background border-2 border-border rounded-full" />
          <div className="w-4 h-4 bg-background border-2 border-border rounded-full" />
          <div className="flex-1 text-center font-bold uppercase tracking-widest text-sm">
            System Interface // Context Layer
          </div>
          <FaTerminal className="text-xl" />
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-foreground scrollbar-track-transparent">
             {messages.map((msg, idx) => (
                 <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                    <div className={`w-10 h-10 border-2 border-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_var(--border-color)] ${msg.role === 'assistant' ? 'bg-secondary text-black' : 'bg-foreground text-background'}`}>
                        {msg.role === 'assistant' ? <FaRobot /> : <FaUser />}
                    </div>
                    <div className={`flex-1 max-w-[80%] border-2 border-border p-4 text-sm font-medium shadow-[4px_4px_0px_0px_var(--border-color)] ${msg.role === 'assistant' ? 'bg-background text-foreground' : 'bg-primary text-white'}`}>
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                </div>
             ))}
             {status === 'loading' && (
                 <div className="flex gap-4 animate-fade-in opacity-50">
                    <div className="w-10 h-10 bg-secondary border-2 border-border flex items-center justify-center shadow-[2px_2px_0px_0px_var(--border-color)]">
                        <FaRobot className="animate-pulse" />
                    </div>
                    <div className="border-2 border-border bg-background p-4 text-sm text-foreground shadow-[4px_4px_0px_0px_var(--border-color)]">
                        <span className="animate-pulse">Analyzing input credentials...</span>
                    </div>
                 </div>
             )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t-2 border-border bg-background shrink-0">
            <div className="relative flex items-end gap-2">
                <TextareaAutosize
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your role or intent..."
                    minRows={1}
                    maxRows={4}
                    className="flex-1 bg-background border-2 border-border text-foreground placeholder-muted-foreground focus:outline-none resize-none py-3 px-4 text-sm leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,0)] focus:shadow-[4px_4px_0px_0px_var(--border-color)] transition-all"
                    disabled={status === 'loading'}
                />
                <button 
                    onClick={() => handleSubmit()}
                    disabled={status === 'loading' || !input.trim()}
                    className="mb-1 h-[46px] w-[46px] flex items-center justify-center bg-foreground border-2 border-border text-background shadow-[4px_4px_0px_0px_var(--border-color)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_var(--border-color)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <FaPaperPlane className="text-sm" />
                </button>
            </div>

            {/* Prompts */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-4 scrollbar-hide pt-2">
                <span className="text-xs text-foreground font-bold uppercase py-1 mr-2 shrink-0 self-center">Quick Access:</span>
                {prompts.map((prompt) => (
                    <button
                        key={prompt.label}
                        onClick={() => handlePromptClick(prompt.text)}
                        className="group border-2 border-border bg-background px-3 py-1 text-xs text-left text-foreground font-bold hover:bg-accent hover:shadow-[3px_3px_0px_0px_var(--border-color)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 max-w-[200px]"
                        title={prompt.text}
                    >
                        <span>[{prompt.label}]</span>
                    </button>
                ))}
            </div>
            
            {/* Skip Button */}
            <div className="mt-2 flex justify-end">
                <button 
                    onClick={() => {
                        setLayout(['experience', 'projects', 'skills'], []);
                        setTimeout(() => {
                            const portfolio = document.getElementById('portfolio');
                            if (portfolio) {
                                portfolio.scrollIntoView({ behavior: 'smooth' });
                            }
                        }, 500);
                    }}
                    className="text-xs text-foreground font-bold hover:text-primary transition-colors flex items-center gap-1 border-b-2 border-transparent hover:border-border"
                >
                    Just browsing? Skip to Portfolio <span className="text-primary font-black">↓</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
