import React from "react";
import {
  Card,
  CardActions,
  CardMedia,
  Grid,
  IconButton,
  styled,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

const SingleItem = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Grid item xs={4} sm={2.4} lg={1.5} xl={1.2}>
      <Card>
        <CardMedia
          component="img"
          height="175"
          image="https://i.jeded.com/i/191a.242610.jpg"
          alt="Paella dish"
        />
        {/* <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        /> */}
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Favorite />
          </IconButton>
          <IconButton aria-label="share">
            <Share />
          </IconButton>
          {/* <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreOutlined />
          </ExpandMore> */}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default SingleItem;
