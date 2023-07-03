import React, { useState } from "react";
import { IconButton, InputBase, Tooltip, styled } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";

const Search = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  width: "35%",
  display: "flex",
  // justifyContent: "end",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  "& .MuiInputBase-input": {
    width: "80%",
    padding: "5px 15px",
    border: "1px solid",
    borderColor: theme.palette.primary,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    fontSize: "18px",
    fontWeight: theme.typography.fontWeightRegular,
    "&:focus": {
      width: "90%",
    },
    // padding: theme.spacing(1, 2),
    // padding: "10px 20px",
    // padding: `calc(1em + ${theme.spacing(4)})`,
    // transition: theme.transitions.create("width"),
    // "&:focus": {
    //   border: "2px solid",
    // },
    // width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   maxWidth: "600px",
    //   "&:focus": {
    //     maxWidth: "600px",
    //   },
    // },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0px 15px",
  borderTop: "1px solid",
  borderRight: "1px solid",
  borderBottom: "1px solid",
  borderTopLeftRadius: "0",
  borderBottomLeftRadius: "0",
  borderTopRightRadius: theme.shape.borderRadius,
  borderBottomRightRadius: theme.shape.borderRadius,
}));

const SearchBox = () => {
  return (
    <>
      <Search sx={{ display: { xs: "none", sm: "flex" } }}>
        <StyledInputBase placeholder="Search..." />
        <Tooltip title="search">
          <StyledIconButton aria-label="search">
            <SearchRounded />
          </StyledIconButton>
        </Tooltip>
      </Search>
    </>
  );
};

export default SearchBox;
