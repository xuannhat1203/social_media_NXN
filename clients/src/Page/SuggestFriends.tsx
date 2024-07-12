import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getUsers } from "../store/reducers/getUser";
import {
  addFriendToUser,
  addFriendToSuggested,
} from "../store/reducers/addFriends";
import "../SCSS/suggest.scss";
import { useNavigate } from "react-router-dom";

export default function SuggestFriends() {
  const getUser = useSelector((state: any) => state.user.user);
  const [email, setEmail] = useState<string>("");
  const findUser = getUser.find((user: any) => user.email === email);
  const getBanners = useSelector((state: any) => state.banner.banner);
  const listFriends: any[] = findUser ? findUser.friends : [];
  const [sentInvites, setSentInvites] = useState<string[]>([]);
  const [addedFriends, setAddedFriends] = useState<string[]>([]);
  const dispatch = useDispatch();
  const curDate = new Date();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(JSON.parse(storedEmail));
    }
  }, []);

  const friendsList =
    findUser?.friends.map((friend: any) => friend.userName) || [];
  const filteredUsers = getUser.filter(
    (user: any) =>
      user.email !== email &&
      !friendsList.includes(user.userName) &&
      !sentInvites.includes(user.userName) &&
      !addedFriends.includes(user.userName) &&
      user.email !== "admin1203@gmail.com"
  );

  const addFriendHandler = async (userName: string) => {
    const friendToAdd = getUser.find((user: any) => user.userName === userName);
    const newFriend = {
      userId: friendToAdd.id,
      userName: findUser.userName,
      add_at: curDate.toISOString(),
    };

    try {
      await dispatch(
        addFriendToUser({ userId: friendToAdd.id, newFriend })
      ).unwrap();
      setSentInvites([...sentInvites, userName]);
    } catch (error) {}
  };

  const addFriend = async (userName: string) => {
    const friendToAdd = getUser.find((user: any) => user.userName === userName);
    const newFriend = {
      userId: friendToAdd.id,
      userName: friendToAdd.userName,
      add_at: curDate.toISOString(),
    };
    try {
      await dispatch(
        addFriendToSuggested({ userId: findUser.id, newFriend })
      ).unwrap();
      setAddedFriends([...addedFriends, userName]);
    } catch (error) {}
  };
  const goToGroups = () => {
    navigate("/group");
  };
  return (
    <>
      <Header />
      <div className="container">
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
            <a onClick={goToGroups} href="#">
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
            <h2>Suggested Friends</h2>
            {filteredUsers.map((user: any) => (
              <div key={user.id}>
                <div>
                  <img src={user.avatar} alt="" />
                  <h5>{user.userName}</h5>
                </div>
                <div>
                  <button onClick={() => addFriendHandler(user.userName)}>
                    Send Invite
                  </button>
                  <button onClick={() => addFriend(user.userName)}>
                    Add Friend
                  </button>
                </div>
              </div>
            ))}
            <h2>Invitation</h2>
            {findUser?.invitation.map((user: any) => (
              <div key={user.userId}>
                <div>
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg"
                    alt=""
                  />
                  <h5>{user.userName}</h5>
                </div>
                <div>
                  <button>Remove</button>
                  <button onClick={() => addFriend(user.userName)}>
                    Accept
                  </button>
                </div>
              </div>
            ))}
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
          {getBanners.map((banner: any) => (
            <img key={banner.id} src={banner.banner} />
          ))}
          <br />
          <div className="sidebar-title">
            <h4>Conversations</h4>
            <a href="#">Hide Chat</a>
          </div>
          {listFriends.map((item: any) => (
            <div className="online-list" key={item.userName}>
              <div className="online">
                <img
                  src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg"
                  alt="Xuân Nhất"
                />
              </div>
              <p>{item.userName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
