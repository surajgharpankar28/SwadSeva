import CON_URL from "../utils/constants";

const RestroCard = (props) => {
  const { resData } = props;

  const { name, cuisines, avgRating, cloudinaryImageId, deliveryTime } =
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
      <h4>{cuisines}</h4>
      <h5>{avgRating} stars</h5>
      <h5>ETA : {deliveryTime} mins</h5>
    </div>
  );
};
export default RestroCard;
