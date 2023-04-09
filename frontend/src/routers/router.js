import { Routes, Route } from "react-router-dom";
// layout
import PublicLayout from "../layouts/PublicLayout";
import UsersLayoute from "../layouts/UsersLayout";

// public
import Latest from "./public/LatestRoute";
import Popular from "./public/PopularRoute";
import Home from "./public/HomeRoute";
import All from "./public/AllRoute";
import Movies from "./public/MoviesRoute";
import Series from "./public/SeriesRoute";
import ShortFilm from "./public/ShortFilmsRoute";
import Music from "./public/MusicsRoute";

// authentication
import Register from "./shared/RegisterRoute";
import Login from "./shared/LoginRoute";

// user
import Profile from "./user/ProfileRoute";
import Messages from "./user/MessagesRoute";
import Bookmarks from "./user/BookmarksRoute";
import Subtitles from "./user/SubtitlesRoute";
import Downloads from "./user/DownloadsRoute";
// upload
import MovieUpload from "./user/MoiveUploadRoute";
import SeriesUpload from "../pages/SeriesUploadPage";
import ShortFilmUpload from "./user/ShortFilmUploadRoute";
import MusicUpload from "./user/MusicUploadRoute";
// components
import SearchMovie from "../components/uploads/SearchMovie";
import UploadMovie from "../components/uploads/UploadMovie";

import NotFound from "./shared/NotFoundRoute";

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<PublicLayout />}>
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
      </Route>

      {/* user route */}
      <Route path="/user/*" element={<UsersLayoute roles={["user"]} />}>
        <Route path="profile" element={<Profile />} />
        <Route path="subtitles" element={<Subtitles />} />
        <Route path="messages" element={<Messages />} />
        <Route path="bookmarks" element={<Bookmarks />} />
        <Route path="downloads" element={<Downloads />} />
      </Route>
      {/* user upload */}
      <Route path="/upload/*" element={<UsersLayoute roles={["user"]} />}>
        <Route path="movie/search" element={<SearchMovie />} />
        <Route path="movie/upload" element={<UploadMovie />} />

        <Route path="series" element={<SeriesUpload />} />
        <Route path="short-film" element={<ShortFilmUpload />} />
        <Route path="music" element={<MusicUpload />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
