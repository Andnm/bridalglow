import React, { useEffect, useRef, useState } from "react";
import { Card, List, Image, Typography, Button, Row, Col, Spin } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; 
import { styling_decorating_list } from "../../utils/constants";
import { getAllArtists } from "../../services/user.services";

const { Text, Title } = Typography;

const StylingDecoration = ({ scrollTo }) => {
  const titleRef = useRef(null);
  const [activeKey, setActiveKey] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    if (scrollTo && titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollTo]);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        const data = await getAllArtists(); 
        console.log("data: ", data)
        setArtists(data);
      } catch (error) {
        console.error("Error fetching artists:", error);
      } finally {
        setLoading(false);
      }
    };

    if (activeKey === "List of makeup artists") {
      fetchArtists();
    }
  }, [activeKey]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const renderServices = (services) => {
    if (!services || services.length === 0) {
      return <Text className="text-gray-500 italic">Chưa có dịch vụ</Text>;
    }

    return (
      <List
        dataSource={services}
        renderItem={(service) => (
          <List.Item className="flex flex-col md:flex-row gap-4 p-4">
            <div className="w-full md:w-1/2">
              <h1 className="text-xl">{service.name}</h1>
              <p className="text-red-500 font-semibold text-xl">
                {formatPrice(service.price)}
              </p>
              <div className="flex gap-4 justify-between mt-10 items-center">
                <button className="flex items-center justify-center rounded-full p-3 bg-gray-100 hover:bg-gray-200 transition-all duration-300 shadow-md cursor-pointer">
                  <ShoppingCartOutlined className="text-xl text-gray-700" />
                </button>

                <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 cursor-pointer">
                  Xem chi tiết
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Image.PreviewGroup>
                <div className="grid grid-cols-2 gap-2">
                  {service.img_links?.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`${service.name} - ${index + 1}`}
                      className="object-cover rounded"
                      height={150}
                      loading="lazy"
                    />
                  ))}
                </div>
              </Image.PreviewGroup>
            </div>
          </List.Item>
        )}
      />
    );
  };

  const renderArtists = () => {
    if (loading) {
      return <Spin size="large" />;
    }

    return (
      <Row gutter={[16, 16]}>
        {artists.map((artist) => (
          <Col key={artist._id} span={8}>
            <Card
              hoverable
              cover={<Image alt={artist.name} src={artist.image} />}
            >
              <Card.Meta title={artist.name} />
              <Button
                type="primary"
                block
                className="mt-4"
                onClick={() => navigate(`/artist/${artist._id}`)} 
              >
                Xem chi tiết
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title
        ref={titleRef}
        level={12}
        className="text-center mb-8 hurricane-font"
      >
        Styling & Decoration
      </Title>

      <Row gutter={[16, 16]} justify="center" className="mb-8">
        {styling_decorating_list.map((item) => (
          <Col key={item.id}>
            <Button
              type={activeKey === item.title ? "primary" : "default"}
              onClick={() => setActiveKey(item.title)}
              className={`w-full capitalize ${
                activeKey === item.title
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {item.title}
            </Button>
          </Col>
        ))}
      </Row>

      {activeKey === "List of makeup artists"
        ? renderArtists() // Hiển thị artist nếu tiêu đề là "List of makeup artists"
        : styling_decorating_list
            .filter((item) => item.title === activeKey)
            .map((item) => (
              <Card bordered={false} key={item.id}>
                {renderServices(item.list_services)}
              </Card>
            ))}
    </div>
  );
};

export default StylingDecoration;
