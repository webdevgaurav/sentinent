import { MdHourglassEmpty } from "react-icons/md";

const NoRecordFound = () => {
  return (
    <div className="container">
      <div
        className="d-flex align-items-center justify-content-center flex-column"
        style={{ fontSize: "10rem" }}
      >
        <MdHourglassEmpty />
        <h4 className="alert-heading">No Record Found</h4>
      </div>
    </div>
  );
};

export default NoRecordFound;
