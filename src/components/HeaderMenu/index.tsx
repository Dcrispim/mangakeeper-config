import React from "react";
import i18n from "../../i18n";
import { Nav, Row } from "react-bootstrap";

import { Container } from "./styles";

const HeaderMenu: React.FC = () => {
  return (
    <Container className="">
      <Row className="justify-content-center">
        <img
          src="/mangakeeper-config/logo512.png"
          alt="Logo MangaKeeper Config"
        />
      </Row>
      <div className="menu-tabs">
        <Nav activeKey="/home">
          <Nav.Item>
            <Nav.Link href="#general" >{i18n("General")}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#tags" disabled>{i18n("Tags")}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#lists" disabled>{i18n("Lists")}</Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </Container>
  );
};

export default HeaderMenu;
