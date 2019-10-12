import {Request, Response} from 'express';

export default class HomeController {
    public home(req:Request, res:Response) {
        res.render('home/home');
    }
}