import { useHeader } from "../../contexts/HeaderContext";
import SearchBox from "../header/SearchBox";
import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Grid,
} from "@mui/material";

const Header = () => {
  const { setToggleSidebar } = useHeader();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <Box>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => setToggleSidebar(true)}
                >
                  <Menu />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <SearchBox />
            </Grid>
            <Grid item>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
