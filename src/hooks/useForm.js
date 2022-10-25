import { useState } from "react";
import { omit } from "lodash";

const useForm = ({
  callback,
  inputCount = 1,
  inputType = "",
  useValidation = true,
}) => {
  //#region - STATES
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  //#endregion

  const nameCondition = (value, name) => {
    if (value.length === 0) {
      setErrors({
        ...errors,
        [name]: `Please enter your ${name}`,
      });
    } else {
      let newObj = omit(errors, name);
      setErrors(newObj);
    }
  };

  const confirmCondition = (value) => {
    if (value.length === 0) {
      setErrors({
        ...errors,
        confirmPassword: "Please confirm your password",
      });
    } else {
      let newObj = omit(errors, "confirmPassword");
      setErrors(newObj);
    }
  };

  //#region - VALIDATE
  const validate = (event, name, value) => {
    switch (name) {
      case "myFile":
      case "name":
        nameCondition(value, name);
        break;

      case "confirmPassword":
        confirmCondition(value);
        break;

      case "fileDescription":
        if (value.length === 0) {
          setErrors({
            ...errors,
            [name]: `File Description is required`,
          });
        } else {
          let newObj = omit(errors, name);
          setErrors(newObj);
        }
        break;

      case "username":
        if (value.length === 0) {
          setErrors({
            ...errors,
            username: "Username is required",
          });
        } else {
          //omit function removes/omits the value from given object and returns a new object
          let newObj = omit(errors, "username");
          setErrors(newObj);
        }
        break;

      case "email":
        if (!new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/).test(value)) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          });
        } else {
          let newObj = omit(errors, "email");
          setErrors(newObj);
        }
        break;

      case "password":
        if (value.length === 0) {
          setErrors({
            ...errors,
            password: "Please enter your password",
          });
        } else {
          let newObj = omit(errors, "password");
          setErrors(newObj);
        }
        break;

      default:
        break;
    }
  };
  //#endregion

  //#region - HANDLERS, CUSTOM VALIDATION
  const handleChange = (event) => {
    //To stop default events
    event.persist();

    let name = event.target.name;
    let val = event.target.value;

    if (useValidation) {
      validate(event, name, val);
    }

    setValues({
      ...values,
      [name]: val,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errorsEmpty = {};

    if (
      Object.keys(errors).length === 0 &&
      Object.keys(values).length >= inputCount
    ) {
      callback();
    } else {
      setErrors({
        ...errors,
        ...errorsEmpty,
      });
    }
  };
  //#endregion

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useForm;

//-----------------------------------SAMPLE USE-----------------------------------//
// * if there is initial state/display use 'useEffect'  inside parent component to set value`
// useEffect(() => {
//   values.category = state.category; //? Set initial state
// }, []);

// * sample element
//  <input
// defaultValue={state.category}
// placeholder="Edit category"
// className="input-text"
// type="text"
// id="editCategory"
// name="category" //?set to value property all inputs
// onChange={handleChange}
// />
// {errors.category && <h5>{errors.category}</h5>}

// * sample use of hook
// let inputCount = 4; //?number of inputs
// const { handleChange, values, errors, handleSubmit } = useForm({
//   callback: editProduct,
//   inputCount,
// });
