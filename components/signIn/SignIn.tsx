"use client";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "./styles.css";

export default function SignIn({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: { [key: string]: any };
}) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: dictionary.signIn.signIn,
  });

  const { email, password, buttonText } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.currentTarget.value });
    };

  /*
  const informParent = (response: AxiosResponse) => {
    authenticate(response, () => {
      history.push("/");
    });
  };
  */

  const clickSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setValues({ ...values, buttonText: dictionary.common.loading });
    /*
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("Signup success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
        informParent(response);
      })
      .catch((error) => {
        console.log("Signup error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
      */
  };

  return (
    <div className="sign-in-container">
      <form className="form">
        <label className="form-label">{dictionary.signIn.email}</label>
        <TextField
          fullWidth
          onChange={handleChange("email")}
          type="email"
          value={email}
          className="form-input"
        />

        <label className="form-label">{dictionary.signIn.password}</label>
        <TextField
          fullWidth
          onChange={handleChange("password")}
          type="password"
          value={password}
          className="form-input"
        />

        <button onClick={clickSubmit} className="btn btn-big">
          {buttonText}
        </button>

        <p>
          <Link href={getLocalizedPathFromPrefix(lang, `/forgot-password`)}>
            {dictionary.signIn.forgotPassword}
          </Link>
        </p>

        <p>
          {dictionary.signIn.doNotHaveAccount}{" "}
          <Link href={getLocalizedPathFromPrefix(lang, `/signup`)}>
            {dictionary.signIn.signUp}
          </Link>
        </p>
      </form>
      <div className="image-container">
        <img alt="Devs Learning" src="/assets/boy2.svg" />
      </div>
    </div>
  );
}
