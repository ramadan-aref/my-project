const apikey = 'api_key=5809c72514b4c51c22ff022244df1f00'; 
const baseurl = 'https://api.themoviedb.org/3';
const imgurl = 'http://image.tmdb.org/t/p/original/';

let currentIndex = 0;
let movies = [];

function getPopularMovies() {
    const url = `${baseurl}/movie/popular?${apikey}&page=6`; // جلب الأفلام الشعبية
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            // اختيار 100 فيلم
            movies = data.results;
            return movies;
        });
}

function displayMovies() {
    const backgroundImage = document.getElementById("backgroundImage");
    const movieTitle = document.getElementById("movieTitle");
    const thumbnailContainer = document.getElementById("thumbnailContainer");

    // إضافة جميع الأفلام إلى شريط السلايدات
    movies.forEach(movie => {
        const thumbnailDiv = document.createElement("div");
        thumbnailDiv.classList.add("thumbnail");
        thumbnailDiv.innerHTML = `
            <img src="${imgurl + movie.backdrop_path}" alt="${movie.title}">
            <p>${movie.original_title ? movie.original_title : movie.name}</p>
        `;
        
        thumbnailContainer.appendChild(thumbnailDiv);
    });

    // تحديث الخلفية والعنوان للمرة الأولى
    updateBackgroundAndTitle();
    
    // تغيير الخلفية والعنوان كل 2 ثواني
    setInterval(() => {
        currentIndex = (currentIndex + 1) % movies.length; // تحديث الفهرس
        updateBackgroundAndTitle();
    }, 2000);
}

function updateBackgroundAndTitle() {
    const backgroundImage = document.getElementById("backgroundImage");
    const movieTitle = document.getElementById("movieTitle");
    backgroundImage.style.backgroundImage = `url(${imgurl + movies[currentIndex].backdrop_path})`;
    movieTitle.textContent = movies[currentIndex].original_title ? movies[currentIndex].original_title : movies[currentIndex].name;
}

// الحصول على الأفلام الشعبية وعرضها
getPopularMovies().then(displayMovies);
