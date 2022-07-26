import React, { useEffect } from 'react'
import categories, { getMovies } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Banner.css";


export default function Banner() {
    const [movie, setMovie] = React.useState({});

    const fetchRandomMovie = async () => {
        try {
            const netflixOriginalsCategory = categories.find((category) => category.name === "netflixOriginals");
            const data = await getMovies(netflixOriginalsCategory.path);
            const movies = data?.results;
            const randomIndex = Math.floor(Math.random() * data.results.length)
            setMovie(movies[randomIndex]);
        } catch (error) {
            console.log("Banner fetchRandomMovie error: ", error)
        }
    };

    useEffect(() => {
        fetchRandomMovie();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header className="banner-container" style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            roundPosition: "center-center",
        }}>
            <div className='banner-content'>
                <h1 className='banner-title'>
                    {movie?.name || movie?.original_name || movie?.title}
                </h1>
                <div className='banner-description'>
                    <p>{truncate(movie?.overview, 250)}</p>
                </div>
                <div className='banner-buttons-container'>
                    <button className='banner-button'><i className="fa-solid fa-play"></i> Assistir</button>
                    <button className='banner-button-info'><i className="fas fa-info-circle"></i> Mais informações</button>
                </div>
                
            </div>
        </header>
  )
}
