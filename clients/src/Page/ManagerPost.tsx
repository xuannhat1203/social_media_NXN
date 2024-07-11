import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../store/reducers/getListPost";
import { getUsers } from "../store/reducers/getUser";
import { deletePost } from "../store/reducers/deletePost";
import { useNavigate } from "react-router-dom";

export default function ManagerPost() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [listPost, setListPost] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getMyPost = useSelector((state: any) => state.post.post);
  const getUser = useSelector((state: any) => state.user.user);

  useEffect(() => {
    dispatch(getPost());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setEmail(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    if (getUser.length > 0) {
      const find = getUser.find((user: any) => user.email === email);
      if (find) {
        setName(find.userName);
      }
    }
  }, [getUser, email]);

  useEffect(() => {
    if (name && getMyPost.length > 0) {
      const posts = getMyPost.filter((post: any) => post.userName === name);
      setListPost(posts);
    }
  }, [name, getMyPost]);

  const handleDelete = async (id: number) => {
    await dispatch(deletePost(id));
    setListPost((prevList) => prevList.filter((post) => post.id !== id));
  };

  const handleEdit = (post: any) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (selectedPost) {
      setListPost((prevList) =>
        prevList.map((post) =>
          post.id === selectedPost.id ? selectedPost : post
        )
      );
    }
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedPost((prevPost: any) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleImageChange = (index: number, value: string) => {
    if (selectedPost) {
      const newImages = [...selectedPost.image];
      newImages[index] = value;
      setSelectedPost((prevPost: any) => ({
        ...prevPost,
        image: newImages,
      }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };
  const goToManagerPost = () => {
    navigate("/managePost");
  };
  const goToManagerFriends = () => {
    navigate("/myFriend");
  };
  const goToMyAccount = () => {
    navigate("/settingAccount");
  };
  const goToHome = () => {
    navigate("/home");
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Modal */}
      {isModalOpen && selectedPost && (
        <div
          id="model"
          className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-4 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                name="content"
                value={selectedPost.content}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Images</label>
              {selectedPost.image.map((img: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  value={img}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-xl font-bold">Rikkei Academy</div>
        <nav>
          <ul>
            <li
              onClick={goToHome}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Home
            </li>
            <li
              onClick={goToMyAccount}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí tài khoản
            </li>
            <li
              onClick={goToManagerFriends}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí bạn bè
            </li>
            <li
              onClick={goToManagerPost}
              className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            >
              <span className="mr-2">◻️</span>Quản lí bài viết
            </li>
            <li className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer">
              <span className="mr-2">◻️</span>Quản lí ảnh và video
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <div className="text-sm">Help</div>
          <div className="text-sm">Contact us</div>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Quản lí danh sách bài viết</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-2 py-1 mr-2"
            />
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              RA
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {listPost.map((post: any, index: number) => (
                <tr key={post.id} className="border-t">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{post.content}</td>
                  <td className="p-3">
                    {post.image.map((img: any, imgIndex: number) => (
                      <p key={imgIndex}>{img}</p>
                    ))}
                  </td>
                  <td className="p-3">{post.create_at}</td>
                  <td className="p-3">
                    <button className="text-blue-500 mr-2">View</button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="text-yellow-500 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center p-4">
            <button className="px-3 py-1 rounded bg-gray-200 mr-1">1</button>
            <button className="px-3 py-1 rounded bg-black text-white mr-1">
              2
            </button>
            <button className="px-3 py-1 rounded bg-gray-200">3</button>
          </div>
        </div>
      </main>
    </div>
  );
}
