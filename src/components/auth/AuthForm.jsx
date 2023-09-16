//TODO: Form submissions belong in loaders
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TextInput, Title, Button, Box, createStyles, Stack, Divider, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FirebaseError } from "firebase/app";

const handleSubmit = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    console.log(user);
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      alert("Invalid email");
    } else if (error.code === "auth/missing-password") {
      alert("Missing password");
    } else if (error instanceof FirebaseError) {
      alert("An unknown error occurred while trying to sign up");
    }
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }
};

export default function AuthForm() {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 8 ? null : "Password must be longer than 8 characters"),
    },
  });

  return (
    <Paper className={classes.paper}>
      <Title className={classes.title} order={1}>
        Sign up
      </Title>
      <form className={classes.form} onSubmit={form.onSubmit((values) => handleSubmit(values.email, values.password))}>
        <TextInput className={classes.input} withAsterisk aria-label="Email" placeholder="Email address" {...form.getInputProps("email")} />

        <TextInput className={classes.input} withAsterisk aria-label="Password" placeholder="Password" {...form.getInputProps("password")} />

        <Stack className={classes.stack}>
          <Button className={classes.button} type="submit">
            Sign up
          </Button>
          <Button className={classes.button} variant="subtle" compact>
            Forgot password?
          </Button>
          <Divider className={classes.divider} />
          <Button className={classes.button} variant="outline">
            Sign in
          </Button>
        </Stack>
      </form>
    </Paper>
  );
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
