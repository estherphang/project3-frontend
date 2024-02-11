import React from "react";
import { useState, useEffect } from "react";

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

import BasicModal from "./BasicModal";

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
    EmName: "I am the default EmName",
    EmDescription: "I am the default EmDescription",
  });

  useEffect(() => {
    console.log(EmFormData);
  }, [EmFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit button pressed");

    const storageRefInstance = storageRef(
      storage,
      DB_PROFILE_IMAGES_KEY + "/" + fileInputFile.name
    );

    try {
      uploadBytes(storageRefInstance, fileInputFile).then(() => {
        getDownloadURL(storageRefInstance).then((url) => {
          set(profilesRef, {
            name: profile.name,
            age: profile.age,
            occupation: profile.occupation,
            hobbies: profile.hobbies,
            smokingPreference: profile.smokingPreference,
            petFriendly: profile.petFriendly,
            url: url,
            peopleLiked: [""],
            peopleMatched: [""],
          });
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

  return (
    <div className="container">
      <p>Profile Creation</p>
      {/*Firebase storage stuff for the Employer Profile Picture here.*/}
      <CustomButton>Upload Image</CustomButton>

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

      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
    </div>
  );
}
