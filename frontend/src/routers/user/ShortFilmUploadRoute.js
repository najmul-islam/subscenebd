import React, { lazy, Suspense } from "react";
import Loading from "../../components/loading/Loading";
const ShortFilmUpload = lazy(() => import("../pages/ShortFilmUploadPage"));

const ShortFilmUploadRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ShortFilmUpload />
    </Suspense>
  );
};

export default ShortFilmUploadRoute;
