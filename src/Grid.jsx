import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import { getFile, saveExcel, exportExcel, getFileByAttribute, allCheckList, updateAttributeStatus, saveCheckListStatus } from "./apiserver";
import Config from "./Config";
import { useParams,Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import MUIDataTable from 'mui-datatables';
import { Grid, InputLabel } from '@mui/material';


export default function Rankings() {
  const [rowData, setRowData] = useState([]);
  const [columnDef, setColumnDef] = useState([
    { field: 'fileId', filter: true },
    { field: 'Attribute ID', filter: true },
  ]);
  const [post, setPost] = useState([])
  const [updateattributestatus,setUpdateattributestatus] = React.useState(false);
  const [global, setGlobal] =  useState([]);
  const [attribute, setAttribute] = useState([]);
  const [page,setPage] = useState([]);
  const routeparams = useParams();
  const refGrid = useRef(null);
  const columns = [
    // using default ColDef
    { field: 'fileId', filter: 'agSetColumnFilter' },
    { field: 'Attribute ID', filter: 'agSetColumnFilter' },
 
  ];
 

  const onGridReady = (params) =>{
    
    const gridApi = params.api;
    const gridColumnApi = params.columnApi;

    const updateData = (data) => params.api.setRowData(data);

    axios.get(`${Config.BaseURL}singleFileByAttribute/${routeparams.id}/${routeparams.attribute}`).then((response) => {
      const res = response.data;
      if(res.data.length >0 ) {
        const myColumnDef = Object.keys(res.data[0]).map((item)=>{
          if(item==="Decision" || item==="UOM" || item==="Comments" || item==="PT Comments") {
            return {field: item, editable:true}
          } else {
            return {field: item, editable:false}
          }
        });
        setColumnDef(myColumnDef);
        updateData(res.data);

      }
    });
  }

  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150,
      // make every column editable
      editable: false,
      // make every column use 'text' filter by default
      filter: 'agSetColumnFilter',
      // enable floating filters by default
      // floatingFilter: true,
      // make columns resizable
      resizable: true,
      rowSelection: 'multiple',

    };
  }, []);

  const handleUpdate = (e) => {
      updateAttributestatus(e.fileId);
  }

  const updateAttributestatus = (params) => {

    const params1 = routeparams.id + "/" + routeparams.attribute

    updateAttributeStatus(params1,
      (res) => {
        const updateatributestatus = res.data.map((item) => {
          return {
            "attribute": item,
            "fileId": item,
            "_id": item._id,
          }
        });
        setUpdateattributestatus(updateatributestatus);
      })
  }

  const checklist = ()=> {
    const allchecklist = "?userId=" + localStorage.getItem("_id") + "&attributeName=" + routeparams.attribute + "&fileId=" + routeparams.id;
    // userId=6363772340111f2004d8cdc0&attributeName=ATT_PipeTapRangeInch_LOV&fileId=6368c6efa1556c7b61642816
    allCheckList(allchecklist, (res) => {
      console.log("Allchecklsit", res);
      const globalChecklist = res.data.filter((item) => {
        return item.checkListType === "Global" && item.status !== "Completed";
      }).map((item) => {
        return {
          "global": item,
          "checkPoint": item.checkPoint,
          "_id": item._id,
        }
      });
      setGlobal(globalChecklist);
      console.log('globalChecklist', globalChecklist)

      const attributeChecklist = res.data.filter((item) => {
        return item.checkListType === "Attribute" && item.status !== "Completed";
      }).map((item) => {
        return {
          "attribute": item,
          "checkPoint": item,
          "dataType": item,
          "correctValue": item,
          "incorrectValue": item,
          "attributeName": item,
          "_id": item._id,
        }
      });
      console.log('attributeChecklist', attributeChecklist);
      setAttribute(attributeChecklist);
    });
  }



  const save=(res)=>{
    let rowData = [];
    refGrid.current.api.forEachNode(node => rowData.push(node.data));
    console.log(rowData)
    
    saveExcel({
      "JsonData": rowData,
        "page": routeparams.page,
        "file": "test.xlsx",
        "file_Id": routeparams.id
      }, (res) => {

      },
        () => {

        });
        const save = save({
          url: Config.BaseURL+'saveExcel',
          "saveType": 'xlsx',
          "fileName": 'file',
        });
  }
  
    
  return (
    <div>
        
         <div className='button_list'>
         <Pagination
              aria-label="Page navigation example"
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Prev"
              nextPageText="Next"
              firstPageText="First"
              lastPageText="Last"
              activePage='activePage'
              // itemsCountPerPage={this.state.limit}
              // totalItemsCount={this.state.totalRecords}
              // onChange={this.handlePageChange}
            />

            <div>
                <Link component="button" type='button' className="btn btn-secondary fo-icon mr1" to="/list">
                        <HomeIcon fontSize="small"/>
                </Link>
                <button type="button" className="btn btn-secondary mr1 fo-icon" onClick={save}>
                        <SaveIcon fontSize="small"/>
                </button>
                {localStorage.getItem("userType") === "Manager" &&
                        <a className="btn btn-primary mr1">
                          Export
                        </a>}

                {localStorage.getItem("userType") === "PT User" &&
                        <button className="btn btn-primary bg-sl-gr mr1" onClick={handleUpdate}>
                          Completed
                        </button>}
                <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={checklist}>View Checklist</button>
              </div>
              </div>
    <div style={{
      height: "700px",
      width: "100%",
      // margin:"100px"
    }}
    className="ag-theme-balham"
    >
      <AgGridReact 
        ref={refGrid}
        columnDefs={columnDef} 
        rowData={rowData}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        enableRangeSelection={true}
      />
    </div>
    <div class="offcanvas offcanvas-end cl" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
          <h5 id="offcanvasRightLabel">Check List</h5>
          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
        {localStorage.getItem("userType") === "PT User" &&
          <Grid xs={12} sx={{

            overflowY: "scroll",
          }}>
            <div style={{ padding: "0px" }}>
              <div className="Excel-table">
                <h3 style={{ fontSize: "30px" }}>CheckList</h3>

                <MUIDataTable
                  data={global}
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

                    {
                      name: "_id",
                      label: "Completed or N/A",
                      options: {
                        filter: true,
                        sort: true,
                        // display: localStorage.getItem("userType")==="Manager"? "true":"excluded",
                        customBodyRender: (value, row) => {
                          return (
                            <div style={{ display: 'flex' }}>
                              <a className="btn btn-primary action-button" onClick={() => {
                                const sendData = {
                                  checkListId: value,
                                  fileId: routeparams.id,
                                  attributeId: routeparams.attribute,
                                  action: "Completed",
                                  userId: localStorage.getItem("_id")
                                }
                                saveCheckListStatus(sendData,
                                  () => {
                                    checklist();

                                  },
                                  () => {

                                  })
                              }}>
                                Done
                              </a>
                              <a className="btn btn-primary action-button" onClick={() => {
                                const sendData = {
                                  checkListId: value,
                                  fileId: routeparams.id,
                                  attributeId: routeparams.attribute,
                                  action: "Completed",
                                  userId: localStorage.getItem("_id")
                                }
                                saveCheckListStatus(sendData,
                                  () => {
                                    checklist();
                                  },
                                  () => {

                                  })
                              }}>
                                N/A
                              </a></div>)
                        }
                      }
                    }

                  ]}
                  options={{
                    selectableRows: 'none',
                    customToolbar: () => { <></> },
                    print: false,
                    download: false,
                    search: false,
                    viewColumns: false,
                    filter: false,
                  }}>
                </MUIDataTable>
              </div><br></br>

              <div className="Excel-table">
                <MUIDataTable
                  data={attribute}
                  columns={[
                    {
                      name: "dataType",
                      label: "dataType",
                      options: {
                        filter: true,
                        sort: true,

                        customBodyRender: (value, row) => {
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

                        customBodyRender: (value, row) => {
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

                        customBodyRender: (value, row) => {
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

                        customBodyRender: (value, row) => {
                          return <>{value.attributeName}</>;
                        }
                      }
                    },

                    {
                      name: "_id",
                      label: "Completed or N/A",
                      options: {
                        filter: true,
                        sort: true,
                        // display: localStorage.getItem("userType")==="Manager"? "true":"excluded",
                        customBodyRender: (value, row) => {
                          return (

                            <div style={{ display: 'flex' }}>


                              <a className="btn btn-primary action-button" onClick={() => {
                                const sendData = {
                                  checkListId: value,
                                  fileId: routeparams.id,
                                  attributeId: routeparams.attribute,
                                  action: "Completed",
                                  userId: localStorage.getItem("_id")
                                }
                                saveCheckListStatus(sendData,
                                  () => {
                                    checklist();
                                  },
                                  () => {

                                  })
                              }}>
                                Done
                              </a>
                              <a className="btn btn-primary action-button" onClick={() => {
                                const sendData = {
                                  checkListId: value,
                                  fileId: routeparams.id,
                                  attributeId: routeparams.attribute,
                                  action: "NA",
                                  userId: localStorage.getItem("_id")
                                }
                                saveCheckListStatus(sendData,
                                  () => {
                                    checklist();
                                  },
                                  () => {

                                  })
                              }}>
                                N/A
                              </a>


                            </div>)
                        }
                      }
                    }
                  ]}
                  options={{
                    selectableRows: 'none',
                    customToolbar: () => { <></> },
                    print: false,
                    download: false,
                    search: false,
                    viewColumns: false,
                    filter: false,
                  }}></MUIDataTable>
              </div>
            </div>
          </Grid>}
        </div>
      </div>
      <div>
      </div>
    </div>
    
  );
}
