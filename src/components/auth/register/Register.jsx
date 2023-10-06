import { Link } from "react-router-dom";
import { TextInput, Title, Button, Stack, Divider, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "../authForm.module.css";

export default function Register({ handleRegister }) {
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

  const handleSubmit = (values) => {
    handleRegister(values.email, values.password);
  };

  return (
    <Paper className={classes.paper}>
      <Title className={classes.title}>Register</Title>

      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
        <TextInput withAsterisk aria-label="Email" placeholder="Email address" {...form.getInputProps("email")} className={classes.input} />
        <TextInput withAsterisk aria-label="Password" placeholder="Password" {...form.getInputProps("password")} className={classes.input} />
        <Stack className={classes.stack}>
          <Button type="submit" className={classes.button}>
            Register
          </Button>
          <Divider className={classes.divider} />
          <Button component={Link} to="/auth/login" variant="outline" className={classes.button}>
            Login
          </Button>
          <Button component={Link} to="/auth/recover" variant="outline" className={classes.button}>
            Forgot password?
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
