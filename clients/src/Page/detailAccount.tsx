// export default function detailAccount() {
//   return (
//     <>
//       <div className="container mt-5">
//         <div className="row" style={{ marginTop: "100px" }}>
//           <div className="col-md-8">
//             <div className="card">
//               <div className="card-body text-center">
//                 <img src={userData.img} className="w-50 mb-3" alt="User" />
//                 <h4>{userData.name}</h4>
//                 <button className="btn btn-primary btn-sm mx-2">
//                   Thêm vào tin
//                 </button>
//                 <button
//                   className="btn btn-secondary btn-sm mx-2"
//                   onClick={handleShowModal}
//                 >
//                   Chỉnh sửa trang cá nhân
//                 </button>
//                 <button
//                   className="btn btn-secondary btn-sm mx-2"
//                   onClick={handleFriendsButtonClick}
//                 >
//                   Bạn Bè
//                 </button>
//               </div>
//             </div>
//             <div className="card mt-3">
//               <div className="card-body">
//                 <h5 className="card-title">Những người bạn có thể biết</h5>
//                 <div className="d-flex flex-wrap">
//                   {friendsData.map((user) => (
//                     <div className="p-2 text-center" key={user.id}>
//                       <img
//                         src={user.img}
//                         className="rounded"
//                         style={{ width: "100px" }}
//                         alt={user.name}
//                       />
//                       <p>{user.name}</p>
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => handleAddFriend(user)}
//                         disabled={friendRequests[user.id]}
//                       >
//                         {friendRequests[user.id]
//                           ? "Đã gửi lời mời"
//                           : "Thêm bạn bè"}
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <a href="#" className="btn btn-link">
//                   Xem tất cả
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4">
//             <div className="card mb-3">
//               <div className="card-body">
//                 <h5 className="card-title">Giới thiệu</h5>
//                 {editIntro ? (
//                   <>
//                     <textarea
//                       className="form-control"
//                       value={formData.introduction}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           introduction: e.target.value,
//                         })
//                       }
//                     />
//                     <button
//                       className="btn btn-primary btn-sm mt-2"
//                       onClick={handleSaveIntro}
//                     >
//                       Lưu
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <p>{userData.introduction || "Chưa có giới thiệu."}</p>
//                     <button
//                       className="btn btn-secondary btn-sm"
//                       onClick={handleEditIntro}
//                     >
//                       Chỉnh sửa giới thiệu
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//             <div className="card mb-3">
//               <div className="card-body">
//                 <h5 className="card-title">Bạn đang nghĩ gì?</h5>
//                 <textarea
//                   className="form-control"
//                   value={status}
//                   onChange={handleStatusChange}
//                 />
//                 <button
//                   className="btn btn-primary btn-sm mt-2"
//                   onClick={handlePostStatus}
//                 >
//                   Đăng
//                 </button>
//               </div>
//             </div>
//             <div className="card">
//               <div className="card-body">
//                 <h5 className="card-title">Bạn bè</h5>
//                 <div className="d-flex flex-wrap">
//                   {userData.friends?.map((friend) => (
//                     <div className="p-2 text-center" key={friend.id}>
//                       <img
//                         src={friend.img}
//                         className="rounded"
//                         style={{ width: "100px" }}
//                         alt={friend.name}
//                       />
//                       <p>{friend.name}</p>
//                     </div>
//                   ))}
//                 </div>
//                 <a href="#" className="btn btn-link">
//                   Xem tất cả
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <Modal show={showModal} onHide={handleCloseModal}>
//           <Modal.Header closeButton>
//             <Modal.Title>Chỉnh sửa thông tin cá nhân</Modal.Title>
//           </Modal.Header>
//           <Form onSubmit={handleSubmit}>
//             <Modal.Body>
//               <Form.Group controlId="formName">
//                 <Form.Label>Họ và tên</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Nhập họ tên của bạn"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formEmail">
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Nhập địa chỉ email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formPassword">
//                 <Form.Label>Mật khẩu</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Nhập mật khẩu"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//               <Form.Group controlId="formImg">
//                 <Form.Label>Ảnh đại diện</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="URL ảnh đại diện"
//                   name="img"
//                   value={formData.img}
//                   onChange={handleChange}
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleCloseModal}>
//                 Đóng
//               </Button>
//               <Button variant="primary" type="submit">
//                 Lưu thay đổi
//               </Button>
//             </Modal.Footer>
//           </Form>
//         </Modal>
//       </div>
//     </>
//   );
// }
