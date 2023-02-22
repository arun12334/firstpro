import React, { useEffect } from 'react'
import { json, Link, useLocation } from 'react-router-dom';
import { assignedAttributeByFile,assignedAttributeForAudit } from '../src/apiserver';
import "./index.css";
import BackIcon from '@mui/icons-material/ArrowBack';
import MUIDataTable from 'mui-datatables';


export default function Model_page() {
  const location = useLocation();
  const [attribute, setAttribute] = React.useState([])
  const [fileId, setFileId] = React.useState('')

  const [activelink, setActivelink] = React.useState(localStorage.getItem('activeLink') || '')


  const getAssignedAttributes = (fileId) => {

    const params = fileId + "/" + localStorage.getItem("_id")
    assignedAttributeByFile(params,
      (res) => {

        console.log(res);
        const data = res.data.map((item) => {
          console.log(`item:${item.attributeId}`)
          return {
            file: item,
            _id: item.attributeId
          }
        });
        setAttribute(data)
      },
      (err) => {
        console.error(err)
      }
    )

  }

  const getAssignedAttributesForAudit = (fileId) => {

    const params = fileId + "/" + localStorage.getItem("_id")
    assignedAttributeForAudit(params,
      (res) => {

        console.log(res);
        const data = res.data.map((item) => {
          console.log(`item:${item.attributeId}`)
          return {
            file: item,
            _id: item.attributeId
          }
        });
        setAttribute(data)
      },
      (err) => {
        console.error(err)
      }
    )

  }
  useEffect(() => {
    if(localStorage.getItem('userType') === "PT User"){

      getAssignedAttributes(location.state.fileId);
    }else{
      getAssignedAttributesForAudit(location.state.fileId)
    }
    setFileId(location.state.fileId)
  }, [])


  return (
    <div className='container-fluid'>
      <div>
        <Link component="button" type='button' style={{ marginTop: '20px', marginLeft:'95%' }} className="btn btn-secondary fo-icon mr1" to="/list">
          <BackIcon fontSize="small" />
        </Link>
      </div>
      <div className='card' style={{ marginTop: '30px', padding: '50px', borderRadius: '50%' }}>
        <MUIDataTable
          data={attribute}
          columns={[
            {
              name: 'file',
              label: "attribute name",
              options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                  console.log(`value.attribute`, value)
                  return (
                    <Link className={value.attributeId == activelink? 'active':''} onClick ={()=>{localStorage.setItem('activeLink',value.attributeId)}}  to={"/file/" + fileId + "/" + value.attributeId} state={{ fileId: fileId }}>{value.attribute}</Link>
                  )
                }
              }
            }
          ]}
          options={{
            selectableRows: 'none'
          }}
        >
        </MUIDataTable>
      </div>
    </div>
  )
}
