/* =========================================================
   data-algoritma.js — Materi Level 10, 11, 12
   Searching, Sorting, dan Recursion
   ========================================================= */

export const LEVEL_10 = {
  id: "level-10",
  nama: "Level 10 — Searching",
  emoji: "🔍",
  deskripsi: "Dua cara mencari data: cara sabar dan cara pintar.",
  materi: [
    {
      id: "linear-search",
      judul: "Linear Search: Cek Satu per Satu",
      emoji: "🔎",
      ringkas: "Cara paling jujur: periksa semuanya dari awal.",
      blocks: [
        { t: "p", v: "Linear search itu cara mencari paling sederhana: lihat data pertama, kalau bukan, lanjut ke data kedua, begitu seterusnya." },
        {
          t: "analogi",
          judul: "🧍 Analogi: mencari teman di antrean",
          v: ["Kamu mencari Budi di antrean panjang.", "Kamu lihat orang pertama: bukan. Orang kedua: bukan. Orang ketiga: Budi! 🎉", "Kalau Budi ternyata orang terakhir, kamu harus melihat semuanya."],
        },
        {
          t: "ascii",
          v: `[10][20][30][40][50]   cari: 40

 ↑
10 ❌
     ↑
    20 ❌
         ↑
        30 ❌
             ↑
            40 ✅ ketemu di index 3`,
        },
        {
          t: "code",
          lang: "python",
          v: `angka = [10, 20, 30, 40, 50]
cari = 40

for i in range(len(angka)):
    if angka[i] == cari:
        print("Ketemu di index", i)
        break
else:
    print("Tidak ketemu")`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "for i in range(len(angka))", jelas: "Ulangi sebanyak jumlah data. i berjalan 0,1,2,3,4 — yaitu semua index." },
            ":\n    ",
            { teks: "if angka[i] == cari", jelas: "Bandingkan isi kotak ke-i dengan yang dicari. Ingat, == berarti \"apakah sama\"." },
            ":\n        print(\"Ketemu di index\", i)\n        ",
            { teks: "break", jelas: "Artinya \"berhenti\". Kalau sudah ketemu, tidak perlu mengecek sisanya." },
          ],
        },
        {
          t: "tabel",
          head: ["Keadaan", "Jumlah langkah"],
          rows: [["Data yang dicari ada di depan", "1 langkah (beruntung)"], ["Data ada di paling belakang", "n langkah"], ["Data tidak ada", "n langkah"]],
        },
        { t: "p", v: "Jadi kompleksitasnya **O(n)**. Kelebihannya: datanya **tidak perlu urut**. Ini keunggulan besar." },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Lupa `break` sehingga perulangan tetap jalan padahal sudah ketemu.", "Lupa menangani kasus “tidak ketemu”.", "Menganggap linear search selalu jelek. Untuk data sedikit atau data acak, ini justru pilihan yang benar."],
        },
        {
          t: "viz",
          target: "searching",
          label: "Buka visualisasi Searching",
          v: "Masukkan angka yang dicari dan lihat proses pengecekannya satu per satu.",
        },
        {
          t: "kuis",
          id: "k-lin-1",
          q: "Apa kelebihan utama linear search dibanding binary search?",
          opsi: ["Selalu lebih cepat", "Data tidak perlu dalam keadaan urut", "Tidak butuh perulangan", "Hanya bisa untuk angka"],
          jawab: 1,
          jelas: "Binary search wajib data urut. Linear search bisa dipakai pada data acak sekalipun.",
        },
        { t: "ringkas", v: ["Linear search = cek satu per satu dari awal.", "Kompleksitas O(n).", "Tidak butuh data urut — sederhana dan selalu bisa dipakai."] },
      ],
    },

    {
      id: "binary-search",
      judul: "Binary Search: Langsung Buka Tengah",
      emoji: "📖",
      ringkas: "Setiap langkah membuang setengah data. Super cepat.",
      blocks: [
        { t: "p", v: "Pernah mencari kata di kamus? Kamu tidak mulai dari halaman 1, kan? Kamu buka bagian tengah dulu." },
        {
          t: "analogi",
          judul: "📖 Analogi: mencari kata di kamus",
          v: [
            "Buka halaman tengah. Ternyata huruf M, padahal kamu mencari huruf T.",
            "Berarti kata itu pasti ada di sebelah kanan. Setengah bagian kiri langsung dibuang.",
            "Buka tengah dari sisa kanan. Ulangi terus.",
            "Dalam beberapa langkah saja, ketemu.",
          ],
        },
        {
          t: "ok",
          judul: "Syarat WAJIB binary search",
          v: ["**Datanya harus sudah urut.**", "Kalau belum urut, hasilnya bisa salah. Ini seperti kamus yang halamannya acak — trik buka tengah jadi tidak berguna."],
        },
        { t: "h", v: "Empat langkahnya" },
        { t: "steps", v: ["Ambil data paling tengah.", "Bandingkan dengan yang dicari.", "Kalau yang dicari lebih kecil → buang bagian kanan. Kalau lebih besar → buang bagian kiri.", "Ulangi sampai ketemu atau tidak ada sisa data."] },
        {
          t: "ascii",
          v: `Cari 70 di: [10][20][30][40][50][60][70][80][90]
                                ↑ tengah = 50

70 > 50  → buang kiri, sisa: [60][70][80][90]
                                    ↑ tengah = 80  (atau 70, tergantung pembulatan)
70 < 80  → buang kanan, sisa: [60][70]
                                   ↑ tengah = 70
ketemu ✅  (hanya 3 langkah dari 9 data)`,
        },
        {
          t: "code",
          lang: "python",
          v: `angka = [10, 20, 30, 40, 50, 60, 70, 80, 90]
cari = 70

kiri = 0
kanan = len(angka) - 1

while kiri <= kanan:
    tengah = (kiri + kanan) // 2

    if angka[tengah] == cari:
        print("Ketemu di index", tengah)
        break
    elif angka[tengah] < cari:
        kiri = tengah + 1      # buang bagian kiri
    else:
        kanan = tengah - 1     # buang bagian kanan`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "kiri = 0", jelas: "Penanda batas kiri wilayah pencarian, mulai dari index paling awal." },
            "\n",
            { teks: "kanan = len(angka) - 1", jelas: "Batas kanan = index terakhir. Dikurangi 1 karena index dimulai dari 0." },
            "\n\n",
            { teks: "while kiri <= kanan:", jelas: "Selama masih ada wilayah yang tersisa, terus cari." },
            "\n    ",
            { teks: "tengah = (kiri + kanan) // 2", jelas: "Mencari posisi tengah. Tanda // artinya bagi lalu bulatkan ke bawah (hasilnya bilangan bulat)." },
            "\n\n    ",
            { teks: "kiri = tengah + 1", jelas: "Yang dicari lebih besar, jadi separuh kiri dibuang dengan menggeser batas kiri." },
            "\n    ",
            { teks: "kanan = tengah - 1", jelas: "Yang dicari lebih kecil, jadi separuh kanan dibuang." },
          ],
        },
        {
          t: "tabel",
          head: ["Jumlah data", "Linear search (maks)", "Binary search (maks)"],
          rows: [["10", "10 langkah", "4 langkah"], ["1.000", "1.000 langkah", "10 langkah"], ["1.000.000", "1.000.000 langkah", "20 langkah"]],
        },
        { t: "p", v: "Inilah kekuatan **O(log n)**. Data naik sejuta kali lipat, langkahnya cuma naik sedikit." },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Memakai binary search pada data yang belum diurutkan → hasil salah, tapi tidak muncul pesan error. Bahaya!",
            "Lupa `+1` atau `-1` saat menggeser batas → perulangan tidak pernah berhenti.",
            "Memakai `/` (hasil desimal) padahal butuh `//` (bilangan bulat) untuk index.",
          ],
        },
        {
          t: "viz",
          target: "searching",
          label: "Lihat binary search bekerja",
          v: "Pilih mode Binary Search dan perhatikan separuh data dibuang setiap langkah.",
        },
        {
          t: "kuis",
          id: "k-bin-1",
          q: "Apa syarat wajib agar binary search bisa dipakai?",
          opsi: ["Data harus berupa angka", "Data harus sudah terurut", "Data harus lebih dari 100", "Data harus disimpan di linked list"],
          jawab: 1,
          jelas: "Tanpa urutan, kita tidak bisa tahu setengah bagian mana yang boleh dibuang.",
        },
        { t: "ringkas", v: ["Binary search membuang setengah data tiap langkah.", "Wajib data urut.", "Kompleksitas O(log n) — jauh lebih cepat dari O(n)."] },
      ],
    },
  ],
};

export const LEVEL_11 = {
  id: "level-11",
  nama: "Level 11 — Sorting",
  emoji: "📊",
  deskripsi: "Mengurutkan data: dari cara paling polos sampai cara pintar.",
  materi: [
    {
      id: "bubble-sort",
      judul: "Bubble Sort: Tukar Tetangga",
      emoji: "🫧",
      ringkas: "Algoritma sorting paling mudah dipahami manusia.",
      blocks: [
        { t: "p", v: "Sorting artinya mengurutkan. Misalnya dari kecil ke besar. Kenapa penting? Karena data yang urut bisa dicari dengan binary search yang super cepat." },
        {
          t: "analogi",
          judul: "🧑‍🤝‍🧑 Analogi: baris berdasarkan tinggi badan",
          v: [
            "Guru menyuruh murid berbaris urut dari pendek ke tinggi.",
            "Caranya: bandingkan dua murid yang bersebelahan.",
            "Kalau yang kiri lebih tinggi, tukar posisi.",
            "Lakukan terus sampai tidak ada lagi yang perlu ditukar.",
          ],
        },
        { t: "p", v: "Disebut *bubble* (gelembung) karena angka terbesar perlahan “naik” ke ujung seperti gelembung naik ke permukaan air." },
        {
          t: "ascii",
          v: `[5] [3] [8] [1]

Bandingkan 5 dan 3 → 5 > 3 → TUKAR
[3] [5] [8] [1]

Bandingkan 5 dan 8 → sudah benar → diam
[3] [5] [8] [1]

Bandingkan 8 dan 1 → 8 > 1 → TUKAR
[3] [5] [1] [8]   ← 8 sudah di tempat yang benar

Putaran berikutnya ulangi dari awal...`,
        },
        {
          t: "code",
          lang: "python",
          v: `angka = [5, 3, 8, 1]
n = len(angka)

for i in range(n):
    for j in range(n - 1 - i):
        if angka[j] > angka[j + 1]:
            # tukar posisi
            angka[j], angka[j + 1] = angka[j + 1], angka[j]

print(angka)   # [1, 3, 5, 8]`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "for i in range(n):", jelas: "Perulangan luar = berapa kali kita menyapu seluruh barisan." },
            "\n    ",
            { teks: "for j in range(n - 1 - i):", jelas: "Perulangan dalam = membandingkan pasangan bersebelahan. Dikurangi i karena bagian belakang sudah beres." },
            "\n        ",
            { teks: "if angka[j] > angka[j + 1]:", jelas: "Bandingkan tetangga. Kalau yang kiri lebih besar, urutannya salah." },
            "\n            ",
            { teks: "angka[j], angka[j+1] = angka[j+1], angka[j]", jelas: "Cara Python menukar dua nilai dalam satu baris. Di bahasa lain biasanya butuh variabel bantu." },
          ],
        },
        {
          t: "note",
          judul: "Kenapa ada dua perulangan?",
          v: ["Satu sapuan saja belum tentu membuat semua data urut. Sapuan harus diulang sampai semuanya rapi.", "Dua perulangan bersarang inilah yang membuat bubble sort punya kompleksitas **O(n²)** — lambat kalau datanya banyak."],
        },
        {
          t: "viz",
          target: "sorting",
          label: "Lihat animasi Bubble Sort",
          v: "Tekan “Langkah Berikutnya” untuk melihat setiap perbandingan dan penukaran.",
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Menukar nilai tanpa variabel bantu di bahasa selain Python → data hilang tertimpa.", "Lupa mengurangi batas perulangan dalam, jadi kerja dua kali lipat.", "Memakai bubble sort untuk data jutaan. Jangan. Pakai merge/quick sort."],
        },
        {
          t: "kuis",
          id: "k-bubble-1",
          q: "Apa yang dilakukan bubble sort?",
          opsi: ["Membagi data jadi dua bagian lalu menggabungkannya", "Membandingkan dua data bersebelahan dan menukarnya bila urutannya salah", "Mencari data terkecil lalu memindahkannya ke depan", "Menyisipkan data ke posisi yang tepat"],
          jawab: 1,
          jelas: "Bubble sort membandingkan tetangga dan menukar bila perlu. Yang mencari terkecil itu selection sort, yang menyisipkan itu insertion sort.",
        },
        { t: "ringkas", v: ["Bubble sort = bandingkan tetangga, tukar kalau salah urutan.", "Diulang sampai tidak ada penukaran.", "Mudah dipahami, tapi lambat: O(n²)."] },
      ],
    },

    {
      id: "selection-insertion",
      judul: "Selection Sort & Insertion Sort",
      emoji: "🃏",
      ringkas: "Dua cara manual yang juga sering dipakai manusia.",
      blocks: [
        { t: "h", v: "Selection Sort — cari yang terkecil, taruh di depan" },
        {
          t: "analogi",
          judul: "🔎 Analogi: memilih murid terpendek",
          v: ["Lihat seluruh barisan, cari yang paling pendek.", "Tukar dia dengan orang di posisi paling depan.", "Sekarang posisi 1 sudah pasti benar. Ulangi untuk sisanya."],
        },
        {
          t: "ascii",
          v: `[29] [10] [14] [37]
 cari terkecil → 10 → tukar dengan posisi 0
[10] [29] [14] [37]
 cari terkecil dari sisanya → 14 → tukar dengan posisi 1
[10] [14] [29] [37] ✅`,
        },
        {
          t: "code",
          lang: "python",
          v: `angka = [29, 10, 14, 37]

for i in range(len(angka)):
    posisi_terkecil = i
    for j in range(i + 1, len(angka)):
        if angka[j] < angka[posisi_terkecil]:
            posisi_terkecil = j
    angka[i], angka[posisi_terkecil] = angka[posisi_terkecil], angka[i]

print(angka)`,
        },
        { t: "p", v: "Bedanya dengan bubble sort: selection sort **menukar lebih sedikit** (maksimal sekali tiap putaran), tapi tetap O(n²) karena harus melihat semua data." },
        { t: "h", v: "Insertion Sort — seperti menyusun kartu remi" },
        {
          t: "analogi",
          judul: "🃏 Analogi: menyusun kartu di tangan",
          v: [
            "Waktu main kartu, kamu ambil kartu satu per satu.",
            "Setiap kartu baru langsung kamu selipkan ke posisi yang benar di antara kartu yang sudah tersusun.",
            "Itulah insertion sort. Kita semua sudah melakukannya sejak kecil tanpa tahu namanya.",
          ],
        },
        {
          t: "ascii",
          v: `[5] | [3] [8] [1]     bagian kiri sudah urut
ambil 3 → geser 5 ke kanan → selipkan 3
[3] [5] | [8] [1]
ambil 8 → sudah pas di tempatnya
[3] [5] [8] | [1]
ambil 1 → geser semua → selipkan di depan
[1] [3] [5] [8] ✅`,
        },
        {
          t: "code",
          lang: "python",
          v: `angka = [5, 3, 8, 1]

for i in range(1, len(angka)):
    kunci = angka[i]
    j = i - 1
    while j >= 0 and angka[j] > kunci:
        angka[j + 1] = angka[j]   # geser ke kanan
        j = j - 1
    angka[j + 1] = kunci          # selipkan

print(angka)`,
        },
        {
          t: "tabel",
          head: ["Algoritma", "Cara kerja", "Kecepatan", "Paling cocok untuk"],
          rows: [
            ["Bubble", "Tukar tetangga", "O(n²)", "Belajar & memahami konsep"],
            ["Selection", "Cari terkecil, taruh depan", "O(n²)", "Saat menukar data itu mahal"],
            ["Insertion", "Selipkan ke tempat yang benar", "O(n²), tapi O(n) bila data hampir urut", "Data sedikit atau hampir urut"],
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: ["Pada insertion sort, perulangan dimulai dari index 1 (bukan 0), karena data pertama dianggap sudah urut.", "Lupa menyimpan nilai `kunci` sebelum menggeser → nilainya hilang tertimpa."],
        },
        {
          t: "kuis",
          id: "k-sel-1",
          q: "Algoritma mana yang mirip cara kita menyusun kartu remi di tangan?",
          opsi: ["Bubble sort", "Selection sort", "Insertion sort", "Merge sort"],
          jawab: 2,
          jelas: "Insertion sort: ambil satu data, lalu selipkan ke posisi yang benar.",
        },
        { t: "ringkas", v: ["Selection: cari terkecil lalu tukar ke depan.", "Insertion: selipkan tiap data ke posisi yang tepat.", "Keduanya O(n²), tapi insertion sangat cepat bila data hampir urut."] },
      ],
    },

    {
      id: "merge-quick",
      judul: "Merge Sort & Quick Sort",
      emoji: "⚡",
      ringkas: "Sorting cepat dengan cara “bagi dulu, baru selesaikan”.",
      blocks: [
        { t: "p", v: "Kalau bubble sort itu kerja sendirian, merge sort dan quick sort itu kerja tim: **pecah masalah besar jadi kecil**." },
        { t: "h", v: "Merge Sort — bagi dua terus, lalu gabungkan sambil mengurutkan" },
        {
          t: "analogi",
          judul: "📚 Analogi: membagi tugas mengurutkan buku",
          v: [
            "Ada 100 buku berantakan. Kamu bagi dua ke dua teman.",
            "Masing-masing teman membagi dua lagi ke teman lainnya.",
            "Begitu terus sampai tiap orang cuma pegang 1 buku (otomatis sudah “urut”).",
            "Lalu digabungkan berpasangan sambil diurutkan. Cepat sekali.",
          ],
        },
        {
          t: "ascii",
          v: `        [8, 3, 5, 1]
         /          \\
     [8, 3]        [5, 1]
     /    \\        /    \\
   [8]    [3]    [5]    [1]     ← sudah tidak bisa dibagi
     \\    /        \\    /
     [3, 8]        [1, 5]       ← digabung sambil diurutkan
         \\          /
        [1, 3, 5, 8] ✅`,
        },
        { t: "p", v: "Kompleksitasnya **O(n log n)**. Kata `log n` datang dari “dibagi dua terus”, dan `n` dari proses penggabungan." },
        { t: "h", v: "Quick Sort — pilih jagoan (pivot), pisahkan kiri-kanan" },
        {
          t: "analogi",
          judul: "🎯 Analogi: membariskan murid dengan patokan",
          v: [
            "Pilih satu murid sebagai patokan (**pivot**), misalnya si Budi.",
            "Semua yang lebih pendek dari Budi berdiri di kiri, yang lebih tinggi di kanan.",
            "Budi otomatis sudah berada di posisi yang benar.",
            "Ulangi cara yang sama untuk kelompok kiri dan kelompok kanan.",
          ],
        },
        {
          t: "ascii",
          v: `[7, 2, 9, 4]   pivot = 4

kiri: [2]      pivot: 4      kanan: [7, 9]
  ↓                              ↓
[2]                          [7, 9]

hasil akhir: [2] + [4] + [7, 9] = [2, 4, 7, 9] ✅`,
        },
        {
          t: "code",
          lang: "python",
          v: `def quick_sort(data):
    if len(data) <= 1:
        return data                 # sudah pasti urut

    pivot = data[len(data) // 2]
    kiri  = [x for x in data if x < pivot]
    sama  = [x for x in data if x == pivot]
    kanan = [x for x in data if x > pivot]

    return quick_sort(kiri) + sama + quick_sort(kanan)

print(quick_sort([7, 2, 9, 4]))   # [2, 4, 7, 9]`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "if len(data) <= 1:", jelas: "Kalau isinya cuma 1 (atau kosong), otomatis sudah urut. Ini disebut base case — rem supaya rekursi berhenti." },
            "\n\n    ",
            { teks: "pivot = data[len(data) // 2]", jelas: "Memilih patokan. Di sini diambil data paling tengah." },
            "\n    ",
            { teks: "[x for x in data if x < pivot]", jelas: "Cara singkat Python untuk mengambil semua data yang lebih kecil dari pivot." },
            "\n\n    ",
            { teks: "quick_sort(kiri) + sama + quick_sort(kanan)", jelas: "Fungsi memanggil dirinya sendiri untuk mengurutkan bagian kiri dan kanan, lalu semuanya disambung." },
          ],
        },
        {
          t: "tabel",
          head: ["Algoritma", "Rata-rata", "Terburuk", "Catatan"],
          rows: [
            ["Bubble / Selection", "O(n²)", "O(n²)", "Untuk belajar saja"],
            ["Insertion", "O(n²)", "O(n²)", "Cepat bila data hampir urut"],
            ["Merge sort", "O(n log n)", "O(n log n)", "Stabil, butuh memori tambahan"],
            ["Quick sort", "O(n log n)", "O(n²)", "Biasanya tercepat di praktik"],
          ],
        },
        {
          t: "note",
          judul: "Kabar baik",
          v: ["Di dunia nyata kamu jarang menulis sorting sendiri. Python cukup `data.sort()`, JavaScript `arr.sort()`.", "Tapi memahami cara kerjanya membuatmu tahu **kenapa** program bisa lambat, dan itu yang membedakan programmer biasa dengan yang paham."],
        },
        {
          t: "kuis",
          id: "k-merge-1",
          q: "Apa ide utama merge sort?",
          opsi: ["Menukar dua data bersebelahan", "Membagi data jadi bagian kecil lalu menggabungkannya sambil mengurutkan", "Mencari data terkecil berulang kali", "Menyimpan data ke hash table"],
          jawab: 1,
          jelas: "Merge sort memakai strategi divide and conquer: bagi, selesaikan, lalu gabungkan.",
        },
        { t: "ringkas", v: ["Merge sort: bagi dua terus, gabungkan sambil mengurutkan → O(n log n).", "Quick sort: pilih pivot, pisahkan kiri-kanan → biasanya tercepat.", "Keduanya jauh lebih cepat dari bubble sort saat data banyak."] },
      ],
    },
  ],
};

export const LEVEL_12 = {
  id: "level-12",
  nama: "Level 12 — Recursion",
  emoji: "🪞",
  deskripsi: "Fungsi yang memanggil dirinya sendiri. Ajaib tapi masuk akal.",
  materi: [
    {
      id: "recursion",
      judul: "Recursion: Fungsi yang Memanggil Dirinya Sendiri",
      emoji: "🪞",
      ringkas: "Seperti cermin berhadapan — tapi harus ada remnya.",
      blocks: [
        { t: "p", v: "Sebelum mulai: **fungsi** itu sekumpulan langkah yang diberi nama, supaya bisa dipanggil berkali-kali. Seperti tombol “buat kopi” di mesin kopi." },
        {
          t: "analogi",
          judul: "🏠 Analogi: mencari kunci di rumah berlapis",
          v: [
            "Kamu masuk kamar untuk mencari kunci.",
            "Di dalam kamar itu ada pintu ke kamar lain. Kamu masuk lagi, dengan cara yang sama persis.",
            "Begitu terus sampai ketemu kunci, atau sampai tidak ada pintu lagi.",
            "Lalu kamu keluar satu per satu, mundur dari kamar terdalam.",
          ],
        },
        { t: "p", v: "Melakukan hal yang sama, di dalam dirinya sendiri, dengan ukuran yang lebih kecil — itulah **rekursi**." },
        {
          t: "code",
          lang: "python",
          v: `def hitung(n):
    if n == 0:        # REM: kapan harus berhenti
        return
    print(n)
    hitung(n - 1)     # memanggil dirinya sendiri, dengan angka lebih kecil

hitung(3)`,
        },
        {
          t: "ascii",
          v: `hitung(3)  → cetak 3
   ↓
hitung(2)  → cetak 2
   ↓
hitung(1)  → cetak 1
   ↓
hitung(0)  → n == 0 → STOP ✋`,
        },
        {
          t: "bedah",
          judul: "🔍 Bedah kode",
          potongan: [
            { teks: "def", jelas: "def = define = mendefinisikan. Ini cara membuat fungsi baru di Python." },
            " ",
            { teks: "hitung(n)", jelas: "Nama fungsi = hitung. n adalah titipan angka yang dikirim saat fungsi dipanggil." },
            ":\n    ",
            { teks: "if n == 0:", jelas: "BASE CASE alias rem. Tanpa ini, fungsi akan memanggil dirinya sendiri selamanya." },
            "\n        ",
            { teks: "return", jelas: "Artinya \"selesai, keluar dari fungsi ini\"." },
            "\n    print(n)\n    ",
            { teks: "hitung(n - 1)", jelas: "Memanggil dirinya sendiri dengan angka yang lebih kecil. Ini yang membuatnya bergerak menuju base case." },
          ],
        },
        {
          t: "ok",
          judul: "Dua bahan wajib setiap rekursi",
          v: ["**Base case** — kondisi berhenti. Ini remnya.", "**Langkah mengecil** — setiap panggilan harus lebih dekat ke base case."],
        },
        { t: "h", v: "Call Stack: tumpukan pemanggilan" },
        { t: "p", v: "Ingat materi Stack (tumpukan piring)? Komputer memakai stack untuk mengingat fungsi mana yang sedang berjalan." },
        {
          t: "ascii",
          v: `Saat memanggil:              Saat selesai (kembali):
┌──────────┐                 ┌──────────┐
│ hitung(0)│ ← paling atas   │          │
├──────────┤                 ├──────────┤
│ hitung(1)│                 │ hitung(1)│ ← keluar duluan
├──────────┤                 ├──────────┤
│ hitung(2)│                 │ hitung(2)│
├──────────┤                 ├──────────┤
│ hitung(3)│                 │ hitung(3)│
└──────────┘                 └──────────┘`,
        },
        { t: "p", v: "Kalau base case-nya lupa ditulis, tumpukan ini terus bertambah sampai penuh. Pesannya: `RecursionError: maximum recursion depth exceeded`. Istilah kerennya **stack overflow**." },
        { t: "h", v: "Contoh klasik: faktorial" },
        {
          t: "code",
          lang: "python",
          v: `def faktorial(n):
    if n <= 1:
        return 1              # base case
    return n * faktorial(n - 1)

print(faktorial(4))   # 24`,
        },
        {
          t: "steps",
          v: [
            "faktorial(4) = 4 × faktorial(3)",
            "faktorial(3) = 3 × faktorial(2)",
            "faktorial(2) = 2 × faktorial(1)",
            "faktorial(1) = 1 ← base case, berhenti di sini",
            "Hasilnya dirangkai balik: 2×1=2 → 3×2=6 → 4×6=24",
          ],
        },
        {
          t: "warn",
          judul: "Kesalahan umum pemula",
          v: [
            "Lupa base case → program hang / error stack overflow.",
            "Base case ada, tapi tidak pernah tercapai (misal `n - 1` ditulis `n + 1`).",
            "Memakai rekursi untuk hal yang lebih mudah ditulis dengan perulangan biasa.",
            "Menganggap rekursi selalu lebih cepat. Kadang justru lebih boros memori.",
          ],
        },
        {
          t: "kuis",
          id: "k-rec-1",
          q: "Apa yang terjadi kalau fungsi rekursif tidak punya base case?",
          opsi: ["Fungsi berjalan sekali lalu berhenti", "Fungsi memanggil dirinya terus sampai program error", "Fungsi otomatis berhenti setelah 10 kali", "Tidak terjadi apa-apa"],
          jawab: 1,
          jelas: "Tanpa rem, tumpukan pemanggilan (call stack) akan penuh dan program berhenti dengan error.",
        },
        {
          t: "ringkas",
          v: [
            "Rekursi = fungsi memanggil dirinya sendiri dengan masalah yang lebih kecil.",
            "Wajib punya base case (rem) dan langkah yang mengecil.",
            "Komputer mengingat urutannya dengan call stack (tumpukan piring lagi!).",
          ],
        },
      ],
    },
  ],
};
