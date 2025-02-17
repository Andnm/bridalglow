import React from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    Row,
    Col,
    Image,
    Typography,
    Button,
    Divider,
} from "antd";
import { ROLE_ARTIST } from "../../utils/constants";
import { generateFallbackAvatar } from "../../utils/helpers";

const { Title, Text } = Typography;

const AccountDetail = ({ artist }) => {
    const navigate = useNavigate();

    if (!artist) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-4xl mb-10">Artist not found</h1>
                <Button onClick={() => navigate("/manage-artist")}>Go back</Button>
            </div>
        );
    }

    const displayValue = (value) => {
        if (!value || value.trim() === '') {
            return <Text type="secondary" italic>Not updated yet</Text>;
        }
        return value;
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
                        src={artist.avatar_url || generateFallbackAvatar(artist.fullname)}
                        style={{
                            width: "100%",
                            borderRadius: "8px",
                            border: "3px solid #f0f0f0",
                        }}
                        fallback="/path/to/default/avatar.png"
                        className="min-w-[261px]"
                    />
                </Col>
                <Col span={18}>
                    <Card bordered={false}>
                        <Title level={2}>{displayValue(artist.fullname)}</Title>
                        <Text type="secondary">{displayValue(artist.role)}</Text>
                        <Divider />

                        <div className="mb-3">
                            <Text strong>Email: </Text>
                            <Text>{displayValue(artist.email)}</Text>
                        </div>

                        <div className="mb-3">
                            <Text strong>Phone Number: </Text>
                            <Text>{displayValue(artist.phone_number)}</Text>
                        </div>

                        {artist.role === ROLE_ARTIST
                            &&
                            <>
                                <div className="mb-3">
                                    <Text strong>Fanpage: </Text>
                                    {artist.fanpage ? (
                                        <a href={artist.fanpage} target="_blank" rel="noopener noreferrer">
                                            {artist.fanpage}
                                        </a>
                                    ) : (
                                        <Text type="secondary" italic>Not updated yet</Text>
                                    )}
                                </div>

                                <Divider />
                                <div className="mb-3">
                                    <Title level={4}>Description</Title>
                                    <Text style={{ whiteSpace: "pre-line" }}>
                                        {displayValue(artist.description)}
                                    </Text>
                                </div>

                                <Divider />
                                <div className="mb-3">
                                    <Title level={4}>Experience</Title>
                                    <Text style={{ whiteSpace: "pre-line" }}>
                                        {displayValue(artist.experience)}
                                    </Text>
                                </div>

                                <Divider />
                                <div className="mb-3">
                                    <Title level={4}>Achievements</Title>
                                    <Text style={{ whiteSpace: "pre-line" }}>
                                        {displayValue(artist.achievements)}
                                    </Text>
                                </div>
                            </>
                        }

                    </Card>
                </Col>
            </Row>

            {artist.role === ROLE_ARTIST
                &&
                <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
                    <Col span={24}>
                        <Title level={3}>Makeup Portfolio</Title>
                        <Image.PreviewGroup>
                            <Row gutter={[16, 16]}>
                                {artist.makeup_img_list && artist.makeup_img_list.length > 0 ? (
                                    artist.makeup_img_list.map((img, index) => (
                                        <Col key={index} span={8}>
                                            <Image
                                                alt={`Makeup ${index + 1}`}
                                                src={img}
                                                style={{ width: "100%", borderRadius: "8px" }}
                                                className="object-cover"
                                            />
                                        </Col>
                                    ))
                                ) : (
                                    <Col span={24}>
                                        <Text type="secondary" italic>No portfolio images yet</Text>
                                    </Col>
                                )}
                            </Row>
                        </Image.PreviewGroup>
                    </Col>
                </Row>
            }
        </div>
    );
};

export default AccountDetail;