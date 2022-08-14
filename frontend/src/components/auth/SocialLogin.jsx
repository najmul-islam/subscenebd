import { Button, Stack } from "@mui/material";
// assets
import Google from "./icons/google.svg";
import Twitter from "./icons/twitter.svg";
import Facebook from "./icons/facebook.svg";

const SocialLogin = () => {
  const googleHandler = async () => {
    // login || singup
  };

  const twitterHandler = async () => {
    // login || singup
  };

  const facebookHandler = async () => {
    // login || singup
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={<img src={Google} alt="Google" />}
        onClick={googleHandler}
      >
        Google
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={<img src={Twitter} alt="Twitter" />}
        onClick={twitterHandler}
      >
        Twitter
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={<img src={Facebook} alt="Facebook" />}
        onClick={facebookHandler}
      >
        Facebook
      </Button>
    </Stack>
  );
};

export default SocialLogin;
