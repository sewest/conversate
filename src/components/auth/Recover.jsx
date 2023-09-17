import { Link } from "react-router-dom";
import { TextInput, Title, Button, Stack, Divider, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";

export default function Recover({ classes, handleRecover }) {
  const form = useForm({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (values) => {
    handleRecover(values.email);
  };

  return (
    <Paper className={classes.paper}>
      <Title order={1} className={classes.title}>
        Recover Password
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
        <TextInput withAsterisk aria-label="Email" placeholder="Email address" {...form.getInputProps("email")} className={classes.input} />
        <Stack className={classes.stack}>
          <Button type="submit" className={classes.button}>
            Recover password
          </Button>
          <Divider className={classes.divider} />
          <Button component={Link} to="/auth/login" variant="outline" className={classes.button}>
            Login
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}
