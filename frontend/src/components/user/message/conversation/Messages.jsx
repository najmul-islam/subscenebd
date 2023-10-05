import { useEffect, useRef } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { Avatar, Box, Stack, Tooltip, Typography } from "@mui/material";

const Messages = ({ partner, messages }) => {
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages && messages.length === 0) {
    return (
      <Stack
        direction="column"
        spacing={2}
        alignContent="center"
        alignItems="center"
      >
        <Avatar sx={{ width: "60px", height: "60px" }} src={partner?.avatar} />
        <Typography>{partner?.name}</Typography>
      </Stack>
    );
  }

  return (
    <Stack direction="column" spacing={2} paddingY={2}>
      <Stack
        direction="column"
        spacing={2}
        alignContent="center"
        alignItems="center"
      >
        <Avatar sx={{ width: "60px", height: "60px" }} src={partner?.avatar} />
        <Typography>{partner?.name}</Typography>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages?.map((message) => {
          const justify = message?.sender?._id === user?._id ? "end" : "start";
          return (
            <Box
              ref={scrollRef}
              key={message?._id}
              sx={{ display: "flex", justifyContent: `${justify}` }}
            >
              <Tooltip
                title={moment(message?.createdAt).format(
                  "MMMM D, YYYY [at] h:mm A"
                )}
                placement={justify === "start" ? "right" : "left"}
              >
                <Box
                  sx={{
                    marginY: "1px",
                    color: `${justify === "start" ? "#000000" : "#ffffff"}`,
                    borderRadius: `${
                      justify === "start"
                        ? "5px 50px 50px 5px"
                        : "50px 5px 5px 50px"
                    }`,
                  }}
                >
                  <Typography
                    sx={{
                      background: (theme) =>
                        `${
                          justify === "start"
                            ? theme.palette.background.secondary
                            : "#0084FF"
                        }`,
                      padding: "5px 10px",
                      marginY: "1px",
                      color: (theme) =>
                        `${
                          justify === "start"
                            ? theme.palette.text.primary
                            : "#ffffff"
                        }`,
                      borderRadius: `${
                        justify === "start"
                          ? "5px 50px 50px 5px"
                          : "50px 5px 5px 50px"
                      }`,
                    }}
                  >
                    {message.text}
                  </Typography>
                </Box>
              </Tooltip>
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
};
export default Messages;
