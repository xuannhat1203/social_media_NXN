import React, { useEffect, useState } from "react";
import "../SCSS/index.scss";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../store/reducers/getUser";
import { filterUser } from "../store/reducers/filterFriend";
import { getPost } from "../store/reducers/getListPost";
import storage from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addPost, getListStoryFriends } from "../store/reducers/post";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import getComment, {
  addComment,
  listComment,
} from "../store/reducers/getComment";
import { addToBlock } from "../store/reducers/addUserToBlock";
import { clickReact } from "../store/reducers/addReact";
import { getBanner } from "../store/reducers/getBanner";
import ModalStory from "./ModalStory";
export default function Body() {
  const [listEmail, setListEmail] = useState<string | null>(null);
  const [comments, setComments] = useState("");
  const [listPost, setListPost] = useState<string[]>([]);
  const [render, setRender] = useState<any[]>([]);
  const [image, setImage] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [statusComment, setStatusComment] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [listComments, setListComments] = useState<any[]>([]);
  const getBanners = useSelector((state: any) => state.banner.banner);
  const [listFriends, setListFriends] = useState([]);
  const getListStory = useSelector((state: any) => state.addPost.story);
  const [renderStory, setRenderStory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getListStoryFriends());
  }, [dispatch]);
  var d = new Date();
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    const find = localStorage.getItem("email");
    if (find) {
      setEmail(JSON.parse(find));
    }
  }, []);
  useEffect(() => {
    if (getListStory.length > 0 && listFriends.length > 0) {
      const filteredStories = getListStory.filter((story: any) =>
        listFriends.some((friend: any) => friend.userName === story.userName)
      );
      setRenderStory(filteredStories);
    } else {
      setRenderStory([]);
    }
  }, [getListStory, listFriends]);
  const goToSuggestFriends = () => {
    navigate("/friends");
  };
  const [openHide, setOpenHide] = useState<boolean>(false);
  const getListUser = useSelector((state: any) => state.user.user);
  const getListPost = useSelector((state: any) => state.filter.filter);
  const post = useSelector((state: any) => state.post.post);
  const comment = useSelector((state: any) => state.comment.comment);
  const finduser = getListUser.filter((user: any) => user.email === listEmail);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImage(Array.from(files));
    }
  };

  const openComment = (id: number) => {
    setSelectedPostId(id);
    const find = comment.filter((post: any) => post.post_id === id);
    if (find) {
      setListComments(find);
    }

    setStatusComment(statusComment === id ? null : id);

    const findUser = getListUser.find(
      (user: any) => user.id === find[0]?.user_id
    );

    if (findUser) {
      setAvatars(findUser.avatar);
    }
  };
  const handleUpLoad = async () => {
    if (image.length === 0) return;
    const imageUrls = await Promise.all(
      image.map(async (file: any) => {
        const imageRef = ref(storage, `image/${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        return await getDownloadURL(snapshot.ref);
      })
    );
    const newPost = {
      user_id: finduser[0].id,
      group_id: -1,
      content: title,
      userName: finduser[0].userName,
      image: imageUrls,
      private: false,
      reactions: [
        {
          user_id: 2,
          type: "laugh",
          create_at: dayjs(),
        },
      ],
      create_at: dayjs(),
    };
    dispatch(addPost(newPost));
    setTitle("");
    setImage([]);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  const [avatars, setAvatars] = useState<string>("");
  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setListEmail(JSON.parse(list));
    }
  }, []);

  useEffect(() => {
    dispatch(listComment());
  }, [dispatch]);

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
      const findUser = getListUser.find((user: any) => user.email === email);
      if (findUser) {
        const friendsList = findUser.friends.map(
          (friend: any) => friend.userName
        );

        const filteredPosts = post.filter(
          (p: any) =>
            p.statusHide === false &&
            (friendsList.includes(p.userName) ||
              (p.block && !p.block.includes(findUser.userName)))
        );

        setRender(filteredPosts);
      }
    }
  }, [getListPost, getListUser, post, email]);

  const goToGroup = () => {
    navigate("/group");
  };
  const openSelect = () => {
    setOpenHide(!openHide);
  };
  const deletePost = async (id: number) => {
    const find = getListUser.find((user: any) => user.email === email);
    if (find) {
      await dispatch(addToBlock({ id, nameIsBlocked: find.userName }));
      dispatch(getPost());
    }
  };
  const commentPost = async (idPost: any) => {
    const find = getListUser.find((user: any) => user.email === email);
    if (find) {
      const newComment = {
        post_id: idPost,
        user_id: find.id,
        image: "",
        userName: find.userName,
        content: comments,
        reactions: [],
        create_at: d.getDay(),
      };
      await dispatch(addComment(newComment));
      setComments("");
      dispatch(listComment());
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      const updatedComments = comment.filter(
        (c: any) => c.post_id === selectedPostId
      );
      setListComments(updatedComments);
    }
  }, [comment, selectedPostId]);
  const likePost = (idPost: number) => {
    const findUser = getListUser.find((user: any) => user.email === email);
    if (findUser) {
      dispatch(clickReact({ id: findUser.id, idPost }));
    }
  };
  useEffect(() => {
    const findUser = getListUser.find((user: any) => user.email === email);
    if (findUser) {
      setListFriends(findUser.friends);
    }
  });
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
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
            <a onClick={goToSuggestFriends} href="#">
              <img
                src="https://vectorified.com/images/friends-icon-png-15.png"
                alt="Friends"
              />
              Friends
            </a>
            <a onClick={goToGroup} href="#">
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
          <div className="story-gallery">
            <div onClick={openModal} className="story story1">
              <img src="https://png.pngtree.com/element_our/20190528/ourmid/pngtree-flat-plus-image_1127818.jpg" />
              <p>Post Story</p>
            </div>
            {getListStory.map((story: any) => (
              <div
                key={story.id}
                style={{ backgroundImage: `url(${story.storyImage})` }}
                className={`story story${story.id}`}
              >
                <p>{story.userName}</p>
              </div>
            ))}
            <ModalStory isOpen={isModalOpen} onClose={closeModal} />
          </div>

          <div className="story-gallery">
            <div className="post-input-container">
              <div className="user-profile">
                <img
                  src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg"
                  alt="Xuân Nhất"
                />
                <div>
                  <p>Xuân Nhất</p>
                  <small>
                    <select>
                      <option value="Public">Public</option>
                      <option value="Private">Private</option>
                    </select>{" "}
                    <i className="fa-solid fa-caret-down"></i>
                  </small>
                </div>
              </div>
              <textarea
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                placeholder="What is on your mind, John?"
                value={title}
              ></textarea>
              <div className="add-post-links">
                <a href="#">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.bCFKDTi8GCLFyuRCzLZRnQAAAA&pid=Api&P=0&h=180"
                    alt="Live Video"
                  />
                  Live Video
                </a>
                <a href="#">
                  <img
                    src="https://icon-library.com/images/photography-icon-png/photography-icon-png-7.jpg"
                    alt="Your Photo"
                  />
                  <input onChange={handleChangeImage} multiple type="file" />{" "}
                  Your Photo
                </a>
                <a href="#">
                  <img
                    src="https://tse2.mm.bing.net/th?id=OIP.2nttVb7US8LmRfU6NtsxgwHaHp&pid=Api&P=0&h=180"
                    alt="Feeling / Activity"
                  />
                  Feeling / Activity
                </a>
                <button onClick={handleUpLoad}>Đăng bài</button>
              </div>
            </div>
          </div>
          {render.map(
            (user: any) =>
              user && (
                <div key={user.id} className="post-container">
                  <div className="post-row">
                    <div className="user-profile">
                      <img
                        src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg"
                        alt={user.userName}
                      />
                      <div>
                        <p>{user.userName}</p>
                        <span>{user.userName}</span>
                        <p>{user.content}</p>
                      </div>
                    </div>
                    {openHide === true && (
                      <div
                        className="hire"
                        style={{
                          width: "150px",
                          border: "1px solid black",
                          height: "60px",
                        }}
                      >
                        <div
                          onClick={() => deletePost(user.user_id)}
                          className="hover"
                          style={{
                            width: "150px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Xóa bài
                        </div>
                        <div
                          className="hover"
                          style={{
                            width: "150px",
                            height: "30px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Ẩn bài
                        </div>
                      </div>
                    )}
                    <a onClick={openSelect} href="#">
                      <i className="fa-solid fa-ellipsis-v"></i>
                    </a>
                  </div>
                  <p className="post-text">{user.title}</p>
                  <div className="cover">
                    {user.image.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img}
                        alt={user.title}
                        className="post-img"
                        style={{
                          width: "200px",
                          height: "300px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                  <div className="post-row">
                    <div className="activity-icons">
                      <div onClick={() => likePost(user.id)}>
                        <img
                          src="https://img.icons8.com/external-justicon-flat-justicon/344/external-like-notifications-justicon-flat-justicon.png"
                          alt="Like"
                        />
                        {
                          user.reactions.filter(
                            (reaction: any) => reaction.type === "like"
                          ).length
                        }
                      </div>
                      <div onClick={() => openComment(user.id)}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/25/25384.png"
                          alt="Comments"
                        />
                        45
                      </div>
                      <div>
                        <img
                          src="http://www.blockchainforgrownups.com/wp-content/uploads/2019/08/78-782173_share-png-share-button-icon-png-transparent-png.png.jpeg"
                          alt="Shares"
                        />
                        20
                      </div>
                    </div>
                    <div className="post-profile-icon">
                      <img
                        src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg"
                        alt="Xuân Nhất"
                      />
                      <i className="fa fa-caret-down"></i>
                    </div>
                  </div>
                  {/* Hiển thị các bình luận */}
                  {statusComment === user.id && (
                    <div className="comments-section">
                      {listComments.map((comment: any) => (
                        <div key={comment.id} className="comment">
                          <img src={avatars} alt="" />
                          <p>
                            <strong>{comment.userName}:</strong>{" "}
                            {comment.content}
                          </p>
                        </div>
                      ))}
                      <div>
                        <input
                          onChange={(e) => setComments(e.target.value)}
                          type="text"
                          placeholder="nhập bình luận của bạn"
                        />
                        <button onClick={() => commentPost(user.id)}>
                          Bình luận
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
          )}
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
