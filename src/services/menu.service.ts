import meal from "../models/meal.model";

async function makeMenu(daily: any) {
  let todayMenu = [];

  for (let key of Object.keys(daily)) {
    let mealStr: string = await meal.getMeal(daily[key]);
    todayMenu.push(JSON.parse(mealStr)[0]);
  }

  return todayMenu;
}

export { makeMenu };
