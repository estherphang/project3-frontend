import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";
import { PopUpModal, SingleLineTextField } from "../../../MUIComponents";
import { BACKEND_TALENT_URL } from "../../../../constants";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { editIcon } from "../../../styleComponents";

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfileEdu() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();

  // Current education data
  const [eduModal, setEduModal] = useState(false);
  const [eduData, setEduData] = useState([]);

  // State for new education modal
  const [newEduModal, setNewEduModal] = useState(false);
  // State for new education form fields
  const [newInstitution, setNewInstitution] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newMajor, setMajor] = useState("");
  const [newGraduationMonth, setNewGraduationMonth] = useState("");
  const [newGraduationYear, setNewGraduationYear] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchEducation = async () => {
        try {
          const eduResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/education`
          );
          setEduData(eduResponse.data);
        } catch (error) {
          console.error("Error fetching education:", error);
        }
      };
      fetchEducation();
    }
  }, [isAuthenticated, userID]);

  const handleOpenNewEduModal = () => {
    setNewEduModal(true);
  };

  const handleCloseNewEduModal = () => {
    setNewEduModal(false);
  };

  const handleSaveNewEdu = async () => {
    try {
      const newEdu = {
        institution: newInstitution,
        degree: newDegree,
        fieldOfStudy: newMajor,
        graduationMonth: newGraduationMonth,
        graduationYear: newGraduationYear,
      };
      await axios.post(`${BACKEND_TALENT_URL}/${userID}/education`, newEdu);

      // After saving, refetch the education data to update the UI
      const updatedEduResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${userID}/education`
      );
      setEduData(updatedEduResponse.data);

      // Reset the form fields
      setNewInstitution("");
      setNewDegree("");
      setMajor("");
      setNewGraduationMonth("");
      setNewGraduationYear("");
      setNewEduModal(false);

      console.log("New education added successfully!");
    } catch (error) {
      console.error("Error adding new education:", error);
    }
  };

  //CURRENT  MODAL

  const handleOpenCurrentEdu = () => {
    setEduModal(true);
  };

  const handleCloseCurrentEdu = () => {
    setEduModal(false);
  };

  return (
    <>
      <div className="">
        <h3 className="box">
          Education
          <CustomIcon onClick={handleOpenNewEduModal}>
            {" "}
            <AddIcon />
          </CustomIcon>
        </h3>

        <PopUpModal
          open={newEduModal}
          handleClose={handleCloseNewEduModal}
          handleSave={handleSaveNewEdu}
          title="Add Education"
        >
          <SingleLineTextField
            required={true}
            label="Institution"
            value={newInstitution}
            onChange={(e) => setNewInstitution(e.target.value)}
          />
          <SingleLineTextField
            required={true}
            label="Degree"
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
          />
          <SingleLineTextField
            required={true}
            label="Major"
            value={newMajor}
            onChange={(e) => setMajor(e.target.value)}
          />
          <SingleLineTextField
            label="Graduation Month"
            value={newGraduationMonth}
            onChange={(e) => setNewGraduationMonth(e.target.value)}
          />
          <SingleLineTextField
            label="Graduation Year"
            value={newGraduationYear}
            onChange={(e) => setNewGraduationYear(e.target.value)}
          />
        </PopUpModal>
      </div>

      {/* display education */}
      <div className="contentbox">
        {eduData.map((edu, index) => (
          <div key={index}>
            <div className="whitebox">
              <p className="wp-jobtitle2">{edu.degree}</p>
              <IconButton onClick={handleOpenCurrentEdu}>
                <EditIcon />
              </IconButton>
            </div>
            <p className="wp-company">{edu.institution}</p>
            <p>Major: {edu.fieldOfStudy}</p>
            <p className="wp-duration">
              Graduation date: {edu.graduationMonth} {edu.graduationYear}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <PopUpModal
        open={eduModal}
        handleClose={handleCloseCurrentEdu}
        // handleSave={}
        title="Edit Education"
      >
        <SingleLineTextField
          // value={item.endYear || ""}
          required={true}
          // onChange={(e) => handleFieldChange(index, "endYear", e.target.value)}
          label="Institution"
        />
        <SingleLineTextField
          // value={item.endYear || ""}
          required={true}
          // onChange={(e) => handleFieldChange(index, "endYear", e.target.value)}
          label="Degree"
        />
        <SingleLineTextField
          // value={item.endYear || ""}
          required={true}
          // onChange={(e) => handleFieldChange(index, "endYear", e.target.value)}
          label="Major"
        />{" "}
        <SingleLineTextField
          // value={item.endYear || ""}
          required={true}
          // onChange={(e) => handleFieldChange(index, "endYear", e.target.value)}
          label="Graduation Month"
        />{" "}
        <SingleLineTextField
          // value={item.endYear || ""}
          required={true}
          // onChange={(e) => handleFieldChange(index, "endYear", e.target.value)}
          label="Graduation Year"
        />
      </PopUpModal>
    </>
  );
}
