import { toast } from "react-toastify";
import { ROLE_ADMIN } from "./constants";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaHotel } from "react-icons/fa";
import { MdOutlineRequestPage, MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { AiOutlineDashboard, AiOutlineTransaction } from "react-icons/ai";
import { UserAddOutlined } from "@ant-design/icons";
import { FaPersonDotsFromLine } from "react-icons/fa6";

export const handleActionNotSupport = () => {
  toast.warning("Feature not yet supported");
};

export const handleLowerCaseNonAccentVietnamese = (str) => {
  str = str.toLowerCase();

  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const generateFallbackAvatar = (fullname) => {
  const fallbackColor = "#FF9966";

  const initials = handleLowerCaseNonAccentVietnamese(
    fullname?.charAt(0).toUpperCase() || ""
  );

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100">
      <rect width="100%" height="100%" fill="${fallbackColor}" />
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-size="50">
        ${initials}
      </text>
    </svg>
  `;
  const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
  return dataUrl;
};

export const sliderMenu = [
  {
    key: "dashboard",
    icon: <MdOutlineSpaceDashboard />,
    label: "Dashboard",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-user",
    icon: <UserAddOutlined />,
    label: "Customer",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-artist",
    icon: <FaPersonDotsFromLine />,
    label: "Artist",
    roles: [ROLE_ADMIN],
  },
  {
    key: "manage-transaction",
    icon: <AiOutlineTransaction />,
    label: "Transaction",
    roles: [ROLE_ADMIN],
  },

];
