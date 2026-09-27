# Gemini Media Generator

Aplikasi web untuk membuat gambar dan video menggunakan Google Gemini API. Dibangun dengan Next.js dan React, dan dapat di-deploy ke Vercel.

## Fitur

✨ **Generasi Gambar & Video**
- Support multiple format gambar (JPG, PNG, Vector)
- Berbagai kategori konten yang sudah disediakan
- Custom prompt support
- Multiple design styles

🔑 **API Key Management**
- Kelola banyak API key sekaligus
- Automatic fallback jika key mencapai quota
- Check status API key secara real-time
- Dark/Light theme support

⚡ **Multiple Gemini Models**
- Gemini 3 Flash Preview (Default)
- Gemini 2.5 Flash Lite
- Gemini 2.5 Pro
- Gemini 2.0 Flash

## Tech Stack

- **Frontend**: React 18, Next.js 14, Tailwind CSS
- **Icons**: Lucide React
- **API**: Google Generative AI (Gemini)
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- Google Gemini API key (dapatkan dari [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey))
- Git
- Vercel account (untuk deployment)

## Setup Lokal

### 1. Clone Repository
```bash
git clone <repository-url>
cd gemini-media-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` dan tambahkan konfigurasi Anda jika diperlukan.

### 4. Jalankan Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Cara Menggunakan

### 1. Tambahkan API Key
- Klik **Settings** di bagian atas kanan
- Paste Google Gemini API key Anda (satu per baris jika multiple)
- Klik **Check API Status** untuk verifikasi
- Klik **Save & Close**

### 2. Buat Media
- Pilih tipe media: **Image** atau **Video**
- Pilih **Category** atau gunakan **Custom Prompt**
- Untuk Image: Pilih Format dan Style
- Klik **Generate** untuk mulai

### 3. Manajemen API Key
- Jika menggunakan multiple keys, sistem otomatis fallback ke key berikutnya jika terjadi quota limit
- Semua status ditampilkan di Settings panel

## Deploy ke Vercel

### Langkah 1: Push ke GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Langkah 2: Connect ke Vercel
1. Buka [https://vercel.com](https://vercel.com)
2. Login dengan akun GitHub Anda
3. Klik **New Project**
4. Select repository ini
5. Klik **Import**

### Langkah 3: Configure Environment Variables
Di Vercel Dashboard:
1. Pergi ke **Settings** > **Environment Variables**
2. Tambahkan:
   ```
   NEXT_PUBLIC_API_URL=https://your-deployment-url.vercel.app
   ```
3. Klik **Deploy**

### Langkah 4: Done!
Aplikasi Anda sekarang live di Vercel. Akses melalui URL yang diberikan Vercel.

## Struktur Project

```
.
├── app/
│   ├── api/
│   │   ├── check-key/route.js      # API endpoint untuk check API key
│   │   └── generate/route.js        # API endpoint untuk generate content
│   ├── components/
│   │   └── MediaGenerator.jsx       # Main component
│   ├── layout.js                    # Root layout
│   ├── page.js                      # Home page
│   └── globals.css                  # Global styles
├── public/                          # Static files
├── package.json                     # Dependencies
├── tailwind.config.js              # Tailwind config
├── postcss.config.js               # PostCSS config
├── next.config.js                  # Next.js config
└── README.md                        # This file
```

## API Endpoints

### POST `/api/check-key`
Verifikasi validitas Google Gemini API key.

**Request Body:**
```json
{
  "apiKey": "AIzaSy..."
}
```

**Response:**
```json
{
  "status": "active" // atau "limit", "error"
}
```

### POST `/api/generate`
Generate gambar atau video dengan prompt.

**Request Body:**
```json
{
  "prompt": "Beautiful landscape in cyberpunk style",
  "apiKey": "AIzaSy...",
  "model": "gemini-3-flash-preview",
  "mediaType": "image",
  "format": "jpg"
}
```

**Response:**
```json
{
  "success": true,
  "content": "Generated content...",
  "model": "gemini-3-flash-preview",
  "mediaType": "image",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Troubleshooting

### API Key Error
- Pastikan API key dari [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- Check API key validity dengan tombol "Check API Status"
- Jika masih error, buat API key baru

### Quota Limit
- Gunakan multiple API keys
- Sistem otomatis akan switch ke key berikutnya
- Tunggu sampai quota reset (biasanya per jam/hari)

### Build Error di Vercel
- Pastikan Node.js version kompatibel
- Clear cache di Vercel: Settings > Deployments > Clear all builds
- Redeploy project

## Environment Variables

### Untuk Local Development
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Untuk Production (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://your-deployment-url.vercel.app
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Support

Jika ada masalah atau pertanyaan:
1. Check Troubleshooting section
2. Review [Google Gemini API Documentation](https://ai.google.dev/docs)
3. Check [Next.js Documentation](https://nextjs.org/docs)

## Contributing

Pull requests welcome! Untuk major changes, buka issue terlebih dahulu untuk discuss changes.

---

**Dibuat dengan ❤️ menggunakan Next.js dan Google Gemini API**
