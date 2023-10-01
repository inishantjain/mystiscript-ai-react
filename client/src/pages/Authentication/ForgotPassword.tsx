import { useState } from "react";
import { useForgotPasswordMutation } from "../../app/apiSlice";
import { Link } from "react-router-dom";
import BtnPrimary from "../../components/ui/BtnPrimary";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [forgotPassword, { isLoading, isSuccess }] = useForgotPasswordMutation();

  const [email, setEmail] = useState<string>("");

  async function forgotPasswordHandler() {
    if (!email) return toast.error("Please enter your email address");
    const toastId = toast.loading("Processing...");
    try {
      await forgotPassword(email).unwrap();
      toast.success("Password Set Link sent to your email");
    } catch (error: any) {
      if (error?.data?.message) return toast.error(error.data.message);
      toast.error("Something went wrong");
      console.error("Error forgot password ", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <>
      <h1 className="text-2xl mb-4 text-center">Enter your email to reset the password</h1>
      <div className="mb-4">
        <label className="block text-green text-sm font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-3 py-2 border rounded-lg w-full focus:outline-none  focus:ring-2 focus:ring-conGreen"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <BtnPrimary type="submit" disabled={isLoading} onClick={forgotPasswordHandler} className="py-2">
          Submit
        </BtnPrimary>
      </div>

      <div className="mt-5">
        {isSuccess && <p className="text-textBlack600">A password reset link has been sent to your email address!</p>}
        <div className="flex justify-center">
          <Link className="text-blue-600 underline" to="/login">
            Back to Login
          </Link>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
