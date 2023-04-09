import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const Bookmarks = lazy(() => import("../pages/BookmarksPage"));

const BookmarksRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Bookmarks />
    </Suspense>
  );
};

export default BookmarksRoute;
