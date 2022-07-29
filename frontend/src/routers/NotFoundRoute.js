import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const NotFound = lazy(() => import("../pages/NotFoundPage"));

const NotFoundRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <NotFound />
    </Suspense>
  );
};

export default NotFoundRoute;
