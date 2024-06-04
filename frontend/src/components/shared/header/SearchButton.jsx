import { IconButton } from "@mui/material";
import { CiSearch } from "react-icons/ci";

const SearchButton = ({ handleShowSearchBox }) => {
  return (
    <IconButton onClick={() => handleShowSearchBox(true)}>
      <CiSearch style={{ fontSize: "25px", display: { sm: "none" } }} />
    </IconButton>
  );
};

export default SearchButton;
