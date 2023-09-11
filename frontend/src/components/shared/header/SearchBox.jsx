import { useEffect, useState } from "react";
import { Box, InputBase, IconButton, Tooltip } from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery !== "") {
      const formattedQuery = searchQuery.replace(/ /g, "+");
      navigate(`/search?title=${formattedQuery}`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchParams("");
  };

  useEffect(() => {
    const isSearchParams = searchParams.get("title");
    if (isSearchParams) {
      setSearchQuery(searchParams.get("title"));
    }
  }, [searchParams]);
  // console.log(searchParams);
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flex="0 1 600px"
      alignItems="center"
      borderRadius={2}
      paddingX={5}
      sx={{ display: { xs: "none", sm: "flex" } }}
    >
      <Box width="100%" sx={{ position: "relative" }}>
        <InputBase
          fullWidth
          placeholder="Search subtitle"
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
            borderLeft: "0",
            cursor: "pointer",
            background: (theme) => theme.palette.background.secondary,
            color: (theme) => theme.palette.text.primary,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            // boxShadow: "inset 0 1px 2px #eee",
            // "&:hover": { background: (theme) => theme.palette.background. },
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
  );
};

export default SearchBox;
