import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/reducers/addUser";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkPass, setCheckPass] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim().toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name) {
      newErrors.name = "Tên không được để trống";
    }

    if (!email) {
      newErrors.email = "Email không được để trống";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm cả chữ cái và số";
    }

    if (password !== checkPass) {
      newErrors.checkPass = "Mật khẩu không giống nhau";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const newUser: any = {
        userName: name,
        email: email,
        avatar:
          "https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg",
        banner:
          "https://img5.thuthuatphanmem.vn/uploads/2021/11/11/anh-doi-nui-dep-nhat_014852764.jpg",
        passWord: password,
        statusLock: false,
        follow: [
          {
            userId: 4,
            created_at: "2024-02-20T14:00:00Z",
          },
        ],
        friends: [
          {
            userId: 4,
            add_at: "2024-02-20T14:00:00Z",
          },
        ],
        groups: [],
        create_at: "2024-01-18T08:00:00Z",
      };

      navigate("/login");
      dispatch(addUser(newUser));
    }
  };
  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: 25 }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form
                      className="mx-1 mx-md-4"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                          {errors.name && (
                            <div id="userNameError" style={{ color: "red" }}>
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          {errors.email && (
                            <div id="userEmailError" style={{ color: "red" }}>
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          {errors.password && (
                            <div id="userPassError" style={{ color: "red" }}>
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            value={checkPass}
                            onChange={(e) => setCheckPass(e.target.value)}
                          />
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          {errors.checkPass && (
                            <div
                              id="userPassCheckError"
                              style={{ color: "red" }}
                            >
                              {errors.checkPass}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
