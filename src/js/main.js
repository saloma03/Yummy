import { Meal } from './meals.js'; 
import { Category } from './category.js'; 
import {Area} from './area.js';
import {Ingrediant} from './ingrediants.js';
import {Contact} from './contact.js';


const categoryAPI = new Category(); 
const areaAPI = new Area(); 
const ingAPI = new Ingrediant(); 
const contact = new Contact(); 

$(document).ready(function() {
    let menuWidth = $('.menu').outerWidth(true);

    
    const mealAPI = new Meal();
    $('.nav').css('transform', `translateX(-${menuWidth}px)`);
    $('.loading').removeClass('hidden');
    $('body').css('overflow', 'hidden');

    let mealIds = [
        52977, 53065, 53060, 53069, 53026, 52978, 52948, 52844, 52971, 53013,
        52804, 53027, 52785, 52929, 52854, 52769, 52802, 52906, 53028, 52887,
        52980, 53006, 52963, 52931, 52811
    ];

    mealAPI.getMultipleMealsByIds(mealIds)
        .then(meals => {
            $('.loading').addClass('hidden');
            $('body').css('overflow', 'auto');
            meals.forEach(meal => {
                displayMeal(meal);
            });
        })
        .catch(error => {
            console.error('Error fetching meals:', error);
            $('.loading').addClass('hidden');
            $('body').css('overflow', 'auto'); 
        });

    function displayMeal(meal) {
        $('#rowData').addClass('grid');

        let cartona = `
            <div class="rounded-md overflow-hidden relative group cursor-pointer meal" data-meal = "${meal.idMeal}">
                <img src="${meal.strMealThumb}" class="w-full" alt="">
                <div class="overlay flex items-center bg-[rgba(255,255,255,0.8)] transition-all duration-700 w-full absolute top-0 left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0">
                    <h3 class="ml-2 font-bold text-3xl">${meal.strMeal}</h3>
                </div>
            </div>
        `;
        $('#rowData').append(cartona);
    }
    function displayArea(area) {
        $('#rowData').addClass('grid');

        let cartona = `
            
            <div class=" text-center py-4 pl-7">
                <i class="fa-solid fa-house-laptop fa-6x text-slate-300 cursor-pointer area" data-area="${area.strArea}"></i>    
                <h3 class="text-slate-300 mt-2 font-bold">${area.strArea}</h3>            

            </div>
        `;
        $('#rowData').append(cartona); 
    }

    function displayIngrediant(ing) {
        $('#rowData').addClass('grid');

        let cartona = `
            <div class="cursor-pointer text-center py-4 pl-7 ing" data-ingrediant="${ing.strIngredient}">
                <i class="fa-solid fa-drumstick-bite fa-4x text-slate-300"></i>
                <h3 class="text-slate-300 mt-2 font-bold">${ing.strIngredient}</h3>
                <p class="line-clamp-3 text-slate-300">${ing.strDescription}</p>
            </div>
        `;
        $('#rowData').append(cartona); 
    }
    
    function displayCategory(category) {
        $('#rowData').addClass('grid');

        let cartona = `
            <div class="rounded-md overflow-hidden relative group cursor-pointer category" data-category="${category.strCategory}">
                <img src="${category.strCategoryThumb}" class="w-full" alt="">
                <div class="overlay text-center bg-[rgba(255,255,255,0.8)] transition-all duration-700 w-full absolute top-0 left-0 right-0 bottom-0 translate-y-full group-hover:translate-y-0">
                    <h3 class="ml-2 mt-1 font-bold text-3xl">${category.strCategory}</h3>
                    <p class="line-clamp-3">${category.strCategoryDescription}</p>
                </div>
            </div>
        `;
        
        $('#rowData').append(cartona); 
    }

    function menuToggle() {
        $('.menu-icon, .x-icon').toggleClass('hidden');
        if ($('.x-icon').hasClass('hidden')) {
            $('.nav').css('transform', `translateX(-${menuWidth}px)`);
            animateNavItems('animate__backOutDown');
        } else {
            $('.nav').css('transform', 'translateX(0)');
            animateNavItems('animate__backInUp');
        }
    }

    $('.menu-toggle').on('click', function() {
        menuToggle();
    });

    function animateNavItems(animationClass) {
        let delay = 0;
        $('.nav-item').each(function(i) {
            $(this).css('animation-delay', `${delay}s`);
            $(this).removeClass('animate__backInUp animate__backOutDown');
            setTimeout(() => {
                $(this).addClass('animate__animated').addClass(animationClass);
            }, 100);
            delay += 0.1;
        });
    }
    
    $('.search-nav').on('click', function() {
        $('#search').removeClass('hidden');
        $('#search').addClass('flex');
        $('#rowData').html('');
        menuToggle();
    });
    
    function getMealsByTheName(val) {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
        
        mealAPI.getMealsByName(val)
            .then(meals => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                meals.forEach(meal => {
                    displayMeal(meal);
                });
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching meals. Please try again.</p>');
            });
    }

    $('#searchByName').on('input', function () {
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        getMealsByTheName($(this).val());

    });

    function getMealsByFirstLetter(val) {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
        
        mealAPI.getMealsByLetter(val)
            .then(meals => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                meals.forEach(meal => {
                    displayMeal(meal);
                });
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching meals. Please try again.</p>');
            });
    }

    $('#searchByLetter').on('input', function() {
        if ($(this).val().length > 1) {
            $(this).val($(this).val().slice(0, 1));
        }
    
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
        getMealsByFirstLetter($(this).val());

    });

    function listAllCategories() {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        categoryAPI.getAllCategory()
            .then(categories => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                categories.forEach(category => {
                    displayCategory(category);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching categories. Please try again.</p>');
            });
    }

    $('.categories-nav').on('click', function() {
        $('#search').addClass('hidden');
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
        menuToggle();
        listAllCategories();
    });

    $(document).on('click', '.category', function() {
        $('#search').addClass('hidden');
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');

        let category = $(this).data('category');
        getMealsOfCategory(category);
    });

    function getMealsOfCategory(category) {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        categoryAPI.getAllMealsCategory(category)
            .then(meals => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                meals.forEach(meal => {
                    displayMeal(meal);
                });
            })
            .catch(error => {
                console.error('Error fetching meals:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching meals. Please try again.</p>');
            });

        }
    function listArea() {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        areaAPI.getAllArea()
            .then(areas => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                areas.forEach(area => {
                    displayArea(area);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching categories. Please try again.</p>');
            });
    }



    $('.area-nav').on('click',function(){
        $('#search').addClass('hidden');
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
        menuToggle();
        listArea();
    })

    function getAreaMeals(area){
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        areaAPI.filterArea(area)
            .then(meals => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                meals.forEach(meal => {
                    displayMeal(meal);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching categories. Please try again.</p>');
            });

    }

    $(document).on('click', '.area', function() {
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');

        let area = $(this).data('area');
        getAreaMeals(area);
    });

    function listIngrediants(){
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');

        ingAPI.getAllIng()
            .then(ings => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');

                $('#rowData').html('');
                ings.forEach(ing => {
                    displayIngrediant(ing);
                });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching categories. Please try again.</p>');
            });

    }

    $('.ingrediants-nav').on('click',function(){
        $('#search').addClass('hidden');
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
        menuToggle();
        listIngrediants();
        

    })

    function getMealsIng(ing) {
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
    
        ingAPI.getAllMealsIng(ing)
            .then(meals => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
    
                $('#rowData').html('');
                meals.forEach(meal => {
                    displayMeal(meal);
                });
            })
            .catch(error => {
                console.error('Error fetching meals by ingredient:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching meals by ingredient. Please try again.</p>');
            });
    }
    
    $(document).on('click', '.ing', function() {
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
    
        let ing = $(this).data('ingrediant');
        getMealsIng(ing);
    });
    
    
    $('.contact-nav').on('click',function(){
        $('#search').addClass('hidden');
        $('#rowData').html('');
        $('#rowData').removeClass('grid');
        $('#rowData').html(`
                    <div class="min-vh-100 d-flex justify-content-center align-items-center">
                        <div class="w-11/12 mx-auto flex flex-wrap gap-3 text-center justify-center">
                            <div class="md:w-1/3">
                                <input type="text" class="form-control contact-input" id="nameInput" placeholder="Name">
                                <div class="alert alert-danger mt-3 hidden" id="nameAlert" role="alert">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="md:w-1/3">
                                <input type="email" class="form-control contact-input" id="emailInput" placeholder="email">
                                <div class="alert alert-danger mt-3 hidden" id="emailAlert" role="alert">
                                    Email not valid *example@yyy.zzz*
                                </div>
                            </div>

                            <div class="md:w-1/3">
                                <input type="text" class="form-control contact-input" id="numberInput" placeholder="Phone">
                                <div class="alert alert-danger mt-3 hidden" id="numberAlert" role="alert">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="md:w-1/3">
                                <input type="text" class="form-control contact-input" id="ageInput" placeholder="Age">
                                <div class="alert alert-danger mt-3 hidden" id="ageAlert" role="alert">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="md:w-1/3">
                                <input type="password" class="form-control contact-input" id="passwordInput" placeholder="Password">
                                <div class="alert alert-danger mt-3 hidden" id="passwordAlert" role="alert">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>

                            <div class="md:w-1/3">
                                <input type="password" class="form-control contact-input" id="confirmInput" placeholder="Confirm Password">
                                <div class="alert alert-danger mt-3 hidden" id="confirmPasswordAlert" role="alert">
                                    Password not valid
                                </div>
                            </div>
                            <div class="md:w-1/3">
                                <button type="button" class="btn btn-outline-danger" id="submitBtn" disabled>Submit</button>
                            </div>
                        </div>
                    </div>
        `);
            menuToggle()
                
    })
    
    function displayMealDetails(id){
        $('#search').addClass('hidden');
        $('.inner-loading').removeClass('hidden');
        $('body').css('overflow', 'hidden');
    
        mealAPI.getMealById(id)
            .then(meal => {
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
    
                $('#rowData').html('');

                let ingredientsHTML = '';
                for (let i = 1; i <= 20; i++) {
                    let ingredientName = meal[`strIngredient${i}`];
                    let ingredientMeasure = meal[`strMeasure${i}`];
    
                    if (!ingredientName) break;
    
                    ingredientsHTML += `
                        <li class="alert alert-info m-2 p-1 ">${ingredientMeasure} ${ingredientName}</li>
                    `;
                }
                let tagsHtml = '';
                if (meal.strTags) {
                    const tagsArray = meal.strTags.split(',');
                
                    tagsArray.forEach(tag => {
                        tagsHtml += `
                            <li class="alert alert-danger m-2 p-1">${tag.trim()}</li>
                        `;
                    });
                }
                    
                $('#rowData').removeClass('grid');
                $('#rowData').html(`
                    <div class="flex flex-wrap text-slate-300">
            <div class="container md:w-1/3">
                <img src="${meal.strMealThumb}" class="w-100 rounded-lg" alt="">
                <h3 class="mt-3 text-3xl font-bold">${meal.strMeal}</h3>
            </div>
            <div class="container md:w-2/3 ">
                <h4 class="text-3xl font-bold leading-loose	">Instructoins</h4>
                <p class="leading-loose	">
                    ${meal.strInstructions}
                </p>
                <h3 class="text-3xl font-bold leading-loose	"><span>Area: </span> ${meal.strArea}</h3>
                <h3 class="text-3xl font-bold leading-loose	"><span>Category: </span> ${meal.strCategory}</h3>
                <h3 class="text-3xl font-bold leading-loose	"><span>Recipes: </span></h3>
                <ul class="flex flex-wrap" id="recipes">
                    ${ingredientsHTML}
                </ul>
                <h3 class="text-3xl font-bold leading-loose	"><span>Tags: </span> 
                </h3>
                <ul class="flex flex-wrap" id="recipes">
                    ${tagsHtml}
                </ul>
                <div class="flex mt-3 gap-2">
                        <button type="button" class="btn btn-success"><a href="${meal.strSource}" target="_blank">Source</a></button>
<button type="button" class="btn btn-danger"><a href="${meal.strYoutube}" target="_blank">Youtube</a></button>

                </div>

            </div>
        </div>

    `);
            })
            .catch(error => {
                console.error('Error fetching meals by ingredient:', error);
                $('.inner-loading').addClass('hidden');
                $('.inner-loading').removeClass('flex');
                $('body').css('overflow', 'auto');
                $('#rowData').html('<p>Error fetching meals by ingredient. Please try again.</p>');
            });


    }


    $(document).on('click', '.meal', function() {
        $('#rowData').html('');
        $('.inner-loading').addClass('flex');
        $('.inner-loading').removeClass('hidden');
    
        let meal = $(this).data('meal');
        displayMealDetails(meal);

        
    })
    

    $(document).on('input', '.contact-input', function() {
        let elementId = $(this).attr('id');
        let value = $(this).val();
        contact.validate(elementId, value);
    // console.log("sad")
    });
    

});

