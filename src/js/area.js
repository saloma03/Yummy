export class Area{
    async getAllArea(){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
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
    async filterArea(area){
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
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