import React, { useEffect } from "react";
import Header from "../Header";
import Typography from "@mui/material/Typography";
import { Box, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import CopyRight from "./components/footer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Drawer from "@mui/material/Drawer";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { processList, getfiles, fieldlist, uploadFile } from "../apiserver";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Import = () => {
  const [process, setProcess] = React.useState("");
  const [procesLift, setProcesLift] = React.useState([]);
  const [fileList, setFileList] = React.useState([]);
  const [fileName, setFile] = React.useState("");
  const [drawer, setDrawer] = React.useState(false);
  const [fieldList, setFiledList] = React.useState([]);
  const [selField, setSelField] = React.useState([]);
  const [file, setFileForApi] = React.useState();
  let s = [];
  // let a;

  const handleChange = (event) => {
    setProcess(event.target.value);
  };

  const getFile = (e) => {
    // a = e.target.files[0];
    setFileForApi(e.target.files[0]);
    setFile(e.target.files[0].name);
  };

  const uploadfile = () => {
    uploadFile(
      {
        projectId: sessionStorage.getItem("project"),
        processId: sessionStorage.getItem("process"),
        field: selField.toString(),
        file: file,
      },
      (res) => {
        console.log("r", res);
        window.location.reload(true);
        sessionStorage.removeItem("process");
      },
      () => { }
    );
  };

  const getField = (e) => {
    if (e.target.checked) {
      s.push(e.target.value);
      setSelField([...selField, e.target.value]);
    }
  };
  const fieldDrawer = (val) => {
    setDrawer(!drawer);
    console.log("aaa", val);
    sessionStorage.setItem("process", val._id);
    fieldlist(
      val.processName,
      (res) => {
        setFiledList(res.type.data);
      },
      () => { }
    );
  };
  useEffect(() => {
    processList(
      (res) => {
        setProcesLift(res.type.data);
      },
      () => { }
    );

    let params = `?userType=${localStorage.getItem(
      "UserTypeId"
    )}&userId=${localStorage.getItem("_id")}`;
    getfiles(
      params,
      (res) => {
        setFileList(res.data);
      },
      () => { }
    );
  }, []);

  return (
    <>
      <div>
        <Header />
        <Box className="inner-header">
          <Box className="left">
            <Typography variant="h5" gutterBottom>
              Imports
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
        </Box>
        <div className="content-wrapper inner">
          <Card>
            <CardContent>
              <Box className="imports-input-wrapper">
                <FormControl
                  className="imp-child1"
                  variant="standard"
                  sx={{ m: 2 }}
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Select Process
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={process}
                    onChange={handleChange}
                    label="Select Process"
                  >
                    {procesLift.map((val) => (
                      <MenuItem
                        value={val._id}
                        onClick={() => fieldDrawer(val)}
                      >
                        {val.processName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input
                  hidden
                  accept=".xlsx,.xls"
                  id="file_upload"
                  type="file"
                  name="upInput"
                  onChange={(e) => getFile(e)}
                />
                <label
                  htmlFor="file_upload"
                  className="m-0"

                >
                  <Box className="image-input h-100 w-100">
                    <div
                      className="w-100 h-100"
                      style={{
                        borderBottom: "1px solid grey",
                        color: "black",
                        padding: 10,
                      }}
                    >
                      {fileName ? fileName : "Select your file"}
                    </div>
                  </Box>
                </label>
                <Box className="btn-import">
                  <Button
                    variant="outlined"
                    onClick={() => window.location.reload(true)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={() => uploadfile()}>
                    Upload
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Box className="page-header">
                <Box className="left">
                  <Typography variant="h5" gutterBottom>
                    Recent Uploads
                  </Typography>
                </Box>

                <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
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
              </Box>

              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>File Name</StyledTableCell>
                      <StyledTableCell align="right">
                        Imported Date
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        Process&nbsp;(g)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileList.map((row) => (
                      <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                          {row.file_name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {new Date(row.createdAt).toDateString()}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.processName}
                        </StyledTableCell>
                        {/* <StyledTableCell align="right">
                          {row.projectName}
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
        <CopyRight />
      </div>
      <Drawer
        anchor={"right"}
        open={drawer}
        onClose={() => setDrawer(!drawer)}
        style={{ width: "250px" }}
      >
        <div className="drawer">
        <div className="drawer-header">
          <Typography variant='h5' gutterBottom>Add Additional Fields</Typography>
        </div>
        <div className="drawer-body">
          {fieldList.map((val) => (
            <div>
              <input
                type="checkbox"
                id={val._id}
                onChange={(e) => getField(e)}
                value={val.fieldName}
              />
              <label htmlFor={val._id}>{val.fieldName}</label>
              <br />
            </div>
          ))}
        </div>
        <div className="drawer-footer">
        <Button variant="outlined" style={{MarginRight:'10'}}>Cancel</Button>
          <Button variant="contained" onClick={() => setDrawer(!drawer)}>
            Save
          </Button>
        </div>
        </div>
      </Drawer>
    </>
  );
};

export default Import;
