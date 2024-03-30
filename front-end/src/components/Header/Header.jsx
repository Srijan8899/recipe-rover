import React from "react";
import { useState, useEffect } from 'react';
import {Link, NavLink} from "react-router-dom";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setIsHidden(prevScrollPos <  currentScrollPos && currentScrollPos > 100);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);


  return (
    <nav style={{ display: isHidden ? 'none' : 'block'  }}>
    <div  className="fixed z-[5] w-full px-12 flex justify-between items-center backdrop-blur-[3px]">
      <div className="logo flex gap-5">
       <img src="./src/assets/logo.png" alt="logo"  className="bg-transparent object-scale-down w-20 py-3"/>
       {/* <img src="./src/assets/recipe-rover.png" alt="logo" className="bg-transparent object-scale-down w-48" /> */}
      </div>
      <div className="links flex gap-5 py-10 ml-56">
        {["Home", "Search recipes", "Personalized Recipes", "Recipe books"].map((item,index) => (
          <NavLink to='/' key={index} className={({isActive}) => `text-lg font-light ${isActive? "underline" : ""} text-[#000000] font-['Neue_Montreal']`}>{item}</NavLink>
        ))}
      </div>
      <Link to="/login">
      <div className="button -mt-2 border rounded-xl p-4 uppercase text-sm leading-[.6] bg-[#43766C]"> Login/ Signup</div></Link>
    </div>
    </nav>
  );
}


export default Header;
