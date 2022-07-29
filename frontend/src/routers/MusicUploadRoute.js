import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const MusicUpload = lazy(() => import("../pages/MusicUploadPage"));

const MusicUploadRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MusicUpload />
    </Suspense>
  );
};

export default MusicUploadRoute;
