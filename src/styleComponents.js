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

export const reversedOutlineButton = css`
  padding: 10px 20px;
  margin-top: 20px;
  margin-right: 20px;
  font-size: 16px;
  background-color: transparent;
  color: rgb(119, 101, 227);
  border: 3px solid rgb(119, 101, 227); /* Purple border */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, border 0.3s, box-shadow 0.3s;
  height: auto !important;
  width: 100%; /* Make button width fit its content */

  &:hover {
    border: 3px solid rgb(188, 184, 177) !important; /* Grey border on hover */
    color: rgb(188, 184, 177) !important; /* Grey text on hover */
  }
`;

export const navImage = css`
  width: 28px !important;
  height: 28px !important;
  margin-top: 10px !important;
  border: 2px solid rgb(244, 243, 238) !important;
`;

export const profileImage = css`
  width: 120px !important;
  height: 120px !important;
  margin-top: 10px !important;
`;

export const editIcon = css`
  color: rgb(244, 243, 238) !important;
  margin: 0px !important;
  padding: 0px !important;
`;

// MUI POP UP MODAL
