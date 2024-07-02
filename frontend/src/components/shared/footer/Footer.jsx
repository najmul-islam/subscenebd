import { Box, Grid, Link, List, ListItem, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      padding={3}
      sx={{ background: "#000000", color: "#fff" }}
    >
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Typography variant="h6">Subscenebd</Typography>
          <Typography variant="subtitle1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni,
            odit dignissimos aut autem laborum, ut quasi quod quia soluta harum,
            explicabo laboriosam nulla cumque
          </Typography>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">About us</Typography>
          <List sx={{ padding: "0" }}>
            <ListItem sx={{ paddingX: "0" }}>
              <Link href="#" underline="none">
                Home
              </Link>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <Link href="#" underline="none">
                Features
              </Link>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <Link href="#" underline="none">
                FAQs
              </Link>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <Link href="#" underline="none">
                About
              </Link>
            </ListItem>
            <ListItem sx={{ paddingX: "0" }}>
              <Link href="#" underline="none">
                Tearm & Condition
              </Link>
            </ListItem>
            {/* <ListItem></ListItem>
            <ListItem></ListItem>
            <ListItem></ListItem> */}
          </List>
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">Follow us</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
