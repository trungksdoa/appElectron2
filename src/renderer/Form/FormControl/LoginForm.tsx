import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { TextFieldControl } from '../CustomForm';
import { UserAPI } from 'api/userAPI';
import { Cookie,cookie2 } from 'cookieStore';
import { useNavigate } from 'react-router-dom';

interface Values {
  username: string;
  password: number;
}

Loginss.propTypes = {
  onSubmit: PropTypes.func,
};
Loginss.defaultProps = {
  onSubmit: null,
};
function Loginss() {
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    username: Yup.string().required('Yêu cầu điền tên'),
    password: Yup.number()
    .required('Yêu cầu điền giá vào'),
  });

  const sendLogin = async (value: any) => {
    const res = await UserAPI.login(value)
      .then((res) => {
        // Cookie.set('ast', JSON.stringify(res.success.secrect.ast), 30); //set "user_email" cookie, expires in 30 days

        cookie2.set('ast', JSON.stringify(res.success.secrect.ast))
       
        
        alert('Login success');
        // console.log(res)
      })
      .catch((err) => {
        alert(err);
      });
    //
  };

  const initialValues: Values = {
    username: 'admin',
    password: 1234,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          actions.setSubmitting(false);
          navigate('/');
          actions.resetForm();
          sendLogin(values);
        }, 1000);
      }}
    >
      {(formikProps) => {
        // do something here ...
        const { values, errors, touched } = formikProps;

        return (
          <>
            <Form>
              <FastField
                name={`username`}
                component={TextFieldControl}
                type="text"
                label={'Tên đăng nhập :'}
                placeholder="admin"
              />
              <FastField
                name={`password`}
                component={TextFieldControl}
                type="text"
                label={'Mật khẩu :'}
                placeholder="1234"
              />
              <button type="submit">Submit</button>
            </Form>
            <p>{JSON.stringify(values, undefined)}</p>
          </>
        );
      }}
    </Formik>
  );
}

export default Loginss;
