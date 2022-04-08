import { Formik, Form, FieldArray } from "formik";
import PropTypes from 'prop-types'
import { Box, Container, Divider } from "@mui/material";
import { productAPI } from "api/productAPI";
import { useNavigate } from "react-router-dom";
import CatagoryFormList from "./CategoryFormList";

interface Values {
    catagorys: [
        {
            name: string,
        }
    ]
}

CatagoryUpload.propTypes = {
    onSubmit: PropTypes.func,
}
CatagoryUpload.defaultProps = {
    onSubmit: null
}
function CatagoryUpload() {
    const navigate = useNavigate(); 

    const initialValues: Values = {
        catagorys: [
            {
                name: ""
            }
        ],
    };
    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    width: "80%",
                    margin: "30px auto"
                }}
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values, actions) => {
                        actions.setSubmitting(false);
            
                        const res = await productAPI.insertCatagory(values.catagorys)
                            .then(res => {
                                // Cookie.set("ast", JSON.stringify(res.success.secrect.ast), 30); //set "user_email" cookie, expires in 30 days
                                alert("Thêm thành công")
                                actions.resetForm();
                                navigate("/")
                            })
                            .catch(err => {
                                console.log("err.error")
                            })


                    }}
                >
                    {formikProps => {
                        // do something here ...
                        const { values, errors, touched } = formikProps;

                        const getValues = JSON.stringify(values, undefined, 2);

                        return (
                            <>
                                <Form>

                                    <FieldArray name="catagorys">
                                        {({ insert, remove, push }) => {
                                            function removeRow(index: number) {
                                                if (values.catagorys.length <= 1) {
                                                    return;
                                                }
                                                remove(index)
                                            }
                                            return (
                                                <>
                                                    {values.catagorys.length > 0 &&
                                                        values.catagorys.map((pr, index) => (
                                                            <CatagoryFormList key={index * 2} remove={removeRow} arr={values} index={index} />
                                                        ))}
                                                    <br />
                                                    <Divider />
                                                    <br />
                                                    <button
                                                        type="button"
                                                        className="secondary"
                                                        onClick={() => push({
                                                            name: '',
                                                            price: 0,
                                                        })}
                                                    >
                                                        Thêm hàng
                                                    </button>

                                                </>
                                            )
                                        }}
                                    </FieldArray>
                                    <button type="submit">Xác nhận</button>
                                </Form>

                                {/* <pre>{getValues}</pre> */}
                            </>
                        )

                    }}
                </Formik>
            </Box>
        </Container>
    )
}

export default CatagoryUpload