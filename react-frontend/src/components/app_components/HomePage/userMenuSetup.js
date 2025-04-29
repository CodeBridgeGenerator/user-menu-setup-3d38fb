import React, { useState, useEffect } from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import client from "../../../services/restClient";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [activeStep, setActiveStep] = useState(1);
  const urlParams = useParams();
  const navigate = useNavigate();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [menus, setMenus] = useState([{ name: "", routePage: "", submenus: [] }]);
  const [userContextId, setUserContextId] = useState(null); 

  const handleAddMenu = () => {
    setMenus([...menus, { name: "", routePage: "", submenus: [] }]);
  };

  const handleMenuChange = (index, field, value) => {
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus[index][field] = value;
      return updatedMenus;
    });
  };

  const handleAddSubmenu = (menuIndex) => {
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      const currentSubmenus = updatedMenus[menuIndex].submenus || [];
      const newSubmenus = [...currentSubmenus, { name: "", routePage: "" }];
      updatedMenus[menuIndex] = {
        ...updatedMenus[menuIndex],
        submenus: newSubmenus,
      };
      return updatedMenus;
    });
  };
  
  
  const handleSubmenuChange = (menuIndex, submenuIndex, field, value) => {
    setMenus((prevMenus) => {
      const updatedMenus = [...prevMenus];
      updatedMenus[menuIndex].submenus[submenuIndex][field] = value;
      return updatedMenus;
    });
  };
  const handleSaveMenuItems = async () => {
    try {
      const dataToSave = { menuItems: menus, userContext: userContextId,}; 
      await client.service("menuItems").create(dataToSave);
      console.log("Saved menu items details:", dataToSave);
      props.alert({
        type: "success",
        title: "Menu Items",
        message: "Menu items saved successfully!",
      });
    } catch (err) {
      console.error("Error saving menu items details:", err);
      setError({ saveMenuItems: "Failed to save menu items details." });
      props.alert({
        type: "error",
        title: "Menu Items",
        message: err.message || "Failed to save menu items.",
      });
    }
  };


  const [userContextData, setUserContextData] = useState({
    role: "",
    position: "",
    profile: "",
    user: "",
    company: "",
    branch: "",
    department: "",
    section: "",
  });

  const [menuItemsData, setMenuItemsData] = useState({
    menu: "",
    subMenu: "",
    routePage: "",
  });

  const [error, setError] = useState({});

  const [rolesOptions, setRolesOptions] = useState([]);
  const [positionOptions, setPositionOptions] = useState([]);
  const [profileOptions, setProfileOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [filteredPositions, setFilteredPositions] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    // Fetch roles options
    const fetchRolesOptions = async () => {
      try {
        const response = await client
          .service("roles")
          .find({ query: { $limit: 10000 } });
        setRolesOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching Roles options:`, error);
        props.alert({
          title: "Roles",
          type: "error",
          message: error.message || "Failed to fetch Roles options",
        });
      }
    };

    // Fetch all positions
    const fetchPositionOptions = async () => {
      try {
        const response = await client
          .service("positions")
          .find({ query: { $limit: 10000 } });
        setPositionOptions(response.data);
      } catch (error) {
        console.error(`Error fetching Position options:`, error);
        props.alert({
          title: "Positions",
          type: "error",
          message: error.message || "Failed to fetch Position options",
        });
      }
    };

    const fetchProfileOptions = async () => {
      try {
        const response = await client
          .service("profiles")
          .find({ query: { $limit: 10000 } });
        setProfileOptions(response.data); // Store all profiles, not just mapped options
      } catch (error) {
        console.error(`Error fetching Profile options:`, error);
        props.alert({
          title: "Profile",
          type: "error",
          message: error.message || `Failed to fetch Profile options`,
        });
      }
    };

    const fetchUserOptions = async () => {
      try {
        const response = await client
          .service("users")
          .find({ query: { $limit: 10000 } });
        setUserOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching User options:`, error);
        props.alert({
          title: "User",
          type: "error",
          message: error.message || `Failed to fetch User options`,
        });
      }
    };

    const fetchCompanyOptions = async () => {
      try {
        const response = await client
          .service("companies")
          .find({ query: { $limit: 10000 } });
        setCompanyOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching Company options:`, error);
        props.alert({
          title: "Company",
          type: "error",
          message: error.message || `Failed to fetch Company options`,
        });
      }
    };

    const fetchBranchOptions = async () => {
      try {
        const response = await client
          .service("branches")
          .find({ query: { $limit: 10000 } });
        setBranchOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching Branch options:`, error);
        props.alert({
          title: "Branch",
          type: "error",
          message: error.message || `Failed to fetch Branch options`,
        });
      }
    };

    const fetchDepartmentOptions = async () => {
      try {
        const response = await client
          .service("departments")
          .find({ query: { $limit: 10000 } });
        setDepartmentOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching Department options:`, error);
        props.alert({
          title: "Department",
          type: "error",
          message: error.message || `Failed to fetch Department options`,
        });
      }
    };

    const fetchSectionOptions = async () => {
      try {
        const response = await client
          .service("sections")
          .find({ query: { $limit: 10000 } });
        setSectionOptions(
          response.data.map((item) => ({ label: item.name, value: item._id })),
        );
      } catch (error) {
        console.error(`Error fetching Section options:`, error);
        props.alert({
          title: "Section",
          type: "error",
          message: error.message || `Failed to fetch Section options`,
        });
      }
    };

    // Call all the fetch functions
    fetchRolesOptions();
    fetchPositionOptions();
    fetchProfileOptions();
    fetchUserOptions();
    fetchCompanyOptions();
    fetchBranchOptions();
    fetchDepartmentOptions();
    fetchSectionOptions();
  }, []);

  useEffect(() => {
    // Filter positions based on selected role
    if (selectedRole) {
      const filtered = positionOptions.filter(
        (position) => position.roleId === selectedRole,
      );
      setFilteredPositions(
        filtered.map((item) => ({ label: item.name, value: item._id })),
      );
    } else {
      setFilteredPositions([]);
    }
  }, [selectedRole, positionOptions]);

  useEffect(() => {
    // Filter profiles based on selected position
    if (userContextData.position) {
      const filtered = profileOptions.filter(
        (profile) => profile.position === userContextData.position,
      );
      setFilteredProfiles(
        filtered.map((item) => ({ label: item.name, value: item._id })),
      );
    } else {
      setFilteredProfiles([]);
    }
  }, [userContextData.position, profileOptions]);

  const handleRoleChange = (e) => {
    setSelectedRole(e.value);
    setUserContextData({ ...userContextData, role: e.value });
  };

  const handlePositionChange = (e) => {
    setUserContextData({ ...userContextData, position: e.value });
  };

  const handleProfileChange = (e) => {
    setUserContextData({ ...userContextData, profile: e.value });
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const handleNext = async () => {
    if (activeStep === 1) {
      // Validation for userContextData (if any)
      // ...

      await handleSaveUserContext();
    } else if (activeStep === 2) {
      // Validation for menuItemsData (if any)
      // ...

      await handleSaveMenuItems();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSaveUserContext = async () => {
    try {
        const dataToSave = {};
        if (userContextData.role) dataToSave.role = userContextData.role; 
        if (userContextData.position) dataToSave.position = userContextData.position;
        if (userContextData.profile) dataToSave.profile = userContextData.profile;
        if (userContextData.user) dataToSave.user = userContextData.user;
        if (userContextData.company) dataToSave.company = userContextData.company;
        if (userContextData.branch) dataToSave.branch = userContextData.branch;
        if (userContextData.department) dataToSave.department = userContextData.department;
        if (userContextData.section) dataToSave.section = userContextData.section;

    //   await client.service("userContext").create(userContextData);
    const createdUserContext = await client.service("userContext").create(dataToSave); 
    setUserContextId(createdUserContext._id);
      console.log("Saved user context details:", userContextData);
      props.alert({
        type: "success",
        title: "User Context",
        message: "User context saved successfully!",
      });
    } catch (err) {
      console.error("Error saving user context details:", err);
      setError({ saveUserContext: "Failed to save user context details." });
      props.alert({
        type: "error",
        title: "User Context",
        message: err.message || "Failed to save user context.",
      });
    }
  };


  const handleInputChange = (step, field, value) => {
    if (step === 1) {
      setUserContextData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    } else if (step === 2) {
      setMenuItemsData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <div className="flex-1 ml-2">
        {/* Steps */}
        <ul className="list-none p-0 m-0 flex flex-column md:flex-row mt-6">
          {["User Context", "Menu Items", "Preview"].map((step, index) => (
            <li
              key={index}
              className={`relative mr-0 md:mr-8 flex-auto cursor-pointer ${
                activeStep === index + 1 ? "active" : ""
              }`}
              onClick={() => handleStepClick(index + 1)}
            >
              {/* Step Indicator */}
              <div
                className={`border-round p-3 surface-card flex flex-column md:flex-row align-items-center z-1 ${
                  activeStep === index + 1
                    ? "border-2 border-blue-500"
                    : "border-1 border-300"
                }`}
              >
                <i
                  className={`pi ${
                    activeStep > index + 1
                      ? "pi-check-circle text-green-500"
                      : activeStep === index + 1
                        ? "pi-credit-card text-blue-600"
                        : "pi-circle-fill text-600"
                  } text-2xl md:text-4xl mb-2 md:mb-0 mr-0 md:mr-3`}
                ></i>
                <div>
                  <div
                    className={`font-medium mb-1 ${
                      activeStep === index + 1 ? "text-blue-600" : "text-900"
                    }`}
                  >
                    {step}
                  </div>
                </div>
              </div>
              {/* Line between steps */}
              {index < 2 && (
                <div
                  className={`w-full absolute top-50 left-100 hidden md:block ${
                    activeStep > index + 1 ? "bg-blue-500" : "surface-300"
                  }`}
                  style={{ transform: "translateY(-50%)", height: "2px" }}
                ></div>
              )}
            </li>
          ))}
        </ul>

        {/* Content for each step */}
        <div className="surface-section px-4 py-5 md:px-6 lg:px-8">
          {activeStep === 1 && (
            <div>
              <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                User Context
              </h2>
              {/* User Context Form */}
              <div className="p-fluid grid">
                {/* Basic Fields */}
                <div className="field col-12 md:col-4">
                  <label htmlFor="role">Select Role</label>
                  <Dropdown
                    id="role"
                    value={selectedRole}
                    options={rolesOptions}
                    onChange={handleRoleChange}
                    placeholder="Select a Role"
                  />
                </div>

                {selectedRole && (
                  <div className="field col-12 md:col-4">
                    <label htmlFor="position">Select Position</label>
                    <Dropdown
                      id="position"
                      value={userContextData.position}
                      options={filteredPositions}
                      onChange={handlePositionChange}
                      placeholder="Select a Position"
                    />
                  </div>
                )}

                {userContextData.position && (
                  <div className="field col-12 md:col-4">
                    <label htmlFor="profile">Profile</label>
                    <Dropdown
                      id="profile"
                      value={userContextData.profile}
                      options={filteredProfiles}
                      onChange={handleProfileChange}
                      placeholder="Select a Profile"
                    />
                  </div>
                )}

                {/* <div className="field col-12 md:col-4">
                                    <label htmlFor="user">User</label>
                                    <Dropdown
                                        id="user"
                                        value={userContextData.user}
                                        options={userOptions}
                                        onChange={(e) => handleInputChange(1, "user", e.value)}
                                        placeholder="Select a User"
                                    />
                                </div> */}

                {/* Advanced Options */}
                <div className="col-12">
                  <div className="flex align-items-center">
                    <h5 className="m-0">Advanced Options</h5>
                    <Button
                      icon={showAdvanced ? "pi pi-minus" : "pi pi-plus"}
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      className="ml-2 p-button-text"
                    />
                  </div>
                  {showAdvanced && (
                    <div className="p-fluid grid">
                      <div className="field col-12 md:col-4">
                        <label htmlFor="company">Company</label>
                        <Dropdown
                          id="company"
                          value={userContextData.company}
                          options={companyOptions}
                          onChange={(e) =>
                            handleInputChange(1, "company", e.value)
                          }
                          placeholder="Select a Company"
                        />
                      </div>
                      <div className="field col-12 md:col-4">
                        <label htmlFor="branch">Branch</label>
                        <Dropdown
                          id="branch"
                          value={userContextData.branch}
                          options={branchOptions}
                          onChange={(e) =>
                            handleInputChange(1, "branch", e.value)
                          }
                          placeholder="Select a Branch"
                        />
                      </div>
                      <div className="field col-12 md:col-4">
                        <label htmlFor="department">Department</label>
                        <Dropdown
                          id="department"
                          value={userContextData.department}
                          options={departmentOptions}
                          onChange={(e) =>
                            handleInputChange(1, "department", e.value)
                          }
                          placeholder="Select a Department"
                        />
                      </div>
                      <div className="field col-12 md:col-4">
                        <label htmlFor="section">Section</label>
                        <Dropdown
                          id="section"
                          value={userContextData.section}
                          options={sectionOptions}
                          onChange={(e) =>
                            handleInputChange(1, "section", e.value)
                          }
                          placeholder="Select a Section"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* Error message (if any) */}
              {error.saveUserContext && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {error.saveUserContext}
                </p>
              )}
            </div>
          )}
          {activeStep === 2 && (
           <div>
           <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
               Menu Items
           </h2>

           {/* Menu Items Form */}
           <div>
               {menus.map((menu, menuIndex) => (
                   <div key={menuIndex}>
                       <div className="p-fluid grid">
                           <div className="field col-12 md:col-6">
                               <label htmlFor={`menuName-${menuIndex}`}>Menu Name</label>
                               <InputText
                                   id={`menuName-${menuIndex}`}
                                   value={menu.name}
                                   onChange={(e) => handleMenuChange(menuIndex, "name", e.target.value)}
                               />
                           </div>
                           <div className="field col-12 md:col-6">
                               <label htmlFor={`menuRoutePage-${menuIndex}`}>Route Page</label>
                               <InputText
                                   id={`menuRoutePage-${menuIndex}`}
                                   value={menu.routePage}
                                   onChange={(e) => handleMenuChange(menuIndex, "routePage", e.target.value)}
                               />
                           </div>
                       </div>

                       {/* Submenus */}
                       {menu.submenus.map((submenu, submenuIndex) => (
                           <div key={submenuIndex} style={{ marginLeft: "20px" }}>
                               <div className="p-fluid grid">
                                   <div className="field col-12 md:col-6">
                                       <label htmlFor={`submenuName-${menuIndex}-${submenuIndex}`}>Submenu Name</label>
                                       <InputText
                                           id={`submenuName-${menuIndex}-${submenuIndex}`}
                                           value={submenu.name}
                                           onChange={(e) =>
                                               handleSubmenuChange(menuIndex, submenuIndex, "name", e.target.value)
                                           }
                                       />
                                   </div>
                                   <div className="field col-12 md:col-6">
                                       <label htmlFor={`submenuRoutePage-${menuIndex}-${submenuIndex}`}>Route Page</label>
                                       <InputText
                                           id={`submenuRoutePage-${menuIndex}-${submenuIndex}`}
                                           value={submenu.routePage}
                                           onChange={(e) =>
                                               handleSubmenuChange(menuIndex, submenuIndex, "routePage", e.target.value)
                                           }
                                       />
                                   </div>
                               </div>
                           </div>
                       ))}

                       <Button
                           label="Add Submenu"
                           icon="pi pi-plus"
                           onClick={() => handleAddSubmenu(menuIndex)}
                           className="mb-3"
                       />
                   </div>
               ))}

               <Button label="Add Menu" icon="pi pi-plus" onClick={handleAddMenu} />
           </div>

           {/* Error message (if any) */}
           {error.saveMenuItems && (
               <p style={{ color: "red", marginTop: "10px" }}>
                   {error.saveMenuItems}
               </p>
           )}
       </div>
   )}
          {activeStep === 3 && (
      <div>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Preview
        </h2>

        <div className="surface-card p-4">
          <div className="grid"> 
            {Object.entries(userContextData).map(([key, value]) => {
              let displayValue = value; 

              // Check if the key is role, position, or profile
              if (key === "role" && rolesOptions.find(option => option.value === value)) {
                displayValue = rolesOptions.find(option => option.value === value).label;
              } else if (key === "position" && positionOptions.find(option => option._id === value)) {
                displayValue = positionOptions.find(option => option._id === value).name;
              } else if (key === "profile" && profileOptions.find(option => option._id === value)) {
                displayValue = profileOptions.find(option => option._id === value).name;
              } else if (key === "user" && userOptions.find(option => option.value === value)) {
                displayValue = userOptions.find(option => option.value === value).label;
              } else if (key === "company" && companyOptions.find(option => option.value === value)) {
                displayValue = companyOptions.find(option => option.value === value).label;
              } else if (key === "branch" && branchOptions.find(option => option.value === value)) {
                displayValue = branchOptions.find(option => option.value === value).label;
              } else if (key === "department" && departmentOptions.find(option => option.value === value)) {
                displayValue = departmentOptions.find(option => option.value === value).label;
              } else if (key === "section" && sectionOptions.find(option => option.value === value)) {
                displayValue = sectionOptions.find(option => option.value === value).label;
              }

              return (
                <div key={key} className="col-12 md:col-6 lg:col-4">
                  <div className="flex align-items-center mb-2">
                    <span className="font-bold mr-2">{key}:</span>
                    <span className="text-gray-700">{displayValue || "Not selected"}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <h3>Menu Items</h3>
        <div className="surface-card p-4">
          <ul className="m-0 p-0 list-none"> {/* Removed default list styling */}
            {menus.map((menu, menuIndex) => (
              <li key={menuIndex} className="mb-3">
                <div className="font-bold text-xl">{menu.name}</div> {/* Increased font size */}
                <div className="text-gray-600 ml-3">Route: {menu.routePage}</div>
                {menu.submenus.length > 0 && (
                  <ul className="m-0 p-0 ml-6 list-none">
                    {menu.submenus.map((submenu, submenuIndex) => (
                      <li key={submenuIndex} className="mb-2">
                        <div className="text-lg">{submenu.name}</div> {/* Increased font size */}
                        <div className="text-gray-600 ml-3">Route: {submenu.routePage}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-4">
          {activeStep > 1 && (
            <Button
              label="Back"
              onClick={handleBack}
              className="p-button-secondary mr-2"
            />
          )}
          {activeStep < 3 && <Button label="Next" onClick={handleNext} />}
        </div>
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  return { user };
};
const mapDispatch = (dispatch) => ({
  alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(Home);
