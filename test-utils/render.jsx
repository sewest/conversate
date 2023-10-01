//Custom render function for testing with mantine
//https://v7.mantine.dev/guides/jest
import React from "react";
import { render as testingLibraryRender } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";

// Import your theme object
import { theme } from "../src/theme";
export function render(ui) {
  return testingLibraryRender(React.createElement(React.Fragment, null, ui), {
    wrapper: function ({ children }) {
      return React.createElement(MantineProvider, { theme: theme }, children);
    },
  });
}
