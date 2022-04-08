import React, { useEffect, useState, forwardRef } from 'react';
import { Formik, Form } from 'formik';
import MaterialTable from 'material-table'
import proptype from 'prop-types';
import { productAPI } from "api/productAPI";
import { Box } from '@mui/material';
import {
    AddBox, ArrowDownward, Check, ChevronLeft,
    ChevronRight, Clear, DeleteOutline, Edit,
    FilterList, FirstPage, LastPage, Remove,
    SaveAlt, Search, ViewColumn
} from '@material-ui/icons'
import { CurrencyFormat } from 'words/words'
import Select from 'react-select'
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

MaterialTable.propTypes = {
    dataValue: proptype.array,
    handleRowUpdate: proptype.func,
    handleRowDelete: proptype.func,
    columns: proptype.array,
    title: proptype.string
}
// "Danh sách hàng hóa"
export default function MaterialTable(props) {
    const { dataValue, columns, title, handleRowUpdate, handleRowDelete } = props;
    // const [Loading, setLoading] = useState(false);
    const [initialValues, setInitialValues] = useState({
        name: "",
        barrel_price: 0,
        whirlwind_price: 0,
        Single_price: 0,
        Gift: "",
        category: {
            id: 0,
            name: ""
        }
    });

    const [selectedOption, setSelectedOption] = useState({
        label: "",
        value: { id: 0, name: '' }
    })

    const [data, setData] = useState([])
    useEffect(() => {
        setData(
            dataValue
        )

    }, [dataValue])


    const [categorys, setCategorys] = useState([
        {
            value: {
                id: 0,
                name: ""
            },
            label: "Ấn để chọn"
        }
    ]);

    // console.log(initialValues)

    const handleClose = () => {
        setOpen(false);
    };

    //function for updating the existing row details
    function updateData(newData, oldData, resolve, reject) {
        if (handleRowUpdate) {
            handleRowUpdate(newData, oldData, resolve, reject)
        }
    }
    function deleteData(oldData, resolve, reject) {
        if (handleRowDelete) {
            handleRowDelete(oldData, resolve, reject)
        }
    }



    async function fetchCatagory() {
        await productAPI.fetchCatagorys().then(
            data => {
                const newArray = [];
                data.map(values => (
                    newArray.push(
                        {
                            value: {
                                id: parseInt(values.id),
                                name: values.name
                            },
                            label: values.name
                        }
                    )
                ))
                setCategorys(newArray)
            }
        ).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchCatagory();
    }, []);
    return (
        <>
            <MaterialTable
                columns={columns}
                data={data}
                options={{
                    headerStyle: { borderBottomColor: 'blue', borderBottomWidth: '3px', fontFamily: 'verdana' },
                    actionsColumnIndex: -1,
                    search: true,
                    grouping: true,
                    pageSize: 10,
                    export: true,

                }}
                components={{
                   
                  }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            updateData(newData, oldData, resolve, reject);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve, reject) => {
                            deleteData(oldData, resolve, reject)
                        }),
                }}
                icons={tableIcons}
                title={title}
            />
        </>

    )
}