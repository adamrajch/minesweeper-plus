import { Container, Stack } from "@mantine/core";
import React from "react";
import Nav from "./Nav";

type Props = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: Props) {
  return (
    <>
      <Nav />
      <Container>
        <Stack
          align="stretch"
          justify="center"
          sx={(theme) => ({
            height: "100%",
          })}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
