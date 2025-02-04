import { Backdrop, CircularProgress, Container } from "@material-ui/core";
import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Backdrop open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Container>
    );
  }
  if (!profile && !isLoading) {
    return <Redirect to="/signin" />;
  }

  return <Route {...routeProps}>{children}</Route>;
};

export default PrivateRoute;
