const multer = require('multer');
const path = require('path');

exports.upload = async (req, res) => {
  try {
    const folder = req.query.folder;
    const uploadsDir = path.join(__dirname, `../uploads/${folder}`);
    let filePath = '';
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, uploadsDir);
      },
      filename: function(req, file, cb) {
        filePath = `/uploads/${folder}/` + file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
      }
    });
    const upload = multer({ storage: storage }).single('file');
    upload(req, res, function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({ message: "Unknown error", error: err });
      }
      return res.status(200).json({ message: "File uploaded successfully", filePath});
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
};
