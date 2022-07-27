import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import movieTrailer from 'movie-trailer'
import { getMovies } from '../api';
import './Row.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const imageHost = "https://image.tmdb.org/t/p/original"

function Row({title, path, isLarge }) {
    const [movies, setMovies] = React.useState([]);


    // Inserir trailers ao clicar no filme
    const [trailerUrl, setTrailerUrl] = React.useState("");
    const handleOnClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie.name || movie.title || movie.original_name || "")
                .then((url) => {
                setTrailerUrl(url);
            })
            .catch((error) => {
                console.log("Error fetching movie trailer: ", error);
            })
        }     
    }

    // Puxar filmes da API
    const fetchMovies = async (_path) => {
        try {
            const data = await getMovies(_path);
            console.log("data ", data)
            setMovies(data?.results);
        } catch (error) {
            console.log("fetchMovies error:", error);
        }
    };

    useEffect(() => {
      fetchMovies(path);
    }, [path])

    // Scroll movies function
    const [scrollX, setScrollX] = useState(-400);
    // Função de scrollar para direita
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if (x > 0) {
            x = 0;
        }
        setScrollX(x);
    }
    // Função de scrollar para esquerda
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = movies.results.length * 150;
        if((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    return (
        <div className="row-container">
            <h2 className="row-header">{title}</h2>
            <div className='movieRow-left' onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className='movieRow-right' onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="row-cards" style={{marginLeft: scrollX}}>
                {movies?.map(movie => {
                    return (
                        <img 
                            className={`movie-card ${isLarge && "movie-card-lg"}`} 
                            onClick={() => handleOnClick(movie)}
                            key={movie.id} 
                            src={`${imageHost}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
                            alt={movie.name}
                        ></img>
                    );
                })}
            </div>
            {trailerUrl && <ReactPlayer className="moviePlayer" playing={true} url={trailerUrl} />}
        </div>
  );
}

export default Row;