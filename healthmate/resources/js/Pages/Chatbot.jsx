import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setError(null);
        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput('');

        try {
            const response = await axios.post('/api/chat/stream', {
                message: userMessage
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json',
                }
            });

            if (response.data.chunk) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: response.data.chunk
                }]);
            }
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.error || 'Failed to get response';
            setError(errorMessage);
            setMessages(prev => [...prev, {
                role: 'system',
                content: `Error: ${errorMessage}`
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <span className="block sm:inline">{error}</span>
                </div>
            )}

            <div className="bg-white rounded-lg shadow mb-4 p-4 h-96 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 p-3 rounded-lg ${
                            message.role === 'user'
                                ? 'bg-blue-100 ml-auto max-w-[80%]'
                                : message.role === 'system'
                                    ? 'bg-red-100 mx-auto max-w-[90%]'
                                    : 'bg-gray-100 mr-auto max-w-[80%]'
                        }`}
                    >
                        <p className="text-gray-800">{message.content}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Type your message..."
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    disabled={isLoading}
                >
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default Chatbot;
