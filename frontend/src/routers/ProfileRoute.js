import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Profile = lazy(() => import("../pages/ProfilePage"));

const ProfileRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Profile />
    </Suspense>
  );
};

export default ProfileRoute;
