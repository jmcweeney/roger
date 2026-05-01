import { useState, useRef } from 'react';

export default function InputBar({ onSend, isLoading, placeholder }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  const canSend = value.trim().length > 0 && !isLoading;

  const handleSend = () => {
    if (!canSend) return;
    onSend(value);
    setValue('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        background: '#ffffff',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 8,
      }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Message'}
        disabled={isLoading}
        style={{
          flex: 1,
          height: 36,
          background: '#f0f2f5',
          border: 'none',
          outline: 'none',
          borderRadius: 999,
          padding: '0 14px',
          fontSize: 15,
          fontWeight: 400,
          fontFamily: 'Geist, Arial, sans-serif',
          color: '#171717',
          minWidth: 0,
        }}
      />
      <button
        onClick={handleSend}
        disabled={!canSend}
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: canSend ? '#25D366' : '#e9edef',
          border: 'none',
          cursor: canSend ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background 0.12s ease',
          outline: 'none',
        }}
      >
        <SendIcon color={canSend ? '#ffffff' : '#adb5bd'} />
      </button>
    </div>
  );
}

function SendIcon({ color }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      style={{ marginLeft: 2 }}
    >
      <path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
