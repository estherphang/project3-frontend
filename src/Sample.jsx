import React from "react";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
import EditIcon from "@mui/icons-material/Edit";
import BasicModal from "./Components/Employer/BasicModal";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

export default function Sample() {
  return (
    <div>
      <div className="container">
        <h1>h1</h1>
        <h1 className="box">h1</h1>
        <h2>h2</h2>
        <h2 className="box"> h2</h2>
        <h3>h3</h3>
        <h4 className="box">
          h4
          <icon>fake icon</icon>
        </h4>
        <p className="contentbox">paragraph for resume/jobs</p>
        <p>normal paragrah </p>
        <button className="button"> butoonnnn</button>
        <p>text field</p>

        <BasicModal />
      </div>
    </div>
  );
}
