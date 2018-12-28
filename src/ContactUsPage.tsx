import * as React from "react";
import ContactUs from "./ContactUs";

class ContactUsPage extends React.Component {

  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we will get back to you as soon as possible.
        </p>
        <ContactUs />
      </div>
    );
  }
}

export default ContactUsPage;
