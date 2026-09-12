// Algorithm-practice section is built but hidden until there is real data to show.
// Flip to true once LeetCode/NeetCode/AlgoLeague stats exist.
export const SHOW_ALGO_STATS = false;

export const SITE = {
  name: "Bahattin Böber",
  wordmark: "BAHATTİN BÖBER",
  role: "Full-Stack & AI/ML Mühendisi",
  githubUser: "bahattinbober",
  email: "boberbahattin@gmail.com",
  linkedin: "https://www.linkedin.com/in/bahattin-bober/",
  github: "https://github.com/bahattinbober",
  cvHref: "/Bahattin-Bober-CV.pdf",
  cvFilename: "Bahattin-Bober-CV.pdf",
};

export interface Project {
  id: string;
  order: number;
  title: string;
  tag: string;
  // Gets the extra metric/architecture visualization alongside its photo —
  // every project is otherwise an equal-weight block in the gallery.
  richViz: boolean;
  color: string; // primary editorial accent, hex
  colorSecondary?: string;
  summary: string;
  description: string;
  tech: string[];
  liveHref?: string;
  liveLabel?: string;
  codeHref?: string;
  metric?: { label: string; value: string; sublabel?: string };
  // Real photo for this project's block — file under public/images/buildings/.
  // Omitted for projects without a photo yet (a gradient block fills in).
  photo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "vadebekcisi",
    order: 1,
    title: "VadeBekçisi",
    tag: "B2B SaaS · Yasal Yenileme Takibi",
    richViz: false,
    color: "#34d399",
    colorSecondary: "#fbbf24",
    summary:
      "Türk KOBİ'leri ve mali müşavirler için ticaret sicili, oda aidatı, İSG ve sigorta gibi yasal/idari yenileme tarihlerini takip eden çok kiracılı SaaS.",
    description:
      "KOBİ'ler ve mali müşavirler için yasal/idari yenileme tarihi takip platformu. Çok kiracılı mimari, JWT kimlik doğrulama, cron tabanlı otomatik e-posta bildirimleri ve yapılandırılmamış metinden Claude API ile yapay zekâ destekli veri çıkarımı içeriyor.",
    tech: ["Node.js", "Express", "PostgreSQL", "React", "Prisma", "Docker", "Claude API"],
    liveHref: "https://vadebekcisi.vercel.app",
    liveLabel: "Canlı Demo",
    codeHref: "https://github.com/bahattinbober/vadebekcisi",
    photo: "pexels-introspectivedsgn-18462159.jpg",
  },
  {
    id: "nod",
    order: 2,
    title: "NOD",
    tag: "Semantik İş Eşleştirme + Referans Keşfi",
    richViz: true,
    color: "#38bdf8",
    colorSecondary: "#6366f1",
    summary:
      "Yüklenen bir CV'yi embedding'e çevirip pgvector ile kosinüs benzerliğine göre ilanlarla eşleştiren, ardından kullanıcının LinkedIn bağlantılarından hangilerinin o şirketlerde çalıştığını bulan platform.",
    description:
      "CV'yi embedding'e dönüştürüp pgvector üzerinden kosinüs benzerliğiyle iş ilanlarıyla eşleştiren, kullanıcının LinkedIn ağındaki referans bağlantılarını ortaya çıkaran ve role özel bir referans mesajı taslağı hazırlayan bir iş eşleştirme platformu. PDF ayrıştırma ve embedding üretimi istek döngüsünde değil BullMQ kuyruğunda çalışıyor; altyapı Terraform ile 36 AWS kaynağı olarak tanımlı.",
    tech: ["NestJS", "PostgreSQL", "pgvector", "Redis", "BullMQ", "Next.js", "Three.js", "GSAP", "Terraform", "AWS"],
    liveHref: "https://nod.bahattinbober.com",
    liveLabel: "Projeyi Aç",
    codeHref: "https://github.com/bahattinbober/job-platform-backend",
    metric: { label: "Altyapı", value: "36", sublabel: "Terraform ile tanımlı AWS kaynağı" },
    photo: "j-f-3rUxZgn2PBs-unsplash.jpg",
  },
  {
    id: "alzheimer",
    order: 3,
    title: "Alzheimer MRI Sınıflandırıcı",
    tag: "Görüntü Sınıflandırma · Hesaplamalı Sinirbilim",
    richViz: true,
    color: "#93c5fd",
    colorSecondary: "#e0f2fe",
    summary:
      "Hesaplamalı Sinirbilim dersi kapsamında başlayan, MRI taramalarından Alzheimer evresini sınıflandıran EfficientNet-B0 tabanlı model.",
    description:
      "Hesaplamalı Sinirbilim dersi kapsamında başlayan bir görüntü sınıflandırma projesi. EfficientNet-B0 mimarisi transfer öğrenme ile MRI taramaları üzerinde ince ayarlanarak dört sınıflı Alzheimer evrelemesinde %99,79 test doğruluğuna ulaştı.",
    tech: ["Python", "PyTorch", "EfficientNet-B0", "Transfer Learning", "scikit-learn"],
    codeHref: "https://github.com/bahattinbober/alzheimer-mri-classifier",
    metric: { label: "Test Doğruluğu", value: "99.79%", sublabel: "4 sınıflı Alzheimer evrelemesi" },
    photo: "german-lopez-m0gIWauW7QM-unsplash.jpg",
  },
  {
    id: "kaplumbaga",
    order: 4,
    title: "Kaplumbağa Atölyesi",
    tag: "Tarayıcı Tabanlı Kodlama Eğitimi",
    richViz: false,
    color: "#fb923c",
    colorSecondary: "#facc15",
    summary:
      "Python, JavaScript ve TypeScript'i 21 kademeli dersle öğreten, tarayıcı tabanlı interaktif eğitim platformu.",
    description:
      "Yeni başlayanlara Python, JavaScript ve TypeScript öğreten, tarayıcı içinde çalışan interaktif bir eğitim platformu. 21 kademeli ders, anlık kod çalıştırma ve ilerleme takibi içeriyor.",
    tech: ["TypeScript", "React", "Next.js", "Monaco Editor"],
    codeHref: "https://github.com/bahattinbober/kaplumbaga-atolyesi",
    photo: "pexels-allen-boguslavsky-1344061-19346063.jpg",
  },
  {
    id: "universite-personel-takip",
    order: 5,
    title: "Üniversite Personel Takip Sistemi",
    tag: "Bitirme Tezi · QR + GPS Karar Destek",
    richViz: false,
    color: "#2dd4bf",
    colorSecondary: "#0ea5e9",
    summary:
      "QR ve GPS tabanlı personel takip ve karar destek sistemi. Bitirme tezi olarak geliştirildi, Pamukkale Teknokent'te sunuldu.",
    description:
      "Kampüs personelinin QR kod taramaları ve GPS konum verisiyle takip edildiği, KPI skorlamasıyla desteklenen bir karar destek sistemi. Bilgisayar Mühendisliği bitirme tezi olarak geliştirildi ve Pamukkale Teknokent'te sunuldu.",
    tech: ["Flutter", "Node.js", "Express", "SQLite"],
    codeHref: "https://github.com/bahattinbober/university-cleaning-tracker",
    photo: "anthony-mucci-IWEUF3VcERc-unsplash.jpg",
  },
  {
    id: "parca-takip",
    order: 6,
    title: "Parça Takip",
    tag: "Oto Tamirhanesi · Çok Kiracılı Envanter",
    richViz: false,
    color: "#f87171",
    colorSecondary: "#94a3b8",
    summary:
      "Oto tamirhaneleri için QR taramalı, çok kiracılı parça envanter takip sistemi.",
    description:
      "Oto tamirhanelerinin parça stoklarını QR kod taramasıyla takip ettiği, çok kiracılı (multi-tenant) bir envanter yönetim sistemi.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
    codeHref: "https://github.com/bahattinbober/parca-takip",
    photo: "pexels-akbar-tarakai-2148031714-39194176.jpg",
  },
  {
    id: "konak-taksi",
    order: 7,
    title: "Konak Taksi",
    tag: "Yerel İşletme Web Sitesi",
    richViz: false,
    color: "#facc15",
    colorSecondary: "#f59e0b",
    summary: "Bir taksi durağı için hazırlanan tanıtım ve iletişim sitesi. Detaylar yakında eklenecek.",
    description:
      "Bir taksi durağı için hazırlanan tanıtım ve iletişim sitesi. Proje sayfası şu anda hazırlanıyor — tam açıklama ve canlı bağlantı yakında burada olacak.",
    tech: [],
  },
];

export const INTERNSHIPS = [
  { company: "Technoone", role: "Yazılım Stajyeri" },
  { company: "Kapsül DX", role: "Yazılım Stajyeri" },
];

export const EDUCATION = {
  gpa: "3.20",
  gpaMax: "4.00",
};
