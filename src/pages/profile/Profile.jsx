import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Input,
  Select,
  TextArea,
  message,
  Upload,
  Row,
  Col,
  Form,
  Image,
} from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { FaUser } from "react-icons/fa";
import { updateUserProfile } from "../../services/user.services";
import { userSelector } from "../../redux/selectors/selector";
import { updateUser } from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";
import SpinnerLoading from "../../components/loading/SpinnerLoading";
import { ROLE_CUSTOMER } from "../../utils/constants";
import dayjs from "dayjs";

const { Option } = Select;

const UPLOAD_PRESET = process.env.REACT_APP_UPLOAD_PRESET;
const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;

function Profile() {
  const dispatch = useDispatch();
  const userRedux = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    fullname: userRedux?.user?.fullname || "",
    email: userRedux?.user?.email || "",
    phone_number: userRedux?.user?.phone_number || "",
    dob: userRedux?.user?.dob || null,
    gender: userRedux?.user?.gender || "",
    description: userRedux?.user?.description || "",
    achievements: userRedux?.user?.achievements || [],
    experience: userRedux?.user?.experience || "",
    fanpage: userRedux?.user?.fanpage || "",
    avatar_url: userRedux?.user?.avatar_url || "",
    makeup_img_list: userRedux?.user?.makeup_img_list || [],
  });
  const [avatar_url_file, setAvatarUrlFile] = useState(null);
  const [makeup_img_list_file, setMakeupImgListFile] = useState([]);

  useEffect(() => {
    const dobDate = userRedux?.user?.dob ? dayjs(userRedux?.user?.dob) : null;

    setUserData({
      fullname: userRedux?.user?.fullname || "",
      email: userRedux?.user?.email || "",
      phone_number: userRedux?.user?.phone_number || "",
      dob: dobDate,
      gender: userRedux?.user?.gender || "",
      description: userRedux?.user?.description || "",
      achievements: userRedux?.user?.achievements || [],
      experience: userRedux?.user?.experience || "",
      fanpage: userRedux?.user?.fanpage || "",
      avatar_url: userRedux?.user?.avatar_url || "",
      makeup_img_list: userRedux?.user?.makeup_img_list || [],
    });
  }, [userRedux]);

  const handleSave = async () => {
    setIsLoading(true);

    if (userRedux?.user) {
      try {
        let uploadedUrl = userData.avatar_url;
        if (avatar_url_file) {
          try {
            uploadedUrl = await uploadToCloudinary(avatar_url_file);
            setUserData({ ...userData, avatar_url: uploadedUrl });
          } catch (error) {
            console.error("Upload avatar failed:", error);
            toast.error("Error uploading avatar");
            return;
          }
        }

        let uploadedUrlsList = userData.makeup_img_list;
        if (makeup_img_list_file.length > 0) {
          try {
            uploadedUrlsList = await uploadMultipleToCloudinary(
              makeup_img_list_file
            );

            setUserData({ ...userData, makeup_img_list: uploadedUrlsList });
          } catch (error) {
            console.error("Upload makeup images failed:", error);
            toast.error("Error uploading makeup images");
            return;
          }
        }

        const updatedUserData = {
          ...userData,
          dob: userData.dob ? userData?.dob?.format("YYYY-MM-DD") : null,
          avatar_url: uploadedUrl,
          makeup_img_list: uploadedUrlsList,
        };

        const response = await updateUserProfile(updatedUserData);
        toast.success("Profile updated successfully");
        dispatch(updateUser(updatedUserData));
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } catch (error) {
        console.log("error: ", error);
        toast.error("An error occurred: " + error?.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const uploadToCloudinary = async (imageUrl) => {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw new Error("Upload failed");
    }
  };

  const uploadMultipleToCloudinary = async (imageUrls) => {
    const uploadPromises = imageUrls.map(async (imageUrl) => {
      const formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);
    return uploadedUrls;
  };

  const handleAvatarChange = (file) => {
    setAvatarUrlFile(file);
    const newAvatarUrl = URL.createObjectURL(file);
    setUserData({ ...userData, avatar_url: newAvatarUrl });
    return false;
  };

  const handleMakeupImageChange = (fileList) => {
    const newFileList = fileList.map((file) => {
      if (file.originFileObj) {
        return file.originFileObj;
      }
      return file.url;
    }).filter(file => file); 
  
    setMakeupImgListFile(newFileList);
  
    const newUrls = newFileList.map(file => {
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
      return file; 
    });
  
    setUserData({
      ...userData,
      makeup_img_list: newUrls,
    });
    
    return false;
  };

  return (
    <div className="profile-container container" style={{ padding: "30px" }}>
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card bordered={false} style={{ textAlign: "center" }}>
            <Avatar
              src={userData.avatar_url || <UserOutlined />}
              size={200}
              style={{ marginBottom: 20 }}
            />
          </Card>

          <div className="mt-4 flex justify-center">
            <Upload showUploadList={false} beforeUpload={handleAvatarChange}>
              <Button icon={<UploadOutlined />}>Change Avatar</Button>
            </Upload>
          </div>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Profile Information" bordered={false}>
            <Form layout="horizontal" labelAlign="start">
              <Form.Item
                label="Full Name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  value={userData.fullname}
                  onChange={(e) =>
                    setUserData({ ...userData, fullname: e.target.value })
                  }
                  placeholder="Full Name"
                  style={{ marginBottom: 15 }}
                />
              </Form.Item>

              <Form.Item
                label="Email"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  placeholder="Email"
                  style={{ marginBottom: 15 }}
                  disabled
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  value={userData.phone_number}
                  onChange={(e) =>
                    setUserData({ ...userData, phone_number: e.target.value })
                  }
                  placeholder="Phone Number"
                  style={{ marginBottom: 15 }}
                />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <DatePicker
                  value={
                    dayjs(userData.dob).isValid() ? dayjs(userData.dob) : null
                  }
                  onChange={(date) => setUserData({ ...userData, dob: date })}
                  style={{ marginBottom: 15 }}
                  placeholder="Date of Birth"
                />
              </Form.Item>

              {userRedux?.user?.role !== ROLE_CUSTOMER && (
                <>
                  <Form.Item
                    label="Gender"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Select
                      value={userData.gender}
                      onChange={(value) =>
                        setUserData({ ...userData, gender: value })
                      }
                      style={{ width: "100%", marginBottom: 15 }}
                      placeholder="Gender"
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Input.TextArea
                      value={userData.description}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Description"
                      style={{ marginBottom: 15 }}
                      rows={6}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Achievements"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Input.TextArea
                      value={userData.achievements}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          achievements: e.target.value,
                        })
                      }
                      placeholder="Achievements"
                      style={{ marginBottom: 15 }}
                      rows={6}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Experience"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Input.TextArea
                      value={userData.experience}
                      onChange={(e) =>
                        setUserData({ ...userData, experience: e.target.value })
                      }
                      placeholder="Experience"
                      style={{ marginBottom: 15 }}
                      rows={6}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Fanpage URL"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                  >
                    <Input
                      value={userData.fanpage}
                      onChange={(e) =>
                        setUserData({ ...userData, fanpage: e.target.value })
                      }
                      placeholder="Fanpage URL"
                      style={{ marginBottom: 15 }}
                    />
                  </Form.Item>
                </>
              )}
            </Form>
          </Card>

          <div className="mt-10"></div>
          {userRedux?.user?.role !== ROLE_CUSTOMER && (
            <Card title="Makeup Images" bordered={false}>
              <Upload
                listType="picture-card"
                fileList={userData.makeup_img_list.map((imgUrl, index) => ({
                  uid: index,
                  name: `image-${index}`,
                  url: imgUrl,
                }))}
                onChange={({ fileList }) => handleMakeupImageChange(fileList)}
                beforeUpload={() => false}
                multiple
              >
                <Button icon={<UploadOutlined />}></Button>
              </Upload>

              <Row gutter={16} style={{ marginTop: 20 }}>
                {userData.makeup_img_list.map((imgUrl, index) => (
                  <Col key={index} span={6}>
                    <Image
                      src={imgUrl}
                      alt={`makeup-img-${index}`}
                      width="100%"
                      height={250}
                      className="object-cover"
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          )}
        </Col>
      </Row>

      <div
        className="buttons-section"
        style={{ marginTop: 30, textAlign: "center" }}
      >
        <Button onClick={handleSave} type="primary" style={{ marginRight: 10 }}>
          Save
        </Button>
      </div>
      {isLoading && <SpinnerLoading />}
    </div>
  );
}

export default Profile;
