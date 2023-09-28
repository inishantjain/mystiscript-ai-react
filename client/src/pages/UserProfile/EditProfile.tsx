import { useAppSelector } from "../../app/store";
import { useState, FormEvent } from "react";
import BtnPrimary from "../../components/ui/BtnPrimary";
import { useEditUserMutation } from "../../app/apiSlice";

function EditProfile() {
  const { user } = useAppSelector((state) => state.userState);
  const [editUserApi, { isError, isLoading, isSuccess }] = useEditUserMutation();
  const [formData, setFormData] = useState({ name: user?.name, about: user?.about });
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value,
    });
  };

  function formHandler(e: FormEvent) {
    e.preventDefault();
    editUserApi(formData);
  }

  if (isError) return <div className="text-2xl text-center">Oops some Error Occurred!</div>;

  return (
    <div className="min-h-screen mx-auto w-11/12 max-w-lg ">
      <h1 className="text-center font-semibold text-xl my-5">Edit Your Profile</h1>
      {isSuccess && (
        <h3 className="opacity-80 p-2 my-4 rounded outline-red-500 outline outline-1 bg-red-200 bg-opacity-50">
          Profile Edited Successfully 🐰.
        </h3>
      )}
      <div>
        <form onSubmit={formHandler} className="">
          {" "}
          <div className="mb-6">
            <label className="block text-green text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
            />
          </div>
          <div className="mb-6">
            <label className="block text-green text-sm font-bold mb-2">About</label>
            <textarea
              name="about"
              rows={2}
              value={formData.about}
              onChange={handleChange}
              className="px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-conGreen"
            />
          </div>
          <BtnPrimary disabled={isLoading}>{isLoading ? "Loading" : "Submit"}</BtnPrimary>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
