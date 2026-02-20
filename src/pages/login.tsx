import WeddingRingIcon from "../assets/wedding-ring.png";
import Button from "../components/Elements/Button";

export default function LoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-20 aspect-square rounded-b-full bg-[#d9d9d9] flex justify-center items-center absolute left-1/2 -translate-1/2 top-0 transition-all duration-300">
          <img
            src={WeddingRingIcon}
            alt=""
            className="opacity-40 w-10 transition-all duration-300 scale-x-[-1]"
          />
        </div>
        <div className="flex flex-col items-center justify-center bg-white shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] rounded-lg p-10 font-google-sans w-100">
          <div className="flex flex-col justify-center items-center p-5">
            <p className="font-italiana text-4xl">Nico & Devi</p>
            <p className="font-italiana text-4xl">Wedding</p>
          </div>
          <h1 className="text-xl mb-2">Admin Login</h1>
          <div className="w-full">
            <form action="" className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label htmlFor="username" className="text-lg">
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border-black/30 border-2 p-2 "
                  placeholder="type your username"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-lg">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border-black/30 border-2 p-2"
                  placeholder="type your password"
                />
              </div>
              <Button className="w-full bg-black text-white rounded-none">
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
