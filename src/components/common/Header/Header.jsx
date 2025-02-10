import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { userSelector } from "../../../redux/selectors/selector";
import { ROLE_ADMIN, ROLE_CUSTOMER } from "../../../utils/constants";
import { getCurrentUserThunk } from "../../../redux/actions/userThunk";
import { logoutUser } from "../../../redux/reducers/userReducer";
import { Avatar } from "antd";
import { generateFallbackAvatar } from "../../../utils/helpers";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleRelogin = async () => {
      const token = await localStorage.getItem("accesstoken");
      if (token !== "undefined") {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());
        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          console.log(
            getCurrentUserAction.payload || getCurrentUserAction.error.message
          );
        } else {
          const userRole = getCurrentUserAction?.payload?.role;

          switch (userRole) {
            case ROLE_ADMIN:
              navigate("/dashboard");
              break;
            case ROLE_CUSTOMER:
              navigate("/");
              break;
            default:
              navigate("/");
          }
        }
      }
    };
    handleRelogin();
  }, []);

  const showModal = (isLogin) => {
    setIsLoginModal(isLogin);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  return (
    <header className="light-yellow-background border-b border-gray-200">
      <nav className="container max-w-7xl mx-auto flex justify-between items-center py-6 px-6">
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              ABOUT US
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/our-works"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR WORKS
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR SERVICES
            </NavLink>
          </li>
        </ul>
        <div
          className="text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <h1 className="playfair-display-font text-2xl font-medium">
            WEDDING DREAM
          </h1>
          <p className="text-sm text-red-800 font-semibold italic">
            Since 2024
          </p>
        </div>
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink
              to="/feedback"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              OUR FEEDBACK
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              BLOG
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "underline inria-serif-font"
                  : "hover:underline inria-serif-font"
              }
            >
              CONTACT
            </NavLink>
          </li>
        </ul>
        <div
          className="flex space-x-4 relative"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {user?.user ? (
            <>
              <Avatar
                src={
                  user?.user?.avatar_url ??
                  generateFallbackAvatar(user?.user?.fullname)
                }
                alt={"avatar"}
                style={{
                  marginRight: "8px",
                  border: "1px solid #d9d9d9",
                }}
                size={25}
              />

              <span className="auth-link hover:underline cursor-pointer truncate">
                {user?.user?.fullname}
              </span>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-red-900 text-white px-4 py-1 rounded-lg shadow-md hover:bg-white hover:text-red-800 border border-red-800 transition duration-300 inria-serif-font"
            >
              Login
            </NavLink>
          )}

          {user?.user && isDropdownOpen && (
            <div className="absolute right-0 top-5 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="py-3">
                <li
                  className="px-8 py-2 flex flex-row gap-2 items-center hover:bg-gray-100 text-red-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  <RiLogoutBoxRLine className="text-sm" />
                  Đăng xuất
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
