import React, { useEffect } from "react";
import { withRouter } from "../withrouter";
import Chart from "./components/Chart";
import Header from "../Header";
import "../App.css";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { selectedProject } from "../store/reducer/selectProject";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { projectList } from "../apiserver";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  let dispatch = useDispatch();
  const [project, setProject] = React.useState("");
  const [proList, setProjectList] = React.useState([]);

  const handleChange = (event) => {
    setProject(event.target.value);
  };

  const selectProject = (e) => {
    sessionStorage.setItem("project", e._id);
    dispatch(selectedProject(e));
  };

  useEffect(() => {
    projectList(
      (res) => {
        sessionStorage.setItem("project", res.type.data[0]._id);
        setProjectList(res.type.data);
        setProject(res.type.data[0]._id);
      },
      () => {}
    );
  }, []);

  return (
    <div>
      <Header />
      <Box className="inner-header">
        <Box className="left">
          <Typography variant="h5" gutterBottom>
            Dashboard
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              MUI
            </Link>
            <Link
              underline="hover"
              color="inherit"
              href="/material-ui/getting-started/installation/"
            >
              Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Project
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              label="Select Project"
              value={project}
              onChange={handleChange}
            >
              {proList.map((pro) => (
                <MenuItem
                  value={pro._id}
                  onClick={() => {
                    selectProject(pro);
                  }}
                  key={pro._id}
                >
                  {pro.projectName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Chart />
    </div>
  );
};

export default withRouter(Dashboard);
