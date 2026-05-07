import { useState, useEffect } from "react";

const spots = [
  { id: 2, name: "浅間神社【メイン会場】", icon: "⛩️", tag: "撮影スポット", note: "撮影可能。トイレもお借りできます。\n・施設の道具や設備は許可なく使用、移動させないでください。\n・建築物に登る、寄りかかる行為はおやめください。\n・当日の状況により、撮影時間を制限させていただく場合があります。", detail: "境内での撮影が可能です。トイレ利用もOK。参拝者への配慮をお願いします。", images: ["/sengen01.jpg", "/sengen02.jpg", "/sengen03.jpg"], map: "https://maps.app.goo.gl/WyXJqtBiWors2EfA6" },
  { id: 1, name: "近藤勇陣屋跡", icon: "🏯", tag: "撮影スポット", note: "室内撮影も可能になりました。\n・施設の判断により、入場をご遠慮いただく場合もございますのであらかじめご了承ください。\n・一般のお客様のご迷惑にならないようにご配慮ください。\n・本格的な撮影はご遠慮ください。", detail: "近藤勇ゆかりの歴史的スポット。屋外・室内ともに撮影OK。", images: ["/jinnyaato01.jpg", "/jinyaato02.jpg"], map: "https://maps.app.goo.gl/mA4rqrb5vQbQ4FKVA" },
  { id: 5, name: "万華鏡ミュージアム", icon: "🔮", tag: "撮影スポット", note: "狭いため、建物前のみでの撮影が良いと思います。\n・施設の判断により、入場をご遠慮いただく場合もございますのであらかじめご了承ください。\n・一般のお客様のご迷惑にならないようにご配慮ください。\n・本格的な撮影はご遠慮ください。\n・買い物目的以外での入店、商品の取り扱いはご遠慮ください。", detail: "建物外観が撮影スポットです。館内は一般見学者への配慮をお願いします。", images: ["/mangekyou01.jpg"], map: "https://maps.app.goo.gl/C1GoXzKYEUd7JiLx9" },
  { id: 6, name: "流山市白みりんミュージアム", icon: "🍶", tag: "撮影スポット", note: "施設内でも撮影可能です。\n・施設の判断により、入場をご遠慮いただく場合もございますのであらかじめご了承ください。\n・一般のお客様のご迷惑にならないようにご配慮ください。\n・買い物目的以外での、商品の取り扱いはご遠慮ください。", detail: "施設内部での撮影もOK。スタッフの案内に従ってください。", images: ["/mirin01.jpg"], map: "https://maps.app.goo.gl/tAbXgPDHVjfuFDtQ6" },
  { id: 8, name: "流山線歩道橋", icon: "🌉", tag: "撮影スポット", note: "撮影の際は、安全確認をお願いします。\n・一般の方も通行・利用されます。通行の妨げとならないようご注意ください。", detail: "駅が近く、撮影スポットとして使用できます。", images: ["/hodokyou01.jpg", "/hodoukyou02.jpg", "/hodoukyou03.jpg", "/hodoukyou04.jpg", "/hodoukyou05.jpg"], map: "https://maps.app.goo.gl/3sad4NCQfLbutbxs5" },
  { id: 7, name: "江戸川土手", icon: "🌊", tag: "撮影スポット", note: "全域で撮影可能です。\n・一般の方も通行・利用されます。通行の妨げとならないようご注意ください。", detail: "広大な土手エリアを自由に使えます。自然光を活かした撮影に最適。", images: ["/edogawa01.jpg", "/edogawa02.jpg", "/edogawa03.jpg", "/edogawa04.jpg", "/edogawa05.jpg"], map: "https://maps.app.goo.gl/n85F3pgeVYoRADuN6", map2: "https://maps.app.goo.gl/99h5UiiE3TyGNwvv7", map3: "https://maps.app.goo.gl/YqpCRJ7d3aC6hpVs7" },
  { id: 3, name: "流山駅（流鉄流山線）", icon: "🚃", tag: "撮影・乗車", note: "Coming Soon", detail: "Coming Soon", images: ["/nagareyamaeki.jpg"], map: "https://maps.app.goo.gl/4XHTUziQm3Ewwzrx5" },
  { id: 4, name: "CHAT ERRANT", icon: "🍽️", tag: "協賛店", note: "ランチ営業・撮影スポット\n・店舗の判断により、入店をご遠慮いただく場合もございますのであらかじめご了承ください。\n・一般のお客様のご迷惑にならないようにご配慮ください。\n・本格的な撮影はご遠慮ください。", detail: "流山本町エリアにある創作フレンチレストランです。当日はランチ営業を行っており、店内は撮影スポットとしてもご利用いただけます。", images: ["/chaterrant01.jpg"], map: "https://maps.app.goo.gl/XPWSuMm8fijJqLkt6" },
];

const allImages = spots.flatMap(s => s.images.map(img => ({ src: img, name: s.name })));

const schedule = [
  { time: "10:00〜", label: "アーリー更衣室利用受付開始", icon: "⭐", note: "アーリー利用は+500円" },
  { time: "11:00〜", label: "通常更衣室受付開始", icon: "👘", note: "" },
  { time: "11:00〜", label: "流鉄流山線コスプレ乗車開始", icon: "🚃", note: "往復440円 / 一日フリー500円" },
  { time: "12:00〜", label: "オープニングイベント", icon: "🎉", note: "📍 浅間神社" },
  { time: "12:15〜", label: "集合写真撮影", icon: "📸", note: "📍 浅間神社" },
  { time: "〜16:00", label: "受付終了・流鉄コスプレ乗車終了", icon: "🔔", note: "" },
  { time: "16:30〜", label: "クローズイベント", icon: "🎊", note: "📍 浅間神社" },
  { time: "16:45〜", label: "集合写真撮影", icon: "📸", note: "📍 浅間神社" },
  { time: "〜18:30", label: "更衣室完全撤収", icon: "🏁", note: "時間厳守でお願いします" },
];

const faqs = [
  { category: "参加について", items: [
    { q: "初めてのコスプレイベントでも参加できますか？", a: "もちろん大歓迎です！スタッフがサポートしますので、お気軽にご参加ください。" },
    { q: "当日参加はできますか？", a: "定員に余裕がある場合のみ当日参加が可能です。事前予約を推奨しています。" },
    { q: "友人と一緒に参加できますか？", a: "もちろんです！グループでのご参加も歓迎しています。" },
  ]},
  { category: "衣装・更衣について", items: [
    { q: "更衣室の利用に追加料金はかかりますか？", a: "参加費（3,000円）に含まれていますので追加料金はかかりません。" },
    { q: "更衣室に鍵付きロッカーはありますか？", a: "鍵付きロッカーのご用意はありませんが、クローク（500円・当日現金払い）をご利用いただけます。貴重品は各自で管理してください。" },
    { q: "衣装のサイズや種類に制限はありますか？", a: "着ぐるみや大型衣装の場合はアテンドの同行が必要です。また禁止衣装がありますので、ルールページをご確認ください。" },
  ]},
  { category: "撮影について", items: [
    { q: "一般の方への撮影をお願いしてもいいですか？", a: "一般の方への撮影依頼はご遠慮ください。参加者同士での撮影は必ず相手の同意を得てから行ってください。" },
    { q: "三脚や大型カメラの使用はできますか？", a: "周囲の方の迷惑にならない範囲でご使用いただけます。道路での使用は禁止します。撮影可能場所混雑時はスタッフの指示に従ってください。" },
  ]},
  { category: "その他", items: [
    { q: "雨天の場合はどうなりますか？", a: "小雨の場合は予定通り開催します。荒天の場合は公式SNSにてお知らせします。" },
    { q: "子どもと一緒に参加できますか？", a: "お子様連れでのご参加も歓迎です。未成年の方は保護者の同伴または同意書が必要です。" },
  ]},
  { category: "流鉄について", items: [
    { q: "流鉄流山線のコスプレ乗車について教えてください。", a: "現在調整中です。詳細が決まり次第お知らせします。" },
  ]},
];

const tabs = ["TOP", "お知らせ", "イベント概要", "スケジュール", "スポット", "更衣室", "アクセス", "ルール", "FAQ"];

const tagColor = (tag) => {
  if (tag === "協賛店") return "#555";
  if (tag === "撮影・乗車") return "#222";
  return "#333";
};

function ImageSlider({ images, name }) {
  const [idx, setIdx] = useState(0);
  const [modal, setModal] = useState(false);
  if (!images || images.length === 0) return null;
  return (
    <div style={{ position: "relative", marginBottom: 10 }}>
      <img src={images[idx]} alt={name} onClick={() => setModal(true)} style={{ width: "100%", borderRadius: 8, display: "block", cursor: "zoom-in" }} />
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>‹</button>
          <span style={{ fontSize: 12, color: "#888" }}>{idx + 1} / {images.length}</span>
          <button onClick={() => setIdx(i => (i + 1) % images.length)} style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 16, cursor: "pointer" }}>›</button>
        </div>
      )}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.95)", zIndex: 1000, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setModal(false)} style={{ position: "fixed", top: 20, right: 20, background: "#fff", color: "#111", border: "none", borderRadius: "50%", width: 48, height: 48, fontSize: 22, fontWeight: 700, cursor: "pointer", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <img src={images[idx]} alt={name} onClick={e => e.stopPropagation()} style={{ maxWidth: "95vw", maxHeight: "85vh", borderRadius: 8, objectFit: "contain", touchAction: "pinch-zoom" }} />
          {images.length > 1 && (
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              <button onClick={e => { e.stopPropagation(); setIdx(i => (i - 1 + images.length) % images.length); }} style={{ background: "#fff", color: "#111", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 20, cursor: "pointer", fontWeight: 700 }}>‹</button>
              <span style={{ color: "#fff", fontSize: 14, display: "flex", alignItems: "center" }}>{idx + 1} / {images.length}</span>
              <button onClick={e => { e.stopPropagation(); setIdx(i => (i + 1) % images.length); }} style={{ background: "#fff", color: "#111", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 20, cursor: "pointer", fontWeight: 700 }}>›</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TopSlideshow() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % allImages.length), 3000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{ position: "relative", width: "100%", borderRadius: 12, overflow: "hidden", marginBottom: 16 }}>
      <img src={allImages[idx].src} alt={allImages[idx].name} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "20px 16px 12px" }}>
        <div style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>📍 {allImages[idx].name}</div>
      </div>
      <div style={{ position: "absolute", bottom: 8, right: 12, display: "flex", gap: 4 }}>
        {allImages.map((_, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 16 : 6, height: 6, borderRadius: 3, background: i === idx ? "#fff" : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "width 0.3s" }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("TOP");
  const [openSpot, setOpenSpot] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTab = (t) => { setActiveTab(t); setMenuOpen(false); };

  return (
    <div style={{ fontFamily: "'Helvetica Neue', sans-serif", background: "#f5f5f5", minHeight: "100vh", maxWidth: 480, margin: "0 auto", color: "#111" }}>

      <div style={{ background: "#111", color: "#fff", padding: "24px 20px 16px", position: "sticky", top: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div onClick={() => setActiveTab("TOP")} style={{ cursor: "pointer" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#aaa", marginBottom: 4 }}>COSPLAY EVENT</div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 1 }}>LAYERS JACK</div>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#ccc" }}>CONVENTION</div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? "#aaa" : "#fff" }} />
        </button>
      </div>

      {menuOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 200 }}>
          <div onClick={() => setMenuOpen(false)} style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(0,0,0,0.5)" }} />
          <div style={{ position: "absolute", right: 0, top: 0, width: 240, height: "100%", background: "#111", padding: "80px 0 40px" }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#666", padding: "0 24px", marginBottom: 16 }}>MENU</div>
            {tabs.map(t => (
              <button key={t} onClick={() => handleTab(t)} style={{ display: "block", width: "100%", padding: "16px 24px", background: activeTab === t ? "#222" : "none", border: "none", borderLeft: activeTab === t ? "3px solid #fff" : "3px solid transparent", color: activeTab === t ? "#fff" : "#aaa", fontSize: 15, fontWeight: activeTab === t ? 700 : 400, textAlign: "left", cursor: "pointer", letterSpacing: 1 }}>{t}</button>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "20px 16px", paddingBottom: 100 }}>

        {activeTab === "TOP" && (
          <div>
            <div style={{ background: "#111", color: "#fff", borderRadius: 12, padding: "24px 24px 20px", marginBottom: 16, textAlign: "center" }}>
              <img src="/ljc_vo1.jpeg" alt="LAYERS JACK CONVENTION" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, marginBottom: 4 }}>LAYERS JACK</div>
              <div style={{ fontSize: 13, color: "#aaa", letterSpacing: 3 }}>CONVENTION</div>
            </div>

            <TopSlideshow />

            <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 14, fontSize: 12, color: "#666", lineHeight: 1.8, marginBottom: 12, textAlign: "center" }}>
              📲 このページをホーム画面に追加すると<br />いつでもすぐにアクセスできます！
            </div>

            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 12, padding: 20, marginBottom: 16, textAlign: "left" }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12, letterSpacing: 1, textAlign: "center" }}>📷 公式カメラマン📷</div>
              <img src="/tsubasa01.jpeg" alt="TSUBASA" style={{ width: "100%", borderRadius: 8, marginBottom: 12 }} />
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, textAlign: "center" }}>TSUBASA</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <a href="https://x.com/tsubasacamera" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 アカウント</a>
                <a href="https://www.instagram.com/tsubasacameratokyo/" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "12px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
              </div>
            </div>

            <div style={{ fontSize: 13, color: "#888", letterSpacing: 2, marginBottom: 8, textAlign: "center" }}>― LAYERS JACK CONVENTION ―</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <a href="https://x.com/LJC_Nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>𝕏 公式アカウント</a>
              <a href="https://www.instagram.com/ljc_nagareyama" target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>📷 Instagram</a>
            </div>
            <a href="mailto:layersjack.convention@gmail.com" style={{ display: "block", textAlign: "center", background: "#fff", color: "#111", border: "1px solid #ddd", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginBottom: 12 }}>📧 お問い合わせはこちら</a>

            <div style={{ textAlign: "center", padding: "16px 0", marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: "#aaa", letterSpacing: 2, marginBottom: 6 }}>後援</div>
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, color: "#111" }}>流山市</div>
            </div>

            <div style={{ background: "#111", color: "#fff", borderRadius: 10, padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 8, letterSpacing: 1 }}>📣 公式ハッシュタグ</div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>#流山本町</div>
              <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>#レイヤーズジャック</div>
              <button onClick={() => { navigator.clipboard.writeText("#流山本町 #レイヤーズジャック"); alert("ハッシュタグをコピーしました！"); }} style={{ background: "#333", color: "#fff", border: "none", borderRadius: 6, padding: "8px 20px", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>📋 まとめてコピー</button>
              <div style={{ marginTop: 12, borderTop: "1px solid #333", paddingTop: 12, fontSize: 12, color: "#aaa", lineHeight: 1.8 }}>
                <div>SNS投稿時は公式ハッシュタグをつけてシェアしよう！</div>
                <div>他の参加者を映した写真は必ず同意を得てから投稿しましょう。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "お知らせ" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>最新のお知らせ</div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>2026.05.07</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🏛 流山市後援決定のお知らせ</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                <div>流山市より正式に後援をいただくことが決定しました。</div>
                <div>引き続きご支援よろしくお願いいたします。</div>
              </div>
            </div>

            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>2026.05.02</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>📷 公式カメラマン決定のお知らせ</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                <div>公式カメラマンにTSUBASAさんが決定しました！</div>
                <div>詳細は近日公開予定です。お楽しみに！</div>
              </div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#aaa", marginBottom: 6 }}>2026.05.01</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>🎭 イベント詳細 近日公開予定</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                <div>イベントの詳細情報を現在準備中です。</div>
                <div>近日中に公開予定ですので、今しばらくお待ちください。</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "イベント概要" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, letterSpacing: 1 }}>📌 イベント概要</div>
              {[
                ["📅 開催日", "2026年6月28日（日）"],
                ["🕐 開催時間", "11:00〜17:00"],
                ["👘 更衣室完全撤収", "18:30"],
                ["👥 定員", "100名（予定）"],
                ["💰 参加費", "3,500円（更衣室利用込み）"],
                ["📍 エリア", "流山本町周辺"],
                ["👘 更衣室", "調整中"],
                ["📷 公式カメラマン", "TSUBASA"],
                ["🎪 主催", "レイヤーズ ジャック実行委員会"],
                ["🤝 後援", "流山市"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #e0e0e0", fontSize: 13 }}>
                  <span style={{ color: "#888" }}>{k}</span>
                  <span style={{ fontWeight: 500, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10 }}>💴 料金一覧</div>
              {[
                ["参加費（更衣室込み）", "3,500円"],
                ["アーリー更衣室（10:00〜）", "4,000円"],
                ["クローク利用（当日現金払い）", "500円"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}>
                  <span style={{ color: "#555" }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 16, fontSize: 12, color: "#555", lineHeight: 1.8 }}>
              「コスプレを楽しむ！」がコンセプト。<br />
              流山市の歴史ある街並みを舞台にしたコスプレイベントです。<br />
              近藤勇ゆかりの地や流鉄流山線など、唯一無二のロケーションで、交流・撮影をお楽しみください。
            </div>
          </div>
        )}

        {activeTab === "スケジュール" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#aaa", fontWeight: 600 }}>Coming Soon</div>
          </div>
        )}

        {activeTab === "スポット" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>撮影スポット・協賛店一覧</div>
            {spots.map(spot => (
              <div key={spot.id}>
                <div onClick={() => setOpenSpot(openSpot === spot.id ? null : spot.id)} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: "14px 16px", marginBottom: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 24 }}>{spot.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{spot.name}</div>
                      <span style={{ fontSize: 10, background: tagColor(spot.tag), color: "#fff", padding: "2px 8px", borderRadius: 20, letterSpacing: 1 }}>{spot.tag}</span>
                    </div>
                  </div>
                  <span style={{ color: "#aaa", fontSize: 18 }}>{openSpot === spot.id ? "▲" : "▼"}</span>
                </div>
                {openSpot === spot.id && (
                  <div style={{ background: "#f9f9f9", border: "1px solid #ddd", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 16px", marginTop: -8, marginBottom: 8, fontSize: 13, lineHeight: 1.8, color: "#333" }}>
                    <ImageSlider images={spot.images} name={spot.name} />
                    <div style={{ marginBottom: 6 }}>{spot.detail}</div>
                    {spot.map && !spot.map2 && (
                      <a href={spot.map} target="_blank" rel="noreferrer" style={{ display: "inline-block", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 600, marginBottom: 8, textDecoration: "none" }}>🗺 Google マップで見る</a>
                    )}
                    {spot.map && spot.map2 && (
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <a href={spot.map} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段①</a>
                        <a href={spot.map2} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段②</a>
                        {spot.map3 && <a href={spot.map3} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: "center", background: "#fff", color: "#111", border: "1px solid #111", borderRadius: 6, padding: "6px 8px", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>🗺 階段③</a>}
                      </div>
                    )}
                    <div style={{ background: "#111", color: "#fff", borderRadius: 6, padding: "8px 12px", fontSize: 12, whiteSpace: "pre-line" }}>📢 {spot.note}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "更衣室" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#aaa", fontWeight: 600 }}>Coming Soon</div>
          </div>
        )}

        {activeTab === "アクセス" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#aaa", fontWeight: 600 }}>Coming Soon</div>
          </div>
        )}

        {activeTab === "ルール" && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{ fontSize: 18, letterSpacing: 3, color: "#aaa", fontWeight: 600 }}>Coming Soon</div>
          </div>
        )}

        {activeTab === "FAQ" && (
          <div>
            <div style={{ fontSize: 13, color: "#888", marginBottom: 16 }}>よくある質問</div>
            {faqs.map(section => (
              <div key={section.category} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 1, marginBottom: 8, padding: "6px 12px", background: "#111", color: "#fff", borderRadius: 6 }}>{section.category}</div>
                {section.items.map((item, i) => (
                  <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 10, padding: 14, marginBottom: 8 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 6 }}>Q. {item.q}</div>
                    <div style={{ fontSize: 13, color: "#555", lineHeight: 1.8 }}>A. {item.a}</div>
                  </div>
                ))}
              </div>
            ))}
            <a href="mailto:layersjack.convention@gmail.com" style={{ display: "block", textAlign: "center", background: "#111", color: "#fff", borderRadius: 10, padding: "14px 0", fontSize: 13, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 80 }}>📧 お問い合わせはこちら</a>
          </div>
        )}

      </div>
    </div>
  );
}