import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const MovieUpload = lazy(() => import("../pages/MovieUploadPage"));

const MovieUploadRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MovieUpload />
    </Suspense>
  );
};

export default MovieUploadRoute;
