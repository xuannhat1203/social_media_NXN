import { useEffect, useState } from "react";
import "../SCSS/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/reducers/getUser";
import { filterUser } from "../store/reducers/filterFriend";
import { getPost } from "../store/reducers/getListPost";
export default function Body() {
  const [listEmail, setListEmail] = useState<string | null>(null);
  const [listPost, setListPost] = useState<string[]>([]);
  const [render, setRender] = useState<any[]>([]);
  const dispatch = useDispatch();
  const getListUser = useSelector((state: any) => state.user.user);
  const getListPost = useSelector((state: any) => state.filter.filter);
  const post = useSelector((state: any) => state.post.post);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setListEmail(JSON.parse(list));
    }
  }, []);
  const findUsers = getListUser.find((user: any) => user.email === listEmail);

  useEffect(() => {
    if (listEmail && getListUser) {
      const find = getListUser.find((user: any) => user.email === listEmail);
      if (find) {
        setListPost(find.friends.map((friend: any) => friend.userName));
      }
    }
  }, [listEmail, getListUser]);

  useEffect(() => {
    if (listPost.length > 0 && getListUser.length > 0) {
      dispatch(filterUser({ listPost, listUser: getListUser }));
    }
  }, [listPost, getListUser, dispatch]);

  useEffect(() => {
    if (getListPost.length > 0 && post.length > 0) {
      const filteredPosts = getListPost
        .map((postUserName: any) => {
          const user = getListUser.find(
            (user: any) => user.userName === postUserName
          );
          if (user) {
            return post.find((p: any) => p.user_id === user.id);
          }
          return null;
        })
        .filter((post: any) => post !== null);

      setRender(filteredPosts as any[]);
    }
  }, [getListPost, getListUser, post]);

  return (
    <>
      <div className="container">
        {/* Bên trái */}
        <>
          {" "}
          <div className="left-sidebar">
            <div className="imp-links">
              <a href="#">
                <img
                  src="http://pluspng.com/img-png/favicon-png-favicon-1024.png"
                  alt=""
                />
                Latest News
              </a>
              <a href="">
                <img
                  src="https://vectorified.com/images/friends-icon-png-15.png"
                  alt=""
                />
                Friends
              </a>
              <a href="#">
                <img
                  src="https://cdn.pixabay.com/photo/2016/11/14/17/39/group-1824145_1280.png"
                  alt=""
                />
                Group
              </a>
              <a href="#">
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.M-e5j8-LdiK3jq9Bu5iI9QHaHa&pid=Api&P=0&h=180"
                  alt=""
                />
                MarketPlace
              </a>
              <a href="">
                <img
                  src="https://www.nicepng.com/png/detail/46-461158_vector-library-clipart-watching-tv-television.png"
                  alt=""
                />
                Watch
              </a>
              <a href="">See More</a>
            </div>
            <div className="shortcut-links">
              <p>Your Shortcuts</p>
              <a href="">
                <img
                  src="https://static-00.iconduck.com/assets.00/web-developer-illustration-1004x1024-wcqgbag3.png"
                  alt=""
                />
                Web Developers
              </a>
              <a href="">
                <img
                  src="https://www.pngplay.com/wp-content/uploads/5/Web-Design-Purple-PNG.png"
                  alt=""
                />
                Web Design Course
              </a>
              <a href="">
                <img
                  src="https://sklc-tinymce-2021.s3.amazonaws.com/comp/2022/08/62_1659690052.png"
                  alt=""
                />
                Full Stack Development
              </a>
              <a href="">
                <img
                  src="https://png.pngtree.com/png-vector/20230407/ourmid/pngtree-experts-line-icon-vector-png-image_6691211.png"
                  alt=""
                />
                Website Experts
              </a>
            </div>
          </div>
        </>
        {/* Ở giữa */}
        <div className="main-content">
          <div className="story-gallery">
            <div className="story story1">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p className="p">Post Story</p>
            </div>
            <div className="story story2">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p className="p">Post Story</p>
            </div>
            <div className="story story3">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p className="p">Post Story</p>
            </div>
            <div className="story story4">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p className="p">Post Story</p>
            </div>
            <div className="story story5">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p className="p">Post Story</p>
            </div>
          </div>
          <div className="write-post-container">
            <div className="user-profile">
              <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
              <div>
                <p>Xuân Nhất</p>
                <small>
                  Public <i className="fa-solid fa-caret-down"></i>
                </small>
              </div>
            </div>
            <div className="post-input-container">
              <textarea
                rows={3}
                placeholder="What is on your mind, John?"
              ></textarea>
              <div className="add-post-links">
                <a href="">
                  <img src="https://tse2.mm.bing.net/th?id=OIP.bCFKDTi8GCLFyuRCzLZRnQAAAA&pid=Api&P=0&h=180" />{" "}
                  Live Video
                </a>
                <a href="">
                  <img src="https://icon-library.com/images/photography-icon-png/photography-icon-png-7.jpg" />{" "}
                  Your Photo
                </a>
                <a href="">
                  <img src="https://tse2.mm.bing.net/th?id=OIP.2nttVb7US8LmRfU6NtsxgwHaHp&pid=Api&P=0&h=180" />{" "}
                  Feling / Activity
                </a>
              </div>
            </div>
          </div>
          {render.map((user: any) => (
            <div className="post-container">
              <div className="post-row">
                <div className="user-profile">
                  <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
                  <div>
                    <p>{user.userName}</p>
                    <span>{user.create_at}</span>
                  </div>
                </div>
                <a href="">
                  <i className="fa-solid fa-ellipsis-v"></i>
                </a>
              </div>
              <p className="post-text">
                {user.content}
                <a href="#">#EasyTutorials</a>
                {""}
                <a href="#">#YoutubeChannel</a>
                <img src={user.image[0]} className="post-img" />
                <div className="post-row">
                  <div className="activity-icons"></div>
                  <div className="post-profile-icon"></div>
                </div>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="activity-icons">
                  <div>
                    <img
                      className="image1"
                      src="https://pngimg.com/uploads/like/like_PNG55.png"
                    />
                    120
                  </div>
                  <div>
                    <img src="https://www.freeiconspng.com/uploads/comment-png-1.png" />
                    Comments
                  </div>
                  <div>
                    <img src="https://icon-library.com/images/facebook-share-icon-png/facebook-share-icon-png-15.jpg" />
                    Share
                  </div>
                </div>
                <div className="post-profile-icon">
                  <img src="http://clipartmag.com/images/location-icon-png-23.png" />
                  <i className="fa-solid fa-caret-down"></i>
                </div>
              </div>
            </div>
          ))}
          <div className="post-container">
            <div className="post-row">
              <div className="user-profile">
                <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
                <div>
                  <p>John Nicholson</p>
                  <span>June 24 2021, 13:40 pm</span>
                </div>
              </div>
              <a href="">
                <i className="fa-solid fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="post-text">
              Subscribe <span>Lorem ipsum </span> dolor sit amet consectetur,
              adipisicing elit. Libero sapiente saepe odit ratione sed vitae!{" "}
              <a href="#">#EasyTutorials</a>
              {""}
              <a href="#">#YoutubeChannel</a>
              <img
                src="https://c.stocksy.com/a/snq900/z9/2347932.jpg"
                className="post-img"
              />
              <div className="post-row">
                <div className="activity-icons"></div>
                <div className="post-profile-icon"></div>
              </div>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="activity-icons">
                <div>
                  <img
                    className="image1"
                    src="https://pngimg.com/uploads/like/like_PNG55.png"
                  />
                  120
                </div>
                <div>
                  <img src="https://www.freeiconspng.com/uploads/comment-png-1.png" />
                  Comments
                </div>
                <div>
                  <img src="https://icon-library.com/images/facebook-share-icon-png/facebook-share-icon-png-15.jpg" />
                  Share
                </div>
              </div>
              <div className="post-profile-icon">
                <img src="http://clipartmag.com/images/location-icon-png-23.png" />
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="post-container">
            <div className="post-row">
              <div className="user-profile">
                <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
                <div>
                  <p>John Nicholson</p>
                  <span>June 24 2021, 13:40 pm</span>
                </div>
              </div>
              <a href="">
                <i className="fa-solid fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="post-text">
              Subscribe <span>Lorem ipsum </span> dolor sit amet consectetur,
              adipisicing elit. Libero sapiente saepe odit ratione sed vitae!{" "}
              <a href="#">#EasyTutorials</a>
              {""}
              <a href="#">#YoutubeChannel</a>
              <img
                src="https://c.stocksy.com/a/snq900/z9/2347932.jpg"
                className="post-img"
              />
              <div className="post-row">
                <div className="activity-icons"></div>
                <div className="post-profile-icon"></div>
              </div>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="activity-icons">
                <div>
                  <img
                    className="image1"
                    src="https://pngimg.com/uploads/like/like_PNG55.png"
                  />
                  120
                </div>
                <div>
                  <img src="https://www.freeiconspng.com/uploads/comment-png-1.png" />
                  Comments
                </div>
                <div>
                  <img src="https://icon-library.com/images/facebook-share-icon-png/facebook-share-icon-png-15.jpg" />
                  Share
                </div>
              </div>
              <div className="post-profile-icon">
                <img src="http://clipartmag.com/images/location-icon-png-23.png" />
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="post-container">
            <div className="post-row">
              <div className="user-profile">
                <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
                <div>
                  <p>John Nicholson</p>
                  <span>June 24 2021, 13:40 pm</span>
                </div>
              </div>
              <a href="">
                <i className="fa-solid fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="post-text">
              Subscribe <span>Lorem ipsum </span> dolor sit amet consectetur,
              adipisicing elit. Libero sapiente saepe odit ratione sed vitae!{" "}
              <a href="#">#EasyTutorials</a>
              {""}
              <a href="#">#YoutubeChannel</a>
              <img
                src="https://c.stocksy.com/a/snq900/z9/2347932.jpg"
                className="post-img"
              />
              <div className="post-row">
                <div className="activity-icons"></div>
                <div className="post-profile-icon"></div>
              </div>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="activity-icons">
                <div>
                  <img
                    className="image1"
                    src="https://pngimg.com/uploads/like/like_PNG55.png"
                  />
                  120
                </div>
                <div>
                  <img src="https://www.freeiconspng.com/uploads/comment-png-1.png" />
                  Comments
                </div>
                <div>
                  <img src="https://icon-library.com/images/facebook-share-icon-png/facebook-share-icon-png-15.jpg" />
                  Share
                </div>
              </div>
              <div className="post-profile-icon">
                <img src="http://clipartmag.com/images/location-icon-png-23.png" />
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className="post-container">
            <div className="post-row">
              <div className="user-profile">
                <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
                <div>
                  <p>John Nicholson</p>
                  <span>June 24 2021, 13:40 pm</span>
                </div>
              </div>
              <a href="">
                <i className="fa-solid fa-ellipsis-v"></i>
              </a>
            </div>
            <p className="post-text">
              Subscribe <span>Lorem ipsum </span> dolor sit amet consectetur,
              adipisicing elit. Libero sapiente saepe odit ratione sed vitae!{" "}
              <a href="#">#EasyTutorials</a>
              {""}
              <a href="#">#YoutubeChannel</a>
              <img
                src="https://c.stocksy.com/a/snq900/z9/2347932.jpg"
                className="post-img"
              />
              <div className="post-row">
                <div className="activity-icons"></div>
                <div className="post-profile-icon"></div>
              </div>
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="activity-icons">
                <div>
                  <img
                    className="image1"
                    src="https://pngimg.com/uploads/like/like_PNG55.png"
                  />
                  120
                </div>
                <div>
                  <img src="https://www.freeiconspng.com/uploads/comment-png-1.png" />
                  Comments
                </div>
                <div>
                  <img src="https://icon-library.com/images/facebook-share-icon-png/facebook-share-icon-png-15.jpg" />
                  Share
                </div>
              </div>
              <div className="post-profile-icon">
                <img src="http://clipartmag.com/images/location-icon-png-23.png" />
                <i className="fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <button type="button" className="load-more-btn">
            Load More
          </button>
        </div>

        {/* Bên phải */}
        <div className="right-sidebar">
          <div className="sidebar-title">
            <h4>Events</h4>
            <a href="">See All</a>
          </div>
          <div className="event">
            <div className="left-event">
              <h3>18</h3>
              <span>March</span>
            </div>
            <div className="right-event">
              <h4>Social Media</h4>
              <p>
                <i className="fa-solid fa-location-dot"></i>Will tech park
              </p>
              <a href="">More Infor</a>
            </div>
          </div>
          <div className="event">
            <div className="left-event">
              <h3>22</h3>
              <span>June</span>
            </div>
            <div className="right-event">
              <h4>
                {" "}
                <i className="fa-solid fa-location-dot"></i>Mobile Media
              </h4>
              <p>Will tech park</p>
              <a href="">More Infor</a>
            </div>
          </div>
          <div className="sidebar-title">
            <h4>Advertisement</h4>
            <a href="">Close</a>
          </div>
          <img
            src="https://cdn0.iconfinder.com/data/icons/advertising-39/512/advertising_television_ads-4096.png"
            className="sidebar-ads"
          />
          <div className="sidebar-title">
            <h4>Conversation</h4>
            <a href="">Hide Chat</a>
          </div>
          <div className="online-list">
            <div className="online">
              <img
                src="https://icon-library.com/images/member-icon/member-icon-4.jpg"
                alt=""
              />
            </div>
            <p>Alision Mina</p>
          </div>
          <div className="online-list">
            <div className="online">
              <img
                src="https://icon-library.com/images/member-icon/member-icon-4.jpg"
                alt=""
              />
            </div>
            <p>Alision Mina</p>
          </div>
          <div className="online-list">
            <div className="online">
              <img
                src="https://icon-library.com/images/member-icon/member-icon-4.jpg"
                alt=""
              />
            </div>
            <p>Alision Mina</p>
          </div>
          <div className="online-list">
            <div className="online">
              <img
                src="https://icon-library.com/images/member-icon/member-icon-4.jpg"
                alt=""
              />
            </div>
            <p>Alision Mina</p>
          </div>
          <div className="online-list">
            <div className="online">
              <img
                src="https://icon-library.com/images/member-icon/member-icon-4.jpg"
                alt=""
              />
            </div>
            <p>Alision Mina</p>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>
          Copyright 2024 - Thấy trai đẹp code web bao giờ chưa? - Đẹp trai lắm
          đó
        </p>
        <p>Mấy người thấy zai đẹp là hạnh phúc lắm đó nha</p>
      </div>
    </>
  );
}
