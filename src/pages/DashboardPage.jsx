// src/pages/DashboardPage.jsx
import { Card, Col, Row, Statistic } from "antd";
import { motion } from "motion/react";

export default function DashboardPage() {
  return (
    <>
      <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>
        Dashboard
      </h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <Statistic title="Total Items" value={128} />
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <Statistic title="Total BOMs" value={37} />
            </Card>
          </motion.div>
        </Col>

        <Col xs={24} md={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <Statistic
                title="Avg Cost (per BOM)"
                value={152.4}
                precision={2}
                suffix="€"
              />
            </Card>
          </motion.div>
        </Col>
      </Row>
    </>
  );
}
