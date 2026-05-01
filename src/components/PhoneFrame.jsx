import StatusBar from './StatusBar.jsx';

export default function PhoneFrame({ children }) {
  return (
    <div
      style={{
        width: 375,
        height: 'min(780px, calc(100vh - 120px))',
        border: '1px solid #e0e0e0',
        borderRadius: 40,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        background: '#ffffff',
        flexShrink: 0,
      }}
    >
      <StatusBar />
      {children}
      <HomeIndicator />
    </div>
  );
}

function HomeIndicator() {
  return (
    <div
      style={{
        height: 20,
        background: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 120,
          height: 4,
          background: '#000',
          borderRadius: 9999,
          opacity: 0.15,
        }}
      />
    </div>
  );
}
