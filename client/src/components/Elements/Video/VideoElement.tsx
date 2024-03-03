import { BASE_URL } from "../../../../config";

const VideoElement = ({ index, heading, videoPath }) => {
  return (
    <div className="container" id={index}>
      <h4 id={index}>{heading}</h4>
      <div className="embed-responsive embed-responsive-16by9" id={index}>
        <video id={index} controls className="object-fit-contain w-100">
          {videoPath && (
            <source src={`${BASE_URL}${videoPath}`} type="video/mp4" />
          )}
        </video>
      </div>
    </div>
  );
};

export default VideoElement;
