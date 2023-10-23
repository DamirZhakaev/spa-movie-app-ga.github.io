import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoSection from "../components/VideoSection";
import { DiscussionEmbed } from 'disqus-react';

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState();
  const [videoKey, setVideoKey] = useState();

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetails(res.data))
      .catch((err) => console.log(err));
    axios
      .get(videoUrl)
      .then((res) => setVideoKey(res.data.results[0].key))
      .catch((err) => console.log(err));
  }, [movieDetailBaseUrl, videoUrl]);

  // Здесь вставьте код embed.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://movie-app00.disqus.com/embed.js';
    script.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(script);
  }, []);

  // Здесь вставьте код count.js
  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'dsq-count-scr';
    script.src = 'https://movie-app00.disqus.com/count.js';
    script.async = true;
    (document.head || document.body).appendChild(script);
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center">{movieDetails?.title}</h1>
      {videoKey && <VideoSection videoKey={videoKey} />}
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={
                movieDetails?.poster_path
                  ? baseImageUrl + movieDetails?.poster_path
                  : defaultImage
              }
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8 d-flex flex-column">
            <div className="card-body">
              <h5 className="card-title">Overview</h5>
              <p className="card-text">{movieDetails?.overview}</p>
            </div>
            <ul className="list-group">
              <li className="list-group-item">
                {"Release Date : " + movieDetails?.release_date}
              </li>
              <li className="list-group-item">
                {"Rate : " + movieDetails?.vote_average}
              </li>
              <li className="list-group-item">
                {"Total Vote : " + movieDetails?.vote_count}
              </li>
              <li className="list-group-item">
                <Link to={-1} className="card-link">
                  Go Back
                </Link>
              </li>
              <li className="list-group-item">
               <Link to="/">Home</Link>
              </li>
            </ul>
            <nav>
      </nav>
          </div>
        </div>
      </div>
      <div className="container py-5">
        <h1 className="text-center">Comments on Disqus</h1>
        <DiscussionEmbed
          shortname="movie-app00" // Замените на свой короткий идентификатор Disqus
          config={{
            identifier: id, // Замените на ваш уникальный идентификатор
            title: movieDetails?.title,
          }}
        />
      </div>
    </div>
  );
};
export default MovieDetail;
