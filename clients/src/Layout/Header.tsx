import { useEffect, useState } from "react";
import "../SCSS/index.scss";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const openMenuSetting = () => {
    setOpenSetting(!openSetting);
  };
  const [theme, setTheme] = useState<boolean>(false);
  const handleDark = () => {
    if (theme === false) {
      setTheme(true);
    } else {
      setTheme(false);
    }
  };
  const navigate = useNavigate();
  let [listEmail, setListEmail] = useState<any>("");
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("email");
  };
  useEffect(() => {
    const list = localStorage.getItem("email");
    if (list) {
      setListEmail(JSON.parse(list));
    }
  }, []);
  const goToSetting = () => {
    navigate("/settingAccount");
  };
  return (
    <nav>
      <div className="nav-left">
        <img
          src="http://clipart-library.com/new_gallery/377-3776210_facebook-logo-vector-logovectornet-logo-facebook-2019-png.png"
          className="logo"
        />
        <ul style={{ display: "flex" }}>
          <li>
            <img
              src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3247957/notification-icon-md.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://cdn2.iconfinder.com/data/icons/business-and-management-16/24/mail_1-1024.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="http://the7sopranos.com/wp-content/uploads/2016/10/youtube-play-icon-75261.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div className="nav-right">
        <div className="search-box">
          <img
            src="https://openclipart.org/image/2400px/svg_to_png/213239/Search-icon.png"
            alt=""
          />
          <input type="text" placeholder="Search" />
        </div>
        <div onClick={openMenuSetting} className="nav-user-icon online">
          <img
            src="https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_0.jpg"
            alt=""
          />
        </div>
      </div>
      {/* setting menu */}
      {openSetting === true ? (
        <div className="settings-menu">
          {theme === true ? (
            <div onClick={handleDark} className="dark-btn dark-btn-on ">
              <span></span>
            </div>
          ) : (
            <div onClick={handleDark} className="dark-btn">
              <span></span>
            </div>
          )}

          <div className="settings-menu-inner">
            <div className="user-profile">
              <img src="https://live.staticflickr.com/1305/804659305_29815f2ec5_b.jpg" />
              <div>
                <p>John Nicholson</p>
                <a href="#">See your profile</a>
              </div>
            </div>
            <hr />
            <div className="user-profile">
              <img src="https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-danger-icon-png-image_4184096.jpg" />
              <div>
                <p>Give FeedBack</p>
                <a href="#">Help us to improve the new design</a>
              </div>
            </div>
            <hr />
            <div className="setting-links">
              <img
                src="https://www.pngall.com/wp-content/uploads/4/Settings-PNG0.png"
                className="settings-icon"
              />
              <a onClick={goToSetting} href="#">
                Settings & Privacy{" "}
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </a>
            </div>
            <div className="setting-links">
              <img
                src="https://khoinguonsangtao.vn/wp-content/uploads/2023/02/hinh-dau-cham-hoi-den.jpg"
                className="settings-icon"
              />
              <a href="#">
                Help & Support{" "}
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </a>
            </div>
            <div className="setting-links">
              <img
                src="https://img1.kienthucvui.vn/uploads/2021/08/04/tranh-to-mau-trang-khuyet-don-gian_094014477.png"
                className="settings-icon"
              />
              <a href="#">
                Display & Accessibility{" "}
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </a>
            </div>
            <div onClick={handleLogout} className="setting-links">
              <img
                src="https://cdn.pixabay.com/photo/2017/05/29/23/02/logging-out-2355227_1280.png"
                className="settings-icon"
              />
              <a href="#">
                Log Out{" "}
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}
