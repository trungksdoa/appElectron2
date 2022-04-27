import React, { useEffect, useState, forwardRef } from 'react';
import MaterialTable from 'material-table';
import proptype from 'prop-types';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';

/*eslint-disable */
// @ts-ignore
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

MaterialTable.propTypes = {
  dataValue: proptype.array,
  handleRowUpdate: proptype.func,
  handleRowDelete: proptype.func,
  columns: proptype.array,
  title: proptype.string,
};
MaterialTable.defaultProps = {
  dataValue: [],
  handleRowUpdate: null,
  handleRowDelete: null,
  columns: [],
  title: '',
};
// "Danh sách hàng hóa"
export default function MaterialTable(props) {
  const { dataValue, columns, title, handleRowUpdate, handleRowDelete } = props;

  const [data, setData] = useState([]);
  useEffect(() => {
    setData(dataValue);
  }, [dataValue]);

  // function for updating the existing row details
  function updateData(newData, oldData, resolve, reject) {
    if (handleRowUpdate) {
      handleRowUpdate(newData, oldData, resolve, reject);
    }
  }
  function deleteData(oldData) {
    if (handleRowDelete) {
      handleRowDelete(oldData);
    }
  }
  // console.log(data)
  return (
    <>
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          headerStyle: {
            borderBottomColor: 'blue',
            borderBottomWidth: '3px',
            fontFamily: 'verdana',
          },
          actionsColumnIndex: -1,
          search: true,
          grouping: true,
          pageSize: 5,
        }}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleRowUpdate(newData, oldData, resolve, reject);
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleRowDelete(oldData);
                resolve();
              }, 1000);
            }),
        }}
        icons={tableIcons}
        title={title}
      />
    </>
  );
}
