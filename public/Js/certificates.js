//Script render carousel
fetch("public/data/certificates.json")
	.then((res) => res.json())
	.then((certificates) => {
		const container = document.getElementById("carouselContainer");

		certificates.forEach((cert) => {
			const slide = document.createElement("div");
			slide.className = "swiper-slide";

			slide.innerHTML = `
        <div class="card bg-white h-60 rounded-lg">
          <img src="${cert.image}" alt="${cert.title}" class="w-full h-48 object-cover rounded-t-lg cursor-zoom-in" onclick="openModal('${cert.image}')">
          <div class="card-body p-4">
            <h2 class="text-lg text-primary font-semibold">${cert.title}</h2>
            <p class="text-sm text-dark">${cert.issuer} <span class="text-tertiary">|</span> <span class="text-gray-400">${cert.date}</span></p>
          </div>
        </div>
      `;

			container.appendChild(slide);
		});

		// Inisialisasi Swiper setelah DOM selesai
		new Swiper(".mySwiper", {
			slidesPerView: 1,
			spaceBetween: 20,
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			breakpoints: {
				640: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
			},
		});
	})
	.catch((err) => console.error("Gagal menampilkan sertifikat:", err));

// Modal logic
const modal = document.getElementById("certificateModal");
const modalImage = document.getElementById("modalImage");

// Buka modal saat gambar diklik
function openModal(imageSrc) {
	modalImage.src = imageSrc;
	modal.classList.remove("hidden");
}

// Tutup modal saat diklik di luar gambar
modal.addEventListener("click", () => {
	modal.classList.add("hidden");
});
