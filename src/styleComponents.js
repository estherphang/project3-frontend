import styled from "styled-components";
import { css } from "styled-components";

export const buttonStyle = css`
  color: rgb(244, 243, 238);
  background-color: rgb(119, 101, 227);

  &:hover {
    background-color: rgba(119, 101, 227, 0.9) !important;
    color: rgb(244, 243, 238) !important;
  }
`;

export const outlineButton = css`
  padding: 10px 20px;
  font-size: 16px;
  background-color: transparent;
  border: 3px solid rgb(188, 184, 177);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border 0.3s, box-shadow 0.3s;
  height: auto !important;

  &:hover {
    border: 3px solid rgb(119, 101, 227) !important;
    color: rgb(119, 101, 227) !important;
  }
`;

export const navImage = css`
  width: 28px !important;
  height: 28px !important;
  margin-top: 10px !important;
  border: 2px solid rgb(244, 243, 238) !important;
`;
