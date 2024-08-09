import { BASE_URL } from "../../../config";
import axios from "axios";

const FileUpload = ({ folder, fileType, onClick }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileUpload(file);
  };

  const fileUpload = (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post(`${BASE_URL}/service/file/upload?folder=${folder}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onClick(response.data.filePath, URL.createObjectURL(selectedFile));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="input-group mb-3">
      <label className="input-group-text" htmlFor="inputGroupFile01">
        Upload
      </label>
      <input
        type="file"
        className="form-control"
        id="inputGroupFile01"
        accept={fileType}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileUpload;
