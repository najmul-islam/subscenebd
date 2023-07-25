import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, InputBase, IconButton, Tooltip } from "@mui/material";
import { searchSubtitle } from "../../../features/subtitle/subtitleSlice";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchSubtitle(searchQuery));
    if (searchQuery !== "") {
      navigate("/latest/all");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  // console.log(searchQuery);
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flex="0 2 600px"
        alignItems="center"
        borderRadius={2}
        paddingX={4}
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        <Box width="100%" sx={{ position: "relative" }}>
          <InputBase
            fullWidth
            placeholder="Search"
            name="search"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              paddingLeft: "20px",
              height: "40px",
              borderRadius: "40px 0px 0px 40px",
              boxShadow: "inset 0 1px 5px #eee",
              border: "1px solid #cccccc",
              "&:focus": { border: "1px solid #2395D3" },
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
            sx={{
              borderRadius: "0 40px 40px 0",
              background: "#F8F8F8",
              "&:hover": { background: "#f0f0f0" },
              color: "#1a1a1a",
              border: "1px solid #cccccc",
              borderLeft: "0",
              cursor: "pointer",
              boxShadow: "inset 0 1px 2px #eee",
              "&:focus": { background: "#f0f0f0" },
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
    </>
  );
};

export default SearchBox;
