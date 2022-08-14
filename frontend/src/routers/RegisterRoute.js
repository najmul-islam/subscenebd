import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Register = lazy(() => import("../pages/RegisterPage"));

const RegisterRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Register />
    </Suspense>
  );
};

export default RegisterRoute;
