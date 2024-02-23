import { BASE_URL } from "../../../config";

const CardImage = ({ data, onClick, onShowDelete }) => {
  const { title, thumbnail, price } = data;
  return (
    <div className="card-wrapper col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <div className="card m-3">
        <div className="d-flex justify-content-between mt-1 mr-3">
          <div></div>
          <i className="bi bi-trash-fill cursor-pointer danger" onClick={() => onShowDelete(data)}></i>
        </div>
        <div
          style={{
            height: "250px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            cursor: "pointer",
          }}
          onClick={() => onClick(data)}
        >
          {thumbnail ? (
            <img
              src={`${BASE_URL + thumbnail}`}
              alt="Product"
              className="w-100 h-auto"
            />
          ) : (
            <img
              src="/assets/defaultimage.png"
              alt="Product"
              className="w-100 h-auto"
            />
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default CardImage;
