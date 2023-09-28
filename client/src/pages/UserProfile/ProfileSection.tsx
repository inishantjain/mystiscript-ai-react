import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import PencilIcon from "../../assets/images/editPencil";

function ProfileSection() {
  const { user } = useAppSelector((state) => state.userState)!;

  if (user == null)
    return (
      <div>
        Go to <Link to="/login">login</Link>
      </div>
    );

  const navigate = useNavigate();

  return (
    <>
      <section className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
        <div className="w-11/12 flex flex-col gap-10 items-center max-w-screen-lg mx-auto py-10">
          <div className="flex gap-5 items-center">
            <div className="rounded-full overflow-clip ring ring-fuchsia-500 ">
              <img width="96" src={`https://api.dicebear.com/7.x/pixel-art/svg?seed${user?.name}`} alt="" />
            </div>
            <div>
              <h1 className="font-semibold text-3xl">{user?.name}</h1>
              <h2 className="text-xl text-offWhite">@{user?.username}</h2>
              <button onClick={() => navigate("edit")} className="float-right">
                <PencilIcon width={28} height={28} />
              </button>
            </div>
          </div>
          <p className="text-center text-xl">This is where you write about yourself.</p>
        </div>
      </section>
    </>
  );
}

export default ProfileSection;
