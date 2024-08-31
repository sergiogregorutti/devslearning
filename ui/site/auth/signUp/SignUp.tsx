"use client";
import { MouseEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import Image from "next/image";

export default function SignUp({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: { [key: string]: any };
}) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: dictionary.signUp.createAccount,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { name, email, password, buttonText } = values;

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
    setFormLoading(true);
    setValues({ ...values, buttonText: dictionary.common.loading });

    const form = new FormData();
    form.append("lang", lang);
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);

    axios
      .post("/api/auth/signup", form)
      .then((response) => {
        console.log("Signup success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.log("Signup error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
      });
  };

  return (
    <div className="content-container">
      <form className="form">
        {formSubmitted ? (
          <p className="message">{dictionary.signUp.formSubmitted}</p>
        ) : (
          <>
            <label className="form-label">{dictionary.signUp.name}</label>
            <input type="text" className="form-input" onChange={handleChange("name")} value={name} disabled={formLoading} />

            <label className="form-label">{dictionary.signUp.email}</label>
            <input type="email" className="form-input" onChange={handleChange("email")} value={email} disabled={formLoading} />

            <label className="form-label">{dictionary.signUp.password}</label>
            <input type="password" className="form-input" onChange={handleChange("password")} value={password} disabled={formLoading} />

            <button
              onClick={clickSubmit}
              className="btn btn-big"
              disabled={formLoading}
            >
              {buttonText}
            </button>
          </>
        )}

        <p>
          {dictionary.signUp.alreadyHaveAccount}{" "}
          <Link href={getLocalizedPathFromPrefix(lang, `/auth/signin`)}>
            {dictionary.signUp.signIn}
          </Link>
        </p>
      </form>
      <div className="image-container">
        <Image
          src="/assets/girl.svg"
          width={532}
          height={395}
          alt="Devs Learning"
        />
      </div>
    </div>
  );
}
