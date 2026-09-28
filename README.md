# 🧠 Algoritma & Struktur Data dari Nol (AlgoDariNol)

Website edukasi statis untuk orang yang **benar-benar pemula** dalam programming.
Konsep algoritma & struktur data dijelaskan dengan **bahasa sederhana, analogi kehidupan
sehari-hari, visualisasi interaktif, contoh kode, dan latihan**.

Dibuat murni dengan **HTML5 + CSS3 + Vanilla JavaScript**.
Tanpa React, tanpa backend, tanpa database → bisa langsung di-host di **GitHub Pages**.

---

## 1. Struktur folder

```text
algoritma-struktur-data/
│
├── index.html            ← halaman utama (semua halaman dirender di sini)
├── materi.html           ← pintasan ke index.html#/materi
├── visualisasi.html      ← pintasan ke index.html#/visualisasi
├── latihan.html          ← pintasan ke index.html#/latihan
├── glossary.html         ← pintasan ke index.html#/kamus
├── about.html            ← pintasan ke index.html#/tentang
├── bingung.html          ← pintasan ke index.html#/bingung
│
├── css/
│   └── style.css         ← seluruh tampilan (light + dark mode, responsive)
│
├── js/
│   ├── script.js         ← navbar, dark mode, router sederhana (#/halaman)
│   ├── util.js           ← fungsi kecil: localStorage, progress, mini-markdown
│   ├── halaman.js        ← Beranda, Kamus, Tentang, "Aku Bingung"
│   ├── materi.js         ← halaman Belajar (sidebar, bedah kode, progress)
│   ├── materi-data.js    ← penggabung kurikulum + fungsi pencarian materi
│   ├── data-dasar.js     ← materi Level 0–2
│   ├── data-struktur.js  ← materi Level 3–9
│   ├── data-algoritma.js ← materi Level 10–12
│   ├── visualisasi.js    ← 9 alat peraga interaktif
│   ├── latihan.js        ← kuis bertingkat + mini project
│   └── playground.js     ← Python Playground sederhana (simulator)
│
└── assets/
    └── favicon.svg
```

### Kenapa halaman memakai `#/` (hash routing)?

Supaya **satu halaman terasa seperti banyak halaman** tanpa server sama sekali:

- `index.html#/materi/stack` → materi Stack
- `index.html#/visualisasi/tree` → langsung meluncur ke visualisasi Tree

Keuntungannya: tidak ada link rusak, tidak perlu konfigurasi server, dan tetap 100% jalan
di GitHub Pages. File `materi.html`, `latihan.html`, dll. tetap disediakan sebagai
pintasan supaya URL yang mudah diingat tetap bisa dibuka langsung.

---

## 2. Cara menjalankan secara lokal

Website ini memakai **ES Modules** (`<script type="module">`), jadi sebaiknya dibuka lewat
server lokal kecil (bukan klik dua kali `index.html`).

**Pilihan A — VS Code (paling gampang)**

1. Buka foldernya di VS Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.

**Pilihan B — Python (sudah ada di banyak komputer)**

```bash
cd algoritma-struktur-data
python -m http.server 8000
```

Lalu buka: `http://localhost:8000`

**Pilihan C — Node.js**

```bash
npx serve .
```

---

## 3. Cara upload ke GitHub

```bash
cd algoritma-struktur-data

git init
git add .
git commit -m "Website belajar algoritma & struktur data dari nol"
git branch -M main
git remote add origin https://github.com/USERNAME/algoritma-struktur-data.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub kamu.
Kalau belum punya repository: buka github.com → **New repository** → beri nama
`algoritma-struktur-data` → **Create repository** (jangan centang "Add README").

Tidak mau pakai terminal? Bisa juga: **Add file → Upload files** di halaman repository,
lalu seret semua file & folder ke sana.

---

## 4. Cara mengaktifkan GitHub Pages

Project ini sudah memiliki workflow `.github/workflows/deploy-pages.yml`.
Workflow akan melakukan build dan hanya mempublikasikan file yang memang dibutuhkan browser.
Ini adalah cara yang disarankan dan mencegah halaman putih akibat folder yang salah.

1. Pastikan `index.html`, folder `js`, folder `css`, `package.json`, dan folder `.github`
   berada langsung di root repository — jangan berada di dalam satu folder tambahan.
2. Buka repository di GitHub.
3. Klik tab **Settings**.
4. Menu kiri → **Pages**.
5. Bagian **Build and deployment → Source** → pilih **GitHub Actions**.
6. Buka tab **Actions** dan pilih workflow **Deploy AlgoDariNol ke GitHub Pages**.
7. Tunggu sampai job `build` dan `deploy` mendapat tanda centang hijau.
8. Kembali ke **Settings → Pages** untuk melihat alamat website.

Website kamu akan tersedia di:

```text
https://USERNAME.github.io/algoritma-struktur-data/
```

> Penting: upload **isi project**, bukan folder pembungkusnya. URL
> `https://USERNAME.github.io/algoritma-struktur-data/index.html` harus bisa menemukan
> `js/script.js` di folder yang sama: `algoritma-struktur-data/js/script.js`.

---

## 5. Cara melakukan update website

```bash
# setelah mengubah file apa pun
git add .
git commit -m "Menambah materi baru"
git push
```

GitHub Pages akan otomatis memperbarui website dalam 1–2 menit.
Kalau perubahan belum terlihat, tekan `Ctrl + Shift + R` (hard refresh) untuk membuang cache.

### Kalau halaman masih putih / tidak termuat

1. Buka tab **Actions** di GitHub dan pastikan deployment berwarna hijau.
2. Pastikan **Settings → Pages → Source** bernilai **GitHub Actions**.
3. Pastikan file workflow berada tepat di `.github/workflows/deploy-pages.yml`.
4. Jangan memilih folder `/docs`, karena hasil deployment dibuat otomatis dari `dist`.
5. Buka DevTools browser (`F12`) → tab **Console** dan **Network**. Pastikan tidak ada
   file JavaScript yang mendapat status `404`.
6. Lakukan hard refresh dengan `Ctrl + Shift + R`.

### Menambah materi baru

1. Buka salah satu file data, misalnya `js/data-struktur.js`.
2. Salin satu objek materi yang sudah ada sebagai contoh.
3. Ubah `id`, `judul`, `emoji`, `ringkas`, dan isi `blocks`.
4. Simpan — materi otomatis muncul di sidebar, roadmap, progress, dan navigasi.

Jenis blok yang tersedia:

| `t` | Gunanya |
|---|---|
| `h`, `p`, `list`, `steps` | judul bagian, paragraf, daftar, langkah bernomor |
| `ascii` | diagram teks (monospace, bisa di-scroll) |
| `analogi`, `note`, `ok`, `warn`, `ringkas` | kotak sorotan |
| `code` | contoh kode |
| `bedah` | 🔍 bedah kode (tiap potongan bisa diklik) |
| `tabel` | tabel perbandingan |
| `viz` | tombol menuju visualisasi terkait |
| `kuis` | soal pilihan ganda langsung di materi |

---

## 6. Checklist sebelum publish

- [ ] Semua menu di navbar bisa diklik dan tidak ada link rusak.
- [ ] Mode gelap & terang keduanya nyaman dibaca.
- [ ] Dibuka di HP: hamburger menu jalan, tombol tidak terlalu kecil.
- [ ] Visualisasi bisa dijalankan (sorting, searching, stack, queue, linked list, tree, hash).
- [ ] Kuis menampilkan penjelasan setelah dijawab.
- [ ] Progress tersimpan setelah browser ditutup lalu dibuka lagi.
- [ ] Judul (`<title>`) dan `<meta name="description">` sudah sesuai.
- [ ] Semua path memakai relative path (`css/style.css`, bukan `/css/style.css`).
- [ ] Tidak ada `console.log` sisa debugging.
- [ ] Sudah dicek di minimal 2 browser (misalnya Chrome & Firefox).

---

## 7. Catatan tentang Python Playground

Playground di halaman materi adalah **simulator sederhana** yang ditulis dengan JavaScript,
bukan Python asli. Yang didukung: variabel, `print`, list, dictionary, `if/elif/else`,
`for`, `while`, dan method list umum (`append`, `pop`, `insert`, `remove`, `sort`, …).
Belum didukung: `def`, `class`, `import`, f-string.

Mau menjalankan Python asli di browser suatu hari nanti? Struktur kodenya sudah disiapkan:
cukup ganti isi fungsi `jalankanKode()` di `js/playground.js` dengan pemanggilan
[Pyodide](https://pyodide.org) (`pyodide.runPython`). Bagian tampilannya tidak perlu diubah.

---

## 8. Privasi

Tidak ada login, tidak ada server, tidak ada pelacakan. Progress belajar, hasil kuis,
dan pilihan tema disimpan di `localStorage` browser pengguna sendiri.
