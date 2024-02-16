import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import styled from "styled-components";
import {
  colourButton,
  editIcon,
  profileImage,
  reversedOutlineButton,
  reversedOutlineButton2,
} from "../../../styleComponents";
import { useUser } from "../../Context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_TALENT_URL } from "../../../../constants";
import { Avatar, IconButton } from "@mui/material";
import BenefitSelection from "../../Benefits/BenefitSelection";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { PopUpModal, SingleLineTextField } from "../../../MUIComponents";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

//firebase for image upload
import { storage } from "../../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import UploadButton from "../../../AntDesignCom";

const CustomButton = styled(Button)`
  ${reversedOutlineButton}
`;

const CustomButton2 = styled(Button)`
  ${colourButton}
`;

const CustomButton3 = styled(Button)`
  ${reversedOutlineButton2}
`;

const CustomProfileImage = styled(Avatar)`
  ${profileImage}
`;

const CustomIcon = styled(IconButton)`
  ${editIcon}
`;

export default function TalProfileSetting() {
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, user } =
    useAuth0();

  const {
    userFirstName,
    userLastName,
    userImage,
    userID,
    updatedUser,
    setUserFirstName,
    setUserLastName,
    setUserImage,
  } = useUser();

  const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      localStorage.clear();
      logout({ logoutParams: { returnTo: window.location.origin } });
    };

    return <CustomButton onClick={handleLogout}>Log Out</CustomButton>;
  };

  //need to pull userID for new users who passed by userCat path.

  const [titleField, setTitleField] = useState("ADD TITLE");
  const [selectedBenefit1, setSelectedBenefit1] = useState([]);
  const [selectedBenefit2, setSelectedBenefit2] = useState([]);
  const [selectedBenefit3, setSelectedBenefit3] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //modals

  const [titleModal, setTitleModal] = useState(false);
  const [nameModal, setNameModal] = useState(false);

  //axios pull resume data
  //if field is empty, show "Add Details"

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchResume = async () => {
        try {
          const resumeResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/resume`
          );
          const resumeData = resumeResponse.data;
          console.log("data", resumeData);

          const title = resumeData.map((item) => item.title);

          // Check if title array is empty
          if (title.length === 0) {
            setTitleField("ADD TITLE");
          } else {
            setTitleField(title);
          }
          console.log("title?", title);
        } catch (error) {
          console.error("Error fetching objectives:", error);
        }
      };

      fetchResume();
    }
  }, [isAuthenticated, user, userID]);

  useEffect(() => {
    const fetchCareerPriorities = async () => {
      try {
        if (isAuthenticated && user) {
          const benefitResponse = await axios.get(
            `${BACKEND_TALENT_URL}/${userID}/benefits`
          );
          const benefitData = benefitResponse.data;
          console.log("benefit data:", benefitData);

          //map out the data from benefitData.benefit, put in useState - beneit 1, 2, 3

          const id = benefitData.benefits.map((benefit) => benefit.id);
          console.log("anythign", id);
          setSelectedBenefit1(id[0] || "");
          setSelectedBenefit2(id[1] || "");
          setSelectedBenefit3(id[2] || "");
        }
      } catch (error) {
        console.error("Error fetching career priorities:", error);
      }
    };

    fetchCareerPriorities();
  }, [isAuthenticated, user, userID]);

  const handleBenefitChange1 = (value) => {
    setSelectedBenefit1(value);
  };

  const handleBenefitChange2 = (value) => {
    setSelectedBenefit2(value);
  };

  const handleBenefitChange3 = (value) => {
    setSelectedBenefit3(value);
  };

  //must submit all 3 in order to work.
  //can add and edit.

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedBenefit1);
    console.log(selectedBenefit2);
    console.log(selectedBenefit3);

    if (!selectedBenefit1 || !selectedBenefit2 || !selectedBenefit3) {
      setErrorMessage("Please select all three career priorities.");
    }

    // check if all three selected benefits have the same IDs
    if (
      selectedBenefit1 === selectedBenefit2 ||
      selectedBenefit1 === selectedBenefit3 ||
      selectedBenefit2 === selectedBenefit3
    ) {
      setErrorMessage(
        "Please ensure all three career priorities are distinct."
      );
    }

    //send request to backend with selected benefits
    try {
      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      const submitBenefit = await axios.post(
        `${BACKEND_TALENT_URL}/${userID}/benefits`,
        {
          talentId: userID,
          selectedBenefitIds: [
            selectedBenefit1,
            selectedBenefit2,
            selectedBenefit3,
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response from backend:", submitBenefit.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const nav = useNavigate();
  const handleBenefitPage = () => {
    nav("/benefit");
  };

  const handleOpenTitleModal = () => {
    setTitleModal(true);
  };

  const handleCloseTitleModal = () => {
    setTitleModal(false);
  };

  const handleSaveTitle = async () => {
    try {
      // Check if resume data exists for the user
      const resumeResponse = await axios.get(
        `${BACKEND_TALENT_URL}/${userID}/resume`
      );

      if (resumeResponse.data.userID === null) {
        // userID not found, create new resume data
        await axios.post(`${BACKEND_TALENT_URL}/${userID}/resume`, {
          userID: userID,
          title: titleField,
        });
      } else {
        // If resume data exists, update the objective
        await axios.put(`${BACKEND_TALENT_URL}/${userID}/resume`, {
          title: titleField,
        });
      }

      // Log success message
      console.log("title saved successfully!");
    } catch (error) {
      // Log error if any
      console.error("Error saving title:", error);
    }

    // Close the modal
    setTitleModal(false);
  };

  const handleOpenNameModal = () => {
    setNameModal(true);
  };

  const handleCloseNameModal = () => {
    setNameModal(false);
  };

  const handleSaveName = async () => {
    try {
      if (!isAuthenticated) {
        loginWithRedirect();
        return;
      }

      const accessToken = await getAccessTokenSilently({
        audience: import.meta.env.VITE_SOME_AUTH0_AUDIENCE,
        scope: "read:current_user",
      });
      console.log(`${BACKEND_TALENT_URL}/${userID}`);
      console.log(userFirstName);
      const response = await axios.put(
        `${BACKEND_TALENT_URL}/${userID}`,
        {
          // Assuming userFirstName is defined elsewhere in the scope
          userFirstName: userFirstName,
          userLastName: userLastName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Handle response if needed

      console.log("Response from server:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error saving user data:", error.message);
    }
    handleCloseNameModal();
  };

  const handleUploadImage = async (image) => {
    try {
      // Create a reference to the storage location where you want to store the file
      const storageRefInstance = storageRef(
        storage,
        `talentimages/${image.file.name}`
      );

      // Upload the file to the specified storage location
      await uploadBytes(storageRefInstance, image.file.originFileObj);

      // Get the download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRefInstance);

      // Handle the downloaded URL as needed, for example, setting it to state
      setUserImage(downloadURL);

      console.log("File uploaded successfully. Download URL:", downloadURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Send download URL to your backend API
  // You can use fetch or axios to send the URL to your backend
  // Replace '/api/upload' with your actual backend endpoint
  // await fetch("/api/upload", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ imageUrl: downloadURL }),
  // });

  //       // Send download URL to your backend API
  //       // You can use fetch or axios to send the URL to your backend
  //       // Replace '/api/upload' with your actual backend endpoint
  //       await fetch("/api/upload", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ imageUrl: downloadURL }),
  //       });
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   } else if (image.file.status === "error") {
  //     console.error("File upload failed:", image.file.error);
  //   }
  // };

  return (
    <>
      <div className="container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Display old image */}
          <CustomProfileImage alt="profile" src={`${userImage}`} />

          {/* Upload new image */}

          <Upload
            listType="picture"
            status="removed"
            showUploadList={false}
            onChange={handleUploadImage}
            accept=".png,.jpeg,.svg"
          >
            <CustomButton3>
              <PlusOutlined /> Upload Image
            </CustomButton3>{" "}
          </Upload>
        </div>
        <h4 className="whitebox2">
          {userFirstName} {userLastName}
          <IconButton className="icon" onClick={handleOpenNameModal}>
            <EditIcon />
          </IconButton>
        </h4>
        <h4 className="whitebox3">
          {titleField}
          <IconButton className="icon" onClick={handleOpenTitleModal}>
            <EditIcon />
          </IconButton>
        </h4>
        <LogoutButton />

        <h3 className="box">
          Career Priorities{" "}
          <CustomIcon onClick={handleBenefitPage}>
            <HelpOutlineIcon />
          </CustomIcon>
        </h3>
        <p className="contentbox">Select 3 career priorities. </p>

        <BenefitSelection
          labelName={"First Choice:"}
          onChange={handleBenefitChange1}
          value={selectedBenefit1}
        />
        <br />
        <BenefitSelection
          labelName={"Second Choice:"}
          onChange={handleBenefitChange2}
          value={selectedBenefit2}
        />
        <br />
        <BenefitSelection
          labelName={"Third Choice:"}
          onChange={handleBenefitChange3}
          value={selectedBenefit3}
        />
        <br />
        <p>{errorMessage}</p>

        <br />
        <CustomButton2 onClick={handleSubmit}>Save Profile</CustomButton2>

        {/* Name */}
        <PopUpModal
          open={nameModal}
          handleClose={handleCloseNameModal}
          handleSave={handleSaveName}
          title="Title"
        >
          <SingleLineTextField
            label="First Name"
            value={userFirstName}
            onChange={(e) => setUserFirstName(e.target.value)}
          />
          <SingleLineTextField
            label="Last Name"
            value={userLastName}
            onChange={(e) => setUserLastName(e.target.value)}
          />
        </PopUpModal>

        {/* Job Title */}
        <PopUpModal
          open={titleModal}
          handleClose={handleCloseTitleModal}
          handleSave={handleSaveTitle}
          title="Title"
        >
          <SingleLineTextField
            label="Title"
            value={titleField}
            onChange={(e) => setTitleField(e.target.value)}
          />
        </PopUpModal>
      </div>
    </>
  );
}
