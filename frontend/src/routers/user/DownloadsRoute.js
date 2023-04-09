import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const Downloads = lazy(() => import("../pages/DownloadsPage"));

const DownloadsRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Downloads />
    </Suspense>
  );
};

export default DownloadsRoute;
