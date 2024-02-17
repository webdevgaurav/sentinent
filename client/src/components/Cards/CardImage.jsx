import { BASE_URL } from "../../../config";

const CardImage = ({ data }) => {
  const { title, thumbnail, price } = data;
  return (
    <div className="card col-xs-12 col-sm-6 col-md-4 col-lg-3 m-3">
      <div
        className="mt-2 mb-2"
        style={{
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {thumbnail ? (
          <img
            src={`${BASE_URL + thumbnail}`}
            alt="Product"
            className="w-100 h-auto"
          />
        ) : (
          <span>No Perivew Available</span>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price}</p>
      </div>
    </div>
  );
};

export default CardImage;
