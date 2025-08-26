import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constatns/index.js';

const storage = multer.diskStorage({
  destination: function (req, gile, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
