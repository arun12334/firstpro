import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CheckCircleSharpIcon from "@mui/icons-material/CheckCircleSharp";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Groups2Icon from "@mui/icons-material/Groups2";
import { fileCount } from "../../apiserver";
import "../style/chart.css";
import CopyRight from "./footer";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Chart = () => {
  let userType = localStorage.getItem("userType");
  let navigate = useNavigate();
  const [count, setCount] = React.useState({
    Sourcing: "",
    Keying: "",
    Normalization: "",
    Audit: "",
  });
  useEffect(() => {
    fileCount(
      (res) => {
        // console.log('a', res.Data[0]);
        setCount({
          Sourcing: res.Data[0].SourcingCount,
          Keying: res.Data[0].KeyingCount,
          Normalization: res.Data[0].NormalizationCount,
          Audit: res.Data[0].AuditCount,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const routeSource = (val) => {
    if (val === "Sourcing") {
      if (userType === "PT User") {
        navigate("/ptsrctable");
      } else {
        navigate("/sourceList");
      }
    }
  };
  return (
    <>
      <div className="content-wrapper inner">
        <div className="db-content-wrapper db-custom">
          <Card onClick={() => routeSource("Sourcing")}>
            <LaptopWindowsIcon style={{ color: "#EC6666" }} fontSize="large" />
            {userType === "Manager" && (
              <Typography variant="h3">
                {count.Sourcing ? count.Sourcing : 0}
              </Typography>
            )}
            <Typography>Sourcing</Typography>
          </Card>
          <Card>
            <Groups2Icon style={{ color: "#FEB456" }} fontSize="large" />
            {userType === "Manager" && (
              <Typography variant="h3">
                {count.Keying ? count.Keying : 0}
              </Typography>
            )}
            <Typography>Keying</Typography>
          </Card>
          <Card>
            <CheckCircleSharpIcon
              style={{ color: "#60D3B2" }}
              fontSize="large"
            />
            {userType === "Manager" && (
              <Typography variant="h3">
                {count.Normalization ? count.Normalization : 0}
              </Typography>
            )}
            <Typography>Normalization</Typography>
          </Card>
          <Card>
            <LibraryBooksIcon style={{ color: "#2BB9E8" }} fontSize="large" />
            {userType === "Manager" && (
              <Typography variant="h3">
                {count.Audit ? count.Audit : 0}
              </Typography>
            )}
            <Typography>Audit</Typography>
          </Card>
        </div>
      </div>

      <CopyRight />
      <div></div>
    </>
  );
};

export default Chart;
