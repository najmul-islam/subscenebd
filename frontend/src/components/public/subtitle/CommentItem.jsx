import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DeleteOutlined, EditOutlined, MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "../../../features/subtitle/subtitleApi";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const CommentItem = ({ subtitle, comment }) => {
  const [commentValue, setCommentValue] = useState(comment?.text);

  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  const commentFieldRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [editComment, { isLoading }] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    editComment({
      subtitleId: subtitle._id,
      commentId: comment._id,
      data: { text: commentValue },
    });
    setIsEdit(false);
  };

  const handleMoreVertOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMoreVertClose = () => {
    setAnchorEl(null);
  };

  const handleEditButton = (comment) => {
    setAnchorEl(null);
    setIsEdit(true);
  };

  const handleDeleteButton = (comment) => {
    setAnchorEl(null);
    setDialogOpen(true);
  };

  const handleDeleteComment = (comment) => {
    deleteComment({ subtitleId: subtitle?._id, commentId: comment._id });
    setDialogOpen(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCommentCancel = () => {
    commentFieldRef.current.blur();
    setIsEdit(false);
  };

  useEffect(() => {
    setCommentValue(comment?.text);
  }, [comment]);

  return (
    <Stack
      key={comment._id}
      direction="row"
      spacing={2}
      alignItems="flex-start"
      position="relative"
    >
      <Avatar
        alt={comment?.commentBy.name}
        src={`${avatar_url}/${comment?.commentBy.avatar}`}
        sx={{ width: "40px", height: "40px", cursor: "pointer" }}
        onClick={() => navigate(`/user/${comment?.commentBy._id}`)}
      />

      {isEdit ? (
        <Box
          component="form"
          onSubmit={handleCommentSubmit}
          width="100%"
          display="flex"
        >
          <TextField
            // variant="filled"
            inputRef={commentFieldRef}
            fullWidth
            name="comment"
            id="comment"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            size="small"
            // multiline
            // minRows={1}
            sx={{
              height: "20px",

              "&> input": {
                padding: "0",
              },
            }}
          />

          <Stack
            direction="row"
            spacing={1}
            marginLeft={1}
            // component="span"
            // display="inline-block"
            // sx={{ position: "absolute", right: "0", bottom: "-45px" }}
          >
            <Button
              // variant="contained"

              sx={{
                textTransform: "none",
                color: "red",
                paddingY: "8px",
              }}
              onClick={handleCommentCancel}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              type="submit"
              sx={{ textTransform: "none", paddingY: "8px" }}
              disabled={commentValue ? false : true}
            >
              Save
            </Button>
          </Stack>
        </Box>
      ) : (
        <>
          {isLoading ? (
            <CircularProgress
              thickness={4}
              size={30}
              justifyContent="center"
              alignItems="center"
            />
          ) : (
            <>
              <Box paddingRight={5}>
                <Stack direction="row" spacing={2}>
                  <Typography
                    onClick={() => navigate(`/user/${comment?.commentBy._id}`)}
                    variant="subtitle2"
                    sx={{ cursor: "pointer" }}
                  >
                    {comment?.commentBy?.name}
                  </Typography>
                  <Typography component="span" variant="caption">
                    {moment(comment?.createdAt).startOf("m").fromNow()}
                  </Typography>
                </Stack>

                <Typography variant="body2">{comment?.text}</Typography>
              </Box>
              {/* more icon button */}
              {user?._id === comment?.commentBy?._id && (
                <IconButton
                  onClick={(e) => handleMoreVertOpen(e)}
                  sx={{ position: "absolute", right: "0", top: "0px" }}
                >
                  <MoreVert />
                </IconButton>
              )}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMoreVertClose}
                PaperProps={{
                  style: {
                    width: "120px",
                  },
                }}
              >
                <MenuItem onClick={() => handleEditButton(comment)}>
                  <ListItemIcon>
                    <EditOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleDeleteButton(comment)}>
                  <ListItemIcon>
                    <DeleteOutlined fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Delete</ListItemText>
                </MenuItem>
              </Menu>
              <Dialog open={dialogOpen} onClose={handleDialogClose}>
                <DialogTitle
                  style={{ cursor: "move" }}
                  id="draggable-dialog-title"
                >
                  Delete comment
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Delete your comment permanently?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button autoFocus onClick={handleDialogClose}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleDeleteComment(comment)}>
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </>
      )}
    </Stack>
  );
};
export default CommentItem;
