import { useRegisterMutation } from "../../app/apiSlice";
import BtnPrimary from "../../components/ui/BtnPrimary";
import React from "react";
import { RegisterRequest } from "./types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
//@component
const Register: React.FC = () => {
  const [register, { isLoading, isSuccess /* isError */ }] = useRegisterMutation();
  const [form, setForm] = React.useState<RegisterRequest>({
    name: "",
    email: "",
  });
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setForm({
      ...form,
      [evt.target.name]: value,
    });
  };

  async function handleRegisterSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    const { name, email } = form;
    // Validation function
    const isValid = validateForm(name, email);
    if (!isValid) return;

    const toastId = toast.loading("Processing");
    try {
      await register(form).unwrap();
      // Handle successful registration, e.g., redirect or show success message
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error.data.message);
      } else {
        toast.error("Something went wrong");
        console.error("error", error);
      }
    } finally {
      // Clear loading state, e.g., setLoading(false);
      toast.dismiss(toastId);
    }
  }

  function validateForm(name: string, email: string): boolean {
    if (!name || !email) {
      toast.error("Enter all fields values");
      return false;
    }
    return true;
  }

  if (isSuccess) {
    // toast.success("Account created successfully");
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="text-textBlack600">Check Your email (inbox or spam) to set the password.</div>
        <Link className="text-blue-400 underline" to={"/login"}>
          Go to Login
        </Link>
      </div>
    );
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

        <div className="flex justify-between items-center">
          <div>
            Have an account ?&nbsp;
            <Link className="underline text-blue-600" to="/login">
              Login
            </Link>
          </div>
          {/* Submit Button */}
          <BtnPrimary disabled={isLoading} className="py-2 outline-2 shadow-md hover:bg-">
            Register
          </BtnPrimary>
        </div>
      </form>
    </>
  );
};

export default Register;
