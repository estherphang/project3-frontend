import { useState, useEffect } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfileEdu() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const { userID } = useUser();

  // Current education data
  const [eduModal, setEduModal] = useState(false);
  const [eduData, setEduData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  ("");

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

          const eduData = eduResponse.data;
          console.log(eduData);
          setEduData(eduData.map((item) => ({ ...item })));
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
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      const newEdu = {
        institution: newInstitution,
        degree: newDegree,
        fieldOfStudy: newMajor,
        graduationMonth: newGraduationMonth,
        graduationYear: newGraduationYear,
      };
      await axios.post(`${BACKEND_TALENT_URL}/${userID}/education`, newEdu, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

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

  const handleFieldChange = (index, fieldName, value) => {
    const updatedEduData = [...eduData];
    updatedEduData[index] = {
      ...updatedEduData[index],
      [fieldName]: value,
    };
    setEduData(updatedEduData);
  };

  const handleOpenCurrentEdu = (index) => {
    setEditItem(eduData[index]);
    setEditingIndex(index);
    setEduModal(true);
  };

  const handleCloseCurrentEdu = () => {
    setEduModal(false);
  };

  const handleSaveCurrentEdu = async () => {
    console.log("new  data to be sent:", eduData);
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      await axios.put(
        `${BACKEND_TALENT_URL}/${userID}/education`,
        { eduData },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("updated", eduData);
      console.log("Edu saved successfully!");
      setEditingIndex(null);
      setEditItem(null);
      setEduModal(false);
    } catch (error) {
      console.error("Error updating education:", error);
    }
  };

  const handleDelete = async (talentId, educationID) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      // Make a DELETE request to your backend endpoint
      console.log("edu.id", educationID);
      const response = await axios.delete(
        `${BACKEND_TALENT_URL}/${talentId}/education/${educationID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Fetch the updated skill data from the backend
      const updatedEduRes = await axios.get(
        `${BACKEND_TALENT_URL}/${talentId}/education`
      );

      // Update the state with the new skill data
      setEduData(updatedEduRes.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error deleting edu:", error);
    }
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

      {/* Display education */}
      <div className="contentbox">
        {eduData.map((edu, index) => (
          <div key={index}>
            <div className="textbar-container">
              <div className="title">
                <p className="wp-jobtitle2">{edu.degree}</p>
              </div>
              <div className="icons">
                <IconButton onClick={() => handleOpenCurrentEdu(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="icon"
                  onClick={() => handleDelete(userID, edu.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
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
        handleSave={handleSaveCurrentEdu}
        title="Edit Education"
      >
        {eduData.map((item, index) => (
          <div key={index}>
            {editingIndex === index && (
              <div>
                <SingleLineTextField
                  value={item.institution || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "institution", e.target.value)
                  }
                  label="Institution"
                />
                <SingleLineTextField
                  value={item.degree || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "degree", e.target.value)
                  }
                  label="Degree"
                />
                <SingleLineTextField
                  value={item.fieldOfStudy || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "fieldOfStudy", e.target.value)
                  }
                  label="Major"
                />
                <SingleLineTextField
                  value={item.graduationMonth || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "graduationMonth", e.target.value)
                  }
                  label="Graduation Month"
                />
                <SingleLineTextField
                  value={item.graduationYear || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "graduationYear", e.target.value)
                  }
                  label="Graduation Year"
                />
              </div>
            )}
          </div>
        ))}
      </PopUpModal>
    </>
  );
}
