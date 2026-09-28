/* =========================================================
   latihan.js — halaman Latihan: kuis bertingkat + mini project.
   ========================================================= */

import { $, $$, md, esc, ambilKuis } from "./util.js";
import { pasangKuis } from "./materi.js";

/* ---------- BANK SOAL ---------- */
const SOAL = [
  // 🟢 PEMULA
  {
    id: "l-p1", level: "pemula",
    q: "Kamu punya antrean: Andi → Budi → Caca. Siapa yang keluar lebih dulu?",
    opsi: ["Caca", "Budi", "Andi", "Tidak ada"],
    jawab: 2,
    jelas: "Antrean memakai aturan FIFO: yang pertama datang, dilayani duluan. Jadi Andi.",
  },
  {
    id: "l-p2", level: "pemula",
    q: "Struktur data mana yang menggunakan konsep LIFO?",
    opsi: ["Queue", "Stack", "Graph", "Tree"],
    jawab: 1,
    jelas: "Stack = tumpukan piring. Yang terakhir ditaruh, diambil duluan (Last In, First Out).",
  },
  {
    id: "l-p3", level: "pemula",
    q: "Pada array `[\"a\", \"b\", \"c\"]`, berapa index dari \"c\"?",
    opsi: ["1", "2", "3", "0"],
    jawab: 1,
    jelas: "Index dimulai dari 0: a=0, b=1, c=2.",
  },
  {
    id: "l-p4", level: "pemula",
    q: "Algoritma paling tepat digambarkan sebagai...",
    opsi: ["Bahasa pemrograman", "Urutan langkah menyelesaikan masalah", "Nama aplikasi", "Jenis komputer"],
    jawab: 1,
    jelas: "Algoritma itu urutan langkah. Resep mi instan pun sebenarnya algoritma.",
  },
  {
    id: "l-p5", level: "pemula",
    q: "Node pertama pada linked list disebut...",
    opsi: ["Tail", "Root", "Head", "Leaf"],
    jawab: 2,
    jelas: "Head = kepala = gerbong paling depan. Yang paling belakang namanya Tail.",
  },
  {
    id: "l-p6", level: "pemula",
    q: "Manakah yang BUKAN operasi pada stack?",
    opsi: ["push", "pop", "peek", "enqueue"],
    jawab: 3,
    jelas: "enqueue itu milik queue (menambah orang di belakang antrean).",
  },

  // 🟡 MENENGAH
  {
    id: "l-m1", level: "menengah",
    q: "Apa syarat wajib sebelum memakai binary search?",
    opsi: ["Datanya berupa angka", "Datanya sudah urut", "Datanya kurang dari 100", "Datanya disimpan di stack"],
    jawab: 1,
    jelas: "Tanpa data yang urut, kita tidak bisa tahu setengah bagian mana yang boleh dibuang.",
  },
  {
    id: "l-m2", level: "menengah",
    q: "Berapa kompleksitas mengambil data lewat index pada array, misalnya `data[5]`?",
    opsi: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    jawab: 0,
    jelas: "Komputer bisa langsung menghitung letaknya, jadi jumlah langkahnya tetap: O(1).",
  },
  {
    id: "l-m3", level: "menengah",
    q: "Kenapa menyisipkan data di AWAL array itu lambat?",
    opsi: [
      "Karena array tidak boleh disisipi",
      "Karena semua data setelahnya harus digeser satu per satu",
      "Karena index harus dihitung ulang dari server",
      "Karena array selalu penuh",
    ],
    jawab: 1,
    jelas: "Seperti menyisipkan orang di depan barisan upacara: semua yang di belakang harus mundur. O(n).",
  },
  {
    id: "l-m4", level: "menengah",
    q: "Pada Binary Search Tree, angka 25 dimasukkan ke pohon yang root-nya 50. Ke mana dia pergi?",
    opsi: ["Ke kanan", "Ke kiri", "Menggantikan root", "Dibuang"],
    jawab: 1,
    jelas: "Aturan emas BST: lebih kecil ke kiri, lebih besar ke kanan. 25 < 50 → ke kiri.",
  },
  {
    id: "l-m5", level: "menengah",
    q: "Apa itu collision pada hash table?",
    opsi: [
      "Data rusak saat disimpan",
      "Dua key berbeda menghasilkan nomor laci yang sama",
      "Hash table kehabisan tempat",
      "Key ditulis dengan huruf besar",
    ],
    jawab: 1,
    jelas: "Collision itu normal. Biasanya diatasi dengan menyimpan daftar kecil di laci tersebut (chaining).",
  },
  {
    id: "l-m6", level: "menengah",
    q: "Fungsi rekursif tanpa base case akan...",
    opsi: ["Berjalan sekali lalu berhenti", "Memanggil dirinya terus sampai error", "Otomatis berhenti di panggilan ke-100", "Menghasilkan 0"],
    jawab: 1,
    jelas: "Tanpa rem, call stack penuh → stack overflow (RecursionError di Python).",
  },

  // 🔴 TANTANGAN
  {
    id: "l-t1", level: "tantangan",
    q: "Data 1.000.000 item sudah terurut. Kira-kira berapa langkah maksimal binary search?",
    opsi: ["Sekitar 20", "Sekitar 1.000", "Sekitar 500.000", "1.000.000"],
    jawab: 0,
    jelas: "Setiap langkah membuang setengah data. 2²⁰ ≈ 1 juta, jadi sekitar 20 langkah saja.",
  },
  {
    id: "l-t2", level: "tantangan",
    q: "Kamu memasukkan angka 1,2,3,4,5 secara berurutan ke dalam BST kosong. Apa yang terjadi?",
    opsi: [
      "Pohon menjadi seimbang sempurna",
      "Pohon memanjang ke kanan seperti linked list, pencarian jadi O(n)",
      "Program error",
      "Angka otomatis diacak",
    ],
    jawab: 1,
    jelas: "Semua angka lebih besar dari sebelumnya → selalu ke kanan. Inilah kenapa ada BST seimbang (AVL, Red-Black).",
  },
  {
    id: "l-t3", level: "tantangan",
    q: "Untuk data yang HAMPIR terurut, algoritma sorting mana yang biasanya paling efisien?",
    opsi: ["Bubble sort", "Selection sort", "Insertion sort", "Semua sama saja"],
    jawab: 2,
    jelas: "Insertion sort hanya menggeser sedikit kalau data sudah hampir rapi — bisa mendekati O(n).",
  },
  {
    id: "l-t4", level: "tantangan",
    q: "Fitur “tombol Back” pada browser paling cocok dibuat memakai struktur data apa?",
    opsi: ["Queue", "Stack", "Hash table", "Graph"],
    jawab: 1,
    jelas: "Halaman terakhir yang dibuka adalah yang pertama dikunjungi lagi saat menekan Back → LIFO → Stack.",
  },
  {
    id: "l-t5", level: "tantangan",
    q: "Kenapa merge sort lebih cepat dari bubble sort saat data sangat banyak?",
    opsi: [
      "Karena merge sort memakai lebih sedikit variabel",
      "Karena merge sort membagi masalah jadi bagian kecil → O(n log n), bukan O(n²)",
      "Karena merge sort tidak perlu membandingkan data",
      "Karena merge sort ditulis dengan bahasa yang lebih cepat",
    ],
    jawab: 1,
    jelas: "Untuk 1.000 data: bubble ≈ 1.000.000 langkah, merge ≈ 10.000 langkah. Beda 100 kali lipat.",
  },
];

/* ---------- SOAL TERBUKA (jawab sendiri, lalu cocokkan) ---------- */
const SOAL_TERBUKA = [
  {
    level: "pemula",
    q: "Apa yang dilakukan Bubble Sort? Jelaskan dengan bahasamu sendiri.",
    jawab:
      "Bubble sort membandingkan dua data yang bersebelahan. Kalau yang kiri lebih besar dari yang kanan, posisinya ditukar. Proses ini diulang dari awal berkali-kali sampai tidak ada lagi yang perlu ditukar. Setiap satu sapuan, angka terbesar “naik” ke ujung kanan seperti gelembung.",
  },
  {
    level: "pemula",
    q: "Tuliskan langkah-langkah (algoritma) membuat kopi sachet. Minimal 5 langkah.",
    jawab:
      "Contoh jawaban: (1) siapkan gelas, (2) buka sachet kopi, (3) tuang isinya ke gelas, (4) tuang air panas, (5) aduk sampai larut, (6) kopi siap diminum. Yang penting: urutannya masuk akal dan tidak ada langkah yang melompat.",
  },
  {
    level: "menengah",
    q: "Jelaskan bedanya Array dan Linked List dengan analogimu sendiri.",
    jawab:
      "Array itu deretan loker bernomor: kita bisa langsung membuka loker nomor 7 tanpa membuka yang lain (cepat, O(1)), tapi menyisipkan loker baru di tengah merepotkan. Linked List itu gerbong kereta: menambah atau melepas gerbong gampang, tapi untuk sampai ke gerbong ke-7 kita harus berjalan melewati gerbong 1 sampai 6 (O(n)).",
  },
  {
    level: "tantangan",
    q: "Kamu punya 10.000 nama pelanggan dan sering mencari nomor telepon berdasarkan nama. Struktur data apa yang kamu pilih, dan kenapa?",
    jawab:
      "Hash table (dictionary). Nama dipakai sebagai key, nomor telepon sebagai value. Pencarian rata-rata O(1) karena nama langsung diubah jadi nomor laci. Kalau harus sering menampilkan data secara urut, barulah pertimbangkan Binary Search Tree yang memberi O(log n) tapi urutannya terjaga.",
  },
];

/* ---------- MINI PROJECT ---------- */
const PROJEK = [
  {
    judul: "Project 1 — Simulasi Antrean Kasir",
    level: "pemula",
    tujuan: "Membuat program antrean sederhana: pelanggan datang, lalu dilayani satu per satu.",
    konsep: "Queue (FIFO), list, perulangan",
    langkah: [
      "Buat list kosong bernama `antrean`.",
      "Tambahkan 3 nama pelanggan memakai `append` (ini enqueue).",
      "Tampilkan siapa yang paling depan.",
      "Layani pelanggan terdepan memakai `pop(0)` (ini dequeue).",
      "Tampilkan sisa antreannya.",
    ],
    starter: `antrean = []

antrean.append("Andi")
antrean.append("Budi")
antrean.append("Caca")

print("Antrean:", antrean)
# TODO: layani pelanggan paling depan
# TODO: tampilkan sisa antrean`,
    tantangan: "Tambahkan perulangan `while` yang melayani pelanggan sampai antreannya habis.",
    solusi: `antrean = ["Andi", "Budi", "Caca"]

while len(antrean) > 0:
    dilayani = antrean.pop(0)
    print("Melayani:", dilayani, "| sisa:", antrean)

print("Semua pelanggan sudah dilayani")`,
  },
  {
    judul: "Project 2 — Riwayat Browser dengan Stack",
    level: "pemula",
    tujuan: "Membuat tombol “Back” sederhana memakai stack.",
    konsep: "Stack (LIFO), push, pop",
    langkah: [
      "Buat list kosong bernama `riwayat`.",
      "Setiap kali “membuka halaman”, lakukan `append` (push).",
      "Saat menekan Back, lakukan `pop()` untuk kembali ke halaman sebelumnya.",
      "Jangan lupa cek dulu: kalau riwayat kosong, jangan di-pop.",
    ],
    starter: `riwayat = []

riwayat.append("beranda")
riwayat.append("materi")
riwayat.append("visualisasi")

print("Halaman sekarang:", riwayat[-1])
# TODO: tekan back satu kali, lalu tampilkan halaman sekarang`,
    tantangan: "Buat juga tombol “Forward” dengan stack kedua bernama `maju`.",
    solusi: `riwayat = ["beranda", "materi", "visualisasi"]
maju = []

# tekan back
halaman = riwayat.pop()
maju.append(halaman)
print("Back → sekarang di:", riwayat[-1])

# tekan forward
kembali = maju.pop()
riwayat.append(kembali)
print("Forward → sekarang di:", riwayat[-1])`,
  },
  {
    judul: "Project 3 — To-do List dengan Array",
    level: "pemula",
    tujuan: "Menyimpan, menampilkan, dan menghapus daftar tugas.",
    konsep: "Array/list, index, traversal, operasi CRUD sederhana",
    langkah: [
      "Buat list `tugas` berisi beberapa pekerjaan.",
      "Tampilkan semuanya memakai `for` beserta nomornya.",
      "Tandai tugas selesai dengan menghapusnya dari list.",
      "Tampilkan sisa tugas.",
    ],
    starter: `tugas = ["Belajar array", "Latihan stack", "Cuci piring"]

for i in range(len(tugas)):
    print(i, "-", tugas[i])

# TODO: hapus tugas nomor 2, lalu tampilkan lagi`,
    tantangan: "Tambahkan pengecekan: kalau list kosong, tampilkan “Tidak ada tugas 🎉”.",
    solusi: `tugas = ["Belajar array", "Latihan stack", "Cuci piring"]

tugas.pop(2)

if len(tugas) == 0:
    print("Tidak ada tugas 🎉")
else:
    for i in range(len(tugas)):
        print(i, "-", tugas[i])`,
  },
  {
    judul: "Project 4 — Sistem Pencarian Sederhana",
    level: "menengah",
    tujuan: "Membandingkan sendiri linear search dan binary search.",
    konsep: "Linear search, binary search, perbandingan jumlah langkah",
    langkah: [
      "Siapkan list angka yang sudah urut.",
      "Buat linear search memakai `for` dan hitung berapa kali membandingkan.",
      "Buat binary search memakai `while` dengan variabel `kiri`, `kanan`, `tengah`.",
      "Bandingkan jumlah langkah keduanya.",
    ],
    starter: `angka = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
cari = 72
langkah = 0

for i in range(len(angka)):
    langkah = langkah + 1
    if angka[i] == cari:
        print("Linear: ketemu di index", i, "dalam", langkah, "langkah")

# TODO: buat versi binary search-nya`,
    tantangan: "Coba dengan data 1.000 angka. Lihat betapa jauh bedanya.",
    solusi: `angka = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
cari = 72

kiri = 0
kanan = len(angka) - 1
langkah = 0

while kiri <= kanan:
    langkah = langkah + 1
    tengah = (kiri + kanan) // 2
    if angka[tengah] == cari:
        print("Binary: ketemu di index", tengah, "dalam", langkah, "langkah")
        kiri = kanan + 1
    elif angka[tengah] < cari:
        kiri = tengah + 1
    else:
        kanan = tengah - 1`,
  },
  {
    judul: "Project 5 — Mengurutkan Nilai Siswa",
    level: "menengah",
    tujuan: "Mengurutkan nilai dari terbesar ke terkecil dan mencari peringkat 1.",
    konsep: "Bubble sort, perulangan bersarang, penukaran nilai",
    langkah: [
      "Siapkan list nilai siswa.",
      "Gunakan bubble sort untuk mengurutkan dari besar ke kecil (tanda pembandingnya dibalik).",
      "Tampilkan tiga nilai teratas.",
    ],
    starter: `nilai = [78, 92, 65, 88, 71]
n = len(nilai)

# TODO: urutkan dari besar ke kecil dengan bubble sort
print(nilai)`,
    tantangan: "Simpan nama siswa juga (misalnya pakai dua list sejajar) supaya bisa menampilkan nama peringkat 1.",
    solusi: `nilai = [78, 92, 65, 88, 71]
n = len(nilai)

for i in range(n):
    for j in range(n - 1 - i):
        if nilai[j] < nilai[j + 1]:
            nilai[j], nilai[j + 1] = nilai[j + 1], nilai[j]

print("Urut:", nilai)
print("Peringkat 1:", nilai[0])`,
  },
  {
    judul: "Project 6 — Visualisasi Binary Search Tree",
    level: "tantangan",
    tujuan: "Membuat BST sendiri: masukkan angka, lalu tampilkan isinya secara urut.",
    konsep: "Tree, node, rekursi, in-order traversal",
    langkah: [
      "Buat kelas `Node` berisi nilai, anak kiri, dan anak kanan.",
      "Buat fungsi `masukkan` yang membandingkan nilai lalu belok kiri/kanan.",
      "Buat fungsi `cetak_urut` (in-order): kiri dulu, lalu dirinya, lalu kanan.",
      "Masukkan beberapa angka acak, lalu cetak. Hasilnya otomatis urut.",
    ],
    starter: `class Node:
    def __init__(self, nilai):
        self.nilai = nilai
        self.kiri = None
        self.kanan = None

# TODO: buat fungsi masukkan(node, nilai)
# TODO: buat fungsi cetak_urut(node)`,
    tantangan: "Tambahkan fungsi `cari(node, nilai)` yang mengembalikan True/False, lalu hitung berapa langkah yang dipakai.",
    solusi: `class Node:
    def __init__(self, nilai):
        self.nilai = nilai
        self.kiri = None
        self.kanan = None

def masukkan(node, nilai):
    if node is None:
        return Node(nilai)
    if nilai < node.nilai:
        node.kiri = masukkan(node.kiri, nilai)
    else:
        node.kanan = masukkan(node.kanan, nilai)
    return node

def cetak_urut(node):
    if node is None:
        return
    cetak_urut(node.kiri)
    print(node.nilai)
    cetak_urut(node.kanan)

akar = None
for angka in [50, 30, 70, 20, 40]:
    akar = masukkan(akar, angka)

cetak_urut(akar)   # 20 30 40 50 70`,
  },
];

const WARNA_LEVEL = { pemula: "badge-green", menengah: "badge-amber", tantangan: "badge-red" };
const NAMA_LEVEL = { pemula: "🟢 Pemula", menengah: "🟡 Menengah", tantangan: "🔴 Tantangan" };

/* ---------- RENDER HALAMAN ---------- */
export function renderLatihan(root) {
  const hasil = ambilKuis();
  const dijawab = Object.keys(hasil).length;
  const benar = Object.values(hasil).filter(Boolean).length;

  root.innerHTML = `
    <div class="container section" style="padding-bottom:1rem">
      <span class="eyebrow">Latihan</span>
      <h1>Uji pemahamanmu</h1>
      <p class="muted" style="max-width:640px">
        Salah itu bagian dari belajar. Setiap jawaban selalu disertai penjelasan,
        jadi kamu tetap dapat ilmu walaupun jawabannya meleset.
      </p>
      <p class="badge" style="margin-top:0.5rem">Sudah dijawab: ${dijawab} soal · Benar: ${benar}</p>

      <div class="filter-row" role="group" aria-label="Filter tingkat kesulitan" style="margin-top:1.5rem">
        <button class="filter-btn" data-filter="semua" aria-pressed="true">Semua</button>
        <button class="filter-btn" data-filter="pemula" aria-pressed="false">🟢 Pemula</button>
        <button class="filter-btn" data-filter="menengah" aria-pressed="false">🟡 Menengah</button>
        <button class="filter-btn" data-filter="tantangan" aria-pressed="false">🔴 Tantangan</button>
      </div>

      <div id="daftar-soal">
        ${SOAL.map(htmlSoal).join("")}
      </div>

      <h2 style="margin-top:3rem">🖊️ Soal terbuka</h2>
      <p class="muted">Tidak ada pilihan ganda. Jawab di kepala (atau tulis di kertas), baru buka kuncinya.</p>
      ${SOAL_TERBUKA.map(htmlTerbuka).join("")}

      <h2 style="margin-top:3.5rem">🛠️ Mini Project</h2>
      <p class="muted" style="max-width:640px">
        Belajar tanpa praktik cepat lupa. Kerjakan project ini di
        <a href="#/materi">playground</a>, di editor favoritmu, atau di HP pakai aplikasi Python.
      </p>
      ${PROJEK.map(htmlProjek).join("")}
    </div>`;

  // Kuis pilihan ganda
  $$(".quiz", root).forEach((q) => pasangKuis(q));

  // Filter tingkat kesulitan
  $$(".filter-btn", root).forEach((tombol) => {
    tombol.addEventListener("click", () => {
      const pilih = tombol.dataset.filter;
      $$(".filter-btn", root).forEach((t) => t.setAttribute("aria-pressed", String(t === tombol)));
      $$("#daftar-soal .quiz", root).forEach((kartu) => {
        kartu.classList.toggle("hidden", pilih !== "semua" && kartu.dataset.level !== pilih);
      });
    });
  });
}

function htmlSoal(s) {
  return `<div class="quiz" data-kuis="${s.id}" data-level="${s.level}">
      <span class="badge ${WARNA_LEVEL[s.level]}">${NAMA_LEVEL[s.level]}</span>
      <p class="quiz-q" style="margin-top:0.6rem">${md(s.q)}</p>
      <div class="quiz-opsi">
        ${s.opsi
          .map(
            (o, i) => `<button class="opsi" type="button" data-index="${i}" data-benar="${s.jawab}">
              <span class="huruf">${String.fromCharCode(65 + i)}</span><span>${md(o)}</span>
            </button>`
          )
          .join("")}
      </div>
      <p class="quiz-jawab hidden" data-jelas="${esc(s.jelas)}"></p>
    </div>`;
}

function htmlTerbuka(s) {
  return `<details class="akordeon">
      <summary><span>${md(s.q)}</span></summary>
      <div class="isi">
        <span class="badge ${WARNA_LEVEL[s.level]}">${NAMA_LEVEL[s.level]}</span>
        <p style="margin-top:0.7rem">${md(s.jawab)}</p>
      </div>
    </details>`;
}

function htmlProjek(p) {
  return `<details class="akordeon">
      <summary><span>${esc(p.judul)}</span></summary>
      <div class="isi">
        <span class="badge ${WARNA_LEVEL[p.level]}">${NAMA_LEVEL[p.level]}</span>
        <p style="margin-top:0.8rem"><strong>🎯 Tujuan:</strong> ${esc(p.tujuan)}</p>
        <p><strong>🧩 Konsep yang dipakai:</strong> ${esc(p.konsep)}</p>
        <p><strong>📋 Langkah pengerjaan:</strong></p>
        <ol class="step-list">${p.langkah.map((l) => `<li>${md(l)}</li>`).join("")}</ol>
        <p><strong>💻 Starter code:</strong></p>
        <pre><code>${esc(p.starter)}</code></pre>
        <div class="callout callout-warn"><h4>🔥 Tantangan tambahan</h4><p>${esc(p.tantangan)}</p></div>
        <details class="akordeon" style="margin-top:0.8rem">
          <summary><span>Lihat solusi (coba sendiri dulu ya!)</span></summary>
          <div class="isi"><pre><code>${esc(p.solusi)}</code></pre></div>
        </details>
      </div>
    </details>`;
}
