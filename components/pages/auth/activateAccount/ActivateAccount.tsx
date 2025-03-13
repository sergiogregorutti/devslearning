"use client";
import { MouseEvent, useState, useEffect } from "react";
import axios from "axios";
const jwt = require("jsonwebtoken");
import Image from "next/image";
import Button from "@/components/ui/Button";

interface Token {
  name: string;
}

export default function ActivateAccount({
  token,
  dictionary,
}: {
  token: string;
  dictionary: { [key: string]: any };
}) {
  const [values, setValues] = useState({
    name: "",
    buttonText: dictionary.activateAccount.activateAccount,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const { name } = jwt.decode(token) as Token;

    if (token) {
      setValues({ ...values, name });
    }
  }, []);

  const { buttonText } = values;

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setFormLoading(true);
    setValues({ ...values, buttonText: dictionary.common.loading });

    const form = new FormData();
    form.append("token", token);

    axios
      .post("/api/auth/activate-account", form)
      .then((response) => {
        setFormSubmitted(true);
        console.log("Account activation success", response);
      })
      .catch((error) => {
        setFormLoading(false);
        setValues({
          ...values,
          buttonText: dictionary.activateAccount.activateAccount,
        });
        console.log("Account activation error", error.response.data.error);
      });
  };

  return (
    <div className="content-container">
      <form className="form">
        {formSubmitted ? (
          <p className="message">
            {dictionary.activateAccount.accountActivated}
          </p>
        ) : (
          <>
            <Button
              label={buttonText}
              onClick={clickSubmit}
              disabled={formLoading}
            />
          </>
        )}
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
