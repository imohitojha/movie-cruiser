let movieList;
let favouriteList;

function displayMovies(movies) {
    let liNode = null;
    let textNode = '';
    let buttonNode = null;
    // console.log('movies.length '+movies.length);
    if (movies.length > 0) {
        // iterates movies and creates <li> for each movie
        movies.forEach(movie => {
            // creates <li> node
            liNode = document.createElement("li");
            // sets attribute 'id' to <li> node
            liNode.setAttribute('id', movie.id);
            // creates 'text' node
            // creates <span> node
            let spanNode = document.createElement("span");
            spanNode.innerHTML = movie.title;
            liNode.appendChild(spanNode);
            let imgNode = document.createElement("img");
            imgNode.setAttribute('src', movie.posterPath);
            imgNode.setAttribute('alt', movie.title);
            buttonNode = document.createElement("button");
            textNode = document.createTextNode('Add to Favourite');
            buttonNode.appendChild(textNode);
            // sets attribute 'onclick' to <button> node
            buttonNode.setAttribute('onclick', "addFavourite(" + movie.id + ")");
            liNode.appendChild(imgNode);
            liNode.appendChild(buttonNode);
            document.getElementById('moviesList').appendChild(liNode);
        });
    }

}

function displayFavourites(favourites) {

    let liNode = null;

    if (favourites.length) {
        // iterates movies and creates <li> for each movie
        favourites.forEach(movie => {
            // creates <li> node
            liNode = document.createElement("LI");
            // sets attribute 'id' to <li> node
            liNode.setAttribute('id', movie.id);
            // creates 'text' node
            // creates <span> node
            let spanNode = document.createElement("SPAN");
            spanNode.innerHTML = movie.title;
            liNode.appendChild(spanNode);
            let imgNode = document.createElement("img");
            imgNode.setAttribute('src', movie.posterPath);
            imgNode.setAttribute('alt', movie.title);
            liNode.appendChild(imgNode);
            document.getElementById('favouritesList').appendChild(liNode);
        });
    }

}

function getMovies() {
    return fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(resp => {
            displayMovies(resp);
            movieList = resp;
            return Promise.resolve(resp);
        }).catch(err => err);
}

//Function to get favourite movies list
function getFavourites() {
    return fetch('http://localhost:3000/favourites')
        .then(response => response.json())
        .then(resp => {
            displayFavourites(resp);
            favouriteList = resp;
            return Promise.resolve(resp);
        }).catch(err => err);
}


// adding to favourite list/json
function addFavourite(id) {
    let inMovie = movieList.filter(movie => movie.id == id);
    let toBeFavourite = favouriteList.filter(movie => movie.id == id);
    console.log(inMovie[0]);
    if(toBeFavourite.length != 0) {
        return Promise.reject(new Error('Movie is already added to favourites'));
    }
    else {
        return fetch('http://localhost:3000/favourites', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(inMovie[0]),
    })
        .then(response => {
            return response.json();
        })
        .then(resp => {
            // if movie gets added, add it to DOM
            favouriteList.push(resp);
            displayFavourites(favouriteList);
            return Promise.resolve(favouriteList);
        });
    }
    
};

module.exports = {
    getMovies,
    getFavourites,
    addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


