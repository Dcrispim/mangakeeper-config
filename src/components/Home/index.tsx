import React, { useState } from "react";
import { Col } from "react-bootstrap";
import HeaderMenu from "../HeaderMenu";
import MainContent from "../MainContent";
import SideMenu from "../SideMenu";
import { Container, Row } from "./styles";

const Home: React.FC = () => {
  const [chaps, setChaps] = useState({});

  return (
    <Container>
      <HeaderMenu />
      <MainContent />
    </Container>
  );
};

export default Home;
/* Object.keys(fantasy).map((title) => {
        const data = fantasy[title];
        return (
          <Row>
            <SliderItemContainer padding={8} key={key}>
              <a href={data.link} target="blank">
                <ThumbImg src={data.thumb} />
              </a>
              <TitleItem>
                <label>{"details"}</label>
              </TitleItem>
            </SliderItemContainer>
           <Col>
           <h2>{title} ({data.chapters})</h2>
           
           </Col>
          </Row>
        );
      }) */
