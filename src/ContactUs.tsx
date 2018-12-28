import * as React from "react";

interface IProps {
  name: string;
  email: string;
  reason: string;
  notes: string;
  onNameChange: (name: string) => void;
  onEmailChange: (name: string) => void;
  onReasonChange: (name: string) => void;
  onNotesChange: (name: string) => void;
}

const ContactUs: React.SFC<IProps> = props => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onNameChange(e.currentTarget.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onEmailChange(e.currentTarget.value);
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.onNotesChange(e.currentTarget.value);
  };
  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    props.onReasonChange(e.currentTarget.value);
  };
  return (
    <form className="form" noValidate={true}>
      <div className="form-group">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          onChange={handleNameChange}
          value={props.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Your email</label>
        <input
          type="text"
          id="email"
          onChange={handleEmailChange}
          value={props.email}
        />
      </div>
      <div className="form-group">
     <label htmlFor="reason">Reason you need to contact us</label>
     <select id="reason" value={props.reason} onChange={handleReasonChange}>
       <option value="Marketing">Marketing</option>
       <option value="Support">Support</option>
       <option value="Feedback">Feedback</option>
       <option value="Jobs">Jobs</option>
       <option value="Other">Other</option>
    </select>
  </div>
      <div className="form-group">
    <label htmlFor="notes">Additional notes</label>
    <textarea id="notes" value={props.notes} onChange={handleNotesChange} />
  </div>
    </form>
  );
};

export default ContactUs;
