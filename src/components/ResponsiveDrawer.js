import React, { useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { Button, Grid, Modal } from "@material-ui/core";
import { useModalState } from "../misc/custom-hooks";
import Dashboard from "./Dashboard";
import { auth } from "../misc/firebase";
import CreateRoom from "./CreateRoom";
import ChatRoomList from "./rooms/ChatRoomList";
import Chat from "./rooms/Chat";
import AvatarProfile from "./AvatarProfile";
import { useProfile } from "../context/profile.context";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const drawerWidth = "35%";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: "35%",
    backgroundColor: "#212121",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  conversation: {
    margin: "1em auto",
    textAlign: "center",
  },
  buttonGrid: {
    margin: "1em auto",
  },
  name: {
    fontSize: "2em",
  },
  profile: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
}));

function ResponsiveDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [opening, setOpening] = useState(false);
  const { profile } = useProfile();

  const handleDrawerOpen = () => {
    setOpening(true);
  };

  const handleDrawerClose = () => {
    setOpening(false);
  };

  const { isOpen, open, close } = useModalState();

  const onSignOut = useCallback(() => {
    auth.signOut();

    alert("Signed out");
    close();
  }, [close]);

  const drawer = (
    <div>
      {/* <div className={classes.toolbar} /> */}
      <Divider />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.buttonGrid}
      >
        <p className={classes.name}>Hey, {profile.name}</p>
        <AvatarProfile
          className={classes.profile}
          src={profile.avatar}
          name={profile.name}
        />
        <Button color="primary" onClick={open}>
          Dashboard
        </Button>
        <Modal open={isOpen} onClose={close} className={classes.modal}>
          <Dashboard onSignOut={onSignOut} />
        </Modal>
        <CreateRoom />
      </Grid>
      <Divider />
      <Typography variant="h6" className={classes.conversation}>
        CONVERSATIONS
      </Typography>
      <ChatRoomList />
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: opening,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, opening && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={opening}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        {drawer}
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Chat />
      </main>
    </div>
  );
}

export default ResponsiveDrawer;
