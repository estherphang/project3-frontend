import { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";

import BasicSelect from "./BasicSelect";
import BasicModal from "./BasicModal";
import EditIcon from "@mui/icons-material/Edit";

import { useEmployer } from "../Context/EmployerContext";

const CustomButton = styled(Button)`
  ${buttonStyle}
`;

//Employers need to be able to input the following info when creating a job listing:
//name c
//description
//job_responsibilities
//skill_set
//three of the best company_benefits this job has to offer

export default function JobListingCreation() {
  const { EmFormData, setEmFormData, imgurl, setImageUrl } = useEmployer();

  const [modalState, setModalState] = useState({
    openJobTitleModal: false,
    openJobResponsibilityModal: false,
    openSkillsetModal: false,
  });

  const [joblistinginfo, setJobListingInfo] = useState({
    jobtitle: "",
    jobresponsibilities: "",
    skillset: "",
    benefit_1: "",
    benefit_2: "",
    benefit_3: "",
  });

  const handleModalOpen = (modalName) => {
    setModalState((prevState) => ({ ...prevState, [modalName]: true }));
  };

  return (
    <div className="container">
      <h1>Job Listing Creation</h1>

      <h3 className="box">
        Job Title@{EmFormData.EmName}
        <CustomButton onClick={() => handleModalOpen("openJobTitleModal")}>
          <EditIcon />
        </CustomButton>
      </h3>

      <h3>{joblistinginfo.jobtitle}</h3>

      <BasicModal
        modaltitle="Enter your job's title:"
        modaldescription=""
        open={modalState.openJobTitleModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openJobTitleModal: value })
        }
        propertyname="jobtitle"
        passedInState={joblistinginfo}
        setPassedInState={setJobListingInfo}
      ></BasicModal>

      <h3 className="box">
        Job Responsibiliies
        <CustomButton
          onClick={() => {
            handleModalOpen("openJobResponsibilityModal");
          }}
        >
          <EditIcon />
        </CustomButton>
      </h3>

      <h3>{joblistinginfo.jobresponsibilities}</h3>
      <BasicModal
        modaltitle="Enter your job's responsibilities:"
        modaldescription=""
        open={modalState.openJobResponsibilityModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openJobResponsibilityModal: value })
        }
        propertyname="jobresponsibilities"
        passedInState={joblistinginfo}
        setPassedInState={setJobListingInfo}
      ></BasicModal>

      <h3 className="box">
        Skill Set Required
        <CustomButton
          onClick={() => {
            handleModalOpen("openSkillsetModal");
          }}
        >
          <EditIcon />
        </CustomButton>
      </h3>

      <p>{joblistinginfo.skillset}</p>

      <BasicModal
        modaltitle="Enter the required skillset:"
        modaldescription=""
        open={modalState.openSkillsetModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openSkillsetModal: value })
        }
        propertyname="skillset"
        passedInState={joblistinginfo}
        setPassedInState={setJobListingInfo}
      ></BasicModal>

      <p>
        Today's job seekers have different priorities. What are the three best
        benefits your job offers?
      </p>
      <BasicSelect label_name="Benefit" />
      <br></br>
      <BasicSelect label_name="Benefit" />
      <br></br>
      <BasicSelect label_name="Benefit" />
      <br></br>
      <CustomButton>Next</CustomButton>
    </div>
  );
}
