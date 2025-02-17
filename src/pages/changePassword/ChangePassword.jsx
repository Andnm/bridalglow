import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { userSelector } from "../../redux/selectors/selector";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, checkOldPassword } from "../../services/user.services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/reducers/userReducer";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector(userSelector);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleOldPasswordSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await checkOldPassword(userData?.user._id, {
        password: values.oldPassword,
      });
      setStep(2);
    } catch (error) {
      console.log("error: ", error);
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await changePassword(userData?.user._id, {
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      toast.success("Password changed successfully! Please login again!");
      navigate("/");
      dispatch(logoutUser());
    } catch (error) {
      toast.error(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-10">
      <Card className="shadow-lg p-6 rounded-xl">
        <h2 className="text-center text-xl font-semibold mb-4">
          Change Password
        </h2>
        {step === 1 ? (
          <Form name="oldPassword" onFinish={handleOldPasswordSubmit}>
            <Form.Item
              label="Old Password"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Form name="newPassword" onFinish={handleNewPasswordSubmit}>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
};

export default ChangePassword;
