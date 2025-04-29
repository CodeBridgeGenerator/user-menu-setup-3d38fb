import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SingleUserContextPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [role, setRole] = useState([]);
const [position, setPosition] = useState([]);
const [profile, setProfile] = useState([]);
const [user, setUser] = useState([]);
const [company, setCompany] = useState([]);
const [branch, setBranch] = useState([]);
const [department, setDepartment] = useState([]);
const [section, setSection] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("userContext")
            .get(urlParams.singleUserContextId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"role","position","profile","user","company","branch","department","section"] }})
            .then((res) => {
                set_entity(res || {});
                const role = Array.isArray(res.role)
            ? res.role.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.role
                ? [{ _id: res.role._id, name: res.role.name }]
                : [];
        setRole(role);
const position = Array.isArray(res.position)
            ? res.position.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.position
                ? [{ _id: res.position._id, name: res.position.name }]
                : [];
        setPosition(position);
const profile = Array.isArray(res.profile)
            ? res.profile.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.profile
                ? [{ _id: res.profile._id, name: res.profile.name }]
                : [];
        setProfile(profile);
const user = Array.isArray(res.user)
            ? res.user.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.user
                ? [{ _id: res.user._id, name: res.user.name }]
                : [];
        setUser(user);
const company = Array.isArray(res.company)
            ? res.company.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.company
                ? [{ _id: res.company._id, name: res.company.name }]
                : [];
        setCompany(company);
const branch = Array.isArray(res.branch)
            ? res.branch.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.branch
                ? [{ _id: res.branch._id, name: res.branch.name }]
                : [];
        setBranch(branch);
const department = Array.isArray(res.department)
            ? res.department.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.department
                ? [{ _id: res.department._id, name: res.department.name }]
                : [];
        setDepartment(department);
const section = Array.isArray(res.section)
            ? res.section.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.section
                ? [{ _id: res.section._id, name: res.section.name }]
                : [];
        setSection(section);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "UserContext", type: "error", message: error.message || "Failed get userContext" });
            });
    }, [props,urlParams.singleUserContextId]);


    const goBack = () => {
        navigate("/userContext");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">UserContext</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>userContext/{urlParams.singleUserContextId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            
            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Role</label>
                    {role.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Position</label>
                    {position.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Profile</label>
                    {profile.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">User</label>
                    {user.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Company</label>
                    {company.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Branch</label>
                    {branch.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Department</label>
                    {department.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Section</label>
                    {section.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singleUserContextId}
        user={props.user}
        alert={props.alert}
        serviceName="userContext"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleUserContextPage);
