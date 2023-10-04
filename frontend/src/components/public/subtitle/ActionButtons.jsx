import {
  Download,
  ThumbDown,
  ThumbDownAltOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Box, Button, Stack, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { usePutUserDownloadSubMutation } from "../../../features/user/usersApi";
import {
  useCountDownloadSubtitleMutation,
  useDisLikeSubtitleMutation,
  useLikeSubtitleMutation,
} from "../../../features/subtitle/subtitleApi";
import { useNavigate } from "react-router-dom";

const ActionButtons = ({ subtitle }) => {
  const [putUserDownloadSub] = usePutUserDownloadSubMutation();
  const [likeSubtitle] = useLikeSubtitleMutation();
  const [dislikeSubtitle] = useDisLikeSubtitleMutation();
  const [countDownload] = useCountDownloadSubtitleMutation();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleDownload = (subtitleId) => {
    countDownload(subtitleId);
    if (user) {
      putUserDownloadSub(subtitleId);
    }
  };
  const handleLike = (subtitleId) => {
    if (user) {
      likeSubtitle({ subtitleId, data: { receiverId: subtitle.user._id } });
    } else {
      navigate("/login");
    }
  };

  const handleDislike = (subtitleId) => {
    if (user) {
      dislikeSubtitle({ subtitleId, data: { receiverId: subtitle.user._id } });
    } else {
      navigate("/login");
    }
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} marginTop="25px">
        <Tooltip title="download subtitle">
          <Button
            size="small"
            variant="contained"
            download
            startIcon={<Download />}
            href={subtitle?.subtitle_link}
            onClick={() => handleDownload(subtitle?._id)}
          >
            Download
          </Button>
        </Tooltip>

        <Tooltip title="downloaded">
          <Button
            variant="outlined"
            startIcon={<Download />}
            sx={{ cursor: "default" }}
          >
            {subtitle?.downloads}
          </Button>
        </Tooltip>

        <Tooltip title="like subtitle">
          <Button
            onClick={() => handleLike(subtitle?._id)}
            variant="outlined"
            startIcon={
              subtitle?.likes.includes(user?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpAltOutlined />
              )
            }
          >
            {subtitle?.likes.length}
          </Button>
        </Tooltip>

        <Tooltip title="dislike subtitle">
          <Button
            onClick={() => handleDislike(subtitle?._id)}
            variant="outlined"
            startIcon={
              subtitle?.dislikes.includes(user?._id) ? (
                <ThumbDown />
              ) : (
                <ThumbDownAltOutlined />
              )
            }
          >
            {subtitle?.dislikes.length}
          </Button>
        </Tooltip>
      </Stack>
    </Box>
  );
};
export default ActionButtons;
