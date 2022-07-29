import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const All = lazy(() => import("../pages/AllPage"));

const AllRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <All />
    </Suspense>
  );
};

export default AllRoute;
