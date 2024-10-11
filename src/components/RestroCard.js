import { CON_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const RestroCard = (props) => {
  const { resData } = props;

  const { id, name, cuisines, avgRating, cloudinaryImageId, deliveryTime } =
    resData?.info;

  // const { deliveryTime } = resData.info?.sla;
  return (
    <div className="res-card">
      <img
        className="res-img"
        alt="res-img"
        src={CON_URL + cloudinaryImageId}
      />
      <h3>{name}</h3>
      {/* <h1>{id}</h1> */}
      <h5>{cuisines.join(", ")}</h5>
      <h5>{avgRating} stars</h5>
      <h5>ETA : {deliveryTime} mins</h5>
      <button>
        <Link to={"/restaurants/" + id}>View Menu</Link>
      </button>
    </div>
  );
};
export default RestroCard;


