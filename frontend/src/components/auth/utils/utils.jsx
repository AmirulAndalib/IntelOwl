import React from "react";
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Alert, PopoverBody } from "reactstrap";
import { MdInfoOutline } from "react-icons/md";
import { IoMail } from "react-icons/io5";

import { PopupFormButton } from "@certego/certego-ui";
import { useNavigate } from "react-router-dom";
import EmailForm from "./EmailForm";
import { resendVerificationMail, requestPasswordReset } from "../api";

export function AfterRegistrationModalAlert(props) {
  // modal state from props
  const { isOpen, setIsOpen } = props;
  const navigate = useNavigate();

  // callbacks
  const toggle = React.useCallback(() => {
    navigate("/");
    setIsOpen((o) => !o);
  }, [navigate, setIsOpen]);

  return (
    <Modal
      autoFocus
      centered
      zIndex="1050"
      size="lg"
      isOpen={isOpen}
      keyboard={false}
      backdrop="static"
      labelledBy="Registration successful modal"
    >
      <ModalHeader toggle={toggle}>Registration successful! 🥳</ModalHeader>
      <ModalBody className="px-5">
        <>
          <section>
            <Alert color="success" className="text-center">
              <h3>Thank you for signing up on IntelOwl! 🤝</h3>
            </Alert>
          </section>
          <section className="mt-4">
            <strong className="h6">
              <u>Next Steps:</u>
            </strong>
            <ol className="mt-2">
              <li>
                Verify your email address. We have already sent you a{" "}
                <abbr title="Didn't receive ? No worries, request again.">
                  link
                </abbr>
                .
              </li>
              <li>Our team will reach out to you soon afterwards.</li>
            </ol>
          </section>
        </>
      </ModalBody>
    </Modal>
  );
}

export function InviteOnlyAlert() {
  return (
    <Alert
      color="accent-2"
      id="inviteonly-info"
      className="col-12 px-1 text-center"
    >
      <h5 className="text-info">
        <MdInfoOutline size="1.15rem" />
        &nbsp;Sign up below to join the waitlist!
      </h5>
      <p>
        Please note that IntelOwl is operated as an invite-only trust group.
        Once you sign up, our team will reach out to you at the provided email
        address.
        <br />
        <span className="font-italic text-accent">
          We recommend signing up with a business email address and not a
          personal one to increase your chances of getting access.
        </span>
      </p>
    </Alert>
  );
}

export function EmailIcon() {
  return (
    <small className="d-flex-center standout">
      <IoMail />
      &nbsp;
      <span>Need Verification Email ?</span>
    </small>
  );
}

export function EmailFormPopoverBody(formProps) {
  return (
    <PopoverBody>
      <Alert className="mb-4 text-wrap" color="secondary">
        <IoMail />
        &nbsp; We will shoot you an email with instructions to verify your email
        address.
      </Alert>
      <EmailForm
        className="col-lg-6 col-sm-12"
        apiCallback={resendVerificationMail}
        {...formProps}
      />
    </PopoverBody>
  );
}

// Popover Button for "Request Verification Email"
export function ResendVerificationEmailButton() {
  return (
    <PopupFormButton
      id="reqverificationemail-iconbtn"
      popOverPlacement="top-start"
      Icon={EmailIcon}
      Form={EmailFormPopoverBody}
      size="sm"
      outline
      className="border-0"
    />
  );
}

export function PasswordIcon() {
  return (
    <small className="d-flex-center standout">
      <IoMail />
      &nbsp;
      <span>Forgot Password ?</span>
    </small>
  );
}

export function PasswordFormPopoverBody(formProps) {
  return (
    <PopoverBody>
      <Alert className="mb-4" color="secondary">
        <IoMail />
        &nbsp; We will shoot you an email with instructions to reset your
        password.
      </Alert>
      <EmailForm
        className="col-lg-6 col-sm-12"
        apiCallback={requestPasswordReset}
        {...formProps}
      />
    </PopoverBody>
  );
}

// Popover Button for "Forgot Password?"
export function ForgotPasswordButton() {
  return (
    <PopupFormButton
      id="requestpasswordreset-iconbtn"
      popOverPlacement="top-start"
      Icon={PasswordIcon}
      Form={PasswordFormPopoverBody}
      size="sm"
      outline
      className="border-0"
    />
  );
}

AfterRegistrationModalAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
