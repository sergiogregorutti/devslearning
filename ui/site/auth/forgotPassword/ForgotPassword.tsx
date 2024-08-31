"use client";
import { MouseEvent, useState } from "react";
import Image from "next/image";

export default function SignIn({
  dictionary,
}: {
  dictionary: { [key: string]: any };
}) {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: dictionary.forgotPassword.requestResetLink,
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
    <div className="content-container">
      <form className="form">
        <label className="form-label">{dictionary.forgotPassword.email}</label>
        <input type="email" className="form-input" onChange={handleChange("email")} value={email} />

        <button onClick={clickSubmit} className="btn btn-big">
          {buttonText}
        </button>
      </form>
      <div className="image-container">
        <Image
          src="/assets/boy2.svg"
          width={532}
          height={444}
          alt="Devs Learning"
        />
      </div>
    </div>
  );
}
