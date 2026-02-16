'use client';

import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.reply);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold mb-6">AI Finance Assistant 💰</h1>

      <textarea
        className="border p-3 w-full max-w-xl mb-4"
        rows={4}
        placeholder="Ask a finance question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage} className="bg-blue-500 text-white px-6 py-2 rounded">
        {loading ? 'Thinking...' : 'Ask AI'}
      </button>

      {response && (
        <div className="mt-6 p-4 border w-full max-w-xl">
          <strong>AI Response:</strong>
          <p className="mt-2">{response}</p>
        </div>
      )}
    </div>
  );
}
