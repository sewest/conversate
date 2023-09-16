import { useRouteError, Link } from "react-router-dom";
import { Button } from "@mantine/core";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Uh Oh!</h1>
      <p>Sorry, but an error has occurred:</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button component={Link} to="/" variant="outline">
        Return home or Log in
      </Button>
    </div>
  );
}
