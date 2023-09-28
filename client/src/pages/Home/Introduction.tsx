import { useNavigate } from "react-router-dom";
import BtnPrimary from "../../components/ui/BtnPrimary";
import { useAppSelector } from "../../app/store";
import Typewriter from "typewriter-effect";

function Introduction() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userState);
  return (
    <section className="bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <div className="mx-auto w-11/12 max-w-screen-lg space-y-6 text-textBlack800 font-semibold tracking-wide py-20">
        <h1 className="text-3xl md:text-5xl">AI Woven Tales</h1>
        <p className="text-lg md:text-2xl">
          Read stories from others or create your own with a single AI prompt.
          <br /> Its easier than a cup of tea.
        </p>
        <Typewriter
          options={{
            strings: [
              "Ganesha's Sweet tooth",
              "Write short Gulliver travels ",
              "Akbar Birbal Story",
              "One upon a time three friends was...",
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 25,
          }}
        />
        <BtnPrimary
          className="text-xl md:text-2xl py-2 hover:-translate-y-2 hover:scale-105 transition-transform shadow-xl "
          onClick={() => navigate(user ? "post/exploreStories" : "/register")}
        >
          {user ? "Explore" : "Get Started"}
        </BtnPrimary>
      </div>
    </section>
  );
}

export default Introduction;
