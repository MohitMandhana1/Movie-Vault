"use strict";

const SearchEl=document.getElementById('search');
const formEl=document.getElementById('form');
const MoviesContainer = document.querySelector('.movies-details');
const TvshowsContainer = document.querySelector('.Tv-details');
const PaginationsEl = document.querySelectorAll('.paginations ul li');
//937acdc338e706b304f9ece44f8d4970
//https://image.tmdb.org/t/p/w1280

const MoviesAPI = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=937acdc338e706b304f9ece44f8d4970&page=";

const imagePath = "https://image.tmdb.org/t/p/w1280";
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=937acdc338e706b304f9ece44f8d4970&query="';
const TvShowsAPI = "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=937acdc338e706b304f9ece44f8d4970&page=";

const searchTvshow = 'https://api.themoviedb.org/3/search/tv?api_key=937acdc338e706b304f9ece44f8d4970&query="';
getMovies(MoviesAPI);

//get movies function
async function getMovies(url){
    try{
        const result = await fetch(url);
        const data= await result.json();
        showMovies(data.results);
    }catch(error){}
}

//function movies inside HTML
function showMovies(movies){
 MoviesContainer.innerHTML = "";
 movies.forEach((movie) => {
    const {title, poster_path,vote_average,release_date} = movie; 
    const MoviesDisplay = document.createElement('div');
    MoviesDisplay.classList.add('movies')
    MoviesDisplay.innerHTML =`<img src="${imagePath+poster_path}" alt="">
    <p class="movies-title">${title}</p>
    <div class="short-des">
        <p class="year">Date : ${release_date}</p>
        <p class="rating">Vote : ${vote_average}</p>
    </div>`;
    MoviesContainer.appendChild(MoviesDisplay);
 });
}
//search
formEl.addEventListener('submit',(e)=>{
  e.preventDefault();
  const searchTerm = SearchEl.value;
  if(searchTerm && searchTerm !=""){
    getMovies(searchUrl+searchTerm);
    getTvshows(searchTvshow+searchTerm);
    SearchEl.value="";
  }else{
    window.location.reload();
  }
});
//tv shows

getTvshows(TvShowsAPI);

//get movies function
async function getTvshows(url){
    try{
        const result = await fetch(url);
        const data= await result.json();
        showTvShows(data.results);
    }catch(error){}
}

 function showTvShows(tvShows){
    TvshowsContainer.innerHTML = "";
    tvShows.forEach((tvShow)=>{
     const {name,poster_path,vote_average,first_air_date} = tvShow;
     const tvShowsDisplay= document.createElement('div');
     tvShowsDisplay.classList.add('tvShows');
     tvShowsDisplay.innerHTML = `<img src="${imagePath+poster_path}" alt="">
     <p class="movies-title">${name}</p>
     <div class="short-des">
         <p class="year">Date : ${first_air_date}</p>
         <p class="rating">Rating : ${vote_average}</p>
     </div>`;

     TvshowsContainer.appendChild(tvShowsDisplay);
    })
}

//Pagination
PaginationsEl.forEach((pages,Index)=>{
    pages.addEventListener('click',()=>{
    if(getMovies){
    getMovies(MoviesAPI+Index);
    }
    getTvshows(TvShowsAPI+Index);
    })
})