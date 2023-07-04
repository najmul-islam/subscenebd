import { Box, Fab, Fade, useScrollTrigger } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const GoToTop = () => {
  const trigger = useScrollTrigger({
    target: window ? window : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={scrollToTop}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </Box>
    </Fade>
  );
};
export default GoToTop;
