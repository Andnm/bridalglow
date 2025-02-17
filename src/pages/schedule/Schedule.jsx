import {
  Spin,
  Table,
  Button,
  Avatar,
  Menu,
  Dropdown,
  TableProps,
  Modal,
  Form,
  Upload,
  Input,
  Switch,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import React, { useEffect, useState } from "react";
import { BiDetail, BiUpload } from "react-icons/bi";
import { VscFolderActive } from "react-icons/vsc";
import { IoIosMore } from "react-icons/io";
import { toast } from "react-toastify";
import { MdBlock } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { PiPlus } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors/selector";
import {
  generateFallbackAvatar,
  handleActionNotSupport,
} from "../../utils/helpers";
import { getAllSchedules } from "../../services/schedule.services";
import SearchFilterHeader from "../../components/manage/SearchFilterHeader";
import { list_services_wedding, ROLE_CUSTOMER } from "../../utils/constants";
import moment from "moment";

const Schedule = () => {
  const userData = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [processingData, setProcessingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      if (userData) {
        setIsLoading(true);
        try {
          const responseGetAllItem = await getAllSchedules();
          setOriginalData([...responseGetAllItem].reverse());
          setProcessingData([...responseGetAllItem].reverse());
        } catch (error) {
          toast.error("There was an error loading data!");
          toast.error(error.response?.data?.message);
          console.error("There was an error loading data!:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    let updatedData = [...originalData];

    if (searchText) {
      updatedData = updatedData.filter((item) =>
        item.email.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedDate) {
      updatedData = updatedData.filter((item) =>
        moment(item.appointment_date).isSame(selectedDate, "day")
      );
    }

    setProcessingData(updatedData);
  }, [searchText, selectedDate, originalData]);

  const columns = [
    userData?.user?.role === ROLE_CUSTOMER
      ? {
          title: "Artist",
          dataIndex: "artist_id",
          key: "artist_id",
          render: (text, record) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={
                  record.avatar_url || generateFallbackAvatar(record.fullname)
                }
                alt={record.fullname}
                style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
                size={55}
              />
              <div>
                <div className="text-base">{record.fullname}</div>
                <div className="opacity-70">{record.email}</div>
              </div>
            </div>
          ),
        }
      : {
          title: "Customer",
          dataIndex: "customer_id",
          key: "customer_id",
          render: (text, record) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={
                  record.avatar_url || generateFallbackAvatar(record.fullname)
                }
                alt={record.fullname}
                style={{ marginRight: "8px", border: "1px solid #d9d9d9" }}
                size={55}
              />
              <div>
                <div className="text-base">{record.fullname}</div>
                <div className="opacity-70">{record.email}</div>
              </div>
            </div>
          ),
        },
    {
      title: "Appointment Date",
      dataIndex: "appointment_date",
      key: "appointment",
      render: (appointment) => appointment,
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (slot) => <span className="capitalize">{slot}</span>,
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      render: (place) => (
        <span className="capitalize">
          {place === "at_artist_home"
            ? "At Artist's Home"
            : "At Customer's Home"}
        </span>
      ),
    },
    {
      title: "Service",
      dataIndex: "service_id",
      key: "service_id",
      render: (service_id) => (
        <span className="capitalize">
          {list_services_wedding.find((s) => s.id === service_id)?.name}
        </span>
      ),
    },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date ? moment(date).format("YYYY-MM-DD") : null);
  };

  return (
    <div className="container py-10">
      <h1 className="text-center text-4xl inria-serif-font mb-4">
        Appointment management
      </h1>

      <div className="mb-4">
        <DatePicker
          onChange={handleDateChange}
          style={{ width: 200 }}
          placeholder="Select a date"
        />
      </div>

      <div className="mt-8">
        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={processingData}
            rowKey={(record) => record.item_id}
            pagination={{ pageSize: 10 }}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Schedule;
