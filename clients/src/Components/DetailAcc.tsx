import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Header from "../Page/Header";

const DetailAcc = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10">
        <div className="flex flex-wrap mt-16">
          <div className="w-full md:w-2/3 lg:w-2/3 p-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  className="w-50 h-50 mx-auto mb-4 rounded-full border-4 border-blue-500"
                  alt="User"
                />
                <h4 className="text-2xl font-semibold mb-4">Hoàng Nam</h4>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition">
                  Thêm vào tin
                </button>
                <button
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium mx-2 hover:bg-gray-700 transition"
                  onClick={handleShowModal}
                >
                  Chỉnh sửa trang cá nhân
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium mx-2 hover:bg-gray-700 transition">
                  Bạn Bè
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
              <h5 className="text-xl font-semibold mb-4">
                Những người bạn có thể biết
              </h5>
              <div className="flex flex-wrap gap-4">
                {[
                  "User 1",
                  "User 2",
                  "User 3",
                  "User 4",
                  "User 5",
                  "User 6",
                ].map((user, index) => (
                  <div className="text-center" key={index}>
                    <img
                      src="https://via.placeholder.com/100"
                      className="w-24 h-24 mx-auto mb-2 rounded-full border-2 border-blue-400"
                      alt={user}
                    />
                    <p className="text-sm font-medium">{user}</p>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-medium mt-2 hover:bg-blue-600 transition">
                      Thêm bạn bè
                    </button>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                Xem tất cả
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/3 p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h5 className="text-xl font-semibold mb-4">Giới thiệu</h5>
              <p className="text-gray-700 mb-4">Thông tin giới thiệu...</p>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition">
                Chỉnh sửa chi tiết
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2 hover:bg-gray-700 transition">
                Thêm nội dung đáng chú ý
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
              <h5 className="text-xl font-semibold mb-4">Ảnh</h5>
              <div className="flex flex-wrap gap-4">
                {Array(6).map((_, index) => (
                  <img
                    src="https://via.placeholder.com/100"
                    alt={`Photo ${index}`}
                    key={index}
                    className="w-24 h-24 object-cover rounded-lg border-2 border-gray-300"
                  />
                ))}
              </div>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                Xem tất cả ảnh
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-lg mt-6 p-6">
              <h5 className="text-xl font-semibold mb-4">Bạn bè</h5>
              <div className="flex flex-wrap gap-4">
                {[
                  "Friend 1",
                  "Friend 2",
                  "Friend 3",
                  "Friend 4",
                  "Friend 5",
                  "Friend 6",
                ].map((friend, index) => (
                  <div className="text-center" key={index}>
                    <img
                      src="https://via.placeholder.com/100"
                      className="w-24 h-24 mx-auto mb-2 rounded-full border-2 border-blue-400"
                      alt={friend}
                    />
                    <p className="text-sm font-medium">{friend}</p>
                  </div>
                ))}
              </div>
              <a
                href="#"
                className="text-blue-500 mt-4 inline-block hover:underline"
              >
                Xem tất cả bạn bè
              </a>
            </div>
          </div>
        </div>
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          className="rounded-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-xl font-semibold">
              Chỉnh sửa trang cá nhân
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label className="text-sm font-medium">
                  Họ và tên
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className="text-sm font-medium">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label className="text-sm font-medium">
                  Mật khẩu
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label className="text-sm font-medium">
                  Ảnh đại diện
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL ảnh đại diện"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg py-2 px-4 transition"
              >
                Lưu thay đổi
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default DetailAcc;
