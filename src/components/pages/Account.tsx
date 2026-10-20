import { useNavigate } from "react-router-dom";
import "./Account.css";
import account1 from "../pages/../../assets/66ac9963603fd2bb788bc2e095dae7857ae154b2.png"
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
const Account = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <section className="acc container py-5">
      <div className="acc-card row g-0 border rounded-4 overflow-hidden mx-auto">
        <div className="col-md-6 d-none d-md-block">
          <img
            className="acc-img"
            src={account1}
            alt="fasco"
          />
        </div>

        <div className="col-md-6 position-relative p-5">
          <div className="acc-form-box mx-auto">
            <h1 className="acc-logo">FASCO</h1>

            <h3 className="acc-title">Sign In To FASCO</h3>

            <div className="d-flex gap-3">
              <button type="button" className="btn btn-outline-primary btn-sm w-50">
                <FcGoogle /> Sign up with Google
              </button>
              <button type="button" className="btn btn-outline-primary btn-sm w-50">
                <MdEmail /> Sign up with Email
              </button>
            </div>

            <div className="acc-or d-flex justify-content-center align-items-center gap-2 my-4">
              <span></span>
              <p className="mb-0 fw-bold ">OR</p>
              <span></span>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control border-0 border-bottom rounded-0 shadow-none mb-3"
                placeholder="Email"
              />
              <input
                type="password"
                className="form-control border-0 border-bottom rounded-0 shadow-none mb-3"
                placeholder="Password"
              />

              <button type="submit" className="btn btn-dark w-100 mt-4 shadow">
                Sign In
              </button>
              <button type="button" className="btn btn-outline-primary w-100 mt-2">
                Register Now
              </button>
            </form>

            <a className="d-block text-end small fw-bold mt-2 text-decoration-none" href="#">
              Forget Password?
            </a>
          </div>

          <p className="small position-absolute bottom-0 end-0 m-3">
            FASCO Terms & Codnitions
          </p>
        </div>
      </div>
    </section>
  );
};

export default Account;