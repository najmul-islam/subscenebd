import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Movies = lazy(() => import("../pages/MoviesPage"));

const MoivesRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Movies />
    </Suspense>
  );
};

export default MoivesRoute;
