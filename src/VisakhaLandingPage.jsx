import { useEffect, useMemo, useState } from "react";
import {
  Banknote,
  BookOpen,
  CalendarDays,
  Camera,
  ChevronRight,
  Clock,
  ExternalLink,
  Facebook,
  Flower,
  Heart,
  Home,
  Landmark,
  LineChart,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserRound,
  Wifi,
} from "lucide-react";
import fallbackCover from "./assets/asalha-hero.png";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRiwOL23eJNd2OIx9Y_Xu3lzqFaesznF8gMrx9WhKCbtY_WKa8_gfXfo77K8GsZKD8PmgoO5BfIk03D/pub?gid=1019513528&single=true&output=csv";

const FALLBACK_COVER = fallbackCover;

const DEFAULT_SETTINGS = {
  ชื่อเว็บ: "วันอาสาฬหบูชา 2569",
  subtitle: "Wat Luang Pho Sod Dhammakayaram",
  ชื่อกิจกรรมหลัก: "วันอาสาฬหบูชา",
  ชื่อกิจกรรมรอง: "ขอเชิญร่วมปฏิบัติธรรมและทอดผ้าป่า",
  งานบุญประจำปี: "งานบุญประจำปี วัดหลวงพ่อสดธรรมกายาราม",
  คำอธิบายป้ายหลัก:
    "ร่วมสืบสานพุทธประเพณี เจริญภาวนา เวียนเทียน และทอดผ้าป่าเพื่อสมทบทุนงานวัด",
  แนวคิดของงาน:
    "วันแห่งการประกาศพระธรรมจักร ระลึกถึงพระรัตนตรัย และร่วมบุญด้วยจิตศรัทธา",
  วันที่จัดงาน: "วันพุธที่ 29 กรกฎาคม พ.ศ. 2569",
  เวลาเริ่มงาน: "เริ่มเวลา 09.00 น.",
  สถานที่: "วัดหลวงพ่อสดธรรมกายาราม",
  สถานที่จัดงาน:
    "วัดหลวงพ่อสดธรรมกายาราม ตำบลแพงพวย อำเภอดำเนินสะดวก จังหวัดราชบุรี",
  สถานที่ด้านล่าง:
    "ตำบลแพงพวย อำเภอดำเนินสะดวก จังหวัดราชบุรี",
  หัวข้อวัตถุประสงค์: "วัตถุประสงค์ของการทอดผ้าป่า",
  คำอธิบายวัตถุประสงค์:
    "ร่วมเป็นเจ้าภาพสมทบทุนกิจการพระศาสนาและสาธารณูปการภายในวัด",
  เนื้อหาวัตถุประสงค์:
    "สมทบทุนก่อสร้างพระมหาเจดีย์สมเด็จฯ และติดตั้งโครงข่ายระบบการสื่อสารและความปลอดภัยภายในวัด",
  หัวข้อร่วมทำบุญ: "ร่วมทำบุญทอดผ้าป่าอาสาฬหบูชา",
  ธนาคาร: "ธนาคารกรุงเทพ",
  เลขบัญชี: "422-0-31266-6",
  ชื่อบัญชี: "วัดหลวงพ่อสดธรรมกายาราม",
  "Line ID": "@info.wat06",
  โทร: "090-595-5162",
  Facebook: "วัดหลวงพ่อสดฯ",
  TikTok: "",
  แผนที่: "",
  หัวข้อก่อนตาราง: "รายชื่อเจ้าภาพและผู้ร่วมทำบุญ",
  พุทธพจน์: "ธรรมะย่อมรักษาผู้ประพฤติธรรม",
  quote: "ร่วมบุญด้วยศรัทธา สืบสานพระธรรมในวันอาสาฬหบูชา",
  ชื่อวัดไทย: "วัดหลวงพ่อสดธรรมกายาราม",
  ชื่อวัดอังกฤษ: "Wat Luang Pho Sod Dhammakayaram",
  เมนูหน้าแรก: "หน้าแรก",
  เมนูรายชื่อ: "รายชื่อ",
  เมนูทำบุญ: "ทำบุญ",
  เมนูกำหนดการ: "กำหนดการ",
  เมนูติดต่อ: "ติดต่อ",
  ปุ่มร่วมทำบุญ: "ร่วมทำบุญ",
  ปุ่มดูรายชื่อ: "ดูรายชื่อผู้ร่วมบุญ",
  ป้ายแนวคิดของงาน: "แนวคิดของงาน",
  ป้ายอัปเดตล่าสุด: "อัปเดตล่าสุด",
  หัวข้อย่อยรายชื่อ: "รายชื่อผู้ร่วมบุญ",
  ช่องค้นหารายชื่อ: "ค้นหาลำดับ ประเภท ชื่อ หรือจำนวนทำบุญ",
  ป้ายจำนวนรายการ: "รายการ",
  หัวตารางลำดับ: "ลำดับ",
  หัวตารางประเภท: "ประเภท",
  หัวตารางชื่อคณะ: "ชื่อ / คณะ",
  หัวตารางจำนวนทำบุญ: "จำนวนทำบุญ",
  ข้อความกำลังโหลดรายชื่อ: "กำลังโหลดข้อมูลจาก Google Sheet",
  ข้อความไม่มีรายชื่อ: "ยังไม่มีข้อมูลรายชื่อใน Sheet หรือไม่พบผลลัพธ์ที่ค้นหา",
  หัวข้อย่อยวัตถุประสงค์: "วัตถุประสงค์",
  หัวข้อย่อยร่วมทำบุญ: "ร่วมทำบุญ",
  คำอธิบายร่วมทำบุญ: "สามารถร่วมบุญผ่านบัญชีวัด และส่งหลักฐานการโอนทาง Line OA",
  ป้ายQRCode: "QR Code ทำบุญ",
  คำแนะนำQRCode: "เพิ่มลิงก์รูปใน Sheet ที่ key “ลิงก์ QR ทำบุญ”",
  ป้ายชื่อบัญชี: "ชื่อบัญชี",
  ปุ่มส่งหลักฐาน: "ส่งหลักฐานทาง Line OA",
  หัวข้อย่อยกำหนดการ: "กำหนดการ",
  หัวข้อกำหนดการ: "ลำดับพิธีและกิจกรรม",
  คำอธิบายกำหนดการ: "",
  หัวข้อย่อยกิจกรรม: "กิจกรรมภายในงาน",
  หัวข้อกิจกรรม: "กิจกรรมภายในงาน",
  หัวข้อย่อยติดต่อ: "ติดต่อสอบถาม",
  หัวข้อติดต่อ: "วัดหลวงพ่อสดธรรมกายาราม",
  คำอธิบายติดต่อ: "Wat Luang Pho Sod Dhammakayaram",
  ป้ายLineOA: "Line OA",
  ปุ่มเปิดแผนที่: "เปิดแผนที่",
  ป้ายพุทธพจน์: "พุทธพจน์",
  ป้ายณ: "ณ",
  ข้อความโหลดSheetไม่สำเร็จ: "โหลดข้อมูลจาก Google Sheet ไม่สำเร็จ",
  ข้อความโหลดข้อมูลไม่สำเร็จ: "โหลดข้อมูลไม่สำเร็จ",
  ข้อความAltโลโก้วัด: "โลโก้วัด",
};

const FALLBACK_SCHEDULE = [
  ["09.00 น.", "สาธุชนพร้อมกัน ณ พระมหาเจดีย์สมเด็จฯ ชั้น 1"],
  ["09.30 น.", "พระราชวชิรานุสิฐ นำปฏิบัติธรรมเนื่องในวันอาสาฬหบูชา"],
  [
    "10.30 น.",
    "พิธีทอดผ้าป่าวันอาสาฬหบูชา เพื่อสมทบทุนก่อสร้างพระมหาเจดีย์สมเด็จฯ และติดตั้งระบบโครงข่ายการสื่อสารและความปลอดภัยภายในวัด",
  ],
  ["11.00 น.", "ฉันภัตตาหารเพล / รับประทานอาหาร"],
  ["13.00 น.", "เวียนเทียนบูชาพระรัตนตรัย"],
];

const FALLBACK_ACTIVITIES = [
  [
    "ปฏิบัติธรรม",
    "ร่วมเจริญภาวนาในบรรยากาศสงบ ณ พระมหาเจดีย์สมเด็จฯ",
    FALLBACK_COVER,
  ],
  ["ทอดผ้าป่า", "ร่วมเป็นเจ้าภาพผ้าป่าเพื่อสมทบทุนงานพระศาสนา", FALLBACK_COVER],
  ["เวียนเทียน", "ร่วมเวียนเทียนบูชาพระรัตนตรัยในวันอาสาฬหบูชา", FALLBACK_COVER],
];

const FALLBACK_OBJECTIVES = [
  ["สมทบทุนระบบสื่อสาร", "ติดตั้งโครงข่ายระบบการสื่อสารภายในวัด", "Wifi"],
  ["ดูแลความปลอดภัย", "สนับสนุนระบบความปลอดภัยเพื่อรองรับสาธุชน", "ShieldCheck"],
  ["งานพระมหาเจดีย์", "สมทบทุนก่อสร้างและบำรุงพระมหาเจดีย์สมเด็จฯ", "Landmark"],
];

const FALLBACK_BENEFITS = [
  ["ร่วมสืบทอดพระพุทธศาสนา", "Heart"],
  ["เกื้อกูลสถานที่ปฏิบัติธรรม", "Flower"],
  ["สนับสนุนสาธารณูปการของวัด", "Sparkles"],
];

const iconMap = {
  Banknote,
  BookOpen,
  CalendarDays,
  Camera,
  Flower,
  Heart,
  Landmark,
  LineChart,
  MapPin,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
};

const navConfig = [
  ["home", "เมนูหน้าแรก", Home],
  ["donors", "เมนูรายชื่อ", UserRound],
  ["donate", "เมนูทำบุญ", Banknote],
  ["schedule", "เมนูกำหนดการ", Clock],
  ["contact", "เมนูติดต่อ", MessageCircle],
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
      continue;
    }

    value += char;
  }

  row.push(value.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function readRange(rows, startColumn, columns) {
  return rows
    .map((row) => row.slice(startColumn, startColumn + columns).map((cell) => cell || ""))
    .filter((row) => row.some(Boolean));
}

function normalizeSheet(rows) {
  const donors = readRange(rows, 0, 4)
    .filter(([index, type, name, amount]) => index || type || name || amount)
    .filter(([index, type, name]) => !/ลำดับ|no\.?/i.test(index) && !/ประเภท/i.test(type) && !/ชื่อ/i.test(name))
    .map(([index, type, name, amount]) => ({ index, type, name, amount }));

  const settings = readRange(rows, 5, 2).reduce((acc, [key, value]) => {
    if (key) acc[key] = value;
    return acc;
  }, {});

  const schedule = readRange(rows, 8, 2).filter(([time, detail]) => time || detail);
  const activities = readRange(rows, 11, 3).filter(([title, detail, image]) => title || detail || image);
  const objectives = readRange(rows, 15, 3).filter(([title, detail, icon]) => title || detail || icon);
  const benefits = readRange(rows, 19, 2).filter(([title, detail]) => title || detail);

  return { donors, settings, schedule, activities, objectives, benefits };
}

function getIcon(name, fallback = Heart) {
  return iconMap[String(name || "").trim()] || fallback;
}

function moneyText(value) {
  if (!value) return "-";
  return value;
}

function formatUpdatedAt(date) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Bangkok",
  }).format(date);
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-bold ${light ? "text-temple-goldSoft" : "text-temple-gold"}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-3 text-3xl font-bold tracking-tight md:text-5xl ${light ? "text-white" : "text-temple-ink"}`}>
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-base leading-8 md:text-lg ${light ? "text-white/80" : "text-temple-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function VisakhaLandingPage() {
  const [sheet, setSheet] = useState({
    donors: [],
    settings: {},
    schedule: [],
    activities: [],
    objectives: [],
    benefits: [],
  });
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState(() => new Date());

  useEffect(() => {
    let mounted = true;

    async function loadSheet() {
      setStatus("loading");
      setError("");
      setUpdatedAt(new Date());

      try {
        const response = await fetch(`${SHEET_URL}&_=${Date.now()}`, { cache: "no-store" });
        const text = await response.text();
        if (!response.ok) throw new Error(DEFAULT_SETTINGS["ข้อความโหลดSheetไม่สำเร็จ"]);
        const parsedRows = parseCsv(text);
        if (mounted) {
          setSheet(normalizeSheet(parsedRows));
          setStatus("ready");
        }
      } catch (loadError) {
        if (mounted) {
          setError(loadError instanceof Error ? loadError.message : DEFAULT_SETTINGS["ข้อความโหลดข้อมูลไม่สำเร็จ"]);
          setStatus("error");
        }
      }
    }

    loadSheet();
    return () => {
      mounted = false;
    };
  }, []);

  const settings = {
    ...DEFAULT_SETTINGS,
    ...sheet.settings,
  };
  const navItems = navConfig.map(([id, labelKey, Icon]) => [
    id,
    settings[labelKey],
    Icon,
  ]);
  const donors = sheet.donors;
  const schedule = sheet.schedule.length ? sheet.schedule : FALLBACK_SCHEDULE;
  const activities = sheet.activities.length ? sheet.activities : FALLBACK_ACTIVITIES;
  const objectives = sheet.objectives.length ? sheet.objectives : FALLBACK_OBJECTIVES;
  const benefits = sheet.benefits.length ? sheet.benefits : FALLBACK_BENEFITS;
  const coverImage = settings["ลิงก์รูปหน้าปก"] || FALLBACK_COVER;
  const logoImage = settings["ลิงก์โลโก้วัด"];
  const qrImage = settings["ลิงก์ QR ทำบุญ"];

  const filteredDonors = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return donors;
    return donors.filter((donor) =>
      [donor.index, donor.type, donor.name, donor.amount].some((value) =>
        String(value || "").toLowerCase().includes(needle),
      ),
    );
  }, [donors, query]);

  return (
    <div id="home" className="min-h-screen overflow-x-hidden text-temple-ink bottom-safe lg:pb-0">
      <header className="fixed left-0 right-0 top-0 z-40 hidden border-b border-white/70 bg-temple-ivory/90 backdrop-blur lg:block">
        <div className="section-shell flex h-20 items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            {logoImage ? (
              <img src={logoImage} alt={settings["ข้อความAltโลโก้วัด"]} className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <span className="grid h-12 w-12 place-items-center rounded-full bg-temple-emerald text-white">
                <Landmark className="h-6 w-6" />
              </span>
            )}
            <span>
              <span className="block text-sm font-bold text-temple-emerald">{settings["ชื่อวัดไทย"]}</span>
              <span className="block text-xs text-temple-muted">{settings["ชื่อวัดอังกฤษ"]}</span>
            </span>
          </a>
          <nav className="flex items-center gap-1">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="rounded-full px-4 py-2 text-sm font-semibold text-temple-muted transition hover:bg-white hover:text-temple-emerald">
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="min-h-screen pt-5 lg:pt-28">
          <div className="section-shell grid min-h-screen items-center gap-10 py-8 md:py-12 lg:grid-cols-[1fr_0.9fr]">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-temple-goldSoft bg-white/70 px-4 py-2 text-sm font-bold text-temple-emerald">
                <Sparkles className="h-4 w-4 text-temple-gold" />
                {settings["งานบุญประจำปี"]}
              </div>
              <h1 className="mt-6 text-5xl font-black leading-tight tracking-tight text-temple-emerald md:text-7xl">
                {settings["ชื่อกิจกรรมหลัก"]}
              </h1>
              <p className="mt-4 text-2xl font-bold text-temple-gold md:text-3xl">
                {settings["ชื่อกิจกรรมรอง"]}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-9 text-temple-muted">
                {settings["คำอธิบายป้ายหลัก"]}
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-temple-goldSoft bg-white/70 p-4">
                  <CalendarDays className="h-5 w-5 text-temple-gold" />
                  <p className="mt-2 font-bold">{settings["วันที่จัดงาน"]}</p>
                  <p className="text-sm text-temple-muted">{settings["เวลาเริ่มงาน"]}</p>
                </div>
                <div className="rounded-2xl border border-temple-goldSoft bg-white/70 p-4">
                  <MapPin className="h-5 w-5 text-temple-gold" />
                  <p className="mt-2 font-bold">{settings["สถานที่"]}</p>
                  <p className="text-sm text-temple-muted">{settings["สถานที่ด้านล่าง"]}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#donate" className="inline-flex items-center gap-2 rounded-full bg-temple-emerald px-6 py-3 font-bold text-white shadow-temple transition hover:bg-temple-emeraldSoft">
                  {settings["ปุ่มร่วมทำบุญ"]} <ChevronRight className="h-4 w-4" />
                </a>
                <a href="#donors" className="inline-flex items-center gap-2 rounded-full border border-temple-gold bg-white/70 px-6 py-3 font-bold text-temple-emerald transition hover:bg-white">
                  {settings["ปุ่มดูรายชื่อ"]}
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="glass-panel rounded-[2rem] p-3">
                <div className="aspect-[3/2] overflow-hidden rounded-[1.5rem] bg-temple-cream">
                  <img src={coverImage} alt={settings["ชื่อกิจกรรมหลัก"]} className="h-full w-full object-cover" />
                </div>
                <div className="grid gap-3 p-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-bold text-temple-gold">{settings["ป้ายแนวคิดของงาน"]}</p>
                    <p className="mt-1 text-sm leading-6 text-temple-muted">{settings["แนวคิดของงาน"]}</p>
                  </div>
                  <div className="rounded-2xl bg-temple-emerald px-4 py-3 text-white">
                    <p className="text-xs text-white/70">{settings["ป้ายอัปเดตล่าสุด"]}</p>
                    <p className="mt-1 text-sm font-bold">{formatUpdatedAt(updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="donors" className="py-20">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
              <SectionHeading
                eyebrow={settings["หัวข้อย่อยรายชื่อ"]}
                title={settings["หัวข้อก่อนตาราง"]}
              />
              <div className="glass-panel rounded-3xl p-4 md:p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-temple-muted" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder={settings["ช่องค้นหารายชื่อ"]}
                      className="w-full rounded-2xl border border-temple-goldSoft bg-white px-11 py-3 outline-none ring-temple-gold/20 focus:ring-4"
                    />
                  </div>
                  <span className="rounded-full bg-temple-cream px-4 py-2 text-sm font-bold text-temple-emerald">
                    {filteredDonors.length} {settings["ป้ายจำนวนรายการ"]}
                  </span>
                </div>

                <div className="mt-5 rounded-2xl border border-temple-goldSoft bg-white">
                  <div className="donor-table-scroll">
                    <table className="min-w-[720px] w-max text-left text-sm md:min-w-full md:w-full">
                      <thead className="sticky top-0 bg-temple-emerald text-white">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-3">{settings["หัวตารางลำดับ"]}</th>
                          <th className="whitespace-nowrap px-4 py-3">{settings["หัวตารางประเภท"]}</th>
                          <th className="whitespace-nowrap px-4 py-3">{settings["หัวตารางชื่อคณะ"]}</th>
                          <th className="whitespace-nowrap px-4 py-3 text-right">{settings["หัวตารางจำนวนทำบุญ"]}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-temple-goldSoft/70">
                        {status === "loading" ? (
                          <tr>
                            <td colSpan="4" className="px-4 py-10 text-center text-temple-muted">
                              <Loader2 className="mx-auto mb-3 h-6 w-6 animate-spin" />
                              {settings["ข้อความกำลังโหลดรายชื่อ"]}
                            </td>
                          </tr>
                        ) : filteredDonors.length ? (
                          filteredDonors.map((donor, index) => (
                            <tr key={`${donor.index}-${donor.name}-${index}`} className="hover:bg-temple-cream/55">
                              <td className="whitespace-nowrap px-4 py-3 font-bold text-temple-gold">{donor.index || index + 1}</td>
                              <td className="whitespace-nowrap px-4 py-3">{donor.type || "-"}</td>
                              <td className="whitespace-nowrap px-4 py-3 font-semibold">{donor.name || "-"}</td>
                              <td className="whitespace-nowrap px-4 py-3 text-right font-bold text-temple-emerald">{moneyText(donor.amount)}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="px-4 py-10 text-center text-temple-muted">
                              {error || settings["ข้อความไม่มีรายชื่อ"]}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="objectives" className="bg-white/70 py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow={settings["หัวข้อย่อยวัตถุประสงค์"]}
              title={settings["หัวข้อวัตถุประสงค์"]}
              description={settings["คำอธิบายวัตถุประสงค์"] || settings["เนื้อหาวัตถุประสงค์"]}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {objectives.map(([title, detail, iconName], index) => {
                const Icon = getIcon(iconName, Heart);
                return (
                  <article key={`${title}-${index}`} className="rounded-3xl border border-temple-goldSoft bg-temple-ivory p-6 shadow-temple">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-temple-emerald text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-temple-emerald">{title}</h3>
                    <p className="mt-3 leading-7 text-temple-muted">{detail}</p>
                  </article>
                );
              })}
            </div>
            <p className="mt-8 max-w-4xl rounded-3xl bg-temple-cream p-6 leading-8 text-temple-muted">
              {settings["เนื้อหาวัตถุประสงค์"]}
            </p>
          </div>
        </section>

        <section id="donate" className="bg-temple-emerald py-20 text-white">
          <div className="section-shell grid gap-10 lg:grid-cols-[1fr_380px]">
            <div>
              <SectionHeading
                light
                eyebrow={settings["หัวข้อย่อยร่วมทำบุญ"]}
                title={settings["หัวข้อร่วมทำบุญ"]}
                description={settings["คำอธิบายร่วมทำบุญ"]}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {benefits.map(([title, detailOrIcon], index) => {
                  const Icon = getIcon(detailOrIcon, Flower);
                  const isIconName = Boolean(iconMap[String(detailOrIcon || "").trim()]);
                  return (
                    <article key={`${title}-${index}`} className="rounded-3xl border border-white/15 bg-white/10 p-5">
                      <Icon className="h-6 w-6 text-temple-goldSoft" />
                      <h3 className="mt-4 font-bold">{title}</h3>
                      {!isIconName && detailOrIcon ? <p className="mt-2 text-sm leading-6 text-white/75">{detailOrIcon}</p> : null}
                    </article>
                  );
                })}
              </div>
            </div>
            <aside className="rounded-3xl bg-white p-5 text-temple-ink shadow-temple">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-temple-cream">
                {qrImage ? (
                  <img src={qrImage} alt={settings["ป้ายQRCode"]} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-8 text-center text-temple-muted">
                    <Banknote className="mb-4 h-12 w-12 text-temple-gold" />
                    <p className="font-bold">{settings["ป้ายQRCode"]}</p>
                    <p className="mt-2 text-sm leading-6">{settings["คำแนะนำQRCode"]}</p>
                  </div>
                )}
              </div>
              <div className="mt-5 rounded-2xl bg-temple-cream p-5">
                <p className="text-sm font-bold text-temple-gold">{settings["ธนาคาร"]}</p>
                <p className="mt-2 text-3xl font-black text-temple-emerald">{settings["เลขบัญชี"]}</p>
                <p className="mt-2 text-temple-muted">{settings["ป้ายชื่อบัญชี"]} {settings["ชื่อบัญชี"]}</p>
              </div>
              <a href={`https://line.me/R/ti/p/${encodeURIComponent(settings["Line ID"])}`} className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-temple-emerald px-5 py-3 font-bold text-white">
                {settings["ปุ่มส่งหลักฐาน"]} {settings["Line ID"]}
              </a>
            </aside>
          </div>
        </section>

        <section id="schedule" className="py-20">
          <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                eyebrow={settings["หัวข้อย่อยกำหนดการ"]}
                title={settings["หัวข้อกำหนดการ"]}
                description={settings["คำอธิบายกำหนดการ"] || `${settings["วันที่จัดงาน"]} ${settings["เวลาเริ่มงาน"]} ${settings["ป้ายณ"]} ${settings["สถานที่จัดงาน"]}`}
              />
            </div>
            <div className="rounded-3xl border border-temple-goldSoft bg-white p-4 shadow-temple md:p-6">
              <div className="space-y-4">
                {schedule.map(([time, detail], index) => (
                  <article key={`${time}-${index}`} className="grid gap-4 rounded-2xl bg-temple-cream p-5 md:grid-cols-[120px_1fr]">
                    <p className="font-black text-temple-emerald">{time}</p>
                    <p className="leading-8 text-temple-muted">{detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="activities" className="bg-white/70 py-20">
          <div className="section-shell">
            <SectionHeading
              eyebrow={settings["หัวข้อย่อยกิจกรรม"]}
              title={settings["หัวข้อกิจกรรม"]}
            />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {activities.map(([title, detail, image], index) => (
                <article key={`${title}-${index}`} className="overflow-hidden rounded-3xl border border-temple-goldSoft bg-temple-ivory shadow-temple">
                  <div className="aspect-[3/2] bg-temple-cream">
                    <img src={image || FALLBACK_COVER} alt={title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-temple-emerald">{title}</h3>
                    <p className="mt-3 leading-7 text-temple-muted">{detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20">
          <div className="section-shell grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="rounded-3xl bg-temple-emerald p-8 text-white shadow-temple md:p-10">
              <SectionHeading light eyebrow={settings["หัวข้อย่อยติดต่อ"]} title={settings["หัวข้อติดต่อ"]} description={settings["คำอธิบายติดต่อ"]} />
              <div className="mt-8 grid gap-4">
                <a className="flex items-center gap-3 rounded-2xl bg-white/10 p-4" href={`tel:${settings["โทร"]}`}>
                  <Phone className="h-5 w-5 text-temple-goldSoft" /> {settings["โทร"]}
                </a>
                <a className="flex items-center gap-3 rounded-2xl bg-white/10 p-4" href={`https://line.me/R/ti/p/${encodeURIComponent(settings["Line ID"])}`}>
                  <MessageCircle className="h-5 w-5 text-temple-goldSoft" /> {settings["ป้ายLineOA"]}: {settings["Line ID"]}
                </a>
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                  <Facebook className="h-5 w-5 text-temple-goldSoft" /> {settings["Facebook"]}
                </div>
                {settings["แผนที่"] ? (
                  <a className="flex items-center gap-3 rounded-2xl bg-white/10 p-4" href={settings["แผนที่"]} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-5 w-5 text-temple-goldSoft" /> {settings["ปุ่มเปิดแผนที่"]}
                  </a>
                ) : null}
              </div>
            </div>
            <blockquote className="flex min-h-[360px] flex-col justify-center rounded-3xl border border-temple-goldSoft bg-white p-8 shadow-temple md:p-10">
              <p className="text-sm font-bold text-temple-gold">{settings["ป้ายพุทธพจน์"]}</p>
              <p className="mt-4 text-3xl font-bold leading-snug text-temple-emerald md:text-5xl">
                “{settings["พุทธพจน์"]}”
              </p>
              <p className="mt-6 leading-8 text-temple-muted">{settings["quote"]}</p>
            </blockquote>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-temple-goldSoft bg-temple-ivory/95 px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-2 shadow-temple backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
          {navItems.map(([id, label, Icon]) => (
            <a key={id} href={`#${id}`} className="flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-bold text-temple-muted transition hover:bg-white hover:text-temple-emerald">
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
