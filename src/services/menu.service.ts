import meal from "../models/meal.model";
import dailyMenu from "../models/dailyMenu.model";

async function makeMenu(daily: any) {
  let todayMenu = [];

  for (let key of Object.keys(daily)) {
    let mealStr: string = await meal.getMeal(daily[key]);

    let today = JSON.parse(mealStr)[0];
    if (key == "pre_breakfast" || key == "fruit_bud_protein") {
      today.optional = true;
    }
    todayMenu.push(today);
  }

  return todayMenu;
}

async function makeNext(current: number) {
  let next = [];
  let edge: number = current + 5;
  let max: number = await dailyMenu.getMax();

  for (let i = current + 1; i <= edge; i++) {
    if (i > max) {
      edge = edge - i;
      i = 0;
    }
    let menu: string = await dailyMenu.getMenu(i);
    if (JSON.parse(menu)[0]) {
      let meals = await makeMenu(JSON.parse(menu)[0]);
      next.push(meals);
    }
  }

  return next;
}

export { makeMenu, makeNext };
