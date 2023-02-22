import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';
import { withRouter } from "./withrouter";
import { getFile, saveExcel, exportExcel, getFileByAttribute, allCheckList, AttributeDetails, ReworkCompleted, ReadyToDelivered, updateAttributeStatus, updateAttributeStatusByQA, singleFileDetailsForAudit, saveExcelForAudit, saveCheckListStatus } from "./apiserver";
import Backdrop from './backdrop';
import Loader from 'react-js-loader'
import Pagination from "react-js-pagination";
import { Link, useLocation } from "react-router-dom"
import MUIDataTable from 'mui-datatables';
import Checkbox from '@mui/material/Checkbox';
import SaveIcon from '@mui/icons-material/Save';
import HomeIcon from '@mui/icons-material/Home';
import BackICon from '@mui/icons-material/ArrowBack';

import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  ColumnDirective,
  getRangeAddress,
  getRangeIndexes,
} from '@syncfusion/ej2-react-spreadsheet';
import { registerLicense } from '@syncfusion/ej2-base';
import './App.css'
import { Grid, InputLabel } from '@mui/material';
import { Button } from 'bootstrap';
import Config from './Config';
// Registering Syncfusion license key
registerLicense('Mgo+DSMBaFt/QHNqVVhkW1pFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF9iSX5bdEZhXn1Yd3dRRA==;Mgo+DSMBPh8sVXJ0S0V+XE9AcVRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS3xSdkVrW3xcd3ZTQWRbUw==;ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VjUX1dcnNXQGdZWEc=;NzM0ODczQDMyMzAyZTMzMmUzMGdlbjI1c3NZMXVVNHR1b2dUdVFDS1ZwQUNhWkhndkFram9xU1cwUDA1Q2s9;NzM0ODc0QDMyMzAyZTMzMmUzMGQvSFc0SUlMVkw2OFBIT0h4ZjYwWDBOYmo2QmY3ZzdrK0ZSZzIvNkJEaHM9;NRAiBiAaIQQuGjN/V0Z+X09EaFtFVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdERjWXdcc3ZSRGZUUE10;NzM0ODc2QDMyMzAyZTMzMmUzMGhSK3Q2N3JVWExURjhVcEtlWTZhR2RSL0xQendIdnljUWp5SnVIQjRUMmc9;NzM0ODc3QDMyMzAyZTMzMmUzMFFTa3JyMUYxLzl3WVIxSjJBSFc4YVM4Rm94SHlkd1N3MkhZdkNSanFCL2s9;Mgo+DSMBMAY9C3t2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VjUX1dcnNXQGhbWUc=;NzM0ODc5QDMyMzAyZTMzMmUzMG5PSWlBU2ErSHRBZTBndCtrcFhmZXdUU283YkNQbFlGODJ2NzI0bVJjcGs9;NzM0ODgwQDMyMzAyZTMzMmUzMFU4dXBIckQrVU1PZWY2bHhaM0JLTTdiM2wyNnc5dXh5N29YSXY0VldTWFU9;NzM0ODgxQDMyMzAyZTMzMmUzMGhSK3Q2N3JVWExURjhVcEtlWTZhR2RSL0xQendIdnljUWp5SnVIQjRUMmc9');
class Spreadsheet extends React.Component {
  constructor(props) {
    super(props);
    console.log('props', props)
    // this.data = new DataManager({
    //     adaptor: new ODataAdaptor,
    //     url: 'https://ej2services.syncfusion.com/production/web-services/api/Orders'
    // });
    this.state = {
      file: [],
      data: [],
      fileId: '',
      secondSheetData: [],
      fileName: 'sample.xlsx',
      loading: true,
      activePage: 1,
      limit: 20000,
      totalRecords: 0,
      checklist: [],
      globalChecklist: [],
      attributeChecklist: [],
      updateatributestatus: [],
      attributeStatus: '',
      reworkStatus: '',
      status: '',
      completeDisable: true,
      RWcompleteDisable: true,
      RTDDisable: true,
      AcceptDisable: true,
      DeniedDisable: true,
      RejectDisable: true,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.save1 = this.save1.bind(this);
    this.updateAttributestatusByQA = this.updateAttributestatusByQA.bind(this);
    this.updateAttributestatusByQA1 = this.updateAttributestatusByQA1.bind(this);
    this.updateAttributestatusByQA2 = this.updateAttributestatusByQA2.bind(this);
  }


  getData() {
    console.log("params1", this.props.router.params.id);


    if (this.props.router.params.attribute) {

      const params = this.props.router.params.id + "/" + this.props.router.params.attribute

      console.log("params", params);
      this.setState({
        loading: true
      })

      if (localStorage.getItem('userType') === "PT User") {
        getFileByAttribute(params, (res) => {
          // debugger;
          // setTimeout(()=>{
          this.setState({
            loading: false,
            totalRecords: res.totalData,
            data: res.data,
          }, () => {
            console.log('this.state.data', this.state.data)

            var ssObj = this.spreadsheet;
            // debugger;
            this.setState({
              loading: false,
              totalRecords: res.totalData,
              secondSheetData: res.secondSheetData
            })
            if (res.data[0]) {

              const indexArray = Object.keys(res.data[0]);

              const rowCount = res.data.length;
              const colCount = indexArray.length;

              console.log("indexArray", indexArray);


              const allCellRange = getRangeAddress([0, 0, rowCount, colCount]);
              console.log("allCellRange", allCellRange);
              this.spreadsheet.numberFormat("@", allCellRange)


              const decisionIndex = indexArray.indexOf("Decision");
              const UOMIndex = indexArray.indexOf("UOM");
              const ptIndex = indexArray.indexOf("PT Comments");
              const ptcIndex = indexArray.indexOf("Comments");

              if (decisionIndex !== -1) {
                const decisionRange = getRangeAddress([0, decisionIndex, rowCount, decisionIndex]);
                console.log("decisionRange", decisionRange);
                ssObj.lockCells(decisionRange, false);
              }

              if (UOMIndex !== -1) {
                const uomRange = getRangeAddress([0, UOMIndex, rowCount, UOMIndex]);
                ssObj.lockCells(uomRange, false);
              }

              if (ptIndex !== -1) {
                const ptRange = getRangeAddress([0, ptIndex, rowCount, ptIndex]);
                ssObj.lockCells(ptRange, false);
              }

              if (ptcIndex !== -1) {
                const ptcRange = getRangeAddress([0, ptcIndex, rowCount, ptcIndex]);
                ssObj.lockCells(ptcRange, false);
              }


              // ssObj.lockCells(allCellRange, true);

              // var usedRange = ssObj.getActiveSheet().usedRange;
            }
            if (localStorage.getItem('userType') === "PT User" || localStorage.getItem('userType') === "Audit user") {
              debugger;
              AttributeDetails(params, (res) => {
                this.setState({
                  loading: false,
                  data: res.data,
                  attributeStatus: res.data.attributeStatus,
                  totalRecords: res.totalData,
                  secondSheetData: res.secondSheetData
                });

              },
                () => {
                  this.setState({
                    loading: false
                  })
                })
            }
          });

        },
          () => {
            this.setState({
              loading: false,
            })
          })
      } else {

        singleFileDetailsForAudit(params, (res) => {
          // debugger;
          // setTimeout(()=>{
          this.setState({
            loading: false,
            totalRecords: res.totalData,
            data: res.data
          }, () => {
            console.log('this.state.data', this.state.data)

            var ssObj = this.spreadsheet;
            // debugger;
            this.setState({
              loading: false,
              totalRecords: res.totalData,
              secondSheetData: res.secondSheetData,
            })
            if (res.data[0]) {

              const indexArray = Object.keys(res.data[0]);

              const rowCount = res.data.length;
              const colCount = indexArray.length;

              console.log("indexArray", indexArray);


              const allCellRange = getRangeAddress([0, 0, rowCount, colCount]);
              console.log("allCellRange", allCellRange);
              this.spreadsheet.numberFormat("@", allCellRange)


              const SampleIndex = indexArray.indexOf("Sample");
              const ErrorTypeIndex = indexArray.indexOf("Error Type");
              const replaceIndex = indexArray.indexOf("Replace Value");
              const replacesIndex = indexArray.indexOf("Replace UOM");
              const valueIndex = indexArray.indexOf("Value Comment");
              const uomIndex = indexArray.indexOf("UOM Comment");
              if (SampleIndex !== -1) {
                const SampleRange = getRangeAddress([0, SampleIndex, rowCount, SampleIndex]);
                console.log("SampleRange", SampleRange);
                ssObj.lockCells(SampleRange, false);
              }

              if (ErrorTypeIndex !== -1) {
                const ErrorTypeRange = getRangeAddress([0, ErrorTypeIndex, rowCount, ErrorTypeIndex]);
                ssObj.lockCells(ErrorTypeRange, false);
              }

              if (replaceIndex !== -1) {
                const replaceRange = getRangeAddress([0, replaceIndex, rowCount, replaceIndex]);
                ssObj.lockCells(replaceRange, false);
              }

              if (replacesIndex !== -1) {
                const replacesRange = getRangeAddress([0, replacesIndex, rowCount, replacesIndex]);
                ssObj.lockCells(replacesRange, false);
              }

              if (valueIndex !== -1) {
                const valueRange = getRangeAddress([0, valueIndex, rowCount, valueIndex]);
                ssObj.lockCells(valueRange, false);
              }

              if (uomIndex !== -1) {
                const uomRange = getRangeAddress([0, uomIndex, rowCount, uomIndex]);
                ssObj.lockCells(uomRange, false);
              }


              // ssObj.lockCells(allCellRange, true);

              // var usedRange = ssObj.getActiveSheet().usedRange;
            }

            if (localStorage.getItem('userType') === "PT User" || localStorage.getItem('userType') === "Audit user") {
              debugger;
              AttributeDetails(params, (res) => {
                // debugger;
                // setTimeout(()=>{
                this.setState({
                  loading: false,
                  totalRecords: res.totalData,
                  attributeStatus: res.data.attributeStatus,
                  data: res.data
                }, () => {
                  console.log('this.state.data', this.state.data)

                  var ssObj = this.spreadsheet;
                  // debugger;
                  this.setState({
                    loading: false,
                    totalRecords: res.totalData,
                    secondSheetData: res.secondSheetData
                  })
                });

              },
                () => {
                  this.setState({
                    loading: false
                  })
                })
            }

          });

        },
          () => {
            this.setState({
              loading: false
            })
          })
      }




    } else {
      const params = this.props.router.params.id;
      console.log("params", params);
      this.setState({
        loading: true
      })
      this.cancelToken = getFile(params, (res) => {
        // debugger;
        // setTimeout(()=>{
        this.setState({
          loading: false,
          totalRecords: res.totalData,
          data: res.data
        }, () => {
          console.log('this.state.data', this.state.data)
          var ssObj = this.spreadsheet;
        });

      },
        () => {
          this.setState({
            loading: false
          })
        })

    }


  }



  exportData() {
    const params = this.props.router.params.id;
    exportExcel(params, (res) => {
    });
  }

  updateattributestatus() {
    const updateattributestatus = this.props.router.params.id + "/" + this.props.router.params.attribute
    updateAttributeStatus(updateattributestatus,
      (res) => {
        debugger;
        if (Array.isArray(res.data)) {
          const updateAttributes = res.data.map((item) => {
            return {
              "attribute": item,
              "fileId": item,
              "_id": item._id,
              'status': item.status,

            }
          });
        }
        if (res.status === "SUCCESS") {
          alert('Successfully completed')
        } else {
          alert('Complete All CheckList')
        }
      });

  }

  updateAttributestatus1 = (updateAttributestatus1) => {
    const payload = {
      "attribute": this.props.router.params.attribute,
      "fileId": this.props.router.params.id,
      "_id": this.props.router.params._id,

    };
    ReworkCompleted(payload,
      (res) => {
        let status = 'hide';

        if (res.attributeStatus === 'denied')
          status = 'show';

        if (res.attributeStatus === 'Accept')
          status = 'hide';

        if (res.attributeStatus === 'pt fb1' || res.attributeStatus === 'pt fb2' || res.attributeStatus === 'completed')
          status = 'disable';

        this.setState({
          reworkStatus: status
        })
      });
    alert('ReWork completed')

  }

  updateAttributestatus2 = (updateAttributestatus2) => {
    const payload = {
      "attribute": this.props.router.params.attribute,
      "fileId": this.props.router.params.id,
      "_id": this.props.router.params._id,
      "attributeStatus": this.props.router.params.attributeStatus === "Accept",

    };
    ReadyToDelivered(payload,
      (res) => {
        return {
          "attribute": this.props.router.params.attribute,
          "fileId": this.props.router.params.fileId,
          "_id": this.props.router.params._id,
          "status": updateAttributestatus2

        }
      });
    alert('Ready to Deliver')
  }

  updateAttributestatusByQA = (updateAttributestatusByQA) => {
    const payload = {
      "attribute": this.props.router.params.attribute,
      "fileId": this.props.router.params.id,
      "_id": this.props.router.params._id,
      "status": updateAttributestatusByQA

    };
    updateAttributeStatusByQA(payload,
      (res) => {
        return {
          "attribute": this.props.router.params.attribute,
          "fileId": this.props.router.params.fileId,
          "_id": this.props.router.params._id,
          "status": updateAttributestatusByQA

        }
      });
    if (updateAttributestatusByQA) {
      alert('Successfully Accepted')
    }
  }
  updateAttributestatusByQA1 = (updateAttributestatusByQA1) => {
    const payload = {
      "attribute": this.props.router.params.attribute,
      "fileId": this.props.router.params.id,
      "_id": this.props.router.params._id,
      "status": updateAttributestatusByQA1

    };
    updateAttributeStatusByQA(payload,
      (res) => {
        return {
          "attribute": this.props.router.params.attribute,
          "fileId": this.props.router.params.fileId,
          "_id": this.props.router.params._id,
          "status": updateAttributestatusByQA1

        }
      });
    if (updateAttributestatusByQA1) {
      alert('Successfully Denied')
    }
  }

  updateAttributestatusByQA2 = (updateAttributestatusByQA2) => {
    const payload = {
      "attribute": this.props.router.params.attribute,
      "fileId": this.props.router.params.id,
      "_id": this.props.router.params._id,
      "status": updateAttributestatusByQA2

    };
    updateAttributeStatusByQA(payload,
      (res) => {
        return {
          "attribute": this.props.router.params.attribute,
          "fileId": this.props.router.params.fileId,
          "_id": this.props.router.params._id,
          "status": updateAttributestatusByQA2

        }
      });
    if (updateAttributestatusByQA2) {
      alert('Successfully Rejected')
    }
  }

  checklist() {
    const allchecklist = "?userId=" + localStorage.getItem("_id") + "&attributeName=" + this.props.router.params.attribute + "&fileId=" + this.props.router.params.id;
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
      this.setState({
        checklist: res.data,
        globalChecklist: globalChecklist,
        attributeChecklist: attributeChecklist,
      })
    });
  }


  componentDidMount() {
    console.log('componentDidMount')
    this.checklist();
  }
  componentWillUnmount() {
    if (this.cancelToken)
      this.cancelToken.cancel();
  }
  created() {
    console.log('created')

    this.getData();

    //Applies cell and number formatting to specified range of the active sheet
    // this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:K1');
  }

  save = async () => {
    var json = [];
    var obj = {};
    var ssObj = this.spreadsheet;


    //   var usedRange = ssObj.getActiveSheet().usedRange;
    // var selIndex = [1, 0, usedRange.rowIndex, usedRange.colIndex];
    // var range =
    //   ssObj.getActiveSheet().name +
    //   '!' +
    //   getRangeAddress([1, 0, selIndex[2], selIndex[3]]);
    ssObj.saveAsJson().then((res) => {
      saveExcel({
        "JSONData": res.jsonObject.Workbook,
        "page": this.state.activePage,
        "file": "test.xlsx",
        "file_Id": this.props.router.params.id
      }, (res) => {

        this.setState({
          completeDisable: false,
          RWcompleteDisable: false,
          RTDDisable: false
        })
      },
        () => {

        });
      console.log("saveasjson", res.jsonObject.Workbook.sheets)

    })
    const save = ssObj.save({
      url: '/saveExcel',
      "saveType": 'xlsx',
      "fileName": this.state.fileName,
    });
    console.log("save", save);

    // ssObj.getData(range).then((value) => {
    //     console.log("values", value);
    //   value.forEach((cell, key) => {
    //     var indexes = getRangeIndexes(key);
    //     // console.log("indexes", indexes);
    //     if (cell && selIndex[2] >= indexes[0]) {
    //       // constructing the key value object
    //       if (key.indexOf('A') > -1) {
    //         obj['employeeID'] = cell.value;
    //       } else if (key.indexOf('B') > -1) {
    //         obj['lastName'] = cell.value;
    //       } else if (key.indexOf('C') > -1) {
    //         obj['firstName'] = cell.value;
    //       } else if (key.indexOf('D') > -1) {
    //         obj['title'] = cell.value;
    //       } else if (key.indexOf('E') > -1) {
    //         obj['titleOfCourtesy'] = cell.value;
    //       }
    //       if (indexes[1] === selIndex[3]) {
    //         // row last index
    //         json.push(obj);
    //         obj = {};
    //       }
    //     }
    //   });
    //   console.log(json);
    // });
    alert("Successfully Saved");
  }

  save1 = async () => {
    console.log("save1")
    var json = [];
    var obj = {};
    var ssObj = this.spreadsheet;


    //   var usedRange = ssObj.getActiveSheet().usedRange;
    // var selIndex = [1, 0, usedRange.rowIndex, usedRange.colIndex];
    // var range =
    //   ssObj.getActiveSheet().name +
    //   '!' +
    //   getRangeAddress([1, 0, selIndex[2], selIndex[3]]);
    ssObj.saveAsJson().then((res) => {
      saveExcelForAudit({
        "JSONData": res.jsonObject.Workbook,
        "page": this.state.activePage,
        "file": "test.xlsx",
        "file_Id": this.props.router.params.id,

      }, (res) => {
        this.setState({
          AcceptDisable: false,
          DeniedDisable: false,
          RejectDisable: false
        })

      },
        () => {

        });
      console.log("saveasjson", res.jsonObject.Workbook.sheets)

    })
    const save = ssObj.save({
      url: '/saveExcel',
      "saveType": 'xlsx',
      "fileName": this.state.fileName,
    });
    console.log("save", save);

    // ssObj.getData(range).then((value) => {
    //     console.log("values", value);
    //   value.forEach((cell, key) => {
    //     var indexes = getRangeIndexes(key);
    //     // console.log("indexes", indexes);
    //     if (cell && selIndex[2] >= indexes[0]) {
    //       // constructing the key value object
    //       if (key.indexOf('A') > -1) {
    //         obj['employeeID'] = cell.value;
    //       } else if (key.indexOf('B') > -1) {
    //         obj['lastName'] = cell.value;
    //       } else if (key.indexOf('C') > -1) {
    //         obj['firstName'] = cell.value;
    //       } else if (key.indexOf('D') > -1) {
    //         obj['title'] = cell.value;
    //       } else if (key.indexOf('E') > -1) {
    //         obj['titleOfCourtesy'] = cell.value;
    //       }
    //       if (indexes[1] === selIndex[3]) {
    //         // row last index
    //         json.push(obj);
    //         obj = {};
    //       }
    //     }
    //   });
    //   console.log(json);
    // });
    alert("Successfully Saved");
  }

  save2 = async () => {
    var json = [];
    var obj = {};
    var ssObj = this.spreadsheet;


    //   var usedRange = ssObj.getActiveSheet().usedRange;
    // var selIndex = [1, 0, usedRange.rowIndex, usedRange.colIndex];
    // var range =
    //   ssObj.getActiveSheet().name +
    //   '!' +
    //   getRangeAddress([1, 0, selIndex[2], selIndex[3]]);
    ssObj.saveAsJson().then((res) => {
      saveExcelForAudit({
        "JSONData": res.jsonObject.Workbook,
        "page": this.state.activePage,
        "file": "test.xlsx",
        "file_Id": this.props.router.params.id,
        "status": 'denied',

      }, (res) => {

      },
        () => {

        });
      console.log("saveasjson", res.jsonObject.Workbook.sheets)

    })
    const save = ssObj.save({
      url: '/saveExcel',
      "saveType": 'xlsx',
      "fileName": this.state.fileName,
    });
    console.log("save", save);

    // ssObj.getData(range).then((value) => {
    //     console.log("values", value);
    //   value.forEach((cell, key) => {
    //     var indexes = getRangeIndexes(key);
    //     // console.log("indexes", indexes);
    //     if (cell && selIndex[2] >= indexes[0]) {
    //       // constructing the key value object
    //       if (key.indexOf('A') > -1) {
    //         obj['employeeID'] = cell.value;
    //       } else if (key.indexOf('B') > -1) {
    //         obj['lastName'] = cell.value;
    //       } else if (key.indexOf('C') > -1) {
    //         obj['firstName'] = cell.value;
    //       } else if (key.indexOf('D') > -1) {
    //         obj['title'] = cell.value;
    //       } else if (key.indexOf('E') > -1) {
    //         obj['titleOfCourtesy'] = cell.value;
    //       }
    //       if (indexes[1] === selIndex[3]) {
    //         // row last index
    //         json.push(obj);
    //         obj = {};
    //       }
    //     }
    //   });
    //   console.log(json);
    // });
    alert("Successfully Saved");
  }
  beforeSave(args) {
    console.log("beforeSave", args);

    //   debugger;

    args.customParams = { file: args.fileName + "." + args.saveType.toLowerCase(), file_Id: this.props.router.params.id };
    return args;
  }
  handlePageChange(page) {
    this.setState({
      activePage: page
    }, () => {
      this.getData();
    })
  }

  render() {

    if (!localStorage.getItem('_id')) {
      this.props.router.navigate('/');
    }
    return (<>

      <Grid container>
        <Grid xs={localStorage.getItem("userType") === "PT User" ? 12 : 12}>
          <div className='button_list'>
            <Pagination
              aria-label="Page navigation example"
              itemClass="page-item"
              linkClass="page-link"
              prevPageText="Prev"
              nextPageText="Next"
              firstPageText="First"
              lastPageText="Last"
              activePage={this.state.activePage}
              itemsCountPerPage={this.state.limit}
              totalItemsCount={this.state.totalRecords}
              onChange={this.handlePageChange}
            />
            <div>
              <Link style={{marginRight:'15px'}} component="button" type='button' className="btn btn-secondary fo-icon mr1" to="/Model_page" state={{ fileId: this.props.router.params.id }}>
                <BackICon fontSize="small" />
              </Link>
              &nbsp;
              <Link style={{marginRight:'25px'}} component="button" type='button' className="btn btn-secondary fo-icon mr1" to="/list">
                <HomeIcon fontSize="small" />
              </Link>
              <script>
              </script>
              &nbsp;

              {localStorage.getItem('userType') === "PT User" &&
                <button type="button" className="btn btn-secondary mr1 fo-icon" onClick={this.save.bind(this)}>
                  <SaveIcon fontSize="small" />
                </button>}

              {localStorage.getItem('userType') === "Audit user" &&
                <button type="button" className="btn btn-secondary mr1 fo-icon" onClick={this.save1.bind(this)}>
                  <SaveIcon fontSize="small" />
                </button>}
              {localStorage.getItem("userType") === "Manager" &&
                <a className="btn btn-primary mr1" href={Config.BaseURL + "downloadExcel?fileId=" + this.props.router.params.id}>
                  Export
                </a>}


              {localStorage.getItem('userType') === "PT User" &&
                <>
                  {
                    this.state.attributeStatus === 'assigned' || this.state.attributeStatus === 'pt assigned' || this.state.attributeStatus === 'completed' ?
                      <button className="btn btn-primary bg-sl-gr mr1" disabled={this.state.completeDisable} onClick={this.updateattributestatus.bind(this)}>
                        Completed
                      </button> :
                      this.state.attributeStatus === 'denied' || this.state.attributeStatus === 'pt fb1' || this.state.attributeStatus === 'pt fb2' ?
                        <button className={`btn btn-primary bg-sl-gr mr1`} disabled={this.state.RWcompleteDisable} onClick={this.updateAttributestatus1.bind(this)}>
                          RW Completed
                        </button> :
                        this.state.attributeStatus === 'accepted' || this.state.attributeStatus === 'pt fb1' || this.state.attributeStatus === 'pt fb2' || this.state.attributeStatus === 'ready to delivered' ?
                          <button className="btn btn-primary bg-sl-gr mr1" disabled={this.state.RTDDisable} onClick={this.updateAttributestatus2.bind(this)}>
                            Ready To deliver
                          </button> : null
                  }
                  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">View Checklist</button>
                </>}

              {localStorage.getItem("userType") === "Audit user" &&
                <>
                  {
                    this.state.attributeStatus !== "ready to delivered" ?
                      <button class="btn btn-primary mx-2" type="button" disabled={this.state.AcceptDisable} onClick={() => { this.updateAttributestatusByQA('Accept') }}>Accept</button> : null}
                  {
                    this.state.attributeStatus !== "ready to delivered" && this.state.attributeStatus !== 'pt fb2' ?
                      <button class="btn btn-primary mx-2" type="button" disabled={this.state.DeniedDisable} onClick={() => { this.updateAttributestatusByQA1('Denied') }}>Denied</button> : null}
                  {
                    this.state.attributeStatus === "pt fb2" ?
                      <button class="btn btn-primary mx-2" type="button" disabled={this.state.RejectDisable} onClick={() => { this.updateAttributestatusByQA2('Rejected') }}>Rejected</button> : null}
                </>
              }
            </div>
          </div>
          <div className="spreadSheetContainer">
            <SpreadsheetComponent
              ref={(ssObj) => { this.spreadsheet = ssObj; }}
              created={this.created.bind(this)}
              height="700px"
              // allowSave={true}
              allowSheetOnDemand={true}
              allowFiltering={true}
              allowSorting={true}
              enableClipboard={true}
              allowCellFormatting={true}



              // allowEditing={false}
              // 
              // allowEditing={localStorage.getItem("userType") ==="Manager"?true:true}
              // allowOpen={localStorage.getItem("userType") ==="Manager"?true:false}
              // saveUrl='https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save'
              beforeSave={this.beforeSave.bind(this)}>
              <SheetsDirective   >
                <SheetDirective name='Order Details'
                // isProtected={localStorage.getItem("userType") === "Manager" ? false : true}
                // protectSettings={{ selectCells: true, formatCells: true, formatColumns: true }}
                >
                  <RangesDirective>
                    <RangeDirective dataSource={this.state.data}></RangeDirective>
                  </RangesDirective>
                </SheetDirective>


                <SheetDirective name='secondSheetData'
                  isProtected={localStorage.getItem("userType") === "Manager" ? false : true}
                  protectSettings={{ selectCells: true, formatCells: true, formatColumns: true, formatSettings: [{ name: 'Amount', format: 'C2', useGrouping: false, currency: 'EUR' }], }}
                >
                  <RangesDirective>
                    <RangeDirective dataSource={this.state.secondSheetData}></RangeDirective>
                  </RangesDirective>
                </SheetDirective>
              </SheetsDirective>
            </SpreadsheetComponent>


            {this.state.loading && <Backdrop>
              <Loader
                type="box-rotate-x"
                bgColor={"#32E0A1"}
                title={"Please wait..."}
                color={"#fff"}
                size={100}
              />
            </Backdrop>}
          </div>
        </Grid>

      </Grid>
      {/* offcanvas section */}
      <div class="offcanvas offcanvas-end cl" style={{ width: '50%' }} tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
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
                    data={this.state.globalChecklist}
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
                                    fileId: this.props.router.params.id,
                                    attributeId: this.props.router.params.attribute,
                                    action: "Completed",
                                    userId: localStorage.getItem("_id")
                                  }
                                  saveCheckListStatus(sendData,
                                    () => {
                                      this.checklist();

                                    },
                                    () => {

                                    })
                                }}>
                                  Done
                                </a>
                                <a className="btn btn-primary action-button mx-2" onClick={() => {
                                  const sendData = {
                                    checkListId: value,
                                    fileId: this.props.router.params.id,
                                    attributeId: this.props.router.params.attribute,
                                    action: "Completed",
                                    userId: localStorage.getItem("_id")
                                  }
                                  saveCheckListStatus(sendData,
                                    () => {
                                      this.checklist();
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
                    data={this.state.attributeChecklist}
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
                                    fileId: this.props.router.params.id,
                                    attributeId: this.props.router.params.attribute,
                                    action: "Completed",
                                    userId: localStorage.getItem("_id"),
                                  }
                                  saveCheckListStatus(sendData,
                                    () => {
                                      this.checklist();
                                    },
                                    () => {

                                    })
                                }}>
                                  Done
                                </a>
                                <a className="btn btn-primary action-button mx-2" onClick={() => {
                                  const sendData = {
                                    checkListId: value,
                                    fileId: this.props.router.params.id,
                                    attributeId: this.props.router.params.attribute,
                                    action: "NA",
                                    userId: localStorage.getItem("_id")
                                  }
                                  saveCheckListStatus(sendData,
                                    () => {
                                      this.checklist();
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
    </>);
  }
}
export default withRouter(Spreadsheet);