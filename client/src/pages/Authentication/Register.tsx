import { useRegisterMutation } from "../../app/apiSlice";
import BtnPrimary from "../../components/ui/BtnPrimary";
import React from "react";
import { RegisterRequest } from "./types";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
//@component
const Register = () => {
  const [form, setForm] = React.useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation();

  async function handleRegisterSubmit(e: React.FormEvent): Promise<any> {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmPassword)
      return toast.error("Enter all fields values");
    const toastId = toast.loading("processing"); //TODO:can be omitted and loading can be set to submit button

    await register(form);
    toast.dismiss(toastId);
  }

  if (isSuccess) {
    toast.success("Account created successfully");
    return <Navigate to={"login"} />;
  }

  return (
    <>
      <h1 className="text-2xl mb-4 text-center">Register</h1>
      <form onSubmit={handleRegisterSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-green text-sm font-bold mb-2">Name</label>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
          />
        </div>
        <div className="mb-4">
          <label className="block text-green text-sm font-bold mb-2">Email</label>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
          />
        </div>

        <div className="flex gap-2">
          <div className="mb-6">
            <label className="block text-green text-sm font-bold mb-2">Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
            />
          </div>
          <div className="mb-6">
            <label className="block text-green text-sm font-bold mb-2">Confirm Password</label>
            <input
              name="confirmPassword"
              onChange={handleChange}
              type="password"
              className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            Have an account ?&nbsp;
            <Link className="underline text-blue-600" to="/login">
              Login
            </Link>
          </div>
          {/* Submit Button */}
          <BtnPrimary disabled={isLoading} className="py-3">
            Register
          </BtnPrimary>
        </div>
      </form>
      {isError && (
        <div className="">
          {/* Your error message content goes here */}
          <p>Oops! Something went wrong.</p>
        </div>
      )}
    </>
  );
};

export default Register;
