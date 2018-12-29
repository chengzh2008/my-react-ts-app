import * as React from "react";
import ContactUs from "./ContactUs";
import { IValues, ISubmitResult } from "./Form";
import { wait } from "./Utils"

class ContactUsPage extends React.Component {

  public render() {
    return (
      <div className="page-container">
        <h1>Contact Us</h1>
        <p>
          If you enter your details we will get back to you as soon as possible.
        </p>
        <ContactUs onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
  private handleSubmit = async (values: IValues): Promise<ISubmitResult> => {
    await wait(1000);
    return {
      /*
      errors: {
        email: ["Some is wrong with this"]
      },
      */
      success: false
    };
  }

}

export default ContactUsPage;
