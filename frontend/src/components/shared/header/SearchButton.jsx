import { IconButton } from "@mui/material";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../../features/theme/themeSlice";

const SearchButton = ({ handleShowSearchBox }) => {
  const dispatch = useDispatch();

  const handleSearchButton = () => {
    handleShowSearchBox(true);
    dispatch(toggleSidebar(false));
  };

  return (
    <IconButton
      sx={{ color: (theme) => theme.palette.text.primary }}
      onClick={handleSearchButton}
    >
      <CiSearch style={{ fontSize: "25px", display: { sm: "none" } }} />
    </IconButton>
  );
};

export default SearchButton;
