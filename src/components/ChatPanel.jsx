import { useRef, useEffect } from 'react';
import PanelHeader from './PanelHeader.jsx';
import ChatBubble from './ChatBubble.jsx';
import InputBar from './InputBar.jsx';

export default function ChatPanel({
  headerName,
  headerSubtitle,
  avatarInitial,
  avatarBg,
  avatarTextColor,
  avatarMono,
  badge,
  messages,
  onSend,
  isLoading,
  placeholder,
  readOnly = false,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0, overflow: 'hidden' }}
    >
      <PanelHeader
        name={headerName}
        subtitle={headerSubtitle}
        avatarInitial={avatarInitial}
        avatarBg={avatarBg}
        avatarTextColor={avatarTextColor}
        avatarMono={avatarMono}
        badge={badge}
      />

      <div
        ref={scrollRef}
        className="chat-scroll flex-1 px-4 py-3"
        style={{ background: '#ffffff', overflowX: 'hidden' }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      {!readOnly && onSend && (
        <InputBar
          onSend={onSend}
          isLoading={isLoading}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex mb-2 bubble-enter">
      <div
        style={{
          background: '#ffffff',
          boxShadow: 'rgba(0,0,0,0.08) 0px 0px 0px 1px',
          borderRadius: '12px 12px 12px 0px',
          padding: '10px 14px',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#667781',
              animation: `bounce 1.2s ease-in-out ${i * 0.18}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
