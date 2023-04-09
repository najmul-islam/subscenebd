import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const Popular = lazy(() => import("../pages/PopularPage"));

const PopularRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Popular />
    </Suspense>
  );
};

export default PopularRoute;
