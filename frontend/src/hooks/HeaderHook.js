import { useContext } from "react";
import { HeaderContext } from "../contexts/HeaderContext";

const useHeader = () => {
  return useContext(HeaderContext);
};

export default useHeader;
