import { Routes, Route } from "react-router-dom";
// layout
import PublicLayoute from "../layouts/PublicLayoute";
import PrivateLayoutes from "../layouts/PrivateLayoutes";
import PriveteRoute from "./PriveteRoute";
// public
import Latest from "./LatestRoute";
import Popular from "./PopularRoute";
import Home from "./HomeRoute";
import All from "./AllRoute";
import Movies from "./MoviesRoute";
import Series from "./SeriesRoute";
import ShortFilm from "./ShortFilmsRoute";
import Music from "./MusicsRoute";
// authentication
import Register from "./RegisterRoute";
import Login from "./LoginRoute";
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
// components
import SearchMovie from "../components/uploads/SearchMovie";
import UploadMovie from "../components/uploads/UploadMovie";

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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* private route */}
        <Route path="/user/*" element={<PriveteRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="subtitles" element={<Subtitles />} />
          <Route path="messages" element={<Messages />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="downloads" element={<Downloads />} />
        </Route>
        {/* upload */}
        <Route path="/upload/*" element={<PriveteRoute />}>
          <Route path="movie/search" element={<SearchMovie />} />
          <Route path="movie/upload" element={<UploadMovie />} />

          <Route path="series" element={<SeriesUpload />} />
          <Route path="short-film" element={<ShortFilmUpload />} />
          <Route path="music" element={<MusicUpload />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
