import { useContext, useState } from "react";
import Image from "next/image";
import allValidator from "@/utils/textValidator";
import { AuthContext } from "@/utils/authContext";
import {
  Alert,
  IconButton,
  InputAdornment,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginComponent = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [user, setUser] = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    setLoginError(false);
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    let allData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    if (emailCheck || passCheck) {
      return null;
    }

    let stop = false;
    if (!allData.email) {
      setEmailCheck(true);
      stop = true;
    }
    if (!allData.password) {
      setPassCheck(true);
      stop = true;
    }
    if (stop) {
      return null;
    }
    setLoading(true);

    let reqBody = {
      email: allData.email,
      password: allData.password,
    };

    // After Validation
    try {
      let url = process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : process.env.BACKEND_URL
        ? process.env.BACKEND_URL
        : "http://localhost:3001/";
      let myRequest = await fetch(`${url}users/login`, {
        body: JSON.stringify(reqBody),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      let res = await myRequest.json();

      if (res.error) {
        throw res;
      }

      setUser(res.user);
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (error) {
      if (error.message == "This email doesn't Exist") {
        setLoginError("This email is not registered with our services");
      } else if (error.message == "Password is not valid") {
        setLoginError("Password is incorrect. Please try again!");
      } else {
        setLoginError("Login failed due to some error!");
      }
    }
    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="bg-white rounded-xl shadow-2xl shadow-[#9be1ff] border-4 border-[#3680ff] ring-4 ring-[#4ba6d4] py-8"
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col items-center md:mb-3">
          <div className="relative overflow-hidden rounded-full mb-2 bg-blue-800 p-2">
            <Image
              src="/logoTransparent.jpeg"
              alt="logo"
              height={100}
              width={100}
            />
          </div>
          <p className="text-xl md:text-2xl font-bold tracking-wide">Sign In</p>
        </div>

        {loginError ? (
          <Alert
            severity="error"
            className="w-full justify-center text-center md:text-base text-xs md:mb-3"
          >
            {loginError}
          </Alert>
        ) : null}
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            className="mt-0 md:mt-2"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            onChange={(event) => {
              allValidator("email", setEmailCheck, event);
            }}
            helperText={emailCheck ? "Please enter a valid email" : " "}
            error={emailCheck}
          />
          <TextField
            className="mt-0"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            id="password"
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            onChange={(event) => {
              allValidator("not-null", setPassCheck, event);
            }}
            helperText={passCheck ? "Cannot be empty" : ""}
            error={passCheck}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            sx={{ height: 16 }}
            control={
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
                value={0}
                color="primary"
              />
            }
            label={<div className="text-xs md:text-base">Remember me</div>}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            className="bg-blue-700 hover:bg-blue-500 mt-3 mb-2 text-xs md:text-base"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                className="no-underline text-xs md:text-base"
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                <button
                  className="text-xs md:text-base"
                  onClick={() => {
                    props.onclick(true);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginComponent;
