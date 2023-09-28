import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../../app/apiSlice";
import BtnPrimary from "../../components/ui/BtnPrimary";
import { LoginRequest } from "./types";
import React from "react";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = React.useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  async function handleLoginSubmit(e: React.FormEvent): Promise<any> {
    e.preventDefault();
    if (!form.email || !form.password) return toast.error("Enter all fields values");
    const toastId = toast.loading("logging you in...");
    await login(form);
    toast.dismiss(toastId);
  }
  if (isSuccess) return <Navigate to="/profile" />;

  return (
    <>
      <h1 className="text-2xl mb-4 text-center">Login</h1>
      <form onSubmit={handleLoginSubmit}>
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-green text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full focus:outline-none  focus:ring-2 focus:ring-conGreen"
          />
        </div>
        <div className="mb-6">
          <label className="block text-green text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
          />
        </div>

        {/* Submit Button */}
        <div className="md:flex-row flex flex-col gap-5 justify-between">
          <div>
            Don't have an Account?&nbsp;
            <Link className="text-blue-600 underline" to="/register">
              Register
            </Link>
          </div>
          <div className="flex justify-end">
            <BtnPrimary disabled={isLoading} className="py-3">
              Login
            </BtnPrimary>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
