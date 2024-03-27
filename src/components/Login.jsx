import React from "react";
import { GoogleLogin } from "react-google-login";
import {
  RiFacebookBoxFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from "react-icons/ri";
import imageSrc from "../assets/svg.jpg";

const Login = ({ setIsLoggedIn, setUser, setUserImg }) => {
  const divStyle = {
    background: "rgb(255,255,255)",
    backgroundImage:
      "linear-gradient(250deg, rgba(255,255,255,1) 49%, rgba(153,27,27,1) 52%)",
  };
  const responseGoogle = (response) => {
    console.log(response);
    const userName = response.profileObj.name;
    const userImg = response.profileObj.imageUrl;
    setIsLoggedIn(true);
    setUser(userName);
    setUserImg(userImg);
  };

  const onFailure = (error) => {
    console.error("Google login failed:", error);
  };

  return (
    <>
      <div className="min-h-screen flex flex-col overflow-hidden">
        <nav className=" bg-transparent p-4 flex fixed top-0 items-center gap-8 ">
          <div className="text-white font-bold text-4xl tracking-widest">
            KJSIT
          </div>
          <ul className="flex text-white">
            <li className="mr-4">
              <a href="#" className="hover:text-gray-300">
                Event
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="hover:text-gray-300">
                Teacher Login
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300">
                About Us
              </a>
            </li>
          </ul>
        </nav>

        <div
          className="flex-grow flex justify-around items-center gap-20"
          style={divStyle}
        >
          <div className="bg-white pt-0 border-gray-200 rounded-lg border-2">
            <p className="bg-red-800 rounded-t-lg p-2 w-full text-white text-center">
              Student Login
            </p>
            <form className="w-96 m-10 mb-5">
              <input
                type="text"
                placeholder="Username"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <input
                type="password"
                placeholder="Password"
                className="block w-full border border-gray-300 rounded-md py-2 px-3 mb-3"
              />
              <button
                type="submit"
                className="block w-full bg-red-800 text-white rounded-md py-2 px-4 mb-3 hover:bg-red-600"
              >
                Login
              </button>
            </form>
            <div className="text-center">Or</div>
            <GoogleLogin
              clientId="152111620630-d01stikjdcthgcfrjhhmpuetctpnqs61.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={onFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
              className="w-96 m-10 mt-5"
            />
          </div>

          <div className="bg-white pt-0 flex flex-col border-gray-200 w-96 p-10 rounded-lg border-2">
            <p className="text-center text-lg font-bold mb-4">Demo Demo</p>
            <p className="text-center mb-4 text-wrap">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua."
            </p>

            <div className="flex justify-center mb-4">
              <RiInstagramFill />
              <RiTwitterFill />
              <RiFacebookBoxFill />
              <RiLinkedinBoxFill />
            </div>

            <div className="text-center">
              <p className="font-bold">Contact Us</p>
              <p>Email: info@example.com</p>
              <p>Phone: +1 123 456 7890</p>
              <p>Address: 123 Main Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-blue-900 text-white flex text-center justify-between">
        <div className="p-4">
          <div className="flex justify-center items-center mb-4">
            <p>Company Details</p>
          </div>
          <div>
            <ul className="flex justify-center">
              <li className="mr-4">
                <a href="#" className="hover:text-gray-300">
                  Facebook
                </a>
              </li>
              <li className="mr-4">
                <a href="#" className="hover:text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <img src={imageSrc} alt="SVG" className=" object-contain w-96 m-2" />
      </footer>
    </>
  );
};

export default Login;
