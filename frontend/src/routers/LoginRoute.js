import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Login = lazy(() => import("../pages/LoginPage"));

const LoginRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
};

export default LoginRoute;
