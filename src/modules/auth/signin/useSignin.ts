import { useRoute, type RouteProp } from '@react-navigation/native';
import { useFormik, type FormikProps } from 'formik';
import { useEffect, useRef } from 'react';
import { AuthActions, useAppDispatch } from '../../../redux';
import { SigninFormSchema } from '../../../utils';
import type { SigninFormValues, SigninHookReturnType } from './SigninTypes';
import type { APIDispatch } from '../../../configs';
import type { ROUTES } from '../../../constants';
import type { RootStackParamList } from '../../../navigation/NavigationTypes';
import type { UserResponse } from '../../../types';
/**
 * Hook that returns the ref to the sign in form and the function to submit the form.
 * @returns formik props
 */
export default function useSignin(): SigninHookReturnType {
  const dispatch = useAppDispatch();
  const loginTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const refSigninDispatch = useRef<APIDispatch<UserResponse>>(null);
  const { params } = useRoute<RouteProp<RootStackParamList, ROUTES.SignIn>>();

  /* Creating a formik object that is used to submit the form. */
  const formik: FormikProps<SigninFormValues> = useFormik<SigninFormValues>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: SigninFormSchema,
    onSubmit: (values: SigninFormValues) => {
      refSigninDispatch.current = dispatch(
        AuthActions.signinRequest({
          data: { email: values.email, password: values.password, username: 'default' }
          // TODO: You can change content type like below
          // setting: {
          //   headers: { 'Content-Type': 'multipart/form-data', Accept: 'multipart/form-data' }
          // }
        })
      );
      // Simulated sign in - replace with actual API success handling in production
      loginTimeoutRef.current = setTimeout(() => {
        dispatch(AuthActions.setLoggedIn(true));
      }, 1000);
    }
  });

  useEffect(() => {
    if (!params?.email) return;
    formik?.setFieldValue('email', params.email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.email]);

  useEffect(() => {
    return () => {
      refSigninDispatch.current?.abort();
      if (loginTimeoutRef.current) {
        clearTimeout(loginTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return formik;
}
