import { Loader, Center } from "@mantine/core";

export default function Spinner() {
  return (
    <Center maw={"100vw"} h={"100vh"} mx="auto">
      <Loader size="xl" variant="bars" />
    </Center>
  );
}
