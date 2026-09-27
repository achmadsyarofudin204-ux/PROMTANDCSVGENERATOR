# 🚀 Quick Start Guide

Setup dan deploy aplikasi hanya dalam 5 menit!

## 1. Siapkan API Key (2 menit)

1. Buka https://aistudio.google.com/app/apikey
2. Klik **"Create API Key"**
3. Copy API key Anda (format: `AIzaSy...`)
4. Save di tempat aman

## 2. Setup Lokal (1 menit)

```bash
# Clone atau ekstrak project
cd gemini-media-generator

# Install dependencies
npm install

# Run development server
npm run dev
```

Buka http://localhost:3000 di browser

## 3. Masukkan API Key (30 detik)

1. Klik **Settings** (⚙️) di atas kanan
2. Paste API key di text area
3. Klik **Check API Status** (harus muncul "Active")
4. Klik **Save & Close**

## 4. Generate Content (1 menit)

1. Pilih: **Image** atau **Video**
2. Pilih: **Category**
3. Klik: **Generate**
4. Tunggu hasil muncul

## 5. Deploy ke Vercel (1-2 menit)

### Option A: Automatic (Recommended)
```bash
npm install -g vercel
vercel
```
Follow instructions di terminal.

### Option B: Manual via Dashboard
1. Buka https://vercel.com
2. Sign in dengan GitHub
3. Klik **"New Project"**
4. Select repository dari GitHub
5. Klik **Deploy**
6. Update environment variable `NEXT_PUBLIC_API_URL`
7. Done! ✅

---

## 🎯 Selesai!

Aplikasi Anda sekarang **LIVE** di Vercel! 🎉

### Links Penting
- 📱 App URL: `https://[your-project].vercel.app`
- ⚙️ Vercel Dashboard: https://vercel.com/dashboard
- 📚 Dokumentasi: Check `README.md`
- 🆘 Deploy Guide: Check `DEPLOYMENT.md`

---

## ⚡ Tips & Tricks

### Multiple API Keys
Kalau 1 key capai quota, bisa pakai 2-3 key sekaligus:
```
AIzaSy...xxxxx
AIzaSy...yyyyy
AIzaSy...zzzzz
```
Sistem otomatis fallback ke key berikutnya!

### Custom Prompt
Bukan hanya pilihan kategori, bisa custom prompt:
1. Check **"Use Custom Prompt"**
2. Tulis deskripsi yang lebih detail
3. Generate!

### Theme
Ada dark mode (default) dan light mode:
- Klik icon ☀️/🌙 di atas kanan

### Model Selection
Pilih model sesuai kebutuhan:
- **Flash (Default)**: Cepat, cocok buat testing
- **Flash Lite**: Paling ringan
- **Pro**: Paling bagus, tapi lebih lambat
- **2.0 Flash**: Mid-range

---

## ✅ Checklist

- [ ] API Key sudah didapat
- [ ] Project sudah dijalankan locally
- [ ] API Key sudah di-test
- [ ] Sudah bisa generate content
- [ ] Sudah di-deploy ke Vercel
- [ ] Live URL sudah bisa diakses
- [ ] API Key Vercel sudah di-update

---

**Enjoy your Media Generator! 🎨✨**

Untuk bantuan lebih lanjut, baca:
- `README.md` - Dokumentasi lengkap
- `DEPLOYMENT.md` - Panduan detail deployment
