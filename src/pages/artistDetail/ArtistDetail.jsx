import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Image,
  Typography,
  Button,
  Divider,
  Spin,
  Modal,
  Space,
  DatePicker,
  Select,
  Calendar,
} from "antd";
import { userSelector } from "../../redux/selectors/selector";
import { useDispatch, useSelector } from "react-redux";
import { list_services_wedding } from "../../utils/constants";
import { checkFreeSlot } from "../../services/schedule.services";
import moment from "moment";
import { formatPrice } from "../../utils/common";
import { toast } from "react-toastify";
import { getAllArtists } from "../../services/user.services";
import { createSchedule } from "../../services/transaction.services";
const { Option } = Select;

const { Title, Text } = Typography;

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);

  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      const artists = await getAllArtists();
      const foundArtist = artists.find(
        (artist) => artist._id.toString() === id
      );
      setArtist(foundArtist);
      setLoading(false);
    };

    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-4xl mb-10">Artist not found</h1>
        <Button onClick={() => navigate("/services")}>Go back</Button>
      </div>
    );
  }

  const handleDateSelect = async (date) => {
    const dateString = date?.format("YYYY-MM-DD");
    setSelectedDate(dateString);
    try {
      setIsLoading(true);
      const data = {
        artist_id: artist._id,
        appointment_date: dateString,
      };
      const slots = await checkFreeSlot(data);
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Error fetching free slots:", error);
      setAvailableSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlotChange = (value) => {
    setSelectedSlot(value);
  };

  const handlePlaceChange = (value) => {
    setSelectedPlace(value);
  };

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };

  const handleConfirmBooking = async () => {
    Modal.confirm({
      title: "Confirm Booking",
      content: (
        <div className="mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Artist:</strong> {artist.fullname}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Date:</strong> {selectedDate}
          </p>
          <p className="text-lg text-gray-700 mb-4 capitalize">
            <strong>Slot:</strong> {selectedSlot}
          </p>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Place:</strong>{" "}
            {selectedPlace === "at_artist_home"
              ? "At Artist's Home"
              : "At Customer's Home"}
          </p>
          <p className="text-lg text-gray-700 capitalize">
            <strong>Service:</strong>{" "}
            {(() => {
              const service = list_services_wedding.find(
                (s) => s.id === selectedService
              );
              return (
                <>
                  {service?.name} -{" "}
                  <span className="text-red-800">
                    {formatPrice(service?.price)}
                  </span>
                </>
              );
            })()}
          </p>
        </div>
      ),
      okText: "Checkout",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const scheduleData = {
            customer_id: userData?.user?._id,
            artist_id: artist._id,
            appointment_date: selectedDate,
            slot: selectedSlot,
            place: selectedPlace,
            service_id: selectedService,
            amount: list_services_wedding.find((s) => s.id === selectedService)
              ?.price,
          };

          console.log("scheduleData: ", scheduleData);

          const dataResponse = await createSchedule(scheduleData);

          const redirectUrl = dataResponse.paymentUrl;

          window.location.href = redirectUrl;
        } catch (error) {
          console.log("error create payos: ", error);
          toast.error(error?.response?.data);
        }
      },
      onCancel() {},
    });
  };

  return (
    <div
      className="artist-detail-container container"
      style={{ padding: "30px", backgroundColor: "#f7f7f7" }}
    >
      <Row gutter={[16, 16]} justify="center">
        <Col span={6}>
          <Image
            alt={artist.fullname}
            src={artist.avatar_url}
            style={{
              width: "100%",
              borderRadius: "8px",
              border: "3px solid #f0f0f0",
            }}
          />
        </Col>
        <Col span={18}>
          <Card bordered={false}>
            <Title level={2}>{artist.fullname}</Title>
            <Text type="secondary">{artist.role}</Text>
            <Divider />
            <Text strong>Email: </Text>
            <Text>{artist.email}</Text>
            <br />
            <Text strong>Phone Number: </Text>
            <Text>{artist.phone_number}</Text>
            <br />
            <Text strong>Fanpage: </Text>

            <a href={artist.fanpage} target="_blank" rel="noopener noreferrer">
              {artist.fanpage}
            </a>

            <Divider />
            <Title level={4}>Description</Title>
            <Text style={{ whiteSpace: "pre-line" }}>{artist.description}</Text>

            <Divider />
            <Title level={4}>Experience</Title>
            <Text style={{ whiteSpace: "pre-line" }}>{artist.experience}</Text>

            <Divider />
            <Title level={4}>Achievements</Title>
            <Text style={{ whiteSpace: "pre-line" }}>
              {artist.achievements}
            </Text>

            <br />

            <Divider />

            <div className="w-full flex justify-center">
              <button
                className="cursor-pointer w-fit py-3 px-6 bg-green-500 border-2 border-green-500 text-white font-semibold rounded-lg hover:bg-green-600 hover:border-green-600 transition-all duration-300"
                onClick={() => {
                  if (!userData?.user) {
                    toast.warning("Please login before booking!");
                  } else {
                    setIsModalVisible(true);
                  }
                }}
              >
                Book now
              </button>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
        <Col span={24}>
          <Title level={3}>Makeup Portfolio</Title>
          <Image.PreviewGroup>
            <Row gutter={[16, 16]}>
              {artist.makeup_img_list.map((img, index) => (
                <Col key={index} span={8}>
                  <Image
                    alt={`Makeup ${index + 1}`}
                    src={img}
                    style={{ width: "100%", borderRadius: "8px" }}
                    className="object-cover"
                  />
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup>
        </Col>
      </Row>

      <Modal
        title="Select Appointment"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={1000}
      >
        <div className="grid grid-cols-2 gap-4 items-center h-[413px]">
          <Calendar
            onSelect={handleDateSelect}
            fullscreen={false}
            disabledDate={(current) =>
              current &&
              current.isBefore(moment().subtract(1, "day").endOf("day"))
            }
          />

          <Space direction="vertical" style={{ width: "100%" }}>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <Spin size="large" />
              </div>
            ) : (
              <>
                {availableSlots.length > 0 && (
                  <Select
                    placeholder="Select a slot"
                    onChange={handleSlotChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    {availableSlots.map((slot) => (
                      <Option key={slot} value={slot}>
                        {slot === "morning" ? "Morning" : "Afternoon"}
                      </Option>
                    ))}
                  </Select>
                )}

                {selectedSlot && (
                  <Select
                    placeholder="Select a place"
                    onChange={handlePlaceChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    <Option value="at_customer_home">At Customer's Home</Option>
                    <Option value="at_artist_home">At Artist's Home</Option>
                  </Select>
                )}

                {selectedSlot && selectedPlace && (
                  <Select
                    placeholder="Select a service"
                    onChange={handleServiceChange}
                    style={{ width: "100%", marginBottom: "10px" }}
                  >
                    {list_services_wedding.map((service) => (
                      <Option key={service.id} value={service.id}>
                        {service.name
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}{" "}
                        -{" "}
                        <span className="text-red-800">
                          {formatPrice(service.price)}
                        </span>
                      </Option>
                    ))}
                  </Select>
                )}

                {selectedService && (
                  <div>
                    <Title level={4}>Service Images</Title>
                    <Row gutter={[16, 16]}>
                      {list_services_wedding
                        .find((s) => s.id === selectedService)
                        ?.img_links.map((img, index) => (
                          <Col key={index} span={8}>
                            <Image.PreviewGroup>
                              <Image
                                alt={`Image ${index + 1}`}
                                src={img}
                                style={{ width: "100%", borderRadius: "8px" }}
                              />
                            </Image.PreviewGroup>
                          </Col>
                        ))}
                    </Row>
                  </div>
                )}
              </>
            )}
          </Space>
        </div>

        <div className="w-full flex justify-center">
          <div style={{ marginTop: "20px" }} className="w-40">
            <Button
              type="primary"
              onClick={handleConfirmBooking}
              disabled={!selectedService || !selectedPlace}
              style={{ width: "100%" }}
              className="w-30"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ArtistDetail;
