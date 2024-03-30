import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const Navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    Navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setNavbarVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  const handleClicks = () => {
    setToggle(false);
  };

  return (
    <>
      <header className={`flex bg-slate-200 h-20 fixed top-0 left-0 z-50 w-full transition-all ${navbarVisible ? "" : "transform -translate-y-full"}`}>
        <nav className="container flex justify-between items-center mx-auto">
          <div className="ps-5">
            <div className="text-2xl font-bold hidden lg:block">
              Real <span className="text-sky-400">Estate</span>
            </div>
            <div className="lg:hidden">
               <span className="text-2xl font-extrabold">R</span>
               <span className="text-2xl font-extrabold text-sky-400">E</span>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="lg:w-2/6">
            <div className="flex px-4 flex-row grow w-full">
              <input
                className="flex-1 h-9 w-full rounded-l-lg ps-3 border-0"
                type="text"
                name="searchTerm"
                id="search"
                value={searchTerm}
                placeholder="What are you looking for?"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button>
                <FaSearch className="w-full h-full px-3 border-2 border-solid border-sky-300 text-white rounded-r-lg bg-sky-300" />
              </button>
            </div>
          </form>
          <div className="w-2/6 hidden lg:block">
            <div className="flex justify-between items-center w-full">
              <Link
                to="/"
                className="text-lg font-semibold font-sans link-elements"
              >
                Home
              </Link>
              <Link
                to="/service"
                className="text-lg font-semibold font-sans link-elements"
              >
                Services
              </Link>
              <Link
                to="/about"
                className="text-lg font-semibold font-sans link-elements"
              >
                About
              </Link>
             
              <Link to="/profile" className="w-12 rounded-full overflow-hidden">
                {currentUser ? (
                  <img
                    className="object-cover w-full aspect-square"
                    src={currentUser.avatar}
                    alt="profile picture"
                  />
                ) : (
                  <div className="text-lg font-semibold font-sans border-2 px-2 rounded-2xl border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white">
                    SignIn
                  </div>
                )}
              </Link>
            </div>
          </div>
          <div className="lg:hidden pe-4" onClick={handleToggle}>
            <IoMenu className="w-9 h-9" />
          </div>
        </nav>
      </header>

      
      <div onClick={handleClicks} className={`${toggle ? "block" : "hidden"} fixed top-20 left-0 w-full h-full lg:hidden bg-white z-50`}>
        <div className="flex flex-col justify-center items-center w-full h-3/6 bg-slate-100">
          <Link
            to="/"
            className="text-lg w-full text-center py-4 font-semibold font-sans hover:bg-sky-100"
          >
            Home
          </Link>
          <Link
            to="/service"
            className="text-lg w-full text-center py-4 font-semibold font-sans hover:bg-sky-100"
          >
            Services
          </Link>
          <Link
            to="/about"
            className="text-lg w-full text-center py-4 font-semibold font-sans hover:bg-sky-100"
          >
            About
          </Link>
          
          <Link to="/profile" className="w-16 h-16 rounded-full overflow-hidden">
            {currentUser ? (
              <img
                className="object-cover w-full aspect-square"
                src={currentUser.avatar}
                alt="profile picture"
              />
              
            ) : (
              <div className="text-lg text-center font-semibold font-sans w-24 border-2 px-2 rounded-2xl border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-white">
                Login
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}
