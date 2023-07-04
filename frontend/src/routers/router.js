import { Routes, Route } from "react-router-dom";

// layout
import PublicLayout from "../layouts/PublicLayout";
import UsersLayout from "../layouts/UsersLayout";

// auth page
import RegisterPage from "../pages/shared/RegisterPage";
import LoginPage from "../pages/shared/LoginPage";

// public pages
import HomePage from "../pages/public/HomePage";
import LatestPage from "../pages/public/LatestPage";
import PopularPage from "../pages/public/PopularPage";
import AllPage from "../pages/public/AllPage";
import MoviesPage from "../pages/public/MoviesPage";
import SeriesPage from "../pages/public/SeriesPage";
import ShortFilmsPage from "../pages/public/ShortFilmsPage";
import MusicsPage from "../pages/public/MusicsPage";

// user/profile pages
import ProfilePage from "../pages/user/profile/ProfilePage";
import SubtitlesPage from "../pages/user/profile/SubtitlesPage";
import MessagesPage from "../pages/user/profile/MessagesPage";
import BookmarksPage from "../pages/user/profile/BookmarksPage";
import DownloadsPage from "../pages/user/profile/DownloadsPage";
// user/movie pages
import MovieSearchPage from "../pages/user/movie/MovieSearchPage";
import MovieSubCreatePage from "../pages/user/movie/MovieSubCreatePage";
// user/series pages
import SeriesSearchPage from "../pages/user/series/SeriesSearchPage";
import SeriesDetailsPage from "../pages/user/series/SeriesDetailsPage";
import SeriesSubCreatePage from "../pages/user/series/SeriesSubCreatePage";
// user/shortfilm pages
// user/music pages

// other pages
import NotFoundPage from "../pages/shared/NotFoundPage";

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/latest" element={<LatestPage />} />
        <Route path="/popular" element={<PopularPage />} />
        <Route path="/all" element={<AllPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/short-films" element={<ShortFilmsPage />} />
        <Route path="/musics" element={<MusicsPage />} />
      </Route>

      {/* user route */}
      <Route path="/user/*" element={<UsersLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="subtitles" element={<SubtitlesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
      </Route>

      {/* user upload */}
      <Route path="/upload/*" element={<UsersLayout roles={["user"]} />}>
        {/* movies route */}
        <Route path="movie" element={<MovieSearchPage />} />
        <Route path="movie/:movieId" element={<MovieSubCreatePage />} />
        {/* series route */}
        <Route path="series" element={<SeriesSearchPage />} />
        <Route path="series/:seriesId" element={<SeriesDetailsPage />} />
        <Route
          path="series/:seriesId/season/:seasonId"
          element={<SeriesSubCreatePage />}
        />

        {/* <Route path="short-film" element={<ShortFilmUpload />} /> */}
        {/* <Route path="music" element={<MusicUpload />} />  */}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
