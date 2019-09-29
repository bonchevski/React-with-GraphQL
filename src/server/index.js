import express from 'express';
const app = express();
import path from 'path';

const root = path.join(__dirname, '../../');

app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, 'uploads')));
app.get('/', (req, res) => {
  res.sendFile(path.join(root, '/dist/client/index.html'));
});
app.listen(8000, () => console.log('Listening on port 8000!'));