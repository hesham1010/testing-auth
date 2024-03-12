"use client";
import { Input, Button } from "@nextui-org/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { errorHelper } from "@/components/utils";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const [formType, setFormType] = useState(false);

  const signUser = async (values) => {
    await signIn("credentials", {
      redirect: true,
      email: values.email,
      password: values.password,
      callbackUrl: "/dashboard",
    });
  };
  const submitForm = async (values) => {
    if (formType) {
      //register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const user = await res.json();
      if (!res.ok) {
        alert(user.error);
      } else {
        signUser(values);
      }
      console.log(user);
    } else {
      signUser(values);
    }
  };
  const handleFormType = () => {
    setFormType(!formType);
  };
  const formik = useFormik({
    initialValues: {
      email: "francis@gmail.com",
      password: "testing123",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("sorry this email is required")
        .email("This is email is Invalid"),
      password: Yup.string().required("sorry this password is required"),
    }),
    onSubmit: async (values) => {
      submitForm(values);
    },
  });
  return (
    <form className="max-w-sm mx-auto " onSubmit={formik.handleSubmit}>
      <h1 className="text-5xl py-10">{formType ? "Register" : "Sign In"}</h1>
      <div className="mb-5">
        <Input
          type="email"
          label="Email"
          variant="bordered"
          {...formik.getFieldProps("email")}
          fullWidth={true}
          {...errorHelper(formik, "email")}
        />
      </div>
      <div className="mb-5">
        <Input
          type="password"
          label="Password"
          variant="bordered"
          fullWidth={true}
          {...formik.getFieldProps("password")}
          {...errorHelper(formik, "password")}
        />
      </div>
      <div className="mb-3">
        <Button color="secondary" type="submit">
          {formType ? "Register" : "Sign in"}
        </Button>
      </div>
      <div className="mb-3">
        <Button color="primary" variant="bordered" onClick={handleFormType}>
          {formType
            ? "Already registered ? Click here"
            : "Already signed in ? Click here"}
        </Button>
      </div>
    </form>
  );
}
