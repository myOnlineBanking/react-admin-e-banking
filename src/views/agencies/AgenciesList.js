import React, { useEffect, useState } from 'react';
import { CSmartTable } from '@coreui/react-pro' 
import Swal from "sweetalert2";
import BtnPlus from "src/helpers/BtnPlus";
import { CCollapse ,CButton,CCardBody} from '@coreui/react';
import { useHistory  } from "react-router-dom";
import { useSelector } from "react-redux";

function AgenciesList() {
  const history = useHistory();
  
  const [details, setDetails] = useState([]);

  const agencyState = useSelector((state) => state["agencyReducer"]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([...agencyState.agencies]);
  }, [agencyState.agencies]);

  const columns = [
    {key: 'name',},
    {key: 'location', },
    {key: 'city', }, 
    
    {
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
      sorter: false,
      _props: { color: "", className: "fw-semibold" },
    },
  ];
  

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const deleteAccount = (index) => {
    Swal.fire({
      title: "Do you want to delete this account?",

      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
      }  
    })
  }

  return (
    <div>

        <div className="py-0 d-flex justify-content-between align-items-center ">
        <h4>Agencies List</h4>
        <BtnPlus pathname="/agency" label="New Agency" />
      </div>


      <hr></hr>
        <CSmartTable
           activePage={3}
           cleaner
           clickableRows
           columns={columns}
           columnFilter
           columnSorter
           footer
           items={list}
           itemsPerPageSelect
           itemsPerPage={5}
           pagination
           scopedColumns={{
             show_details: (item) => {
               return (
                 <td className="py-2">
                   <CButton
                     color="primary"
                     variant="outline"
                     shape="square"
                     size="sm"
                     onClick={() => {
                       toggleDetails(item.id)
                     }}
                   >
                     {details.includes(item.id) ? 'Hide' : 'Action'}
                   </CButton>
                 </td>
               )
             },
             details: (item) => {
               return (
                 <CCollapse visible={details.includes(item.id)}>
                   <CCardBody>
                      
                     
                     <CButton size="sm" color="info"  onClick={() => {
             
               history.push({
                pathname: '/editAccount',
                id: item.id,  // query string
             
              }); 
                
              }}>
                       Update
                     </CButton>{'    '}
                      
                     <CButton size="sm" color="danger" className="ml-1"  onClick={() => {
                       deleteAccount(item.id)
                     }}>
                       Delete
                     </CButton>
                   </CCardBody>
                 </CCollapse>
               )
             },
           }}
           selectable
           sorterValue={{ column: 'name', state: 'asc' }}
           tableFilter
           tableHeadProps={{
             color: ' ',
           }}
           tableProps={{
             striped: true,
             hover: true,
           }} 
               />
           </div>
       )
       }

export default AgenciesList;
