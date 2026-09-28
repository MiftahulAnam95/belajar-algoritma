/* =========================================================
   data-dasar.js — Materi Level 0, 1, 2
   Setiap materi memakai urutan:
   masalah → analogi → konsep → visualisasi → contoh → kode →
   bedah kode → langkah → kesalahan umum → latihan → ringkasan
   ========================================================= */

export const LEVEL_0 = {
  id: "level-0",
  nama: "Level 0 — Kenalan Dulu",
  emoji: "👋",
  deskripsi: "Belum tahu apa-apa? Mulai dari sini. Tidak ada kode yang rumit.",
  materi: [
    {
      id: "apa-itu-algoritma",
      judul: "Apa Itu Algoritma?",
      emoji: "🍜",
      ringkas: "Ternyata kamu sudah sering memakai algoritma tanpa sadar.",
      blocks: [
        { t: "p", v: "Pernah bikin mi instan? Kalau pernah, selamat: kamu sudah pernah menjalankan sebuah **algoritma**." },
        {
          t: "analogi",
          judul: "🍜 Analogi: membuat mi instan",
          v: [
            "Waktu memasak mi, kamu tidak asal-asalan. Ada urutannya.",
            "Kalau bumbu dimasukkan sebelum air mendidih, hasilnya aneh. Kalau mi dimakan sebelum matang, keras.",
            "Jadi **urutan itu penting**.",
          ],
        },
        {
          t: "ascii",
          v: `Air
 ↓
Rebus
 ↓
Masukkan mi
 ↓
Tunggu 3 menit
 ↓
Masukkan bumbu
 ↓
Aduk
 ↓
Selesai 🍜`,
        },
        { t: "p", v: "Urutan langkah tadi punya nama keren: **algoritma**." },
        {
          t: "ok",
          judul: "Definisi paling sederhana",
          v: ["**Algoritma = urutan langkah untuk menyelesaikan sesuatu.**", "Itu saja. Tidak perlu rumus. Tidak perlu matematika tingkat tinggi."],
        },
        { t: "h", v: "Contoh algoritma lain di kehidupan nyata" },
        {
          t: "list",
          v: [
            "Resep masakan → algoritma memasak.",
            "Petunjuk arah dari Google Maps → algoritma perjalanan.",
            "Cara memakai sepatu: kaus kaki dulu, baru sepatu → algoritma juga.",
            "Cara mencuci baju di mesin cuci → algoritma.",
          ],
        },
        { t: "h", v: "Lalu hubungannya dengan komputer apa?" },
        { t: "p", v: "Komputer itu **cepat tapi tidak bisa menebak**. Dia hanya menjalankan perintah, persis seperti yang kita tulis." },
        { t: "p", v: "Kalau kita bilang “masukkan bumbu” tanpa bilang “buka dulu bungkusnya”, komputer akan memasukkan bumbu beserta bungkusnya. Komputer tidak punya akal sehat." },
        { t: "p", v: "Jadi tugas kita sebagai programmer adalah: **menjelaskan langkah dengan sangat detail dan berurutan**." },
        { t: "h", v: "Contoh pertama dalam bentuk kode" },
        { t: "p", v: "Jangan takut dulu. Lihat saja pelan-pelan, nanti kita bedah satu per satu." },
        {
          t: "code",
          lang: "python",
          v: `angka = 10

if angka > 5:
    print("Angka besar")
else:
    print("Angka kecil")`,
        },
        { t: "p", v: "Kalau dibaca seperti bahasa manusia, isinya begini:" },
        {
          t: "steps",
          v: [
            "Simpan angka 10 ke dalam sebuah wadah bernama `angka`.",
            "Tanya: apakah isi wadah `angka` lebih besar dari 5?",
            "Jawabannya YA (karena 10 lebih besar dari 5).",
            "Maka tampilkan tulisan “Angka besar”.",
            "Tulisan “Angka kecil” dilewati, tidak dijalankan.",
          ],
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode — arahkan kursor / klik tiap bagian",
          potongan: [
            { teks: "angka", jelas: "Nama wadah (istilahnya: variabel). Kita yang menentukan namanya, bebas." },
            " ",
            { teks: "=", jelas: "Artinya “isi dengan”. Bukan “sama dengan” seperti di matematika." },
            " ",
            { teks: "10", jelas: "Isi yang dimasukkan ke dalam wadah." },
            "\n\n",
            { teks: "if", jelas: "Bahasa Inggris untuk “jika”. Dipakai untuk bertanya ya/tidak." },
            " ",
            { teks: "angka > 5", jelas: "Pertanyaannya: apakah isi wadah lebih besar dari 5?" },
            { teks: ":", jelas: "Tanda titik dua artinya: “kalau benar, lakukan yang di bawah ini”." },
            "\n    ",
            { teks: "print(\"Angka besar\")", jelas: "print artinya tampilkan ke layar. Tulisan di dalam tanda kutip akan muncul apa adanya." },
            "\n",
            { teks: "else", jelas: "Artinya “kalau tidak” / “selain itu”. Dijalankan kalau jawabannya TIDAK." },
            { teks: ":", jelas: "Sama seperti tadi: pembuka blok perintah." },
            "\n    print(\"Angka kecil\")",
          ],
        },
        {
          t: "note",
          judul: "Belum paham `if`? Santai.",
          v: ["Kita akan membahas `if` secara khusus di Level 1. Di sini kamu cukup tahu: `if` itu cara komputer **bertanya** sebelum memutuskan sesuatu."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Mengira algoritma harus rumit dan penuh rumus. Padahal resep mi instan pun algoritma.",
            "Menulis langkah yang “lompat”, misal: “goreng telur” padahal telurnya belum diambil dari kulkas.",
            "Menganggap komputer bisa menebak maksud kita. Tidak bisa. Harus eksplisit.",
            "Langsung menghafal kode tanpa memahami langkahnya dulu.",
          ],
        },
        {
          t: "kuis",
          id: "k-algo-1",
          q: "Manakah yang PALING tepat menggambarkan algoritma?",
          opsi: [
            "Bahasa pemrograman yang sulit dipelajari",
            "Urutan langkah untuk menyelesaikan suatu masalah",
            "Nama aplikasi untuk membuat website",
            "Rumus matematika tingkat lanjut",
          ],
          jawab: 1,
          jelas: "Algoritma = urutan langkah. Bisa ditulis di kertas, bisa juga jadi kode program.",
        },
        {
          t: "ringkas",
          v: [
            "Algoritma = urutan langkah untuk menyelesaikan sesuatu.",
            "Urutan itu penting; kalau tertukar, hasilnya salah.",
            "Komputer sangat cepat tapi tidak bisa menebak, jadi langkahnya harus jelas.",
            "Kamu sudah memakai algoritma setiap hari tanpa sadar.",
          ],
        },
      ],
    },

    {
      id: "apa-itu-struktur-data",
      judul: "Apa Itu Struktur Data?",
      emoji: "🗄️",
      ringkas: "Cara menyusun data supaya gampang dicari dan dipakai.",
      blocks: [
        { t: "p", v: "Bayangkan kamar yang semua barangnya ditumpuk jadi satu di lantai. Cari kaus kaki saja bisa 20 menit." },
        { t: "p", v: "Sekarang bayangkan kamar dengan lemari: laci 1 kaus kaki, laci 2 baju, laci 3 celana. Cari kaus kaki? 3 detik." },
        {
          t: "ok",
          judul: "Definisi sederhana",
          v: ["**Struktur data = cara menyusun dan menyimpan data agar mudah dipakai.**", "Datanya sama. Yang berbeda cuma cara menyusunnya."],
        },
        {
          t: "analogi",
          judul: "📦 Analogi: wadah di dapur",
          v: [
            "Telur ditaruh di rak telur (ada cekungannya).",
            "Beras ditaruh di karung.",
            "Garam ditaruh di toples kecil.",
            "Semuanya wadah, tapi bentuk wadah menyesuaikan isinya. Struktur data juga begitu.",
          ],
        },
        { t: "h", v: "Beberapa “wadah data” yang akan kita pelajari" },
        {
          t: "tabel",
          head: ["Struktur data", "Mirip apa di dunia nyata?", "Cocok untuk"],
          rows: [
            ["Array", "Deretan loker bernomor", "Data berurutan yang sering diambil lewat nomor"],
            ["Linked List", "Gerbong kereta", "Data yang sering ditambah/dihapus di tengah"],
            ["Stack", "Tumpukan piring", "Undo, riwayat, tombol back"],
            ["Queue", "Antrean kasir", "Antrean cetak, antrean pesanan"],
            ["Hash Table", "Lemari berlaci nomor", "Mencari data super cepat lewat nama/kunci"],
            ["Tree", "Silsilah keluarga", "Data bertingkat, pencarian cepat"],
            ["Graph", "Peta kota & jalan", "Jaringan, rute, pertemanan"],
          ],
        },
        { t: "p", v: "Belum paham istilahnya? Wajar banget. Semua akan dibahas satu per satu dengan analogi, jadi tenang saja." },
        { t: "h", v: "Algoritma dan struktur data itu pasangan" },
        {
          t: "ascii",
          v: `Struktur data  = cara menyimpan barang
Algoritma      = cara memakai barang itu

  Lemari rapi  +  cara mencari yang benar
        =  ketemu cepat`,
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Mengira struktur data cuma teori kuliah. Padahal tombol “back” di browser itu stack.",
            "Menghafal nama struktur data tanpa tahu kapan dipakai.",
            "Memilih struktur data asal-asalan, lalu programnya jadi lambat saat datanya banyak.",
          ],
        },
        {
          t: "kuis",
          id: "k-sd-1",
          q: "Kenapa kita butuh struktur data?",
          opsi: [
            "Supaya kode terlihat keren",
            "Supaya data tersusun rapi sehingga cepat dicari dan diolah",
            "Karena diwajibkan oleh bahasa pemrograman",
            "Supaya file program lebih kecil",
          ],
          jawab: 1,
          jelas: "Data yang tersusun rapi membuat pekerjaan komputer jauh lebih ringan.",
        },
        {
          t: "ringkas",
          v: [
            "Struktur data = cara menyusun data.",
            "Wadah yang tepat membuat pencarian jadi cepat.",
            "Algoritma dan struktur data selalu bekerja berpasangan.",
          ],
        },
      ],
    },

    {
      id: "kenapa-butuh-algoritma",
      judul: "Kenapa Kita Butuh Algoritma?",
      emoji: "🤔",
      ringkas: "Karena cara yang salah bisa bikin komputer kerja 1000x lebih lama.",
      blocks: [
        { t: "p", v: "Misalnya kamu disuruh mencari nama “Zulfa” di buku telepon berisi 1.000.000 nama." },
        {
          t: "tabel",
          head: ["Cara", "Langkah yang dibutuhkan", "Rasanya"],
          rows: [
            ["Buka halaman 1, cek satu per satu", "sampai 1.000.000 kali", "Capek 😵"],
            ["Buka bagian tengah, buang setengah yang salah, ulangi", "sekitar 20 kali", "Santai 😎"],
          ],
        },
        { t: "p", v: "Datanya sama. Komputernya sama. Yang beda cuma **caranya**. Itulah kenapa algoritma penting." },
        {
          t: "analogi",
          judul: "🚗 Analogi: jalan tikus",
          v: [
            "Dua orang berangkat dari rumah ke sekolah yang sama.",
            "Satu lewat jalan besar yang macet, satu lagi tahu jalan pintas.",
            "Sampai di tempat yang sama, tapi waktunya beda jauh.",
            "Algoritma yang baik = tahu jalan pintas.",
          ],
        },
        {
          t: "list",
          v: [
            "Aplikasi jadi cepat walau datanya jutaan.",
            "Baterai HP lebih awet karena kerja prosesor lebih ringan.",
            "Kamu bisa memecah masalah besar jadi langkah-langkah kecil.",
            "Wawancara kerja programmer hampir selalu menguji ini.",
          ],
        },
        {
          t: "kuis",
          id: "k-kenapa-1",
          q: "Dua program menghasilkan jawaban yang sama, tapi yang satu jauh lebih cepat. Apa penyebab paling mungkin?",
          opsi: ["Warna teks kodenya berbeda", "Algoritma yang dipakai berbeda", "Nama filenya berbeda", "Salah satunya memakai huruf kapital"],
          jawab: 1,
          jelas: "Hasil sama, kecepatan beda → biasanya karena langkah (algoritma) atau struktur datanya berbeda.",
        },
        { t: "ringkas", v: ["Masalah yang sama bisa diselesaikan dengan banyak cara.", "Cara yang berbeda = jumlah langkah yang berbeda.", "Algoritma yang baik menghemat waktu, listrik, dan uang."] },
      ],
    },

    {
      id: "input-proses-output",
      judul: "Input → Proses → Output",
      emoji: "🔁",
      ringkas: "Pola dasar semua program di dunia.",
      blocks: [
        { t: "p", v: "Hampir semua program, dari kalkulator sampai TikTok, mengikuti pola yang sama." },
        {
          t: "ascii",
          v: `INPUT            PROSES               OUTPUT
(masuk)          (diolah)            (hasil)

 Telur    →    digoreng      →    telur dadar 🍳
 2 dan 3  →    dijumlahkan   →    5
 Foto     →    diberi filter →    foto estetik`,
        },
        {
          t: "analogi",
          judul: "🍳 Analogi: masak telur",
          v: ["Input = bahan mentah.", "Proses = cara memasaknya.", "Output = makanan yang siap dimakan.", "Kalau bahannya salah, hasilnya juga salah. Itu sebabnya ada istilah “sampah masuk, sampah keluar”."],
        },
        { t: "h", v: "Contoh dalam kode" },
        {
          t: "code",
          lang: "python",
          v: `# INPUT
panjang = 5
lebar = 3

# PROSES
luas = panjang * lebar

# OUTPUT
print(luas)   # hasilnya: 15`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "#", jelas: "Tanda pagar = komentar. Tulisan setelahnya diabaikan komputer, gunanya untuk catatan manusia." },
            " INPUT\n",
            { teks: "panjang = 5", jelas: "Menyiapkan data masukan: panjang bernilai 5." },
            "\nlebar = 3\n\n# PROSES\n",
            { teks: "luas = panjang * lebar", jelas: "Mengolah data. Tanda * artinya kali. Hasilnya disimpan ke wadah bernama luas." },
            "\n\n# OUTPUT\n",
            { teks: "print(luas)", jelas: "Menampilkan isi wadah luas ke layar." },
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Lupa menyiapkan input, lalu bingung kenapa hasilnya kosong.", "Menampilkan (`print`) sebelum menghitung, jadi yang muncul nilai lama.", "Mengira komputer otomatis tahu bagian mana yang input dan mana yang output."],
        },
        {
          t: "kuis",
          id: "k-ipo-1",
          q: "Pada aplikasi kalkulator, angka yang kamu ketik disebut apa?",
          opsi: ["Output", "Input", "Proses", "Algoritma"],
          jawab: 1,
          jelas: "Angka yang kita ketik = input (data yang masuk). Hasil hitungnya = output.",
        },
        { t: "ringkas", v: ["Semua program: ada yang masuk, diolah, lalu keluar.", "Kalau programmu error, cek bagian mana yang salah: input, proses, atau output."] },
      ],
    },

    {
      id: "berpikir-langkah",
      judul: "Cara Berpikir Step-by-Step",
      emoji: "🪜",
      ringkas: "Keterampilan paling penting sebelum belajar kode apa pun.",
      blocks: [
        { t: "p", v: "Programmer pemula sering bingung bukan karena tidak hafal kode, tapi karena **belum terbiasa memecah masalah jadi langkah kecil**." },
        {
          t: "analogi",
          judul: "🧒 Analogi: menyuruh anak kecil",
          v: [
            "Kalau kamu bilang “rapikan kamar”, anak kecil bingung.",
            "Tapi kalau kamu bilang: “ambil baju di lantai → masukkan ke keranjang → tata bantal → sapu lantai”, dia bisa.",
            "Komputer itu seperti anak kecil yang sangat cepat tapi sangat penurut dan sangat polos.",
          ],
        },
        { t: "h", v: "Latihan: membuat teh manis" },
        { t: "p", v: "Coba tulis langkahnya di kepala dulu, baru lihat jawaban di bawah." },
        {
          t: "steps",
          v: ["Ambil gelas.", "Masukkan teh celup.", "Tuang air panas.", "Masukkan gula 2 sendok.", "Aduk sampai gula larut.", "Angkat teh celup.", "Teh siap diminum."],
        },
        {
          t: "note",
          judul: "Tips memecah masalah",
          v: ["Tanya: apa hasil akhir yang saya inginkan?", "Tanya: apa saja yang saya butuhkan (input)?", "Tanya: langkah pertama yang paling kecil apa?", "Ulangi sampai semua langkah jelas."],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Langsung menulis kode sebelum tahu langkahnya. Hasilnya: bingung di tengah jalan.", "Membuat langkah terlalu besar, misal “hitung semuanya”.", "Malu menulis langkah di kertas. Padahal programmer senior pun melakukannya."],
        },
        {
          t: "kuis",
          id: "k-step-1",
          q: "Apa yang sebaiknya dilakukan PERTAMA saat menghadapi masalah pemrograman?",
          opsi: ["Langsung mengetik kode secepatnya", "Menyalin kode dari internet", "Memecah masalah menjadi langkah-langkah kecil", "Menghafal semua fungsi bahasa pemrograman"],
          jawab: 2,
          jelas: "Kode itu cuma cara menuliskan langkah. Langkahnya harus jelas dulu di kepala (atau di kertas).",
        },
        { t: "ringkas", v: ["Pecah masalah besar jadi langkah kecil.", "Tulis dulu di kertas atau di catatan, baru ubah jadi kode.", "Komputer hanya menjalankan apa yang kita tulis, bukan apa yang kita maksud."] },
      ],
    },

    {
      id: "pseudocode",
      judul: "Pseudocode: Kode Bohongan",
      emoji: "📝",
      ringkas: "Menulis algoritma pakai bahasa manusia, tapi rapi seperti kode.",
      blocks: [
        { t: "p", v: "Pseudocode itu tulisan setengah manusia, setengah kode. Tidak bisa dijalankan komputer, tapi sangat membantu otak kita." },
        { t: "p", v: "Kata “pseudo” artinya **pura-pura**. Jadi pseudocode = kode pura-pura." },
        {
          t: "analogi",
          judul: "✏️ Analogi: sketsa sebelum menggambar",
          v: ["Pelukis membuat sketsa pensil dulu sebelum mengecat.", "Arsitek membuat coretan sebelum menggambar denah.", "Programmer membuat pseudocode sebelum menulis kode asli."],
        },
        { t: "h", v: "Contoh: menentukan lulus atau tidak" },
        {
          t: "ascii",
          v: `MULAI
  BACA nilai
  JIKA nilai >= 75 MAKA
      TAMPILKAN "Lulus"
  SELAIN ITU
      TAMPILKAN "Belum lulus"
  SELESAI JIKA
SELESAI`,
        },
        { t: "p", v: "Setelah pseudocode-nya benar, mengubahnya jadi kode asli tinggal “menerjemahkan”:" },
        {
          t: "code",
          lang: "python",
          v: `nilai = 80

if nilai >= 75:
    print("Lulus")
else:
    print("Belum lulus")`,
        },
        {
          t: "tabel",
          head: ["Pseudocode", "Python"],
          rows: [["BACA / SIMPAN", "`nilai = 80`"], ["JIKA ... MAKA", "`if ...:`"], ["SELAIN ITU", "`else:`"], ["TAMPILKAN", "`print(...)`"], ["ULANGI", "`for` / `while`"]],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Menulis pseudocode terlalu panjang sampai lebih ribet dari kodenya.", "Menulis pseudocode yang terlalu samar, misal “selesaikan soal”.", "Mengira pseudocode punya aturan baku yang kaku. Tidak. Yang penting **kamu dan temanmu paham**."],
        },
        {
          t: "kuis",
          id: "k-pseudo-1",
          q: "Apa tujuan utama pseudocode?",
          opsi: ["Supaya program bisa langsung dijalankan", "Supaya alur berpikir jelas sebelum menulis kode asli", "Supaya kode lebih cepat berjalan", "Supaya file program lebih kecil"],
          jawab: 1,
          jelas: "Pseudocode tidak dijalankan komputer. Fungsinya membantu manusia merapikan alur pikir.",
        },
        { t: "ringkas", v: ["Pseudocode = kode pura-pura pakai bahasa manusia.", "Tidak ada aturan baku, yang penting jelas.", "Kalau pseudocode benar, menulis kode jadi mudah."] },
      ],
    },

    {
      id: "flowchart",
      judul: "Flowchart: Algoritma dalam Gambar",
      emoji: "📊",
      ringkas: "Kalau kamu tipe visual, ini cara paling enak memahami alur.",
      blocks: [
        { t: "p", v: "Flowchart adalah gambar alur. Isinya kotak-kotak yang dihubungkan panah." },
        {
          t: "tabel",
          head: ["Bentuk", "Arti"],
          rows: [["Oval", "Mulai / Selesai"], ["Persegi panjang", "Proses (melakukan sesuatu)"], ["Jajar genjang", "Input / Output"], ["Belah ketupat", "Keputusan (ya / tidak)"], ["Panah", "Arah jalannya alur"]],
        },
        { t: "h", v: "Contoh: apakah hari ini hujan?" },
        {
          t: "ascii",
          v: `        ( MULAI )
             |
             v
     /  Apakah hujan?  \\
     \\_________________/
        |            |
      YA |            | TIDAK
        v            v
 [ Bawa payung ]  [ Pakai topi ]
        |            |
        +-----+------+
              v
          ( SELESAI )`,
        },
        { t: "p", v: "Belah ketupat selalu punya **dua jalan keluar**: ya dan tidak. Ini nanti jadi `if` dan `else` di dalam kode." },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Lupa memberi tanda YA / TIDAK pada percabangan.", "Membuat panah yang tidak berujung ke mana-mana.", "Menggambar flowchart raksasa untuk program sederhana. Boleh dipotong jadi beberapa bagian."],
        },
        {
          t: "kuis",
          id: "k-flow-1",
          q: "Bentuk belah ketupat pada flowchart digunakan untuk apa?",
          opsi: ["Menandai awal program", "Menampilkan hasil", "Mengambil keputusan ya/tidak", "Menghubungkan dua halaman"],
          jawab: 2,
          jelas: "Belah ketupat = titik keputusan. Dari sini alur bisa bercabang jadi dua.",
        },
        { t: "ringkas", v: ["Flowchart = algoritma dalam bentuk gambar.", "Belah ketupat = keputusan, persegi = proses.", "Sangat membantu untuk memahami alur sebelum menulis kode."] },
      ],
    },
  ],
};

export const LEVEL_1 = {
  id: "level-1",
  nama: "Level 1 — Logika Dasar",
  emoji: "🧩",
  deskripsi: "Tiga bahan utama semua program: urutan, percabangan, dan perulangan.",
  materi: [
    {
      id: "urutan-langkah",
      judul: "Urutan Langkah (Sequence)",
      emoji: "➡️",
      ringkas: "Komputer membaca kode dari atas ke bawah. Titik.",
      blocks: [
        { t: "p", v: "Aturan pertama yang wajib kamu percaya: **komputer membaca kode dari baris paling atas, lalu turun ke bawah**, satu per satu." },
        {
          t: "analogi",
          judul: "👕 Analogi: memakai baju",
          v: ["Kaus kaki dulu, baru sepatu. Kalau dibalik, tetap “jalan”, tapi hasilnya aneh.", "Komputer tidak akan protes kalau urutanmu aneh. Dia menurut saja. Itulah bahayanya."],
        },
        {
          t: "code",
          lang: "python",
          v: `print("Bangun tidur")
print("Mandi")
print("Sarapan")`,
        },
        { t: "p", v: "Hasil di layar:" },
        { t: "ascii", v: `Bangun tidur\nMandi\nSarapan` },
        { t: "p", v: "Kalau baris `print(\"Sarapan\")` dipindah ke paling atas, maka “Sarapan” yang muncul duluan. Sesederhana itu." },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Memakai variabel sebelum variabel itu dibuat.", "Menampilkan hasil sebelum perhitungannya dilakukan.", "Mengira komputer akan “mengurutkan sendiri” kode yang berantakan."],
        },
        {
          t: "kuis",
          id: "k-seq-1",
          q: "Apa output dari kode: `x = 2` lalu `x = 5` lalu `print(x)`?",
          opsi: ["2", "5", "7", "Error"],
          jawab: 1,
          jelas: "Baris dijalankan berurutan. Nilai 2 ditimpa oleh 5, jadi yang tersisa 5.",
        },
        { t: "ringkas", v: ["Kode dibaca dari atas ke bawah.", "Urutan salah = hasil salah, walau tidak ada pesan error."] },
      ],
    },

    {
      id: "percabangan",
      judul: "Percabangan: if dan else",
      emoji: "🌧️",
      ringkas: "Cara komputer mengambil keputusan.",
      blocks: [
        { t: "p", v: "Hidup penuh pilihan. “Kalau hujan → bawa payung.” Program juga begitu." },
        {
          t: "analogi",
          judul: "☔ Analogi: mau keluar rumah",
          v: ["Kamu melihat ke luar jendela.", "**Kalau** hujan → ambil payung.", "**Kalau tidak** → langsung berangkat.", "Kamu baru saja melakukan percabangan."],
        },
        {
          t: "ascii",
          v: `          Apakah hujan?
             /       \\
          YA          TIDAK
          /              \\
   Bawa payung      Berangkat biasa`,
        },
        {
          t: "code",
          lang: "python",
          v: `hujan = True

if hujan:
    print("Bawa payung")
else:
    print("Berangkat biasa")`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "hujan", jelas: "Nama wadah (variabel) yang menyimpan keadaan cuaca." },
            " = ",
            { teks: "True", jelas: "Artinya BENAR. Pasangannya False yang artinya SALAH. Huruf T besar, ini aturan Python." },
            "\n\n",
            { teks: "if", jelas: "JIKA. Komputer akan mengecek apakah isinya benar." },
            " hujan",
            { teks: ":", jelas: "Tanda mulai blok. Semua yang menjorok ke dalam setelah ini adalah isi dari if." },
            "\n",
            { teks: "    ", jelas: "Spasi menjorok ke dalam (indentasi). Di Python ini WAJIB, bukan sekadar hiasan." },
            "print(\"Bawa payung\")\n",
            { teks: "else:", jelas: "SELAIN ITU. Dijalankan kalau pertanyaan di if jawabannya salah." },
            "\n    print(\"Berangkat biasa\")",
          ],
        },
        { t: "h", v: "Operator pembanding yang sering dipakai" },
        {
          t: "tabel",
          head: ["Tanda", "Artinya", "Contoh benar"],
          rows: [["`==`", "sama dengan", "`5 == 5`"], ["`!=`", "tidak sama dengan", "`5 != 3`"], ["`>`", "lebih besar", "`7 > 2`"], ["`<`", "lebih kecil", "`2 < 7`"], ["`>=`", "lebih besar atau sama", "`5 >= 5`"], ["`<=`", "lebih kecil atau sama", "`4 <= 9`"]],
        },
        {
          t: "note",
          judul: "Kenapa `==` pakai dua tanda sama dengan?",
          v: ["Satu `=` artinya **isi dengan**. Dua `==` artinya **apakah sama?**", "`umur = 17` → mengisi.", "`umur == 17` → bertanya."],
        },
        { t: "h", v: "Kalau pilihannya lebih dari dua? Pakai elif" },
        {
          t: "code",
          lang: "python",
          v: `nilai = 85

if nilai >= 90:
    print("A")
elif nilai >= 80:
    print("B")
elif nilai >= 70:
    print("C")
else:
    print("D")`,
        },
        { t: "p", v: "`elif` = “else if” = “kalau bukan itu, coba yang ini”. Pengecekan berhenti di kondisi pertama yang benar." },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Memakai `=` padahal maksudnya membandingkan (`==`).", "Lupa tanda titik dua `:` di akhir baris `if`.", "Lupa menjorokkan baris di dalam `if` (indentasi).", "Menulis kondisi yang tidak mungkin benar, misal `if umur > 10 and umur < 5`."],
        },
        {
          t: "kuis",
          id: "k-if-1",
          q: "Jika `nilai = 70`, apa yang tercetak pada contoh kode elif di atas?",
          opsi: ["A", "B", "C", "D"],
          jawab: 2,
          jelas: "70 tidak >= 90, tidak >= 80, tapi >= 70 → maka mencetak C.",
        },
        { t: "ringkas", v: ["`if` = jika, `else` = kalau tidak, `elif` = pilihan tengah.", "`=` mengisi, `==` membandingkan.", "Indentasi (menjorok ke dalam) itu wajib di Python."] },
      ],
    },

    {
      id: "perulangan",
      judul: "Perulangan: for dan while",
      emoji: "🔄",
      ringkas: "Biar komputer yang capek, bukan kamu.",
      blocks: [
        { t: "p", v: "Kalau kamu harus menulis “Saya tidak akan terlambat” sebanyak 100 kali, kamu pilih menulis manual atau minta tolong komputer?" },
        {
          t: "analogi",
          judul: "🏃 Analogi: lari keliling lapangan",
          v: ["Pelatih bilang: “lari 5 putaran”. Itu `for` — jumlah putarannya sudah pasti.", "Pelatih bilang: “lari sampai peluit bunyi”. Itu `while` — tidak tahu berapa putaran, yang penting kondisinya terpenuhi."],
        },
        { t: "h", v: "for — kalau jumlahnya sudah diketahui" },
        {
          t: "code",
          lang: "python",
          v: `for i in range(3):
    print("Putaran ke-", i)`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "for", jelas: "Artinya “untuk setiap”. Penanda mulai perulangan." },
            " ",
            { teks: "i", jelas: "Wadah penampung nilai putaran saat ini. Nama bebas, tapi orang biasa pakai i (dari kata index)." },
            " ",
            { teks: "in", jelas: "Artinya “di dalam”. Menunjuk dari mana nilainya diambil." },
            " ",
            { teks: "range(3)", jelas: "Membuat deretan angka: 0, 1, 2. Perhatikan: mulai dari 0 dan angka 3 TIDAK ikut." },
            { teks: ":", jelas: "Pembuka blok perulangan." },
            "\n    print(\"Putaran ke-\", i)",
          ],
        },
        { t: "p", v: "Hasilnya:" },
        { t: "ascii", v: `Putaran ke- 0\nPutaran ke- 1\nPutaran ke- 2` },
        {
          t: "note",
          judul: "Kenapa mulai dari 0?",
          v: ["Di dunia programming, hitungan hampir selalu dimulai dari 0. Aneh di awal, tapi nanti terasa masuk akal saat belajar Array."],
        },
        { t: "h", v: "while — kalau jumlahnya belum pasti" },
        {
          t: "code",
          lang: "python",
          v: `sisa_uang = 10000

while sisa_uang > 0:
    print("Beli jajan, sisa:", sisa_uang)
    sisa_uang = sisa_uang - 3000

print("Uang habis")`,
        },
        {
          t: "steps",
          v: [
            "Cek: apakah `sisa_uang > 0`? Ya (10000).",
            "Tampilkan sisa uang, lalu kurangi 3000 → 7000.",
            "Cek lagi: 7000 > 0? Ya → ulangi → 4000 → 1000.",
            "Cek: 1000 > 0? Ya → jadi -2000.",
            "Cek: -2000 > 0? TIDAK → perulangan berhenti.",
            "Tampilkan “Uang habis”.",
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["**Infinite loop**: lupa mengubah nilai di dalam `while`, sehingga kondisinya selalu benar dan program menggantung selamanya.", "Salah hitung batas: `range(5)` menghasilkan 0–4, bukan 1–5.", "Menulis perintah di luar indentasi, sehingga hanya dijalankan sekali."],
        },
        {
          t: "kuis",
          id: "k-loop-1",
          q: "Berapa kali baris di dalam `for i in range(5):` dijalankan?",
          opsi: ["4 kali", "5 kali", "6 kali", "Tergantung isi kodenya"],
          jawab: 1,
          jelas: "range(5) menghasilkan 0,1,2,3,4 → totalnya 5 putaran.",
        },
        { t: "ringkas", v: ["`for` dipakai kalau jumlah putaran sudah pasti.", "`while` dipakai kalau berhentinya tergantung kondisi.", "Hati-hati infinite loop: selalu pastikan ada yang berubah."] },
      ],
    },

    {
      id: "kondisi-bersarang",
      judul: "Kondisi Bersarang & Gabungan",
      emoji: "🪆",
      ringkas: "if di dalam if, plus kata sakti: and, or, not.",
      blocks: [
        { t: "p", v: "Kadang satu pertanyaan saja tidak cukup. Kita perlu bertanya lagi setelah jawaban pertama." },
        {
          t: "analogi",
          judul: "🎬 Analogi: mau nonton bioskop",
          v: ["Pertanyaan 1: apakah ada uang?", "Kalau ada, pertanyaan 2: apakah ada waktu luang?", "Kalau dua-duanya ya → nonton. Kalau tidak → di rumah saja.", "Pertanyaan di dalam pertanyaan inilah yang disebut **nested condition** (kondisi bersarang)."],
        },
        {
          t: "code",
          lang: "python",
          v: `punya_uang = True
punya_waktu = False

if punya_uang:
    if punya_waktu:
        print("Nonton bioskop")
    else:
        print("Beli camilan saja")
else:
    print("Di rumah saja")`,
        },
        { t: "p", v: "Cara membacanya: masuk ke `if` pertama dulu. Kalau benar, baru pertanyaan kedua dicek." },
        { t: "h", v: "Cara yang lebih singkat: and, or, not" },
        {
          t: "tabel",
          head: ["Kata", "Artinya", "Contoh"],
          rows: [
            ["`and`", "harus DUA-DUANYA benar", "`punya_uang and punya_waktu`"],
            ["`or`", "SALAH SATU benar saja cukup", "`libur or sakit`"],
            ["`not`", "kebalikannya", "`not hujan` artinya tidak hujan"],
          ],
        },
        {
          t: "code",
          lang: "python",
          v: `if punya_uang and punya_waktu:
    print("Nonton bioskop")
else:
    print("Lain kali saja")`,
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Menumpuk terlalu banyak `if` bersarang sampai kodenya sulit dibaca (biasa disebut “kode tangga”).", "Tertukar antara `and` dan `or`.", "Indentasi meleset satu tingkat sehingga logikanya berubah total."],
        },
        {
          t: "kuis",
          id: "k-nested-1",
          q: "`punya_uang = True`, `punya_waktu = False`. Apa hasil dari `punya_uang and punya_waktu`?",
          opsi: ["True", "False", "Error", "Tergantung urutan"],
          jawab: 1,
          jelas: "`and` butuh dua-duanya benar. Karena salah satunya False, hasilnya False.",
        },
        { t: "ringkas", v: ["`if` bisa dimasukkan ke dalam `if` lain.", "`and` = dua-duanya, `or` = salah satu, `not` = kebalikan.", "Kalau bisa disederhanakan pakai `and`/`or`, jangan bersarang terlalu dalam."] },
      ],
    },
  ],
};

export const LEVEL_2 = {
  id: "level-2",
  nama: "Level 2 — Kompleksitas (Big O)",
  emoji: "⏱️",
  deskripsi: "Cara mengukur “berat” sebuah algoritma tanpa matematika rumit.",
  materi: [
    {
      id: "efisiensi",
      judul: "Apa Itu Efisiensi?",
      emoji: "⚡",
      ringkas: "Kenapa algoritma A bisa jauh lebih cepat dari algoritma B.",
      blocks: [
        { t: "p", v: "Efisiensi itu sederhana: **berapa banyak pekerjaan yang harus dilakukan** untuk menyelesaikan tugas." },
        {
          t: "analogi",
          judul: "📚 Analogi: mencari buku di perpustakaan",
          v: ["Cara 1: cek semua rak satu per satu dari ujung ke ujung.", "Cara 2: lihat katalog, langsung menuju rak yang benar.", "Dua-duanya berhasil. Tapi jumlah langkahnya beda jauh."],
        },
        { t: "h", v: "Yang kita hitung bukan detik" },
        { t: "p", v: "Kenapa? Karena komputer temanmu mungkin lebih cepat dari komputermu. Kalau diukur pakai detik, hasilnya tidak adil." },
        { t: "p", v: "Jadi yang dihitung adalah **jumlah langkah** ketika datanya bertambah banyak." },
        {
          t: "tabel",
          head: ["Jumlah data", "Algoritma A (cek satu-satu)", "Algoritma B (bagi dua terus)"],
          rows: [["10", "10 langkah", "sekitar 4 langkah"], ["1.000", "1.000 langkah", "sekitar 10 langkah"], ["1.000.000", "1.000.000 langkah", "sekitar 20 langkah"]],
        },
        { t: "p", v: "Lihat? Saat data sedikit, bedanya tidak terasa. Saat data banyak, bedanya jadi mengerikan." },
        {
          t: "kuis",
          id: "k-efis-1",
          q: "Kenapa efisiensi algoritma tidak diukur dengan satuan detik?",
          opsi: ["Karena detik terlalu kecil", "Karena kecepatan tiap komputer berbeda-beda", "Karena programmer tidak punya stopwatch", "Karena detik hanya untuk website"],
          jawab: 1,
          jelas: "Kita mengukur jumlah langkah supaya perbandingannya adil di komputer mana pun.",
        },
        { t: "ringkas", v: ["Efisiensi = seberapa banyak kerja yang dibutuhkan.", "Diukur dengan jumlah langkah, bukan detik.", "Bedanya baru terasa saat data menjadi banyak."] },
      ],
    },

    {
      id: "big-o",
      judul: "Big O: Bahasa untuk Mengukur Kecepatan",
      emoji: "📈",
      ringkas: "O(1), O(log n), O(n), O(n²) — dijelaskan tanpa rumus.",
      blocks: [
        { t: "p", v: "Big O itu cuma **cara singkat menulis: “kalau datanya bertambah, kerjanya bertambah seberapa?”**" },
        { t: "p", v: "Huruf `n` artinya **banyaknya data**. Kalau ada 100 buku, berarti n = 100." },
        { t: "h", v: "O(1) — kerjanya tetap, berapa pun datanya" },
        {
          t: "analogi",
          judul: "🎯 Analogi O(1)",
          v: ["Kamu punya 1000 buku, tapi buku yang dicari sudah ada di meja.", "Mau bukunya 1000 atau 1 juta, kamu tetap cuma perlu 1 langkah: ambil.", "Ini yang tercepat."],
        },
        { t: "h", v: "O(n) — kerjanya ikut bertambah sebanyak data" },
        {
          t: "analogi",
          judul: "🔍 Analogi O(n)",
          v: ["Kamu mencari buku dengan mengecek satu per satu dari tumpukan.", "100 buku → paling banyak 100 kali cek.", "1000 buku → paling banyak 1000 kali cek."],
        },
        { t: "h", v: "O(n²) — setiap data dibandingkan dengan semua data lain" },
        {
          t: "analogi",
          judul: "😰 Analogi O(n²)",
          v: ["Di kelas berisi 30 anak, setiap anak harus bersalaman dengan semua anak lain.", "10 anak → 100 salaman. 100 anak → 10.000 salaman.", "Datanya naik 10 kali, kerjanya naik 100 kali. Ini yang bikin program lemot."],
        },
        { t: "h", v: "O(log n) — tiap langkah membuang setengah data" },
        {
          t: "analogi",
          judul: "📖 Analogi O(log n)",
          v: ["Mencari halaman di kamus: buka tengah, lihat kiri atau kanan, buang setengahnya, ulangi.", "1000 halaman cukup sekitar 10 langkah.", "Syaratnya: datanya harus sudah urut."],
        },
        {
          t: "ascii",
          v: `Jumlah data = 10

O(1)      █                       (1 langkah)
O(log n)  ███                     (3 langkah)
O(n)      ██████████              (10 langkah)
O(n²)     ████████████...████     (100 langkah)`,
        },
        {
          t: "viz",
          target: "kompleksitas",
          label: "Coba geser jumlah data & lihat bedanya",
          v: "Ada grafik interaktif di halaman Visualisasi. Ubah jumlah datanya dan rasakan sendiri bedanya.",
        },
        {
          t: "tabel",
          head: ["Big O", "Julukan", "Contoh nyata"],
          rows: [
            ["O(1)", "Sangat cepat", "Mengambil data array lewat index"],
            ["O(log n)", "Cepat", "Binary search"],
            ["O(n)", "Wajar", "Linear search, menghitung total"],
            ["O(n log n)", "Cukup baik", "Merge sort, quick sort"],
            ["O(n²)", "Lambat", "Bubble sort, selection sort"],
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Mengira O(n²) selalu jelek. Untuk 10 data, tidak masalah sama sekali.",
            "Mengira Big O menghitung waktu pasti. Big O hanya menggambarkan **pertumbuhan** kerja.",
            "Menghafal tabel tanpa paham maksudnya. Pahami analoginya dulu.",
          ],
        },
        {
          t: "kuis",
          id: "k-bigo-1",
          q: "Algoritma dengan Big O manakah yang jumlah langkahnya TIDAK berubah walau data bertambah?",
          opsi: ["O(n)", "O(n²)", "O(1)", "O(log n)"],
          jawab: 2,
          jelas: "O(1) artinya kerjanya tetap (konstan), berapa pun banyaknya data.",
        },
        { t: "ringkas", v: ["`n` = banyaknya data.", "O(1) tetap, O(log n) membelah dua, O(n) ikut data, O(n²) meledak.", "Big O bicara soal pertumbuhan kerja, bukan detik."] },
      ],
    },
  ],
};
