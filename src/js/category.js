export class Category{
    async getAllCategory(){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            let data = await res.json();
            if (data.categories) {
                return data.categories
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
    async getAllMealsCategory(category){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
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