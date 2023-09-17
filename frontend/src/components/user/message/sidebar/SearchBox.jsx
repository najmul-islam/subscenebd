import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { userSearch } from "../../../../features/user/userSlice";

const SearchBox = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [isFocused, setIsFocused] = useState(false);
  const { isUserSearchFocus } = useSelector((state) => state.theme);
  const { userSearchQuery } = useSelector((state) => state.users);

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
    dispatch(userSearch(userSearchQuery));
  }, [dispatch, userSearchQuery]);

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleClear = () => {
    dispatch(userSearch(""));
  };

  const handleFocus = () => {
    dispatch(toggleUserSearchFocus(true));
  };

  const handleBack = () => {
    dispatch(userSearch(""));
    dispatch(toggleUserSearchFocus(false));
  };

  // const handleBlur = () => {
  //   dispatch(searchUser(searchQuery));
  //   dispatch(toggleUserSearchFocus(false));
  //   setSearchQuery("");
  //   // setIsFocused(false);
  // };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flex="0 2 600px"
      alignItems="center"
      borderRadius={2}
      paddingX={2}
    >
      <Stack direction="row" spacing={1} sx={{ position: "relative" }}>
        {isUserSearchFocus ? (
          <IconButton onClick={handleBack} size="small">
            <ArrowBackOutlined />
          </IconButton>
        ) : null}
        <InputBase
          fullWidth
          placeholder="Search User"
          name="search"
          value={userSearchQuery}
          onChange={(e) => dispatch(userSearch(e.target.value))}
          onFocus={handleFocus}
          // onBlur={handleBlur}
          startAdornment={
            isUserSearchFocus ? null : (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: "22px" }} />
              </InputAdornment>
            )
          }
          // sx={{
          //   paddingRight: "30px",
          //   paddingLeft: "10px",
          //   height: "35px",
          //   borderRadius: "40px",
          //   boxShadow: "inset 0 1px 5px #eee",
          //   border: "1px solid #cccccc",
          //   "&:focus": { border: "1px solid #2395D3" },
          // }}
          sx={{
            paddingRight: "30px",
            paddingLeft: "10px",
            height: "35px",
            borderRadius: "40px",
            boxShadow: (theme) =>
              `inset 0 1px 5px ${theme.palette.background.secondary}`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            "&:focus-within": { border: "1px solid #2962B7" },
          }}
        />

        {userSearchQuery === "" ? null : (
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
