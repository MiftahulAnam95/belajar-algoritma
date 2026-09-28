/* =========================================================
   util.js — fungsi kecil yang dipakai di banyak halaman.
   Semua ditulis dengan JavaScript biasa (vanilla), tanpa library.
   ========================================================= */

/** Awalan key localStorage supaya tidak bentrok dengan website lain. */
const PREFIX = "algodarinol:";

/** Simpan data apa pun ke localStorage (otomatis diubah jadi teks JSON). */
export function simpanData(key, nilai) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(nilai));
  } catch (e) {
    /* Kalau localStorage diblokir browser, website tetap jalan. */
  }
}

/** Ambil data dari localStorage. Kalau belum ada, pakai nilai cadangan. */
export function ambilData(key, cadangan) {
  try {
    const teks = localStorage.getItem(PREFIX + key);
    return teks === null ? cadangan : JSON.parse(teks);
  } catch (e) {
    return cadangan;
  }
}

/* ---------- PROGRESS BELAJAR ---------- */

/** Daftar id materi yang sudah ditandai selesai. */
export function daftarSelesai() {
  const data = ambilData("selesai", []);
  return Array.isArray(data) ? data : [];
}

export function sudahSelesai(id) {
  return daftarSelesai().includes(id);
}

/** Tandai / batalkan materi selesai. Mengembalikan status terbaru. */
export function togglSelesai(id) {
  const daftar = daftarSelesai();
  const posisi = daftar.indexOf(id);
  if (posisi === -1) daftar.push(id);
  else daftar.splice(posisi, 1);
  simpanData("selesai", daftar);
  return daftar.includes(id);
}

/** Simpan materi terakhir yang dibuka supaya bisa dilanjutkan nanti. */
export function simpanTerakhir(id) {
  simpanData("terakhir", id);
}
export function ambilTerakhir() {
  return ambilData("terakhir", null);
}

/** Catat skor kuis: { idSoal: true/false } */
export function catatKuis(idSoal, benar) {
  const data = ambilData("kuis", {});
  data[idSoal] = benar;
  simpanData("kuis", data);
}
export function ambilKuis() {
  return ambilData("kuis", {});
}

/** Hapus semua progress (dipakai tombol "Reset progress"). */
export function resetSemua() {
  ["selesai", "kuis", "terakhir"].forEach((k) => {
    try {
      localStorage.removeItem(PREFIX + k);
    } catch (e) {}
  });
}

/* ---------- TEKS & HTML ---------- */

/** Ubah karakter berbahaya jadi aman untuk dimasukkan ke HTML. */
export function esc(teks) {
  return String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Mini-markdown: **tebal** dan `kode`.
 * Dipakai supaya penulisan materi tetap enak dibaca di file data.
 */
export function md(teks) {
  return esc(teks)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+?)`/g, "<code>$1</code>");
}

/** Bikin elemen dari string HTML (mengembalikan elemen pertama). */
export function buat(htmlString) {
  const wadah = document.createElement("div");
  wadah.innerHTML = htmlString.trim();
  return wadah.firstElementChild;
}

/** Pintasan querySelector. */
export const $ = (sel, induk = document) => induk.querySelector(sel);
export const $$ = (sel, induk = document) =>
  Array.from(induk.querySelectorAll(sel));

/** Angka acak bulat antara min dan max (inklusif). */
export function acak(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Jeda (untuk animasi bertahap). */
export function tunggu(ms) {
  return new Promise((selesai) => setTimeout(selesai, ms));
}
