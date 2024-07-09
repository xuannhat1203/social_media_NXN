import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../store/reducers/createGroup";
import { getUsers } from "../store/reducers/getUser";

interface User {
  userName: string;
  email: string;
  profilePicture?: string;
  friends: User[];
}

export default function CreateGroups() {
  const dispatch = useDispatch();
  const getUser = useSelector((state: any) => state.user.user);
  const [email, setEmail] = useState<string>("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [nameGroup, setNameGroup] = useState<string>("");
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const findUser = getUser.find((user: User) => user.email === email);
  const listFriends: User[] = findUser ? findUser.friends : [];

  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      } else {
        alert("Please upload an image file.");
      }
    }
  };

  const createNewGroup = () => {
    const curDate = new Date();
    const inforGroup = {
      group_picture: image,
      banner:
        "https://timhomestay.vn/wp-content/uploads/2021/01/6086_hue_thanh_pho_cua_nhung_sac_hoa_12015327052019.jpg",
      bio: nameGroup,
      member: selectedFriends.map((userName) => ({
        userName,
        join_at: curDate.toISOString(),
      })),
      create_at: curDate.toISOString(),
    };
    dispatch(addGroup(inforGroup));
  };

  const handleFriendSelection = (userName: string) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(userName)
        ? prevSelected.filter((name) => name !== userName)
        : [...prevSelected, userName]
    );
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        {/* Bên trái */}
        <div className="left-sidebar">
          <div className="imp-links">
            <a href="#">
              <img
                src="http://pluspng.com/img-png/favicon-png-favicon-1024.png"
                alt="Latest News"
              />
              Latest News
            </a>
            <a href="#">
              <img
                src="https://vectorified.com/images/friends-icon-png-15.png"
                alt="Friends"
              />
              Friends
            </a>
            <a href="#">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
                alt="Group"
              />
              Group
            </a>
            <a href="#">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.M-e5j8-LdiK3jq9Bu5iI9QHaHa&pid=Api&P=0&h=180"
                alt="MarketPlace"
              />
              MarketPlace
            </a>
            <a href="#">
              <img
                src="https://www.nicepng.com/png/detail/46-461158_vector-library-clipart-watching-tv-television.png"
                alt="Watch"
              />
              Watch
            </a>
            <a href="#">See More</a>
          </div>
          <div className="shortcut-links">
            <p>Your Shortcuts</p>
            <a href="#">
              <img
                src="https://static-00.iconduck.com/assets.00/web-developer-illustration-1004x1024-wcqgbag3.png"
                alt="Web Developers"
              />
              Web Developers
            </a>
            <a href="#">
              <img
                src="https://www.pngplay.com/wp-content/uploads/5/Web-Design-Purple-PNG.png"
                alt="Web Design Course"
              />
              Web Design Course
            </a>
            <a href="#">
              <img
                src="https://sklc-tinymce-2021.s3.amazonaws.com/comp/2022/08/62_1659690052.png"
                alt="Full Stack Development"
              />
              Full Stack Development
            </a>
            <a href="#">
              <img
                src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-experts-line-icon-vector-png-image_6691211.png"
                alt="Website Experts"
              />
              Website Experts
            </a>
          </div>
        </div>
        {/* Ở giữa */}
        <div className="main-content">
          <div className="user-list">
            <div className="flex flex-col items-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
              <h1 className="text-3xl mb-6 text-gray-800 font-semibold">
                Create Group
              </h1>
              <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
                {image && (
                  <div className="mb-6">
                    <img
                      src={image}
                      alt="Selected"
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                )}
                <div className="mb-6">
                  <label className="block mb-2 font-bold text-gray-700">
                    Add New Photo
                  </label>
                  <input type="file" onChange={addImage} />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 font-bold text-gray-700">
                    ADD GROUP NAME
                  </label>
                  <input
                    onChange={(e) => setNameGroup(e.target.value)}
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Invite friends
                </h4>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-gray-500">
                      search
                    </span>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                      placeholder="Search friends..."
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-700 mb-3">
                    Suggest
                  </h4>

                  {listFriends.map((user: User) => (
                    <div
                      onClick={() => handleFriendSelection(user.userName)}
                      key={user.userName}
                      className={`flex items-center gap-3 border border-gray-300 rounded-md p-3 mb-3 hover:bg-gray-100 transition duration-300 ${
                        selectedFriends.includes(user.userName)
                          ? "bg-gray-200"
                          : ""
                      }`}
                    >
                      <img
                        src={
                          user.profilePicture ||
                          "https://via.placeholder.com/100"
                        }
                        alt={user.userName}
                        className="w-20 h-12 rounded-md object-cover shadow-md"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {user.userName}
                        </p>
                        <p className="text-gray-500">@{user.userName}</p>
                      </div>
                      {selectedFriends.includes(user.userName) && (
                        <span className="text-green-500">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={createNewGroup}
              className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
            >
              Create Group
            </button>
          </div>
        </div>
        {/* Bên phải */}
        <div className="right-sidebar">
          <div className="sidebar-title">
            <h4>Events</h4>
            <a href="#">See All</a>
          </div>
          <div className="event">
            <div className="left-event">
              <h3>18</h3>
              <span>March</span>
            </div>
            <div className="right-event">
              <h4>Social Media</h4>
              <p>
                <i className="fa fa-clock-o"></i> 10am - 12pm
              </p>
              <p>
                <i className="fa fa-map-marker"></i> Willson Tech Park
              </p>
            </div>
          </div>
          <div className="event">
            <div className="left-event">
              <h3>22</h3>
              <span>June</span>
            </div>
            <div className="right-event">
              <h4>Mobile Marketing</h4>
              <p>
                <i className="fa fa-clock-o"></i> 10am - 12pm
              </p>
              <p>
                <i className="fa fa-map-marker"></i> Willson Tech Park
              </p>
            </div>
          </div>
          <div className="sidebar-title">
            <h4>Advertisement</h4>
            <a href="#">Close</a>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Adobe_Illustrator_CS6_Icon.png/1987px-Adobe_Illustrator_CS6_Icon.png"
            className="sidebar-ads"
            alt="Advertisement"
          />
          <div className="sidebar-title">
            <h4>Conversations</h4>
            <a href="#">Hide Chat</a>
          </div>
        </div>
      </div>
    </>
  );
}
