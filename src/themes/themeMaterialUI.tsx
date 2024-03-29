import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";
import { createTheme } from "@mui/material";
import React from "react";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  return <RouterLink ref={ref} to={href} {...other} />;
});

export const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
  palette: {
    primary: {
      main: "#439A97",
    },
    secondary: {
      main: "#BAE2BE",
    },
    text: {
      primary: "#010E1D",
    },
    background: {
      default: "#F5F5FF",
    },
  },
  typography: {
    fontFamily: "Roboto",
  },
});

theme.typography.h1 = {
  fontSize: "3rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "6rem",
  },
};
