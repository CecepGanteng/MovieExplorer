// API Key untuk OMDb
// Pastikan untuk menyertakan kunci ini di semua permintaan API Anda
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=99fd38d6

// Menangkap elemen input untuk pencarian film
const searchInput = document.querySelector('input[type="text"]');
// Menangkap elemen tombol untuk memulai pencarian
const searchButton = document.querySelector("button");

// Menangkap grid tempat untuk menampilkan hasil pencarian film
const movieGrid = document.querySelector(".grid");

// Fungsi untuk mengambil data film dari API
const fetchMovies = async (query = "avengers") => {
  // Menetapkan query default menjadi 'avengers'
  const apiKey = "99fd38d6"; // Kunci API
  const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`; // URL untuk permintaan API

  try {
    const response = await fetch(url); // Mengambil data dari API
    const data = await response.json(); // Mengonversi response menjadi JSON

    // Mengecek apakah respons dari API berhasil
    if (data.Response === "True") {
      displayMovies(data.Search); // Menampilkan film yang ditemukan
    } else {
      // Menampilkan pesan jika film tidak ditemukan
      movieGrid.innerHTML = '<p class="text-white">Movie not found!</p>';
    }
  } catch (error) {
    // Menangani error jika terjadi kesalahan saat mengambil data
    console.error("Error fetching data:", error);
    movieGrid.innerHTML = '<p class="text-white">Error fetching data.</p>'; // Menampilkan pesan error
  }
};

// Fungsi untuk menampilkan hasil pencarian film ke dalam grid
const displayMovies = (movies) => {
  movieGrid.innerHTML = ""; // Mengosongkan grid sebelum menampilkan data baru
  movies.forEach((movie) => {
    // Membuat card untuk setiap film
    const movieCard = `
      <div class="flex flex-col border-dotted cursor-pointer hover:border">
        <img src="${
          movie.Poster !== "N/A"
            ? movie.Poster // Menggunakan poster film jika tersedia
            : "https://via.placeholder.com/300" // Placeholder jika tidak ada poster
        }" alt="${movie.Title}">
        <h3 class="text-2xl text-white">${movie.Title}</h3>
        <p class="text-xl text-white">Years: ${movie.Year}</p>
      </div>
    `;
    movieGrid.innerHTML += movieCard; // Menambahkan card film ke dalam grid
  });
};

// Event listener untuk tombol search
searchButton.addEventListener("click", () => {
  // Mengambil nilai dari input, jika kosong gunakan default 'avengers'
  const query = searchInput.value.trim() || "avengers";
  fetchMovies(query); // Memanggil fungsi fetchMovies dengan query yang diberikan
});

// Event listener untuk menangani penekanan tombol Enter pada input field
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    // Mengambil nilai dari input, jika kosong gunakan default 'avengers'
    const query = searchInput.value.trim() || "avengers";
    fetchMovies(query); // Memanggil fungsi fetchMovies dengan query yang diberikan
  }
});

// Mengambil dan menampilkan film dengan kata kunci default 'avengers' saat pertama kali dimuat
fetchMovies();
