import { FC, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/router";
import styles from "./Register.module.css";

const Register: FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setLoading(false);

    if (res.ok) {
      message.success("Registration successful!");
      router.push("/login");
    } else {
      message.error("Error registering user");
    }
  };

  return (
    <div className={styles.registerContainer}>
      {/* Left Panel: Register Form */}
      <div className={styles.leftPanel}>
        <div className={styles.registerCard}>
          <h2 className={styles.registerTitle}>Register</h2>
          <Form onFinish={handleSubmit} layout="vertical">
            <Form.Item name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Name" className={styles.inputField} />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
              <Input placeholder="Email" className={styles.inputField} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Password is required" }]}>
              <Input.Password placeholder="Password" className={styles.inputField} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block className={styles.registerButton}>
              Register
            </Button>
          </Form>
        </div>
      </div>

      {/* Right Panel: Background Image */}
      <div className={styles.rightPanel}></div>
    </div>
  );
};

export default Register;
