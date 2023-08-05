import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  ArrowBackOutlined,
  Clear,
  Search as SearchIcon,
} from "@mui/icons-material";
import { toggleUserSearchFocus } from "../../../../features/theme/themeSlice";
import { searchUser } from "../../../../features/user/userSlice";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(searchUser(e.target.value));
    // dispatch(searchSubtitle(searchQuery));
    // if (searchQuery !== "") {
    //   navigate("/latest/all");
    // }
  };
  useEffect(() => {
    dispatch(searchUser(searchQuery));
  }, [dispatch, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleFocus = () => {
    setIsFocused(true);
    dispatch(toggleUserSearchFocus(true));
  };

  const handleBlur = () => {
    setIsFocused(false);
    dispatch(toggleUserSearchFocus(false));
    setSearchQuery("");
    dispatch(searchUser(searchQuery));
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
      // sx={{ display: { xs: "none", sm: "flex" } }}
    >
      <Stack
        direction="row"
        spacing={1}
        // width="100%"
        sx={{ position: "relative" }}
      >
        {isFocused ? (
          <IconButton size="small">
            <ArrowBackOutlined />
          </IconButton>
        ) : null}
        <InputBase
          fullWidth
          placeholder="Search User"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          onFocus={handleFocus}
          onBlur={handleBlur}
          startAdornment={
            isFocused ? null : (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "22px" }} />
              </InputAdornment>
            )
          }
          sx={{
            paddingRight: "30px",
            paddingLeft: "10px",
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
      </Stack>
    </Box>
  );
};
export default SearchBox;
