import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Tooltip,
} from "@mui/material";
import { Clear, Search as SearchIcon } from "@mui/icons-material";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(searchSubtitle(searchQuery));
    // if (searchQuery !== "") {
    //   navigate("/latest/all");
    // }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flex="0 2 600px"
      alignItems="center"
      borderRadius={2}
      paddingX={2}
      sx={{ display: { xs: "none", sm: "flex" } }}
    >
      <Box width="100%" sx={{ position: "relative" }}>
        <InputBase
          fullWidth
          placeholder="Search User"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: "22px" }} />
            </InputAdornment>
          }
          sx={{
            paddingLeft: "5px",
            height: "35px",
            borderRadius: "40px",
            boxShadow: "inset 0 1px 5px #eee",
            border: "1px solid #cccccc",
            "&:focus": { border: "1px solid #2395D3" },
          }}
        />

        {searchQuery === "" ? null : (
          <Tooltip title="clear search">
            <IconButton
              onClick={handleClear}
              size="small"
              sx={{
                position: "absolute",
                right: "0",
                fontSize: "22px",
              }}
            >
              <Clear />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      {/* <Box
        type="submit"
        display="flex"
        height="40px"
        width="64px"
        alignItems="center"
        justifyContent="center"
        sx={{
          color: "#1a1a1a",
        }}
      > */}
      {/* <SearchIcon
        sx={{
          fontSize: "20px",
          fontWeight: "400",
        }} 
      />*/}
      {/* </Box> */}
    </Box>
  );
};
export default SearchBox;
