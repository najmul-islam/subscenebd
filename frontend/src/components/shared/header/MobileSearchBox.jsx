import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Toolbar,
  InputBase,
  Button,
  Tooltip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { ArrowBack, Clear, Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchSubtitle } from "../../../features/subtitle/subtitleSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  // [theme.breakpoints.up("sm")]: {
  //   marginLeft: theme.spacing(1),
  //   width: "auto",
  // },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//   },
// }));

const MobileSearchBox = ({ handleShowSearchBox }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchSubtitle(searchQuery));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };
  // #F0F0F0
  return (
    <Toolbar
      disableGutters
      sx={{
        height: "65px",
        paddingX: "18px",
      }}
    >
      <IconButton onClick={() => handleShowSearchBox(false)}>
        <ArrowBack />
      </IconButton>

      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flex="0 2 600px"
        alignItems="center"
        borderRadius={2}
        paddingX={4}
      >
        <Box width="100%" sx={{ position: "relative" }}>
          <InputBase
            fullWidth
            placeholder="Search"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            // sx={{
            //   paddingLeft: "20px",
            //   height: "40px",
            //   borderRadius: "40px 0px 0px 40px",
            //   boxShadow: "inset 0 1px 5px #eee",
            //   border: "1px solid #cccccc",
            //   "&:focus": { border: "1px solid #2395D3" },
            // }}
            sx={{
              paddingLeft: "20px",
              height: "40px",
              borderRadius: "40px 0px 0px 40px",
              boxShadow: (theme) =>
                `inset 0 1px 5px ${theme.palette.background.secondary}`,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              "&:focus-within": { border: "1px solid #2962B7" },
            }}
          />

          {searchQuery === "" ? null : (
            <Tooltip title="clear search">
              <IconButton
                onClick={handleClear}
                sx={{ position: "absolute", right: "0" }}
              >
                <Clear />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Tooltip title="search">
          <Box
            component="button"
            type="submit"
            display="flex"
            height="40px"
            width="64px"
            alignItems="center"
            justifyContent="center"
            // sx={{
            //   borderRadius: "0 40px 40px 0",
            //   background: "#F8F8F8",
            //   "&:hover": { background: "#f0f0f0" },
            //   color: "#1a1a1a",
            //   border: "1px solid #cccccc",
            //   borderLeft: "0",
            //   cursor: "pointer",
            //   boxShadow: "inset 0 1px 2px #eee",
            //   "&:focus": { background: "#f0f0f0" },
            // }}
            sx={{
              borderRadius: "0 40px 40px 0",
              background: (theme) => theme.palette.background.secondary,
              // "&:hover": { background: (theme) => theme.palette.background. },
              color: (theme) => theme.palette.text.primary,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: "0",
              cursor: "pointer",
              // boxShadow: "inset 0 1px 2px #eee",
              // "&:focus": { background: "#f0f0f0" },
            }}
          >
            <SearchIcon
              sx={{
                fontSize: "25px",
                fontWeight: "400",
              }}
            />
          </Box>
        </Tooltip>
      </Box>
    </Toolbar>
  );
};

export default MobileSearchBox;
