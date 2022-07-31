import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { Delete } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  height: "40px",
  borderRadius: theme.shape.borderRadius,
  // border: "1px solid",
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // "&:hover": {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // [theme.breakpoints.up("sm")]: {
  //   display: "",
  //   // marginLeft: theme.spacing(1),
  //   // width: "auto",
  // },
  // [theme.breakpoints.values.sm]: {
  //   display: "block",
  //   // marginLeft: theme.spacing(1),
  //   // width: "auto",
  // },
  // [theme.breakpoints.values.xs]: {
  //   display: "none",
  //   // marginLeft: theme.spacing(1),
  //   // width: "auto",
  // },
}));

const SearchBoxWrapper = styled("div")(({ theme }) => ({
  border: "1px solid",
  height: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  // padding: theme.spacing(0, 2),
  height: "100%",
  border: "1px solid",
  // position: "absolute",
  // pointerEvents: "none",
  // display: "flex",
  // alignItems: "center",
  // justifyContent: "end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 2),
    // padding: "10px 20px",
    // padding: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   maxWidth: "600px",
    //   "&:focus": {
    //     maxWidth: "600px",
    //   },
    // },
  },
}));

const SearchBox = () => {
  return (
    <Search>
      <SearchBoxWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </SearchBoxWrapper>
      {/* <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper> */}
      <IconButton aria-label="delete">
        <SearchIcon />
      </IconButton>
    </Search>
  );
};

export default SearchBox;
