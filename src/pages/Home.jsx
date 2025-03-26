import { useState } from 'react';
import MessageForm from '../components/MessageForm';
import MessageList from '../components/MessageList';
import Header from '../components/Header'; // 🌟 NY: Importera Header-komponenten

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* 🌟 NY: Snygg rubrik med animation */}
      <Header />

      {/* Formulär för nytt meddelande */}
      <MessageForm onSend={() => setRefresh(refresh + 1)} />

      {/* Lista med alla meddelanden */}
      <MessageList refresh={refresh} />
    </div>
  );
}

