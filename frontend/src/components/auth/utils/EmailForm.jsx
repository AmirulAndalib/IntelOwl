import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input, Button, Spinner } from "reactstrap";
import { Form, Formik } from "formik";

import { EMAIL_REGEX } from "../../../constants";
import ReCAPTCHAInput from "./ReCAPTCHAInput";
import { RECAPTCHA_SITEKEY } from "../../../constants/environment";

// constants
const initialValues = {
  email: "",
  recaptcha: "noKey",
};
// methods
const onValidate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (values.recaptcha === "noKey" && RECAPTCHA_SITEKEY) {
    errors.recaptcha = "Required";
  }
  return errors;
};

// Resend Verification Email Form
export default function EmailForm({ onFormSubmit, apiCallback, ...restProps }) {
  // callbacks
  const onSubmit = React.useCallback(
    async (values) => {
      try {
        await apiCallback(values);
        onFormSubmit();
      } catch (e) {
        // error will be handled by apiCallback
      }
    },
    [apiCallback, onFormSubmit]
  );

  return (
    <Formik
      initialValues={initialValues}
      validate={onValidate}
      onSubmit={onSubmit}
      validateOnMount
    >
      {(formik) => (
        <Form {...restProps}>
          {/* Email field */}
          <FormGroup>
            <Label className="required" htmlFor="email">
              Email Address
            </Label>
            <Input
              autoFocus
              type="text"
              name="email"
              className="form-control form-control-sm"
              onChange={formik.handleChange}
            />
          </FormGroup>
          {/* reCAPTCHA */}
          <FormGroup row>
            {RECAPTCHA_SITEKEY && (
              <ReCAPTCHAInput
                id="RegisterForm__recaptcha"
                className="m-3 mx-auto"
              />
            )}
          </FormGroup>
          {/* Submit */}
          <FormGroup className="">
            <Button
              type="submit"
              disabled={!(formik.isValid || formik.isSubmitting)}
              color="darker"
              className="mx-auto"
            >
              {formik.isSubmitting && <Spinner size="sm" />} Send
            </Button>
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
}

EmailForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  apiCallback: PropTypes.func.isRequired,
};
