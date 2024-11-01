import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m your HealthMate AI assistant. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { type: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        type: 'bot',
        content: getBotResponse(input),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const getBotResponse = (userInput) => {
    const responses = [
      'I understand your concern. Based on the symptoms you\'ve described, I recommend consulting with a healthcare provider for a proper evaluation.',
      'Here are some general wellness tips: stay hydrated, get regular exercise, and maintain a balanced diet.',
      'Would you like me to help you schedule an appointment with a healthcare provider?',
      'I can provide you with more information about maintaining a healthy lifestyle. What specific area interests you?',
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="max-w-2xl mx-auto my-auto mt-16">
      <div className="bg-white rounded-xl shadow-sm">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">HealthMate AI</h2>
              <p className="text-sm text-gray-600">Always here to help</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="h-[500px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <Message key={index} {...message} />
          ))}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <QuickAction
          title="Common Symptoms"
          description="Get information about various symptoms"
          onClick={() => {
            setInput('Tell me about common cold symptoms');
          }}
        />
        <QuickAction
          title="Wellness Tips"
          description="Receive daily health recommendations"
          onClick={() => {
            setInput('What are some daily wellness tips?');
          }}
        />
      </div>
    </div>
  );
}

function Message({ type, content }) {
  const isBot = type === 'bot';

  return (
    <div
      className={`flex items-start gap-3 ${
        isBot ? 'justify-start' : 'justify-end'
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Bot className="h-5 w-5 text-blue-600" />
        </div>
      )}
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isBot
            ? 'bg-gray-100 text-gray-900'
            : 'bg-blue-600 text-white ml-auto'
        }`}
      >
        {content}
      </div>
      {!isBot && (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-white" />
        </div>
      )}
    </div>
  );
}

function QuickAction({ title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-left"
    >
      <h3 className="font-medium text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}

export default Chatbot;
