export class Meal{


    async getMealsByName(name){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let data = await res.json();
            if (data.meals) {
                return data.meals;
            } else {
                console.error('Meal not found');
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }

    }

    async getMealsByLetter(l){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let data = await res.json();
            if (data.meals) {
                return data.meals;
            } else {
                console.error('Meal not found');
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }

    }


    async getMealById(id) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let data = await res.json();
            if (data.meals) {
                return data.meals[0]; // Return the meal object
            } else {
                console.error('Meal not found');
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }
    }
    async getMultipleMealsByIds(ids){
        let meals = [];
        for (const iterator of ids) {
            let meal = await this.getMealById(iterator);
            if(meal){
                meals.push(meal);
            }
        }
        return meals;
    }
    

}



