import { useState } from "react";
import { Button } from "antd";
import styled from "styled-components";
import { buttonStyle } from "../../styleComponents";

import BasicSelect from "./BasicSelect";
import BasicModal from "./BasicModal";

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
  const [modalState, setModalState] = useState(false);
  const [joblistinginfo, setjoblistinginfo] = useState({
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
      Create a job lisiting for the first time.
      <h3 className="box">Job Title@{company_name}</h3>
      <BasicModal
        modaltitle="Enter Job Title:"
        modaldescription=""
        open={modalState.openJobTitleModal}
        setOpen={(value) =>
          setModalState({ ...modalState, openJobTitleModal: value })
        }
        propertyname="jobtitle"
        passedInState={joblistinginfo}
        setPassedInState={setjoblistinginfo}
      ></BasicModal>
      <CustomButton
        onClick={() => {
          handleModalOpen("open");
        }}
      ></CustomButton>
      <h3 className="box">Job Responsibility</h3>
      <h3 className="box">Skill Set Required</h3>
      <BasicSelect>Benefits</BasicSelect>
    </div>
  );
}
