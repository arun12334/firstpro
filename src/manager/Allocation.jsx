import React, { useEffect } from "react";
import { withRouter } from "../withrouter";
import Header from "../Header";
import CopyRight from "./components/footer";
import Typography from "@mui/material/Typography";
import { Box, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import IconButton from "@mui/material/IconButton";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Paper from '@mui/material/Paper';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
// Drawer imports
import Drawer from "@mui/material/Drawer";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  allsrcFileList,
  listfieldpopulate,
  listcolumnsearch,
} from "../apiserver";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

function createData(name, ImportedDate, Process, Project) {
  return { name, ImportedDate, Process, Project };
}

const Allocation = () => {
  const [process, setProcess] = React.useState("");

  const handleChange = (event) => {
    setProcess(event.target.value);
    console.log(setProcess);
  };

  // ------------- Drawer Inputs
  const [field, setField] = React.useState([]);

  const typeChange = (e) => {
    // console.log("aaa", e);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    console.log("ss");
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    console.log("asdasd", anchor);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {anchor === "top" ? (
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
  const [drawerCon, setDrawerCon] = React.useState(false);
  const [allocate, setAllowcate] = React.useState("");
  const [listColl, setListColl] = React.useState([]);
  const [column1, setColumn1] = React.useState("");
  const [colum, setColumn] = React.useState("");
  const fieldDrawer1 = (val) => {
    setColumn1();
  };
  const handleDrawer = (val, fileId) => {
    // console.log("hell", val);
    sessionStorage.setItem("fileIdAllocate", fileId);
    setAllowcate(val);
    listcolumnsearch(
      fileId,
      (res) => {
        console.log("res of Colum", res);
        setListColl(res.type.data);
      },
      () => {}
    );
    listfieldpopulate(
      fileId,
      (res) => {
        setField(res.type.data);
      },
      () => {}
    );
    setDrawerCon(true);
    // if (val === "Field Wise") {
    //   console.log("aa");
    // } else {
    //   setDrawerCon(true);
    // }
  };
  const fieldDrawer = () => {};
  const [tableData, setData] = React.useState([]);
  useEffect(() => {
    let type = localStorage.getItem("UserTypeId");
    let id = localStorage.getItem("_id");
    allsrcFileList(
      { userType: type, userId: id },
      (res) => {
        // console.log("aa", res);
        setData(res.data);
      },
      () => {}
    );
  }, []);

  return (
    <>
      {/* -----------------  Header -------------------- */}
      <div>
        <Header />
      </div>
      <Box className="inner-header">
        <Box className="left">
          <Typography variant="h5" gutterBottom>
            Allocation
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
        <Box className="right">
          <Button variant="contained">Allocate</Button>
        </Box>
      </Box>

      {/* -----------------  Drawer Output -------------------- */}
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <SwipeableDrawer
              anchor={"right"}
              open={drawerCon}
              onClose={() => setDrawerCon(false)}
              // onOpen={toggleDrawer(anchor, true)}
              style={{ zIndex: 1250 }}
            >
              <FormControl>
                <div className="drawer-header">
                  <Typography variant="h5" gutterBottom>
                    {allocate}
                  </Typography>
                </div>
                <div className="drawer-body">
                  {allocate === "Field Wise" && (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="female"
                      name="radio-buttons-group"
                    >
                      {field.map((row) => (
                        <FormControlLabel
                          value={row}
                          control={<Radio />}
                          label={row}
                        />
                      ))}
                    </RadioGroup>
                  )}
                  <FormControl style={{ width: "100%" }}>
                    <div className="divider"></div>
                    {/* <div></div> */}
                    <FormControl>
                      <InputLabel id="demo-simple-select-standard-label">
                        Colum search by 1
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        // value={process}
                        // onChange={handleChange}
                        label="Colum search by 1"
                      >
                        {listColl.map((val) => (
                          <MenuItem
                            value={val}
                            onClick={() => fieldDrawer1(val)}
                          >
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-standard-label 1">
                        Colum search by 2
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label 1"
                        id="demo-simple-select-standard"
                        // value={process}
                        // onChange={handleChange}
                        label="Colum search by 2"
                      >
                        {listColl.map((val) => (
                          <MenuItem
                            value={val}
                            onClick={() => fieldDrawer(val)}
                          >
                            {val}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl style={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-standard-label 2">
                        Field to be populate
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-standard-label 2"
                        id="demo-simple-select-standard"
                        // value={process}
                        // onChange={handleChange}
                        label="Colum search by 1"
                      >
                        {listColl.map((val) => (
                      <MenuItem
                        value={val}
                        onClick={() => fieldDrawer(val)}
                      >
                        {val}
                      </MenuItem>
                    ))}
                      </Select>
                    </FormControl>
                  </FormControl>
                  <></>
                </div>
                <div className="drawer-footer">
                  <Button variant="outlined">Cancel</Button>
                  <Button variant="contained">Save</Button>
                </div>
              </FormControl>
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>

      {/* --------------- Table --------------------- */}
      <div className="content-wrapper inner">
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Box className="page-header">
              <Box className="left">
                <Typography variant="h5" gutterBottom>
                  Allocation List
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
                    <StyledTableCell align="right">Process</StyledTableCell>
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">
                      Allocated By
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      Allocation Type
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.file_name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.processName}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.status}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.assignmentType}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <FormControl
                          className="imp-child_lrg"
                          variant="standard"
                        >
                          <InputLabel id="demo-simple-select-standard-label">
                            Select Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            // value={process}
                            // onChange={handleChange}
                            onChange={(e) => typeChange(e)}
                            label="Select Process"
                          >
                            <MenuItem
                              value={1}
                              onClick={(e) =>
                                handleDrawer("Field Wise", row.fileId)
                              }
                            >
                              Field Wise
                            </MenuItem>
                            <MenuItem
                              value={2}
                              onClick={(e) =>
                                handleDrawer("File Wise", row.fileId)
                              }
                            >
                              File Wise
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </div>

      <CopyRight />
    </>
  );
};

export default withRouter(Allocation);
