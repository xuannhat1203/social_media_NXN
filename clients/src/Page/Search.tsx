import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getUsers } from "../store/reducers/getUser";
import { searchGroup, searchUser } from "../store/reducers/search";
import { addMember, getGroup2 } from "../store/reducers/getListGroup";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export default function Search() {
  const getUser = useSelector((state: any) => state.user.user);
  const searchResultsUser = useSelector((state: any) => state.search.search);
  const searchResultsGroup = useSelector((state: any) => state.search.group);
  const [search, setSearch] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const getGroups = useSelector((state: any) => state.group.group);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const find = localStorage.getItem("search");
    if (find) {
      setSearch(JSON.parse(find));
    }
    const find2 = localStorage.getItem("email");
    if (find2) {
      setEmail(JSON.parse(find2));
    }
  }, []);
  useEffect(() => {
    dispatch(getGroup2());
  }, [dispatch]);
  const findMyAccount = getUser.find((user: any) => user.email === email);
  const friends = findMyAccount ? findMyAccount.friends || [] : [];
  useEffect(() => {
    if (search) {
      dispatch(searchUser({ nameUser: search, listUser: getUser }));
      dispatch(searchGroup({ nameGroup: search, listGroup: getGroups }));
    }
  }, [search, dispatch, getUser, getGroups]);
  const goToGroups = () => {
    navigate("/group");
  };
  const joinGroup = (id: number) => {
    const findMyAccount = getUser.find((user: any) => user.email === email);
    const member = {
      userName: findMyAccount.userName,
      join_at: dayjs().format(),
    };
    dispatch(addMember({ idGroup: id, member }));
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
            <h2>The person or group you want to find</h2>
            {searchResultsUser.map((user: any) => {
              const isFriend = friends.some(
                (friend: any) => friend.userName === user.userName
              );
              return (
                <div key={user.id}>
                  <div>
                    <img src={user.avatar} alt="" />
                  </div>
                  <div>
                    <p>{user.userName}</p>
                    <p>@{user.userName}</p>
                  </div>
                  <div>
                    {isFriend ? (
                      <button>Bạn bè</button>
                    ) : (
                      <button>Thêm bạn bè</button>
                    )}
                    <button>View Page</button>
                  </div>
                </div>
              );
            })}
            {searchResultsGroup.map((group: any) => (
              <div key={group.id}>
                <div>
                  <img
                    src="https://tse4.mm.bing.net/th?id=OIP.5YJYPEw7xkhVc0GHtpdG9QHaHv&pid=Api&P=0&h=180"
                    alt=""
                  />
                </div>
                <div>
                  <p>{group.name}</p>
                  <p>{group.bio}</p>
                </div>
                <div>
                  <button onClick={() => joinGroup(group.id)}>
                    Join Group
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
