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
const { Option } = Select;

const { Title, Text } = Typography;

const getAllArtists = async () => {
  return [
    {
      _id: 1,
      name: "Artist 1",
      avatar_url:
        "https://lh7-us.googleusercontent.com/VfYYf7aVtHarR-Nl0suKnW5l0pv2yNbPDlBP_iHGPfl2fjNTOIA7DcbCj5rafNk3W3m0IIVfX-luQYc-MFNPM7yNe9iLKuUGBLd9__jLpruqYyt3w4zMwngpGSCmmlfSngjZ_SPxAsY9zS6iVAYF7kE",
      description: "Artist 1 description",
      phone_number: "123-456-7890",
      email: "artist1@example.com",
      dob: "1990-01-01",
      gender: "Male",
      achievements: "Award 1, Award 2",
      fanpage: "https://facebook.com/artist1",
      experience: "5 years",
      makeup_img_list: [
        "https://lh7-us.googleusercontent.com/BCfDPytIdpuTrhKpSuV3zIzAxe3GjCKzW0z-dKP3LsDR-FyM4T8LGtnRU2vEE71MsLDQ6METmPclLiguyac1bCA1oiHzymZtzJPJOOr731SceYOREAsiY2YpP9VRT6FMMDX2trLHXdUzoweHPPT_nPI",
        "https://lh7-us.googleusercontent.com/gAXOAcbNm-JQZZ-4EuSyx4_90qzJnfdyJRjPy_844Tlt-nGpjp2XAngNxXL4rk78SqK9_7nf5-L5ZrC4EeK_YAeM3saA1VEjEy4J7dt-6uVWRplkEj4HBzIwQ2l_iB8FATgLVAAnb-CaZrIgFwDdM3M",
        "https://lh7-us.googleusercontent.com/UIOjhvC2mK2klXahddKyeUKlaA3hecblzgsfbIL6jQU76Z_6qXrqUX1n3Ze9F67_zL-5SsDimsnE9bjd9EO2AwkgHWR8oRkJGycVBXZ61Na4iPF2zNS2451-iAUFtb_Cv3UhXqOoRXTWq3wTHHANHH4",
      ],
      role: "Senior Makeup Artist",
      specialty: ["Bridal Makeup", "Fashion Makeup", "Event Makeup"],
    },
    {
      _id: 2,
      name: "Artist 2",
      avatar_url: "artist2.jpg",
      description: "Artist 2 description",
      phone_number: "123-456-7891",
      email: "artist2@example.com",
      dob: "1992-02-02",
      gender: "Female",
      achievements: "Award 3, Award 4",
      fanpage: "https://facebook.com/artist2",
      experience: "3 years",
      makeup_img_list: ["makeup3.jpg", "makeup4.jpg"],
      role: "Freelance Makeup Artist",
      specialty: ["Party Makeup", "Photography Makeup", "Glam Makeup"],
    },
    {
      _id: 3,
      name: "Artist 3",
      avatar_url: "artist3.jpg",
      description: "Artist 3 description",
      phone_number: "123-456-7892",
      email: "artist3@example.com",
      dob: "1988-03-03",
      gender: "Non-binary",
      achievements: "Award 5, Award 6",
      fanpage: "https://facebook.com/artist3",
      experience: "8 years",
      makeup_img_list: ["makeup5.jpg", "makeup6.jpg"],
      role: "Makeup Instructor",
      specialty: ["Theatrical Makeup", "SFX Makeup", "Bridal Makeup"],
    },
  ];
};

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
    return <Spin size="large" />;
  }

  if (!artist) {
    return (
      <div>
        <Text>Artist not found.</Text>
        <Button onClick={() => navigate("/")}>Go back</Button>
      </div>
    );
  }

  const handleDateSelect = async (date) => {
    const dateString = date.format("YYYY-MM-DD");
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
    const data = {
      customer_id: userData?.user?._id,
      artist_id: artist._id,
      appointment_date: selectedDate,
      slot: selectedSlot,
      place: selectedPlace,
      service_id: selectedService,
    };

    Modal.confirm({
      title: "Confirm Booking",
      content: (
        <div className=" mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            <strong>Artist:</strong> {artist.name}
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
            {list_services_wedding.find((s) => s.id === selectedService)?.name}
          </p>
        </div>
      ),
      okText: "Checkout",
      cancelText: "Cancel",
      onOk() {
        console.log("Booking confirmed with data: ", data);
      },
      onCancel() {
        console.log("Booking cancelled");
      },
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
            alt={artist.name}
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
            <Title level={2}>{artist.name}</Title>
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
                onClick={() => setIsModalVisible(true)}
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
