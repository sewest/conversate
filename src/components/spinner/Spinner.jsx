import { Loader, Center } from "@mantine/core";

export default function Spinner() {
  return (
    <Center maw={"100vw"} h={"100vh"} mx="auto">
      <Loader data-testid="loading-spinner" size="xl" variant="bars" />
    </Center>
  );
}
