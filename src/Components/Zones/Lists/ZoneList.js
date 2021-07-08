import React, { useEffect, useState } from "react";
import { CDataTable, CContainer, CButton } from "@coreui/react";
import axios from "axios";
import AddZone from "./Add/AddZone";
const fields = [
  "Name",
  "End Device Type",
  "Schedule Type",
  "Associated Devices",
  "version",
  {
    key: "Edit",
    label: "Action",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
  {
    key: "Delete",
    label: "Action",
    _style: { width: "1%" },
    sorter: false,
    filter: false,
  },
];
const Zone = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `/modbus/device`,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <CContainer fluid>
      <>
        <div align="left">
          <AddZone />
        </div>
        <CDataTable
          textalign="center"
          items={data}
          fields={fields}
          itemsPerPageSelect
          itemsPerPage={20}
          columnFilter
          tableFilter
          footer
          hover
          sorter
          pagination
          striped
          responsive
          Action
          scopedSlots={{
            Edit: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    key={item.device_code}
                    id={item.device_code}
                    active
                    block
                    color="warning"
                    aria-pressed="true"
                  >
                    Edit
                  </CButton>
                </td>
              );
            },
            Delete: (item, index) => {
              return (
                <td className="py-2">
                  <CButton
                    key={item.device_code}
                    id={item.device_code}
                    active
                    block
                    color="danger"
                    aria-pressed="true"
                  >
                    Delete
                  </CButton>
                </td>
              );
            },
          }}
        />
      </>
    </CContainer>
  );
};
export default Zone;
