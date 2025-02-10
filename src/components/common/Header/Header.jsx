import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  return (
    <header className="header-home-page border-b border-gray-200">
      
    </header>
  );
}

export default Header;
