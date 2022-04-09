import {
  Button,
  Group,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import React from "react";

type Props = {};

export default function Nav() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Group position="apart" grow>
      <Text>ARDev</Text>
      <Title align="center">Minsweeper Plus</Title>
      <Group position="right">
        <Button onClick={() => toggleColorScheme()}>ColorMode</Button>
        <Button>Settings</Button>
      </Group>
    </Group>
  );
}
