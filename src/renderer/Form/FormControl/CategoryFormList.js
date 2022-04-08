import React, { useEffect, useState } from 'react';
import { ErrorMessage, FastField } from 'formik';
import { Divider, FormGroup, Input, Typography } from '@mui/material';
import { productAPI } from 'api/productAPI';
import {
  TextFieldControl,
  SelectFieldControl,
  PriceField,
} from '../CustomForm';

// eslint-disable-next-line react/prop-types
const ProductFormList = ({ arr, index, remove }) => {
  const [catagorys, setCatagorys] = useState([
    {
      value: {
        id: 0,
        name: '',
      },
      label: 'Ấn để chọn',
    },
  ]);

  async function fetchCatagory() {
    await productAPI
      .fetchCatagorys()
      // eslint-disable-next-line promise/always-return
      .then((data) => {
        const newArray = [];
        data.map((values) =>
          newArray.push({
            value: {
              id: values.id,
              name: values.name,
            },
            label: values.name,
          })
        );
        setCatagorys(newArray);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    fetchCatagory();
  }, []);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      {/* eslint-disable-next-line react/prop-types */}
      {arr.catagorys.length > 1 && index !== 0 && (
        <>
          <br />
          <Divider />
          <br />
        </>
      )}
      <div>
        Sản phẩm {index + 1}:
        <div style={{ textAlign: 'right' }}>
          <button
            type="button"
            className="secondary"
            onClick={() => remove(index)}
          >
            Xóa hàng {index + 1}
          </button>
        </div>
      </div>

      <FastField
        name={`catagorys.${index}.name`}
        component={TextFieldControl}
        type="text"
        label="Tên danh mục :"
        placeholder="A ram sam sam"
      />
      <ErrorMessage name={`catagorys.${index}.name`}>
        {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
      </ErrorMessage>
      <br />
    </>
  );
};

export default ProductFormList;
