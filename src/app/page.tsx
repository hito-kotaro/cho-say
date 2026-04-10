import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ─── Sticky Header ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-xl font-extrabold text-primary">cho-say</span>
          <Link
            href="/events/new"
            className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-primary-hover transition-colors active:scale-95"
          >
            イベントを作成
          </Link>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-cheers.png"
            alt="居酒屋で乾杯する仲間たち"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-32">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl">
            飲み会の調整、
            <br />
            <span className="text-amber-300">もっとカンタンに。</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80 sm:mt-6 sm:text-xl">
            日程調整もお店選びも、cho-say ひとつで完結。
            <br className="hidden sm:block" />
            URLを送るだけで、みんなの予定もお店の好みも
            <br className="hidden sm:block" />
            パッとまとまる。
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/events/new"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all active:scale-95 sm:w-auto sm:text-lg"
            >
              無料でイベントを作成
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center gap-1 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors sm:w-auto"
            >
              使い方を見る
              <span className="text-white/60">↓</span>
            </a>
          </div>
          <p className="mt-4 text-xs text-white/60 sm:text-sm">
            登録不要・完全無料・URLを共有するだけ
          </p>
        </div>
      </section>

      {/* ─── Pain → Solution ─── */}
      <section className="border-t border-border bg-card px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-3xl">
            こんな経験、ありませんか？
          </h2>
          <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            <PainCard
              emoji="😵‍💫"
              text="LINEが出欠確認で埋まって、誰が何日OKか分からなくなる"
            />
            <PainCard
              emoji="🔄"
              text="お店どうする？の無限ループで結局決まらない"
            />
            <PainCard
              emoji="⏰"
              text="幹事ひとりに負担が集中して疲弊する"
            />
          </div>
          <div className="mx-auto mt-10 mb-4 flex flex-col items-center gap-1">
            <div className="h-8 w-px bg-gradient-to-b from-border to-primary" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg text-white shadow">
              ↓
            </div>
          </div>
          <p className="text-xl font-bold text-primary sm:text-2xl">
            cho-say なら、ぜんぶ解決。
          </p>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section id="how-it-works" className="scroll-mt-16 border-t border-border px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-center text-xl font-bold text-foreground sm:mb-4 sm:text-3xl">
            たった3ステップで完了
          </h2>
          <p className="mb-8 text-center text-sm text-muted sm:mb-14 sm:text-base">
            アカウント登録は不要。今すぐ始められます。
          </p>
          <div className="relative grid gap-8 sm:grid-cols-3 sm:gap-8">
            {/* Connector line (desktop only) */}
            <div className="pointer-events-none absolute top-10 right-[calc(33.333%+1rem)] left-[calc(33.333%-1rem)] hidden h-px bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 sm:block" />
            <StepCard
              step={1}
              emoji="✏️"
              title="イベントを作成"
              description="イベント名と候補日をカレンダーから選ぶだけ。30秒で完了。"
            />
            <StepCard
              step={2}
              emoji="🔗"
              title="URLをシェア"
              description="生成されたURLをLINEやSlackで共有。メンバーはタップするだけ。"
            />
            <StepCard
              step={3}
              emoji="🎯"
              title="日程&お店が決定"
              description="出欠が一覧表で見える化。お店も投票で人気順にランキング。"
            />
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="border-t border-border bg-card px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            cho-say の機能
          </h2>

          {/* Feature 1: 日程調整 */}
          <div className="mb-12 flex flex-col items-center gap-6 sm:mb-16 sm:flex-row sm:gap-8">
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
                📅 日程調整
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
                ○△×で出欠がパッとわかる
              </h3>
              <p className="leading-relaxed text-muted">
                候補日それぞれに ○（参加OK）/ △（微妙）/ ×（NG）で回答。
                結果はリアルタイムで一覧表に反映され、ベストな日程が一目瞭然。
                もうLINEのスクロール地獄は不要です。
              </p>
            </div>
            <div className="w-full max-w-xs shrink-0">
              <MockAttendanceTable />
            </div>
          </div>

          {/* Feature 2: お店投票 */}
          <div className="mb-12 flex flex-col items-center gap-6 sm:mb-16 sm:flex-row sm:gap-8">
            <div className="order-1 w-full max-w-xs shrink-0 sm:order-none">
              <MockShopRanking />
            </div>
            <div className="order-none flex-1 sm:order-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-800">
                🏮 お店投票
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
                みんなで投票、人気店がすぐ決まる
              </h3>
              <p className="leading-relaxed text-muted">
                お店をワンタップで投票。得票数でリアルタイムにランキング化されるから、
                「どこにする？」のグダグダがなくなります。
                幹事が独断で決めるプレッシャーからも解放。
              </p>
            </div>
          </div>

          {/* Feature 3: エリア別おすすめ */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
            <div className="flex-1">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
                📍 エリアのおすすめ店
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
                お店探しもラクラク
              </h3>
              <p className="leading-relaxed text-muted">
                渋谷・新宿・池袋・恵比寿・六本木・銀座・品川・上野 —
                人気エリアのおすすめ店があらかじめ登録済み。
                ジャンルや予算もひと目でわかるから、お店探しの手間もゼロ。
              </p>
            </div>
            <div className="w-full max-w-xs shrink-0">
              <MockAreaChips />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why cho-say ─── */}
      <section className="border-t border-border px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground sm:mb-12 sm:text-3xl">
            選ばれる理由
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            <ReasonCard emoji="🆓" title="完全無料" description="すべての機能が無料で使えます。広告もなし。" />
            <ReasonCard emoji="🔑" title="登録不要" description="アカウント作成は不要。URLを開くだけで参加できます。" />
            <ReasonCard emoji="📱" title="スマホ最適化" description="スマホでもPCでもサクサク動く、レスポンシブ対応。" />
            <ReasonCard emoji="⚡" title="秒で作成" description="イベント作成は30秒。すぐに共有してすぐ始められます。" />
          </div>
        </div>
      </section>

      {/* ─── Atmosphere Photo ─── */}
      <section className="relative border-t border-border">
        <div className="relative h-64 sm:h-80">
          <Image
            src="/images/izakaya-interior.png"
            alt="居酒屋のカウンターに並ぶビールと焼き鳥"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="max-w-md px-4 text-center text-2xl font-bold leading-relaxed text-white sm:text-3xl">
              最高の夜は、
              <br />
              スムーズな段取りから。
            </p>
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="bg-gradient-to-b from-primary-light to-background px-4 py-14 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 text-4xl sm:mb-6 sm:text-5xl">🎉</div>
          <h2 className="text-2xl font-extrabold text-foreground sm:text-4xl">
            さっそく飲み会を企画しよう
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-muted sm:mt-4 sm:text-lg">
            面倒な調整はcho-sayにおまかせ。
            <br />
            あなたは楽しむことだけに集中してください。
          </p>
          <Link
            href="/events/new"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-10 py-4 text-base font-bold text-white shadow-lg hover:bg-primary-hover hover:shadow-xl transition-all active:scale-95 sm:mt-8 sm:w-auto sm:text-lg"
          >
            無料でイベントを作成
          </Link>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="text-xl font-extrabold text-primary">cho-say</p>
              <p className="mt-1 text-sm text-muted">
                飲み会調整さん &copy; {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a
                href="https://github.com/hito-kotaro/cho-say"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://luxy-inc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                株式会社Luxy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-components ─── */

function PainCard({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5 text-left">
      <div className="mb-2 text-2xl">{emoji}</div>
      <p className="text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

function StepCard({
  step,
  emoji,
  title,
  description,
}: {
  step: number;
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow">
        {step}
      </div>
      <div className="mb-3 mt-2 text-4xl">{emoji}</div>
      <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

function ReasonCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center shadow-sm sm:p-5">
      <div className="mb-1.5 text-2xl sm:mb-2 sm:text-3xl">{emoji}</div>
      <h3 className="mb-1 text-sm font-bold text-foreground sm:text-base">{title}</h3>
      <p className="text-xs leading-relaxed text-muted sm:text-sm">{description}</p>
    </div>
  );
}

/* ─── Mock UI Components for Feature Showcase ─── */

function MockAttendanceTable() {
  const people = [
    { name: "田中", vals: ["ok", "ok", "maybe"] },
    { name: "鈴木", vals: ["ok", "maybe", "ok"] },
    { name: "佐藤", vals: ["ng", "ok", "ok"] },
  ];
  const dates = ["4/18(金)", "4/19(土)", "4/25(金)"];
  const symbols: Record<string, { label: string; cls: string }> = {
    ok: { label: "○", cls: "bg-green-100 text-green-700" },
    maybe: { label: "△", cls: "bg-yellow-100 text-yellow-700" },
    ng: { label: "×", cls: "bg-red-100 text-red-600" },
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-orange-50/60">
            <th className="px-3 py-2 text-left text-xs font-semibold text-foreground">名前</th>
            {dates.map((d) => (
              <th key={d} className="px-2 py-2 text-center text-xs font-semibold text-foreground whitespace-nowrap">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.name} className="border-t border-border">
              <td className="px-3 py-2 font-medium text-foreground">{p.name}</td>
              {p.vals.map((v, i) => (
                <td key={i} className="px-2 py-2 text-center">
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${symbols[v].cls}`}
                  >
                    {symbols[v].label}
                  </span>
                </td>
              ))}
            </tr>
          ))}
          <tr className="border-t border-border bg-orange-50/60">
            <td className="px-3 py-2 text-xs font-bold text-primary">○ 合計</td>
            {[2, 2, 2].map((c, i) => (
              <td key={i} className="px-2 py-2 text-center text-sm font-bold text-primary">
                {c}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MockShopRanking() {
  const shops = [
    { rank: 1, name: "炭火居酒屋 渋谷炎", genre: "居酒屋", votes: 5 },
    { rank: 2, name: "海鮮酒場 魚よし", genre: "海鮮", votes: 3 },
    { rank: 3, name: "焼肉ホルモン", genre: "焼肉", votes: 2 },
  ];

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-foreground">🏆 投票ランキング</p>
      {shops.map((s) => (
        <div
          key={s.rank}
          className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-sm"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary">
            {s.rank}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{s.name}</p>
            <span className="inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-800">
              {s.genre}
            </span>
          </div>
          <div className="text-center">
            <span className="text-lg font-bold text-primary">{s.votes}</span>
            <span className="block text-[10px] text-muted">票</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function MockAreaChips() {
  const areas = [
    "渋谷", "新宿", "池袋", "恵比寿",
    "六本木", "銀座", "品川", "上野",
  ];

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <p className="mb-3 text-xs font-bold text-foreground">📍 エリアを選択</p>
      <div className="flex flex-wrap gap-2">
        {areas.map((a, i) => (
          <span
            key={a}
            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              i === 0
                ? "bg-primary text-white shadow-sm"
                : "border border-border bg-background text-foreground"
            }`}
          >
            {a}
          </span>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {[
          { name: "炭火居酒屋 渋谷炎", genre: "居酒屋", budget: "3000〜4000円" },
          { name: "海鮮酒場 魚よし", genre: "海鮮", budget: "3500〜5000円" },
        ].map((s) => (
          <div key={s.name} className="flex items-center justify-between rounded-lg border border-border p-2.5">
            <div>
              <p className="text-xs font-bold text-foreground">{s.name}</p>
              <div className="mt-0.5 flex gap-1">
                <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-800">
                  {s.genre}
                </span>
                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-800">
                  {s.budget}
                </span>
              </div>
            </div>
            <span className="shrink-0 rounded-lg border border-primary/30 px-2 py-1 text-[10px] font-semibold text-primary">
              👍 投票
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
