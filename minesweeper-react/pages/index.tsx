import type { NextPage } from "next";
import Game from "../components/Game";
import Wrapper from "../components/Layout/Wrapper";

const Home: NextPage = () => {
  return (
    <Wrapper>
      <Game />
    </Wrapper>
  );
};

export default Home;
