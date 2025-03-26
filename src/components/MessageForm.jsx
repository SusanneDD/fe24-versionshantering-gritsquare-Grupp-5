import { useState } from 'react';
import confetti from 'canvas-confetti';

const animals = [
  '🦄 Unicorn',
  '🦊 Fox',
  '🐼 Panda',
  '🐸 Frog',
  '🦁 Lion',
  '🐵 Monkey',
  '🐧 Penguin',
  '🐢 Turtle',
  '🐯 Tiger',
  '🦉 Owl',
];

function getRandomAlias() {
  const index = Math.floor(Math.random() * animals.length);
  return 'Anonymous ' + animals[index];
}

export default function MessageForm({ onSend }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const maxLength = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setStatus('⚠️ Message cannot be empty.');
      return;
    }

    const data = {
      text: message,
      createdAt: new Date().toISOString(),
      alias: getRandomAlias(),
      likes: 0,
    };

    try {
      setLoading(true);
      const response = await fetch(
        'https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages.json',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        setMessage('');
        setStatus('✅ Message sent successfully!');
        onSend(); // Refresh list

        // 🎊 Real konfetti boom
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          scalar: 1.2,
          colors: ['#00bbff', '#bb00ff', '#ffffff'],
        });
      } else {
        setStatus('❌ Failed to send message.');
      }
    } catch (error) {
      setStatus('🚫 Error sending message.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const textareaClass = `w-full p-2 border rounded resize-none h-28 transition ${
    message.length > maxLength ? 'border-red-500' : 'border-gray-400'
  } dark:bg-gray-800 dark:text-white`;

  const counterClass =
    message.length > maxLength ? 'text-red-500' : 'text-gray-600';

  return (
    <form onSubmit={handleSubmit} className="mb-4 space-y-2">
      <textarea
        className={textareaClass}
        maxLength={maxLength + 50}
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <div className="flex justify-between text-sm">
        <span className={counterClass}>
          {message.length}/{maxLength}
        </span>
        {loading && (
          <span className="text-blue-500 animate-pulse">Sending...</span>
        )}
      </div>

      <button
        type="submit"
        disabled={!message.trim() || loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        Send Message
      </button>

      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}
