import * as React from "react";

export interface IValues {
  [key: string]: any;
}

interface IFormProps {
  defaultValues: IValues;
  validationRules: IValidationProp;
  onSubmit: (values: IValues) => Promise<ISubmitResult>;
}

interface IErrors {
  [key: string]: string[];
}

interface IState {
  values: IValues;
  errors: IErrors;
  submitting: boolean;
  submitted: boolean;
}

interface IFormContext {
  errors: IErrors;
  values: IValues;
  setValue?: (fieldName: string, value: any) => void;
  validate?: (fieldName: string, value: any) => void;
}

const FormContext = React.createContext<IFormContext>({
  values: {},
  errors: {}
});

interface IFieldProps {
  name: string;
  label: string;
  type?: "Text" | "Email" | "Select" | "TextArea";
  options?: string[];
}

export type Validator = (
  fieldName: string,
  values: IValues,
  args?: any
) => string;

export const required: Validator = (
  fieldName: string,
  values: IValues,
  args?: any
): string => {
  const value = values[fieldName];
  if (value === undefined || value === null || value === "") {
    return "This must be populated";
  } else {
    return "";
  }
};

export const minLength: Validator = (
  fieldName: string,
  values: IValues,
  length: number
): string => {
  const value = values[fieldName];
  if (value && value.length < length) {
    return `This must be at least ${length} characters`;
  } else {
    return "";
  }
};

export interface ISubmitResult {
  success: boolean;
  errors?: IErrors;
}

interface IValidation {
  validator: Validator;
  arg?: any;
}

interface IValidationProp {
  [key: string]: IValidation | IValidation[];
}

type ControlElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export class Form extends React.Component<IFormProps, IState> {
  public static Field: React.SFC<IFieldProps> = props => {
    const { name, label, type, options } = props;
    const handleChange = (
      e: React.ChangeEvent<ControlElement>,
      context: IFormContext
    ) => {
      if (context.setValue) {
        context.setValue(props.name, e.currentTarget.value);
      }
    };

    const handleBlur = (
      e: React.FocusEvent<ControlElement>,
      context: IFormContext
    ) => {
      if (context.validate) {
        context.validate(props.name, e.currentTarget.value);
      }
    };

    return (
      <FormContext.Consumer>
        {context => (
          <div className="form-group">
            <label htmlFor={name}>{label}</label>
            {(type === "Text" || type === "Email") && (
              <input
                type={type.toLowerCase()}
                id={name}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
                value={context.values[name]}
              />
            )}
            {type === "TextArea" && (
              <textarea
                id={name}
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
                value={context.values[name]}
              />
            )}
            {type === "Select" && (
              <select
                onChange={e => handleChange(e, context)}
                onBlur={e => handleBlur(e, context)}
                value={context.values[name]}
              >
                {options &&
                  options.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
            {context.errors[name] && context.errors[name].length > 0 &&
              context.errors[name].map(error => (
                <span key={error} className="form-error">
                  {error}
                </span>
              ))
            }
          </div>
        )}
      </FormContext.Consumer>
    );
  };

  public constructor(props: IFormProps) {
    super(props);
    const errors: IErrors = {};
    Object.keys(props.defaultValues).forEach(fieldName => {
      errors[fieldName] = [];
    })
    this.state = {
      values: props.defaultValues,
      errors,
      submitted: false,
      submitting: false
    };
  }
  public render() {
    const context: IFormContext = {
      errors: this.state.errors,
      values: this.state.values,
      setValue: this.setValue,
      validate: this.validate
    };
    return (
      <FormContext.Provider value={context}>
        <form className="form" 
          onSubmit={this.handleSubmit}
          noValidate={true}>
          {this.props.children}
          <div className="form-group">
            <button 
              disabled={this.state.submitted || this.state.submitting}
              type="submit">Submit</button>
          </div>
        </form>
      </FormContext.Provider>
    );
  }

  private setValue = (fieldName: string, value: any) => {
    const newValues = { ...this.state.values, [fieldName]: value };
    this.setState({ values: newValues });
  };

  private validate = (
    fieldName: string,
    value: any
  ): string[] => {
    const rules = this.props.validationRules[fieldName];
    const errors: string[] = [];
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        const error = rule.validator(fieldName, this.state.values, rule.arg);
        if (error) {
          errors.push(error);
        }
      })
    } else {
      if (rules) {
        const error = rules.validator(fieldName, this.state.values, rules.arg);
        if (error) {
          errors.push(error);
        }
      }
    }
    const newErrors = { ...this.state.errors, [fieldName]: errors };
    this.setState({ errors: newErrors });
    return errors;
  };

  private validateForm(): boolean {
    const errors: IErrors = {};
    let hasError: boolean = false;
    Object.keys(this.props.defaultValues).map(fieldName => {
      errors[fieldName] = this.validate(
        fieldName,
        this.state.values[fieldName]
      );
      if (errors[fieldName].length > 0) {
        hasError = true;
      }
    });
    this.setState({errors});
    return !hasError;
  }

  private handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (this.validateForm) {
      this.setState({submitting: true});
      const result = await this.props.onSubmit(this.state.values);
      this.setState({
        errors: result.errors || {},
        submitted: result.success,
        submitting: false
      })
    }
  }
}

Form.Field.defaultProps = {
  type: "Text"
};
