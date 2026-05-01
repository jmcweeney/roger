export default function ChatBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <div
      className="flex mb-1 bubble-enter"
      style={{ justifyContent: isUser ? 'flex-end' : 'flex-start' }}
    >
      <div style={{ maxWidth: '75%' }}>
        <div
          style={{
            background: isUser ? '#DCF8C6' : '#ffffff',
            borderRadius: isUser ? '12px 12px 0px 12px' : '12px 12px 12px 0px',
            padding: '8px 12px',
            fontSize: 15,
            fontWeight: 400,
            color: '#171717',
            fontFamily: 'Geist, Arial, sans-serif',
            lineHeight: 1.45,
            ...(isUser
              ? {}
              : { boxShadow: 'rgba(0,0,0,0.08) 0px 0px 0px 1px' }),
          }}
        >
          {message.text}
        </div>
        <div
          style={{
            fontSize: 11,
            color: '#667781',
            textAlign: 'right',
            marginTop: 2,
            fontFamily: 'Geist, Arial, sans-serif',
            paddingRight: 2,
          }}
        >
          {message.timestamp}
        </div>
      </div>
    </div>
  );
}
