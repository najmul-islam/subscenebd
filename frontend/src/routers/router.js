import { Routes, Route } from "react-router-dom";
// layout
import PublicLayoute from "../layouts/PublicLayoute";
import PrivateLayoutes from "../layouts/PrivateLayoutes";
// public
import Latest from "./LatestRoute";
import Popular from "./PopularRoute";
import Home from "./HomeRoute";
import All from "./AllRoute";
import Movies from "./MoviesRoute";
import Series from "./SeriesRoute";
import ShortFilm from "./ShortFilmsRoute";
import Music from "./MusicsRoute";
// user
import Profile from "./ProfileRoute";
import Messages from "./MessagesRoute";
import Bookmarks from "./BookmarksRoute";
import Subtitles from "./SubtitlesRoute";
import Downloads from "./DownloadsRoute";
// upload
import MovieUpload from "./MoiveUploadRoute";
import SeriesUpload from "../pages/SeriesUploadPage";
import ShortFilmUpload from "./ShortFilmUploadRoute";
import MusicUpload from "./MusicUploadRoute";

import NotFound from "./NotFoundRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicLayoute />}>
        {/* public route */}
        <Route path="/" element={<Home />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/all" element={<All />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/short-films" element={<ShortFilm />} />
        <Route path="/musics" element={<Music />} />
        {/* private route */}
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/subtitles" element={<Subtitles />} />
        <Route path="/user/messages" element={<Messages />} />
        <Route path="/user/bookmarks" element={<Bookmarks />} />
        <Route path="/user/downloads" element={<Downloads />} />
        {/* upload */}
        <Route path="/upload/movie" element={<MovieUpload />} />
        <Route path="/upload/series" element={<SeriesUpload />} />
        <Route path="/upload/short-film" element={<ShortFilmUpload />} />
        <Route path="/upload/music" element={<MusicUpload />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
