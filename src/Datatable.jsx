import React from "react"
import MUIDataTable from "mui-datatables";

const columns = [
 {
  name: "name",
  label: "Name",
  options: {
   filter: true,
   sort: true,
  }
 },
];

const data = [
 { name: "Joe James"},
 { name: "John Walsh"},
 { name: "Bob Herm"},
 { name: "James Houston"},
];

const options = {
    selectableRows: 'none',
};

function muidata(){
    return(<MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
      />
      );
}

export default muidata;

