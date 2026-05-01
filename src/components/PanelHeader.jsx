export default function PanelHeader({
  name,
  subtitle,
  avatarInitial,
  avatarBg,
  avatarTextColor,
  avatarMono,
  badge,
}) {
  return (
    <div
      style={{
        height: 56,
        flexShrink: 0,
        background: '#ffffff',
        borderBottom: '1px solid #f0f0f0',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 10,
      }}
    >
      {/* Roger avatar */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: avatarBg,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: avatarTextColor,
          fontFamily: avatarMono ? 'Geist Mono, monospace' : 'Geist, Arial, sans-serif',
          fontSize: 16,
          fontWeight: 600,
          boxShadow: 'rgba(0,0,0,0.08) 0px 0px 0px 1px',
        }}
      >
        {avatarInitial}
      </div>

      {/* Name + subtitle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: '#171717',
            fontFamily: 'Geist, Arial, sans-serif',
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 400,
            color: '#667781',
            fontFamily: 'Geist, Arial, sans-serif',
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </div>
      </div>

      {/* Friend badge — shown in right panel */}
      {badge && (
        <div
          style={{
            background: '#DCF8C6',
            color: '#128C7E',
            borderRadius: 9999,
            padding: '3px 10px',
            fontSize: 12,
            fontWeight: 500,
            fontFamily: 'Geist, Arial, sans-serif',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: badge.avatarBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontFamily: 'Geist Mono, monospace',
              fontSize: 8,
              fontWeight: 600,
            }}
          >
            {badge.initial}
          </div>
          {badge.name}
        </div>
      )}
    </div>
  );
}
