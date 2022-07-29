import React from "react";
import { MenuItem, ListItemIcon } from "@mui/material";

const ProfileItem = ({ icon, title }) => {
  return (
    <MenuItem>
      <ListItemIcon>{icon}</ListItemIcon>
      {title}
    </MenuItem>
  );
};

export default ProfileItem;
