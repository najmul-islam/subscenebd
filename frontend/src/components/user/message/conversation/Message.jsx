import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { useSelector } from "react-redux";
const avatar_url = process.env.REACT_APP_AVATAR_URL;

const Message = ({ message }) => {
  const { user } = useSelector((state) => state.auth);

  const justify = message.sender._id === user._id ? "end" : "start";
  const partner =
    message.sender._id === user._id ? message.receiver : message.sender;

  // console.log("message", message);
  return (
    <Box sx={{ display: "flex", justifyContent: `${justify}` }}>
      <Tooltip
        title={moment(message?.createdAt).format("MMMM D, YYYY [at] h:mm A")}
        placement={justify === "start" ? "right" : "left"}
      >
        {/* <Box
          variant="subtitle1"
          sx={{
            // background: `${justify === "start" ? "#E4E6EB" : "#0084FF"}`,
            // padding: "5px 10px",
            marginY: "1px",
            color: `${justify === "start" ? "#000000" : "#ffffff"}`,
            borderRadius: `${
              justify === "start" ? "5px 50px 50px 5px" : "50px 5px 5px 50px"
            }`,
          }}
        >
          {justify === "start" ? (
            <Stack direction="row" spacing={1} alignItems="end">
              <Avatar
                src={`${avatar_url}/${partner?.avatar}`}
                sx={{ width: 25, height: 25 }}
              />
              <Typography
                sx={{
                  background: `${justify === "start" ? "#E4E6EB" : "#0084FF"}`,
                  padding: "5px 10px",
                  marginY: "1px",
                  color: `${justify === "start" ? "#000000" : "#ffffff"}`,
                  borderRadius: `${
                    justify === "start"
                      ? "5px 50px 50px 5px"
                      : "50px 5px 5px 50px"
                  }`,
                }}
              >
                {message.text}
              </Typography>
            </Stack>
          ) : (
            <Typography
              sx={{
                background: `${justify === "start" ? "#E4E6EB" : "#0084FF"}`,

                padding: "5px 10px",
                color: `${justify === "start" ? "#000000" : "#ffffff"}`,
                borderRadius: `${
                  justify === "start"
                    ? "5px 50px 50px 5px"
                    : "50px 5px 5px 50px"
                }`,
              }}
            >
              {message.text}
            </Typography>
          )}
        </Box> */}

        <Box
          sx={{
            // background: `${justify === "start" ? "#E4E6EB" : "#0084FF"}`,
            // padding: "5px 10px",
            marginY: "1px",
            color: `${justify === "start" ? "#000000" : "#ffffff"}`,
            borderRadius: `${
              justify === "start" ? "5px 50px 50px 5px" : "50px 5px 5px 50px"
            }`,
          }}
        >
          <Typography
            sx={{
              background: `${justify === "start" ? "#E4E6EB" : "#0084FF"}`,
              padding: "5px 10px",
              marginY: "1px",
              color: `${justify === "start" ? "#000000" : "#ffffff"}`,
              borderRadius: `${
                justify === "start" ? "5px 50px 50px 5px" : "50px 5px 5px 50px"
              }`,
            }}
          >
            {message.text}
          </Typography>
        </Box>
      </Tooltip>
    </Box>
  );
};
export default Message;
