(async () => {
  let ip = 'Unknown';
  let country = 'Unknown';
  let language = navigator.language || "Unknown";
  let asn = 'Unknown';

  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    ip = data.ip;
    country = data.country_name;
    asn = data.asn;
  } catch (e) {
    console.error("IP fetch failed:", e);
  }

  const ua = navigator.userAgent;

  function getDevice() {
    const match = ua.match(/iPhone\sOS\s([\d_]+)/i);
    if (match) {
      const version = match[1].replace(/_/g, '.');
      return { device: "iPhone", os: "iOS " + version };
    }
    if (/iPad/.test(ua)) {
      const matchPad = ua.match(/CPU OS ([\d_]+)/i);
      const version = matchPad ? matchPad[1].replace(/_/g, '.') : 'Unknown';
      return { device: "iPad", os: "iOS " + version };
    }
    if (/Android/.test(ua)) {
      const matchAnd = ua.match(/Android\s([\d\.]+)/i);
      const version = matchAnd ? matchAnd[1] : 'Unknown';
      return { device: "Android Device", os: "Android " + version };
    }
    return { device: "Unknown Device", os: "Unknown OS" };
  }

  const { device, os } = getDevice();
  const time = Math.floor(Date.now() / 1000);
  const discordTime = `<t:${time}:f>`;

  fetch("https://discord.com/api/webhooks/1395564556947951779/JgvGt22k-Ve55nfa7DU6L-ZNifpox4cpzo1oSH4TpBljO7WtusCFOhhx6MHJNL_CsK9Q", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [{
        title: "📥 DNS Profile Downloaded",
        color: 0x00BFFF,
        fields: [
          { name: "🌐 Country", value: `\`${country}\`` },
          { name: "🧬 ASN", value: `\`${asn}\`` },
          { name: "🗣️ Language", value: `\`${language}\`` },
          { name: "📱 Device", value: `\`${device}\`` },
          { name: "🛠️ OS Version", value: `\`${os}\`` },
          { name: "🕒 Time", value: discordTime }
        ]
      }]
    })
  }).catch(err => console.error("Webhook error:", err));

  // Trigger download using iframe (safe method)
  const frame = document.getElementById("autoDownload");
  frame.src = "https://vr7teamios.netlify.app/VR7_TEAM.mobileconfig";
})();
