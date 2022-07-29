import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Series = lazy(() => import("../pages/SeriesPage"));

const SeriesRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Series />
    </Suspense>
  );
};

export default SeriesRoute;
