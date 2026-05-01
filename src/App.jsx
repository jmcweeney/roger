import { useState, useCallback, useEffect } from 'react';
import ChatPanel from './components/ChatPanel.jsx';
import PhoneFrame from './components/PhoneFrame.jsx';

const fmt = (d) =>
  d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

const FRIENDS = {
  sarah: {
    name: 'Sarah',
    subtitle: 'romcoms · feel-good indie · British TV',
    avatarBg: '#e67e22',
    initial: 'S',
  },
  ara: {
    name: 'Ara',
    subtitle: 'sci-fi · action · Marvel · blockbusters',
    avatarBg: '#2563eb',
    initial: 'A',
  },
};

const INITIAL_JEFF_MESSAGES = [
  {
    id: 'init-1',
    role: 'roger',
    text: 'Hey — I\'m Roger.',
    timestamp: fmt(new Date()),
  },
  {
    id: 'init-2',
    role: 'roger',
    text: 'Tell me what you\'ve been watching, and I\'ll make sure the right people in your circle hear about it.',
    timestamp: fmt(new Date()),
  },
];

export default function App() {
  const [jeffMessages, setJeffMessages] = useState(INITIAL_JEFF_MESSAGES);
  const [friendConvos, setFriendConvos] = useState({ sarah: [], ara: [] });
  const [activeFriend, setActiveFriend] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(
    async (text) => {
      if (!text.trim() || isLoading) return;

      const userMsg = {
        id: `jeff-${Date.now()}`,
        role: 'user',
        text: text.trim(),
        timestamp: fmt(new Date()),
      };

      setJeffMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const history = jeffMessages
          .filter((m) => !m.id.startsWith('init-'))
          .map((m) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.text,
          }));

        const messages = [...history, { role: 'user', content: text.trim() }];

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        });

        if (!res.ok) throw new Error('API error');

        const data = await res.json();

        setJeffMessages((prev) => [
          ...prev,
          {
            id: `roger-${Date.now()}`,
            role: 'roger',
            text: data.jeffReply || 'Roger that.',
            timestamp: fmt(new Date()),
          },
        ]);

        if (data.nudgeFriend && data.nudgeMessage) {
          const nudgeMsg = {
            id: `nudge-${Date.now()}`,
            role: 'roger',
            text: data.nudgeMessage,
            timestamp: fmt(new Date()),
          };
          setActiveFriend(data.nudgeFriend);
          setFriendConvos((prev) => ({
            ...prev,
            [data.nudgeFriend]: [...prev[data.nudgeFriend], nudgeMsg],
          }));
        }
      } catch {
        // Errors never surface as Roger messages — fail silently
      } finally {
        setIsLoading(false);
      }
    },
    [jeffMessages, isLoading]
  );

  const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 1023px)') : null;
  const [isMobile, setIsMobile] = useState(() => mq?.matches ?? false);

  useEffect(() => {
    if (!mq) return;
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const friend = activeFriend ? FRIENDS[activeFriend] : null;
  const friendMessages = activeFriend ? friendConvos[activeFriend] : [];

  if (isMobile) {
    return (
      <div style={{ position: 'fixed', inset: 0, display: 'flex', flexDirection: 'column', background: '#ffffff', overflow: 'hidden', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <ChatPanel
          headerName="Roger"
          headerSubtitle="Quietly spreading good taste"
          avatarInitial="R"
          avatarBg="#171717"
          avatarTextColor="#fff"
          avatarMono
          messages={jeffMessages}
          onSend={sendMessage}
          isLoading={isLoading}
          placeholder="Seen anything good lately?"
        />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        fontFamily: 'Geist, Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 0,
        }}
      >
        {/* Left — Jeff */}
        <PhoneColumn label="You" labelColor="#4b5563">
          <PhoneFrame>
            <ChatPanel
              headerName="Roger"
              headerSubtitle="Quietly spreading good taste"
              avatarInitial="R"
              avatarBg="#171717"
              avatarTextColor="#fff"
              avatarMono
              messages={jeffMessages}
              onSend={sendMessage}
              isLoading={isLoading}
              placeholder="Seen anything good lately?"
            />
          </PhoneFrame>
        </PhoneColumn>

        {/* Connector */}
        <Connector active={!!activeFriend} friend={friend} />

        {/* Right — Nudged friend */}
        <PhoneColumn
          label={friend ? friend.name : 'Your Circle'}
          labelColor={friend ? friend.avatarBg : '#9ca3af'}
          labelInitial={friend?.initial}
          labelBg={friend?.avatarBg}
        >
          <PhoneFrame>
            {friend ? (
              <ChatPanel
                key={activeFriend}
                headerName="Roger"
                headerSubtitle={`nudging ${friend.name}`}
                avatarInitial="R"
                avatarBg="#171717"
                avatarTextColor="#fff"
                avatarMono
                badge={friend}
                messages={friendMessages}
                onSend={null}
                isLoading={false}
                readOnly
              />
            ) : (
              <CirclePlaceholder />
            )}
          </PhoneFrame>
        </PhoneColumn>
      </div>
    </div>
  );
}

function PhoneColumn({ label, labelColor, labelInitial, labelBg, labelSize = 15, children }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
      }}
    >
      {/* Label above phone */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          height: 28,
        }}
      >
        {labelBg && (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: labelBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {labelInitial}
          </div>
        )}
        <span
          style={{
            fontSize: labelSize,
            fontWeight: 500,
            color: labelColor,
            letterSpacing: '-0.2px',
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function Connector({ active, friend }) {
  return (
    <div
      style={{
        width: 64,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingTop: 42, // clear the label row
        alignSelf: 'center',
      }}
    >
      <svg
        width="24"
        height="16"
        viewBox="0 0 24 16"
        fill="none"
        style={{ transition: 'opacity 0.3s' }}
      >
        <path
          d="M0 8h20M14 2l6 6-6 6"
          stroke={active ? '#25D366' : '#9ca3af'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {active && friend && (
        <div
          style={{
            background: '#DCF8C6',
            color: '#128C7E',
            borderRadius: 9999,
            padding: '2px 8px',
            fontSize: 10,
            fontWeight: 500,
            fontFamily: 'Geist, Arial, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {friend.name}
        </div>
      )}
    </div>
  );
}

function CirclePlaceholder() {
  return (
    <div
      className="chat-scroll flex-1 px-4 py-3"
      style={{
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <MiniPerson initial="S" name="Sarah" bg="#e67e22" />
        <MiniPerson initial="A" name="Ara" bg="#2563eb" />
      </div>
      <p
        style={{
          color: '#667781',
          fontSize: 15,
          fontFamily: 'Geist, Arial, sans-serif',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Tell Roger what you watched.
        <br />
        He'll find the right person to tell.
      </p>
    </div>
  );
}

function MiniPerson({ initial, name, bg }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 7,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'Geist Mono, monospace',
          fontSize: 15,
          fontWeight: 600,
          boxShadow: 'rgba(0,0,0,0.08) 0px 0px 0px 1px',
        }}
      >
        {initial}
      </div>
      <span
        style={{
          fontSize: 12,
          fontWeight: 500,
          color: '#4b5563',
          fontFamily: 'Geist, Arial, sans-serif',
        }}
      >
        {name}
      </span>
    </div>
  );
}
