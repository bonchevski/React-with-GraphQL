import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
const app = express();
import path from 'path';

const root = path.join(__dirname, '../../');

// Allow Cross-origin resource sharing requests CORS. 
app.use(cors());

// Enable express Helmet middleware 
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "*.amazonaws.com"]
  }
}));
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

//Enabling Compression for express js 
app.use(compress());
// Enabling static 
app.use('/', express.static(path.join(root, 'dist/client')));
// Enbaling Uploads
app.use('/uploads', express.static(path.join(root, 'uploads')));
//Get site from dist folder on localhost:8000 for testing purposes 
//Shows you how your site looks up to now in prod mode 
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});
app.listen(8000, () => console.log('Listening on port 8000!'));