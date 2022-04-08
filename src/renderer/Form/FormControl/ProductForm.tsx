/*eslint-disable */
import {Formik, Form, FieldArray} from 'formik';
import PropTypes from 'prop-types';
import {Box, Container, Divider} from '@mui/material';

import {productAPI} from 'api/productAPI';
import {useNavigate} from 'react-router-dom';
import ProductFormList from './ProductFormList';

interface Values {
  products: [
    {
      name: string;
      barrel_price: number;
      whirlwind_price: number;
      Single_price: number;
      Gift: string;
      category: object;
    }
  ];
}

/*eslint-disable */
ProductForm.propTypes = {
  onSubmit: PropTypes.func,
};
// eslint-disable-next-line
ProductForm.defaultProps = {
  onSubmit: null,
};

function ProductForm() {
  const navigate = useNavigate();

  // const SignupSchema = Yup.object().shape({
  //     products: Yup.array()
  //         .of(
  //             Yup.object().shape({
  //                 name: Yup.string().required('Yêu cầu nhập vào'), // these constraints take precedence
  //                 barrel_price: Yup.number().min(0, "Tối thiểu 0 ngàn đồng"), // these constraints take precedence
  //                 whirlwind_price: Yup.number().min(0, "Tối thiểu 0 ngàn đồng"), // these constraints take precedence
  //                 Single_price: Yup.number().min(0, "Tối thiểu 0 ngàn đồng"),
  //                 category: Yup.object().required('Yêu cầu nhập vào'), // these constraints take precedence
  //             })
  //         )
  //         .required('Yêu cầu nhập vào') // these constraints are shown if and only if inner constraints are satisfied
  //         .min(1, 'Tối thiểu 1 sản phẩm được nhập vào'),
  // });
  const initialValues: Values = {
    products: [
      {
        name: '',
        barrel_price: 0,
        whirlwind_price: 0,
        Single_price: 0,
        Gift: '',
        category: {
          id: 0,
          name: '',
        },
      },
    ],
  };
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          width: '80%',
          margin: '30px auto',
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);

            await productAPI
              .insertProduct(values.products)
              .then(() => {
                // Cookie.set("ast", JSON.stringify(res.success.secrect.ast), 30); //set "user_email" cookie, expires in 30 days
                alert('Thêm thành công');
                actions.resetForm();
                navigate('/');
              })
              .catch(() => {
                console.log('err.error');
              });
          }}
        >
          {(formikProps) => {
            // do something here ...
            /*eslint-disable */
            const {values} = formikProps;
            return (
              <>
                <Form>
                  <FieldArray name="products">
                    {({remove, push}) => {
                      function removeRow(index: number) {
                        if (values.products.length <= 1) {
                          return;
                        }
                        remove(index);
                      }


                      return (

                        <>
                          {values.products.length > 0 &&
                          /*eslint-disable */
                          values.products.map((index) => ( // eslint-disable-line
                            <ProductFormList
                              /*eslint-disable */
                              // @ts-ignore
                              key={index * 2}
                              remove={removeRow}
                              arr={values}
                              index={index}
                            />
                          ))}
                          <br/>
                          <Divider/>
                          <br/>
                          <button
                            type="button"
                            className="secondary"
                            onClick={() =>
                              push({
                                name: '',
                                price: 0,
                              })
                            }
                          >
                            Thêm hàng
                          </button>
                        </>
                      );
                    }}
                  </FieldArray>
                  <button type="submit">Xác nhận</button>
                </Form>

                {/* <pre>{getValues}</pre> */}
              </>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
}

export default ProductForm;
