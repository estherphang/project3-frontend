import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useUser } from "../../Context/UserContext";
import {
  PopUpModal,
  MultilineTextFields,
  SingleLineTextField,
} from "../../../MUIComponents";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { editIcon } from "../../../styleComponents";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

const BACKEND_TALENT_URL = import.meta.env.VITE_SOME_BACKEND_TALENT_URL;

export default function TalProfileWorkExp() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const { userID } = useUser();

  const [workExpModal, setWorkExpModal] = useState(false);
  const [workExpData, setWorkExpData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // State to track the index of the item being edited
  const [editItem, setEditItem] = useState(null); // State to store the item being edited

  //new empty model to post new education
  const [newExpModal, setNewExpModal] = useState(false);

  //states for newData
  const [newPosition, setNewPosition] = useState("");
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newStartMonth, setNewStartMonth] = useState("");
  const [newStartYear, setNewStartYear] = useState("");
  const [newEndMonth, setNewEndMonth] = useState("");
  const [newEndYear, setNewEndYear] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const fetchWorkExperience = async () => {
        try {
          const workExpResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/workexperience`
          );
          const workExpData = workExpResponse.data;

          console.log("work exp data", workExpData);
          setWorkExpData(
            workExpData.map((item) => ({
              ...item,
            }))
          );
        } catch (error) {
          console.error("Error fetching work exp", error);
        }
      };
      fetchWorkExperience();
    }
  }, [isAuthenticated, userID]);

  const handleOpenWorkExpModal = (index) => {
    setEditItem(workExpData[index]);
    setEditingIndex(index);
    setWorkExpModal(true);
  };

  const handleCloseWorkExpModal = () => {
    setWorkExpModal(false);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedWorkExpData = [...workExpData];
    updatedWorkExpData[index] = {
      ...updatedWorkExpData[index],
      [fieldName]: value,
    };
    setWorkExpData(updatedWorkExpData);
  };

  const handleSaveWorkExp = async () => {
    console.log("new work experience data to be sent:", workExpData);
    // Save work experience data to the backend
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      await axios.put(
        `${BACKEND_TALENT_URL}/${userID}/workexperience`,
        {
          workExpData,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //use array
      console.log("updated file", workExpData);
      console.log("Work experience saved successfully!");
      setEditingIndex(null); // Reset editingIndex after saving
      setEditItem(null); // Reset editItem after saving
      setWorkExpModal(false);
    } catch (error) {
      console.error("Error saving work experience:", error);
    }
  };

  const handleOpenNewWorkExp = () => {
    setNewExpModal(true);
  };

  const handleCloseNewWorkExp = () => {
    setNewExpModal(false);
  };

  const handleSaveNewWork = async () => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      // Collect data from input fields in the modal
      const newData = {
        position: newPosition,
        companyName: newCompanyName,
        startMonth: newStartMonth,
        startYear: newStartYear,
        endMonth: newEndMonth,
        endYear: newEndYear,
        responsibility: newResponsibility,
      };

      const newWorkData = await axios.post(
        `${BACKEND_TALENT_URL}/${userID}/workexperience`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("any new work", newWorkData);

      //if got data, pull from backend to reflect on frontend.
      const updatedWorkExpResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${userID}/workexperience`
      );

      // Update the workExpData state with the updated data
      setWorkExpData(updatedWorkExpResponse.data);

      // Close the modal
      setNewExpModal(false);
      setNewCompanyName("");
      setNewPosition("");
      setNewEndMonth("");
      setNewEndYear("");
      setNewResponsibility("");
      setNewStartMonth("");
      setNewStartYear("");

      console.log("New work experience added successfully!");
    } catch (error) {
      console.error("Error adding new work experience:", error);
    }
  };

  // delete work exp

  const handleDelete = async (talentId, workExpID) => {
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      // Make a DELETE request to your backend endpoint
      console.log("work.id", workExpID);
      const response = await axios.delete(
        `${BACKEND_TALENT_URL}/${talentId}/workexperience/${workExpID}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Fetch the updated skill data from the backend
      const updatedWorkExpResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${talentId}/workexperience`
      );

      // Update the state with the new skill data
      setWorkExpData(updatedWorkExpResponse.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error deleting work:", error);
    }
  };

  return (
    <>
      <div className="">
        <h3 className="box">
          Work Experience
          <CustomIcon onClick={handleOpenNewWorkExp}>
            {" "}
            <AddIcon />
          </CustomIcon>
        </h3>
        <div>
          <PopUpModal
            open={newExpModal}
            handleClose={handleCloseNewWorkExp}
            handleSave={handleSaveNewWork}
            title="Add Work Experience"
          >
            <SingleLineTextField
              value={newPosition}
              onChange={(e) => setNewPosition(e.target.value)}
              required={true}
              label="Title"
            />
            <SingleLineTextField
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
              required={true}
              label="Company Name"
            />
            <SingleLineTextField
              value={newStartMonth}
              onChange={(e) => setNewStartMonth(e.target.value)}
              required={true}
              label="Start Month"
            />
            <SingleLineTextField
              value={newStartYear}
              onChange={(e) => setNewStartYear(e.target.value)}
              required={true}
              label="Start Year"
            />
            <SingleLineTextField
              value={newEndMonth}
              onChange={(e) => setNewEndMonth(e.target.value)}
              label="End Month"
            />
            <SingleLineTextField
              value={newEndYear}
              onChange={(e) => setNewEndYear(e.target.value)}
              label="End Year"
            />
            <MultilineTextFields
              value={newResponsibility}
              onChange={(e) => setNewResponsibility(e.target.value)}
              required={true}
              label="Responsibility"
            />
          </PopUpModal>
        </div>
        <div className="contentbox">
          {/* Display fields */}
          {workExpData.map((item, index) => (
            <div key={index}>
              <div className="textbar-container">
                <div className="title">
                  <p className="wp-jobtitle2">{item.position}</p>
                </div>
                <div className="icons">
                  <IconButton onClick={() => handleOpenWorkExpModal(index)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    className="icon"
                    onClick={() => handleDelete(userID, item.id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </div>
              </div>
              <p className="wp-company">{item.companyName}</p>
              <p className="wp-duration">
                {item.startMonth} {item.startYear} to{" "}
                {item.endMonth && item.endYear
                  ? `${item.endMonth} ${item.endYear}`
                  : "current"}
              </p>
              <p>{item.responsibility}</p>
              <hr />
            </div>
          ))}
        </div>
      </div>
      <PopUpModal
        open={workExpModal}
        handleClose={handleCloseWorkExpModal}
        handleSave={handleSaveWorkExp}
        title="Edit Work Experience"
      >
        {workExpData.map((item, index) => (
          <div key={index}>
            {editingIndex === index && ( // editing interface only for the item being edited
              <div>
                <SingleLineTextField
                  value={item.position || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "position", e.target.value)
                  }
                  label="Title"
                  required={true}
                  placeholder="Title"
                />

                <SingleLineTextField
                  value={item.companyName || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "companyName", e.target.value)
                  }
                  required={true}
                  label="Company Name"
                />

                <SingleLineTextField
                  value={item.startMonth || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "startMonth", e.target.value)
                  }
                  required={true}
                  label="Start Month"
                />

                <SingleLineTextField
                  value={item.startYear || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "startYear", e.target.value)
                  }
                  required={true}
                  label="Start Year"
                />

                <SingleLineTextField
                  value={item.endMonth || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "endMonth", e.target.value)
                  }
                  label="End Month"
                />

                <SingleLineTextField
                  value={item.endYear || ""}
                  required={true}
                  onChange={(e) =>
                    handleFieldChange(index, "endYear", e.target.value)
                  }
                  label="End Year"
                />

                <MultilineTextFields
                  type="text"
                  required={true}
                  value={item.responsibility || ""}
                  onChange={(e) =>
                    handleFieldChange(index, "responsibility", e.target.value)
                  }
                  label="Responsibility"
                />
              </div>
            )}
          </div>
        ))}
      </PopUpModal>
    </>
  );
}
