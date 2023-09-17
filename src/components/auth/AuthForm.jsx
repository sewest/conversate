import { useParams } from "react-router-dom";
import { createStyles } from "@mantine/core";
import Register from "./Register";
import Login from "./Login";
import Recover from "./Recover";

export default function AuthForm({ handleLogin, handleRecover, handleRegister }) {
  const { authType } = useParams();
  const { classes } = useStyles();

  switch (authType) {
    case "register":
      return <Register classes={classes} handleRegister={handleRegister} />;
    case "login":
      return <Login classes={classes} handleLogin={handleLogin} />;
    case "recover":
      return <Recover classes={classes} handleRecover={handleRecover} />;
    default:
      throw new Error("404 Page not found");
  }
}

const useStyles = createStyles((theme) => ({
  paper: {
    padding: theme.spacing.md,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: theme.spacing.xl,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: theme.spacing.xs,
    maxWidth: 200,
  },
  input: {
    width: "100%",
  },
  stack: {
    width: "100%",
    gap: theme.spacing.sm,
  },
  divider: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
}));
