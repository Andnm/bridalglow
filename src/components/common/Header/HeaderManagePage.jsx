import { Avatar, Badge, Dropdown, Menu, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaDotCircle } from "react-icons/fa";
import {
  IoIosLogOut,
  IoIosNotificationsOutline,
  IoMdNotifications,
} from "react-icons/io";
import { IoCheckmarkDone, IoPersonCircleOutline } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors/selector";
import { setSliderMenuItemSelectedKey } from "../../../redux/reducers/globalReducer";
import logo from "../../../assets/images/logo-remove-bg.png";
import { logoutUser } from "../../../redux/reducers/userReducer";
import { getCurrentUserThunk } from "../../../redux/actions/userThunk";
import { ROLE_CUSTOMER } from "../../../utils/constants";

const HeaderManagePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);
  const notificationRef = useRef(null);

  const [showNotification, setShowNotification] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotifyCount, setNewNotifyCount] = useState(0);

  useEffect(() => {
    const handleRelogin = async () => {
      const token = await localStorage.getItem("accesstoken");
      if (token !== "undefined") {
        const getCurrentUserAction = await dispatch(getCurrentUserThunk());
        if (getCurrentUserThunk.rejected.match(getCurrentUserAction)) {
          console.log(
            getCurrentUserAction.payload || getCurrentUserAction.error.message
          );
        }
      }
    };
    handleRelogin();
  }, []);

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUser());
  };

  const seenAllNotifications = async () => {
    // if (userData) {
    //   try {
    //     await notification.markAllAsSeen(userData?.user?.token);
    //     setNotifications((prevNotifications) =>
    //       prevNotifications.map((noti) => ({
    //         ...noti,
    //         is_new: false,
    //       }))
    //     );
    //     setNewNotifyCount(0);
    //   } catch (error) {
    //     console.error("Error marking all notifications as read:", error);
    //     toastError("Failed to mark all as read");
    //   }
    // }
  };

  const seenNotification = async (noti) => {
    // if (userData?.user.token) {
    //   try {
    //     const updatedData = {
    //       is_new: false,
    //       noti_title: noti.noti_title,
    //       noti_type: noti.noti_type,
    //       noti_describe: noti.noti_describe,
    //     };
    //     const responseGetNotifications = await notification.markSeenOne(
    //       noti.noti_id,
    //       updatedData
    //     );
    //     setNotifications((prevNotifications) =>
    //       prevNotifications.map((notification) => {
    //         if (notification.noti_id === noti.noti_id) {
    //           return {
    //             ...notification,
    //             is_new: false,
    //           };
    //         }
    //         return notification;
    //       })
    //     );
    //     setNewNotifyCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    //   } catch (error) {
    //     toastError(error);
    //     console.error("Có lỗi:", error);
    //   } finally {
    //   }
    // }
  };

  useEffect(() => {
    // const fetchNotifications = async () => {
    //   if (userData?.user?.token) {
    //     try {
    //       const responseGetNotifications =
    //         await notification.getAllNotifications(userData?.user.token);
    //       const adminNotifications = responseGetNotifications
    //         .filter((noti) => noti.noti_type === NotificationEnum.TO_ADMIN)
    //         .reverse();
    //       setNotifications(adminNotifications);
    //       setNewNotifyCount(
    //         adminNotifications.filter((noti) => noti.is_new).length
    //       );
    //     } catch (error) {
    //       toastError(error);
    //       console.error("Có lỗi khi tải dữ liệu noti:", error);
    //     } finally {
    //     }
    //   }
    // };
    // fetchNotifications();
  }, []);

  useEffect(() => {
    if (pathname) {
      const cleanPath = pathname.replace(/^\//, "");

      dispatch(setSliderMenuItemSelectedKey(cleanPath));
    }
  }, [pathname, dispatch]);

  const handleNotificationClick = async (noti) => {
    // await seenNotification(noti);
    // switch (noti.noti_type) {
    //   case NotificationEnum.TO_ADMIN:
    //     navigate("/manage-order");
    //     break;
    //   default:
    //     break;
    // }
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<IoIosLogOut />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className=" bg-white">
      <div className="flex justify-between flex-row mx-5">
        <div className="left flex justify-between flex-row items-center gap-4">
          <img
            src={logo}
            width={130}
            height={50}
            alt="logo"
            loading="lazy"
            onClick={() => {
              navigate("/dashboard");
            }}
            className="cursor-pointer"
          />
        </div>

        <div className="right flex justify-between flex-row items-center gap-2">
          {/* <Space
            className="m-2 hover:cursor-pointer relative"
            onClick={() => {
              setShowNotification(!showNotification);
            }}
          >
            <Badge count={newNotifyCount}>
              <Avatar
                className="bg-white hover:bg-[#e3eced]/50 flex justify-center items-center"
                style={{ borderColor: "#ffa412", backgroundColor: "white" }}
                shape="circle"
                icon={
                  <IoIosNotificationsOutline
                    style={{ color: "#ffa412" }}
                    className="w-6 h-6"
                  />
                }
              />
            </Badge>
          </Space> */}

          {/* <>
            {showNotification && (
              <div
                ref={notificationRef}
                className=" top-[80px] right-28 z-20 absolute w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow"
                aria-labelledby="dropdownNotificationButton"
              >
                <div className="block px-4 py-2 relative font-medium text-center text-[#01a0e9] rounded-t-lg bg-gray-50">
                  Notifications
                  <div
                    className="absolute top-2 right-3"
                    onClick={seenAllNotifications}
                  >
                    <IoCheckmarkDone className="w-5 h-5 cursor-pointer" />
                  </div>
                </div>
                <InfiniteScroll
                  dataLength={notifications?.length}
                  next={() => {}}
                  height={"36rem"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                  // hasMore={Boolean(pageIndexNoti < totalPageNoti)}
                  hasMore={false}
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="scrollableDiv"
                >
                  <div className="divide-y divide-gray-100">
                    {notifications?.map((noti, index) => (
                      <div
                        key={index}
                        className={`h-fit flex px-4 py-3 hover:bg-gray-100 hover:cursor-pointer
                  ${noti.is_new && "bg-blue-100"} `}
                        onClick={() => {
                          handleNotificationClick(noti);
                        }}
                      >
                        <div className="w-full pl-2">
                          <div className="text-gray-500 text-sm mb-1.5">
                            <span className="font-semibold text-gray-900">
                              {`${noti?.noti_title?.replace(/_/g, " ")} `}
                            </span>
                          </div>
                          <div className="text-gray-500 text-sm mb-1.5">
                            <span className="text-gray-900">{`${noti.noti_describe} `}</span>
                          </div>
                          <div
                            className={`text-xs ${
                              !noti.is_new ? "text-gray-600" : "text-blue-600"
                            } `}
                          >
                            {noti.created_at}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-5 h-5 bg-white-600 border border-white rounded-full">
                            <FaDotCircle
                              onClick={() => {
                                noti.is_new && seenNotification(noti);
                              }}
                              color={` ${!noti.is_new ? "gray" : "#01a0e9"}`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </> */}

          <div className="flex flex-col items-center gap-6 p-4">
            <Dropdown overlay={menu} trigger={["click"]}>
              <div className="cursor-pointer flex items-center gap-2 text-gray-600 border border-transparent hover:border-gray-600 hover:bg-white p-2 rounded-md transition-all duration-200">
                <Avatar icon={<IoPersonCircleOutline />} size="large" />
                <span className="font-medium">
                  {userData?.user?.fullname || "Admin"}
                </span>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderManagePage;
