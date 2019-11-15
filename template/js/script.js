$( document ).ready(function() {
    // Массив коктелей под первый блок
    let dict = {
        "icon-cocktail1": {
            "title": "Мохито",
            "subTitle": "алк. коктель",
            "desc": "Описание коктеля",
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
            "desc": "Описание коктеля",
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
                    "name": "Лед в кубиках",
                    "proportion": "60 грамм",
                    "price": "-"
                }
            }
        },
        "icon-cocktail3": {            
            "title": "Маргарита",
            "subTitle": "алк. коктель",
            "desc": "Описание коктеля",
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
                $(".table__content").append(`
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
});