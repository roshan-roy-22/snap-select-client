import React from "react";
import logo from "../assets/images/logo-icon.png";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate=useNavigate();
  return (
    <>
      <div className="flex justify-between items-center py-4 px-10 border-b-2 bg-white">
        <div className="flex items-center">
          <img width={"45px"} src={logo} alt="" />
          <span className="font-bold text-xl">SNAP SELECT</span>
        </div>
        <div>
          <button onClick={()=>navigate('/login')} className="bg-blue-500 px-3 py-2 rounded-lg text-white">
            Get Started
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 px-10 bg-[#F8F9FA]">
        <div className=" p-10">
          <h1 className="text-3xl font-bold my-5">
            Unleash the magic of your moments through our extensive network of
            skilled photographers.{" "}
          </h1>
          <p className="text-xl">
            {" "}
            Discover skilled photographers specializing in weddings, portraits,
            events, landscapes, and commercial projects. With portfolios ensure
            you find the perfect photographer for your needs. Start capturing
            memories today!
          </p>
        </div>
        <div className="p-8">
          <img
            className="rounded-full"
            src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
        </div>
      </div>
      <div className=" mx-auto bg-[#F8F9FA]">
        <div className="text-center mb-4 px-24 ">
          <h1 className="text-5xl font-medium">
            Capture all of life's milestones – and everything in between.
          </h1>
          <p className="text-2xl mb-5 font-thin">
            We specialize in portrait photography, weddings, and more. Take a
            look at our work and let us know how we can help you plan your
            session.
          </p>
        </div>
        {/* Types of Photograpghy */}
        <section className="flex gap-2  flex-wrap">
          <div class="mx-auto relative group cursor-pointer overflow-hidden duration-500 w-80  bg-zinc-800 text-gray-50 p-15">
            <div class="">
              <div class="group-hover:scale-110 w-full  bg-blue-400 duration-500 ">
                <img src="https://images.pexels.com/photos/9299942/pexels-photo-9299942.jpeg?auto=compress&cs=tinysrgb&w=600" />
              </div>
              <div class="absolute w-80 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                <div class="absolute -z-10 left-0 w-80 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                <span class="text-xl font-bold">Kids</span>
                <p class="group-hover:opacity-100 w-56 duration-500 opacity-0">
                  Playful portraits, capturing childhood joy.
                </p>
              </div>
            </div>
          </div>
          <div class="mx-auto relative group cursor-pointer overflow-hidden duration-500 w-80  bg-zinc-800 text-gray-50 p-15">
            <div class="">
              <div class="group-hover:scale-110 w-full  bg-blue-400 duration-500 ">
                <img src="https://images.pexels.com/photos/2041101/pexels-photo-2041101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <div class="absolute w-80 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                <div class="absolute -z-10 left-0 w-80 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                <span class="text-xl font-bold">Weddings</span>
                <p class="group-hover:opacity-100 w-56 duration-500 opacity-0">
                  Capture timeless love stories with cherished moment.
                </p>
              </div>
            </div>
          </div>
          <div class="mx-auto relative group cursor-pointer overflow-hidden duration-500 w-80  bg-zinc-800 text-gray-50 p-15">
            <div class="">
              <div class="group-hover:scale-110 w-full  bg-blue-400 duration-500 ">
                <img src="https://images.pexels.com/photos/3875083/pexels-photo-3875083.jpeg?auto=compress&cs=tinysrgb&w=600" />
              </div>
              <div class="absolute w-80 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                <div class="absolute -z-10 left-0 w-80 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                <span class="text-xl font-bold">Maternity & Newborn</span>
                <p class="group-hover:opacity-100 w-56 duration-500 opacity-0">
                  Celebrate new beginnings newborn photography.
                </p>
              </div>
            </div>
          </div>
          <div class="mx-auto relative group cursor-pointer overflow-hidden duration-500 w-80  bg-zinc-800 text-gray-50 p-15">
            <div class="">
              <div class="group-hover:scale-110 w-full  bg-blue-400 duration-500 ">
                <img src="https://images.pexels.com/photos/3115640/pexels-photo-3115640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
              <div class="absolute w-80 left-0 p-5 -bottom-16 duration-500 group-hover:-translate-y-12">
                <div class="absolute -z-10 left-0 w-80 h-28 opacity-0 duration-500 group-hover:opacity-50 group-hover:bg-blue-900"></div>
                <span class="text-xl font-bold">Candid</span>
                <p class="group-hover:opacity-100 w-56 duration-500 opacity-0">
                  Authentic moments, candidly captured forever..
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="grid place-items-center text-center ">
        <div className="w-[65%] bg-blue-50 py-28 px-14 my-9 rounded-3xl">
          <h1 className="text-4xl my-4 font-semibold">
            Experience a seamless and enjoyable journey with us
          </h1>
          <p className="text-2xl mb-4">
            Our amiable team at IN-FOCUS Photography ensures a stress-free and
            enjoyable process from beginning to end.
          </p>
          <button
            class="cursor-pointer transition-all bg-blue-400 text-white px-6 
          py-2 rounded-lg border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px]
           hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
          >
            Book Appointement
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Landing;
