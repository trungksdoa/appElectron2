import { Formik, Form, FieldArray } from 'formik';
import PropTypes from 'prop-types';
import { Box, Container, Divider } from '@mui/material';
import { productAPI } from 'api/productAPI';
import { useNavigate } from 'react-router-dom';
import CatagoryFormList from './CategoryFormList';
// import { dialog } from 'electron';

interface Values {
  catagorys: [
    {
      name: string;
    }
  ];
}

// eslint-disable-next-line @typescript-eslint/no-use-before-define
CatagoryUpload.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  onSubmit: PropTypes.func,
};
// eslint-disable-next-line @typescript-eslint/no-use-before-define
CatagoryUpload.defaultProps = {
  onSubmit: null,
};

function CatagoryUpload() {
  const navigate = useNavigate();

  const initialValues: Values = {
    catagorys: [
      {
        name: '',
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
              .insertCatagory(values.catagorys)
              // eslint-disable-next-line promise/always-return
              .then(() => {
                window.electron.ipcRenderer.sendMessage(
                  'Thêm dữ liệu thành công'
                );
                actions.resetForm();
                window.electron.ipcRenderer.once('ipc-message-dialog', () => {
                  navigate('/');
                });
              })
              .catch((error) => {
                window.electron.ipcRenderer.sendError(error);
              });
          }}
        >
          {(formikProps) => {
            // do something here ...
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { values } = formikProps;

            return (
              <>
                <Form>
                  <FieldArray name="catagorys">
                    {({ remove, push }) => {
                      function removeRow(index: number) {
                        if (values.catagorys.length <= 1) {
                          return;
                        }
                        remove(index);
                      }

                      return (
                        <>
                          {values.catagorys.length > 0 &&
                            values.catagorys.map((_data, index) => (
                              <CatagoryFormList
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* eslint-disable-next-line react/no-array-index-key */
                                key={index}
                                /* eslint-disable-next-line react/jsx-no-bind */
                                remove={removeRow}
                                arr={values}
                                index={index}
                              />
                            ))}
                          <br />
                          <Divider />
                          <br />
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

export default CatagoryUpload;
