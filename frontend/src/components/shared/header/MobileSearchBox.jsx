import React from "react";
import {
  Box,
  IconButton,
  TextField,
  Toolbar,
  InputBase,
  Button,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { ArrowBack, Search as SearchIcon } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const MobileSearchBox = ({ handleShowSearchBox }) => {
  return (
    <Toolbar
      disableGutters
      sx={{
        height: "65px",
        paddingX: "18px",
      }}
    >
      <IconButton
        color="inherit"
        edge="start"
        onClick={() => handleShowSearchBox(false)}
        sx={{ mr: 2, display: { xs: "inline-flex" } }}
      >
        <ArrowBack />
      </IconButton>

      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </Toolbar>
  );
};

export default MobileSearchBox;
