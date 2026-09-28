/* =========================================================
   halaman.js — halaman yang isinya sebagian besar teks:
   Beranda, Kamus istilah, Tentang, dan "Aku Bingung".
   ========================================================= */

import { $, $$, md, esc, daftarSelesai, ambilTerakhir } from "./util.js";
import { KURIKULUM, semuaMateri, cariMateri } from "./materi-data.js";

/* =========================================================
   BERANDA
   ========================================================= */
export function renderBeranda(root) {
  const total = semuaMateri().length;
  const selesai = daftarSelesai().length;
  const persen = Math.round((selesai / total) * 100);
  const terakhir = ambilTerakhir() ? cariMateri(ambilTerakhir()) : null;

  root.innerHTML = `
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <span class="eyebrow">Gratis · Bahasa Indonesia · Untuk pemula total</span>
        <h1>Belajar Algoritma &amp; Struktur Data dari Nol.</h1>
        <p class="hero-sub">
          Tidak perlu jago matematika. Tidak perlu langsung pintar coding.
          Kita belajar pelan-pelan menggunakan bahasa sederhana, analogi, dan visualisasi.
        </p>
        <div class="hero-cta">
          <a class="btn" href="#/materi/apa-itu-algoritma">Mulai dari Nol</a>
          <button class="btn btn-ghost" type="button" id="ke-roadmap">Lihat Roadmap</button>
        </div>
        <div class="hero-facts">
          <span>📚 ${total} materi bertahap</span>
          <span>🎬 9 visualisasi interaktif</span>
          <span>✏️ 20+ latihan &amp; 6 mini project</span>
        </div>
      </div>

      <div class="flow-box" aria-label="Ilustrasi alur input, proses, output">
        <p class="muted" style="font-size:0.85rem;margin-bottom:0.9rem">Pola dasar semua program:</p>
        <div class="flow-step"><span class="flow-emoji">🥚</span><span><strong>Input</strong><span class="ket">data yang masuk</span></span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="flow-emoji">⚙️</span><span><strong>Proses</strong><span class="ket">langkah-langkah (algoritma)</span></span></div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step"><span class="flow-emoji">🍳</span><span><strong>Output</strong><span class="ket">hasil yang keluar</span></span></div>
      </div>
    </div>
  </section>

  ${
    selesai > 0
      ? `<section class="container" style="margin-bottom:2.5rem">
          <div class="card" style="display:flex;gap:1.2rem;flex-wrap:wrap;align-items:center;justify-content:space-between">
            <div class="progress-wrap" style="flex:1;min-width:260px">
              <strong>Lanjutkan belajar</strong>
              <div class="progress-bar"><div class="progress-fill" style="width:${persen}%"></div></div>
              <span class="muted" style="font-size:0.88rem">${selesai} dari ${total} materi selesai (${persen}%)</span>
            </div>
            ${terakhir ? `<a class="btn" href="#/materi/${terakhir.id}">Lanjut: ${esc(terakhir.judul)} →</a>` : ""}
          </div>
        </section>`
      : ""
  }

  <section class="section section-soft">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Kenapa algoritma?</span>
        <h2>Kamu sudah memakai algoritma hari ini</h2>
        <p>Algoritma itu sebenarnya cuma <strong>urutan langkah untuk menyelesaikan masalah</strong>. Serius, sesederhana itu.</p>
      </div>
      <div class="grid grid-2">
        <div class="card">
          <h3>🍜 Membuat mi instan</h3>
          <ol class="step-list">
            <li>Rebus air</li>
            <li>Masukkan mi</li>
            <li>Tunggu beberapa menit</li>
            <li>Masukkan bumbu</li>
            <li>Aduk</li>
            <li>Makan</li>
          </ol>
          <p class="muted" style="font-size:0.92rem">Itu sebenarnya sudah seperti algoritma: langkahnya jelas, berurutan, dan menghasilkan sesuatu.</p>
        </div>
        <div class="card">
          <h3>💻 Lalu di komputer?</h3>
          <p>Bedanya cuma satu: komputer <strong>tidak bisa menebak</strong>.</p>
          <p>Kalau kamu bilang “masukkan bumbu” tanpa bilang “buka bungkusnya dulu”, komputer akan memasukkan bumbu beserta bungkusnya.</p>
          <p class="muted" style="font-size:0.92rem">Jadi tugas kita: menulis langkah sedetail dan seurut mungkin. Itulah inti belajar algoritma.</p>
          <a class="btn btn-sm" href="#/materi/apa-itu-algoritma">Pelajari materinya →</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="roadmap">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Roadmap</span>
        <h2>Belajar bertahap, dari nol sampai paham</h2>
        <p>Mulai dari Level 0. Jangan melompat — tiap level dibangun dari level sebelumnya.</p>
      </div>
      <div class="roadmap">
        ${KURIKULUM.map((level) => {
          const jml = level.materi.length;
          const beres = level.materi.filter((m) => daftarSelesai().includes(m.id)).length;
          return `<a class="level-card" href="#/materi/${level.materi[0].id}">
              <span class="level-tag">${level.nama.split("—")[0].trim()}</span>
              <div>
                <h3>${level.emoji} ${esc(level.nama.split("—")[1] ? level.nama.split("—")[1].trim() : level.nama)}</h3>
                <p>${esc(level.deskripsi)}</p>
              </div>
              <span class="badge ${beres === jml ? "badge-green" : ""}">${beres}/${jml} materi</span>
            </a>`;
        }).join("")}
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Cara kami mengajar</span>
        <h2>Paham dulu “kenapa”, baru “bagaimana”</h2>
        <p>Setiap materi mengikuti urutan yang sama, supaya otak tidak kaget.</p>
      </div>
      <div class="ascii">Masalah
   ↓
Analogi kehidupan nyata
   ↓
Konsep &amp; istilah teknis
   ↓
Visualisasi
   ↓
Pseudocode
   ↓
Kode + bedah kode
   ↓
Latihan
   ↓
Mini project</div>
      <div class="grid grid-3" style="margin-top:1.5rem">
        <div class="card">
          <h3>🎬 Visualisasi</h3>
          <p>Lihat sorting, searching, stack, queue, tree, dan hash table bergerak langkah demi langkah.</p>
          <a class="btn btn-sm btn-ghost" href="#/visualisasi">Buka visualisasi</a>
        </div>
        <div class="card">
          <h3>✏️ Latihan</h3>
          <p>Kuis bertingkat (pemula → tantangan) plus 6 mini project yang bisa langsung dikerjakan.</p>
          <a class="btn btn-sm btn-ghost" href="#/latihan">Buka latihan</a>
        </div>
        <div class="card">
          <h3>😵 Aku Bingung</h3>
          <p>Kumpulan pertanyaan yang sering bikin pemula pusing, dijawab dengan bahasa sehari-hari.</p>
          <a class="btn btn-sm btn-ghost" href="#/bingung">Lihat jawabannya</a>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container text-center">
      <h2>Siap mulai dari nol?</h2>
      <p class="muted" style="max-width:520px;margin:0 auto 1.5rem">
        Materi pertama cuma butuh 5 menit, dan dimulai dari mi instan. Serius. 🍜
      </p>
      <a class="btn" href="#/materi/apa-itu-algoritma">Mulai Belajar Sekarang</a>
    </div>
  </section>`;

  const tombolRoadmap = $("#ke-roadmap", root);
  if (tombolRoadmap) {
    tombolRoadmap.addEventListener("click", () => {
      $("#roadmap", root).scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

/* =========================================================
   KAMUS ISTILAH
   ========================================================= */
const KAMUS = [
  { istilah: "Algorithm (Algoritma)", arti: "Urutan langkah untuk menyelesaikan masalah.", analogi: "Resep masakan." },
  { istilah: "Data Structure (Struktur Data)", arti: "Cara menyusun dan menyimpan data agar mudah digunakan.", analogi: "Lemari berlaci vs tumpukan baju di lantai." },
  { istilah: "Variabel", arti: "Wadah bernama untuk menyimpan satu nilai.", analogi: "Toples yang diberi label." },
  { istilah: "Array / List", arti: "Deretan data yang tiap posisinya punya nomor.", analogi: "Deretan loker bernomor." },
  { istilah: "Index", arti: "Nomor posisi suatu data. Dimulai dari 0.", analogi: "Nomor loker." },
  { istilah: "Node", arti: "Satu “kotak” yang menyimpan data dan biasanya punya hubungan dengan data lain.", analogi: "Satu gerbong kereta." },
  { istilah: "Head", arti: "Node pertama pada linked list.", analogi: "Gerbong paling depan." },
  { istilah: "Tail", arti: "Node terakhir pada linked list. Penunjuk next-nya kosong.", analogi: "Gerbong paling belakang." },
  { istilah: "Pointer / Next", arti: "Penunjuk ke data berikutnya.", analogi: "Sambungan antar gerbong." },
  { istilah: "Stack", arti: "Struktur data dengan aturan LIFO: yang terakhir masuk keluar duluan.", analogi: "Tumpukan piring." },
  { istilah: "LIFO", arti: "Last In, First Out — yang terakhir masuk, keluar duluan.", analogi: "Piring paling atas diambil duluan." },
  { istilah: "Queue", arti: "Struktur data dengan aturan FIFO: yang pertama masuk keluar duluan.", analogi: "Antrean kasir." },
  { istilah: "FIFO", arti: "First In, First Out — yang pertama masuk, keluar duluan.", analogi: "Orang paling depan dilayani duluan." },
  { istilah: "Push / Pop", arti: "Push = menaruh data di stack. Pop = mengambil data teratas.", analogi: "Menaruh dan mengambil piring." },
  { istilah: "Enqueue / Dequeue", arti: "Enqueue = ikut antre di belakang. Dequeue = dilayani dari depan.", analogi: "Masuk dan keluar antrean." },
  { istilah: "Peek", arti: "Melihat data terdepan/teratas tanpa mengambilnya.", analogi: "Mengintip tanpa menyentuh." },
  { istilah: "Hash Table / Dictionary", arti: "Penyimpanan berpasangan key → value yang pencariannya sangat cepat.", analogi: "Lemari dengan nomor laci." },
  { istilah: "Key & Value", arti: "Key adalah kuncinya (misal nama), value adalah isinya (misal nomor telepon).", analogi: "Nama laci dan barang di dalamnya." },
  { istilah: "Hash Function", arti: "Mesin kecil yang mengubah key menjadi nomor laci.", analogi: "Rumus penentu nomor laci." },
  { istilah: "Collision", arti: "Dua key berbeda mendapat nomor laci yang sama.", analogi: "Dua orang dapat nomor laci kembar." },
  { istilah: "Tree", arti: "Struktur data bertingkat: ada induk dan anak.", analogi: "Silsilah keluarga." },
  { istilah: "Root", arti: "Node paling atas pada tree, tidak punya induk.", analogi: "Kakek pada silsilah." },
  { istilah: "Leaf", arti: "Node yang tidak punya anak.", analogi: "Anggota keluarga paling bawah." },
  { istilah: "Binary Search Tree (BST)", arti: "Tree dengan aturan: kecil ke kiri, besar ke kanan.", analogi: "Kamus yang tersusun rapi." },
  { istilah: "Graph", arti: "Kumpulan titik (vertex) yang dihubungkan garis (edge).", analogi: "Peta kota dan jalan." },
  { istilah: "Vertex & Edge", arti: "Vertex = titik/simpul. Edge = garis penghubung antar titik.", analogi: "Kota dan jalan raya." },
  { istilah: "Traversal", arti: "Menyusuri seluruh data satu per satu.", analogi: "Berjalan dari gerbong depan sampai belakang." },
  { istilah: "Searching", arti: "Proses mencari data tertentu di dalam kumpulan data.", analogi: "Mencari teman di kerumunan." },
  { istilah: "Linear Search", arti: "Mencari dengan mengecek satu per satu dari awal. O(n).", analogi: "Menyusuri antrean satu per satu." },
  { istilah: "Binary Search", arti: "Mencari dengan membuang setengah data tiap langkah. Wajib data urut. O(log n).", analogi: "Membuka kamus dari tengah." },
  { istilah: "Sorting", arti: "Mengurutkan data, misalnya dari kecil ke besar.", analogi: "Berbaris sesuai tinggi badan." },
  { istilah: "Bubble Sort", arti: "Membandingkan dua data bersebelahan lalu menukarnya bila salah urutan. O(n²).", analogi: "Menukar posisi dua orang yang bersebelahan." },
  { istilah: "Selection Sort", arti: "Mencari data terkecil lalu memindahkannya ke depan. O(n²).", analogi: "Memilih yang terpendek lebih dulu." },
  { istilah: "Insertion Sort", arti: "Menyelipkan tiap data ke posisi yang benar. Cepat bila data hampir urut.", analogi: "Menyusun kartu remi di tangan." },
  { istilah: "Merge Sort", arti: "Membagi data jadi kecil, lalu menggabungkannya sambil mengurutkan. O(n log n).", analogi: "Membagi tugas ke beberapa teman." },
  { istilah: "Quick Sort", arti: "Memilih pivot, memisahkan kiri-kanan, lalu mengulang. Biasanya tercepat.", analogi: "Membariskan murid dengan satu patokan." },
  { istilah: "Recursion (Rekursi)", arti: "Fungsi yang memanggil dirinya sendiri dengan masalah lebih kecil.", analogi: "Kamar di dalam kamar." },
  { istilah: "Base Case", arti: "Kondisi berhenti pada rekursi. Wajib ada.", analogi: "Rem pada sepeda." },
  { istilah: "Call Stack", arti: "Tumpukan catatan fungsi yang sedang berjalan.", analogi: "Tumpukan piring lagi." },
  { istilah: "Complexity (Kompleksitas)", arti: "Gambaran seberapa banyak pekerjaan yang perlu dilakukan algoritma.", analogi: "Berapa langkah kaki yang dibutuhkan." },
  { istilah: "Big O", arti: "Cara sederhana menggambarkan bagaimana pekerjaan algoritma bertambah ketika data semakin banyak.", analogi: "Label “boros” atau “irit”." },
  { istilah: "O(1)", arti: "Jumlah langkah tetap, berapa pun banyaknya data.", analogi: "Buku sudah ada di meja." },
  { istilah: "O(n)", arti: "Jumlah langkah bertambah sebanyak datanya.", analogi: "Mengecek buku satu per satu." },
  { istilah: "O(log n)", arti: "Tiap langkah membuang setengah data. Sangat cepat.", analogi: "Membuka kamus dari tengah." },
  { istilah: "O(n²)", arti: "Setiap data dibandingkan dengan semua data lain. Cepat melambat.", analogi: "Semua orang bersalaman dengan semua orang." },
  { istilah: "Pseudocode", arti: "Kode “pura-pura” yang ditulis dengan bahasa manusia.", analogi: "Sketsa sebelum menggambar." },
  { istilah: "Flowchart", arti: "Gambar alur algoritma memakai kotak dan panah.", analogi: "Peta perjalanan langkah." },
  { istilah: "Iterasi", arti: "Satu kali putaran dalam perulangan.", analogi: "Satu putaran lari." },
  { istilah: "Infinite Loop", arti: "Perulangan yang tidak pernah berhenti karena kondisinya selalu benar.", analogi: "Lari terus karena peluit tidak pernah dibunyikan." },
  { istilah: "Off-by-one Error", arti: "Kesalahan meleset satu angka, biasanya karena lupa index dimulai dari 0.", analogi: "Salah hitung anak tangga terakhir." },
];

export function renderKamus(root) {
  root.innerHTML = `
    <div class="container section">
      <span class="eyebrow">Kamus</span>
      <h1>📖 Kamus Istilah</h1>
      <p class="muted" style="max-width:640px">
        Bingung dengan sebuah istilah? Cari di sini. Semua dijelaskan dengan kalimat pendek
        dan analogi sehari-hari.
      </p>

      <div class="viz-controls" style="margin:1.5rem 0">
        <label for="cari-kamus">Cari istilah</label>
        <input type="text" id="cari-kamus" placeholder="misalnya: stack, index, big o..." style="flex:1;min-width:220px">
      </div>

      <div class="card" id="isi-kamus">
        ${KAMUS.map(
          (k) => `<article class="kamus-item" data-teks="${esc((k.istilah + " " + k.arti).toLowerCase())}">
            <h3>${esc(k.istilah)}</h3>
            <p>${md(k.arti)}</p>
            <p class="analogi-kecil">💡 ${esc(k.analogi)}</p>
          </article>`
        ).join("")}
      </div>
      <p class="muted" id="kamus-kosong" style="margin-top:1rem"></p>
    </div>`;

  const input = $("#cari-kamus", root);
  input.addEventListener("input", () => {
    const kata = input.value.toLowerCase().trim();
    let terlihat = 0;
    $$(".kamus-item", root).forEach((item) => {
      const cocok = item.dataset.teks.includes(kata);
      item.classList.toggle("hidden", !cocok);
      if (cocok) terlihat++;
    });
    $("#kamus-kosong", root).textContent =
      terlihat === 0 ? `Tidak ada istilah yang cocok dengan “${kata}”. Coba kata lain, misalnya “stack”.` : "";
  });
}

/* =========================================================
   AKU BINGUNG (FAQ pemula)
   ========================================================= */
const BINGUNG = [
  {
    q: "Algoritma itu sebenarnya apa?",
    a: "Urutan langkah untuk menyelesaikan sesuatu. Resep mi instan, cara memakai sepatu, dan petunjuk arah itu semua algoritma. Di komputer, langkahnya harus ditulis lebih detail karena komputer tidak bisa menebak.",
  },
  {
    q: "Apa bedanya algoritma dan program?",
    a: "Algoritma itu idenya (langkah-langkahnya). Program itu ketika ide tersebut ditulis dalam bahasa yang dimengerti komputer. Satu algoritma bisa ditulis jadi program Python, JavaScript, atau bahasa apa pun.",
  },
  {
    q: "Apa bedanya array dan linked list?",
    a: "Array itu deretan loker bernomor: langsung bisa buka loker nomor 7 (cepat), tapi menyisipkan di tengah bikin semua data digeser. Linked list itu gerbong kereta: menambah/melepas gerbong gampang, tapi untuk sampai ke gerbong ke-7 harus jalan dari depan.",
  },
  {
    q: "Kenapa harus belajar Big O?",
    a: "Supaya kamu bisa menebak apakah programmu akan tetap cepat saat datanya banyak. Dengan 10 data semua terasa cepat. Dengan 1 juta data, pilihan algoritma menentukan apakah program selesai dalam 1 detik atau 3 jam.",
  },
  {
    q: "Apa bedanya Stack dan Queue?",
    a: "Stack = tumpukan piring: yang terakhir ditaruh, diambil duluan (LIFO). Queue = antrean kasir: yang datang duluan, dilayani duluan (FIFO). Stack itu tidak adil tapi berguna (undo), queue itu adil (antrean printer).",
  },
  {
    q: "Apa itu Node?",
    a: "Satu kotak kecil yang menyimpan data. Biasanya node juga menyimpan “alamat” node lain. Bayangkan satu gerbong kereta: ada isinya, dan ada sambungan ke gerbong berikutnya.",
  },
  {
    q: "Apa itu Head dan Tail?",
    a: "Head = node pertama (gerbong paling depan). Tail = node terakhir (gerbong paling belakang, sambungannya kosong). Kalau head hilang, seluruh data bisa ikut hilang karena tidak ada yang tahu awalnya di mana.",
  },
  {
    q: "Apa itu Tree?",
    a: "Struktur data bertingkat seperti silsilah keluarga. Ada yang paling atas (root), ada yang punya anak (parent), ada yang tidak punya anak (leaf). Folder di komputer dan struktur halaman web juga berbentuk tree.",
  },
  {
    q: "Apa itu Graph?",
    a: "Kumpulan titik yang dihubungkan garis. Contohnya peta kota: kota = titik, jalan = garis. Media sosial juga graph: orang = titik, pertemanan = garis.",
  },
  {
    q: "Kenapa Binary Search lebih cepat?",
    a: "Karena setiap langkah membuang setengah data. Dari 1.000 data: 1000 → 500 → 250 → 125 → ... hanya sekitar 10 langkah. Tapi ingat, syaratnya data harus sudah urut.",
  },
  {
    q: "Kenapa sorting penting?",
    a: "Karena banyak hal jadi mudah kalau data sudah urut: binary search bisa dipakai, data terbesar/terkecil langsung terlihat, dan tampilan aplikasi jadi lebih enak dilihat (misalnya daftar nilai atau harga).",
  },
  {
    q: "Apa itu recursion?",
    a: "Fungsi yang memanggil dirinya sendiri untuk mengerjakan versi masalah yang lebih kecil. Seperti membuka kotak yang di dalamnya ada kotak lagi. Wajib punya rem (base case), kalau tidak, program akan error.",
  },
  {
    q: "Kenapa programmer harus belajar struktur data?",
    a: "Karena memilih wadah yang tepat membuat program cepat, hemat memori, dan kodenya lebih rapi. Selain itu, hampir semua wawancara kerja programmer menanyakan topik ini.",
  },
  {
    q: "Saya lupa terus materinya. Normal tidak?",
    a: "Sangat normal. Cara paling ampuh: jelaskan ulang materinya dengan bahasamu sendiri (misalnya ke teman atau ke buku catatan), lalu kerjakan mini project. Membaca saja memang gampang lupa.",
  },
  {
    q: "Harus pakai bahasa pemrograman apa?",
    a: "Website ini memakai contoh Python karena tulisannya paling mirip bahasa manusia. Tapi konsepnya sama persis di JavaScript, Java, C++, atau bahasa lain. Yang kamu pelajari di sini terbawa ke mana-mana.",
  },
];

export function renderBingung(root) {
  root.innerHTML = `
    <div class="container section">
      <span class="eyebrow">Bantuan</span>
      <h1>😵 Aku Bingung</h1>
      <p class="muted" style="max-width:640px">
        Bingung itu tanda kamu sedang belajar hal baru, bukan tanda kamu bodoh.
        Ini pertanyaan-pertanyaan yang paling sering bikin pemula pusing.
      </p>
      <div style="margin-top:1.8rem">
        ${BINGUNG.map(
          (b) => `<details class="akordeon">
            <summary><span>${esc(b.q)}</span></summary>
            <div class="isi"><p style="margin:0">${esc(b.a)}</p></div>
          </details>`
        ).join("")}
      </div>
      <div class="callout callout-ok" style="margin-top:2rem">
        <h4>Masih bingung juga?</h4>
        <p>Tidak apa-apa. Coba baca ulang materinya besok pagi — otak butuh waktu mencerna.
        Atau buka <a href="#/kamus">Kamus Istilah</a> untuk mengecek arti kata yang mengganjal.</p>
      </div>
    </div>`;
}

/* =========================================================
   TENTANG
   ========================================================= */
export function renderTentang(root) {
  root.innerHTML = `
    <div class="container section">
      <span class="eyebrow">Tentang</span>
      <h1>Tentang AlgoDariNol</h1>
      <p class="muted" style="max-width:680px">
        Website ini dibuat untuk satu jenis orang: <strong>orang yang benar-benar baru</strong>
        dan sering merasa penjelasan algoritma di internet terlalu rumit.
      </p>

      <div class="grid grid-2" style="margin-top:2rem">
        <div class="card">
          <h3>🎯 Tujuan</h3>
          <p>Membuat konsep algoritma dan struktur data yang biasanya terasa rumit menjadi mudah
             dipahami lewat bahasa sederhana, analogi kehidupan sehari-hari, visualisasi,
             contoh sederhana, dan latihan interaktif.</p>
        </div>
        <div class="card">
          <h3>🧠 Prinsipnya</h3>
          <p>“Jelaskan seperti kepada orang yang baru pertama kali melihat programming.”</p>
          <p class="muted" style="font-size:0.92rem">Tidak ada istilah yang dipakai tanpa dijelaskan lebih dulu.</p>
        </div>
      </div>

      <h2 style="margin-top:2.5rem">Setiap materi punya bagian yang sama</h2>
      <ol class="step-list">
        <li>Penjelasan super sederhana</li>
        <li>Analogi kehidupan nyata</li>
        <li>Visualisasi</li>
        <li>Contoh sederhana</li>
        <li>Contoh kode</li>
        <li>Penjelasan kode (bedah kode)</li>
        <li>Cara kerja langkah demi langkah</li>
        <li>Kesalahan umum pemula</li>
        <li>Latihan</li>
        <li>Ringkasan</li>
      </ol>

      <h2 style="margin-top:2.5rem">Cara memakai website ini</h2>
      <div class="grid grid-3">
        <div class="card"><h3>1. Baca</h3><p>Mulai dari Level 0 dan jangan melompat. Tiap level dibangun dari level sebelumnya.</p></div>
        <div class="card"><h3>2. Mainkan</h3><p>Buka halaman Visualisasi dan utak-atik sendiri. Melihat jauh lebih nempel daripada membaca.</p></div>
        <div class="card"><h3>3. Kerjakan</h3><p>Jawab kuis dan kerjakan mini project. Belajar tanpa praktik cepat menguap.</p></div>
      </div>

      <h2 style="margin-top:2.5rem">Teknologi &amp; privasi</h2>
      <p>Website ini dibuat dengan <strong>HTML, CSS, dan JavaScript murni</strong> — tanpa framework,
         tanpa server, tanpa database. Karena itu bisa di-host gratis di GitHub Pages dan tetap ringan
         dibuka dari HP.</p>
      <div class="callout">
        <h4>Data kamu aman</h4>
        <p>Tidak ada login dan tidak ada data yang dikirim ke mana pun. Progress belajar, hasil kuis,
           dan pilihan mode gelap disimpan di <code>localStorage</code> browser kamu sendiri.</p>
      </div>

      <div class="callout callout-ok">
        <h4>Boleh dipakai ulang</h4>
        <p>Silakan pakai website ini untuk belajar sendiri, mengajar di kelas, atau kelompok belajar.
           Kalau ada penjelasan yang menurutmu masih terlalu rumit, itu berarti masih bisa diperbaiki. 🙂</p>
      </div>

      <div style="margin-top:2rem;display:flex;gap:0.7rem;flex-wrap:wrap">
        <a class="btn" href="#/materi/apa-itu-algoritma">Mulai dari materi pertama</a>
        <a class="btn btn-ghost" href="#/bingung">😵 Aku masih bingung</a>
      </div>
    </div>`;
}
