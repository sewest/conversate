import { Button } from "@mantine/core";
import { handleSignOut } from "../firebase/firebaseAuth";

export default function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
}
