import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const ShortFilms = lazy(() => import("../pages/ShortFilmsPage"));

const ShortFilmsRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ShortFilms />
    </Suspense>
  );
};

export default ShortFilmsRoute;
