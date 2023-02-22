import React, { useEffect } from "react";
import { withRouter } from "../withrouter";
import { filedatalist } from "../apiserver";
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
} from "@syncfusion/ej2-react-spreadsheet";

const PtSpredSheet = () => {
  const [sheetData, setsheetData] = React.useState([]);
  useEffect(() => {
    let data = sessionStorage.getItem("ptFile");
    filedatalist(
      data,
      (res) => {
        console.log("res", res);
        setsheetData(res.fileData);
      },
      () => {}
    );
  }, []);
  return (
    <div>
      <SpreadsheetComponent>
        <SheetsDirective>
          <SheetDirective name="Order Details">
            <RangesDirective>
              <RangeDirective dataSource={sheetData}></RangeDirective>
            </RangesDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </div>
  );
};

export default withRouter(PtSpredSheet);
