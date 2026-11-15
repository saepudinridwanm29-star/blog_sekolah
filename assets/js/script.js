document.addEventListener("DOMContentLoaded", function () {
  // hero images
  const heroSlides = [
    "gedung_nuris.jpg",
    "gedung_sekolah.jpg",
    "perkemahan.jpg",
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
      heroBackground.style.backgroundImage = `url("${heroSlides[currentSlide]}")`;

      heroBackground.style.opacity = "1";
    }, 350);

    // Memperbarui indikator
    indicators.forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  // Pindah ke gambar selanjutnya
  function nextSlide() {
    const nextIndex = (currentSlide + 1) % heroSlides.length;

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

    const searchKeyword = keyword.toLowerCase().trim();

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

// Filter kategori untuk artikel, tutorial, dan galeri.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".article-filter").forEach((filter) => {
    const links = Array.from(filter.querySelectorAll("[data-filter]"));
    const contentArea = filter.closest(".content-area");
    const cards = contentArea
      ? contentArea.querySelectorAll(
          ".article-card[data-category], .gallery-card[data-category]",
        )
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
        const nextHash =
          selectedCategory === "semua" ? "#semua" : `#${selectedCategory}`;
        history.replaceState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${nextHash}`,
        );
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
