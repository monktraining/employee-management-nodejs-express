import express from 'express';
import homeRouter from './routes/homeRoutes';
import employeeRouter from './routes/employeeRoutes';
import path from 'path';
import morgan from 'morgan';

const app = express();
const router = express.Router();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'../public')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'../views'));

router.use('/employees', employeeRouter);
router.use('/', homeRouter);

app.use('/', router);
app.listen(3000,() => {
    console.log('Application is running at http://localhost:3000');
});