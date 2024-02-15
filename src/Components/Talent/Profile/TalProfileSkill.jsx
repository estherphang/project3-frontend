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

export default function TalProfileSkill() {
  const { isAuthenticated } = useAuth0();
  const { userID } = useUser();

  //current data
  const [skillModal, setSkillModal] = useState(false);
  const [skillData, setSkillData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editItem, setEditItem] = useState(null);
  ("");

  //new skill set
  const [newSkillModal, setNewSkillModal] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newProficiencyLevel, setNewProficiencyLevel] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchSkills = async () => {
        try {
          const skillResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/skill`
          );

          const skillData = skillResponse.data;
          console.log("skilldata", skillData);
          setSkillData(skillData.map((item) => ({ ...item })));
        } catch (error) {
          console.error("Error fetching skills:", error);
        }
      };
      fetchSkills();
    }
  }, [isAuthenticated, userID]);

  const handleOpenNewSkill = () => {
    setNewSkillModal(true);
  };

  const handleCloseNewSkill = () => {
    setNewSkillModal(false);
  };

  const handleSaveNewSkill = async () => {
    try {
      await axios.post(`${BACKEND_TALENT_URL}/${userID}/skill`, {
        skill: newSkill,
        proficiencyLevel: newProficiencyLevel,
      });

      // After saving, refetch the skills to update the UI
      const updatedSkillResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${userID}/skill`
      );
      setSkillData(updatedSkillResponse.data);

      // Reset the input fields
      setNewSkill("");
      setNewProficiencyLevel("");
      setNewSkillModal(false);

      console.log("New skill added successfully!");
    } catch (error) {
      console.error("Error adding new skill:", error);
    }
  };

  //CURRENT SKILL SET MODAL

  const handleFieldChange = (index, fieldName, value) => {
    const updatedSkillData = [...skillData];
    updatedSkillData[index] = {
      ...updatedSkillData[index],
      [fieldName]: value,
    };
    setSkillData(updatedSkillData);
  };

  const handleOpenCurrentSkill = (index) => {
    setEditItem(skillData[index]);
    setEditingIndex(index);
    setSkillModal(true);
  };

  const handleCloseCurrentSKill = () => {
    setSkillModal(false);
  };

  const handleSaveCurrentSkill = async () => {
    console.log("new  data to be sent:", skillData);
    // Save work experience data to the backend
    try {
      await axios.put(`${BACKEND_TALENT_URL}/${userID}/skill`, {
        skillData,
      });
      //use array
      console.log("updated file", skillData);
      console.log("Skill saved successfully!");
      setEditingIndex(null); // Reset editingIndex after saving
      setEditItem(null); // Reset editItem after saving
      setSkillModal(false);
    } catch (error) {
      console.error("Error saving work experience:", error);
    }
  };

  const handleDelete = async (talentId, skillId) => {
    try {
      // Make a DELETE request to your backend endpoint
      console.log("skill.id", skillId);
      const response = await axios.delete(
        `${BACKEND_TALENT_URL}/${talentId}/skill/${skillId}`
      );

      // Fetch the updated skill data from the backend
      const updatedSkillResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${talentId}/skill`
      );

      // Update the state with the new skill data
      setSkillData(updatedSkillResponse.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error deleting skill set:", error);
    }
  };

  return (
    <>
      <div className="">
        <h3 className="box">
          Skill Sets
          <CustomIcon onClick={handleOpenNewSkill}>
            {" "}
            <AddIcon />
          </CustomIcon>
        </h3>

        <PopUpModal
          open={newSkillModal}
          handleClose={handleCloseNewSkill}
          handleSave={handleSaveNewSkill}
          title="Add Skill Set"
        >
          <SingleLineTextField
            label="Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <SingleLineTextField
            label="Proficiency Level"
            value={newProficiencyLevel}
            onChange={(e) => setNewProficiencyLevel(e.target.value)}
          />
        </PopUpModal>
      </div>

      {/* Display skills */}
      <div className="contentbox">
        {skillData.map((skill, index) => (
          <div key={index}>
            <div className="textbar-container">
              <div className="title">
                <p className="wp-jobtitle2">{skill.skill}</p>
              </div>
              <div className="icons">
                <IconButton
                  className="icon"
                  onClick={() => handleOpenCurrentSkill(index)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="icon"
                  onClick={() => handleDelete(userID, skill.id)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </div>
            </div>
            <p className="wp-level">
              Proficiency Level: {skill.proficiencyLevel}
            </p>
            <hr />
          </div>
        ))}
      </div>
      <PopUpModal
        open={skillModal}
        handleClose={handleCloseCurrentSKill}
        handleSave={handleSaveCurrentSkill}
        title="Edit Skill Set"
      >
        {skillData.map((item, index) => (
          <div key={index}>
            {editingIndex === index && (
              <div>
                <SingleLineTextField
                  value={item.skill || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "skill", e.target.value)
                  }
                  label="Skill"
                />
                <SingleLineTextField
                  value={item.proficiencyLevel || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "proficiencyLevel", e.target.value)
                  }
                  label="Proficiency Level"
                />
              </div>
            )}
          </div>
        ))}
      </PopUpModal>
    </>
  );
}
