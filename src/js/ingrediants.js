export class Ingrediant{
    async getAllMealsIng(ing){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
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

    async getAllIng(){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let data = await res.json();
            if (data.meals) {
                return data.meals
                console.log(data);

            } else {
                console.error('Meal not found');
                return null;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            return null;
        }

    }

}