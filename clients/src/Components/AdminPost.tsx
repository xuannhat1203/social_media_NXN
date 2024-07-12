import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/reducers/getUser";
import { useNavigate } from "react-router-dom";
import { getPost } from "../store/reducers/getListPost";
import { hidePost, searchPost } from "../store/reducers/hidePost";

export default function AdminPost() {
  const getListPost = useSelector((state: any) => state.post.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(getListPost);
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    setRender(getListPost);
  }, [getListPost]);

  const handleChange = async (id: number) => {
    await dispatch(hidePost(id));
    dispatch(getPost());
    dispatch(getUsers());
  };

  const handleSearch = () => {
    if (content.trim() === "") {
      setRender(getListPost);
    } else {
      const find = getListPost.filter((post: any) =>
        post.content.toLowerCase().includes(content.toLowerCase())
      );
      setRender(find);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const goToHome = () => {
    navigate("/home");
  };

  const goToAccount = () => {
    navigate("/adminAccount");
  };

  const goToGroups = () => {
    navigate("/manageGroups");
  };

  const goToComment = () => {
    navigate("/comments");
  };

  const goToPost = () => {
    navigate("/posts");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white shadow-lg">
        <div className="p-4 text-2xl font-bold text-center bg-gradient-to-r from-indigo-500 to-purple-500">
          Rikkei Academy
        </div>
        <nav>
          <ul className="space-y-2">
            <li
              onClick={goToHome}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2"
            >
              <span className="mr-2">◻️</span>
              Home
            </li>
            <li
              onClick={goToAccount}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2"
            >
              <span className="mr-2">◻️</span>
              Quản lí tài khoản
            </li>
            <li
              onClick={goToGroups}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2"
            >
              <span className="mr-2">◻️</span>
              Quản lí group
            </li>
            <li
              onClick={goToComment}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2"
            >
              <span className="mr-2">◻️</span>
              Quản lí bình luận
            </li>
            <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2">
              <span className="mr-2">◻️</span>
              Quản lí đánh giá
            </li>
            <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2">
              <span className="mr-2">◻️</span>
              Quản lí quảng cáo
            </li>
            <li className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2">
              <span className="mr-2">◻️</span>
              Quản lí reports
            </li>
            <li
              onClick={goToPost}
              className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200 rounded-lg mx-2"
            >
              <span className="mr-2">◻️</span>
              Quản lí bài đăng
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-64 p-4">
          <div className="text-sm hover:text-indigo-400 cursor-pointer">
            Help
          </div>
          <div className="text-sm hover:text-indigo-400 cursor-pointer">
            Contact us
          </div>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lí groups</h1>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-lg font-medium text-gray-700">
                Tìm kiếm tài khoản:
              </label>
              <input
                onChange={(e) => setContent(e.target.value)}
                type="text"
                placeholder="Nhập tên người dùng"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-150"
              />
            </div>
            <button
              style={{ position: "relative", bottom: "13px" }}
              onClick={handleSearch}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
            >
              Tìm kiếm
            </button>
            <div
              onClick={handleLogout}
              className="bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg ml-4"
            >
              RA
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center">
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  UserName
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  Title của bài đăng
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">
                  Trạng thái bài đăng
                </th>
                <th>Ngày đăng</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {render.map((post: any) => (
                <tr
                  key={post.id}
                  className="hover:bg-gray-100 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {post.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.userName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.content}
                  </td>
                  <td
                    onClick={() => handleChange(post.id)}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 cursor-pointer"
                  >
                    {post.statusHide === false ? (
                      <span className="material-symbols-outlined text-green-500">
                        lock_open
                      </span>
                    ) : (
                      <span className="material-symbols-outlined text-red-500">
                        lock
                      </span>
                    )}
                  </td>
                  <td>{post.create_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
