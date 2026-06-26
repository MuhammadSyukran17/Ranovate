# Ranovate

Website resmi **Ranovate** — software house yang menyediakan jasa desain UI/UX, pengembangan website, otomasi berbasis AI, serta konsultasi dan maintenance teknis.

## Layanan

- **Design UI/UX** — Desain antarmuka profesional untuk web dan mobile
- **Website Development** — Pembuatan website custom, landing page, company profile
- **AI Automation** — Otomasi proses bisnis dengan AI/ML
- **Consulting & Maintenance** — Dukungan teknis dan optimasi

## Teknologi

| Komponen | Teknologi |
|----------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 |
| Font | Inter, Host Grotesk, Chivo |
| Lint | ESLint 9 (flat config) |
| Testing | Playwright |

## Persiapan Lingkungan Pengembangan

Pastikan sudah terinstal:

- **Node.js** ≥ 18
- **npm** (atau yarn/pnpm/bun)

## Memulai

```bash
# Instalasi dependensi
npm install

# Jalankan server development
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser untuk melihat hasilnya.

## Perintah Tersedia

| Perintah | Fungsi |
|----------|--------|
| `npm run dev` | Jalankan server development |
| `npm run build` | Build untuk produksi |
| `npm run start` | Jalankan server produksi |
| `npm run lint` | Jalankan pengecekan kode (ESLint) |

## Struktur Proyek

```
ranovate/
├── app/
│   ├── components/          # Komponen UI
│   │   ├── PortfolioSection.tsx
│   │   └── ProcessSection.tsx
│   ├── globals.css          # Design system warna
│   ├── layout.tsx           # Layout root + font + metadata SEO
│   └── page.tsx             # Halaman utama
├── public/
│   └── images/              # Aset gambar
│       ├── portfolio/
│       └── process/
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── postcss.config.mjs
```

## Konvensi Pengembangan

- **TypeScript strict mode** — selalu gunakan tipe yang benar, tanpa `any`
- **Tanpa komentar di kode** — gunakan penamaan variabel dan fungsi yang deskriptif
- **Mobile-first** — selalu mulai dari tata letak mobile, tambah breakpoint untuk layar lebih besar
- **Aksesibilitas** — ikuti standar WCAG: semantic HTML, ARIA labels, navigasi keyboard
- **Performa** — hindari re-render yang tidak perlu, optimasi gambar dengan `next/image`
- **Commit** — gunakan format Conventional Commits, misalnya `feat(landing): tambahkan hero section`

## Deployment

Cara termudah untuk meng-deploy aplikasi Next.js ini adalah melalui [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), platform resmi dari pembuat Next.js.

Untuk informasi lebih lanjut, lihat [dokumentasi deployment Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## Lisensi

Hak cipta © Ranovate. Seluruh hak dilindungi.
