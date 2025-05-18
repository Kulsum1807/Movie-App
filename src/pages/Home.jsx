import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
// curly brackets -> named export ko import karta hu

function Home() {
  const [search, setSearch] = useState(" ");

  // jab bhi api involved rhe
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popMovies = await getPopularMovies();
        setMovies(popMovies);
        console.log(popMovies);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // edge cases -> if search mei faltu ki space/ empty then return aur if api is loading then also return
    if (!search.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchRes = await searchMovies(search);
      setMovies(searchRes);
      setError(null);
    } catch (err) {
      setError(err);
      console.log(err);
    } finally {
      setLoading(false);
    }
    setSearch("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {/* if error present */}
      {error && <div className="error">{error}</div>}

      {/* if loading true */}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
