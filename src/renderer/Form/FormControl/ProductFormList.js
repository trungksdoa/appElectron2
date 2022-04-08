import React, { useEffect, useState } from "react";
import { ErrorMessage, FastField } from "formik";
import { TextFieldControl, PriceField, SelectFieldControl } from "../CustomForm";
import { Divider, FormGroup, Input, Typography } from "@mui/material";
import { productAPI } from "api/productAPI";


const ProductFormList = ({ arr, index, remove }) => {

    const [catagorys, setCatagorys] = useState([
        {
            value: {
                id: 0,
                name: ""
            },
            label: "Ấn để chọn"
        }
    ]);

    async function fetchCatagory() {
        await productAPI.fetchCatagorys().then(
            data => {
                const newArray = [];
                data.map(values => (
                    newArray.push(
                        {
                            value: {
                                id: values.id,
                                name: values.name
                            },
                            label: values.name
                        }
                    )
                ))
                setCatagorys(newArray)
            }
        ).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchCatagory();
    }, []);


    return (
        <>
            {arr.products.length > 1 && (
                index !== 0 && (
                    <>
                        <br />
                        <Divider />
                        <br />
                    </>
                )
            )}
            <div>Sản phẩm {index + 1}:
                <div style={{ textAlign: "right" }}>
                    <button
                        type="button"
                        className="secondary"
                        onClick={() => remove(index)}
                    >
                        Xóa sản phẩm {index + 1}
                    </button>
                </div>
            </div>

            <FastField
                name={`products.${index}.name`}
                component={TextFieldControl}
                type="text"
                label={"Tên sản phẩm :"}
                placeholder="ví dụ: Bánh oreo"
            />
            <ErrorMessage name={`products.${index}.name`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>
            <br />

            <FastField
                name={`products.${index}.barrel_price`}
                component={PriceField}
                label={"Giá thùng:"}
                placeholder="ví dụ: 1,000,000 VNĐ"
            />
            <ErrorMessage name={`products.${index}.barrel_price`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            <br />
            <FastField
                name={`products.${index}.whirlwind_price`}
                component={PriceField}
                label={"Giá lốc :"}
                placeholder="ví dụ: 1,000,000 VNĐ"
            />
            <ErrorMessage name={`products.${index}.whirlwind_price`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            <br />
            <FastField
                name={`products.${index}.Single_price`}
                component={PriceField}
                label={"Giá bán lẻ :"}
                placeholder="ví dụ: 1,000,000 VNĐ"
            />
            <ErrorMessage name={`products.${index}.Single_price`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            <br />

            <FastField
                name={`products.${index}.Gift`}
                component={TextFieldControl}
                type="text"
                label={"Tặng kèm (nếu có) :"}
                placeholder="Tặng 2 lốc sữa"
            />
            <ErrorMessage name={`products.${index}.Gift`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            <br />

            <FastField
                name={`products.${index}.category`}
                component={SelectFieldControl}

                label="Loại"
                placeholder="Loại hàng :"
                options={catagorys}
            />
            <ErrorMessage name={`products.${index}.category`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            {/* <br /> */}

            {/* <FastField
                name={`products.${index}.image`}
                component={RandomPhotoField}
                label="Photo"
            />
            <ErrorMessage name={`products.${index}.image`}>{msg => <div style={{ color: "red" }}>{msg}</div>}</ErrorMessage>

            <br /> */}

        </>
    )
}

export default ProductFormList