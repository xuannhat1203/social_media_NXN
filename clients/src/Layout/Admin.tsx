import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const goToAccount = () => {
    navigate("/adminAccount");
  };
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-xl font-bold">Rikkei Academy</div>
          <nav>
            <ul>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center cursor-pointer">
                <span className="mr-2">◻️</span>Home
              </li>
              <li
                onClick={goToAccount}
                className="px-4 py-2 hover:bg-gray-700 flex items-center"
              >
                <span className="mr-2">◻️</span>Quản lí tài khoản
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí group
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí bình luận
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí đánh giá
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí quảng cáo
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí reports
              </li>
              <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
                <span className="mr-2">◻️</span>Quản lí bài đăng
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 w-64 p-4">
            <div className="text-sm">Help</div>
            <div className="text-sm">Contact us</div>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Quản lí tài khoản</h1>
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

          <div className="bg-white rounded-lg shadow"></div>
        </main>
      </div>
    </>
  );
}
