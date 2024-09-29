import React from "react";
import logo from '../../assets/svg.jpg'
import { RiFacebookBoxLine, RiInstagramLine, RiTwitterLine } from "react-icons/ri";
export function Footer() {
  return (
    <section className="sticky bottom-0 w-full overflow-hidden bg-white  py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-2">
            <a href="#">
              <div className="inline-flex items-center">
                <img width="100%" height="100%" viewBox="0 0 50 56" fill="none" src={logo} alt="" />
              </div>
            </a>
          </div>
          <div className="w-auto p-8">
            <ul className="-m-5 flex flex-wrap items-center">
              <li className="p-5"><a className="font-medium text-gray-600 hover:text-gray-700" href="#">Privacy Policy</a></li>
              <li className="p-5"><a className="font-medium text-gray-600 hover:text-gray-700" href="#">Terms of Service</a></li>
              <li className="p-5"><a className="font-medium text-gray-600 hover:text-gray-700" href="#">Return Policy</a></li>
              <li className="p-5"><a className="font-medium text-gray-600 hover:text-gray-700" href="#">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <RiFacebookBoxLine/>
                  </div>
                </a>
              </div>
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <RiTwitterLine/>
                  </div>
                </a>
              </div>
              <div className="w-auto p-1.5">
                <a href="#">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <RiInstagramLine/>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
