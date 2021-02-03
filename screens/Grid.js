import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

export default (props) => {
  const customStyles = {
    headCells: {
      style: { "font-size": "14px", "font-weight": "700" },
    },
    cells: {
      style: { paddingRight: "0px" },
    },
  };

  const [columns] = useState([
    {
      selector: "firstName",
      name: "First Name",
      width: "150px",
      sortable: true,
    },
    {
      selector: "lastName",
      name: "First Name",
      width: "150px",
      sortable: true,
    },
  ]);

  return (
    <div style={{ position: "center !important", height: "70% !important" }}>
      <DataTable
        columns={columns}
        data={tenders}
        noHeader
        defaultSortField="Rfqnum"
        customStyles={customStyles}
        expandableRows
        expandOnRowClicked
        pagination
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
      {/* <div className="grid-loader">
        <Loader
          type="ThreeDots"
          color="#0772db"
          height={80}
          width={80}
          visible={!loading}
        />
      </div> */}
    </div>
  );
};
