import { useState, useContext } from "react";
import { AuthContext } from "@/utils/authContext";
import Image from "next/image";
import allValidator from "@/utils/textValidator";
import {
  Alert,
  IconButton,
  InputAdornment,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Container,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegisterComponent = (props) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [passCheck, setPassCheck] = useState(false);
  const [text1Check, setText1Check] = useState(false);
  const [text2Check, setText2Check] = useState(false);
  const [regError, setRegError] = useState(null);
  const [user, setUser] = useContext(AuthContext);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {
    setRegError(false);
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    let allData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
    };

    if (text1Check || text2Check || emailCheck || passCheck) {
      return null;
    }

    let stop = false;
    if (!allData.firstName) {
      setText1Check(true);
      stop = true;
    }
    if (!allData.lastName) {
      setText2Check(true);
      stop = true;
    }
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
      username: allData.firstName + allData.lastName,
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
      let myRequest = await fetch(`${url}users`, {
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
      if (error.message == "Email already in use") {
        setRegError("This email is registered with another account!");
      } else {
        setRegError("Registeration failed due to some error!");
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
        <div className="flex flex-col items-center mb-3">
          <div className="relative overflow-hidden rounded-full mb-2 bg-blue-800 p-2">
            <Image
              src="/logoTransparent.jpeg"
              alt="logo"
              width={100}
              height={100}
            />
          </div>
          <p className="text-xl md:text-2xl font-bold tracking-wide">Sign up</p>
        </div>
        {regError ? (
          <Alert
            severity="error"
            className="w-full justify-center mb-3 text-xs md:text-base"
          >
            {regError}
          </Alert>
        ) : null}
        <Box
          component="form"
          id="form"
          name="form"
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className="mt-0 md:mt-2"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => {
                  allValidator("text", setText1Check, event);
                }}
                helperText={text1Check ? "min 3 characters" : " "}
                error={text1Check}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className="mt-0 md:mt-2"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(event) => {
                  allValidator("text", setText2Check, event);
                }}
                helperText={text2Check ? "min 3 characters" : " "}
                error={text2Check}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="mt-0"
                type="email"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => {
                  allValidator("email", setEmailCheck, event);
                }}
                helperText={emailCheck ? "Please enter a valid email" : " "}
                error={emailCheck}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="mt-0"
                required
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="new-password"
                type={showPassword ? "text" : "password"}
                onChange={(event) => {
                  allValidator("password", setPassCheck, event);
                }}
                helperText={
                  passCheck
                    ? `Password must have atleast
                  length(8-20), 1 letter & 1 number`
                    : " "
                }
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
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            className="bg-blue-700 hover:bg-blue-500 mt-3 mb-2 text-xs md:text-base"
            variant="contained"
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                <button
                  onClick={() => {
                    props.onclick(false);
                  }}
                  className="text-xs md:text-base"
                >
                  Already have an account? Sign in
                </button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterComponent;
