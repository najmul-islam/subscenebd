import { ArrowBack, Clear } from "@mui/icons-material";
import { Box, IconButton, InputBase, Toolbar, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { searchSubtitle } from "../../../features/subtitle/subtitleSlice";

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
            sx={{
              borderRadius: "0 40px 40px 0",
              background: (theme) => theme.palette.background.tertiary,
              color: (theme) => theme.palette.text.primary,
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderLeft: "0",
              cursor: "pointer",
            }}
          >
            <CiSearch
              style={{
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
