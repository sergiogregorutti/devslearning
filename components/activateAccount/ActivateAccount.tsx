"use client";
import { MouseEvent, useState } from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { getLocalizedPathFromPrefix } from "@/lib/language";

import "./styles.css";

export default function ActivateAccount({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: { [key: string]: any };
}) {
  const [values, setValues] = useState({
    name: "",
    token: "",
    buttonText: dictionary.activateAccount.activateAccount,
  });

  /*
  const params = useParams<RouteParams>();

  useEffect(() => {
    const token = params.token;

    const { name } = jwt.decode(token) as Token;
    console.log("name", name);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);
  */

  const { name, token, buttonText } = values;

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    /*
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("Account activation success", response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Account activation error", error.response.data.error);
        toast.error(error.response.data.error);
      });
      */
  };

  return (
    <div className="activate-account-container">
      <form className="form">
        <button onClick={clickSubmit} className="btn btn-big">
          {buttonText}
        </button>
      </form>
      <div className="image-container">
        <img alt="Devs Learning" src="/assets/boy2.svg" />
      </div>
    </div>
  );
}
