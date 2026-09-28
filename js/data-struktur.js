/* =========================================================
   data-struktur.js — Materi Level 3 sampai 9
   Array, Linked List, Stack, Queue, Hash Table, Tree, Graph
   ========================================================= */

export const LEVEL_3 = {
  id: "level-3",
  nama: "Level 3 — Array",
  emoji: "🗃️",
  deskripsi: "Struktur data pertama dan paling sering dipakai: deretan loker.",
  materi: [
    {
      id: "array",
      judul: "Array: Deretan Loker Bernomor",
      emoji: "🗃️",
      ringkas: "Satu nama, banyak data, tiap data punya nomor.",
      blocks: [
        { t: "p", v: "Bayangkan kamu punya 4 buah di kulkas. Kalau dibuat variabel satu-satu: `buah1`, `buah2`, `buah3`, `buah4`. Repot, kan? Apalagi kalau ada 1000." },
        {
          t: "analogi",
          judul: "🔢 Analogi: loker di stasiun",
          v: [
            "Ada deretan loker berjejer, masing-masing punya nomor.",
            "Kamu tidak perlu membuka semua loker untuk mengambil tasmu.",
            "Cukup ingat nomornya, langsung buka loker itu.",
            "Array bekerja persis seperti itu.",
          ],
        },
        {
          t: "ascii",
          v: `[Apel] [Jeruk] [Mangga] [Pisang]
   0      1       2        3
   ↑
 nomor posisi (disebut INDEX)`,
        },
        {
          t: "note",
          judul: "Kenapa index mulai dari 0?",
          v: ["Anggap index itu “berapa langkah dari awal”. Data pertama jaraknya 0 langkah dari awal, jadi index-nya 0.", "Awalnya memang terasa aneh. Lama-lama terbiasa, janji."],
        },
        { t: "h", v: "Membuat array di Python" },
        {
          t: "code",
          lang: "python",
          v: `buah = ["Apel", "Jeruk", "Mangga", "Pisang"]

print(buah[0])   # Apel
print(buah[2])   # Mangga
print(len(buah)) # 4  (banyaknya data)`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "buah", jelas: "Nama array-nya. Satu nama untuk menampung banyak data sekaligus." },
            " = ",
            { teks: "[", jelas: "Kurung siku = tanda awal daftar (list). Di Python, array biasa disebut list." },
            "\"Apel\", \"Jeruk\", \"Mangga\", \"Pisang\"",
            { teks: "]", jelas: "Tanda akhir daftar." },
            "\n\n",
            { teks: "buah[0]", jelas: "Ambil isi loker nomor 0 → \"Apel\". Angka di dalam kurung siku disebut index." },
            "\n",
            { teks: "len(buah)", jelas: "len = length = panjang. Menghitung ada berapa data di dalam array." },
          ],
        },
        { t: "h", v: "Operasi dasar pada array" },
        {
          t: "tabel",
          head: ["Operasi", "Artinya", "Contoh Python", "Cepat?"],
          rows: [
            ["Access", "Mengambil data lewat index", "`buah[1]`", "O(1) sangat cepat"],
            ["Update", "Mengganti isi", "`buah[1] = \"Nanas\"`", "O(1) sangat cepat"],
            ["Insert (akhir)", "Menambah di belakang", "`buah.append(\"Melon\")`", "O(1) cepat"],
            ["Insert (tengah)", "Menyisipkan", "`buah.insert(1, \"Salak\")`", "O(n) agak lambat"],
            ["Delete", "Menghapus", "`buah.pop(0)`", "O(n) agak lambat"],
            ["Search", "Mencari nilai", "cek satu-satu", "O(n)"],
            ["Traversal", "Menyusuri semua data", "pakai `for`", "O(n)"],
          ],
        },
        {
          t: "note",
          judul: "Kenapa menyisipkan di tengah itu lambat?",
          v: ["Karena semua data di belakangnya harus digeser satu per satu, seperti menyisipkan orang di tengah barisan upacara. Semua yang di belakang harus mundur."],
        },
        { t: "h", v: "Traversal: menyusuri isi array" },
        {
          t: "code",
          lang: "python",
          v: `buah = ["Apel", "Jeruk", "Mangga"]

for item in buah:
    print("Saya suka", item)`,
        },
        { t: "ascii", v: `Saya suka Apel\nSaya suka Jeruk\nSaya suka Mangga` },
        {
          t: "viz",
          target: "array",
          label: "Buka visualisasi Array",
          v: "Coba tambah, hapus, ubah, dan cari data — lalu lihat kotak-kotaknya bergerak.",
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "**Off-by-one error**: array berisi 4 data, lalu mengakses `buah[4]` → error, karena index terakhir adalah 3.",
            "Mengira index dimulai dari 1.",
            "Menghapus data sambil melakukan `for` pada array yang sama → urutan jadi kacau.",
          ],
        },
        {
          t: "kuis",
          id: "k-arr-1",
          q: "Pada `warna = [\"merah\", \"hijau\", \"biru\"]`, apa isi `warna[1]`?",
          opsi: ["merah", "hijau", "biru", "Error"],
          jawab: 1,
          jelas: "Index 0 = merah, index 1 = hijau, index 2 = biru.",
        },
        {
          t: "ringkas",
          v: [
            "Array = deretan data dengan nomor posisi (index).",
            "Index mulai dari 0.",
            "Ambil lewat index sangat cepat, menyisipkan di tengah agak lambat.",
          ],
        },
      ],
    },
  ],
};

export const LEVEL_4 = {
  id: "level-4",
  nama: "Level 4 — Linked List",
  emoji: "🚂",
  deskripsi: "Data yang saling bergandengan tangan seperti gerbong kereta.",
  materi: [
    {
      id: "linked-list",
      judul: "Linked List: Rangkaian Gerbong Kereta",
      emoji: "🚂",
      ringkas: "Setiap data tahu siapa data berikutnya.",
      blocks: [
        { t: "p", v: "Linked List itu seperti kereta. Setiap gerbong menyimpan barang. Setiap gerbong juga tahu gerbong berikutnya siapa." },
        {
          t: "analogi",
          judul: "🚂 Analogi: kereta api",
          v: [
            "Satu gerbong = satu **Node** (kotak data).",
            "Gerbong paling depan = **Head**.",
            "Gerbong paling belakang = **Tail**. Dia tidak menunjuk siapa-siapa (null / kosong).",
            "Sambungan antar gerbong = **Next** (penunjuk ke gerbong berikutnya).",
          ],
        },
        {
          t: "ascii",
          v: `HEAD
 ↓
[ Andi | → ] → [ Budi | → ] → [ Caca | ✕ ]
                                    ↑
                                  TAIL (next-nya kosong)`,
        },
        { t: "h", v: "Bedanya dengan Array" },
        {
          t: "tabel",
          head: ["", "Array", "Linked List"],
          rows: [
            ["Letak di memori", "Berjejer rapi", "Boleh berpencar, dihubungkan penunjuk"],
            ["Ambil data ke-100", "Langsung, O(1)", "Harus jalan dari head, O(n)"],
            ["Sisip di depan", "Lambat (geser semua), O(n)", "Sangat cepat, O(1)"],
            ["Ukuran", "Biasanya sudah ditentukan", "Bisa tumbuh sesuka hati"],
          ],
        },
        {
          t: "analogi",
          judul: "🏃 Kenapa mencari di Linked List lambat?",
          v: ["Karena kamu tidak bisa “lompat” ke gerbong ke-100.", "Kamu harus masuk dari gerbong 1, lewat gerbong 2, 3, dan seterusnya. Namanya **traversal**."],
        },
        { t: "h", v: "Contoh kode sederhana" },
        {
          t: "code",
          lang: "python",
          v: `class Node:
    def __init__(self, data):
        self.data = data     # isi gerbong
        self.next = None     # awalnya belum nyambung ke siapa-siapa

# Membuat tiga gerbong
a = Node("Andi")
b = Node("Budi")
c = Node("Caca")

# Menyambungkan gerbong
a.next = b
b.next = c

# Menyusuri dari depan (traversal)
sekarang = a
while sekarang is not None:
    print(sekarang.data)
    sekarang = sekarang.next`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "class Node:", jelas: "class = cetakan/blueprint. Di sini kita membuat cetakan untuk satu gerbong." },
            "\n    def __init__(self, data):\n        ",
            { teks: "self.data = data", jelas: "Menyimpan isi gerbong, misalnya nama \"Andi\"." },
            "\n        ",
            { teks: "self.next = None", jelas: "Penunjuk ke gerbong berikutnya. None artinya kosong / belum nyambung." },
            "\n\n",
            { teks: "a.next = b", jelas: "Menyambungkan gerbong a ke gerbong b. Inilah \"sambungan\" pada linked list." },
            "\n\n",
            { teks: "sekarang = a", jelas: "Mulai berjalan dari gerbong paling depan (head)." },
            "\n",
            { teks: "while sekarang is not None:", jelas: "Selama masih ada gerbong, terus jalan." },
            "\n    print(sekarang.data)\n    ",
            { teks: "sekarang = sekarang.next", jelas: "Pindah ke gerbong berikutnya. Ini inti dari traversal." },
          ],
        },
        { t: "h", v: "Menyisipkan gerbong baru" },
        {
          t: "steps",
          v: [
            "Buat gerbong baru, misal “Bayu”.",
            "Sambungkan Bayu ke gerbong yang tadinya disambung Andi (yaitu Budi).",
            "Baru ubah sambungan Andi supaya menunjuk ke Bayu.",
            "Selesai. Tidak perlu menggeser gerbong lain sama sekali.",
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Menyambung Andi → Bayu **duluan** sebelum Bayu → Budi. Akibatnya Budi dan Caca hilang, tidak ada yang menunjuk mereka.",
            "Lupa memperbarui `head` saat menghapus gerbong pertama.",
            "Mengira bisa langsung `list[5]` seperti array. Tidak bisa, harus jalan satu per satu.",
          ],
        },
        {
          t: "viz",
          target: "linkedlist",
          label: "Buka visualisasi Linked List",
          v: "Tambah dan hapus node, lalu lihat panah sambungannya berubah.",
        },
        {
          t: "kuis",
          id: "k-ll-1",
          q: "Gerbong pertama pada linked list disebut apa?",
          opsi: ["Root", "Head", "Tail", "Index"],
          jawab: 1,
          jelas: "Head = kepala = node pertama. Node terakhir disebut Tail.",
        },
        {
          t: "ringkas",
          v: [
            "Node = kotak berisi data + penunjuk ke node berikutnya.",
            "Head = node pertama, Tail = node terakhir.",
            "Menyisipkan/menghapus cepat, tapi mencari harus dari awal.",
          ],
        },
      ],
    },
  ],
};

export const LEVEL_5 = {
  id: "level-5",
  nama: "Level 5 — Stack",
  emoji: "🍽️",
  deskripsi: "Yang terakhir masuk, keluar duluan.",
  materi: [
    {
      id: "stack",
      judul: "Stack: Tumpukan Piring",
      emoji: "🍽️",
      ringkas: "LIFO — Last In, First Out.",
      blocks: [
        { t: "p", v: "Stack itu seperti tumpukan piring di dapur." },
        {
          t: "analogi",
          judul: "🍽️ Analogi: tumpukan piring",
          v: [
            "Kamu menaruh piring dari bawah ke atas.",
            "Kalau mau mengambil piring, kamu ambil yang paling atas dulu.",
            "Mengambil piring paling bawah? Bisa, tapi tumpukannya roboh. 😅",
            "Jadi: **yang terakhir masuk, keluar lebih dulu**.",
          ],
        },
        { t: "p", v: "Aturan ini namanya **LIFO** (*Last In, First Out*). Dalam programming, struktur seperti ini disebut **Stack**." },
        {
          t: "ascii",
          v: `      ┌──────────┐
TOP → │ Piring 3 │ ← keluar duluan
      ├──────────┤
      │ Piring 2 │
      ├──────────┤
      │ Piring 1 │ ← masuk paling awal
      └──────────┘`,
        },
        { t: "h", v: "Empat operasi yang perlu diingat" },
        {
          t: "tabel",
          head: ["Operasi", "Artinya", "Analogi piring"],
          rows: [
            ["**push**", "Menambah data di atas", "Menaruh piring baru"],
            ["**pop**", "Mengambil & menghapus data teratas", "Mengambil piring paling atas"],
            ["**peek**", "Melihat data teratas tanpa mengambil", "Mengintip piring teratas"],
            ["**isEmpty**", "Mengecek apakah kosong", "Apakah raknya kosong?"],
          ],
        },
        { t: "h", v: "Contoh kode" },
        {
          t: "code",
          lang: "python",
          v: `stack = []

stack.append("Piring 1")
stack.append("Piring 2")
stack.append("Piring 3")

print(stack)        # ['Piring 1', 'Piring 2', 'Piring 3']

stack.pop()         # mengambil "Piring 3"

print(stack)        # ['Piring 1', 'Piring 2']
print(stack[-1])    # peek → 'Piring 2'
print(len(stack) == 0)  # isEmpty → False`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "stack", jelas: "Nama wadah kita — bayangkan ini rak piringnya." },
            " = ",
            { teks: "[]", jelas: "Kurung siku kosong = tumpukan yang masih kosong." },
            "\n\nstack",
            { teks: ".append(", jelas: "append artinya \"tambahkan ke belakang\". Di stack, belakang = paling atas. Inilah PUSH." },
            { teks: "\"Piring 1\"", jelas: "Data yang dimasukkan. Tanda kutip menandakan ini teks." },
            ")\n\nstack",
            { teks: ".pop()", jelas: "pop artinya \"copot\". Mengambil sekaligus menghapus data paling atas." },
            "\n\n",
            { teks: "stack[-1]", jelas: "Index -1 = data paling akhir = piring paling atas. Ini cara melakukan PEEK (hanya melihat)." },
          ],
        },
        { t: "h", v: "Langkah demi langkah" },
        {
          t: "steps",
          v: [
            "Stack kosong: `[]`",
            "push “Piring 1” → `[Piring 1]`",
            "push “Piring 2” → `[Piring 1, Piring 2]`",
            "push “Piring 3” → `[Piring 1, Piring 2, Piring 3]`",
            "pop → mengeluarkan “Piring 3” → `[Piring 1, Piring 2]`",
          ],
        },
        {
          t: "ok",
          judul: "Di mana stack dipakai sehari-hari?",
          v: [
            "Tombol **Undo** (Ctrl+Z): perubahan terakhir dibatalkan duluan.",
            "Tombol **Back** di browser: halaman terakhir yang dikunjungi, itu yang dibuka lagi.",
            "Tumpukan pemanggilan fungsi (call stack) — nanti dipakai di materi Recursion.",
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Melakukan `pop()` saat stack kosong → error. Selalu cek `isEmpty` dulu.",
            "Tertukar dengan queue. Ingat: stack = piring (atas dulu), queue = antrean (depan dulu).",
            "Mengira `peek` menghapus data. Tidak, `peek` cuma mengintip.",
          ],
        },
        {
          t: "viz",
          target: "stack",
          label: "Buka simulator Stack",
          v: "Tekan Push, Pop, dan Peek lalu lihat tumpukannya bergerak.",
        },
        {
          t: "kuis",
          id: "k-stack-1",
          q: "Kamu push A, lalu B, lalu C. Kemudian melakukan satu kali pop. Data apa yang keluar?",
          opsi: ["A", "B", "C", "Semua keluar"],
          jawab: 2,
          jelas: "C masuk paling akhir, jadi dia yang keluar duluan (LIFO).",
        },
        { t: "ringkas", v: ["Stack = tumpukan piring, LIFO.", "push (taruh), pop (ambil atas), peek (intip), isEmpty (cek kosong).", "Dipakai untuk undo, tombol back, dan call stack."] },
      ],
    },
  ],
};

export const LEVEL_6 = {
  id: "level-6",
  nama: "Level 6 — Queue",
  emoji: "🧍",
  deskripsi: "Yang pertama datang, dilayani duluan. Adil seperti antrean.",
  materi: [
    {
      id: "queue",
      judul: "Queue: Antrean di Kasir",
      emoji: "🧍",
      ringkas: "FIFO — First In, First Out.",
      blocks: [
        { t: "p", v: "Queue (baca: kyu) itu antrean. Persis seperti antre di kasir minimarket." },
        {
          t: "analogi",
          judul: "🛒 Analogi: antre di kasir",
          v: [
            "Orang yang datang duluan berdiri paling depan.",
            "Kasir melayani dari depan.",
            "Orang baru berdiri di paling belakang.",
            "Kalau ada yang menyerobot, semua orang marah. 😠 Queue itu adil.",
          ],
        },
        { t: "p", v: "Aturannya: **yang pertama masuk, keluar duluan** — disebut **FIFO** (*First In, First Out*)." },
        {
          t: "ascii",
          v: `keluar dari sini                     masuk dari sini
     ↓                                        ↓
  [ Andi ] ← [ Budi ] ← [ Caca ] ← [ Dina ]
   FRONT                              REAR`,
        },
        {
          t: "tabel",
          head: ["Operasi", "Artinya", "Analogi antrean"],
          rows: [
            ["**enqueue**", "Menambah data di belakang", "Orang baru ikut antre"],
            ["**dequeue**", "Mengeluarkan data terdepan", "Orang paling depan dilayani"],
            ["**front**", "Melihat siapa yang paling depan", "Mengintip antrean terdepan"],
            ["**rear**", "Melihat siapa yang paling belakang", "Orang terakhir yang datang"],
          ],
        },
        {
          t: "code",
          lang: "python",
          v: `antrean = []

antrean.append("Andi")   # enqueue
antrean.append("Budi")
antrean.append("Caca")

print(antrean[0])        # front → Andi

dilayani = antrean.pop(0)  # dequeue → Andi keluar
print(dilayani)            # Andi
print(antrean)             # ['Budi', 'Caca']`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "antrean.append(\"Andi\")", jelas: "Menambah orang di barisan paling belakang. Inilah ENQUEUE." },
            "\n",
            { teks: "antrean[0]", jelas: "Index 0 = paling depan = FRONT. Hanya melihat, tidak mengeluarkan." },
            "\n",
            { teks: "antrean.pop(0)", jelas: "pop(0) = keluarkan data di posisi 0 (paling depan). Inilah DEQUEUE." },
          ],
        },
        {
          t: "ok",
          judul: "Di mana queue dipakai?",
          v: ["Antrean cetak printer: dokumen pertama dicetak duluan.", "Antrean pesanan di aplikasi ojek online.", "Antrean lagu berikutnya di aplikasi musik.", "Sistem nomor antrean bank."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Memakai `pop()` (tanpa angka) untuk queue → itu mengeluarkan yang paling belakang, jadi malah berubah menjadi stack.",
            "Dequeue saat antrean kosong → error.",
            "Lupa bedanya: Stack = LIFO, Queue = FIFO.",
          ],
        },
        {
          t: "viz",
          target: "queue",
          label: "Buka simulator Queue",
          v: "Tambah orang, lalu layani orang paling depan.",
        },
        {
          t: "kuis",
          id: "k-queue-1",
          q: "Antreannya: Andi → Budi → Caca. Siapa yang keluar lebih dulu?",
          opsi: ["Caca", "Budi", "Andi", "Acak"],
          jawab: 2,
          jelas: "Andi datang paling awal, jadi dia dilayani duluan. FIFO.",
        },
        { t: "ringkas", v: ["Queue = antrean, FIFO.", "enqueue (masuk belakang), dequeue (keluar depan).", "Dipakai untuk antrean printer, pesanan, dan pemrosesan berurutan."] },
      ],
    },
  ],
};

export const LEVEL_7 = {
  id: "level-7",
  nama: "Level 7 — Hash Table",
  emoji: "🗄️",
  deskripsi: "Cara mencari data super cepat: langsung tahu lacinya.",
  materi: [
    {
      id: "hash-table",
      judul: "Hash Table: Lemari Berlaci Nomor",
      emoji: "🗄️",
      ringkas: "Key → nomor laci → langsung ketemu.",
      blocks: [
        { t: "p", v: "Bayangkan kamu penjaga penitipan barang. Ada 10 laci. Kalau semua barang ditumpuk tanpa aturan, mencarinya lama." },
        {
          t: "analogi",
          judul: "🔑 Analogi: nomor laci dari nama",
          v: [
            "Kita buat aturan: jumlahkan huruf nama, lalu bagi 10, sisanya jadi nomor laci.",
            "Nama “Anam” → hasil hitungnya 5 → simpan di laci 5.",
            "Nanti waktu mencari “Anam”, kita hitung ulang → 5 → langsung buka laci 5.",
            "Tidak perlu membuka 10 laci satu per satu.",
          ],
        },
        {
          t: "ascii",
          v: `Nama: "Anam"
   ↓  (dihitung oleh hash function)
Angka: 5
   ↓
Laci nomor 5  →  [ Anam : 0812-xxxx ]`,
        },
        { t: "h", v: "Istilah-istilahnya" },
        {
          t: "tabel",
          head: ["Istilah", "Bahasa sederhana"],
          rows: [
            ["**Key**", "Kuncinya, misalnya nama orang"],
            ["**Value**", "Isinya, misalnya nomor telepon"],
            ["**Hash function**", "Mesin penghitung yang mengubah key jadi nomor laci"],
            ["**Bucket**", "Laci tempat menyimpan"],
            ["**Collision**", "Dua key kebetulan dapat nomor laci yang sama"],
          ],
        },
        { t: "h", v: "Collision — dua orang dapat laci yang sama" },
        { t: "p", v: "Kadang “Anam” dan “Rudi” sama-sama menghasilkan angka 5. Ini disebut **collision** (tabrakan)." },
        { t: "p", v: "Solusinya sederhana: laci nomor 5 diisi **daftar kecil** berisi dua-duanya. Waktu mencari, kita cek daftar pendek itu saja. Cara ini disebut *chaining*." },
        {
          t: "ascii",
          v: `Laci 5 → [ Anam : 0812 ] → [ Rudi : 0857 ]
            (isinya jadi dua, dicek satu per satu)`,
        },
        {
          t: "code",
          lang: "python",
          v: `# Di Python, hash table disebut "dictionary"
kontak = {}

kontak["Anam"] = "0812-1111"
kontak["Rudi"] = "0857-2222"

print(kontak["Anam"])       # 0812-1111
print("Rudi" in kontak)     # True
del kontak["Rudi"]          # menghapus`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "{}", jelas: "Kurung kurawal kosong = dictionary kosong (lemari yang masih kosong)." },
            "\n\nkontak",
            { teks: "[\"Anam\"]", jelas: "\"Anam\" adalah KEY. Bukan angka index, melainkan nama laci." },
            " = ",
            { teks: "\"0812-1111\"", jelas: "Ini VALUE, isi yang disimpan di dalam laci tersebut." },
            "\n\n",
            { teks: "\"Rudi\" in kontak", jelas: "Mengecek apakah key \"Rudi\" ada. Hasilnya True atau False." },
            "\n",
            { teks: "del kontak[\"Rudi\"]", jelas: "del = delete. Mengosongkan laci milik Rudi." },
          ],
        },
        {
          t: "ok",
          judul: "Kenapa hash table disukai?",
          v: ["Mencari data rata-rata O(1) — secepat mengambil barang dari laci yang sudah diketahui nomornya.", "Dipakai di mana-mana: database, cache, penyimpanan data login, penghitung kata."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Mengira data di dictionary pasti urut. Fokus hash table adalah kecepatan, bukan urutan.",
            "Mengakses key yang tidak ada → error. Gunakan pengecekan `in` dulu.",
            "Mengira collision itu bug. Collision itu normal dan sudah ada cara menanganinya.",
          ],
        },
        {
          t: "viz",
          target: "hash",
          label: "Buka visualisasi Hash Table",
          v: "Masukkan nama dan lihat dia jatuh ke laci nomor berapa. Coba juga bikin tabrakan!",
        },
        {
          t: "kuis",
          id: "k-hash-1",
          q: "Apa yang disebut collision pada hash table?",
          opsi: ["Data hilang saat disimpan", "Dua key berbeda menghasilkan nomor laci yang sama", "Hash table penuh", "Key berisi huruf besar semua"],
          jawab: 1,
          jelas: "Collision = dua key jatuh ke laci yang sama. Ditangani, misalnya, dengan menyimpan daftar kecil di laci itu.",
        },
        { t: "ringkas", v: ["Hash table = key diubah jadi nomor laci oleh hash function.", "Pencarian rata-rata O(1).", "Collision itu wajar dan bisa diatasi."] },
      ],
    },
  ],
};

export const LEVEL_8 = {
  id: "level-8",
  nama: "Level 8 — Tree",
  emoji: "🌳",
  deskripsi: "Data bertingkat seperti silsilah keluarga.",
  materi: [
    {
      id: "tree",
      judul: "Tree: Silsilah Keluarga",
      emoji: "🌳",
      ringkas: "Root, parent, child, leaf — cuma istilah keluarga.",
      blocks: [
        { t: "p", v: "Tree (pohon) itu struktur bertingkat. Paling gampang dibayangkan sebagai silsilah keluarga." },
        {
          t: "ascii",
          v: `          Kakek          ← ROOT (paling atas)
         /     \\
      Ayah      Paman       ← anak dari Kakek
      /  \\
   Kamu   Adik              ← LEAF (tidak punya anak)`,
        },
        {
          t: "tabel",
          head: ["Istilah", "Bahasa sederhana"],
          rows: [
            ["**Root**", "Paling atas, tidak punya orang tua (Kakek)"],
            ["**Parent**", "Orang tua dari sebuah node (Ayah adalah parent Kamu)"],
            ["**Child**", "Anak dari sebuah node"],
            ["**Leaf**", "Node yang tidak punya anak (Kamu, Adik, Paman)"],
            ["**Edge**", "Garis penghubung antar node"],
            ["**Depth**", "Berapa langkah dari root ke node itu"],
            ["**Height**", "Jarak terpanjang dari root sampai leaf terbawah"],
          ],
        },
        {
          t: "note",
          judul: "Kenapa gambarnya terbalik?",
          v: ["Di dunia programming, pohon digambar dengan akar (root) di ATAS dan daun di bawah. Aneh memang, tapi sudah jadi kebiasaan sejak dulu."],
        },
        { t: "h", v: "Binary Tree" },
        { t: "p", v: "**Binary Tree** = pohon yang setiap node-nya punya **maksimal 2 anak**: anak kiri dan anak kanan. Itu saja aturannya." },
        { t: "h", v: "Binary Search Tree (BST)" },
        { t: "p", v: "BST adalah binary tree dengan satu aturan tambahan yang membuatnya sakti:" },
        {
          t: "ok",
          judul: "Aturan emas BST",
          v: ["Angka yang **lebih kecil** dari node → taruh di **kiri**.", "Angka yang **lebih besar** dari node → taruh di **kanan**."],
        },
        {
          t: "ascii",
          v: `Memasukkan: 50, 30, 70, 20, 40

            50
           /  \\
         30    70
        /  \\
      20    40

Mencari 40:
  40 < 50 → ke kiri
  40 > 30 → ke kanan
  ketemu! (cuma 3 langkah)`,
        },
        { t: "p", v: "Karena setiap langkah membuang separuh kemungkinan, mencari di BST yang seimbang butuh sekitar **O(log n)** langkah. Cepat sekali." },
        {
          t: "code",
          lang: "python",
          v: `class Node:
    def __init__(self, nilai):
        self.nilai = nilai
        self.kiri = None
        self.kanan = None

def masukkan(node, nilai):
    if node is None:
        return Node(nilai)          # tempat kosong → taruh di sini
    if nilai < node.nilai:
        node.kiri = masukkan(node.kiri, nilai)
    else:
        node.kanan = masukkan(node.kanan, nilai)
    return node`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "self.kiri = None", jelas: "Tempat anak kiri, awalnya kosong (None)." },
            "\n",
            { teks: "self.kanan = None", jelas: "Tempat anak kanan, awalnya juga kosong." },
            "\n\n",
            { teks: "if node is None:", jelas: "Kalau posisinya kosong, berarti di sinilah tempat yang tepat untuk node baru." },
            "\n    return Node(nilai)\n",
            { teks: "if nilai < node.nilai:", jelas: "Nilai lebih kecil → belok kiri. Inilah aturan emas BST." },
            "\n    node.kiri = ",
            { teks: "masukkan(node.kiri, nilai)", jelas: "Fungsi memanggil dirinya sendiri (rekursi) untuk memeriksa cabang kiri." },
          ],
        },
        {
          t: "ok",
          judul: "Tree dipakai di mana?",
          v: ["Struktur folder di komputer (folder di dalam folder).", "Struktur halaman web (HTML itu sebuah tree!).", "Menu bertingkat pada aplikasi.", "Index database supaya pencarian cepat."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Memasukkan data yang sudah urut (1,2,3,4,5) ke BST → pohonnya jadi lurus ke bawah seperti linked list, dan kecepatannya turun jadi O(n).",
            "Tertukar antara depth (dari atas ke node) dan height (dari node ke daun terjauh).",
            "Mengira semua tree pasti binary. Tidak, anak bisa lebih dari dua.",
          ],
        },
        {
          t: "viz",
          target: "tree",
          label: "Buka visualisasi Binary Search Tree",
          v: "Masukkan angka, cari, dan hapus node. Lihat pohonnya tumbuh.",
        },
        {
          t: "kuis",
          id: "k-tree-1",
          q: "Pada BST, angka yang lebih kecil dari node saat ini diletakkan di mana?",
          opsi: ["Kanan", "Kiri", "Atas", "Bebas"],
          jawab: 1,
          jelas: "Aturan emas BST: kecil ke kiri, besar ke kanan.",
        },
        { t: "ringkas", v: ["Tree = data bertingkat; root di atas, leaf di bawah.", "Binary tree = maksimal 2 anak.", "BST = kecil ke kiri, besar ke kanan → pencarian O(log n)."] },
      ],
    },
  ],
};

export const LEVEL_9 = {
  id: "level-9",
  nama: "Level 9 — Graph",
  emoji: "🗺️",
  deskripsi: "Kota dan jalan, pertemanan, dan peta rute.",
  materi: [
    {
      id: "graph",
      judul: "Graph: Peta Kota dan Jalan",
      emoji: "🗺️",
      ringkas: "Titik-titik yang saling terhubung.",
      blocks: [
        { t: "p", v: "Graph itu kumpulan titik yang dihubungkan garis. Contoh paling gampang: peta kota." },
        {
          t: "ascii",
          v: `Jakarta ────── Bandung
   │               │
   │               │
 Bogor ────────  Cirebon`,
        },
        {
          t: "tabel",
          head: ["Istilah", "Bahasa sederhana", "Di peta"],
          rows: [
            ["**Vertex / Node**", "Titiknya", "Kota"],
            ["**Edge**", "Garis penghubung", "Jalan"],
            ["**Neighbor**", "Tetangga yang tersambung langsung", "Kota sebelah"],
            ["**Weight**", "Nilai pada garis", "Jarak km / lama perjalanan"],
          ],
        },
        { t: "h", v: "Tiga jenis graph yang perlu dikenal" },
        {
          t: "analogi",
          judul: "↔️ Undirected Graph (dua arah)",
          v: ["Jalan dua arah. Kalau Jakarta terhubung Bogor, maka Bogor juga terhubung Jakarta.", "Contoh: pertemanan Facebook. Kalau A berteman dengan B, otomatis B berteman dengan A."],
        },
        {
          t: "analogi",
          judul: "➡️ Directed Graph (satu arah)",
          v: ["Jalan satu arah. Dari A bisa ke B, tapi dari B belum tentu bisa ke A.", "Contoh: following Instagram. Kamu follow artis, artisnya belum tentu follow kamu. 😅"],
        },
        {
          t: "analogi",
          judul: "⚖️ Weighted Graph (berbobot)",
          v: ["Setiap jalan punya angka: jarak, biaya, atau waktu tempuh.", "Google Maps memakai ini untuk mencari rute tercepat, bukan sekadar rute yang ada."],
        },
        {
          t: "ascii",
          v: `Weighted & undirected:

Jakarta ──150km── Bandung
   │                  │
  60km              130km
   │                  │
 Bogor ────220km──── Cirebon`,
        },
        { t: "h", v: "Cara menyimpan graph di kode" },
        {
          t: "code",
          lang: "python",
          v: `# Cara paling umum: dictionary berisi daftar tetangga
peta = {
    "Jakarta": ["Bandung", "Bogor"],
    "Bandung": ["Jakarta", "Cirebon"],
    "Bogor":   ["Jakarta", "Cirebon"],
    "Cirebon": ["Bandung", "Bogor"]
}

print(peta["Jakarta"])   # ['Bandung', 'Bogor']`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "peta = {", jelas: "Kita memakai dictionary (hash table) sebagai wadah graph." },
            "\n    ",
            { teks: "\"Jakarta\"", jelas: "Key = nama kota (vertex)." },
            ": ",
            { teks: "[\"Bandung\", \"Bogor\"]", jelas: "Value = daftar kota yang tersambung langsung (tetangga). Ini disebut adjacency list." },
            "\n}",
          ],
        },
        {
          t: "ok",
          judul: "Graph ada di sekitar kita",
          v: ["Google Maps: kota/persimpangan = vertex, jalan = edge, jarak = weight.", "Media sosial: orang = vertex, pertemanan = edge.", "Internet: halaman web = vertex, link = edge.", "Rekomendasi “teman yang mungkin kamu kenal” = menelusuri graph."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Tertukar tree dan graph. Tree itu graph khusus: tidak ada lingkaran (siklus) dan punya root.",
            "Lupa mencatat kedua arah pada undirected graph.",
            "Menelusuri graph tanpa mencatat “sudah pernah dikunjungi” → berputar-putar selamanya.",
          ],
        },
        {
          t: "kuis",
          id: "k-graph-1",
          q: "Following di Instagram paling tepat digambarkan sebagai graph jenis apa?",
          opsi: ["Undirected graph", "Directed graph", "Weighted tree", "Binary tree"],
          jawab: 1,
          jelas: "Karena hubungannya satu arah: kamu follow dia, belum tentu dia follow kamu.",
        },
        { t: "ringkas", v: ["Graph = vertex (titik) + edge (garis).", "Undirected = dua arah, directed = satu arah, weighted = ada bobotnya.", "Google Maps dan media sosial secara konsep memakai graph."] },
      ],
    },
  ],
};
