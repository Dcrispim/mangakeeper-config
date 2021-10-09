/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Col } from "react-bootstrap";
import i18n from "../../i18n";

import { Container } from "./styles";

const SideMenu: React.FC = ({ tab, onChange }) => {
  return (
    <ul className="list-group col-12 col-md-2 ml-2  ">
      <li
      
        onClick={() => onChange("home")}
        className={`list-group-item disabled ${tab === "home" ? "active" : ""}`}
      >
        {i18n("Home Page")}
      </li>
      <li
        onClick={() => onChange("import")}
        className={`list-group-item ${tab === "import" ? "active" : ""}`}
      >
        {i18n("Import")}
      </li>
      <li
        onClick={() => onChange("download")}
        className={`list-group-item  ${tab === "download" ? "active" : ""}`}
      >
        {i18n("Download")}
      </li>
    </ul>
  );
};

export default SideMenu;
