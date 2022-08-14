import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const useHeader = () => {
  return useContext(UserContext);
};

export default useHeader;
