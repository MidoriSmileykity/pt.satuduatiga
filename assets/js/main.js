/* =========================================================
   main.js - Skrip bersama semua halaman
   1.Konfigurasi kontak 2.Menu mobile 3.Animasi scroll
   4.Carousel project 5.Form kontak (WhatsApp / Email)
   ========================================================= */

/* 1. KONFIGURASI - GANTI dengan data perusahaan yang asli */
const CONFIG = {
  whatsapp: "6289654082548",        // format internasional, tanpa +, spasi, atau 0 di depan
  email: "satudua3@rocketmail.com",
};

/* 2. MENU MOBILE: buka/tutup saat tombol ☰ ditekan */
const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
}

/* 3. ANIMASI SCROLL: elemen .reveal muncul saat terlihat di layar */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); observer.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* 4. CAROUSEL: tombol panah menggeser satu kartu */
document.querySelectorAll(".carousel").forEach((carousel) => {
  const track = carousel.querySelector(".track");
  const step = () => track.querySelector(".project").offsetWidth + 22; // lebar kartu + jarak
  carousel.querySelector(".prev").addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
  carousel.querySelector(".next").addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
});

/* 5. FORM KONTAK: isi form -> pesan siap kirim lewat WhatsApp atau Email */
const form = document.getElementById("contact-form");
if (form) {
  form.querySelectorAll("[data-channel]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!form.reportValidity()) return;                 // cek kolom wajib
      const d = Object.fromEntries(new FormData(form));
      const text = `Halo PT Satu Dua Tiga Sayang Semuanya,\n\nNama: ${d.nama}\nEmail: ${d.email}\nTelepon: ${d.telepon || "-"}\n\n${d.pesan}`;
      if (btn.dataset.channel === "wa") {
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
      } else {
        window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent("Permintaan Konsultasi - " + d.nama)}&body=${encodeURIComponent(text)}`;
      }
    });
  });
}

/* Tahun otomatis di footer */
document.querySelectorAll(".year").forEach((el) => (el.textContent = new Date().getFullYear()));
