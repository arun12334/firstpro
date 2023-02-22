import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  getfilelist,
  uploadExcel,
  exportExcel,
  nodeList,
  attributesByFile,
  userList,
  auditUserList,
  checkListByType,
  allCheckListFile,
  addCheckList,
  assignedUser,
  assignedAuditUser,
  assignedAttributeByFile,
  singleFileByAttribute,
  updateCheckList,
  checkListHistoryByfile,
  assignedAllAttribute,
  updateAttributeStatus,
  getauditFileList,
  AttributeListForAudit,
} from "./apiserver";

import { Link, useNavigate } from "react-router-dom";
import "./styles/list.css";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import Backdrop from "./backdrop";
import Loader from "react-js-loader";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
// import Typography from '@mui/material/Typography';
import Modal from "@mui/material/Modal";
import Menu from "@mui/material/Menu";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import LOGO from "./img/logo-main.png";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HRIMG from "./img/h-t-img.png";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Config from "./Config";
import Model_page from "./Model_page";

const limit = 5;
function List(props) {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1000);
  const [node, setNode] = React.useState([]);
  const [node_id, setNode_id] = React.useState("");
  const [attributes, setAttributes] = React.useState([]);
  const [allattributes, setAllAttributes] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [userId, setUserId] = React.useState([]);
  const [fileObj, setActiveFile] = React.useState({});
  const [selectedUser, setSelectedUser] = React.useState([]);
  const [assigned, setAssigned] = React.useState([]);
  const [saves, setSave] = React.useState([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const [open9, setOpen9] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);
  const [open11, setOpen11] = React.useState(false);
  const [open12, setOpen12] = React.useState(false);
  const [open13, setOpen13] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [checklist, setChecklist] = React.useState({});
  const [checkList, setCheckList] = React.useState({});
  const [addChecklist, setaddChecklist] = React.useState({});
  const [updateChecklist, setupdateChecklist] = React.useState({});
  const [addChhandleClickeckList1, setaddCheckList] = React.useState({});
  const [selectedRow1, setSelectedRow1] = React.useState(false);
  const [selectedRow2, setSelectedRow2] = React.useState(false);
  const [selectedRow1data, setSelectedRow1data] = React.useState({});
  const [selectedRow2data, setSelectedRow2data] = React.useState({});
  // const [allchecklistfile,setAllCheckListFile] = React.useState({});
  const [checkListHistory, setCheckListHistory] = React.useState([]);
  const [checkListHistory1, setCheckListHistory1] = React.useState([]);
  const [filewise, setFilewise] = React.useState("attribute wise");
  const [filewises, setFilewises] = React.useState("attribute wise");
  const [attributewise, setAttributewise] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [upload_percent, setUpload_percent] = React.useState(false);
  const [progress, setprogress] = React.useState(false);
  const [updateattributestatus, setUpdateattributestatus] =
    React.useState(false);
  const [assignedType, setAssignedType] = React.useState([]);
  const [updateAttributes, setupdateAttributes] = React.useState(false);
  const [items, setItems] = useState([]);
  const [checklistform, setCheckListForm] = React.useState({
    checkPoint: "",
    attributeName: "",
    typeId: "1",
  });
  const [checklistform1, setCheckListForm1] = React.useState({
    attributeName: "",
    correctValue: "",
    incorrectValue: "",
    dataType: "",
    typeId: "2",
  });
  React.useLayoutEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  });

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const navigate = useNavigate();

  const open3 = Boolean(anchorEl);
  console.log("open3", open3);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosed = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setNode_id(event.target.value);
  };
  const handleChange1 = (event) => {
    setAttributes(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    height: "450px",
    overflowY: "scroll",
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleopen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);

  const handleopen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const handleopen6 = () => setOpen6(true);
  const handleClose6 = () => setOpen6(false);

  const handleopen7 = () => setOpen7(true);
  const handleClose7 = () => setOpen7(false);

  const handleopen8 = () => setOpen8(true);
  const handleClose8 = () => setOpen8(false);

  const handleopen9 = () => setOpen9(true);
  const handleClose9 = () => setOpen9(false);

  const handleAssignModel1 = (e) => {
    setOpen1(true);
    setOpen2(true);
    getAttributes(e.fileId);
    getAttributeListForAudit(e.fileId);
    getUsers();
    getAuditUsers();
    getAllAttributes(e.fileId);
    getSingleAssignedAttributes(e.fileId);
    getAssignedAttributes(e.fileId);
    assignedUser();
    assignedAuditUser();
    handleClose2(true);
  };

  const handleAssignModel = (e) => {
    setOpen1(true);
    setOpen2(true);
    if (
      localStorage.getItem("userType") === "Manager" ||
      localStorage.getItem("userType") === "PT User"
    ) {
      getAttributes(e.fileId);
    } else {
      getAttributeListForAudit(e.fileId);
    }
    if (
      localStorage.getItem("userType") === "Manager" ||
      localStorage.getItem("userType") === "PT User"
    ) {
      getUsers();
    } else {
      getAuditUsers();
    }
    getAssignedAttributes(e.fileId);
    getSingleAssignedAttributes(e.fileId);
    // getChecklist();
    setChecklist(true);
    setCheckList(true);

    // getCheckList();
  };

  const handleUpdate = (e) => {
    updateAttributestatus(e.fileId);
  };

  const handleopen10 = () => {
    setOpen10(true);
  };
  const handleClose10 = () => setOpen10(false);

  const handleopen11 = () => setOpen11(true);
  const handleClose11 = () => setOpen11(false);

  const handleopen12 = () => {
    getallCheckListHistory();
    setOpen12(true);
  };
  const handleClose12 = () => setOpen12(false);

  const handleClose13 = () => setOpen13(false);

  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);

  const getFileList = (page) => {
    setLoader(true);
    let params =
      "/" +
      localStorage.getItem("_id") +
      "/" +
      localStorage.getItem("UserTypeId") +
      "?page=" +
      page;

    getfilelist(
      params,
      (res) => {
        setLoader(false);
        console.log(res);
        const data = res.data.map((item) => {
          return {
            file: item,
            createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            _id: item._id,
            status: item.status,
          };
        });
        setList(data);
      },
      () => {
        setLoader(false);
      }
    );
  };

  const getAuditFileList = (page) => {
    setLoader(true);
    let params =
      "/" +
      localStorage.getItem("_id") +
      "/" +
      localStorage.getItem("UserTypeId") +
      "?page=" +
      page;

    getauditFileList(
      params,
      (res) => {
        setLoader(false);
        console.log(res);
        const data = res.data.map((item) => {
          return {
            file: item,
            createdAt: moment(item.createdAt).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
            _id: item._id,
            status: item.status,
          };
        });
        setList(data);
      },
      () => {
        setLoader(false);
      }
    );
  };

  useEffect(() => {
    if (
      localStorage.getItem("userType") === "Manager" ||
      localStorage.getItem("userType") === "PT User"
    ) {
      getFileList(1);
    } else {
      getAuditFileList(1);
    }
    getNodes();
  }, []);

  const getNodes = () => {
    setLoader(true);
    nodeList(
      "",
      (res) => {
        setLoader(false);
        console.log(res);
        setNode(res.data);
      },
      () => {
        setLoader(false);
      }
    );
  };

  const getUsers = () => {
    setLoader(true);
    userList(
      (res) => {
        setLoader(false);
        console.log(res);
        setUsers(res.data);
      },
      () => {
        setLoader(false);
      }
    );
  };

  const getAuditUsers = () => {
    setLoader(true);
    auditUserList(
      (res) => {
        setLoader(false);
        console.log(res);
        setUsers(res.data);
      },
      () => {
        setLoader(false);
      }
    );
  };

  const getAllAttributes = (fileId) => {
    setLoader(true);
    const sendData = {
      fileId: fileObj.fileId,
      userId: userId || fileObj.userId,
      assignedBy: localStorage.getItem("_id"),
    };
    assignedAllAttribute(
      sendData,
      (res) => {
        setLoader(false);
        console.log(res);
        const userData = [];
        res.data.map((item, i) => {
          if (item.assignedUserId) {
            userData[i] = item.assignedUserId;
          } else {
            userData[i] = false;
          }
        });
        setSelectedUser(userData);
        setAllAttributes(res.data);
      },
      () => {
        setLoader(false);
        setOpen1(false);
      }
    );
  };

  const getAttributes = (fileId) => {
    setLoader(false);
    attributesByFile(
      fileId,
      (res) => {
        setLoader(false);
        console.log(res);
        const userData = [];

        res.data.map((item, i) => {
          if (item.assignedUserId) {
            userData[i] = item.assignedUserId;
          } else {
            userData[i] = false;
          }
        });

        if (res.data[0]) {
          const assignedUserIdFile = res.data[0].assignedUserId;
          const assignedType = res.data[0].assignedType;
          const allsame = res.data.every((item) => {
            return item.assignedUserId === assignedUserIdFile;
          });
          if (allsame) setUserId(assignedUserIdFile);
          setFilewise(assignedType);
        }

        setSelectedUser(userData);
        setAttributes(res.data);
      },
      () => {
        setLoader(false);
        setOpen1(false);
      }
    );
  };

  const getAttributeListForAudit = (fileId) => {
    setLoader(false);
    AttributeListForAudit(
      fileId,
      (res) => {
        setLoader(false);
        console.log(res);
        const userData = [];

        res.data.map((item, i) => {
          if (item.assignedUserId) {
            userData[i] = item.assignedUserId;
          } else {
            userData[i] = false;
          }
        });

        if (res.data[0]) {
          const assignedUserIdFile = res.data[0].assignedUserId;
          const assignedType = res.data[0].assignedType;
          const allsame = res.data.every((item) => {
            return item.assignedUserId === assignedUserIdFile;
          });
          if (allsame) setUserId(assignedUserIdFile);
          setFilewise(assignedType);
        }

        setSelectedUser(userData);
        setAttributes(res.data);
      },
      () => {
        setLoader(false);
        setOpen1(false);
      }
    );
  };

  const updateAttributestatus = (params) => {
    updateAttributeStatus(params, (res) => {
      const updateatributestatus = res.data.map((item) => {
        return {
          status: item.status,
          _id: item._id,
        };
      });
      setUpdateattributestatus(updateatributestatus);
    });
  };

  const getChecklist = () => {
    let params = "1";
    checkListByType(
      params,
      (res) => {
        console.log("res");
        const globalChecklist = res.data.map((item) => {
          return {
            global: item,
            checkPoint: item.checkPoint,
            _id: item._id,
          };
        });

        setChecklist(globalChecklist);
        setOpen4(true);
      },
      (err) => {}
    );
  };
  const getCheckList = () => {
    let params2 = "2";
    checkListByType(
      params2,
      (res) => {
        const attributeChecklist = res.data.map((item) => {
          return {
            attribute: item,
            attributeName: item,
            checkPoint: item,
            dataType: item,
            correctValue: item,
            incorrectValue: item,
            _id: item._id,
          };
        });
        setCheckList(attributeChecklist);
        setOpen5(true);
      },
      (err) => {}
    );
  };

  const addChecKlist = () => {
    if (checklistform.checkPoint == "") {
      alert("checkpoint should not be empty");
      return;
    }

    addCheckList(
      checklistform,
      (res) => {
        console.log("res");
        setOpen8(false);

        setOpen6(true);
        setOpen8(false);

        const globalChecklist = res.data.map((item) => {
          return {
            global: item,
            checkPoint: item.checkPoint,
            _id: item._id,
          };
        });

        setaddChecklist(globalChecklist);
        // setLoader(false)
      },
      (err) => {}
    );
  };

  const AddCheckList = () => {
    if (checklistform1.dataType == "") {
      alert("dataType should not be empty");
      return;
    }
    if (checklistform1.correctValue == "") {
      alert("correctValue should not be empty");
      return;
    }
    if (checklistform1.incorrectValue == "") {
      alert("incorrectValue should not be empty");
      return;
    }
    addCheckList(
      checklistform1,
      (res) => {
        setOpen7(true);
        setOpen9(false);
        const attributeChecklist = res.data.map((item) => {
          return {
            attribute: item,
            dataType: item,
            correctValue: item,
            incorrectValue: item,
            _id: item._id,
          };
        });
        setaddCheckList(attributeChecklist);
      },
      (err) => {}
    );
  };

  const updateChecKlist = () => {
    if (selectedRow1data.checkPoint == "") {
      alert("checkpoint should not be empty");
      return;
    }

    updateCheckList(
      selectedRow1data,
      (res) => {
        console.log("res");
        console.log(selectedRow1data);

        getChecklist();
        setOpen6(true);
        setOpen10(false);

        const globalChecklist = res.data.map((item) => {
          return {
            global: item,
            checkPoint: item.checkPoint,
            _id: item._id,
          };
        });

        setupdateChecklist(globalChecklist);
        // setLoader(false)
      },
      (err) => {}
    );
  };

  const updateChecklist1 = () => {
    if (selectedRow2data.dataType == "") {
      alert("dataType should not be empty");
      return;
    }
    if (selectedRow2data.correctValue == "") {
      alert("correctValue should not be empty");
      return;
    }
    if (selectedRow2data.incorrectValue == "") {
      alert("incorrectValue should not be empty");
      return;
    }
    updateCheckList(
      selectedRow2data,
      (res) => {
        getCheckList();
        setOpen7(true);
        setOpen9(false);
        const attributeChecklist = res.data.map((item) => {
          return {
            attribute: item,
            attributeName: item,
            dataType: item,
            correctValue: item,
            incorrectValue: item,
            _id: item._id,
          };
        });
        setaddCheckList(attributeChecklist);
      },
      (err) => {}
    );
  };

  const getAssignedAttributes = (fileId) => {
    setLoader(true);
    const params = fileId + "/" + localStorage.getItem("_id");
    assignedAttributeByFile(
      params,
      (res) => {
        setLoader(true);
        console.log(res);
        setAssigned(res.data);
      },
      () => {
        setLoader(false);
        setOpen1(false);
      }
    );
  };

  const getSingleAssignedAttributes = (fileId) => {
    setLoader(true);
    const params = fileId + "/" + localStorage.getItem("_id");
    singleFileByAttribute(
      params,
      (res) => {
        setLoader(false);
        console.log(res);
        // setAssigned(res.data)
      },
      () => {
        setLoader(false);
        setOpen1(false);
      }
    );
  };

  const upload = (e) => {
    if (node_id == "") {
      alert("Please Select node Id");
      return;
    }
    console.log();
    setUploading(true);
    uploadExcel(
      {
        file: e.target.files[0],
        nodeId: node_id,
      },
      (res) => {
        setUploading(false);
        if (res.errors) {
          alert(res.errors);
        } else {
          getFileList();
          getAuditFileList();
          setOpen(false);
        }
      },
      (err) => {
        alert(err.message);
      },
      (progress) => {
        setUpload_percent(progress);
      }
    );
  };

  const getallCheckListHistory = () => {
    // const allchecklistdata = fileId.map((item,i)=>{
    //   return{
    //     "fileId": item.fileId,
    //   }
    // });
    // setLoader(true)

    allCheckListFile(
      (res) => {
        setLoader(false);
        console.log(res);
        const mappedData = res.data.map((item) => {
          return {
            filename: item,
          };
        });
        setCheckListHistory(mappedData);
      },
      () => {
        setLoader(false);
      }
    );
  };

  const handlePageChange = (page) => {
    console.log("args", page);
    setActivePage(page);
    getFileList(page);
    getAuditFileList(page);
  };

  const save = () => {
    const assignedData = attributes.map((item, i) => {
      return {
        attributeId: item._id,
        userId: selectedUser[i],
      };
    });

    const sendData = {
      // nodeId: fileObj.nodeId,
      fileId: fileObj.fileId,
      userId: userId,
      assignedBy: localStorage.getItem("_id"),
      assignedType: assignedType === "2" || "1",
      assignedData: assignedData,
      // assignedUser: assignedUser
    };

    // if(assignedType==="attribute wise" || true) {
    //   sendData.assignedData = assignedData;
    //   sendData.assignedUser = assignedUser;
    // } else {
    //   sendData.userId = userId;
    // }
    console.log(sendData);
    setLoader(true);
    if (
      localStorage.getItem("userType") === "Manager" ||
      localStorage.getItem("userType") === "Audit user"
    ) {
      assignedAllAttribute(
        sendData,
        (res) => {
          setLoader(false);
          console.log(res);
          setSave(res.data);
          setOpen2(false);
          getFileList(1);
        },
        () => {
          setLoader(false);
        }
      );
    } else {
      assignedAuditUser(
        sendData,
        (res) => {
          setLoader(false);
          console.log(res);
          setSave(res.data);
          setOpen2(false);
          getAuditFileList(1);
        },
        () => {
          setLoader(false);
        }
      );
    }
    alert("Successfully Assigned User");
  };

  const save2 = () => {
    const assignedData = attributes.map((item, i) => {
      return {
        attributeId: item._id,
        userId: selectedUser[i],
      };
    });

    const sendData = {
      nodeId: fileObj.nodeId,
      fileId: fileObj.fileId,
      userId: userId,
      assignedBy: localStorage.getItem("_id"),
      assignedData: assignedData,
      assignedType: assignedType === "1" || "2",
      // assignedUser: assignedUser
    };

    if (assignedType === "attribute wise" || true) {
      sendData.assignedData = assignedData;
      sendData.assignedUser = assignedUser;
    } else {
      sendData.userId = userId;
    }
    console.log(sendData);
    setLoader(true);
    if (
      localStorage.getItem("userType") === "Manager" ||
      localStorage.getItem("userType") === "Audit user"
    ) {
      assignedUser(
        sendData,
        (res) => {
          setLoader(false);
          console.log(res);
          setSave(res.data);
          setOpen2(false);
          getFileList(1);
        },
        () => {
          setLoader(false);
        }
      );
    } else {
      assignedAuditUser(
        sendData,
        (res) => {
          setLoader(false);
          console.log(res);
          setSave(res.data);
          setOpen2(false);
          getAuditFileList(1);
        },
        () => {
          setLoader(false);
        }
      );
    }
    alert("Successfully Assigned Users");
  };

  useLayoutEffect(() => {
    if (localStorage);
  }, []);

  React.useLayoutEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header-wrapper ">
      <div className="header bo-bottom">
        <div className="inner">
          <nav class="navbar navbar-expand-lg remove-padding shadow-header">
            <img className="ctrl-wi" src={LOGO} alt="logo-main" />
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="">
                    Dashboard
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">
                    Imports
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">
                    Auto Normalization
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="">
                    Exports
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Forgetpassword">
                    Reset Password
                  </a>
                </li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
                <div class="nav-right-content fo-flx">
                  <div className="header-img-wrp">
                    <img src={HRIMG} alt="logo-main" />
                  </div>
                  <div class="content fo-flx">
                    <div class="prof fo-flx">
                      <div class="dd">
                        <h6>{localStorage.getItem("userName")}</h6>
                        <p>Welcome</p>
                      </div>
                      <div class="img-wr">
                        <PowerSettingsNewIcon
                          className="primary-ic"
                          fontSize="small"
                          onClick={handleLogout}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </nav>
        </div>
      </div>
      <div className="container-fluid">
        {loader && (
          <Backdrop>
            <Loader
              type="box-rotate-x"
              bgColor={"#32E0A1"}
              title={"Please wait..."}
              color={"#fff"}
              size={100}
            />
          </Backdrop>
        )}
        {uploading && (
          <Backdrop>
            <Loader
              type="box-rotate-x"
              bgColor={"#32E0A1"}
              title={
                <div>
                  <div>"Please wait..."</div>
                  <p>{upload_percent} %</p>
                </div>
              }
              color={"#fff"}
              size={100}
            />
          </Backdrop>
        )}

        <div className="inner-header d-flex space-between py-4 align-center">
          <div className="left">
            <h4 className="page-title">FileList</h4>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">Dashboard</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  File list
                </li>
              </ol>
            </nav>
          </div>

          <div className="ct-right d-flex">
            {/* {list.map((item,i)=>{https://www.google.com/search?q=localhost&oq=localhost&aqs=chrome..69i60j69i57j35i39j0i67i131i433j0i512j69i60l2.4271j0j7&sourceid=chrome&ie=UTF-8
    return (<div key={i}><Link to={"/file/"+item._id}>{item.file_name} - {item.updatedAt}</Link></div>)
            })} */}

            {(localStorage.getItem("userType") === "Manager" ||
              localStorage.getItem("userType") === "Audit Manager") && (
              <Link
                type="button"
                className="btn btn-secondary mr1"
                to={"Checklist_History"}
              >
                CheckList History
              </Link>
            )}
            {(localStorage.getItem("userType") === "Manager" ||
              localStorage.getItem("userType") === "Audit Manager") && (
              <button
                type="button"
                id="basic-button"
                aria-controls={open3 ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open3 ? "true" : undefined}
                onClick={handleClick}
                className="btn btn-secondary mr1"
              >
                View CheckList
              </button>
            )}
            {localStorage.getItem("userType") === "Manager" && (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOpen}
              >
                New File
              </button>
            )}
          </div>
        </div>

        <div className="card">
          <MUIDataTable
            data={list}
            columns={[
              {
                name: "file",
                label: "File Name",
                options: {
                  filter: true,
                  sort: true,
                  customBodyRender: (value, row) => {
                    if (
                      localStorage.getItem("userType") === "Manager" ||
                      localStorage.getItem("userType") === "Audit Manager"
                    ) {
                      return (
                        <div>
                          {value.file_name}
                          {/* <Link to={"/file/"+value.fileId}>{value.file_name}</Link> */}
                        </div>
                      );
                    } else {
                      return (
                        <Button
                          onClick={(e) => {
                            handleAssignModel(value);
                            navigate(`/Model_page`, {
                              state: { fileId: value._id },
                            });
                          }}
                        >
                          {value.file_name}
                        </Button>
                      );
                    }
                  },
                },
              },

              {
                name: "createdAt",
                label: "Created At",
              },

              {
                name: "file",
                label: "Action",

                options: {
                  filter: true,
                  sort: true,

                  display:
                    localStorage.getItem("userType") === "Manager" ||
                    localStorage.getItem("userType") === "Audit Manager"
                      ? "true"
                      : "excluded",
                  customBodyRender: (value, row) => {
                    return (
                      <Button
                        onClick={(e) => {
                          setUserId(false);
                          setActiveFile(value);
                          handleAssignModel(value);
                          setAssignedType(value.assignmentType);
                        }}
                      >
                        Assign
                      </Button>
                    );
                  },
                },
              },

              {
                name: "file",
                label: "assignment Type",
                options: {
                  filter: true,
                  sort: true,
                  display:
                    localStorage.getItem("userType") === "Manager" ||
                    localStorage.getItem("userType") === "Audit Manager"
                      ? "true"
                      : "excluded",
                  customBodyRender: (value, row) => {
                    return <a>{value.assignmentType}</a>;
                  },
                },
              },

              {
                name: "file",
                label: "Status",
                options: {
                  filter: true,
                  sort: true,
                  display:
                    localStorage.getItem("userType") === "Manager" ||
                    localStorage.getItem("userType") === "Audit Manager"
                      ? "true"
                      : "excluded",
                  customBodyRender: (value, row) => {
                    return <a>{value.status}</a>;
                  },
                },
              },

              {
                name: "_id",
                label: "Export",
                options: {
                  filter: true,
                  sort: true,
                  display:
                    localStorage.getItem("userType") === "Manager" ||
                    localStorage.getItem("userType") === "Audit Manager"
                      ? "true"
                      : "excluded",
                  customBodyRender: (value, row) => {
                    return (
                      <a
                        className="btn btn-primary action-button"
                        href={Config.BaseURL + "downloadExcel?fileId=" + value}
                      >
                        Export
                      </a>
                    );
                  },
                },
              },
            ]}
            options={{
              selectableRows: "none",
              customToolbar: () => {
                <></>;
              },
              print: false,
              download: false,
              search: false,
              viewColumns: false,
              filter: false,
            }}
          />
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">NodeList</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={node_id}
                label="Node"
                onChange={handleChange}
              >
                {node.map((item, i) => {
                  return (
                    <MenuItem key={i} value={item._id}>
                      {item.Node}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <label htmlFor="upload_button">
              <input
                type="file"
                id="upload_button"
                accept=".xlsx,.xls"
                onChange={upload}
              />
              <div
                style={{ marginRight: "100px", marginTop: "10px" }}
                className="upload_button"
              >
                Upload
              </div>
            </label>
          </Box>
        </Modal>

        {(localStorage.getItem("userType") === "Manager" ||
          localStorage.getItem("userType") === "Audit Manager") && (
          <Modal
            open={open2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid container sx={{ padding: "20px 0px" }}>
                <Grid xs={12}>
                  <div style={{ marginLeft: "200px" }}>
                    {(localStorage.getItem("userType") === "Manager" ||
                      localStorage.getItem("userType") === "Audit Manager") && (
                      <FormControl>
                        <RadioGroup
                          value="disabled"
                          aria-labelledby="demo-controlled-radio-buttons-group"
                          name="controlled-radio-buttons-group"
                          row
                        >
                          <FormControlLabel
                            disabled={assignedType === "Attribute Wise"}
                            value="file wise"
                            checked={filewise === "file wise"}
                            onChange={(e) => {
                              setFilewise(
                                e.target.checked
                                  ? "file wise"
                                  : "attribute wise"
                              ) ||
                                setFilewises(
                                  e.target.checked
                                    ? "file wise"
                                    : "attribute wise"
                                );
                            }}
                            control={
                              <Radio
                                disabled={assignedType === "Attribute Wise"}
                              />
                            }
                            label="File Wise"
                          />
                          <FormControlLabel
                            disabled={assignedType === "File Wise"}
                            value="attribute wise"
                            checked={filewise === "attribute wise"}
                            onChange={(e) => {
                              setFilewise(
                                e.target.checked
                                  ? "attribute wise"
                                  : "file wise"
                              ) ||
                                setFilewises(
                                  e.target.checked
                                    ? "attribute wise"
                                    : "file wise"
                                );
                            }}
                            control={
                              <Radio disabled={assignedType === "File Wise"} />
                            }
                            label="Attribute Wise"
                          />
                        </RadioGroup>
                      </FormControl>
                    )}
                  </div>
                </Grid>
              </Grid>
              File mode: {filewise || filewises}
              {filewise === "file wise" || filewises === "file wise" ? (
                <Grid>
                  <Grid container sx={{ padding: "20px 0px" }}>
                    <Grid xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        Select User
                      </InputLabel>
                    </Grid>

                    {(localStorage.getItem("userType") === "Manager" ||
                      localStorage.getItem("userType") === "Audit Manager") && (
                      <Grid xs={6}>
                        <FormControl fullWidth>
                          {console.log("Some values", fileObj)}
                          {localStorage.getItem("userType") === "Manager" ||
                          localStorage.getItem("userType") ===
                            "Audit Manager" ? (
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="UserId"
                              value={userId}
                              onChange={(e) => {
                                console.log("users", users);
                                setUserId(e.target.value);
                              }}
                            >
                              {users.map((item, i) => {
                                return (
                                  <MenuItem key={i} value={item._id}>
                                    {item.userName}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          ) : (
                            <Link
                              id="demo-simple-select-label"
                              to={"/file/" + fileObj.fileId}
                            ></Link>
                          )}
                        </FormControl>
                      </Grid>
                    )}
                    <Grid xs={12}>
                      <button
                        style={{ float: "right", marginTop: "10px" }}
                        type="button"
                        className="btn btn-primary action-button"
                        onClick={save}
                      >
                        Save
                      </button>
                      <button
                        style={{
                          float: "right",
                          marginTop: "10px",
                          marginRight: "10px",
                        }}
                        type="button"
                        className="btn btn-primary action-button"
                        onClick={handleClose2}
                      >
                        Close
                      </button>
                    </Grid>
                  </Grid>
                  <div></div>
                </Grid>
              ) : (
                <Box>
                  <Grid container>
                    <Grid xs={6}>
                      <InputLabel id="demo-simple-select-label">
                        Node
                      </InputLabel>
                    </Grid>
                    <Grid xs={6}>
                      <Box>{fileObj.Node}</Box>
                    </Grid>
                  </Grid>
                  {attributes.map((item, i) => {
                    return (
                      <Grid key={i} container>
                        <Grid xs={6}>
                          <InputLabel id="demo-simple-select-label">
                            {item.attribute}
                          </InputLabel>
                        </Grid>
                        {(localStorage.getItem("userType") === "Manager" ||
                          localStorage.getItem("userType") ===
                            "Audit Manager") && (
                          <Grid xs={6}>
                            <FormControl fullWidth>
                              {localStorage.getItem("userType") === "Manager" ||
                              localStorage.getItem("userType") ===
                                "Audit Manager" ? (
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={selectedUser[i]}
                                  label="UserId"
                                  onChange={(e) => {
                                    const userData = [...selectedUser];
                                    userData[i] = e.target.value;
                                    setSelectedUser(userData);
                                    setUserId(e.target.value);
                                  }}
                                >
                                  {users.map((item, i) => {
                                    return (
                                      <MenuItem key={i} value={item._id}>
                                        {item.userName}
                                      </MenuItem>
                                    );
                                  })}
                                </Select>
                              ) : (
                                <Link
                                  id="demo-simple-select-label"
                                  to={"/file/" + fileObj.fileId}
                                >
                                  {item.assignedUser}
                                </Link>
                              )}
                            </FormControl>
                          </Grid>
                        )}
                      </Grid>
                    );
                  })}
                  <div style={{ marginBottom: "40px" }}>
                    <button
                      style={{ float: "right", marginTop: "10px" }}
                      type="button"
                      className="btn btn-primary action-button"
                      onClick={save2}
                    >
                      Save
                    </button>
                    <button
                      style={{
                        float: "right",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      type="button"
                      className="btn btn-primary action-button"
                      onClick={handleClose2}
                    >
                      Close
                    </button>
                  </div>
                </Box>
              )}
            </Box>
          </Modal>
        )}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open3}
          onClose={handleClosed}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem>
            <Link to={"Global_CheckList"}>Global CheckList</Link>
          </MenuItem>
          <MenuItem>
            <Link to={"Attrubute_checklist"}>Attribute CheckList</Link>
          </MenuItem>
        </Menu>

        {/* <Modal
          open={open4}

          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description">
          <Box sx={style}>
            <FormControl fullWidth>
              <div>
                <Button type="button" style={{ float: "right", marginRight: "10px", width: "10px" }} className="btn btn-primary action-button" onClick={handleopen8}>Add</Button>
                {selectedRow1 !== false && <>
                  <Button type="button" style={{ float: "right", marginRight: "10px", width: "10px" }} className="btn btn-primary action-button" onClick={handleopen10}>Edit</Button>
                  <Button type="button" style={{ float: "right", marginRight: "10px", width: "10px" }} className="btn btn-primary action-button" onClick={() => {
                    setSelectedRow1(false)
                  }}>Unselect</Button>

                </>
                }
              </div>
              <MUIDataTable
                data={checklist}
                columns={[
                  {
                    name: "checkPoint",
                    label: "checkPoint",
                    options: {
                      filter: true,
                      sort: true,

                      customBodyRender: (value, row) => {
                        return value;
                      }
                    }
                  },
                ]}
                options={{
                  selectableRows: 'none',
                  customToolbar: () => { <></> },
                  print: false,
                  download: false,
                  search: false,
                  viewColumns: false,
                  filter: false,
                  setRowProps: (row, dataIndex, rowIndex) => {
                    return {
                      className: selectedRow1 === dataIndex ? 'SelectedRow' : '',
                    };
                  },
                  onRowClick: (dataIndex, rowIndex) => {
                    const selectedRow = checklist[rowIndex.dataIndex];
                    setSelectedRow1data(selectedRow);
                    setSelectedRow1(rowIndex.dataIndex);

                  }
                }}
              ></MUIDataTable>
            </FormControl>
            <button style={{ float: "right", marginTop: '10px' }} onClick={handleClose4} className="btn btn-danger">Close</button>
          </Box>
        </Modal> */}

        {(localStorage.getItem("userType") === "Manager" ||
          localStorage.getItem("userType") === "Audit Manager") && (
          <Modal
            open={open5}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FormControl fullWidth style={{ textAlign: "center" }}>
                <div>
                  <Button
                    type="button"
                    style={{
                      float: "right",
                      marginRight: "10px",
                      width: "10px",
                    }}
                    className="btn btn-primary action-button"
                    onClick={handleopen9}
                  >
                    Add
                  </Button>
                  {selectedRow2 !== false && (
                    <>
                      <Button
                        type="button"
                        style={{
                          float: "right",
                          marginRight: "10px",
                          width: "10px",
                        }}
                        className="btn btn-primary action-button"
                        onClick={handleopen11}
                      >
                        Edit
                      </Button>
                      <Button
                        type="button"
                        style={{
                          float: "right",
                          marginRight: "10px",
                          width: "10px",
                        }}
                        className="btn btn-primary action-button"
                        onClick={() => {
                          setSelectedRow2(false);
                        }}
                      >
                        Unselect
                      </Button>
                    </>
                  )}
                </div>
                <MUIDataTable
                  data={checkList}
                  columns={[
                    {
                      name: "dataType",
                      label: "dataType",
                      options: {
                        filter: true,
                        sort: true,

                        customBodyRender: (value, row) => {
                          return <>{value.dataType}</>;
                        },
                      },
                    },
                    {
                      name: "correctValue",
                      label: "correctValue",
                      options: {
                        filter: true,
                        sort: true,

                        customBodyRender: (value, row) => {
                          return <>{value.correctValue}</>;
                        },
                      },
                    },
                    {
                      name: "incorrectValue",
                      label: "incorrectValue",
                      options: {
                        filter: true,
                        sort: true,

                        customBodyRender: (value, row) => {
                          return <>{value.incorrectValue}</>;
                        },
                      },
                    },
                    {
                      name: "attributeName",
                      label: "attributeName",
                      options: {
                        filter: true,
                        sort: true,

                        customBodyRender: (value, row) => {
                          return <>{value.attributeName}</>;
                        },
                      },
                    },
                  ]}
                  options={{
                    selectableRows: "none",
                    customToolbar: () => {
                      <></>;
                    },
                    print: false,
                    download: false,
                    search: false,
                    viewColumns: false,
                    filter: false,
                    setRowProps: (row, dataIndex, rowIndex) => {
                      return {
                        className:
                          selectedRow2 === dataIndex ? "SelectedRows" : "",
                      };
                    },
                    onRowClick: (dataIndex, rowIndex) => {
                      const SelectedRows = checkList[rowIndex.dataIndex];
                      const data = SelectedRows.attribute;
                      setSelectedRow2data(data);
                      setSelectedRow2(rowIndex.dataIndex);
                    },
                  }}
                ></MUIDataTable>
              </FormControl>
              <button
                style={{ float: "right", marginTop: "10px" }}
                className="btn btn-danger"
                onClick={handleClose5}
              >
                Close
              </button>
            </Box>
          </Modal>
        )}

        <Modal
          open={open8}
          onClose={handleClose8}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <h4>Add CheckList</h4>
              <br></br>
              <div style={{ marginLeft: "50px" }}>
                <input
                  name="checkPoint"
                  value={checklistform.checkPoint}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const tempObj = { ...checklistform };
                    tempObj[name] = value;
                    setCheckListForm(tempObj);
                  }}
                  style={{ width: "500px", height: "50px" }}
                  placeholder="Add New CheckList"
                ></input>
              </div>
              <br></br>
              <Button style={{ float: "left" }} onClick={addChecKlist}>
                Save
              </Button>
              <Button onClick={handleClose8}>Cancel</Button>
            </FormControl>
          </Box>
        </Modal>

        <Modal
          open={open9}
          onClose={handleClose9}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <h4>Add CheckList</h4>
              <br></br>

              <input
                name="dataType"
                value={checklistform1.dataType}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const tempObj = { ...checklistform1 };
                  tempObj[name] = value;
                  setCheckListForm1(tempObj);
                }}
                style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                placeholder="dataType"
              ></input>
              <br></br>

              <input
                name="correctValue"
                value={checklistform1.correctValue}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const tempObj = { ...checklistform1 };
                  tempObj[name] = value;
                  setCheckListForm1(tempObj);
                }}
                style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                placeholder="correctValue"
              ></input>
              <br></br>

              <input
                name="incorrectValue"
                value={checklistform1.incorrectValue}
                onChange={(e) => {
                  const { name, value } = e.target;
                  const tempObj = { ...checklistform1 };
                  tempObj[name] = value;
                  setCheckListForm1(tempObj);
                }}
                style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                placeholder="incorrectValue"
              ></input>
              <br></br>
              <Button style={{ float: "left" }} onClick={AddCheckList}>
                Save
              </Button>
              <Button onClick={handleClose9}>Cancel</Button>
            </FormControl>
          </Box>
        </Modal>

        <Modal
          open={open10}
          onClose={handleClose10}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <h4>Edit CheckList</h4>
              <br></br>
              <div style={{ marginLeft: "50px" }}>
                <input
                  name="checkPoint"
                  value={selectedRow1data ? selectedRow1data.checkPoint : ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const tempObj = selectedRow1data
                      ? { ...selectedRow1data }
                      : {};
                    tempObj[name] = value;
                    setSelectedRow1data(tempObj);
                  }}
                  style={{ width: "500px", height: "50px" }}
                  placeholder="Edit CheckList"
                ></input>
              </div>
              <br></br>
              <Button style={{ float: "left" }} onClick={updateChecKlist}>
                Save
              </Button>
              <Button onClick={handleClose10}>Cancel</Button>
            </FormControl>
          </Box>
        </Modal>

        <Modal
          open={open11}
          onClose={handleClose11}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <FormControl fullWidth>
              <FormControl fullWidth>
                <h4>Edit CheckList</h4>
                <br></br>

                <input
                  name="dataType"
                  value={selectedRow2data ? selectedRow2data.dataType : ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const tempObj = selectedRow2data
                      ? { ...selectedRow2data }
                      : {};
                    tempObj[name] = value;
                    setSelectedRow2data(tempObj);
                  }}
                  style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                  placeholder="dataType"
                ></input>
                <br></br>

                <input
                  name="correctValue"
                  value={selectedRow2data ? selectedRow2data.correctValue : ""}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const tempObj = selectedRow2data
                      ? { ...selectedRow2data }
                      : {};
                    tempObj[name] = value;
                    setSelectedRow2data(tempObj);
                  }}
                  style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                  placeholder="correctValue"
                ></input>
                <br></br>

                <input
                  name="incorrectValue"
                  value={
                    selectedRow2data ? selectedRow2data.incorrectValue : ""
                  }
                  onChange={(e) => {
                    const { name, value } = e.target;
                    const tempObj = selectedRow2data
                      ? { ...selectedRow2data }
                      : {};
                    tempObj[name] = value;
                    setSelectedRow2data(tempObj);
                  }}
                  style={{ width: "500px", height: "50px", marginLeft: "50px" }}
                  placeholder="incorrectValue"
                ></input>
                <br></br>
                <Button style={{ float: "left" }} onClick={updateChecklist1}>
                  Save
                </Button>
                <Button onClick={handleClose11}>Cancel</Button>
              </FormControl>
            </FormControl>
          </Box>
        </Modal>

        <Modal
          open={open12}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* {allchecklistdata.map((item,i)=>{ */}
          <Box sx={style}>
            {console.log("checkListHistory", checkListHistory)}
            <FormControl fullWidth>
              <h4>CheckList History</h4>
              <MUIDataTable
                data={checkListHistory}
                columns={[
                  {
                    name: "filename",
                    label: "filename",
                    options: {
                      filter: true,
                      sort: true,

                      customBodyRender: (value, row) => {
                        return <>{value.file_name}</>;
                      },
                    },
                  },
                ]}
                options={{
                  selectableRows: "none",
                  customToolbar: () => {
                    <></>;
                  },
                  print: false,
                  download: false,
                  search: false,
                  viewColumns: false,
                  filter: false,
                  // setRowProps: (row, dataIndex, rowIndex) => {
                  //   return {
                  //     className: selectedRow2===dataIndex?'SelectedRows':'',
                  //   };
                  // },
                  onRowClick: (dataIndex, rowIndex) => {
                    const SelectedRows = checkListHistory[rowIndex.dataIndex];
                    const data = SelectedRows.filename;
                    console.log("fileid", data.fileId);
                    setOpen13(true);
                    checkListHistoryByfile(
                      data.fileId,
                      (res) => {
                        setCheckListHistory1(res.data);
                      },
                      (err) => {}
                    );
                    // setSelectedRow2data(data);
                    // setSelectedRow2(rowIndex.dataIndex);
                  },
                }}
              ></MUIDataTable>

              <Button
                style={{ width: "100px" }}
                className="btn btn-danger"
                onClick={handleClose12}
              >
                Close
              </Button>
              {/* <Input></Input> */}
            </FormControl>
          </Box>
          {/* } */}
        </Modal>

        <Modal
          open={open13}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {/* {allchecklistdata.map((item,i)=>{ */}
          <Box sx={style}>
            {console.log("checkListHistory", checkListHistory)}
            <FormControl fullWidth>
              <h4>CheckList History by file</h4>

              <MUIDataTable
                data={checkListHistory1}
                columns={[
                  {
                    name: "checkPoint",
                    label: "checkPoint",
                    options: {
                      filter: true,
                      sort: true,
                    },
                  },
                  {
                    name: "action",
                    label: "action",
                    options: {
                      filter: true,
                      sort: true,
                    },
                  },
                  {
                    name: "attributeName",
                    label: "attributeName",
                    options: {
                      filter: true,
                      sort: true,
                    },
                  },
                  {
                    name: "checkListType",
                    label: "checkListType",
                    options: {
                      filter: true,
                      sort: true,
                    },
                  },
                  {
                    name: "userName",
                    label: "userName",
                    options: {
                      filter: true,
                      sort: true,
                    },
                  },
                ]}
                options={{
                  selectableRows: "none",
                  customToolbar: () => {
                    <></>;
                  },
                  print: false,
                  download: false,
                  search: false,
                  viewColumns: false,
                  filter: false,
                  // setRowProps: (row, dataIndex, rowIndex) => {
                  //   return {
                  //     className: selectedRow2===dataIndex?'SelectedRows':'',
                  //   };
                  // },
                  // onRowClick: (dataIndex,rowIndex)=>{

                  //   const SelectedRows = checkListHistory[rowIndex.dataIndex];
                  //   const data = SelectedRows.filename;
                  //   console.log("fileid",data.fileId)
                  //   setOpen13(true);
                  //   checkListHistoryByfile(data.fileId,(res) => {
                  //   setCheckListHistory1(res.data);

                  //   },
                  //   (err)=>{

                  //   })
                  // setSelectedRow2data(data);
                  // setSelectedRow2(rowIndex.dataIndex);

                  //}
                }}
              ></MUIDataTable>

              {/* <MUIDataTable
                data={checkListHistory}
                columns={[
                  {
                    name: "filename",
                    label: "filename",
                    options: {
                      filter: true,
                      sort: true,
        
                      customBodyRender:(value,row)=>{
                        return <>{value.file_name}</>;
                      }
                    }
                  },
                ]}
                options={{
                  selectableRows: 'none',
                  customToolbar: () => {<></>},
                  print: false,
                  download: false,
                  search: false,
                  viewColumns: false,
                  filter: false,
                  // setRowProps: (row, dataIndex, rowIndex) => {
                  //   return {
                  //     className: selectedRow2===dataIndex?'SelectedRows':'',
                  //   };
                  // },
                  onRowClick: (dataIndex,rowIndex)=>{
              
                    const SelectedRows = checkListHistory[rowIndex.dataIndex];
                    const data = SelectedRows.filename;
                    console.log("fileid",data.fileId)
 
                    checkListHistoryByfile(data.fileId,(res) => {
                    setCheckListHistory1(res.data);

                    },
                    (err)=>{

                    })
                    // setSelectedRow2data(data);
                    // setSelectedRow2(rowIndex.dataIndex);

                  }
                }}
                
                ></MUIDataTable> */}

              {/* <Input></Input> */}
              <Button
                style={{ width: "100px" }}
                onClick={handleClose13}
                className="btn btn-danger"
              >
                Cancel
              </Button>
            </FormControl>
          </Box>
          {/* } */}
        </Modal>
      </div>
    </div>
  );
}

export default List;
