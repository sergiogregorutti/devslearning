"use client";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { getLocalizedPathFromPrefix } from "@/lib/language";
import { authenticate } from "@/lib/helpers";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function SignIn({
  lang,
  dictionary,
}: {
  lang: string;
  dictionary: { [key: string]: any };
}) {
  const router = useRouter();
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: dictionary.signIn.signIn,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { email, password, buttonText } = values;

  let langRedirection = lang;
  if (lang === "en") {
    langRedirection = "/";
  } else {
    langRedirection = "/es/";
  }

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
    form.append("email", email);
    form.append("password", password);

    axios
      .post("/api/auth/signin", form)
      .then((response) => {
        console.log("Signin success", response);

        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          router.push(langRedirection);
          router.refresh();
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
        <label className="form-label">{dictionary.signIn.email}</label>
        <input
          type="email"
          className="form-input"
          onChange={handleChange("email")}
          value={email}
          disabled={formLoading}
        />

        <label className="form-label">{dictionary.signIn.password}</label>
        <input
          type="password"
          className="form-input"
          onChange={handleChange("password")}
          value={password}
          disabled={formLoading}
        />

        <Button
          label={buttonText}
          onClick={clickSubmit}
          disabled={formLoading}
        />

        <p>
          <Link href={getLocalizedPathFromPrefix(lang, `/forgot-password`)}>
            {dictionary.signIn.forgotPassword}
          </Link>
        </p>

        <p>
          {dictionary.signIn.doNotHaveAccount}{" "}
          <Link href={getLocalizedPathFromPrefix(lang, `/auth/signup`)}>
            {dictionary.signIn.signUp}
          </Link>
        </p>
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
