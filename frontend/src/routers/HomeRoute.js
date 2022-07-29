import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Home = lazy(() => import("../pages/HomePage"));

const HomeRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Home />
    </Suspense>
  );
};

export default HomeRoute;
