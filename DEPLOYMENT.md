# Panduan Deployment ke Vercel

Berikut adalah panduan lengkap untuk deploy aplikasi Gemini Media Generator ke Vercel.

## Prasyarat

✅ Node.js 18 atau lebih tinggi  
✅ Git terinstall  
✅ GitHub account  
✅ Vercel account (gratis)  
✅ Google Gemini API key  

## Step-by-Step Deployment

### 1️⃣ Persiapan GitHub

#### A. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Gemini Media Generator"
```

#### B. Create GitHub Repository
1. Buka [https://github.com/new](https://github.com/new)
2. Beri nama repository: `gemini-media-generator`
3. Buat repository

#### C. Push ke GitHub
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/gemini-media-generator.git
git push -u origin main
```

### 2️⃣ Vercel Deployment

#### A. Connect Vercel
1. Buka [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Klik tombol **"New Project"**
3. Pilih **"Import Git Repository"**
4. Pilih GitHub repository yang baru dibuat

#### B. Configure Project
- **Project Name**: `gemini-media-generator` (atau nama lain)
- **Root Directory**: `.` (default)
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

#### C. Environment Variables
Di halaman configuration, tambahkan environment variable:

**Key**: `NEXT_PUBLIC_API_URL`  
**Value**: Akan di-update setelah deployment (sementara bisa diisi dengan nama project)

Contoh: `https://gemini-media-generator.vercel.app`

Klik **"Deploy"**

### 3️⃣ Verifikasi Deployment

Tunggu hingga proses deploy selesai (biasanya 1-2 menit).

✅ Jika status menunjukkan "✓ Ready", deployment berhasil!  
❌ Jika ada error, check logs dan fix issues

### 4️⃣ Test Aplikasi

1. Klik link deployment yang diberikan Vercel
2. Aplikasi seharusnya terbuka di URL baru
3. Pergi ke **Settings**
4. Input Google Gemini API key Anda
5. Click **Check API Status**
6. Jika muncul "Active", semuanya sukses! ✅

## Troubleshooting

### Error: "Build Failed"

**Solusi:**
```bash
# Cek error logs di Vercel dashboard
# Biasanya karena:
# 1. Missing dependencies - jalankan: npm install
# 2. Node version mismatch - pastikan Node 18+
# 3. Environment variables belum diset
```

### Error: "API Key Invalid"

**Solusi:**
1. Verifikasi API key dari https://aistudio.google.com/app/apikey
2. Pastikan tidak ada space atau character tambahan
3. Jika sudah expired, buat key baru

### Aplikasi Blank / Tidak Load

**Solusi:**
1. Clear browser cache: `Ctrl+Shift+Delete`
2. Hard refresh: `Ctrl+Shift+R` (Windows) atau `Cmd+Shift+R` (Mac)
3. Check console errors: `F12` > Console tab
4. Cek Vercel deployment logs

## Update Aplikasi

Setiap kali ada perubahan:

```bash
# 1. Commit changes
git add .
git commit -m "Deskripsi perubahan"

# 2. Push ke GitHub
git push origin main

# 3. Vercel otomatis redeploy
# (Monitor di https://vercel.com/dashboard)
```

## Optimize untuk Production

### A. Environment Variables
Update `.env.local`:
```bash
NEXT_PUBLIC_API_URL=https://gemini-media-generator.vercel.app
```

### B. Performance Optimization
Sudah dikonfigurasi:
- ✅ Image optimization
- ✅ Code splitting
- ✅ CSS minification
- ✅ Automatic compression

### C. Security
- ✅ API keys tidak disimpan di frontend
- ✅ Server-side validation
- ✅ HTTPS enforced
- ✅ CORS protection

## Domain Custom (Optional)

Jika ingin menggunakan domain sendiri:

1. Buka **Settings** di project Vercel
2. Pergi ke **Domains**
3. Tambahkan domain Anda
4. Update DNS records sesuai instruksi Vercel
5. Wait untuk propagation (5-48 jam)

Contoh domain: `media-generator.yourdomain.com`

## Monitoring & Analytics

Di Vercel Dashboard:
- **Deployments**: Lihat history deployment
- **Analytics**: Performance metrics
- **Logs**: Real-time logs aplikasi
- **Settings**: Configure lebih lanjut

## Backup & Rollback

Jika perlu rollback ke versi sebelumnya:

1. Buka **Deployments** di Vercel
2. Cari deployment yang ingin di-restore
3. Klik **Promote to Production**
4. Verifikasi aplikasi bekerja

## Cost Estimation

**Vercel Free Plan mencakup:**
- ✅ 100GB bandwidth per bulan
- ✅ Unlimited deployments
- ✅ Unlimited serverless functions
- ✅ Unlimited projects
- ✅ Built-in CI/CD

**Untuk production heavy traffic:** Upgrade ke Vercel Pro ($20/month)

## Support & Resources

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 📖 [Vercel Docs](https://vercel.com/docs)
- 📖 [Gemini API Docs](https://ai.google.dev/docs)
- 💬 [Vercel Support](https://vercel.com/support)

## Summary Checklist

- [ ] GitHub repository dibuat
- [ ] Code di-push ke GitHub
- [ ] Vercel project di-create
- [ ] Environment variables di-set
- [ ] Deployment sukses
- [ ] Aplikasi di-test di production
- [ ] API key working
- [ ] (Optional) Custom domain di-setup

---

**Selamat! 🎉 Aplikasi Anda sudah live!**

Jika ada pertanyaan atau masalah, baca troubleshooting section atau hubungi support.
