import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import { GridItem } from "./DashboardBuilder";
// import Deposits from './Deposits';
import Orders from "./Orders";
import Register from "../auth/Register";
import ChatRoom from "../chat/ChatRoom";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import { Router } from "react-router-dom";
import { useRouter } from "next/router";
import { useUser } from "../../session/UserSession";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import { getUserFromCookie } from "../../session/UserSession";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Image from "next/image";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth: number = 200;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const defaultTheme = createTheme();

export default function Dashboard({ title, children, listItems }) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();
  const { user, login, logout } = useUser();

  React.useEffect(() => {
    if (!getUserFromCookie()) router.push("../auth/Login");
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    router.push("../auth/Login");
    logout();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          sx={{
            backgroundColor: "transparent",
            boxShadow: "none",
            width: `calc(100% - ${drawerWidth}px)`,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              component="h1"
              variant="h4"
              fontWeight={800}
              color="black"
              noWrap
              sx={{ marginLeft: "20px" }}
              fontFamily={"Montserrat"}
            >
              {title}
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="warning">
                <NotificationsIcon style={{ color: "black" }} />
              </Badge>
            </IconButton>
          </Toolbar>
          <Divider></Divider>
        </AppBar>

        {/* // !!!!!!!! buat drawernya bagus */}

        <Drawer
          variant="permanent"
          open={true}
          sx={{ width: drawerWidth, flexShrink: 0 }}
        >
          {/*  kasih logo disini */}
          <Grid sx={{ width: drawerWidth, height: "60px" }}>
            <div style={{ gap:'7px', display:'flex',width: "100%", height: "inherit", alignItems:'center', justifyContent:'center' , backgroundColor:''}}>
              <Image
                src="/images/plane-logo.png"
                alt="none"
                width={"60"}
                height={"40"}
              ></Image>
              <Typography sx={{fontFamily:"Montserrat", fontWeight:"900", fontSize:'24px'}}>
                LinKasa
              </Typography>
            </div>
          </Grid>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "120px",
            }}
          >
            <Paper sx={{ width: "80%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  margin: "5px",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography sx={{ fontFamily: "Montserrat" }}>
                  Welcome,
                </Typography>
                <Paper
                  sx={{
                    marginLeft: "6px",
                    padding: "3px",
                    backgroundColor: "#4e8cd9",
                    maxWidth: "100%",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: 700,
                      color: "white",
                      wordWrap: "break-word",
                    }}
                  >
                    {user
                      ? user.name.length > 17
                        ? user.name.slice(0, 14) + "..."
                        : user.name
                      : "Loading..."}
                  </Typography>
                </Paper>

                <div
                  style={{
                    width: "90%",
                    marginTop: "10px",
                    marginLeft: "4px",
                    paddingLeft: "6px",
                    padding: "4px",
                    // border: "1px solid black",
                    borderRadius: "200px",
                    display: "flex",
                    gap: "6px",
                    alignItems: "start",
                  }}
                >
                  <div style={{ width: "70%" }}>
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                      }}
                    >
                      {/* 22 */}
                      {user ? user.role : "Loading.."}
                    </Typography>
                  </div>

                  <div
                    style={{
                      height: "80%",
                      width: "auto",
                      paddingLeft: "6px",
                      paddingRight: "6px",
                      border: "1px solid black",
                      borderRadius: "200px",
                    }}
                  >
                    <BusinessCenterIcon sx={{ width: "16px" }} />
                  </div>
                </div>
              </div>
            </Paper>
          </div>

          <List component="nav">
            <React.Fragment>{listItems}</React.Fragment>

            {secondaryListItems}
          </List>
          <div style={{ flexGrow: 1 }}></div>

          <IconButton onClick={handleLogout}>
            <LogoutOutlined>Logout</LogoutOutlined>
          </IconButton>
        </Drawer>

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
          className="scrollbar-custom"
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
          <ChatRoom></ChatRoom>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
