import React, { lazy, Suspense } from "react";
import Loading from "../components/loading/Loading";
const Messages = lazy(() => import("../pages/MessagesPage"));

const MessagesRoute = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Messages />
    </Suspense>
  );
};

export default MessagesRoute;
