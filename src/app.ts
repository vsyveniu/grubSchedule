import express, { Application, Request, Response } from 'express';
import * as exphbs from 'express-handlebars';
import * as path from 'path';
import mainRoute from './routes/main.route';
import * as scheduler from 'node-schedule';
import  currentOrder  from './models/currentOrder.model';
import dailyMenu from './models/dailyMenu.model';
import { Server, Socket } from 'socket.io';
import * as http from 'http';
import { makeMenu } from './services/menu.service';


const app: Application = express();

const server = http.createServer(app);
const hbs = exphbs.create({
    extname: '.hbs',
});

const io = new Server(server);

app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, '/')));
app.use('/', mainRoute);

io.on('connection', async ()=> {

    console.log('client connected');

    let order: number = await currentOrder.getCurrent();

    const dailyStr: string = await dailyMenu.getMenu(order);
    const daily = JSON.parse(dailyStr)[0];

    const todayMenu = await makeMenu(daily);

    io.emit('menu', todayMenu);
    
});

const job = scheduler.scheduleJob('* * * * *',  async function(){

    let order: number = await currentOrder.getCurrent();
    let max: number = await dailyMenu.getMax();
    
    if(order + 1 <= max){
        await currentOrder.shift(order + 1);
    }
    else{
        await currentOrder.shift(0);
    }

    const dailyStr: string = await dailyMenu.getMenu(order);
    const daily = JSON.parse(dailyStr)[0];

    const todayMenu = await makeMenu(daily);

    io.emit('menu', todayMenu);

  });

server.listen(5000, () => console.log('server is running'));
