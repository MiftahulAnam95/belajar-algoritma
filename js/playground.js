/* =========================================================
   playground.js — "Python Playground" sederhana.

   PENTING: ini BUKAN Python asli. Ini simulator kecil yang
   ditulis dengan JavaScript, supaya website tetap statis
   (tanpa server) dan bisa di-host di GitHub Pages.

   Yang didukung:
   - variabel, angka, teks, list, dictionary
   - print(), len(), str(), int(), range(), sum(), min(), max(), sorted()
   - method list: append, pop, insert, remove, sort, reverse, index, count
   - dictionary: baca/tulis lewat key, del, "key in dict"
   - if / elif / else, for, while
   Yang BELUM didukung: def (fungsi), class, import, f-string.

   Mau Python asli suatu hari nanti? Ganti isi fungsi jalankanKode()
   dengan pemanggilan Pyodide (pyodide.runPython). Bagian UI di bawah
   tidak perlu diubah sama sekali.
   ========================================================= */

import { $, $$, esc } from "./util.js";

/* ============ BAGIAN 1: TAMPILAN ============ */

export function htmlPlayground(kodeAwal) {
  const kode = esc(kodeAwal);
  return `
  <section class="card playground" style="margin-top:2.5rem">
    <h3>🐍 Python Playground</h3>
    <p class="muted" style="font-size:0.9rem">
      Playground sederhana — hanya mendukung beberapa contoh Python dasar
      (variabel, <code>print</code>, list, dictionary, <code>if</code>,
      <code>for</code>, <code>while</code>). Bukan Python asli, tapi cukup untuk berlatih.
    </p>
    <p class="muted" style="font-size:0.85rem;margin-bottom:0.4rem">
      Tulis atau ubah kodenya, lalu tekan Run:
    </p>
    <textarea class="pg-kode" spellcheck="false" aria-label="Editor kode Python sederhana"
      data-awal="${kode}">${kode}</textarea>
    <div class="playground-row">
      <button class="btn pg-run" type="button">▶ Run</button>
      <button class="btn btn-ghost pg-reset" type="button">Kembalikan contoh</button>
      <span class="muted" style="font-size:0.85rem">Coba ubah angkanya, lalu jalankan lagi.</span>
    </div>
    <p style="font-weight:600;margin:0 0 0.4rem">Output:</p>
    <div class="playground-out" role="status" aria-live="polite">(belum dijalankan)</div>
  </section>`;
}

export function pasangPlayground(root) {
  $$(".playground", root).forEach((box) => {
    const area = $(".pg-kode", box);
    const keluar = $(".playground-out", box);

    $(".pg-run", box).addEventListener("click", () => {
      const hasil = jalankanKode(area.value);
      keluar.textContent = hasil.teks || "(tidak ada output)";
      keluar.style.color = hasil.error ? "var(--red)" : "";
    });

    $(".pg-reset", box).addEventListener("click", () => {
      area.value = area.dataset.awal;
      keluar.textContent = "(belum dijalankan)";
      keluar.style.color = "";
    });
  });
}

/* ============ BAGIAN 2: MESIN SEDERHANA ============ */

/** Titik masuk. Kalau nanti pakai Pyodide, cukup ganti isi fungsi ini. */
export function jalankanKode(kode) {
  const keluaran = [];
  try {
    const baris = siapkanBaris(kode);
    const blok = bacaBlok(baris, { i: 0 }, 0);
    jalankanBlok(blok, Object.create(null), keluaran, { langkah: 0 });
    return { teks: keluaran.join("\n"), error: false };
  } catch (e) {
    keluaran.push("⚠️ " + e.message);
    return { teks: keluaran.join("\n"), error: true };
  }
}

/** Buang baris kosong & komentar, catat seberapa dalam indentasinya. */
function siapkanBaris(kode) {
  return kode
    .replace(/\t/g, "    ")
    .split("\n")
    .map((teks) => ({ indent: teks.search(/\S|$/), teks: buangKomentar(teks).trim() }))
    .filter((b) => b.teks !== "");
}

function buangKomentar(baris) {
  let dalamKutip = null;
  for (let i = 0; i < baris.length; i++) {
    const c = baris[i];
    if (dalamKutip) {
      if (c === dalamKutip) dalamKutip = null;
    } else if (c === '"' || c === "'") {
      dalamKutip = c;
    } else if (c === "#") {
      return baris.slice(0, i);
    }
  }
  return baris;
}

/** Ubah daftar baris menjadi struktur bersarang berdasarkan indentasi. */
function bacaBlok(baris, posisi, indent) {
  const hasil = [];
  while (posisi.i < baris.length && baris[posisi.i].indent >= indent) {
    const b = baris[posisi.i];
    posisi.i++;
    const item = { teks: b.teks, anak: [] };
    if (b.teks.endsWith(":") && posisi.i < baris.length && baris[posisi.i].indent > b.indent) {
      item.anak = bacaBlok(baris, posisi, baris[posisi.i].indent);
    }
    hasil.push(item);
  }
  return hasil;
}

const MAKS_LANGKAH = 20000;

function jalankanBlok(blok, env, keluaran, hitung) {
  let kondisiSebelumnya = false;

  for (const item of blok) {
    if (++hitung.langkah > MAKS_LANGKAH)
      throw new Error("Program dihentikan: terlalu banyak langkah (mungkin perulangan tak berujung).");

    const t = item.teks;

    if (/^(def|class|import|from|try|with|lambda)\b/.test(t))
      throw new Error("Maaf, perintah '" + t.split(/[\s(]/)[0] + "' belum didukung playground sederhana ini.");

    if (t.startsWith("if ")) {
      kondisiSebelumnya = !!nilaiDari(potongKondisi(t, "if"), env);
      if (kondisiSebelumnya) jalankanBlok(item.anak, env, keluaran, hitung);
    } else if (t.startsWith("elif ")) {
      if (!kondisiSebelumnya) {
        kondisiSebelumnya = !!nilaiDari(potongKondisi(t, "elif"), env);
        if (kondisiSebelumnya) jalankanBlok(item.anak, env, keluaran, hitung);
      }
    } else if (t === "else:") {
      if (!kondisiSebelumnya) jalankanBlok(item.anak, env, keluaran, hitung);
      kondisiSebelumnya = true;
    } else if (t.startsWith("while ")) {
      let putaran = 0;
      while (nilaiDari(potongKondisi(t, "while"), env)) {
        jalankanBlok(item.anak, env, keluaran, hitung);
        if (++putaran > 5000 || ++hitung.langkah > MAKS_LANGKAH)
          throw new Error("Perulangan while berjalan terlalu lama. Cek lagi kondisi berhentinya.");
      }
    } else if (t.startsWith("for ")) {
      const cocok = t.match(/^for\s+([A-Za-z_]\w*)\s+in\s+(.+):$/);
      if (!cocok) throw new Error("Bentuk perulangan for belum dikenali: " + t);
      const daftar = nilaiDari(cocok[2], env);
      const isi = Array.isArray(daftar) ? daftar : typeof daftar === "string" ? daftar.split("") : objekKeDaftar(daftar);
      for (const nilai of isi) {
        env[cocok[1]] = nilai;
        jalankanBlok(item.anak, env, keluaran, hitung);
        if (++hitung.langkah > MAKS_LANGKAH) throw new Error("Perulangan terlalu panjang.");
      }
    } else if (t.startsWith("print(")) {
      cetak(t, env, keluaran);
    } else if (t.startsWith("del ")) {
      hapusData(t.slice(4).trim(), env);
    } else if (t === "break" || t === "continue" || t === "pass") {
      // Disederhanakan: perintah ini diabaikan oleh playground.
    } else {
      jalankanPenugasan(t, env);
    }
  }
}

function potongKondisi(teks, kata) {
  return teks.slice(kata.length, teks.length - 1).trim();
}

function objekKeDaftar(o) {
  if (o && typeof o === "object") return Object.keys(o);
  throw new Error("Data ini tidak bisa diulang dengan for.");
}

/* ---------- print ---------- */
function cetak(teks, env, keluaran) {
  const isi = teks.slice(6, teks.lastIndexOf(")"));
  if (isi.trim() === "") {
    keluaran.push("");
    return;
  }
  const bagian = pisahKoma(isi).map((p) => tampilkan(nilaiDari(p, env), false));
  keluaran.push(bagian.join(" "));
}

/* ---------- penugasan / pemanggilan method ---------- */
function jalankanPenugasan(teks, env) {
  // Penugasan ganda, contoh: a, b = b, a
  const posisiSama = cariTandaSama(teks);
  if (posisiSama === -1) {
    nilaiDari(teks, env); // misal: stack.append("A")
    return;
  }

  const kiri = teks.slice(0, posisiSama).trim();
  const kanan = teks.slice(posisiSama + 1).trim();

  const target = pisahKoma(kiri);
  const nilai = pisahKoma(kanan).map((v) => nilaiDari(v, env));

  target.forEach((t, i) => simpanKe(t.trim(), nilai[i], env));
}

/** Cari tanda "=" yang benar-benar penugasan (bukan ==, <=, >=, !=). */
function cariTandaSama(teks) {
  let kutip = null;
  let kurung = 0;
  for (let i = 0; i < teks.length; i++) {
    const c = teks[i];
    if (kutip) {
      if (c === kutip) kutip = null;
      continue;
    }
    if (c === '"' || c === "'") kutip = c;
    else if ("([{".includes(c)) kurung++;
    else if (")]}".includes(c)) kurung--;
    else if (c === "=" && kurung === 0) {
      const sebelum = teks[i - 1];
      const sesudah = teks[i + 1];
      if (sesudah === "=" || ["=", "!", "<", ">", "+", "-", "*", "/"].includes(sebelum)) {
        if (["+", "-", "*", "/"].includes(sebelum)) return i; // a += 1 ditangani di simpanKe
        i++;
        continue;
      }
      return i;
    }
  }
  return -1;
}

function simpanKe(target, nilai, env) {
  // Bentuk a += 1
  const tambah = target.match(/^(.+?)\s*([+\-*/])$/);
  if (tambah) {
    const nama = tambah[1].trim();
    const lama = nilaiDari(nama, env);
    const op = tambah[2];
    const baru =
      op === "+" ? lama + nilai : op === "-" ? lama - nilai : op === "*" ? lama * nilai : lama / nilai;
    return simpanKe(nama, baru, env);
  }

  // Bentuk data[index] = nilai
  const indeks = target.match(/^([A-Za-z_]\w*)\[(.+)\]$/);
  if (indeks) {
    const wadah = env[indeks[1]];
    if (wadah === undefined) throw new Error("Variabel '" + indeks[1] + "' belum dibuat.");
    let kunci = nilaiDari(indeks[2], env);
    if (Array.isArray(wadah) && kunci < 0) kunci += wadah.length;
    wadah[kunci] = nilai;
    return;
  }

  if (!/^[A-Za-z_]\w*$/.test(target)) throw new Error("Tidak bisa menyimpan ke '" + target + "'.");
  env[target] = nilai;
}

function hapusData(target, env) {
  const cocok = target.match(/^([A-Za-z_]\w*)\[(.+)\]$/);
  if (!cocok) {
    delete env[target];
    return;
  }
  const wadah = env[cocok[1]];
  const kunci = nilaiDari(cocok[2], env);
  if (Array.isArray(wadah)) wadah.splice(kunci < 0 ? wadah.length + kunci : kunci, 1);
  else delete wadah[kunci];
}

/* ---------- evaluasi ekspresi ---------- */
function nilaiDari(ekspresi, env) {
  const js = keJavaScript(ekspresi.trim());
  const nama = Object.keys(env);
  try {
    const fungsi = new Function(...nama, "__py", "return (" + js + ");");
    return fungsi(...nama.map((n) => env[n]), BANTUAN);
  } catch (e) {
    throw new Error("Tidak paham baris: " + ekspresi.trim());
  }
}

/** Menerjemahkan potongan Python sederhana menjadi JavaScript. */
function keJavaScript(src) {
  let s = src;

  // method: data.append(x) → __py.metode(data, "append", [x])
  s = s.replace(/\b([A-Za-z_]\w*)\.([A-Za-z_]\w*)\(([^()]*)\)/g,
    (_, obj, nama, arg) => `__py.metode(${obj}, "${nama}", [${arg}])`);

  // pembagian bulat //
  for (let i = 0; i < 3; i++) {
    s = s.replace(/([\w.]+\([^()]*\)|\([^()]*\)|[\w.[\]"']+)\s*\/\/\s*([\w.]+\([^()]*\)|\([^()]*\)|[\w.[\]"']+)/g,
      "__py.idiv($1,$2)");
  }

  // fungsi bawaan
  s = s.replace(/\b(len|str|int|float|abs|min|max|sum|sorted|range|round|type)\(/g, "__py.$1(");

  // index: data[0] atau kontak["nama"] → __py.idx(...)
  for (let i = 0; i < 3; i++) {
    s = s.replace(/\b([A-Za-z_]\w*)\[([^[\]]+)\]/g, "__py.idx($1,$2)");
  }

  // nilai & operator kata
  s = s.replace(/\bTrue\b/g, "true").replace(/\bFalse\b/g, "false").replace(/\bNone\b/g, "null");
  s = s.replace(/\bnot\s+/g, "!").replace(/\s+and\s+/g, " && ").replace(/\s+or\s+/g, " || ");
  s = s.replace(/\bis\s+not\b/g, "!==").replace(/\bis\b/g, "===");

  // "x in y"
  s = s.replace(/([^\s()]+)\s+in\s+([^\s()]+)/g, "__py.inside($1,$2)");

  return s;
}

/* ---------- fungsi bantu yang dipakai kode hasil terjemahan ---------- */
const BANTUAN = {
  len: (x) => (x == null ? 0 : Array.isArray(x) || typeof x === "string" ? x.length : Object.keys(x).length),
  str: (x) => tampilkan(x, false),
  int: (x) => Math.trunc(Number(x)),
  float: (x) => Number(x),
  abs: Math.abs,
  round: Math.round,
  min: (...a) => Math.min(...(Array.isArray(a[0]) ? a[0] : a)),
  max: (...a) => Math.max(...(Array.isArray(a[0]) ? a[0] : a)),
  sum: (a) => a.reduce((x, y) => x + y, 0),
  sorted: (a) => [...a].sort(bandingkan),
  type: (x) => (Array.isArray(x) ? "list" : typeof x === "string" ? "str" : typeof x === "number" ? "int" : "object"),
  idiv: (a, b) => Math.floor(a / b),
  idx: (obj, i) => {
    if (obj == null) throw new Error("Data kosong.");
    if (Array.isArray(obj) || typeof obj === "string") {
      const pos = i < 0 ? obj.length + i : i;
      if (pos < 0 || pos >= obj.length)
        throw new Error("Index " + i + " di luar jangkauan (isinya cuma " + obj.length + " data).");
      return obj[pos];
    }
    if (!(i in obj)) throw new Error("Key '" + i + "' tidak ada.");
    return obj[i];
  },
  inside: (x, wadah) => {
    if (Array.isArray(wadah) || typeof wadah === "string") return wadah.includes(x);
    return Object.prototype.hasOwnProperty.call(wadah || {}, x);
  },
  range: (a, b, c) => {
    const mulai = b === undefined ? 0 : a;
    const akhir = b === undefined ? a : b;
    const lompat = c === undefined ? 1 : c;
    const hasil = [];
    if (lompat > 0) for (let i = mulai; i < akhir; i += lompat) hasil.push(i);
    else for (let i = mulai; i > akhir; i += lompat) hasil.push(i);
    return hasil;
  },
  metode: (obj, nama, arg) => {
    if (obj == null) throw new Error("Variabel belum berisi apa-apa.");
    if (typeof obj === "string") {
      const teksMetode = { upper: () => obj.toUpperCase(), lower: () => obj.toLowerCase(), strip: () => obj.trim(), split: () => obj.split(arg[0] ?? " "), join: () => arg[0].join(obj) };
      if (teksMetode[nama]) return teksMetode[nama]();
    }
    if (Array.isArray(obj)) {
      switch (nama) {
        case "append": obj.push(arg[0]); return null;
        case "pop": {
          if (obj.length === 0) throw new Error("Tidak bisa pop: datanya sudah kosong.");
          if (arg.length === 0) return obj.pop();
          const pos = arg[0] < 0 ? obj.length + arg[0] : arg[0];
          return obj.splice(pos, 1)[0];
        }
        case "insert": obj.splice(arg[0], 0, arg[1]); return null;
        case "remove": {
          const p = obj.indexOf(arg[0]);
          if (p === -1) throw new Error("Data tidak ditemukan, jadi tidak bisa dihapus.");
          obj.splice(p, 1);
          return null;
        }
        case "sort": obj.sort(bandingkan); return null;
        case "reverse": obj.reverse(); return null;
        case "index": return obj.indexOf(arg[0]);
        case "count": return obj.filter((x) => x === arg[0]).length;
        case "clear": obj.length = 0; return null;
      }
    }
    if (typeof obj === "object") {
      switch (nama) {
        case "keys": return Object.keys(obj);
        case "values": return Object.values(obj);
        case "items": return Object.entries(obj);
        case "get": return obj[arg[0]] ?? arg[1] ?? null;
      }
    }
    throw new Error("Method '" + nama + "' belum didukung playground ini.");
  },
};

function bandingkan(a, b) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a) > String(b) ? 1 : -1;
}

/** Tampilkan nilai seperti gaya Python. */
function tampilkan(nilai, pakaiKutip = true) {
  if (nilai === null || nilai === undefined) return "None";
  if (typeof nilai === "boolean") return nilai ? "True" : "False";
  if (typeof nilai === "string") return pakaiKutip ? "'" + nilai + "'" : nilai;
  if (Array.isArray(nilai)) return "[" + nilai.map((x) => tampilkan(x, true)).join(", ") + "]";
  if (typeof nilai === "object")
    return "{" + Object.entries(nilai).map(([k, v]) => "'" + k + "': " + tampilkan(v, true)).join(", ") + "}";
  return String(nilai);
}

/** Memisah teks berdasarkan koma, tapi mengabaikan koma di dalam kurung/kutip. */
function pisahKoma(teks) {
  const hasil = [];
  let sekarang = "";
  let kutip = null;
  let kurung = 0;
  for (const c of teks) {
    if (kutip) {
      sekarang += c;
      if (c === kutip) kutip = null;
      continue;
    }
    if (c === '"' || c === "'") kutip = c;
    if ("([{".includes(c)) kurung++;
    if (")]}".includes(c)) kurung--;
    if (c === "," && kurung === 0) {
      hasil.push(sekarang.trim());
      sekarang = "";
    } else sekarang += c;
  }
  if (sekarang.trim() !== "") hasil.push(sekarang.trim());
  return hasil;
}
