import { useState } from 'react';

const animals = ['🦄 Unicorn', '🦊 Fox', '🐼 Panda', '🐸 Frog', '🦁 Lion', '🐵 Monkey', '🐧 Penguin', '🐢 Turtle', '🐯 Tiger', '🦉 Owl'];
const getRandomAlias = () =>
  'Anonymous ' + animals[Math.floor(Math.random() * animals.length)];

export default function ReplyForm({ parentId, onReplySent, editId, initialText = '', onEditDone }) {
  const [text, setText] = useState(initialText);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    if (editId) {
      // ✏️ Redigerar ett befintligt svar
      try {
        await fetch(
          `https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages/${parentId}/replies/${editId}.json`,
          {
            method: 'PATCH',
            body: JSON.stringify({ text }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        onEditDone(parentId, editId, text);
        setStatus('✅ Reply updated!');
      } catch (err) {
        setStatus('❌ Failed to update reply');
      }
    } else {
      // 📝 Skickar ett nytt svar
      const replyData = {
        text,
        createdAt: new Date().toISOString(),
        alias: getRandomAlias(),
      };

      try {
        const res = await fetch(
          `https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages/${parentId}/replies.json`,
          {
            method: 'POST',
            body: JSON.stringify(replyData),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await res.json();
        if (data && data.name) {
          onReplySent(parentId, { ...replyData, id: data.name });
          setText('');
          setStatus('✅ Reply sent!');
        }
      } catch (err) {
        setStatus('❌ Failed to send reply');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-1">
      <textarea
        rows="2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply..."
        className="w-full p-2 border rounded text-sm dark:bg-gray-900 dark:text-white"
      />
      <div className="flex space-x-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
        >
          {editId ? 'Save' : 'Send Reply'}
        </button>
      </div>
      {status && <p className="text-xs text-gray-500 mt-1">{status}</p>}
    </form>
  );
}
