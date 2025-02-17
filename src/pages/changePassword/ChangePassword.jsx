import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { userSelector } from "../../redux/selectors/selector";
import { useSelector } from "react-redux";
import { changePassword } from "../../services/user.services";
import { checkOldPassword } from "../../services/auth.services";
import { toast } from "react-toastify";

const ChangePassword = () => {
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
      toast.error("An error occurred while changing the password " + error);
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
      toast.success("Password changed successfully!");
    } catch (error) {
      toast.error("An error occurred while changing the password! " + error);
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
