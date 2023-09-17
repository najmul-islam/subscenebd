import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Divider,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usePostCommentMutation } from "../../../features/subtitle/subtitleApi";

import CommentItem from "./CommentItem";
// import CommentItem from "./CommentItem";

const avatar_url = process.env.REACT_APP_AVATAR_URL;

const CommentList = ({ subtitle }) => {
  const [commentValue, setCommentValue] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const commentFieldRef = useRef(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [postCommnet, { isLoading }] = usePostCommentMutation();

  // post comment
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    postCommnet({
      subtitleId: subtitle._id,
      data: { comment: commentValue, receiverId: subtitle.user._id },
    });
    setCommentValue("");
  };

  // const handleEdit = (e) => {
  //   e.preventDefault();

  //   editComment({
  //     subtitleId: subtitle._id,
  //     commentId: editCommentId,
  //     data: { comment: commentValue },
  //   });
  // };

  // cancel comment
  const handleCommentCancel = () => {
    commentFieldRef.current.blur();
    setCommentValue("");
    setIsEdit(false);
  };
  console.log(subtitle);
  return (
    <Box minHeight="200px" paddingY={5} sx={{ wordBreak: "break-word" }}>
      <Divider
        sx={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "10px",
        }}
      >
        {subtitle?.comments.length} Comments
      </Divider>

      {/* comment form box start */}
      <Stack direction="row" spacing={2} alignItems="center" marginY={8}>
        <Avatar
          alt={user?.name}
          src={`${avatar_url}/${user?.avatar}`}
          sx={{ width: "40px", height: "40px", cursor: "pointer" }}
          onClick={user ? () => navigate(`/user/${user?._id}`) : null}
        />

        {/* comment form */}
        {isLoading ? (
          <CircularProgress thickness={4} size={30} alignItems="center" />
        ) : (
          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            width="100%"
            sx={{ position: "relative" }}
          >
            <TextField
              variant="filled"
              inputRef={commentFieldRef}
              fullWidth
              label="Add a comment"
              name="comment"
              id="comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />

            <Box
              component="span"
              display="inline-block"
              sx={{ position: "absolute", right: "0", bottom: "-45px" }}
            >
              {commentValue && (
                <Button
                  sx={{
                    marginRight: "10px",
                    borderRadius: "50px",
                    paddingX: "15px",
                    textTransform: "none",
                  }}
                  onClick={handleCommentCancel}
                >
                  Cancel
                </Button>
              )}
              {user ? (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "50px", textTransform: "none" }}
                  disabled={commentValue ? false : true}
                >
                  {isEdit ? "Save" : "Comment"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ borderRadius: "50px", textTransform: "none" }}
                  onClick={() => navigate("/login")}
                  disabled={commentValue ? false : true}
                >
                  Comment
                </Button>
              )}
            </Box>
          </Box>
        )}
      </Stack>
      {/* comment form box end */}

      {/* all comment start */}
      <Stack direction="column" spacing={4}>
        {subtitle?.comments.map((comment) => (
          <CommentItem
            key={comment._id}
            subtitle={subtitle}
            comment={comment}
          />
        ))}
      </Stack>
      {/* all comment end */}
    </Box>
  );
};
export default CommentList;
