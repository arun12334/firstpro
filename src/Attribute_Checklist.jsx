import React, {useState,useEffect} from 'react';
import {checkListByType,addCheckList,updateCheckList} from './apiserver';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Attribute_checklist() {
    const [open6,setOpen5] = React.useState(false);
    const [open7,setOpen7] = React.useState(false);
    const [open9,setOpen9] = React.useState(false);
    const [open11,setOpen11] = React.useState(false);
    const [checkList,setCheckList] = React.useState([]);
    const [selectedRow2, setSelectedRow2] = React.useState(false);
    const [selectedRow2data, setSelectedRow2data] = React.useState({});
    const [addChhandleClickeckList1,setaddCheckList] = React.useState({});
    const [updateChecklist,setupdateChecklist] = React.useState({});

    const handleopen11 = () => setOpen11(true);
    const handleClose11 =() => setOpen11(false);

    const handleopen9 = () => setOpen9(true);
    const handleClose9 =() => setOpen9(false);

    const [checklistform1,setCheckListForm1] = React.useState({
      "attributeName" : "",
       "correctValue" : "",
       "incorrectValue" :"",
       "dataType": "",
        "typeId" : "2"
      });

    
      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        height: "450px",
        overflowY: "scroll",
      };


    useEffect(()=>{
      getCheckList();
    },[])

    const getCheckList =()=>{  
      let params2 = "2"
      checkListByType(params2,
        (res)=>{
        const attributeChecklist = res.data.map((item)=>{
          return {
            "attribute": item,
            "attributeName": item,
            "checkPoint": item,
            "dataType": item,
            "correctValue": item,
            "incorrectValue": item,
            "_id": item._id,
          }
        });
        setCheckList(attributeChecklist)
        setOpen5(true)
  
      },(err)=>{});
    }

    const AddCheckList =() =>{
      if(checklistform1.dataType==""){
        alert("dataType should not be empty")
        return;
      }
      if(checklistform1.correctValue==""){
        alert("correctValue should not be empty")
        return;
      }
      if(checklistform1.incorrectValue==""){
        alert("incorrectValue should not be empty")
        return;
      }
      if(checklistform1.attributeName==""){
        alert("attributeName should not be empty")
        return;
      }
      addCheckList(checklistform1,
        (res)=>{
          setOpen7(true)
          setOpen9(false)
        const attributeChecklist = res.data.map((item)=>{
          return {
            "attribute": item,
            "dataType": item,
            "correctValue": item,
            "incorrectValue": item,
            "_id": item._id,
          }
        });
        setaddCheckList(attributeChecklist)
  
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
      if(selectedRow2data.attributeName==""){
        alert("attributeName should not be empty")
        return;
      }
      updateCheckList(selectedRow2data,
        (res)=>{
          getCheckList();
          setOpen7(true)
          setOpen9(false)
        const attributeChecklist = res.data.map((item)=>{
          return {
            "attribute": item,
            "attributeName": item,
            "dataType": item,
            "correctValue": item,
            "incorrectValue": item,
            "_id": item._id,
          }
        });
        setaddCheckList(attributeChecklist)
  
      },(err)=>{});
    }

      return(
      <div className="container-fluid" >
        
      <div className="inner-header d-flex space-between align-center">
      <div className="left">
          <h4 className="page-title">Attribute Checklist</h4>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">Dashboard</li>
                <li class="breadcrumb-item" aria-current="page">View Checklist</li>
                <li class="breadcrumb-item active" aria-current="page">Attribute CheckList</li>
              </ol>
            </nav>
          </div>
          <div className="ct-right d-flex">
          <Link type= "button" className="btn btn-light mr1 ic-custom" to={"/list"}><ArrowBackIcon fontSize="small" color="primary"/></Link>
      
         {selectedRow2!==false && <>
      <button type="button"  className="btn btn-light mr1 ic-custom " onClick={handleopen11}><EditIcon fontSize="small" color="primary"/></button>
      <button type="button"  className="btn btn-secondary mr1 " onClick={()=>{
          setSelectedRow2(false)
          }}>Unselect</button>      
        </>}
        <button type="button"  className="btn btn-primary " onClick={handleopen9}>Add</button>
          </div>
          
      </div>
      <div >
         <div className="card">
         <MUIDataTable 
                      data={checkList}
            columns={[
              {
                name: "dataType",
                label: "dataType",
                options: {
                  filter: true,
                  sort: true,
    
                  customBodyRender:(value,row)=>{
                    return <>{value.dataType}</>;
                  }
                }
              },
                  {
                    name: "correctValue",
                    label: "correctValue",
                    options: {
                      filter: true,
                      sort: true,
    
                      customBodyRender:(value,row)=>{
                        return <>{value.correctValue}</>;
                      }
                    }
                  },
                  {
                    name: "incorrectValue",
                    label: "incorrectValue",
                    options: {
                      filter: true,
                      sort: true,
    
                      customBodyRender:(value,row)=>{
                        return <>{value.incorrectValue}</>;
                      }
                    }
                  },
                  {
                    name: "attributeName",
                    label: "attributeName",
                    options: {
                      filter: true,
                      sort: true,
    
                      customBodyRender:(value,row)=>{
                        return <>{value.attributeName}</>;
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
              setRowProps: (row, dataIndex, rowIndex) => {
                return {
                  className: selectedRow2===dataIndex?'SelectedRows':'',
                };
              },
              onRowClick: (dataIndex,rowIndex)=>{
                const SelectedRows = checkList[rowIndex.dataIndex];
                const data = SelectedRows.attribute;
                setSelectedRow2data(data);
                setSelectedRow2(rowIndex.dataIndex);

              }
            }}
            
            ></MUIDataTable>
         </div>
      </div>

       <Modal
      open={open9}
      onClose={handleClose9}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={ style }>
          <FormControl fullWidth>
            <h4>Add CheckList</h4><br></br>

            <input name="dataType" value={checklistform1.dataType} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = {...checklistform1};
            tempObj[name] = value;
            setCheckListForm1(tempObj);}}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="dataType"></input><br></br>

            <input name="correctValue" value={checklistform1.correctValue} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = {...checklistform1};
            tempObj[name] = value;
            setCheckListForm1(tempObj);}}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="correctValue"></input><br></br>

            <input name="incorrectValue" value={checklistform1.incorrectValue} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = {...checklistform1};
            tempObj[name] = value;
            setCheckListForm1(tempObj);}}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="incorrectValue"></input><br></br>

            <input name="attributeName" value={checklistform1.attributeName} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = {...checklistform1};
            tempObj[name] = value;
            setCheckListForm1(tempObj);}}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="attributeName"></input><br></br>
            <Button style={{float:'left'}} onClick={AddCheckList}>Save</Button>
            <Button onClick={handleClose9}>Cancel</Button>
          </FormControl>
        </Box>
      </Modal>

      <Modal
      open={open11}
      onClose={handleClose11}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={ style }>
          <FormControl fullWidth>
          <FormControl fullWidth>
            <h4>Edit CheckList</h4><br></br>

            <input name="dataType" value={selectedRow2data? selectedRow2data.dataType: ''} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = selectedRow2data? {...selectedRow2data}: {};
            tempObj[name] = value;
            setSelectedRow2data(tempObj);
          }}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="dataType"></input><br></br>

            <input name="correctValue" value={selectedRow2data? selectedRow2data.correctValue: ''} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = selectedRow2data? {...selectedRow2data}: {};
            tempObj[name] = value;
            setSelectedRow2data(tempObj);
          }}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="correctValue"></input><br></br>

            <input name="incorrectValue" value={selectedRow2data? selectedRow2data.incorrectValue: ''} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = selectedRow2data? {...selectedRow2data}: {};
            tempObj[name] = value;
            setSelectedRow2data(tempObj);
          }}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="attributeName"></input><br></br>
            <input name="attributeName" value={selectedRow2data? selectedRow2data.attributeName: ''} onChange={(e)=>{
            const {name, value} = e.target;
            const tempObj = selectedRow2data? {...selectedRow2data}: {};
            tempObj[name] = value;
            setSelectedRow2data(tempObj);
          }}
            style={{width:"500px",height:"50px",marginLeft:'50px'}} placeholder="attributeName"></input><br></br>
            <Button style={{float:'left'}} onClick={updateChecklist1}>Save</Button>
            <Button onClick={handleClose11}>Cancel</Button>
          </FormControl>
          </FormControl>
        </Box>
      </Modal>      
      </div>
    );

}