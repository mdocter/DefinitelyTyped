import express = require('express');
import multer = require('multer');

const upload = multer({
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});

const app = express();

app.post('/profile', upload.single('avatar'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
});

app.post('/photos/upload', upload.array('photos', 12), (req: express.Request, res: express.Response, next: express.NextFunction) => {
});

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
app.post('/cool-profile', cpUpload, (req: express.Request, res: express.Response, next: express.NextFunction) => {
});

app.post('/text-only', upload.none(), (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof multer.MulterError) {
        next(new Error(err.code));
    }
});

const diskStorage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, '/tmp/my-uploads');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
});

const diskUpload = multer({ storage: diskStorage });

const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });
