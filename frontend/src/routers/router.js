import { Routes, Route } from "react-router-dom";

// layout
import PublicLayout from "../layouts/PublicLayout";
import UsersLayout from "../layouts/UsersLayout";
import LatestLayout from "../layouts/LatestLayout";
import PopularLayout from "../layouts/PopularLayout";
import MessageLayout from "../layouts/MessageLayout";

// auth page
import RegisterPage from "../pages/shared/RegisterPage";
import LoginPage from "../pages/shared/LoginPage";

// public pages
import HomePage from "../pages/public/HomePage";
import AllPage from "../pages/public/AllPage";
import MoviesPage from "../pages/public/MoviesPage";
import SeriesPage from "../pages/public/SeriesPage";
import ShortFilmsPage from "../pages/public/ShortFilmsPage";
import MusicsPage from "../pages/public/MusicsPage";
import SingleSubtitlePage from "../pages/public/SingleSubtitlePage";
import GenreSubtitlePage from "../pages/public/GenreSubtitlePage";
import UserProfilePage from "../pages/public/UserProfilePage";
// user/profile pages
import ProfilePage from "../pages/user/profile/ProfilePage";
import SubtitlesPage from "../pages/user/profile/SubtitlesPage";
import MessagesPage from "../pages/user/message/MessagesPage";
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
import ShortFilmSearchPage from "../pages/user/shortfilm/ShortFilmSearchPage";
import ShortFilmSubCreatePage from "../pages/user/shortfilm/ShortFilmSubCreatePage";
// user/music pages
import MusicSearchPage from "../pages/user/music/MusicSearchPage";
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

        <Route path="/latest/*" element={<LatestLayout />}>
          <Route path="all" element={<AllPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="series" element={<SeriesPage />} />
          <Route path="short-films" element={<ShortFilmsPage />} />
          <Route path="musics" element={<MusicsPage />} />
        </Route>

        <Route path="/popular/*" element={<PopularLayout />}>
          <Route path="all" element={<AllPage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="series" element={<SeriesPage />} />
          <Route path="short-films" element={<ShortFilmsPage />} />
          <Route path="musics" element={<MusicsPage />} />
        </Route>

        <Route path="/subtitles/:subtitleId" element={<SingleSubtitlePage />} />
        <Route
          path="/subtitles/genres/:genreName"
          element={<GenreSubtitlePage />}
        />
        <Route path="/user/:userId" element={<UserProfilePage />} />
      </Route>

      {/* user route */}
      <Route path="/user/*" element={<UsersLayout roles={["user"]} />}>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="subtitles" element={<SubtitlesPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
      </Route>

      {/* message route */}
      <Route path="/messages" element={<MessageLayout roles={["user"]} />}>
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/user/:userId" element={<MessagesPage />} />
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
        {/* short film route */}
        <Route path="short-film" element={<ShortFilmSearchPage />} />
        <Route
          path="short-film/:shortFilmId"
          element={<ShortFilmSubCreatePage />}
        />
        <Route path="music" element={<MusicSearchPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
