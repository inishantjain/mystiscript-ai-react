import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import BtnPrimary from "../../components/ui/BtnPrimary";
import { useUpdatePasswordMutation } from "../../app/apiSlice";
import toast from "react-hot-toast";

function PasswordUpdate() {
  const [updatePasswordApi, { isLoading, isSuccess }] = useUpdatePasswordMutation();
  const { token } = useParams();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });

  async function setPasswordFormHandler(e: React.FormEvent) {
    e.preventDefault();
    const { password, confirmPassword } = form;

    if (validateForm(password, confirmPassword) === false) return;
    if (!token || token.length < 10) return toast.error("token is invalid");
    const toastId = toast.loading("Processing...");
    try {
      await updatePasswordApi({ password, token }).unwrap();
      toast.success("Password updated successfully");
    } catch (error: any) {
      if (error?.data?.message) return toast.error(error.data.message);
      toast.error("Something went wrong");
      console.error("Password update error", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  function validateForm(password: string, confirmPassword: string): boolean {
    if (password.length < 6) {
      toast.error("Passwords should be at least 6 characters");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  if (isSuccess)
    return (
      <div>
        <span>Password has been reset successfully</span>&nbsp;
        <Link to="/login" className="text-blue-400 underline">
          Go to Login ➡️
        </Link>
      </div>
    );

  return (
    <>
      <h1 className="text-2xl mb-4 text-center">Update Your Password</h1>
      <form onSubmit={setPasswordFormHandler}>
        <div className="mb-4">
          <label className="block text-green text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full focus:outline-none  focus:ring-2 focus:ring-conGreen"
          />
        </div>
        <div className="mb-4">
          <label className="block text-green text-sm font-bold mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="px-3 py-2 border rounded-lg w-full focus:outline-none  focus:ring-2 focus:ring-conGreen"
          />
        </div>
        <div className="flex justify-end">
          <BtnPrimary disabled={isLoading} className="py-2">
            Update My Password
          </BtnPrimary>
        </div>
      </form>
    </>
  );
}

export default PasswordUpdate;
