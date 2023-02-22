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
import { experimentalStyled as styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { listFieldsMaster, processList, fieldsMaster } from "../../apiserver";

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

const rows = [
  createData("Sourcing ", "MFR_HTML URL", "Active"),
  createData("exported project images.Csv", "10th February, 2022", "Keying"),
];

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

const sts = [
  {
    id: 0,
    value: "InActive",
  },
  {
    id: 1,
    value: "Active",
  },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Field = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fieldList, setFieldList] = React.useState([]);
  const [proList, setProcessList] = React.useState([]);
  const [fieldName, setFieldName] = React.useState("");
  const [process, setProcess] = React.useState("");
  const [status, setStatus] = React.useState();
  const createField = () => {
    let data = {
      fieldName: fieldName,
      status: `${status}`,
      processName: process,
    };
    fieldsMaster(
      data,
      (res) => {
        console.log("ss");
        window.location.reload(true);
      },
      () => {}
    );
  };
  useEffect(() => {
    listFieldsMaster(
      (res) => {
        // console.log("a", res);
        setFieldList(res.data);
      },
      () => {}
    );

    processList(
      (res) => {
        console.log("sdf", res);
        setProcessList(res.type.data);
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
            Fields
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              Masters
            </Link>

            <Typography color="text.primary">Fileds</Typography>
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
                <Typography variant="h5">Create Field</Typography>
                <CloseIcon onClick={() => setOpen(false)} />
              </div>
              <div className="modal-body">
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select Process"
                  defaultValue="EUR"
                  //   helperText="Please select your currency"
                  variant="standard"
                >
                  {proList.map((option) => (
                    <MenuItem
                      key={option._id}
                      value={option.processName}
                      onClick={() => {
                        setProcess(option.processName);
                      }}
                    >
                      {option.processName}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-basic"
                  label="Type Field Name"
                  variant="standard"
                  onChange={(e) => setFieldName(e.target.value)}
                  value={fieldName}
                />
                <TextField
                  id="standard-select-currency"
                  select
                  label="Select Status"
                  defaultValue="EUR"
                  //   helperText="Please select your currency"
                  variant="standard"
                >
                  {sts.map((row) => (
                    <MenuItem
                      key={row.id}
                      value={row.value}
                      onClick={() => setStatus(row.id)}
                    >
                      {row.value}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="modal-footer text-right">
                <Button variant="contained" onClick={() => createField()}>
                  Create
                </Button>
              </div>
            </Box>
          </Modal>
        </Box>
      </Box>
      <div className="content-wrapper inner">
        <Card>
          <CardContent>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Process</StyledTableCell>
                    <StyledTableCell>Field Name</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Actions </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fieldList.map((row) => (
                    <StyledTableRow key={row._id}>
                      <StyledTableCell component="th" scope="row">
                        {row.process}
                      </StyledTableCell>
                      <StyledTableCell>{row.fieldName}</StyledTableCell>
                      <StyledTableCell>
                        {row.status ? "Active" : "Inactive"}
                      </StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          className="tb-btn"
                          aria-label="delete"
                          size="medium"
                        >
                          <ModeEditOutlineIcon fontSize="inherit" />
                        </IconButton>
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
    </div>
  );
};

export default withRouter(Field);
