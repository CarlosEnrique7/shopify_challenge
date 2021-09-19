import React from "react";
import { makeStyles, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const Nav = () => {
  const useStyles = makeStyles({
    nav: {
      background: "#A64253",
      height: 50,
      width: "100vw",
      position: "absolute",
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 999,
    },
    title: {
      fontSize: 36,
      color: "#EFD6AC",
      marginLeft: "1rem",
    },
    navBtns: {
      display: "flex",
      justifyContent: "space-between",
    },
    btn: {
      color: "#EFD6AC",
      marginRight: "1rem",
    },
    link: {
      textDecoration: "none",
    },
  });

  const classes = useStyles();

  let location = useLocation();
  console.log(location.pathname);

  return (
    <div className={classes.nav}>
      <Typography variant="h4" className={classes.title}>
        Spacestagram
      </Typography>
      <div className={classes.navBtns}>
        {location.pathname === "/liked" ? (
          <Link to="/" className={classes.link}>
            <Button className={classes.btn}>Home</Button>
          </Link>
        ) : (
          <Link to="/liked" className={classes.link}>
            <Button className={classes.btn}>View Liked</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
