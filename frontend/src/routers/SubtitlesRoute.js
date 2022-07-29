import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Subtitles = lazy(() => import("../pages/SubtitlesPage"));

const SubtitlesRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Subtitles />
    </Suspense>
  );
};

export default SubtitlesRoute;
