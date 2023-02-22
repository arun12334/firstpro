import React, { useEffect } from "react";
import { withRouter } from "../withrouter";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Header from "../Header";
import CopyRight from "../manager/components/footer";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Box, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import { getfiles } from "../apiserver";
import { useNavigate } from "react-router-dom";

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

const SrcFilelist = () => {
  let navigate = useNavigate();
  const [fileList, setFileList] = React.useState([]);
  useEffect(() => {
    let params = `?userType=${localStorage.getItem(
      "UserTypeId"
    )}&userId=${localStorage.getItem("_id")}`;
    getfiles(
      params,
      (res) => {
        // console.log("aaa", res);
        setFileList(res.data);
      },
      () => {}
    );
  }, []);
  const spreedSheet = (val) => {
    navigate("/ptSheet");
    sessionStorage.setItem("ptFile", val);
  };
  return (
    <div>
      <Header />
      <Box className="inner-header">
        <Box className="left">
          <Typography variant="h5" gutterBottom>
            Sourcing
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
        {/* <Box className="right">
          <Button variant="contained">Allocate</Button>
        </Box> */}
      </Box>
      <div className="content-wrapper inner">
        <Card>
          <CardContent>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>File Name</StyledTableCell>
                    {/* <StyledTableCell align="right">No.of SKU's</StyledTableCell> */}
                    <StyledTableCell align="right">Status</StyledTableCell>
                    <StyledTableCell align="right">Alloted on</StyledTableCell>
                    <StyledTableCell align="right">
                      Completed on
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fileList.map((row) => (
                    <StyledTableRow
                      key={row._id}
                      onClick={() => spreedSheet(row.fileId)}
                    >
                      <StyledTableCell align="right">
                        {row.file_name}
                      </StyledTableCell>
                      {/* <StyledTableCell component="th" scope="row">
                        {row.file_name}
                      </StyledTableCell> */}
                      <StyledTableCell align="right">
                        {row.status === 4 ? "Completed" : "InProgress"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {new Date(row.createdAt).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {new Date(row.updatedAt).toDateString()}
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

export default withRouter(SrcFilelist);
