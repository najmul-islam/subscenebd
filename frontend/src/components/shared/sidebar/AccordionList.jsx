import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  Typography,
} from "@mui/material";
import { useState } from "react";

import {
  ArrowForwardIosSharp,
  MovieFilterOutlined,
  MovieOutlined,
  MusicVideoOutlined,
  SmartDisplayOutlined,
  VideoLibraryOutlined,
} from "@mui/icons-material";
import SidebarListItem from "./SidebarListItem";
import { useLocation } from "react-router-dom";

const MuiAccordion = styled((props) => <Accordion {...props} />)(
  ({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderLeft: 0,
    borderRight: 0,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  })
);

const MuiAccordionSummary = styled((props) => (
  <AccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const MuiAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const AccordionList = () => {
  const { pathname } = useLocation();

  const [expanded, setExpanded] = useState(pathname.split("/")[1] || "latest");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <MuiAccordion
        expanded={expanded === "latest"}
        onChange={handleChange("latest")}
        disableGutters
        elevation={0}
        square
      >
        <MuiAccordionSummary
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>Latest</Typography>
        </MuiAccordionSummary>
        <MuiAccordionDetails sx={{ padding: "0", borderRight: "0" }}>
          <List>
            <Box>
              <SidebarListItem
                link="/latest/all"
                icon={<VideoLibraryOutlined />}
                text="All"
              />
              <SidebarListItem
                link="/latest/movies"
                icon={<MovieOutlined />}
                text="Movies"
              />
              <SidebarListItem
                link="/latest/series"
                icon={<SmartDisplayOutlined />}
                text="TV-Series"
              />
              <SidebarListItem
                link="/latest/short-films"
                icon={<MovieFilterOutlined />}
                text="Short Films"
              />
              <SidebarListItem
                link="/latest/musics"
                icon={<MusicVideoOutlined />}
                text="Music Videos"
              />
            </Box>
          </List>
        </MuiAccordionDetails>
      </MuiAccordion>
      <MuiAccordion
        expanded={expanded === "popular"}
        onChange={handleChange("popular")}
        disableGutters
        square
        elevation={0}
      >
        <MuiAccordionSummary
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography>Popular</Typography>
        </MuiAccordionSummary>

        <MuiAccordionDetails>
          <SidebarListItem
            link="/popular/all"
            icon={<VideoLibraryOutlined />}
            text="All"
          />
          <SidebarListItem
            link="/popular/movies"
            icon={<MovieOutlined />}
            text="Movies"
          />
          <SidebarListItem
            link="/popular/series"
            icon={<SmartDisplayOutlined />}
            text="TV-Series"
          />
          <SidebarListItem
            link="/popular/short-films"
            icon={<MovieFilterOutlined />}
            text="Short Films"
          />
          <SidebarListItem
            link="/popular/musics"
            icon={<MusicVideoOutlined />}
            text="Music Videos"
          />
        </MuiAccordionDetails>
      </MuiAccordion>
    </div>
  );
};
export default AccordionList;
