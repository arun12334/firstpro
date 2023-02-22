import React, {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Backdrop from './backdrop';
import Loader from 'react-js-loader'
import {allCheckListFile,checkListHistoryByfile,updateCheckList} from "./apiserver";
import { InputLabel } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MUIDataTable from 'mui-datatables';


export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [loader,setLoader] = useState(false);
  const [node_id, setNode_id] = React.useState("");
  const [open6,setOpen6] = React.useState(false);
  const [open10,setOpen10] = React.useState(false);
  const [open13,setOpen13] = React.useState(false);
  const [checkListHistory, setCheckListHistory] = React.useState([]);
  const [selectedchecklist,setSelectedChecklist] = React.useState([]);
  const [checkListHistory1, setCheckListHistory1] = React.useState([]);
  const [updateChecklist,setupdateChecklist] = React.useState({});
  const [addChhandleClickeckList1,setaddCheckList] = React.useState({});
  const [selectedRow1, setSelectedRow1] = React.useState(false);
  const [selectedRow2, setSelectedRow2] = React.useState(false);
  const [selectedRow1data, setSelectedRow1data] = React.useState({});
  const [selectedRow2data, setSelectedRow2data] = React.useState({});
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange= (event) => {
    setSelectedChecklist(event.target.value);
  };

  useEffect(()=>{
    getallCheckListHistory();
    // checkListHistoryByfile();
  },[])

  const getallCheckListHistory = ()=>{

    // const allchecklistdata = fileId.map((item,i)=>{
    //   return{
    //     "fileId": item.fileId,
    //   }
    // });
    // setLoader(true)

    allCheckListFile(
      (res)=>{
        setLoader(false)
        console.log(res);
        // const mappedData = res.data.map(value=>{
        //   return {
        //     filename: value
        //   }
        // })
        setCheckListHistory(res.data)
    },
    ()=>{
        setLoader(false)
    }
    )   
}

const updateChecKlist = () =>{
    if(selectedRow1data.checkPoint=="") {
      alert("checkpoint should not be empty")
      return;
    }
    
    
    updateCheckList(selectedRow1data,
      (res)=>{
        console.log("res")
        console.log(selectedRow1data)
      setOpen6(true)
      setOpen10(false)

      const globalChecklist = res.data.map((item)=>{
        return {
          "global": item,
          "action": item,
          "checkPoint": item.checkPoint,
          "userName": item,
          "updatedAt": item,
          "_id": item._id,
        }
      });

      setupdateChecklist(globalChecklist);
      // setLoader(false)
    },(err)=>{});
  }

  const updateChecklist1 =() =>{
    if(selectedRow2data.dataType==""){
      alert("dataType should not be empty")
      return;
    }
    if(selectedRow2data.correctValue==""){
      alert("correctValue should not be empty")
      return;
    }
    if(selectedRow2data.incorrectValue==""){
      alert("incorrectValue should not be empty")
      return;
    }
    updateCheckList(selectedRow2data,
      (res)=>{
 
      const attributeChecklist = res.data.map((item)=>{
        return {
          "attribute": item,
          "attributeName": item,
          "dataType": item,
          "correctValue": item,
          "incorrectValue": item,
          "userName": item,
          "updatedAt": item,
          "_id": item._id,
        }
      });
      setaddCheckList(attributeChecklist)

    },(err)=>{});
  }

  const checkListbytype=(e)=>{
    debugger;   
    console.log("fileid",selectedchecklist)
    setOpen13(true);
    checkListHistoryByfile(selectedchecklist,(res) => {
      setCheckListHistory1(res.data);
      
    },
    (err)=>{

    })
    // setSelectedRow2data(data);
    // setSelectedRow2(rowIndex.dataIndex);
    
  }



  return (
    <div>
        {loader && <Backdrop>
      <Loader
                    type="box-rotate-x"
                    bgColor={"#32E0A1"}
                    title={"Please wait..."}
                    color={"#fff"}
                    size={100}
                  />
      </Backdrop>}
      <div className="container-fluid">
      <div className="inner-header d-flex space-between align-center">
          <div className="left">
            <h4 className="page-title">Checklist History</h4>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Dashboard</li>
                <li class="breadcrumb-item active" aria-current="page">Checklist History</li>
              </ol>
            </nav>
          </div>

          <div className="ct-right d-flex text-center">
          <div className='checklist text-center d-flex align-items-center mb-0'>
          
          <h5 >Select the checkList file to display the data</h5>
          <div className='Ck-inp'>
            {console.log(checkListHistory, "checkListHistory")}
            <Select style={{ width: '250px', height: "40px" , marginLeft:"10px"}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedchecklist}
              label="Select File Name"
              onChange={handleChange}
            >
              {checkListHistory.map((value, i) => {
                return (<MenuItem key={value._id} value={value.fileId}>{value.file_name}</MenuItem>)
              })}

            </Select>
            <button  className="btn btn-primary ic-custom " onClick={checkListbytype}>
              <ArrowForwardIcon />
            </button>
          </div>
          <div>
            
          </div>
          
        </div>
          <div>
            <Link type='button' className='btn btn-light mr1 ic-custom ms-2' to={"/list"}>Back</Link>
            
          </div>
           
          </div>

        </div>
        <div className="card">
        
      
      <div >
        
        <MUIDataTable
          data={checkListHistory1}
          columns={[
            {
              name: "attributeName",
              label: "attributeName",
              options: {
                filter: true,
                sort: true,
              }
            },
            {
              name: "checkListType",
              label: "checkListType",
              options: {
                filter: true,
                sort: true,
              }
            },
            {
              name: "Rule",
              label: "Rule",
              options: {
                filter: true,
                sort: true,
              }
            },
            {
              name: "action",
              label: "action",
              options: {
                filter: true,
                sort: true,
              }
            },
            {
              name: "userName",
              label: "userName",
              options: {
                filter: true,
                sort: true,
              }
            },
            {
              name: "updatedAt",
              label: "updatedAt",
              options: {
                filter: true,
                sort: true,
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
            rowsPerPageOptions: false,
            pagination: false,
            responsive: 'stacked',

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

                  //   },
                  //   (err)=>{

                  //   })
                    // setSelectedRow2data(data);
                    // setSelectedRow2(rowIndex.dataIndex);

                  //}
                }}
                
                ></MUIDataTable>
                </div>
                </div>
      </div>
    </div>
    
  );
}