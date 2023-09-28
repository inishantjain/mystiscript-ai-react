import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BtnPrimary from "../ui/BtnPrimary";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { logout } from "../../pages/UserProfile/userSlice";
import Hamburger from "../../assets/images/hamburger";
const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();

  const [mobileVisible, setMobileVisible] = React.useState(false);

  React.useEffect(() => {
    function mobileNavbarCloser(e: MouseEvent) {
      const navbar = document.querySelector(".navbar");

      // Check if the clicked element is not the navbar or a child of the navbar
      if (navbar && !navbar.contains(e.target as HTMLElement)) {
        setMobileVisible(false);
      }
    }
    document.addEventListener("click", mobileNavbarCloser);

    return () => {
      document.removeEventListener("click", mobileNavbarCloser);
    };
  }, []);

  // const navbarStyles
  return (
    <nav className="navbar">
      <div className="items-center w-11/12 py-4 mx-auto max-w-screen-lg sm:flex justify-between">
        <Link className="font-rancho text-3xl font-semibold" to="/">
          MystiScript
        </Link>

        {/* navlinks */}
        <ul
          id="navLinks"
          className={`${
            !mobileVisible && `translate-x-40 scale-y-0 right-5 sm:translate-x-0 sm:scale-y-100`
          } rounded-md outline outline-1 outline-red-200 p-3 fixed right-5 sm:static bg-offWhite flex flex-col sm:flex-row items-center gap-8 transition-all ease-out`}
        >
          {user ? (
            <>
              <li>
                <Link key={1} to={"/post/exploreStories"}>
                  Stories
                </Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link key={1} to={"/post/exploreStories"}>
                  Stories
                </Link>
              </li>
              <li>
                <BtnPrimary onClick={() => navigate("/register")}>Get Started</BtnPrimary>
              </li>
            </>
          )}
        </ul>

        {/* mobile hamburger */}
        <button
          onClick={() => setMobileVisible((t) => !t)}
          className="block sm:hidden fixed right-4 top-4"
          type="button"
        >
          <Hamburger width={28} height={28} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
