import { Router, Request, Response } from "express";
import currentOrder from "../models/currentOrder.model";
import dailyMenu from "../models/dailyMenu.model";
import { makeMenu } from "../services/menu.service";
import { makeNext } from "../services/menu.service";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const order: number = await currentOrder.getCurrent();

  const dailyStr: string = await dailyMenu.getMenu(order);

  const daily = JSON.parse(dailyStr)[0];

  const todayMenu = await makeMenu(daily);

  const next = await makeNext(order);

  console.log(next);

  res.render("home", { menu: todayMenu, next: next});
});

export default router;
