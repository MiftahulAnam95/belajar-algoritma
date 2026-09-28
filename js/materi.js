/* =========================================================
   materi.js — halaman "Belajar".
   Isi halaman dibangun dari data di materi-data.js, lalu
   diubah menjadi HTML oleh fungsi gambarBlok().
   ========================================================= */

import { KURIKULUM, cariMateri, semuaMateri, tetanggaMateri } from "./materi-data.js";
import {
  $, $$, md, esc, sudahSelesai, togglSelesai, daftarSelesai,
  simpanTerakhir, ambilTerakhir, catatKuis,
} from "./util.js";
import { pasangPlayground, htmlPlayground } from "./playground.js";

/* ---------- RENDER HALAMAN ---------- */
export function renderMateri(root, param) {
  const semua = semuaMateri();
  const idAktif = param || ambilTerakhir() || semua[0].id;
  const materi = cariMateri(idAktif) || semua[0];
  simpanTerakhir(materi.id);

  root.innerHTML = `
    <div class="container">
      ${htmlProgress()}
    </div>
    <div class="container materi-layout">
      <aside class="sidebar" id="sidebar" aria-label="Daftar materi">
        ${htmlSidebar(materi.id)}
      </aside>
      <div>
        <button class="btn btn-ghost btn-sm sidebar-drawer-btn" id="buka-daftar" type="button"
                aria-controls="sidebar">☰ Daftar materi</button>
        <article class="lesson" id="isi-materi">${htmlMateri(materi)}</article>
      </div>
    </div>`;

  pasangInteraksi(root, materi);
}

/* ---------- BAGIAN PROGRESS ---------- */
function htmlProgress() {
  const total = semuaMateri().length;
  const selesai = daftarSelesai().length;
  const persen = total === 0 ? 0 : Math.round((selesai / total) * 100);
  return `
    <section class="card" style="margin-top:1.5rem" aria-label="Progress belajar">
      <div style="display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap;align-items:center">
        <div>
          <strong>Progress belajar kamu</strong>
          <p class="muted" style="margin:0;font-size:0.9rem">
            ${selesai} dari ${total} materi selesai — tersimpan otomatis di browser ini.
          </p>
        </div>
        <span class="badge ${persen === 100 ? "badge-green" : ""}">${persen}%</span>
      </div>
      <div class="progress-bar" style="margin-top:0.8rem">
        <div class="progress-fill" style="width:${persen}%"></div>
      </div>
    </section>`;
}

/* ---------- SIDEBAR ---------- */
function htmlSidebar(idAktif) {
  return `
    <h2>Daftar materi</h2>
    ${KURIKULUM.map(
      (level) => `
      <div class="sidebar-level">
        <p>${level.emoji} ${esc(level.nama)}</p>
        <ul>
          ${level.materi
            .map(
              (m) => `<li><a href="#/materi/${m.id}" class="${m.id === idAktif ? "active" : ""}">
                <span>${m.emoji} ${esc(m.judul)}</span>
                <span class="tick" data-tick="${m.id}">${sudahSelesai(m.id) ? "✓" : ""}</span>
              </a></li>`
            )
            .join("")}
        </ul>
      </div>`
    ).join("")}`;
}

/* ---------- SATU HALAMAN MATERI ---------- */
function htmlMateri(m) {
  const { sebelum, sesudah, nomor, total } = tetanggaMateri(m.id);
  const adaKode = m.blocks.some((b) => b.t === "code" || b.t === "bedah");

  return `
    <header class="lesson-head">
      <span class="eyebrow">${esc(m.level)} · Materi ${nomor} dari ${total}</span>
      <h1>${m.emoji} ${esc(m.judul)}</h1>
      <p class="muted" style="margin:0">${esc(m.ringkas)}</p>
    </header>

    ${m.blocks.map(gambarBlok).join("")}

    ${adaKode ? htmlPlayground(contohUntukPlayground(m)) : ""}

    <div class="card" style="margin-top:2rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap;justify-content:space-between">
      <div>
        <strong>Sudah paham materi ini?</strong>
        <p class="muted" style="margin:0;font-size:0.9rem">Tandai selesai supaya progresmu tercatat.</p>
      </div>
      <button class="btn ${sudahSelesai(m.id) ? "btn-ghost" : ""}" id="tandai" type="button" data-id="${m.id}">
        ${sudahSelesai(m.id) ? "✓ Sudah selesai (klik untuk batal)" : "Tandai selesai"}
      </button>
    </div>

    <nav class="lesson-nav" aria-label="Navigasi materi">
      ${sebelum ? `<a class="btn btn-ghost" href="#/materi/${sebelum.id}">← ${esc(sebelum.judul)}</a>` : "<span></span>"}
      ${sesudah ? `<a class="btn" href="#/materi/${sesudah.id}">${esc(sesudah.judul)} →</a>` : `<a class="btn" href="#/latihan">Lanjut ke latihan →</a>`}
    </nav>`;
}

/**
 * Ambil contoh kode untuk isi awal playground.
 * Contoh yang memakai class/def dilewati karena playground sederhana
 * ini belum mendukungnya — supaya pengguna tidak langsung kena error.
 */
function contohUntukPlayground(m) {
  const bisa = m.blocks.filter(
    (b) => b.t === "code" && !/\b(class|def|import)\b/.test(b.v)
  );
  if (bisa.length) return bisa[0].v;

  return `# Contoh kode di materi ini memakai fungsi (def) atau class,
# yang belum didukung playground sederhana ini.
# Tapi kamu tetap bisa berlatih di sini:

data = [5, 2, 9]
data.append(7)
data.sort()

print(data)
print("Jumlah data:", len(data))`;
}

/* ---------- MENGUBAH 1 BLOK MENJADI HTML ---------- */
function gambarBlok(b) {
  switch (b.t) {
    case "h":
      return `<h2>${md(b.v)}</h2>`;

    case "p":
      return `<p>${md(b.v)}</p>`;

    case "list":
      return `<ul>${b.v.map((x) => `<li>${md(x)}</li>`).join("")}</ul>`;

    case "steps":
      return `<ol class="step-list">${b.v.map((x) => `<li>${md(x)}</li>`).join("")}</ol>`;

    case "ascii":
      return `<div class="ascii" role="img" aria-label="Ilustrasi teks">${esc(b.v)}</div>`;

    case "analogi":
      return callout("callout-analogi", b.judul, b.v);

    case "note":
      return callout("", b.judul, b.v);

    case "ok":
      return callout("callout-ok", b.judul, b.v);

    case "warn":
      return callout("callout-warn", b.judul || "⚠️ Kesalahan umum pemula", b.v);

    case "ringkas":
      return callout("callout-ok", "📌 Ringkasan", b.v);

    case "code":
      return `<pre><code>${esc(b.v)}</code></pre>`;

    case "bedah":
      return htmlBedah(b);

    case "tabel":
      return `<table>
          <thead><tr>${b.head.map((h) => `<th>${md(h)}</th>`).join("")}</tr></thead>
          <tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${md(c)}</td>`).join("")}</tr>`).join("")}</tbody>
        </table>`;

    case "viz":
      return `<div class="callout">
          <h4>🎬 Lihat sendiri caranya bekerja</h4>
          <p>${md(b.v)}</p>
          <a class="btn btn-sm" href="#/visualisasi/${b.target}">${esc(b.label)}</a>
        </div>`;

    case "kuis":
      return htmlKuis(b);

    default:
      return "";
  }
}

function callout(kelas, judul, isi) {
  const daftar = Array.isArray(isi) ? isi : [isi];
  const badan =
    daftar.length > 1
      ? `<ul>${daftar.map((x) => `<li>${md(x)}</li>`).join("")}</ul>`
      : `<p>${md(daftar[0])}</p>`;
  return `<div class="callout ${kelas}">
      ${judul ? `<h4>${md(judul)}</h4>` : ""}
      ${badan}
    </div>`;
}

/* ---------- BEDAH KODE ---------- */
function htmlBedah(b) {
  const isi = b.potongan
    .map((p) =>
      typeof p === "string"
        ? esc(p)
        : `<button type="button" class="bedah-token" data-jelas="${esc(p.jelas)}">${esc(p.teks)}</button>`
    )
    .join("");

  return `<div class="bedah">
      <div class="bedah-head">
        <span>${esc(b.judul || "🔍 Bedah kode")}</span>
        <span>klik bagian bergaris ↓</span>
      </div>
      <pre><code>${isi}</code></pre>
      <p class="bedah-ket">Arahkan kursor (atau klik) pada bagian kode yang bergaris putus-putus untuk melihat artinya.</p>
    </div>`;
}

/* ---------- KUIS DI DALAM MATERI ---------- */
function htmlKuis(b) {
  return `<div class="quiz" data-kuis="${esc(b.id)}">
      <p class="quiz-q">✏️ Latihan: ${md(b.q)}</p>
      <div class="quiz-opsi">
        ${b.opsi
          .map(
            (o, i) =>
              `<button class="opsi" type="button" data-index="${i}" data-benar="${b.jawab}">
                 <span class="huruf">${String.fromCharCode(65 + i)}</span><span>${md(o)}</span>
               </button>`
          )
          .join("")}
      </div>
      <p class="quiz-jawab hidden" data-jelas="${esc(b.jelas)}"></p>
    </div>`;
}

/* ---------- INTERAKSI (dipasang setelah HTML jadi) ---------- */
function pasangInteraksi(root, materi) {
  // 1. Bedah kode
  $$(".bedah", root).forEach((box) => {
    const ket = $(".bedah-ket", box);
    const bawaan = ket.textContent;
    $$(".bedah-token", box).forEach((tok) => {
      const tampil = () => {
        $$(".bedah-token", box).forEach((t) => t.classList.remove("aktif"));
        tok.classList.add("aktif");
        ket.innerHTML = `<b>${esc(tok.textContent)}</b> → ${esc(tok.dataset.jelas)}`;
      };
      tok.addEventListener("mouseenter", tampil);
      tok.addEventListener("focus", tampil);
      tok.addEventListener("click", tampil);
    });
    box.addEventListener("mouseleave", () => {
      $$(".bedah-token", box).forEach((t) => t.classList.remove("aktif"));
      ket.textContent = bawaan;
    });
  });

  // 2. Kuis
  $$(".quiz", root).forEach((quiz) => pasangKuis(quiz));

  // 3. Tombol "Tandai selesai"
  const tombol = $("#tandai", root);
  if (tombol) {
    tombol.addEventListener("click", () => {
      const kini = togglSelesai(tombol.dataset.id);
      tombol.textContent = kini ? "✓ Sudah selesai (klik untuk batal)" : "Tandai selesai";
      tombol.classList.toggle("btn-ghost", kini);
      const tick = $(`[data-tick="${tombol.dataset.id}"]`, root);
      if (tick) tick.textContent = kini ? "✓" : "";
      perbaruiProgress(root);
    });
  }

  // 4. Drawer sidebar untuk layar kecil
  const buka = $("#buka-daftar", root);
  const sidebar = $("#sidebar", root);
  if (buka && sidebar) {
    buka.addEventListener("click", () => {
      sidebar.classList.add("buka");
      const lapisan = document.createElement("div");
      lapisan.className = "overlay";
      lapisan.addEventListener("click", () => {
        sidebar.classList.remove("buka");
        lapisan.remove();
      });
      document.body.appendChild(lapisan);
    });
    $$("a", sidebar).forEach((a) =>
      a.addEventListener("click", () => {
        sidebar.classList.remove("buka");
        const lapisan = $(".overlay");
        if (lapisan) lapisan.remove();
      })
    );
  }

  // 5. Playground Python sederhana
  pasangPlayground(root);
}

/** Dipakai juga oleh halaman Latihan. */
export function pasangKuis(quiz) {
  const jawaban = $(".quiz-jawab", quiz);
  $$(".opsi", quiz).forEach((opsi) => {
    opsi.addEventListener("click", () => {
      const benarIdx = Number(opsi.dataset.benar);
      const pilih = Number(opsi.dataset.index);
      const benar = pilih === benarIdx;

      $$(".opsi", quiz).forEach((o, i) => {
        o.disabled = true;
        if (i === benarIdx) o.classList.add("benar");
        if (i === pilih && !benar) o.classList.add("salah");
      });

      jawaban.classList.remove("hidden");
      jawaban.classList.add(benar ? "ok" : "no");
      jawaban.innerHTML =
        (benar ? "✅ <strong>Benar!</strong> " : "❌ <strong>Belum tepat.</strong> ") +
        esc(jawaban.dataset.jelas);

      catatKuis(quiz.dataset.kuis, benar);
    });
  });
}

function perbaruiProgress(root) {
  const total = semuaMateri().length;
  const selesai = daftarSelesai().length;
  const persen = Math.round((selesai / total) * 100);
  const isi = $(".progress-fill", root);
  const badge = $(".badge", root);
  if (isi) isi.style.width = persen + "%";
  if (badge) {
    badge.textContent = persen + "%";
    badge.classList.toggle("badge-green", persen === 100);
  }
  const teks = $(".card p.muted", root);
  if (teks) teks.textContent = `${selesai} dari ${total} materi selesai — tersimpan otomatis di browser ini.`;
}
