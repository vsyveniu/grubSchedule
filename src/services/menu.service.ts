import meal from "../models/meal.model";

async function makeMenu(daily: any) {
  let todayMenu = [];

  for (let key of Object.keys(daily)) {
    let mealStr: string = await meal.getMeal(daily[key]);

    let today = JSON.parse(mealStr)[0];
    if (key == "pre_breakfest" || key == "fruit_bud_protein") {
      today.optional = true;
    }
    todayMenu.push(today);
  }

  return todayMenu;
}

export { makeMenu };
