/* =========================================================
   visualisasi.js — semua alat peraga interaktif.
   Setiap alat peraga dibuat oleh satu fungsi kecil supaya
   gampang dibaca dan tidak saling mengganggu.
   ========================================================= */

import { $, $$, esc, acak } from "./util.js";

export function renderVisualisasi(root, param) {
  root.innerHTML = `
    <div class="container section" style="padding-bottom:1rem">
      <span class="eyebrow">Visualisasi</span>
      <h1>Lihat algoritmanya bergerak</h1>
      <p class="muted" style="max-width:640px">
        Membaca teori itu bagus, tapi melihat langsung jauh lebih nempel.
        Semua alat di bawah bisa kamu utak-atik. Tidak akan rusak, tenang saja. 🙂
      </p>
      <nav aria-label="Daftar visualisasi" class="filter-row" style="margin-top:1.2rem">
        ${[
          ["sorting", "📊 Sorting"],
          ["searching", "🔍 Searching"],
          ["array", "🗃️ Array"],
          ["stack", "🍽️ Stack"],
          ["queue", "🧍 Queue"],
          ["linkedlist", "🚂 Linked List"],
          ["tree", "🌳 Tree (BST)"],
          ["hash", "🗄️ Hash Table"],
          ["kompleksitas", "⏱️ Big O"],
        ]
          .map(([id, teks]) => `<a class="filter-btn" href="#/visualisasi/${id}">${teks}</a>`)
          .join("")}
      </nav>
    </div>

    <div class="container" style="padding-bottom:3rem">
      <section class="viz" id="viz-sorting"></section>
      <section class="viz" id="viz-searching"></section>
      <section class="viz" id="viz-array"></section>
      <section class="viz" id="viz-stack"></section>
      <section class="viz" id="viz-queue"></section>
      <section class="viz" id="viz-linkedlist"></section>
      <section class="viz" id="viz-tree"></section>
      <section class="viz" id="viz-hash"></section>
      <section class="viz" id="viz-kompleksitas"></section>
    </div>`;

  buatSorting($("#viz-sorting", root));
  buatSearching($("#viz-searching", root));
  buatArray($("#viz-array", root));
  buatStack($("#viz-stack", root));
  buatQueue($("#viz-queue", root));
  buatLinkedList($("#viz-linkedlist", root));
  buatTree($("#viz-tree", root));
  buatHash($("#viz-hash", root));
  buatKompleksitas($("#viz-kompleksitas", root));

  // Kalau alamatnya #/visualisasi/stack → langsung geser ke bagian itu
  if (param) {
    const sasaran = $("#viz-" + param, root);
    if (sasaran) setTimeout(() => sasaran.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }
}

/* =========================================================
   1. SORTING VISUALIZER
   ========================================================= */
function buatSorting(box) {
  box.innerHTML = `
    <h3>📊 Sorting Visualizer</h3>
    <p class="muted">Lihat bagaimana data diurutkan dari kecil ke besar, langkah demi langkah.</p>
    <div class="viz-controls">
      <label>Algoritma
        <select id="s-algo">
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
        </select>
      </label>
      <button class="btn btn-sm" id="s-main" type="button">▶ Mulai</button>
      <button class="btn btn-sm btn-ghost" id="s-langkah" type="button">Langkah berikutnya</button>
      <button class="btn btn-sm btn-ghost" id="s-acak" type="button">🎲 Data baru</button>
      <button class="btn btn-sm btn-ghost" id="s-reset" type="button">Reset</button>
      <label>Kecepatan
        <input type="range" id="s-speed" min="60" max="900" value="380" step="20" aria-label="Kecepatan animasi">
      </label>
    </div>
    <div class="viz-stage"><div class="bars" id="s-bars"></div></div>
    <p class="viz-log" id="s-log">Tekan “Mulai” untuk menjalankan, atau “Langkah berikutnya” untuk maju pelan-pelan.</p>`;

  let data = dataAcak();
  let frames = [];
  let posisi = 0;
  let timer = null;

  function dataAcak() {
    return Array.from({ length: 9 }, () => acak(5, 60));
  }

  function siapkan() {
    frames = buatFrames($("#s-algo", box).value, [...data]);
    posisi = 0;
    gambar(frames[0]);
  }

  function gambar(f) {
    const maks = Math.max(...f.arr);
    $("#s-bars", box).innerHTML = f.arr
      .map((nilai, i) => {
        let kelas = "bar";
        if (f.selesai.includes(i)) kelas += " done";
        else if (f.tukar && f.tukar.includes(i)) kelas += " swap";
        else if (f.banding && f.banding.includes(i)) kelas += " compare";
        const tinggi = Math.round((nilai / maks) * 190) + 24;
        return `<div class="${kelas}" style="height:${tinggi}px" title="${nilai}">${nilai}</div>`;
      })
      .join("");
    $("#s-log", box).textContent = f.pesan;
  }

  function maju() {
    if (posisi < frames.length - 1) {
      posisi++;
      gambar(frames[posisi]);
    } else {
      berhenti();
    }
  }

  function berhenti() {
    clearInterval(timer);
    timer = null;
    $("#s-main", box).textContent = "▶ Mulai";
  }

  $("#s-main", box).addEventListener("click", () => {
    if (timer) return berhenti();
    if (posisi >= frames.length - 1) siapkan();
    $("#s-main", box).textContent = "⏸ Jeda";
    timer = setInterval(maju, Number($("#s-speed", box).value));
  });
  $("#s-langkah", box).addEventListener("click", () => {
    berhenti();
    maju();
  });
  $("#s-acak", box).addEventListener("click", () => {
    berhenti();
    data = dataAcak();
    siapkan();
  });
  $("#s-reset", box).addEventListener("click", () => {
    berhenti();
    siapkan();
  });
  $("#s-algo", box).addEventListener("change", () => {
    berhenti();
    siapkan();
  });
  $("#s-speed", box).addEventListener("input", () => {
    if (timer) {
      clearInterval(timer);
      timer = setInterval(maju, Number($("#s-speed", box).value));
    }
  });

  siapkan();
}

/** Membuat daftar "foto" (frame) dari proses sorting. */
function buatFrames(algo, arr) {
  const frames = [];
  const simpan = (pesan, banding = [], tukar = [], selesai = []) =>
    frames.push({ arr: [...arr], pesan, banding, tukar, selesai: [...selesai] });

  const n = arr.length;
  const beres = [];
  simpan("Data awal. Tujuannya: mengurutkan dari kecil ke besar.");

  if (algo === "bubble") {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        simpan(`Bandingkan ${arr[j]} dan ${arr[j + 1]}.`, [j, j + 1], [], beres);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          simpan(`${arr[j + 1]} > ${arr[j]} → tukar posisi.`, [], [j, j + 1], beres);
        }
      }
      beres.unshift(n - 1 - i);
      simpan(`Angka terbesar sudah naik ke posisi ${n - i}. Bagian itu tidak perlu dicek lagi.`, [], [], beres);
    }
  } else if (algo === "selection") {
    for (let i = 0; i < n - 1; i++) {
      let kecil = i;
      simpan(`Cari angka terkecil mulai dari posisi ${i + 1}.`, [i], [], beres);
      for (let j = i + 1; j < n; j++) {
        simpan(`Bandingkan ${arr[j]} dengan calon terkecil ${arr[kecil]}.`, [j, kecil], [], beres);
        if (arr[j] < arr[kecil]) kecil = j;
      }
      if (kecil !== i) {
        [arr[i], arr[kecil]] = [arr[kecil], arr[i]];
        simpan(`Tukar ${arr[kecil]} dengan ${arr[i]} (terkecil pindah ke depan).`, [], [i, kecil], beres);
      }
      beres.push(i);
      simpan(`Posisi ${i + 1} sudah benar.`, [], [], beres);
    }
  } else {
    for (let i = 1; i < n; i++) {
      const kunci = arr[i];
      let j = i - 1;
      simpan(`Ambil ${kunci}, lalu cari tempatnya di bagian kiri yang sudah urut.`, [i], [], beres);
      while (j >= 0 && arr[j] > kunci) {
        arr[j + 1] = arr[j];
        simpan(`${arr[j]} lebih besar dari ${kunci} → geser ke kanan.`, [], [j, j + 1], beres);
        j--;
      }
      arr[j + 1] = kunci;
      simpan(`Selipkan ${kunci} di posisi ${j + 2}.`, [j + 1], [], beres);
    }
  }

  frames.push({ arr: [...arr], pesan: "Selesai! Semua data sudah urut. 🎉", banding: [], tukar: [], selesai: arr.map((_, i) => i) });
  return frames;
}

/* =========================================================
   2. SEARCHING VISUALIZER
   ========================================================= */
function buatSearching(box) {
  const data = [4, 9, 13, 21, 30, 38, 47, 55, 64, 72];

  box.innerHTML = `
    <h3>🔍 Searching Visualizer</h3>
    <p class="muted">Data sudah diurutkan supaya binary search bisa dipakai juga.</p>
    <div class="viz-controls">
      <label>Metode
        <select id="c-algo">
          <option value="linear">Linear Search (cek satu-satu)</option>
          <option value="binary">Binary Search (bagi dua)</option>
        </select>
      </label>
      <label>Cari angka
        <input type="number" id="c-nilai" value="47" style="width:100px">
      </label>
      <button class="btn btn-sm" id="c-cari" type="button">Cari</button>
      <button class="btn btn-sm btn-ghost" id="c-langkah" type="button">Langkah berikutnya</button>
      <button class="btn btn-sm btn-ghost" id="c-reset" type="button">Reset</button>
    </div>
    <div class="viz-stage"><div class="cells" id="c-cells"></div></div>
    <p class="viz-log" id="c-log">Masukkan angka lalu tekan “Cari”.</p>`;

  let frames = [];
  let posisi = 0;
  let timer = null;

  function gambar(f) {
    $("#c-cells", box).innerHTML = data
      .map((nilai, i) => {
        let kelas = "cell";
        if (f) {
          if (f.ketemu === i) kelas += " ketemu";
          else if (f.cek === i) kelas += " aktif";
          else if (f.buang && f.buang.includes(i)) kelas += " buang";
        }
        return `<div class="${kelas}">${nilai}<span class="idx">${i}</span></div>`;
      })
      .join("");
    if (f) $("#c-log", box).textContent = f.pesan;
  }

  function buatFrame() {
    const target = Number($("#c-nilai", box).value);
    const mode = $("#c-algo", box).value;
    frames = mode === "linear" ? frameLinear(data, target) : frameBinary(data, target);
    posisi = 0;
    gambar(frames[0]);
  }

  function maju() {
    if (posisi < frames.length - 1) {
      posisi++;
      gambar(frames[posisi]);
    } else {
      clearInterval(timer);
      timer = null;
    }
  }

  $("#c-cari", box).addEventListener("click", () => {
    clearInterval(timer);
    buatFrame();
    timer = setInterval(maju, 700);
  });
  $("#c-langkah", box).addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    if (!frames.length || posisi >= frames.length - 1) buatFrame();
    else maju();
  });
  $("#c-reset", box).addEventListener("click", () => {
    clearInterval(timer);
    frames = [];
    posisi = 0;
    gambar(null);
    $("#c-log", box).textContent = "Masukkan angka lalu tekan “Cari”.";
  });

  gambar(null);
}

function frameLinear(data, target) {
  const f = [{ pesan: `Linear search: kita cek satu per satu dari kiri, mencari ${target}.`, cek: -1, buang: [] }];
  for (let i = 0; i < data.length; i++) {
    if (data[i] === target) {
      f.push({ pesan: `Index ${i}: ${data[i]} = ${target} → ketemu! ✅ Butuh ${i + 1} langkah.`, ketemu: i, buang: [] });
      return f;
    }
    f.push({ pesan: `Index ${i}: ${data[i]} bukan ${target} → lanjut ke kanan.`, cek: i, buang: [] });
  }
  f.push({ pesan: `Sudah sampai ujung. ${target} tidak ada di data ini. ❌`, cek: -1, buang: [] });
  return f;
}

function frameBinary(data, target) {
  const f = [{ pesan: `Binary search: data harus urut. Kita lihat bagian tengah dulu untuk mencari ${target}.`, cek: -1, buang: [] }];
  let kiri = 0;
  let kanan = data.length - 1;
  const buang = [];

  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (data[tengah] === target) {
      f.push({ pesan: `Tengah = index ${tengah} berisi ${data[tengah]} → ketemu! ✅`, ketemu: tengah, buang: [...buang] });
      return f;
    }
    if (data[tengah] < target) {
      f.push({ pesan: `Tengah = ${data[tengah]}, lebih kecil dari ${target} → buang bagian kiri.`, cek: tengah, buang: [...buang] });
      for (let i = kiri; i <= tengah; i++) buang.push(i);
      kiri = tengah + 1;
    } else {
      f.push({ pesan: `Tengah = ${data[tengah]}, lebih besar dari ${target} → buang bagian kanan.`, cek: tengah, buang: [...buang] });
      for (let i = tengah; i <= kanan; i++) buang.push(i);
      kanan = tengah - 1;
    }
  }
  f.push({ pesan: `Sudah tidak ada sisa data. ${target} tidak ditemukan. ❌`, cek: -1, buang: [...buang] });
  return f;
}

/* =========================================================
   3. ARRAY
   ========================================================= */
function buatArray(box) {
  let data = ["Apel", "Jeruk", "Mangga"];

  box.innerHTML = `
    <h3>🗃️ Array Visualizer</h3>
    <p class="muted">Tambah, ubah, hapus, dan cari data. Perhatikan nomor index-nya ikut berubah.</p>
    <div class="viz-controls">
      <label>Nilai <input type="text" id="a-nilai" value="Pisang" style="width:130px"></label>
      <label>Index <input type="number" id="a-index" value="0" min="0" style="width:80px"></label>
      <button class="btn btn-sm" id="a-append" type="button">Tambah di akhir</button>
      <button class="btn btn-sm btn-ghost" id="a-insert" type="button">Sisipkan di index</button>
      <button class="btn btn-sm btn-ghost" id="a-update" type="button">Ubah index</button>
      <button class="btn btn-sm btn-ghost" id="a-hapus" type="button">Hapus index</button>
      <button class="btn btn-sm btn-ghost" id="a-cari" type="button">Cari nilai</button>
      <button class="btn btn-sm btn-ghost" id="a-reset" type="button">Reset</button>
    </div>
    <div class="viz-stage"><div class="cells" id="a-cells"></div></div>
    <p class="viz-log" id="a-log">Array punya nomor posisi (index) mulai dari 0.</p>`;

  function gambar(sorot = -1, kelas = "aktif") {
    $("#a-cells", box).innerHTML =
      data.length === 0
        ? `<span class="muted">(array kosong)</span>`
        : data
            .map((v, i) => `<div class="cell ${i === sorot ? kelas : ""}">${esc(v)}<span class="idx">${i}</span></div>`)
            .join("");
  }
  const kabar = (t) => ($("#a-log", box).textContent = t);
  const nilai = () => $("#a-nilai", box).value.trim() || "Data";
  const index = () => Number($("#a-index", box).value);

  $("#a-append", box).addEventListener("click", () => {
    data.push(nilai());
    gambar(data.length - 1, "baru");
    kabar(`append("${nilai()}") → ditaruh di index ${data.length - 1}. Cepat, O(1).`);
  });
  $("#a-insert", box).addEventListener("click", () => {
    const i = Math.min(Math.max(index(), 0), data.length);
    data.splice(i, 0, nilai());
    gambar(i, "baru");
    kabar(`insert(${i}, "${nilai()}") → semua data setelahnya digeser ke kanan. O(n).`);
  });
  $("#a-update", box).addEventListener("click", () => {
    const i = index();
    if (i < 0 || i >= data.length) return kabar(`Index ${i} tidak ada. Index yang tersedia: 0 sampai ${data.length - 1}.`);
    data[i] = nilai();
    gambar(i);
    kabar(`data[${i}] = "${nilai()}" → mengganti isi langsung. O(1).`);
  });
  $("#a-hapus", box).addEventListener("click", () => {
    const i = index();
    if (i < 0 || i >= data.length) return kabar(`Index ${i} tidak ada.`);
    const dibuang = data.splice(i, 1)[0];
    gambar();
    kabar(`pop(${i}) → "${dibuang}" dihapus, sisanya digeser ke kiri. O(n).`);
  });
  $("#a-cari", box).addEventListener("click", () => {
    const cari = nilai();
    const i = data.indexOf(cari);
    gambar(i, i === -1 ? "aktif" : "ketemu");
    kabar(i === -1 ? `"${cari}" tidak ditemukan (sudah dicek semua, O(n)).` : `"${cari}" ketemu di index ${i}.`);
  });
  $("#a-reset", box).addEventListener("click", () => {
    data = ["Apel", "Jeruk", "Mangga"];
    gambar();
    kabar("Array dikembalikan ke isi awal.");
  });

  gambar();
}

/* =========================================================
   4. STACK
   ========================================================= */
function buatStack(box) {
  let tumpukan = ["Piring 1", "Piring 2"];
  let nomor = 3;

  box.innerHTML = `
    <h3>🍽️ Stack Simulator (LIFO)</h3>
    <p class="muted">Yang terakhir masuk, keluar duluan — seperti tumpukan piring.</p>
    <div class="viz-controls">
      <label>Isi <input type="text" id="st-nilai" placeholder="otomatis: Piring 3" style="width:170px"></label>
      <button class="btn btn-sm" id="st-push" type="button">Push (taruh)</button>
      <button class="btn btn-sm btn-ghost" id="st-pop" type="button">Pop (ambil atas)</button>
      <button class="btn btn-sm btn-ghost" id="st-peek" type="button">Peek (intip)</button>
      <button class="btn btn-sm btn-ghost" id="st-reset" type="button">Reset</button>
    </div>
    <div class="viz-stage"><div class="stack-box" id="st-box"></div></div>
    <p class="viz-log" id="st-log">Tekan Push untuk menambah piring ke tumpukan.</p>`;

  function gambar(sorotAtas = false) {
    const box2 = $("#st-box", box);
    box2.innerHTML =
      tumpukan.length === 0
        ? `<span class="muted">(stack kosong — isEmpty bernilai True)</span>`
        : tumpukan
            .map((v, i) => `<div class="stack-item ${i === tumpukan.length - 1 && sorotAtas ? "top" : ""}">${esc(v)}${i === tumpukan.length - 1 ? " ← TOP" : ""}</div>`)
            .join("");
  }
  const kabar = (t) => ($("#st-log", box).textContent = t);

  $("#st-push", box).addEventListener("click", () => {
    const isi = $("#st-nilai", box).value.trim() || "Piring " + nomor++;
    tumpukan.push(isi);
    $("#st-nilai", box).value = "";
    gambar(true);
    kabar(`push("${isi}") → ditaruh paling atas. Tinggi tumpukan sekarang ${tumpukan.length}.`);
  });
  $("#st-pop", box).addEventListener("click", () => {
    if (!tumpukan.length) {
      gambar();
      return kabar("Stack kosong! pop() pada stack kosong akan menyebabkan error. Cek isEmpty dulu ya.");
    }
    const keluar = tumpukan.pop();
    gambar(true);
    kabar(`pop() → "${keluar}" keluar (dia yang terakhir masuk). Inilah LIFO.`);
  });
  $("#st-peek", box).addEventListener("click", () => {
    if (!tumpukan.length) return kabar("Tidak ada yang bisa diintip, stack masih kosong.");
    gambar(true);
    kabar(`peek() → "${tumpukan[tumpukan.length - 1]}". Cuma dilihat, tidak diambil.`);
  });
  $("#st-reset", box).addEventListener("click", () => {
    tumpukan = ["Piring 1", "Piring 2"];
    nomor = 3;
    gambar();
    kabar("Stack dikembalikan ke isi awal.");
  });

  gambar();
}

/* =========================================================
   5. QUEUE
   ========================================================= */
function buatQueue(box) {
  let antrean = ["Andi", "Budi"];
  const nama = ["Caca", "Dina", "Eko", "Fani", "Gilang", "Hana"];
  let ke = 0;

  box.innerHTML = `
    <h3>🧍 Queue Simulator (FIFO)</h3>
    <p class="muted">Yang pertama datang, dilayani duluan — seperti antre di kasir.</p>
    <div class="viz-controls">
      <label>Nama <input type="text" id="q-nilai" placeholder="otomatis: Caca" style="width:150px"></label>
      <button class="btn btn-sm" id="q-in" type="button">Enqueue (ikut antre)</button>
      <button class="btn btn-sm btn-ghost" id="q-out" type="button">Dequeue (layani depan)</button>
      <button class="btn btn-sm btn-ghost" id="q-reset" type="button">Reset</button>
    </div>
    <div class="viz-stage">
      <div class="cells" id="q-cells"></div>
    </div>
    <p class="viz-log" id="q-log">Orang baru selalu masuk dari belakang (rear).</p>`;

  function gambar() {
    $("#q-cells", box).innerHTML =
      antrean.length === 0
        ? `<span class="muted">(antrean kosong)</span>`
        : antrean
            .map((v, i) => {
              const label = i === 0 ? "FRONT" : i === antrean.length - 1 ? "REAR" : "";
              return `<div class="cell ${i === 0 ? "ketemu" : ""}">${esc(v)}<span class="idx">${label || i}</span></div>`;
            })
            .join('<span class="node-arrow">←</span>');
  }
  const kabar = (t) => ($("#q-log", box).textContent = t);

  $("#q-in", box).addEventListener("click", () => {
    const isi = $("#q-nilai", box).value.trim() || nama[ke++ % nama.length];
    antrean.push(isi);
    $("#q-nilai", box).value = "";
    gambar();
    kabar(`enqueue("${isi}") → berdiri di paling belakang. Panjang antrean: ${antrean.length}.`);
  });
  $("#q-out", box).addEventListener("click", () => {
    if (!antrean.length) return kabar("Antrean kosong, tidak ada yang bisa dilayani.");
    const keluar = antrean.shift();
    gambar();
    kabar(`dequeue() → "${keluar}" dilayani dan keluar. Dia yang datang paling awal (FIFO).`);
  });
  $("#q-reset", box).addEventListener("click", () => {
    antrean = ["Andi", "Budi"];
    ke = 0;
    gambar();
    kabar("Antrean dikembalikan ke isi awal.");
  });

  gambar();
}

/* =========================================================
   6. LINKED LIST
   ========================================================= */
function buatLinkedList(box) {
  let node = ["Andi", "Budi", "Caca"];

  box.innerHTML = `
    <h3>🚂 Linked List Visualizer</h3>
    <p class="muted">Setiap gerbong (node) menyimpan data dan alamat gerbong berikutnya.</p>
    <div class="viz-controls">
      <label>Data <input type="text" id="l-nilai" value="Dina" style="width:130px"></label>
      <label>Posisi <input type="number" id="l-pos" value="0" min="0" style="width:80px"></label>
      <button class="btn btn-sm" id="l-depan" type="button">Tambah di depan (head)</button>
      <button class="btn btn-sm btn-ghost" id="l-belakang" type="button">Tambah di belakang</button>
      <button class="btn btn-sm btn-ghost" id="l-hapus" type="button">Hapus posisi</button>
      <button class="btn btn-sm btn-ghost" id="l-telusur" type="button">Telusuri (traversal)</button>
      <button class="btn btn-sm btn-ghost" id="l-reset" type="button">Reset</button>
    </div>
    <div class="viz-stage"><div class="nodes" id="l-nodes"></div></div>
    <p class="viz-log" id="l-log">Node pertama disebut HEAD, node terakhir disebut TAIL.</p>`;

  function gambar(sorot = -1) {
    const wadah = $("#l-nodes", box);
    if (!node.length) {
      wadah.innerHTML = `<span class="muted">(kosong — head menunjuk ke None)</span>`;
      return;
    }
    wadah.innerHTML = node
      .map((v, i) => {
        const label = i === 0 ? "HEAD" : i === node.length - 1 ? "TAIL" : "&nbsp;";
        const akhir = i === node.length - 1;
        return `<div>
            <div class="node-label">${label}</div>
            <div class="node" style="${i === sorot ? "border-color:var(--amber)" : ""}">
              <span class="data">${esc(v)}</span>
              <span class="next">${akhir ? "✕" : "→"}</span>
            </div>
          </div>${akhir ? "" : '<span class="node-arrow">→</span>'}`;
      })
      .join("");
  }
  const kabar = (t) => ($("#l-log", box).textContent = t);
  const nilai = () => $("#l-nilai", box).value.trim() || "Node";

  $("#l-depan", box).addEventListener("click", () => {
    node.unshift(nilai());
    gambar(0);
    kabar(`"${nilai()}" jadi HEAD baru. Node lama disambungkan ke belakangnya. Cepat sekali: O(1).`);
  });
  $("#l-belakang", box).addEventListener("click", () => {
    node.push(nilai());
    gambar(node.length - 1);
    kabar(`"${nilai()}" jadi TAIL baru. Kalau tidak menyimpan posisi tail, kita harus jalan dari head dulu: O(n).`);
  });
  $("#l-hapus", box).addEventListener("click", () => {
    const i = Number($("#l-pos", box).value);
    if (i < 0 || i >= node.length) return kabar(`Posisi ${i} tidak ada.`);
    const buang = node.splice(i, 1)[0];
    gambar();
    kabar(`"${buang}" dihapus. Node sebelumnya kini langsung menunjuk node sesudahnya.`);
  });
  $("#l-telusur", box).addEventListener("click", async () => {
    kabar("Traversal: mulai dari head, lalu ikuti penunjuk next satu per satu...");
    for (let i = 0; i < node.length; i++) {
      gambar(i);
      kabar(`Sedang di node ${i + 1}: "${node[i]}" → pindah ke next.`);
      await new Promise((r) => setTimeout(r, 650));
    }
    gambar();
    kabar("Sampai di TAIL, next-nya kosong (None). Traversal selesai. Butuh O(n) langkah.");
  });
  $("#l-reset", box).addEventListener("click", () => {
    node = ["Andi", "Budi", "Caca"];
    gambar();
    kabar("Linked list dikembalikan ke isi awal.");
  });

  gambar();
}

/* =========================================================
   7. BINARY SEARCH TREE
   ========================================================= */
function buatTree(box) {
  let akar = null;

  box.innerHTML = `
    <h3>🌳 Binary Search Tree Visualizer</h3>
    <p class="muted">Aturannya cuma satu: lebih kecil ke kiri, lebih besar ke kanan.</p>
    <div class="viz-controls">
      <label>Angka <input type="number" id="t-nilai" value="45" style="width:90px"></label>
      <button class="btn btn-sm" id="t-insert" type="button">Insert</button>
      <button class="btn btn-sm btn-ghost" id="t-cari" type="button">Search</button>
      <button class="btn btn-sm btn-ghost" id="t-hapus" type="button">Delete</button>
      <button class="btn btn-sm btn-ghost" id="t-acak" type="button">🎲 Isi acak</button>
      <button class="btn btn-sm btn-ghost" id="t-reset" type="button">Kosongkan</button>
    </div>
    <div class="viz-stage"><svg class="tree-svg" id="t-svg" role="img" aria-label="Gambar binary search tree"></svg></div>
    <p class="viz-log" id="t-log">Masukkan beberapa angka dan lihat pohonnya tumbuh.</p>`;

  const kabar = (t) => ($("#t-log", box).textContent = t);

  function sisip(node, nilai) {
    if (!node) return { nilai, kiri: null, kanan: null };
    if (nilai < node.nilai) node.kiri = sisip(node.kiri, nilai);
    else if (nilai > node.nilai) node.kanan = sisip(node.kanan, nilai);
    return node;
  }

  function hapus(node, nilai) {
    if (!node) return null;
    if (nilai < node.nilai) node.kiri = hapus(node.kiri, nilai);
    else if (nilai > node.nilai) node.kanan = hapus(node.kanan, nilai);
    else {
      if (!node.kiri) return node.kanan;
      if (!node.kanan) return node.kiri;
      let ganti = node.kanan;
      while (ganti.kiri) ganti = ganti.kiri; // nilai terkecil di cabang kanan
      node.nilai = ganti.nilai;
      node.kanan = hapus(node.kanan, ganti.nilai);
    }
    return node;
  }

  function gambar(sorot = [], ketemu = null) {
    const svg = $("#t-svg", box);
    if (!akar) {
      svg.innerHTML = `<text x="20" y="40" fill="currentColor" font-size="14">(pohon masih kosong)</text>`;
      return;
    }
    // Posisi x ditentukan dari urutan in-order, y dari kedalaman.
    let urutan = 0;
    const simpul = [];
    const garis = [];
    (function tempatkan(node, dalam, induk) {
      if (!node) return;
      tempatkan(node.kiri, dalam + 1, node);
      node.x = 40 + urutan++ * 62;
      node.y = 40 + dalam * 66;
      simpul.push(node);
      if (induk) garis.push([induk, node]);
      tempatkan(node.kanan, dalam + 1, node);
    })(akar, 0, null);

    const lebar = Math.max(520, 40 + urutan * 62);
    const tinggi = Math.max(...simpul.map((n) => n.y)) + 50;
    svg.setAttribute("viewBox", `0 0 ${lebar} ${tinggi}`);
    svg.style.height = tinggi + "px";
    svg.innerHTML =
      garis
        .map(([a, b]) => `<line class="tree-edge" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" />`)
        .join("") +
      simpul
        .map((n) => {
          const kelas = n.nilai === ketemu ? "tree-node ketemu" : sorot.includes(n.nilai) ? "tree-node aktif" : "tree-node";
          return `<g class="${kelas}"><circle cx="${n.x}" cy="${n.y}" r="20" /><text x="${n.x}" y="${n.y}">${n.nilai}</text></g>`;
        })
        .join("");
  }

  const angka = () => Number($("#t-nilai", box).value);

  $("#t-insert", box).addEventListener("click", () => {
    const v = angka();
    const jejak = [];
    let n = akar;
    while (n) {
      jejak.push(`${v} ${v < n.nilai ? "<" : ">"} ${n.nilai} → ke ${v < n.nilai ? "kiri" : "kanan"}`);
      n = v < n.nilai ? n.kiri : n.kanan;
    }
    akar = sisip(akar, v);
    gambar([v]);
    kabar(jejak.length ? `Insert ${v}: ` + jejak.join(", ") + ", lalu ditaruh di tempat kosong." : `${v} menjadi ROOT (node pertama).`);
  });

  $("#t-cari", box).addEventListener("click", () => {
    const v = angka();
    const jejak = [];
    let n = akar;
    let langkah = 0;
    while (n) {
      langkah++;
      if (n.nilai === v) {
        gambar(jejak, v);
        return kabar(`Ketemu ${v} setelah ${langkah} langkah. Bandingkan dengan mengecek semua node satu per satu!`);
      }
      jejak.push(n.nilai);
      n = v < n.nilai ? n.kiri : n.kanan;
    }
    gambar(jejak);
    kabar(`${v} tidak ada di pohon ini (sudah dicek ${langkah} node).`);
  });

  $("#t-hapus", box).addEventListener("click", () => {
    const v = angka();
    akar = hapus(akar, v);
    gambar();
    kabar(`Delete ${v}. Kalau node punya dua anak, penggantinya adalah nilai terkecil dari cabang kanan.`);
  });

  $("#t-acak", box).addEventListener("click", () => {
    akar = null;
    const dipakai = new Set();
    while (dipakai.size < 8) dipakai.add(acak(10, 95));
    dipakai.forEach((v) => (akar = sisip(akar, v)));
    gambar();
    kabar("Pohon diisi 8 angka acak. Coba cari salah satu angkanya.");
  });

  $("#t-reset", box).addEventListener("click", () => {
    akar = null;
    gambar();
    kabar("Pohon dikosongkan.");
  });

  [50, 30, 70, 20, 40, 60, 80].forEach((v) => (akar = sisip(akar, v)));
  gambar();
}

/* =========================================================
   8. HASH TABLE
   ========================================================= */
function buatHash(box) {
  const JUMLAH_LACI = 7;
  let laci = Array.from({ length: JUMLAH_LACI }, () => []);

  box.innerHTML = `
    <h3>🗄️ Hash Table Visualizer</h3>
    <p class="muted">Nama diubah jadi angka oleh hash function, lalu disimpan di laci sesuai angka itu.</p>
    <div class="viz-controls">
      <label>Key <input type="text" id="h-key" value="Anam" style="width:120px"></label>
      <label>Value <input type="text" id="h-val" value="0812-1111" style="width:140px"></label>
      <button class="btn btn-sm" id="h-set" type="button">Simpan</button>
      <button class="btn btn-sm btn-ghost" id="h-get" type="button">Cari key</button>
      <button class="btn btn-sm btn-ghost" id="h-del" type="button">Hapus key</button>
      <button class="btn btn-sm btn-ghost" id="h-reset" type="button">Kosongkan</button>
    </div>
    <div class="viz-stage"><div class="buckets" id="h-buckets"></div></div>
    <p class="viz-log" id="h-log">Hash function di sini: jumlahkan kode huruf, lalu sisa bagi ${JUMLAH_LACI}.</p>`;

  const kabar = (t) => ($("#h-log", box).textContent = t);

  function hash(teks) {
    let total = 0;
    for (const c of teks.toLowerCase()) total += c.charCodeAt(0);
    return total % JUMLAH_LACI;
  }

  function gambar(sorot = -1) {
    $("#h-buckets", box).innerHTML = laci
      .map(
        (isi, i) => `
        <div class="bucket">
          <div class="bucket-id" style="${i === sorot ? "border-color:var(--amber);color:var(--amber)" : ""}">Laci ${i}</div>
          <div class="bucket-items">
            ${isi.length === 0 ? '<span class="muted" style="font-size:.8rem">kosong</span>' : ""}
            ${isi.map((p) => `<span class="chip ${isi.length > 1 ? "tabrakan" : ""}">${esc(p.key)} : ${esc(p.value)}</span>`).join("")}
          </div>
        </div>`
      )
      .join("");
  }

  $("#h-set", box).addEventListener("click", () => {
    const key = $("#h-key", box).value.trim();
    const value = $("#h-val", box).value.trim() || "-";
    if (!key) return kabar("Isi dulu key-nya ya.");
    const i = hash(key);
    const isi = laci[i];
    const lama = isi.find((p) => p.key === key);
    if (lama) {
      lama.value = value;
      gambar(i);
      return kabar(`Key "${key}" sudah ada di laci ${i} → isinya diperbarui.`);
    }
    isi.push({ key, value });
    gambar(i);
    kabar(
      isi.length > 1
        ? `"${key}" juga jatuh ke laci ${i}. Ini COLLISION! Solusinya: laci ${i} menyimpan daftar kecil berisi keduanya.`
        : `"${key}" → hash → laci ${i}. Disimpan langsung di situ.`
    );
  });

  $("#h-get", box).addEventListener("click", () => {
    const key = $("#h-key", box).value.trim();
    const i = hash(key);
    const isi = laci[i].find((p) => p.key === key);
    gambar(i);
    kabar(
      isi
        ? `Cari "${key}" → hash → laci ${i} → langsung ketemu: ${isi.value}. Rata-rata O(1)!`
        : `Cari "${key}" → hash → laci ${i} → tidak ada di sana, berarti memang belum tersimpan.`
    );
  });

  $("#h-del", box).addEventListener("click", () => {
    const key = $("#h-key", box).value.trim();
    const i = hash(key);
    const sebelum = laci[i].length;
    laci[i] = laci[i].filter((p) => p.key !== key);
    gambar(i);
    kabar(sebelum === laci[i].length ? `"${key}" tidak ada di laci ${i}.` : `"${key}" dihapus dari laci ${i}.`);
  });

  $("#h-reset", box).addEventListener("click", () => {
    laci = Array.from({ length: JUMLAH_LACI }, () => []);
    gambar();
    kabar("Semua laci dikosongkan.");
  });

  [["Anam", "0812-1111"], ["Rudi", "0857-2222"], ["Sari", "0813-3333"]].forEach(([k, v]) => laci[hash(k)].push({ key: k, value: v }));
  gambar();
}

/* =========================================================
   9. KOMPLEKSITAS (BIG O) INTERAKTIF
   ========================================================= */
function buatKompleksitas(box) {
  box.innerHTML = `
    <h3>⏱️ Rasakan Bedanya Big O</h3>
    <p class="muted">Geser jumlah datanya, lalu perhatikan berapa langkah yang dibutuhkan tiap algoritma.</p>
    <div class="viz-controls">
      <label for="k-n">Jumlah data (n)</label>
      <input type="range" id="k-n" min="1" max="100" value="10" style="flex:1;min-width:180px">
      <output id="k-out" style="font-family:var(--mono);font-weight:600">10</output>
    </div>
    <div class="viz-stage" id="k-bar"></div>
    <p class="viz-log">Angka di kanan adalah perkiraan jumlah langkah. Panjang batang dibuat relatif terhadap yang paling banyak.</p>`;

  const baris = [
    { nama: "O(1)", warna: "var(--green)", hitung: () => 1 },
    { nama: "O(log n)", warna: "var(--accent)", hitung: (n) => Math.max(1, Math.ceil(Math.log2(n))) },
    { nama: "O(n)", warna: "var(--primary)", hitung: (n) => n },
    { nama: "O(n log n)", warna: "var(--amber)", hitung: (n) => Math.round(n * Math.max(1, Math.log2(n))) },
    { nama: "O(n²)", warna: "var(--red)", hitung: (n) => n * n },
  ];

  function gambar(n) {
    const nilai = baris.map((b) => b.hitung(n));
    const maks = Math.max(...nilai);
    $("#k-bar", box).innerHTML = baris
      .map((b, i) => {
        const persen = Math.max(1.5, (nilai[i] / maks) * 100);
        return `<div class="bigo-row">
            <span class="bigo-name">${b.nama}</span>
            <span class="bigo-track"><span class="bigo-fill" style="width:${persen}%;background:${b.warna}"></span></span>
            <span class="bigo-val">${nilai[i].toLocaleString("id-ID")} langkah</span>
          </div>`;
      })
      .join("");
  }

  $("#k-n", box).addEventListener("input", (e) => {
    $("#k-out", box).textContent = e.target.value;
    gambar(Number(e.target.value));
  });

  gambar(10);
}
