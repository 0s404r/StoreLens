# StoreLens — أداة فحص الـ E-commerce بالعربي

أداة Audit عربية بتفحص ستور الـ e-commerce وبتقولك بالظبط فين بتخسر فلوس وإزاي تصلحه.
بتدي scan مجاني للزائر، ثم $2 لكل scan إضافي أو $15 لحزمة 10 scans.

---

## التكنولوجي ستاك

- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS
- **Backend**: Next.js API routes + Supabase (Postgres + Auth)
- **AI**: Claude API (Sonnet 4.6) لتحليل الـ UX النوعي
- **Performance**: Google PageSpeed Insights API
- **Screenshots**: ScreenshotOne
- **Payments**: Lemon Squeezy (Merchant of Record — بيشتغل من مصر)
- **Hosting**: Vercel (لازم Pro plan للـ 60s function timeout)

---

## Setup خطوة بخطوة

### 1. متطلبات قبل ما تبدأ

- Node.js 20+ ([nodejs.org](https://nodejs.org))
- حساب GitHub
- حساب Supabase (مجاناً) → [app.supabase.com](https://app.supabase.com)
- حساب Anthropic API → [console.anthropic.com](https://console.anthropic.com)
- حساب Google Cloud لـ PageSpeed API (مجاناً) → [console.cloud.google.com](https://console.cloud.google.com)
- حساب ScreenshotOne (مجاناً 100 شهرياً) → [screenshotone.com](https://screenshotone.com)
- حساب Lemon Squeezy → [lemonsqueezy.com](https://lemonsqueezy.com)
- حساب Vercel (Pro للـ production) → [vercel.com](https://vercel.com)

### 2. نزل المشروع وثبّت الـ dependencies

```bash
# فك ضغط الـ zip اللي نزلته
unzip storelens-scaffold.zip
cd ecom-audit-tool

# نصّب الـ packages
npm install
```

### 3. اعمل Supabase project

1. روح [app.supabase.com](https://app.supabase.com) → **New Project**
2. اختار اسم، اختار region قريب (Frankfurt أو London أحسن للسوق المصري)، حط password قوي
3. استنى ٢ دقيقة لحد ما الـ project يجهز
4. روح **SQL Editor** → **New Query**
5. افتح ملف `supabase/migrations/0001_initial.sql` من المشروع
6. انسخ المحتوى كله، الصقه في الـ SQL Editor، واضغط **RUN**
7. لازم تشوف "Success" بدون errors

### 4. اجمع الـ API keys

من Supabase (**Project Settings → API**):
- `NEXT_PUBLIC_SUPABASE_URL` → Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → anon public key
- `SUPABASE_SERVICE_ROLE_KEY` → service_role key (سري، متشاركوش)

من Anthropic ([console.anthropic.com](https://console.anthropic.com) → **API Keys**):
- `ANTHROPIC_API_KEY` → اعمل key جديد

من Google Cloud:
1. روح [console.cloud.google.com](https://console.cloud.google.com)
2. اعمل project جديد
3. اعمل enable لـ "PageSpeed Insights API" من Library
4. روح **APIs & Services → Credentials → Create API Key**
5. `PAGESPEED_API_KEY` → الـ key اللي اتعمل

من ScreenshotOne ([screenshotone.com](https://screenshotone.com) → **Dashboard → Access Keys**):
- `SCREENSHOTONE_ACCESS_KEY`

من Lemon Squeezy (راجع section "Lemon Squeezy Setup" تحت):
- `LEMONSQUEEZY_API_KEY`
- `LEMONSQUEEZY_STORE_ID`
- `LEMONSQUEEZY_WEBHOOK_SECRET`
- `LEMONSQUEEZY_VARIANT_SINGLE`
- `LEMONSQUEEZY_VARIANT_PACK_10`

### 5. اعمل ملف `.env.local`

```bash
cp .env.example .env.local
# دلوقتي افتح .env.local وحط الـ keys بتاعتك
```

تأكد إن `NEXT_PUBLIC_WHATSAPP_NUMBER` فيه رقمك بالصيغة الدولية بدون `+`:
- مثلاً: `201234567890` (مصر = 20)

### 6. شغل المشروع locally

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000) وجرّب تعمل scan لأي ستور (مثلاً `apple.com` أو ستور Shopify).

أول scan هياخد ٢٠-٤٠ ثانية لأنه بيشغل PageSpeed + screenshot + scraping + Claude analysis بالتوازي.

---

## Lemon Squeezy Setup

### اعمل الـ store والـ products

1. روح [app.lemonsqueezy.com](https://app.lemonsqueezy.com) → سجل واتأكد من الـ email
2. **Stores → New Store** → اختار اسم الـ store (مثلاً "StoreLens")
3. Store ID هتلاقيه في الـ URL: `app.lemonsqueezy.com/stores/{store-id}` → دي قيمة `LEMONSQUEEZY_STORE_ID`

### اعمل 2 products

**Product 1: Single Scan**
- Name: "Single Scan"
- Type: Single Payment
- Price: $2 USD
- بعد ما تعمله، ادخل على الـ variant → خد الـ Variant ID → ده قيمة `LEMONSQUEEZY_VARIANT_SINGLE`

**Product 2: 10-Pack Scans**
- Name: "10 Scans Pack"
- Type: Single Payment
- Price: $15 USD
- خد الـ Variant ID → `LEMONSQUEEZY_VARIANT_PACK_10`

### اعمل API key + webhook

1. **Settings → API → Create API Key** → احفظه في `LEMONSQUEEZY_API_KEY`
2. **Settings → Webhooks → + Add a new webhook**:
   - URL: `https://your-domain.vercel.app/api/webhook/lemonsqueezy` (هضيف الـ route ده في الـ commit الجاي)
   - Events: `order_created`, `order_refunded`
   - Signing Secret: اختار password قوي → `LEMONSQUEEZY_WEBHOOK_SECRET`

---

## Deployment على Vercel

### 1. ادفع المشروع على GitHub

```bash
git init
git add .
git commit -m "Initial StoreLens scaffold"

# اعمل repo جديد على github.com (private لو حابب)
# بعدها:
git remote add origin git@github.com:YOUR-USERNAME/storelens.git
git branch -M main
git push -u origin main
```

### 2. اربط Vercel بالـ repo

1. روح [vercel.com](https://vercel.com) → **Add New → Project**
2. اختار الـ GitHub repo اللي عملته
3. Framework Preset: **Next.js** (هيكتشفه أوتوماتيك)
4. **Environment Variables**: انسخ كل المتغيرات من `.env.local` (ما عدا ال `NEXT_PUBLIC_APP_URL`)
   - `NEXT_PUBLIC_APP_URL` → خليه `https://your-project.vercel.app` (هيتعدل بعد الـ deploy)
5. اضغط **Deploy**

### 3. Upgrade لـ Vercel Pro

⚠️ **مهم**: الـ free plan بياخد 10s timeout بس، والـ audit بياخد 20-40s. لازم Pro plan ($20/شهر) عشان تـ 60s timeout.

في `/api/scan/route.ts` فيه `export const maxDuration = 60;` — ده محتاج Pro plan عشان يشتغل.

### 4. تحديث الـ Webhook URL في Lemon Squeezy

بعد أول deploy:
- روح Lemon Squeezy → Webhooks
- عدّل الـ URL لـ `https://your-actual-domain.vercel.app/api/webhook/lemonsqueezy`

---

## بناء الكود (Structure)

```
ecom-audit-tool/
├── app/
│   ├── layout.tsx              # Root layout, fonts, RTL
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Tailwind + custom styles
│   ├── api/
│   │   └── scan/route.ts       # POST /api/scan — main audit endpoint
│   ├── scan/[id]/page.tsx      # Results page
│   └── auth/callback/          # (TODO) Supabase auth callback
├── components/
│   ├── url-input.tsx           # URL input form
│   ├── score-card.tsx          # Module score display
│   └── finding-card.tsx        # Individual finding card
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Browser Supabase client
│   │   ├── server.ts           # Server + service-role clients
│   │   └── types.ts            # Database types
│   ├── audit/
│   │   ├── orchestrator.ts     # Runs all modules, assembles findings
│   │   ├── performance.ts      # PageSpeed API wrapper
│   │   ├── scraper.ts          # HTML scraper (cheerio)
│   │   ├── tracking.ts         # Pixel detection (Meta, TikTok, GA4, GTM)
│   │   ├── claude.ts           # Claude API for UX/conversion findings
│   │   ├── screenshot.ts       # ScreenshotOne wrapper
│   │   ├── scoring.ts          # Score calculation
│   │   └── findings/           # Rule-based finding generators
│   ├── lemonsqueezy/           # (TODO) Payment helpers
│   └── utils/url.ts            # URL validation, IP hashing
└── supabase/
    └── migrations/
        └── 0001_initial.sql    # DB schema + RLS + triggers
```

---

## اللي شغّال دلوقتي ✓

- [x] Scan مجاني للزوار (anonymous، 1 لكل IP)
- [x] PageSpeed Audit (mobile + desktop)
- [x] HTML scraping + platform detection (Shopify/WooCommerce/Salla/Zid)
- [x] Pixel detection (Meta, TikTok, GA4, GTM, Snap, Google Ads, Pinterest)
- [x] Event coverage analysis للـ Meta و TikTok
- [x] Claude AI analysis للـ UX/Conversion/Trust
- [x] Findings مكتوبين بالمصري بخطوات حل واضحة
- [x] Score calculation (Overall + 7 sub-scores)
- [x] Results page بلون editorial + RTL
- [x] WhatsApp deep links لكل finding (للـ DFY upsell)
- [x] Anonymous IP-hash tracking لمنع abuse
- [x] Supabase RLS + atomic credit consumption

## اللي محتاج يتعمل في الـ commit الجاي

- [ ] `app/api/webhook/lemonsqueezy/route.ts` — استقبال الـ payment webhook
- [ ] `lib/lemonsqueezy/client.ts` — توليد checkout URLs
- [ ] `app/auth/login` + `app/auth/signup` — صفحات الـ auth
- [ ] `app/auth/callback/route.ts` — Supabase auth callback
- [ ] `middleware.ts` — Session refresh
- [ ] PDF generation للـ reports (مع watermark)
- [ ] Polling مكان الـ inline execution (UX أحسن)
- [ ] Rate limiting على `/api/scan`

---

## الـ Unit Economics

| البند | التكلفة |
|---|---|
| Claude Sonnet 4.6 (~10K in + 3K out) | $0.08 |
| ScreenshotOne | $0.03 |
| Vercel function runtime | $0.01 |
| PageSpeed API | مجاناً |
| **إجمالي تكلفة scan** | **~$0.12** |

| الـ Tier | Revenue | LS fees | تكلفة الـ scans | الربح الصافي |
|---|---|---|---|---|
| Free scan | $0 | - | $0.12 | -$0.12 (lead gen) |
| Single $2 | $2.00 | -$0.60 | -$0.12 | **$1.28** |
| Pack of 10 = $15 | $15.00 | -$1.25 | -$1.20 | **$12.55** |

الـ DFY service ($200-$2000) هي الـ real revenue driver. الـ scans هي lead generation.

---

## Troubleshooting

**Build fails على Vercel بـ "Module not found":**
امسح `.next` و `node_modules` و `package-lock.json` محلياً، اعمل `npm install` تاني، و push.

**الـ audit بيـ timeout:**
تأكد إنك على Vercel Pro plan، والـ `maxDuration = 60` موجود في `app/api/scan/route.ts`.

**Claude بيرجع response غريب:**
شيك إن `CLAUDE_MODEL` متضبط على `claude-sonnet-4-6` (مش `claude-3-sonnet` القديم).

**PageSpeed بيرجع error 403:**
الـ API key مش متفعلة. روح Google Cloud Console واتأكد إن PageSpeed Insights API enabled على الـ project.

**الـ screenshot مش بيظهر:**
شيك حد الـ free tier (100/شهر). لو خلصته، الـ audit هيكمل بدون screenshot (Claude هيشتغل بـ HTML بس).

---

## License

Private. كل الحقوق محفوظة.

---

أي مشكلة في الـ setup؟ راجع الـ `.env.example` للـ keys المطلوبة، وتأكد إن كل API enabled.
