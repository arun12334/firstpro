/* eslint-disable react/jsx-pascal-case */
import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import List from "./List";
import Spreadsheet from "./Spreadsheet";
import MUIDataTable from "./Datatable";
import Login1 from "./Login1";
import SignUp from "./SignIn";
import Checklist_History from "./Checklist_History";
import Attribute_checklist from "./Attribute_Checklist";
import Global_CheckList from "./Global_CheckList";
// import Grid from "./Grid";
import Forgetpassword from "./Forgetpassword";
import Model_page from "./Model_page";
import Dashboard from "./manager/Dashboard";
import Import from "./manager/Import";
import Allocation from "./manager/Allocation";
import Exports from "./manager/Exports";
import Masters from "./manager/Masters";
import Project from "./manager/Projectmaster/project";
import Process from "./manager/Projectmaster/process";
import Field from "./manager/Projectmaster/field";
import User from "./manager/Projectmaster/user";
import ErrorType from "./manager/Projectmaster/errortype";
import SourceList from "./manager/SourceList";
import PtDashboard from "./ptUser/PtDashboard";
import SrcFilelist from "./ptUser/SrcFilelist";
import PtSpredSheet from "./ptUser/ptSpredSheet";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login1 />} />
        <Route exact path="/" element={<Login1 />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="file/:id/:attribute" element={<Spreadsheet />} />
        <Route path="file/:id/" element={<Spreadsheet />} />
        <Route path="file" element={<Spreadsheet />} />
        <Route path="test" element={<MUIDataTable />} />
        <Route path="list/Checklist_History" element={<Checklist_History />} />
        <Route path="/ptsrctable" element={<SrcFilelist />} />
        <Route
          path="/list/Attrubute_checklist"
          element={<Attribute_checklist />}
        />
        <Route path="/ptSheet" element={<PtSpredSheet />} />
        <Route path="/list/Global_CheckList" element={<Global_CheckList />} />
        <Route path="/list" element={<List />} />
        <Route path="/managerDashBoard" element={<Dashboard />} />
        <Route path="/managerImport" element={<Import />} />
        <Route path="/managerMasters/allocation" element={<Allocation />} />
        <Route path="/managerExports" element={<Exports />} />
        <Route path="/managerMasters" element={<Masters />} />
        <Route path="/managerMasters/Project" element={<Project />} />
        <Route path="/managerMasters/process" element={<Process />} />
        <Route path="/managerMasters/field" element={<Field />} />
        <Route path="/managerMasters/user" element={<User />} />
        <Route path="/managerMasters/errortype" element={<ErrorType />} />
        <Route path="/sourceList" element={<SourceList />} />
        <Route path="/ptDashboard" element={<PtDashboard />} />

        {/* <Route path="/grid/id/attribute" element={<Grid/>}/>
        <Route path="/grid/id" element={<Grid/>}/> */}
        <Route path="/forgetpassword" element={<Forgetpassword />} />
        <Route path="/Model_page" element={<Model_page />} />
      </Routes>
    </div>
  );
}

export default App;
