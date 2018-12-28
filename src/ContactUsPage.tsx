import * as React from "react";
import ContactUs from "./ContactUs";


interface IState {
    name: string;
    email: string;
    reason: string;
    notes: string;
}

class ContactUsPage extends React.Component<{}, IState> {

    public constructor(props: {}) {
        super(props);
        this.state = {
            email: "",
            name: "",
            notes: "",
            reason: ""
        };
    }

    public render() {
        return (
            <div className="page-container">
                <h1>Contact Us</h1>
                <p>
                    If you enter your details we will get back to you as soon as possible.
                </p>
                <ContactUs 
                    name={this.state.name}
                    onNameChange={this.onNameChange}
                    email={this.state.email}
                    onEmailChange={this.onEmailChange}
                    notes={this.state.notes}
                    onNotesChange={this.onNotesChange}
                    reason={this.state.reason}
                    onReasonChange={this.onReasonChange}
                />
            </div>
        );
    }

    private onNameChange = (name: string) => {
        this.setState({name});
    }

    private onEmailChange = (email: string) => {
        this.setState({email});
    }

    private onNotesChange = (notes: string) => {
        this.setState({notes});
    }

    private onReasonChange = (reason: string) => {
        this.setState({reason});
    }
}

export default ContactUsPage;