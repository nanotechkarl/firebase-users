import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useForm from "../hooks/useForm";
import { pages } from "../utils/config";
import { registerUser } from "../store/actions/user";

export default function Register() {
  //#region - HOOKS
  let navigate = useNavigate();
  const dispatch = useDispatch();
  //#endregion

  //#region - REGISTER
  const onSubmit = async (e) => {
    const { name, email } = values;

    const register = await dispatch(registerUser({ email, name }));

    if (register) {
      navigate(pages.welcome);
    }
  };
  //#endregion

  //#region - CUSTOM HOOKS
  const inputCount = 2;
  const { handleChange, values, errors, handleSubmit } = useForm({
    callback: onSubmit,
    inputCount,
  });
  //#endregion

  return (
    <div className="centered form">
      <div className="header-div">
        <h4>
          <p>
            <br />
          </p>
        </h4>
      </div>

      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <div className="input-div">
            <div className="name-div">
              <label htmlFor="name">
                <b>Full Name</b>
              </label>
              <input
                className="input-text"
                type="text"
                id="name"
                name="name"
                placeholder="test name"
                onChange={handleChange}
              />
              {errors.name ? (
                <p className="input-error err-name">{errors.name}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>

            <div className="email-div">
              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                className="input-text"
                type="text"
                id="email"
                name="email"
                placeholder="test@mail.com"
                onChange={handleChange}
              />
              {errors.email ? (
                <p className="input-error err-email">{errors.email}</p>
              ) : (
                <p>&nbsp;</p>
              )}
            </div>
          </div>
          <div>
            <input className="button-primary" type="submit" value="Add " />
          </div>
        </form>
      </div>
    </div>
  );
}
