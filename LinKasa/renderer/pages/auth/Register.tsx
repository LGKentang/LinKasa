import React, { useState } from "react";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Head from "next/head";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase";
import Link from "../../components/Link";
import { useRouter } from "next/router";
import {allRoles} from '../../util/DepartmentHandler';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerRole, setRegisterRole] = useState("Customer Service Manager");
  


  const registerUser = async () => {
    console.log("wow");

    if (registerRole === "") return;
    if (registerName === "") return;
    if (registerEmail === "") return;
    // if (!isUniqueEmail(registerEmail)) return;

    try {
      createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        .then((userCredential) => {
          setDoc(doc(db, "users", userCredential.user.uid), {
            name: registerName,
            role: registerRole,
            email: registerEmail,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          console.log(errorCode);
        });
    } catch (error) {
      console.log("Error registering user:", error.message);
    }
  };

  return (
    <React.Fragment>
      {/* <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}> */}
          <Paper elevation={3} style={{ padding: 20 }}>
            <Typography padding={1} fontSize={20}>
              Add New Employee
            </Typography>

            <Box sx={{ marginBottom: 2 }}>
              <TextField
                name="Name"
                label="Name"
                type="name"
                fullWidth
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <TextField
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </Box>

            <Box sx={{ marginBottom: 2 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={registerRole}
                label="Role"
                onChange={(e) => setRegisterRole(e.target.value)}
                defaultValue=""
              >
                {
                  allRoles.map((e)=>(
                    <MenuItem key={e} value={e}>
                    {e}
                  </MenuItem>
                  ))
                }
                
              </Select>
            </Box>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={registerUser}
            >
              Add New Employee
            </Button>
          </Paper>
        {/* </Grid>
      </Grid> */}


      {/* <Link href="Login">Already have an account?</Link> */}
    </React.Fragment>
  );
};

export default Register;
