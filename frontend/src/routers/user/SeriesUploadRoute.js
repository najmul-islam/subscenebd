import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const SeriesUpload = lazy(() => import("../pages/SeriesUploadPage"));

const SeriesUploadRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SeriesUpload />
    </Suspense>
  );
};

export default SeriesUploadRoute;
