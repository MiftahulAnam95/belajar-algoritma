/* =========================================================
   materi-data.js — menggabungkan semua level jadi satu kurikulum
   dan menyediakan fungsi bantu untuk mencari materi.
   ========================================================= */

import { LEVEL_0, LEVEL_1, LEVEL_2 } from "./data-dasar.js";
import { LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6, LEVEL_7, LEVEL_8, LEVEL_9 } from "./data-struktur.js";
import { LEVEL_10, LEVEL_11, LEVEL_12 } from "./data-algoritma.js";

export const KURIKULUM = [
  LEVEL_0,
  LEVEL_1,
  LEVEL_2,
  LEVEL_3,
  LEVEL_4,
  LEVEL_5,
  LEVEL_6,
  LEVEL_7,
  LEVEL_8,
  LEVEL_9,
  LEVEL_10,
  LEVEL_11,
  LEVEL_12,
];

/** Semua materi dijadikan satu daftar lurus (untuk tombol sebelumnya/berikutnya). */
export function semuaMateri() {
  const hasil = [];
  KURIKULUM.forEach((level) => {
    level.materi.forEach((m) => hasil.push({ ...m, level: level.nama, levelId: level.id }));
  });
  return hasil;
}

/** Cari satu materi berdasarkan id-nya. */
export function cariMateri(id) {
  return semuaMateri().find((m) => m.id === id) || null;
}

/** Materi sebelum & sesudah, dipakai tombol navigasi di bawah halaman. */
export function tetanggaMateri(id) {
  const daftar = semuaMateri();
  const posisi = daftar.findIndex((m) => m.id === id);
  return {
    sebelum: posisi > 0 ? daftar[posisi - 1] : null,
    sesudah: posisi >= 0 && posisi < daftar.length - 1 ? daftar[posisi + 1] : null,
    nomor: posisi + 1,
    total: daftar.length,
  };
}

/** Semua soal kuis yang tersebar di materi (dipakai halaman Latihan). */
export function kuisDariMateri() {
  const soal = [];
  semuaMateri().forEach((m) => {
    m.blocks.forEach((b) => {
      if (b.t === "kuis") soal.push({ ...b, materi: m.judul, materiId: m.id });
    });
  });
  return soal;
}
