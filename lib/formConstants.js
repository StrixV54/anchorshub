const fieldSectionData = {
  "Personal Details": [
    {
      name: "Name",
      id: "name",
      value: 2,
    },
    {
      name: "Mobile",
      id: "mobile",
      value: 10,
    },
    {
      name: "Profile pic",
      id: "profilepic",
      value: 10,
    },
    {
      name: "LinkedIn link",
      id: "linkedinlink",
      value: 10,
    },
    {
      name: "Resume",
      id: "resume",
      value: 10,
    },
  ],
  "Educational Details": [
    {
      name: "Type (School/College)",
      id: "type",
      value: 5,
    },
    {
      name: "School/ College Name",
      id: "school",
      value: 5,
    },
    {
      name: "Start Date",
      id: "startdate",
      value: 2,
    },
    {
      name: "End Date",
      id: "enddate",
      value: 2,
    },
  ],
  "Project Details": [
    {
      name: "Project Name",
      id: "projectname",
      value: 5,
    },
    {
      name: "Project Description",
      id: "projectdesc",
      value: 6,
    },
    {
      name: "Solo Project / Group Project",
      id: "sologroup",
      value: 4,
    },
    {
      name: "Project link",
      id: "projectlink",
      value: 10,
    },
  ],
  "Past Experience details": [
    {
      name: "Type ( Internship / Job )Type ",
      id: "experiencetype",
      value: 5,
    },
    {
      name: "Company Name",
      id: "companyname",
      value: 10,
    },
    {
      name: "Company Website link",
      id: "website",
      value: 10,
    },
    {
      name: "Role",
      id: "role",
      value: 8,
    },
    {
      name: "Start Date",
      id: "expstart",
      value: 2,
    },
    {
      name: "End",
      id: "expend",
      value: 2,
    },
    {
      name: "Cover letter",
      id: "coverletter",
      value: 20,
    },
  ],
};

const singleDetailObject = {};
Object.keys(fieldSectionData).forEach((key) => {
  fieldSectionData[key].forEach((item) => {
    singleDetailObject[item.id] = "";
  });
});

const keyCoinMap = new Map();
Object.keys(fieldSectionData).forEach((key) => {
  fieldSectionData[key].forEach((item) => {
    keyCoinMap.set(item.id, item.value);
  });
});

export { fieldSectionData, singleDetailObject, keyCoinMap };
