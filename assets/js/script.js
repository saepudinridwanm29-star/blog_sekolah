document.addEventListener("DOMContentLoaded", function () {

    // hero images
    const heroSlides = [
        "gedung_nuris.jpg",
        "gedung_sekolah.jpg",
        "perkemahan.jpg"
    ];

    const heroBackground = document.getElementById("heroBackground");
    const indicators = document.querySelectorAll(".indicator");

    let currentSlide = 0;
    let slideInterval;

    // Menampilkan gambar
    function showSlide(index) {

        if (!heroBackground) return;

        currentSlide = index;

        // Efek transisi
        heroBackground.style.opacity = "0";

        setTimeout(function () {

            heroBackground.style.backgroundImage =
                `url("${heroSlides[currentSlide]}")`;

            heroBackground.style.opacity = "1";

        }, 350);

        // Memperbarui indikator
        indicators.forEach(function (dot, i) {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }

    // Pindah ke gambar selanjutnya
    function nextSlide() {

        const nextIndex =
            (currentSlide + 1) % heroSlides.length;

        showSlide(nextIndex);

    }

    // Slider otomatis
    function startAutoSlide() {

        clearInterval(slideInterval);

        slideInterval = setInterval(function () {

            nextSlide();

        }, 5000);

    }

    // Klik indikator
    indicators.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index = Number(this.dataset.slide);

            if (index < 0 || index >= heroSlides.length) return;

            showSlide(index);
            startAutoSlide();

        });

    });

    // Menampilkan gambar pertama
    if (heroBackground) {

        showSlide(0);
        startAutoSlide();

    }

    // search berita
    const searchForm = document.getElementById("headerSearch");
    const searchInput = document.getElementById("searchInput");

    const newsCards = document.querySelectorAll("[data-news-card]");

    const emptyMessage = document.getElementById("searchEmpty");

    // Fungsi pencarian berita
    function searchNews(keyword) {

        let totalFound = 0;

        const searchKeyword = keyword
            .toLowerCase()
            .trim();

        newsCards.forEach(function (card) {

            // Mengambil seluruh isi berita
            const content = card.textContent.toLowerCase();

            // Memeriksa kecocokan kata
            const isMatch = content.includes(searchKeyword);

            // Menampilkan atau menyembunyikan berita
            card.style.display = isMatch ? "" : "none";

            if (isMatch) {
                totalFound++;
            }

        });

        // Menampilkan pesan jika tidak ditemukan
        if (emptyMessage) {

            emptyMessage.hidden = totalFound !== 0;

        }

    }

    // Pencarian langsung ketika mengetik
    if (searchInput) {

        searchInput.addEventListener("input", function () {

            searchNews(this.value);

        });

    }

    // Mencegah halaman reload ketika tombol search diklik
    if (searchForm) {

        searchForm.addEventListener("submit", function (event) {

            event.preventDefault();

            searchNews(searchInput.value);

        });

    }

});

// Data materi ditampilkan pada halaman detail berdasarkan ID di URL.
document.addEventListener("DOMContentLoaded", () => {
  const detailTitle = document.getElementById("tutorialDetailTitle");
  const detailCategory = document.getElementById("tutorialDetailCategory");
  const detailReadTime = document.getElementById("tutorialDetailReadTime");
  const detailImage = document.getElementById("tutorialDetailImage");
  const detailIntro = document.getElementById("tutorialDetailIntro");
  const detailSteps = document.getElementById("tutorialDetailSteps");

  if (
    !detailTitle ||
    !detailCategory ||
    !detailReadTime ||
    !detailImage ||
    !detailIntro ||
    !detailSteps
  ) {
    return;
  }

  const tutorials = {
    "dasar-php-native": {
      title: "Membuat Sistem CRUD Sederhana Menggunakan Native PHP & MySQL",
      category: "PPLG / IT",
      readTime: "10 menit",
      image: "assets/images/jurusan/pplg.jpg",
      intro: "CRUD adalah proses Create, Read, Update, dan Delete untuk mengelola data. Contoh berikut menggunakan tabel siswa dan koneksi database MySQL.",
      steps: [
        "Buat database, misalnya sekolah, lalu buat tabel siswa dengan kolom id, nama, dan kelas.",
        "Simpan konfigurasi koneksi MySQL pada satu file PHP dan gunakan mysqli dengan prepared statement.",
        "Buat halaman daftar siswa untuk membaca data dari database dan tampilkan dengan escaping output.",
        "Tambahkan form untuk membuat dan mengubah data. Validasi input, lalu jalankan query prepared statement.",
        "Tambahkan aksi hapus dengan konfirmasi sebelum mengirim permintaan, lalu uji seluruh operasi menggunakan data latihan."
      ]
    },
    "konfigurasi-mikrotik-hotspot": {
      title: "Konfigurasi Hotspot Gateway Mikrotik dan User Manager untuk Lab Sekolah",
      category: "Jaringan (TJKT)",
      readTime: "15 menit",
      image: "assets/images/jurusan/tjkt.jpg",
      intro: "Panduan ini merangkum urutan konfigurasi dasar hotspot untuk jaringan laboratorium. Sesuaikan alamat IP dan kebijakan akses dengan rancangan jaringan sekolah.",
      steps: [
        "Buat cadangan konfigurasi router dan catat topologi serta rentang alamat IP yang akan digunakan.",
        "Atur alamat IP pada interface jaringan lokal dan siapkan DHCP server sesuai rentang yang telah direncanakan.",
        "Jalankan wizard Hotspot Setup pada interface lokal, lalu periksa DNS dan halaman login.",
        "Buat akun uji dengan batas akses yang sesuai. Terapkan pembagian bandwidth secara bertahap.",
        "Uji login dari perangkat klien, verifikasi akses jaringan, lalu tinjau kembali aturan firewall dan keamanan akun."
      ]
    },
    "vektor-logo-illustrator": {
      title: "Teknik Tracing dan Pembuatan Logo Vektor Presisi di Adobe Illustrator",
      category: "Desain (DKV)",
      readTime: "12 menit",
      image: "assets/images/jurusan/dkv.jpg",
      intro: "Tracing membantu mengubah sketsa atau referensi menjadi bentuk vektor yang rapi dan mudah digunakan pada berbagai ukuran.",
      steps: [
        "Siapkan sketsa dengan kontras yang jelas, tempatkan pada artboard, lalu kunci layer referensi.",
        "Gunakan Pen Tool untuk membentuk siluet utama. Buat titik seperlunya agar kurva tetap halus.",
        "Rapikan sudut dan kurva menggunakan Direct Selection, kemudian gabungkan atau potong bentuk dengan Pathfinder.",
        "Terapkan palet warna yang konsisten dan periksa keterbacaan logo dalam versi satu warna.",
        "Simpan file kerja AI dan ekspor versi SVG untuk penggunaan digital serta PDF untuk kebutuhan cetak."
      ]
    },
    "panduan-cbt-siswa": {
      title: "Panduan Penggunaan Aplikasi Ujian Berbasis Komputer (CBT) Siswa",
      category: "Panduan Sekolah",
      readTime: "5 menit",
      image: "assets/images/jurusan/mplb.jpg",
      intro: "Gunakan panduan ini untuk mengikuti ujian CBT dengan tertib. Ikuti juga arahan pengawas dan informasi jadwal resmi dari sekolah.",
      steps: [
        "Pastikan perangkat dan koneksi internet siap, lalu buka alamat aplikasi CBT yang diberikan sekolah.",
        "Masuk menggunakan akun ujian pribadi dan periksa nama serta mata pelajaran sebelum memulai.",
        "Baca instruksi ujian, kerjakan soal dengan cermat, dan gunakan fitur penanda bila tersedia.",
        "Periksa kembali jawaban sebelum memilih tombol selesai atau kirim.",
        "Jika terjadi kendala, jangan membagikan kata sandi; segera laporkan kepada pengawas."
      ]
    },
    "responsive-tailwind-css": {
      title: "Membangun Responsive Layout Web Modern dengan Tailwind CSS",
      category: "PPLG / IT",
      readTime: "8 menit",
      image: "assets/images/jurusan/pplg.jpg",
      intro: "Tailwind CSS menyediakan utility class untuk menyusun tampilan secara langsung di markup. Mulailah dari layar kecil dan tambahkan breakpoint saat layout membutuhkannya.",
      steps: [
        "Siapkan proyek Tailwind mengikuti panduan versi yang digunakan dan pastikan file sumber masuk dalam konfigurasi pemindaian.",
        "Susun kerangka halaman dengan utility spacing, warna, tipografi, dan lebar konten yang konsisten.",
        "Gunakan Flexbox atau Grid untuk layout; terapkan prefix breakpoint seperti md: atau lg: hanya saat diperlukan.",
        "Atur gambar agar responsif dengan lebar penuh dan object-fit yang sesuai.",
        "Uji halaman pada beberapa lebar layar dan perbaiki overflow, keterbacaan, serta navigasi keyboard."
      ]
    },
    "crimping-kabel-lan": {
      title: "Panduan Praktik Crimping Kabel UTP Straight dan Cross T568B",
      category: "Jaringan (TJKT)",
      readTime: "7 menit",
      image: "assets/images/jurusan/tjkt.jpg",
      intro: "Crimping memerlukan susunan warna yang konsisten dan pemeriksaan hasil dengan LAN tester. Gunakan kabel dan konektor sesuai kebutuhan praktik.",
      steps: [
        "Siapkan kabel UTP, konektor RJ45, tang crimping, dan LAN tester; potong kabel dengan rapi.",
        "Kupas jaket luar secukupnya, luruskan pasangan kabel, lalu susun warna sesuai standar T568B.",
        "Rapikan ujung kabel agar rata dan masukkan seluruh konduktor sampai menyentuh bagian depan konektor.",
        "Crimp konektor dengan tang, kemudian ulangi pada ujung kabel sesuai tipe kabel yang dibutuhkan.",
        "Uji setiap jalur menggunakan LAN tester. Jika urutan tidak sesuai, potong konektor dan ulangi proses."
      ]
    }
  };

  const tutorialId = new URLSearchParams(window.location.search).get("id");
  const tutorial = tutorialId ? tutorials[tutorialId] : null;

  if (!tutorial) {
    detailTitle.textContent = "Tutorial tidak ditemukan";
    detailCategory.textContent = "Materi tidak tersedia";
    detailReadTime.textContent = "";
    detailIntro.textContent = "Tautan materi tidak valid atau tutorial sudah tidak tersedia.";
    detailImage.hidden = true;
    return;
  }

  document.title = `${tutorial.title} - Tutorial SMK Nurul Islam Cianjur`;
  detailTitle.textContent = tutorial.title;
  detailCategory.textContent = tutorial.category;
  detailReadTime.textContent = tutorial.readTime;
  detailIntro.textContent = tutorial.intro;
  detailImage.src = tutorial.image;
  detailImage.alt = tutorial.title;
  tutorial.steps.forEach((step) => {
    const item = document.createElement("li");
    item.textContent = step;
    detailSteps.append(item);
  });
});

// Filter kategori untuk artikel, tutorial, dan galeri.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".article-filter").forEach((filter) => {
    const links = Array.from(filter.querySelectorAll("[data-filter]"));
    const contentArea = filter.closest(".content-area");
    const cards = contentArea
      ? contentArea.querySelectorAll(".article-card[data-category], .gallery-card[data-category]")
      : [];
    const categories = new Set(links.map((link) => link.dataset.filter));

    function applyFilter(category, updateUrl = false) {
      const selectedCategory = categories.has(category) ? category : "semua";

      cards.forEach((card) => {
        card.hidden =
          selectedCategory !== "semua" &&
          card.dataset.category !== selectedCategory;
      });

      links.forEach((link) => {
        const isActive = link.dataset.filter === selectedCategory;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });

      if (updateUrl) {
        const nextHash = selectedCategory === "semua" ? "#semua" : `#${selectedCategory}`;
        history.replaceState(null, "", `${window.location.pathname}${window.location.search}${nextHash}`);
      }
    }

    links.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        applyFilter(link.dataset.filter, true);
      });
    });

    window.addEventListener("hashchange", () => {
      applyFilter(window.location.hash.slice(1));
    });

    applyFilter(window.location.hash.slice(1));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const subjek = document.getElementById("subjek").value;
    const pesan = document.getElementById("pesan").value.trim();
    const isiPesan = `Nama: ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`;
    const linkEmail =
      `mailto:smknurulislamcianjur@gmail.com?subject=${encodeURIComponent(subjek)}` +
      `&body=${encodeURIComponent(isiPesan)}`;

    window.location.href = linkEmail;
  });
});
