import { Checkbox, Group, Table } from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import Game from "../components/Game";
import Wrapper from "../components/Layout/Wrapper";
import { Difficulties, Difficulty } from "../types";

const Home: NextPage = () => {
  const [diff, setDiff] = useState<Difficulty>(Difficulties[0]);

  const tableRows = Difficulties.map((element, i) => (
    <tr key={element.name}>
      <td>
        <Group>
          <Checkbox
            checked={diff.name === element.name}
            onChange={() => setDiff(Difficulties[i])}
          />
          {element.name}
        </Group>
      </td>
      <td>{element.rows}</td>
      <td>{element.cols}</td>
      <td>{element.numMines}</td>
    </tr>
  ));

  return (
    <Wrapper>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>height</th>
            <th>width</th>
            <th>mines</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
      <Game diff={diff} />
    </Wrapper>
  );
};

export default Home;
