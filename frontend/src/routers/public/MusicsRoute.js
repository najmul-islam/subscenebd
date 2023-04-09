import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const Musics = lazy(() => import("../pages/MusicsPage"));

const MusicsRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Musics />
    </Suspense>
  );
};

export default MusicsRoute;
