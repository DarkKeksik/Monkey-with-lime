$( document ).ready(function() {
    
    // Массив коктелей под первый блок    
    let dict = {
        "icon-cocktail1": {
            "title": "Мохито",
            "subTitle": "алк. коктель",
            "desc": "Тут способ приготовления коктейля",
            "composition": {
                0: {
                    "name": "Белый ром",
                    "proportion": "60 мл",
                    "price": "1511 руб"
                },
                1: {
                    "name": "Сок лайма",
                    "proportion": "½ штуки",
                    "price": "-"
                },
                2: {
                    "name": "Мята",
                    "proportion": "150 грамм",
                    "price": "-"
                },
                3: {
                    "name": "Сахарный сироп",
                    "proportion": "20 мл",
                    "price": "-"
                },
                4: {
                    "name": "Газированная вода",
                    "proportion": "30 мл",
                    "price": "-"
                },
                5: {
                    "name": "Лед",
                    "proportion": "На свое усмотрение",
                    "price": "-"
                }
            }          
        },
        "icon-cocktail2": {
            "title": "Апероль Шприц",
            "subTitle": "алк. коктель",
            "desc": "Тут способ приготовления коктейля",
            "composition": {
                0: {
                    "name": "Апероль",
                    "proportion": "100 мл",
                    "price": "-"
                },
                1: {
                    "name": "Просекко",
                    "proportion": "100 мл",
                    "price": "-"
                },
                2: {
                    "name": "Содовая",
                    "proportion": "20 грамм",
                    "price": "-"
                },
                3: {
                    "name": "Апельсин",
                    "proportion": "40 грамм",
                    "price": "-"
                },
                3: {
                    "name": "Лед",
                    "proportion": "60 грамм",
                    "price": "-"
                }
            }
        },
        "icon-cocktail3": {            
            "title": "Маргарита",
            "subTitle": "алк. коктель",
            "desc": "Тут способ приготовления коктейля",
            "composition": {
                0: {
                    "name": "Серебряная текила",
                    "proportion": "20 мл",
                    "price": "1511 руб"
                },
                1: {
                    "name": "Сок лайма",
                    "proportion": "40 мл",
                    "price": "-"
                },
                2: {
                    "name": "Лед",
                    "proportion": "150 грамм",
                    "price": "-"
                }
            }
        }
    };
    
    // Массив со всеми ингредиентами
    let dictIngredients = [];
    Object.keys(dict).forEach((itemFirst) => {
        let composition = dict[itemFirst]["composition"];

        Object.keys( composition ).forEach((itemSecond) => {
            // Проверяем был ли в массив ранее добавлен элемент
            if( dictIngredients.indexOf(composition[itemSecond]["name"]) == -1 ) {
                dictIngredients.push(composition[itemSecond]["name"]);
            }
        });
    });
    
    // Отсортировываем по алфавиту
    let dictIngredientsSort = dictIngredients.sort();
    
    // Наполняем aside во 2 секции
    dictIngredientsSort.forEach((item) => {
        $(".main__section-aside").append(`<p class="main__section-aside-item">${item}</p>`); 
    });
    
    // При клике на 1 секцию на 1 блоке
    $( document ).on("click", ".main__sh-item_outside", function() {
        $( this ).addClass("main__sh-item_outside-active");
        
        // Выбираем случайный коктель
        let randomCocktail = Object.keys(dict).sort(() => {
            return Math.random() - .5;
        })[0];
        
        // Перезаписываем коктель в блоке
        $(".main__forHide").slideUp(function() {
            $(".main__forHide .main__title-basic").text(dict[randomCocktail]["title"]);
            $(".main__forHide .main__title-sub").text(dict[randomCocktail]["subTitle"]);
            $(".table__content").empty();
            
            Object.keys(dict[randomCocktail]["composition"]).forEach((i)=>{
                $(".main__sh .table__content").append(`
                    <tr class="table__row">
                        <td class="table__item table__text">${dict[randomCocktail]["composition"][i]["name"]}</td>
                        <td class="table__item table__text">${dict[randomCocktail]["composition"][i]["proportion"]}</td>
                        <td class="table__item table__text">${dict[randomCocktail]["composition"][i]["price"]}</td>
                    </tr>
                `);
            });
            
            // Заменяем класс коктейля на новый
            $(".main__sh-item_inside").attr("class").split(" ").forEach((i) => {
                let pastClass = i.match(/icon-cocktail\d/ig);
                $(".main__sh-item_inside").removeClass(pastClass).addClass(randomCocktail);
            });
        });
        
        
        setTimeout(() => {
            $( this ).removeClass("main__sh-item_outside-active");
            $(".main__forHide").slideDown();
        }, 1000);
    });
    
    // При клике на ингредиент во второй секции
    $( document ).on("click", ".main__section-aside-item", function() {
        $( this ).toggleClass("main__section-aside-item_active");
        
        // Скрываем детальную информацию и показываем все найденные коктели
        $(".main__section-content-details").slideUp(function() {
            $(".main__section-content-all").slideDown();
        });
        
        // Наполняем массив выбранными ингредиентами
        let arrSelected = [];
        $(".main__section-aside-item_active").each(function() {
            arrSelected.push( $( this ).text() );
        });
        
        // Перебираем ингредиенты в поиске подходящих рецептов
        let recipeResult = {};
        // Перебираем основной массив и сравниваем выбранными ингредиенты
        Object.keys(dict).forEach((itemFirst)=>{
            let dictItem = dict[itemFirst],
                ingredienAll = [],
                cocktailName = "";
                
            Object.keys(dictItem["composition"]).forEach((itemSecond) => {
                // Все ингредиенты в напитке
                let nameIngredientInArr = dictItem["composition"][itemSecond]["name"];
                ingredienAll.push( nameIngredientInArr );
                cocktailName = dictItem["title"];
            });
            
            // Проверяем содержатся ли выбранные ингредиенты в коктейле
            let checkExistIngredient = true;
            arrSelected.forEach((itemThird) => {
                if (ingredienAll.indexOf(itemThird) == -1) {
                    checkExistIngredient = false;
                }
            });
            
            // Итоговая проверка и добавление в возможные коктейли
            if (checkExistIngredient) {
                recipeResult[itemFirst] = cocktailName;
            }
            
            
        });
        
        // Добавляем рецепты если был выбран ингредиент
        $(".main__section-content-all-wrap").empty();
        
        if ( arrSelected.length > 0 ) {
            Object.keys(recipeResult).forEach((item) => {
                $(".main__section-content-all-wrap").append(`
                    <p data-dictkey="${item}" class="main__section-content-all-link">${recipeResult[item]}</p>
                `);
            });
        } else {
            $(".main__section-content-all-wrap").append(`
                <p class="main__section-content-all-hint">
                    Выберите ингредиент для поиска подходящих вам коктелей
                </p>
            `);
        }
    });
    
    
    // При вводе в поиск по ингредиентам
    $( document ).on("keyup", ".main__section-search-input", function() {
        let val = $( this ).val();
        
        // Создаем свой :Contains (теперь не регистрозависимый)
        $.expr[":"].Contains = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            };
        });
        
        $(`.main__section-aside-item`).hide();
        $(`.main__section-aside-item:Contains('${val}')`).show();
        if (val = "") $(`.main__section-aside-item`).show();
        
        // При клике на ингредиент после его поиска очищаем поле
        $( document ).on("click", ".main__section-aside-item", function() {
            $(".main__section-search-input").val("");
            $(".main__section-aside-item").show();
        });
        
    });
    
    // При клике на рецепт во второй секции
    $( document ).on("click", ".main__section-content-all-link", function() {
        $(".main__section-aside-item_active").removeClass("main__section-aside-item_active");
        $(".main__section-content-all").slideUp(function() {
            $(".main__section-content-details").slideDown();
        });
        
        let cocktailKey = $( this ).data("dictkey");
        
        $(".main__section-content-details .main__title").text(dict[cocktailKey]["title"]);
        $(".main__section-content-details .table__content").empty();
        
        // Расходники
        Object.keys(dict[cocktailKey]["composition"]).forEach((i)=>{
            $(".main__section-content-details .table__content").append(`
                <tr class="table__row">
                    <td class="table__item table__text">${dict[cocktailKey]["composition"][i]["name"]}</td>
                    <td class="table__item table__text">${dict[cocktailKey]["composition"][i]["proportion"]}</td>
                    <td class="table__item table__text">${dict[cocktailKey]["composition"][i]["price"]}</td>
                </tr>
            `);
        });
        
        // Описание
        $(".main__section-content-details-description").text(dict[cocktailKey]["desc"]);
        
    });
});