/* =========================================================
   script.js — "otak" utama website.
   Tugasnya tiga:
   1. Menggambar navbar & footer (supaya sama di semua halaman).
   2. Mengatur mode gelap / terang.
   3. Router sederhana: melihat alamat #/... lalu menampilkan halaman.
   ========================================================= */

import { $, ambilData, simpanData } from "./util.js";
import { renderBeranda, renderKamus, renderTentang, renderBingung } from "./halaman.js";
import { renderMateri } from "./materi.js";
import { renderVisualisasi } from "./visualisasi.js";
import { renderLatihan } from "./latihan.js";

/* ---------- DAFTAR HALAMAN ---------- */
const MENU = [
  { path: "/", label: "Beranda", judul: "Algoritma & Struktur Data dari Nol" },
  { path: "/materi", label: "Belajar", judul: "Belajar — Algoritma & Struktur Data dari Nol" },
  { path: "/visualisasi", label: "Visualisasi", judul: "Visualisasi Interaktif — AlgoDariNol" },
  { path: "/latihan", label: "Latihan", judul: "Latihan & Mini Project — AlgoDariNol" },
  { path: "/kamus", label: "Kamus", judul: "Kamus Istilah — AlgoDariNol" },
  { path: "/tentang", label: "Tentang", judul: "Tentang — AlgoDariNol" },
];

/* ---------- 1. NAVBAR ---------- */
function gambarNavbar() {
  const header = $("#site-header");
  header.innerHTML = `
    <div class="container nav">
      <a class="brand" href="#/" aria-label="AlgoDariNol, kembali ke beranda">
        <span aria-hidden="true">🧠</span> AlgoDariNol
      </a>

      <nav aria-label="Menu utama">
        <ul class="nav-links" id="nav-links">
          ${MENU.map(
            (m) => `<li><a href="#${m.path}" data-path="${m.path}">${m.label}</a></li>`
          ).join("")}
        </ul>
      </nav>

      <div class="nav-actions">
        <a class="btn btn-sm nav-cta" href="#/materi">Mulai Belajar</a>
        <button class="icon-btn" id="tombol-tema" type="button"
                aria-label="Ganti mode gelap atau terang">🌙</button>
        <button class="icon-btn nav-toggle" id="tombol-menu" type="button"
                aria-label="Buka menu" aria-expanded="false" aria-controls="nav-links">☰</button>
      </div>
    </div>`;

  // Tombol hamburger untuk layar kecil
  const tombolMenu = $("#tombol-menu");
  const daftarLink = $("#nav-links");
  tombolMenu.addEventListener("click", () => {
    const terbuka = daftarLink.classList.toggle("buka");
    tombolMenu.setAttribute("aria-expanded", String(terbuka));
    tombolMenu.textContent = terbuka ? "✕" : "☰";
  });
  daftarLink.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      daftarLink.classList.remove("buka");
      tombolMenu.setAttribute("aria-expanded", "false");
      tombolMenu.textContent = "☰";
    }
  });

  $("#tombol-tema").addEventListener("click", gantiTema);
  perbaruiTombolTema();
}

/* ---------- 2. MODE GELAP / TERANG ---------- */
function temaSekarang() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function gantiTema() {
  const baru = temaSekarang() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", baru);
  simpanData("tema", baru);
  perbaruiTombolTema();
}

function perbaruiTombolTema() {
  const tombol = $("#tombol-tema");
  if (!tombol) return;
  const gelap = temaSekarang() === "dark";
  tombol.textContent = gelap ? "☀️" : "🌙";
  tombol.setAttribute(
    "aria-label",
    gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap"
  );
}

// Tema disimpan pakai key "tema" (lihat juga script kecil di index.html).
if (ambilData("tema", null) === null && window.matchMedia) {
  const sukaGelap = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (sukaGelap) document.documentElement.setAttribute("data-theme", "dark");
}

/* ---------- 3. FOOTER ---------- */
function gambarFooter() {
  $("#site-footer").innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div>
          <p style="font-weight:700;color:var(--text)">🧠 AlgoDariNol</p>
          <p>Belajar algoritma & struktur data dari nol: bahasa sederhana,
             analogi sehari-hari, visualisasi, dan latihan.
             Gratis, tanpa login, jalan di browser apa pun.</p>
        </div>
        <div>
          <h4>Belajar</h4>
          <ul>
            <li><a href="#/materi">Semua materi</a></li>
            <li><a href="#/visualisasi">Visualisasi</a></li>
            <li><a href="#/latihan">Latihan & mini project</a></li>
          </ul>
        </div>
        <div>
          <h4>Bantuan</h4>
          <ul>
            <li><a href="#/kamus">Kamus istilah</a></li>
            <li><a href="#/bingung">😵 Aku bingung</a></li>
            <li><a href="#/tentang">Tentang website</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        Dibuat untuk pemula yang benar-benar mulai dari nol.
        Semua progres belajar disimpan di browser kamu sendiri (localStorage).
      </div>
    </div>`;
}

/* ---------- 4. ROUTER SEDERHANA ---------- */
const HALAMAN = {
  "/": renderBeranda,
  "/materi": renderMateri,
  "/visualisasi": renderVisualisasi,
  "/latihan": renderLatihan,
  "/kamus": renderKamus,
  "/tentang": renderTentang,
  "/bingung": renderBingung,
};

/**
 * Alamat ditulis seperti "#/materi/apa-itu-algoritma".
 * Bagian pertama = nama halaman, bagian kedua = parameter (opsional).
 */
function bacaAlamat() {
  const mentah = location.hash.replace(/^#/, "") || "/";
  const bagian = mentah.split("/").filter(Boolean); // ["materi", "apa-itu-algoritma"]
  const path = bagian.length ? "/" + bagian[0] : "/";
  return { path, param: bagian[1] || null };
}

function tampilkanHalaman() {
  const { path, param } = bacaAlamat();
  const render = HALAMAN[path] || HALAMAN["/"];
  const konten = $("#konten");

  konten.innerHTML = "";
  render(konten, param);

  // Judul tab browser (bagus untuk SEO & aksesibilitas)
  const menu = MENU.find((m) => m.path === path);
  document.title = menu ? menu.judul : "Algoritma & Struktur Data dari Nol";

  // Tandai menu yang sedang aktif
  document.querySelectorAll(".nav-links a").forEach((a) => {
    if (a.dataset.path === path) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });

  // Fokus ke konten supaya pengguna keyboard/screen reader tahu halaman berganti
  konten.focus({ preventScroll: true });
  if (!location.hash.includes("#materi-isi")) window.scrollTo({ top: 0 });
}

/* ---------- 5. JALANKAN ---------- */
function tampilkanKesalahan(error) {
  console.error("AlgoDariNol gagal dimuat:", error);

  const konten = document.querySelector("#konten");
  if (!konten) return;

  konten.innerHTML = `
    <section class="container section">
      <div class="callout callout-warn">
        <h1>Website belum berhasil dimuat</h1>
        <p>Ada file yang tidak ditemukan atau gagal dibaca oleh browser.</p>
        <p>Pastikan seluruh folder <code>js</code>, <code>css</code>, dan
           <code>assets</code> ikut di-upload bersama <code>index.html</code>.</p>
        <button class="btn" type="button" onclick="location.reload()">Muat ulang</button>
      </div>
    </section>`;
}

function mulaiAplikasi() {
  try {
    gambarNavbar();
    gambarFooter();
    window.addEventListener("hashchange", tampilkanHalaman);
    tampilkanHalaman();
    window.__ALGODARINOL_SIAP = true;
  } catch (error) {
    // Tandai siap karena kita sudah mengganti layar putih dengan pesan error.
    window.__ALGODARINOL_SIAP = true;
    tampilkanKesalahan(error);
  }
}

mulaiAplikasi();
