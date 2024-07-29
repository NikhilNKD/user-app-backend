import multer from "multer";
export const uploadS3 = multer({ storage: multer.memoryStorage() });
