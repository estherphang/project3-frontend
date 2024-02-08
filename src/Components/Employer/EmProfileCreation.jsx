import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";
import EditIcon from "@mui/icons-material/Edit";

import NestedModal from "./testModal";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

//Employers need to be able to input the following general info:
//name
//description
//photo

//Employers need to be able to input the following info when creating a job listing:
//name
//description
//job_responsibilities
//skill_set
//three of the best company_benefits this job has to offer

export default function EmProfileCreation() {
  //const [inputEmName, setInputEmName] = useState("")
  const [EmName, setEmName] = useState("");

  //const [inputEmDescription, setInputEmDescription] = useState("")
  const [EmDescription, setEmDescription] = useState("");

  const [EmFormData, setEmFormData] = useState({
    EmName: "",
    EmDescription: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //if it's the image upload button, send stuff to firebase storage.

    //if it's name/description stuff, just put it in State for now and figure out how to send stuff to database later
  };

  const handleChange = (e) => {
    //destructure the properties of the target component
    const { name, value, type } = e.target;

    setEmFormData((prevEmFormData) => ({
      ...prevEmFormData,
      [name]: [value],
    }));
  };

  return (
    <div className="container">
      <p>Create Profile</p>

      <NestedModal />
      {/*Firebase storage stuff for the Employer Profile Picture here.*/}

      <CustomButton
        onClick={() => console.log("I, a custom button, have been clicked.")}
      >
        Upload Image
      </CustomButton>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="EmName"
          value={EmFormData.EmName}
          onChange={handleChange}
        ></input>

        <input
          type="text"
          name="EmDescription"
          value={EmFormData.EmDescription}
          onChange={handleChange}
        ></input>

        <CustomButton type="submit">
          <EditIcon />
        </CustomButton>
      </form>
    </div>
  );
}
