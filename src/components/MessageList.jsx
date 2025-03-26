import { useEffect, useState, useRef } from 'react';
import ReplyForm from './ReplyForm';
import anime from 'animejs';

export default function MessageList({ refresh }) {
  const [messages, setMessages] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editing, setEditing] = useState(null);
  const containerRef = useRef(null);
  const likeRefs = useRef({});

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch(
          'https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages.json'
        );
        const data = await res.json();
        if (data) {
          const sorted = Object.entries(data).map(([id, msg]) => ({
            id,
            replies: msg.replies || {},
            ...msg,
          }));
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setMessages(sorted);

          setTimeout(() => {
            if (containerRef.current) {
              anime({
                targets: containerRef.current.querySelectorAll('.message-box'),
                translateY: [30, 0],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                delay: anime.stagger(100),
              });
            }
          }, 100);
        }
      } catch (err) {
        console.error('Failed to fetch messages', err);
      }
    }
    fetchMessages();
  }, [refresh]);

  const handleLike = async (id, currentLikes) => {
    const newLikes = currentLikes + 1;
    try {
      await fetch(
        `https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages/${id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ likes: newLikes }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === id ? { ...msg, likes: newLikes } : msg
        )
      );

      anime({
        targets: likeRefs.current[id],
        scale: [1, 1.4, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .5)',
      });
    } catch (err) {
      console.error('Failed to update likes', err);
    }
  };

  const handleDeleteMessage = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this message?");
    if (!confirmed) return;

    try {
      await fetch(
        `https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages/${id}.json`,
        { method: 'DELETE' }
      );
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err) {
      console.error('Failed to delete message:', err);
    }
  };

  const handleReplySent = (id, reply) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              replies: { ...msg.replies, [reply.id]: reply },
            }
          : msg
      )
    );
    setReplyingTo(null);
  };

  const handleEditDone = (parentId, replyId, newText) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === parentId
          ? {
              ...msg,
              replies: {
                ...msg.replies,
                [replyId]: {
                  ...msg.replies[replyId],
                  text: newText,
                },
              },
            }
          : msg
      )
    );
    setEditing(null);
  };

  const handleDeleteReply = async (parentId, replyId) => {
    const url = `https://messageboard-21842-default-rtdb.europe-west1.firebasedatabase.app/messages/${parentId}/replies/${replyId}.json`;
    try {
      await fetch(url, { method: 'DELETE' });
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === parentId
            ? {
                ...msg,
                replies: Object.fromEntries(
                  Object.entries(msg.replies).filter(([id]) => id !== replyId)
                ),
              }
            : msg
        )
      );
    } catch (err) {
      console.error('Failed to delete reply:', err);
    }
  };

  return (
    <div className="space-y-3" ref={containerRef}>
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="message-box p-3 bg-gray-200 dark:bg-gray-700 rounded shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-white/70 to-blue-100 dark:from-gray-700 dark:to-gray-800 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-[-100%] w-full h-full bg-white/10 group-hover:animate-shine z-0"></div>
          <div className="relative z-10">
            <p className="mb-1">{msg.text}</p>

            <div className="text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center">
              <span>{msg.alias || 'Anonymous 🕵️‍♂️'}</span>
              <span>{new Date(msg.createdAt).toLocaleString()}</span>
            </div>

            <div className="mt-2 flex justify-between items-center">
              <div className="space-x-2">
                <button
                  ref={(el) => (likeRefs.current[msg.id] = el)}
                  onClick={() => handleLike(msg.id, msg.likes || 0)}
                  className="text-sm px-2 py-1 bg-pink-500 text-white rounded hover:bg-pink-600"
                >
                  ❤️ {msg.likes || 0}
                </button>
                <button
                  onClick={() =>
                    setReplyingTo(replyingTo === msg.id ? null : msg.id)
                  }
                  className="text-sm text-blue-600 hover:underline"
                >
                  💬 Reply
                </button>
              </div>
              <button
                onClick={() => handleDeleteMessage(msg.id)}
                className="text-sm text-red-600 hover:underline"
              >
                🗑 Delete
              </button>
            </div>

            {replyingTo === msg.id && (
              <ReplyForm parentId={msg.id} onReplySent={handleReplySent} />
            )}

            {/* Visar replies */}
            {msg.replies &&
              Object.entries(msg.replies).map(([rid, reply]) => (
                <div
                  key={rid}
                  className="ml-4 mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                >
                  {editing === rid ? (
                    <ReplyForm
                      parentId={msg.id}
                      editId={rid}
                      initialText={reply.text}
                      onEditDone={handleEditDone}
                    />
                  ) : (
                    <>
                      <p>{reply.text}</p>
                      <div className="text-xs text-gray-500 mt-1 flex justify-between">
                        <span>
                          {reply.alias || 'Anonymous'} ·{' '}
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                        <span className="space-x-2">
                          <button
                            onClick={() => setEditing(rid)}
                            className="text-blue-500 hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteReply(msg.id, rid)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
