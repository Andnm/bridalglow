import React, { useEffect, useRef, useState } from "react";
import { Collapse, Card, List, Image, Typography, Button } from "antd";
import {
  CaretRightOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  styling_decorating_list,
  wedding_planning_list,
} from "../../utils/constants";

const { Panel } = Collapse;
const { Text, Title } = Typography;

const StylingDecoration = ({ scrollTo }) => {
  const titleRef = useRef(null);

  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    if (scrollTo && titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [scrollTo]);

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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Title
        ref={titleRef}
        level={12}
        className="text-center mb-8 hurricane-font"
      >
        Styling & Decoration
      </Title>
      <Collapse
        accordion
        activeKey={activeKey}
        onChange={setActiveKey}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      >
        {styling_decorating_list.map((item) => (
          <Panel
            header={item.title}
            key={item.id}
            className="capitalize font-semibold text-xl"
          >
            <Card bordered={false}>{renderServices(item.list_services)}</Card>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default StylingDecoration;
