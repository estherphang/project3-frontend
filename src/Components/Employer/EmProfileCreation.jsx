import React from "react";
import { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import { storage } from "../../firebase";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";

import EditIcon from "@mui/icons-material/Edit";

import BasicModal from "./BasicModal";
import { maxHeight, textAlign } from "@mui/system";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

//Employers need to be able to input the following general info:
//name
//description
//photo

export default function EmProfileCreation() {
  const [modalState, setModalState] = useState({
    openEmNameModal: false,
    openEmDescriptionModal: false,
  });

  const [EmFormData, setEmFormData] = useState({
    EmName: "Your Company Name",
    EmDescription: "Your Company Description",
  });

  const [fileInputFile, setFileInputFile] = useState({});
  const [imgurl, setImageUrl] = useState("");

  const DB_STORAGE_KEY = "comapny_image";

  useEffect(() => {
    console.log(fileInputFile);
  }, [fileInputFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handlesubmit called");

    const storageRefInstance = storageRef(
      storage,
      DB_STORAGE_KEY + "/" + fileInputFile.name
    );

    try {
      uploadBytes(storageRefInstance, fileInputFile).then(() => {
        getDownloadURL(storageRefInstance).then((url) => {
          setImageUrl(url);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  //if it's the image upload button, send stuff to firebase storage.
  //if it's name/description stuff, just put it in State for now and figure out how to send stuff to database later
  const handleModalOpen = (modalName) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
  };

  const SubmitToBackend = () => {
    //send the Emdata to the backend.
  };

  return (
    <div className="container">
      <div className="company-img-div">
        <h1>Profile Creation</h1>
        {/*Firebase storage stuff for the Employer Profile Picture here.*/}
        <img src={imgurl} alt="Upload a profile image!" />
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => setFileInputFile(e.target.files[0])}
          ></input>

          <br />

          <CustomButton htmlType="submit">Upload Image</CustomButton>
        </form>
      </div>

      <BasicModal
        modaltitle="Enter Company Name:"
        modaldescription=""
        open={modalState.openEmNameModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openEmNameModal: value })
        }
        propertyname="EmName"
        passedInState={EmFormData}
        setPassedInState={setEmFormData}
      ></BasicModal>

      <h3 className="box">
        Company Name
        <CustomButton onClick={() => handleModalOpen("openEmNameModal")}>
          <EditIcon />
        </CustomButton>
      </h3>
      <h3>{EmFormData.EmName}</h3>

      <h3 className="box">
        About The Company
        <CustomButton onClick={() => handleModalOpen("openEmDescriptionModal")}>
          <EditIcon />
        </CustomButton>
      </h3>

      <BasicModal
        modaltitle="Enter Company Description:"
        modaldescription=""
        open={modalState.openEmDescriptionModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openEmDescriptionModal: value })
        }
        propertyname="EmDescription"
        passedInState={EmFormData}
        setPassedInState={setEmFormData}
      ></BasicModal>

      <h3>{EmFormData.EmDescription}</h3>

      <CustomButton className="center" onClick={SubmitToBackend}>
        Submit
      </CustomButton>

      <CustomButton className="right">
        <Link to="/employer/joblisting/create">Next</Link>
      </CustomButton>
    </div>
  );
}
//setFileInputFile(e.target.files[0])
