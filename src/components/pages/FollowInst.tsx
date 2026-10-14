import "./FollowInst.css";
import insta1 from "../pages/../../assets/men.png";
import insta2 from "../pages/../../assets/womeninst.png";

function Instagram() {
  return (
    <div className="insta">
      <h2>Follow Us On Instagram</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Scelerisque duis ultrices sollicitudin aliquam sem.
      </p>

      <div className="insta-strip">
        <img src={insta1} alt="instagram" />
        <img src={insta2} alt="instagram" />
        <img src={insta1} alt="instagram" />
        <img src={insta2} alt="instagram" />
        <img src={insta1} alt="instagram" />
        <img src={insta2} alt="instagram" />
        <img src={insta1} alt="instagram" />
      </div>
    </div>
  );
}

export default Instagram;