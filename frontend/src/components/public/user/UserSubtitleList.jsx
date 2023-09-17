import { Grid } from "@mui/material";
import UserSubtitleItem from "./UserSubtitleItem";

const UserSubtitleList = ({ subtitles }) => {
  return (
    <Grid container spacing={2}>
      {subtitles.map((subtitle) => (
        <UserSubtitleItem key={subtitle._id} subtitle={subtitle} />
      ))}
    </Grid>
  );
};
export default UserSubtitleList;
