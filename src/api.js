const API_KEY = "5090ecdf9fc767d470425f143dde37c3";

const categories = [
    {
        name: "trending",
        title: "Em alta",
        path: `/trending/all/week?api_key=${API_KEY}&language=pt-BR`

    },
    {
        name: "netflixOriginals",
        title: "Originais Netflix",
        path: `/discover/tv?api_key=${API_KEY}&with_networks=213`

    },
    {
        name: "anime",
        title: "Animes",
        path: `discover/tv?api_key=${API_KEY}&language=pt-BR&page=1&with_genres=16&with_keywords=210024|287501&with_text_query=death`

    },
    {
        name: "comedy",
        title: "Comédias",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=35&language=pt-BR`

    },
    {
        name: "romances",
        title: "Romances",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=10749&language=pt-BR`

    },
    {
        name: "documentaries",
        title: "Documentários",
        path: `/discover/tv?api_key=${API_KEY}&with_genres=99&language=pt-BR`

    }
];

export const getMovies = async (path) => {
    try {
        let url = `https://api.themoviedb.org/3/${path}`
        const response = await fetch(url);
        return await response.json();
    } catch {error} {
        console.log("error getMovies: ", error)
    }
};

export default categories;