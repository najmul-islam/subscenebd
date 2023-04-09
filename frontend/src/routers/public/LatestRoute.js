import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const Latest = lazy(() => import("../pages/LatestPage"));

const LatestRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Latest />
    </Suspense>
  );
};

export default LatestRoute;
