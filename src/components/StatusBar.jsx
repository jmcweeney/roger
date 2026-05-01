export default function StatusBar() {
  return (
    <div
      style={{
        height: 44,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: '#171717',
          fontFamily: 'Geist, Arial, sans-serif',
          letterSpacing: '-0.2px',
        }}
      >
        9:41
      </span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <rect x="0" y="7" width="2.5" height="5" rx="0.8" fill="#171717" />
      <rect x="4.5" y="4.5" width="2.5" height="7.5" rx="0.8" fill="#171717" />
      <rect x="9" y="2" width="2.5" height="10" rx="0.8" fill="#171717" />
      <rect x="13.5" y="0" width="2.5" height="12" rx="0.8" fill="#171717" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
      <circle cx="8" cy="10.5" r="1.5" fill="#171717" />
      <path d="M4.8 7.8C5.7 6.9 6.8 6.4 8 6.4s2.3.5 3.2 1.4" stroke="#171717" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M2 4.8C3.6 3.2 5.7 2.2 8 2.2s4.4 1 6 2.6" stroke="#171717" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#171717" strokeOpacity="0.35" />
      <rect x="2" y="2" width="17" height="8" rx="2" fill="#171717" />
      <path d="M23 4.5v3a1.5 1.5 0 0 0 0-3Z" fill="#171717" fillOpacity="0.4" />
    </svg>
  );
}
