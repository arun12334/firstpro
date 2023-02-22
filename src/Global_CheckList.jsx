import React, { useEffect } from "react";
import { checkListByType, updateCheckList, addCheckList } from './apiserver';
import MUIDataTable from "mui-datatables";
import { Link, useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Global_CheckList() {
  const [open4, setOpen4] = React.useState(false);
  const [checklist, setChecklist] = React.useState([])
  const [selectedRow1, setSelectedRow1] = React.useState(false);
  const [selectedRow1data, setSelectedRow1data] = React.useState({});
  const [open8, setOpen8] = React.useState(false);
  const [open10, setOpen10] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [updatechecklist, setupdateChecklist] = React.useState({});
  const [addChecklist, setaddChecklist] = React.useState({});
  const [checklistform, setCheckListForm] = React.useState({
    "checkPoint": "",
    "attributeName": "",
    "typeId": "1"
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

  useEffect(() => {
    getChecklist();
  }, [])

  const getChecklist = () => {
    let params = "1"
    checkListByType(params,
      (res) => {
        console.log("res")
        const globalChecklist = res.data.map((item) => {
          return {
            "global": item,
            "checkPoint": item.checkPoint,
            "_id": item._id,
          }
        });
        setChecklist(globalChecklist);
        setOpen4(true)

      }, (err) => { });
  }
  const updateChecklist = () => {
    if (selectedRow1data.checkPoint == "") {
      alert("checkpoint should not be empty")
      return;
    }


    updateCheckList(selectedRow1data,
      (res) => {
        debugger;
        console.log("res")
        console.log(selectedRow1data)

        getChecklist();
        setOpen6(true)
        setOpen10(false)

        const globalChecklist = res.data.map((item) => {
          return {
            "global": item,
            "checkPoint": item.checkPoint,
            "_id": item._id,
          }
        });

        setupdateChecklist(globalChecklist);
        // setLoader(false)
      }, (err) => { });
  }

  const addChecKlist = () => {
    if (checklistform.checkPoint == "") {
      alert("checkpoint should not be empty")
      return;
    }


    addCheckList(checklistform,
      (res) => {
        console.log("res")
        setOpen8(false);

        setOpen6(true)
        setOpen8(false)

        const globalChecklist = res.data.map((item) => {
          return {
            "global": item,
            "checkPoint": item.checkPoint,
            "_id": item._id,
          }
        });

        setaddChecklist(globalChecklist);
        // setLoader(false)
      }, (err) => { });
  }

  const handleopen8 = () => setOpen8(true);
  const handleClose8 = () => setOpen8(false);

  const handleopen10 = () => {

    setOpen10(true)
  };
  const handleClose10 = () => setOpen10(false);
  return (
    <div className="container-fluid" >


      <div className="inner-header d-flex space-between  align-center">
        <div className="left">
          <h4 className="page-title">Global Checklist</h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">Dashboard</li>
              <li class="breadcrumb-item" aria-current="page">View Checklist</li>
              <li class="breadcrumb-item active" aria-current="page">Global Checklist</li>
            </ol>
          </nav>
        </div>
        <div className="ct-right d-flex">
          <Link type="button" className="btn btn-light mr1 ic-custom" to={"/list"}><ArrowBackIcon fontSize="small" color="primary" /></Link>
          {selectedRow1 !== false && <>
            <button type="button" className="btn btn-light mr1 ic-custom" onClick={handleopen10}><EditIcon fontSize="small" color="primary" /></button>


          
          <button type="button" className="btn btn-secondary mr1" onClick={() => {
            setSelectedRow1(false)
          }}>Unselect</button>
          </>
          }
          <button type="button" className="btn btn-primary" onClick={handleopen8}>Add</button>
        </div>

      </div>
      <div>
        <div className="card">
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
        </div>
      </div>
      <Modal
        open={open10}
        onClose={handleClose10}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormControl fullWidth>
            <h4>Edit CheckList</h4><br></br>
            <div style={{ marginLeft: '50px' }}>
              <input
                name="checkPoint" value={selectedRow1data ? selectedRow1data.checkPoint : ''} onChange={(e) => {
                  const { name, value } = e.target;
                  const tempObj = selectedRow1data ? { ...selectedRow1data } : {};
                  tempObj[name] = value;
                  setSelectedRow1data(tempObj);

                }}
                style={{ width: "500px", height: "50px" }} placeholder="Edit CheckList"></input>
            </div><br></br>
            <Button style={{ float: 'left' }} onClick={updateCheckList}>Save</Button>
            <Button onClick={handleClose10}>Cancel</Button>
          </FormControl>
        </Box>
      </Modal>

      <Modal
        open={open8}
        onClose={handleClose8}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <FormControl fullWidth>
            <h4>Add CheckList</h4><br></br>
            <div style={{ marginLeft: '50px' }}>
              <input name="checkPoint" value={checklistform.checkPoint} onChange={(e) => {
                const { name, value } = e.target;
                const tempObj = { ...checklistform };
                tempObj[name] = value;
                setCheckListForm(tempObj);

              }} style={{ width: "500px", height: "50px" }} placeholder="Add New CheckList"></input>
            </div><br></br>
            <Button style={{ float: 'left' }} onClick={addChecKlist}>Save</Button>
            <Button onClick={handleClose8}>Cancel</Button>
          </FormControl>
        </Box>
      </Modal>
    </div>

  )
}

export default Global_CheckList