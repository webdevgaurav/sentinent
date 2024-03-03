import { BASE_URL } from "../../../../config";

const Image = ({ imagePath, text }) => {
  return (
    <div className="card w-100">
      <img
        src={`${BASE_URL}${imagePath}`}
        className="card-img-top"
        alt="No Preview Available..."
      />
      <div className="card-body">
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Image;
