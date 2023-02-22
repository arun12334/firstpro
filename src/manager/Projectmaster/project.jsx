import React, { useEffect } from "react";
import { withRouter } from "../../withrouter";
import Header from "../../Header";
import CopyRight from "../components/footer";
import Typography from "@mui/material/Typography";
import { Box, CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { experimentalStyled as styled } from "@mui/material/styles";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PersonIcon from "@mui/icons-material/Person";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { listProjectMaster, PTuserList, projectMaster } from "../../apiserver";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const currencies = [
  {
    value: "USD",
    label: "User 1",
  },
  {
    value: "EUR",
    label: "User 1",
  },
  {
    value: "BTC",
    label: "User 1",
  },
  {
    value: "JPY",
    label: "User 1",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Project = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [project, setProject] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [assignedUser, setAssignedUser] = React.useState("");
  const [client, setClient] = React.useState("");
  const [proj, setProj] = React.useState("");

  useEffect(() => {
    listProjectMaster(
      (res) => {
        console.log("aa", res);
        setProject(res.data);
      },
      () => {}
    );

    PTuserList(
      (res) => {
        console.log("user", res);
        setUserList(res.type.data);
      },
      () => {}
    );
  }, []);

  const getName = (val) => {
    setAssignedUser(val);
  };

  const createProject = () => {
    let data = {
      projectName: proj,
      clientName: client,
      assignedUser: assignedUser,
    };
    projectMaster(
      data,
      (res) => {
        console.log(res);
        window.location.reload(true);
      },
      () => {}
    );
  };

  return (
    <div>
      <Header />
      <Box className="inner-header">
        <Box className="left">
          <Typography variant="h5" gutterBottom>
            Project
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Masters
            </Link>

            <Typography color="text.primary">Project</Typography>
          </Breadcrumbs>
        </Box>

        <Box className="right">
          <FormControl sx={{ mr: 2, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Search...
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="Search..."
              type="text"
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton size="small" edge="end">
                    {<SearchOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button variant="contained" onClick={handleOpen}>
            Create
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="modal-header">
                <Typography variant="h5">Create Project</Typography>
                <CloseIcon onClick={() => setOpen(false)} />
              </div>
              <div className="modal-body">
                <TextField
                  id="standard-basic"
                  label="Enter Project Name"
                  variant="standard"
                  value={proj}
                  onChange={(e) => setProj(e.target.value)}
                />
                <TextField
                  id="standard-basic"
                  label="Enter Client Name"
                  variant="standard"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Assign Users"
                  defaultValue="EUR"
                  //   helperText="Please select your currency"
                  variant="standard"
                  value={assignedUser}
                >
                  {userList.map((row) => (
                    <MenuItem
                      key={row._id}
                      value={row.userName}
                      onClick={() => getName(row.userName)}
                    >
                      {row.userName}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="modal-footer text-right">
                <Button variant="contained" onClick={createProject}>
                  Create
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
      <div className="content-wrapper inner">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {project.map((row, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                <Item>
                  <Box className="top-wrapper">
                    <Box className="left">
                      <Box className="ic-wrp">
                        <TextSnippetIcon />
                      </Box>
                      <Typography variant="caption" display="block">
                        Project Name
                      </Typography>
                      <Typography variant="h6">{row.projectName}</Typography>
                    </Box>
                    <Box className="right">
                      <Box className="ic-wrp">
                        <PersonIcon />
                      </Box>
                      <Typography variant="caption" display="block">
                        Client Name
                      </Typography>
                      <Typography variant="h6">{row.clientName}</Typography>
                    </Box>
                  </Box>
                  <Box className="divider"></Box>
                  <Box className="ms-ctns">
                    <Typography variant="caption" display="block">
                      Assigned Users
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                      {/* {row.assignedUser.map((row) => (
                        <Chip label={row} />
                      ))} */}
                      <Chip label={row.assignedUser} size="medium" />
                      {/* <Chip label="Gokul" size="medium" />
                      <Chip label="RajKumar" size="medium" />
                      <Chip label="Santosh" size="medium" /> */}
                    </Stack>
                  </Box>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
      <CopyRight />
    </div>
  );
};

export default withRouter(Project);
