import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useRouter } from "next/router";
import { Alert, Snackbar } from "@mui/material";
import Image from "next/image";
import { UserProvider, useUser } from "../../session/UserSession";
import { getUserByUid } from "../../util/EmployeeHandler";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        LinKasa
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {user, login ,logout} = useUser()

  async function isFoundEmail(email : string) {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length !== 0;
    } catch (err) {
      console.error("Error :", err);
      return false; 
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email').toString();
    const password = data.get('password').toString();
    

    const logdata = await fetchSignInMethodsForEmail(auth, email);
    console.log(logdata);

    const errorMsgOnSubmit = validateLoginCredential(email,password);
    if (errorMsgOnSubmit != null){
      setErrorMsg(errorMsgOnSubmit);
      setOpenSnackbar(true);
      return;
    }

    
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userObj = await getUserByUid(userCredential.user.uid);
      login(userCredential.user.uid,userObj['name'],userObj['role'])

      router.push("../home");
      console.log("User logged in:", userCredential.user);
    } catch (error) {

      console.log(await isFoundEmail(email))
      
      if (isFoundEmail(email)) setErrorMsg("Invalid credentials, please try again");
      // else setErrorMsg(getErrorMessage(error.message));
     
      setOpenSnackbar(true);
      console.error("Login error:", error.message);
    }

    console.log({
      email: email,
      password: password,
    });
  };

  const validateLoginCredential = (email : string,password : string) => {
    if (email === "") return "Email must not be empty!"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format!";
    if (password === "") return "Password must not be empty!"
    return null;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // console.log(window.location.href);



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
          src="/images/LinKasa-img.png"
          alt="none"
          width={"300"}
          height={"300"}
        />
          <Typography component="h1" variant="h2" fontFamily={"revert-layer"}>
            Log In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}>
              <Alert severity="error">{errorMsg}</Alert>
            </Snackbar>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="../Register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;