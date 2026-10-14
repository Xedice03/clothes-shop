import { useEffect, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./DealsMonth.css";
import women from "../pages/../../assets/women.png";
import women2 from "../pages/../../assets/women2.png";
import women3 from "../pages/../../assets/women3.png";

// Deals Of The Month slaydları
const slides = [
  { img: women, no: "01", name: "Spring Sale", title: "30% OFF" },
  { img: women2, no: "02", name: "Summer Sale", title: "25% OFF" },
  { img: women3, no: "03", name: "Autumn Sale", title: "20% OFF" },
];

function DealsOfMonth() {
  const [current, setCurrent] = useState(0);
  const [seconds, setSeconds] = useState(2 * 86400 + 6 * 3600 + 5 * 60 + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const two = (n: number) => String(n).padStart(2, "0");

  const next = () => setCurrent((current + 1) % slides.length);
  const prev = () => setCurrent((current - 1 + slides.length) % slides.length);

  // aktiv slayd 
  const ordered = [...slides.slice(current), ...slides.slice(0, current)];

  const times = [
    { value: days, label: "Days" },
    { value: hours, label: "Hr" },
    { value: mins, label: "Mins" },
    { value: secs, label: "Sec" },
  ];

  return (
    <div className="deals py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          {/* Sol tərəf */}
          <div className="col-12 col-lg-4">
            <h2 className="deals-title mb-4">Deals Of The Month</h2>
            <p className="small text-secondary mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <button type="button" className="btn btn-dark px-5 shadow mb-4">
              Buy Now
            </button>

            <h5 className="fw-normal mb-3">Hurry, Before It’s Too Late!</h5>

            <div className="d-flex gap-3">
              {times.map((t) => (
                <div className="text-center" key={t.label}>
                  <div className="time-box mb-1">{two(t.value)}</div>
                  <span className="small text-secondary">{t.label}</span>
                </div>
              ))}
            </div>

            <div className="d-flex gap-2 justify-content-lg-end mt-4">
              <button type="button" className="arrow-btn" onClick={prev}>
                <BsChevronLeft />
              </button>
              <button type="button" className="arrow-btn" onClick={next}>
                <BsChevronRight />
              </button>
            </div>
          </div>

          {/* Sağ tərəf */}
          <div className="col-12 col-lg-8">
            <div className=" d-flex align-items-start gap-3">
              {ordered.map((slide, index) => (
                <div
                  key={slide.no}
                  className={index === 0 ? "deal-item deal-big" : "deal-item deal-small"}
                >
                  <img src={slide.img} alt={slide.name} />

                  {index === 0 && (
                    <div className="deal-label">
                      <p className="small text-secondary mb-1">
                        {slide.no} {slide.name}
                      </p>
                      <h4 className="fw-normal mb-0">{slide.title}</h4>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DealsOfMonth;