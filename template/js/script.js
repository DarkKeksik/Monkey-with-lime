$( document ).ready(function() {
    // Массив коктелей под первый блок
    let dict = {
        "icon-cocktail1": {
            "title": "Маргарита",
            "subTitle": "алк. коктель",
            "desc": "Описание коктеля"
        },
        "icon-cocktail2": {
            "title": "Маргарита",
            "subTitle": "алк. коктель",
            "desc": "Описание коктеля"
        },
        "icon-cocktail3": {
            "title": "Маргарита",
            "subTitle": "алк. коктель",
            "desc": "Описание коктеля"
        }
    };
    
    // При клике на 1 секцию на 1 блоке
    $( document ).on("click", ".main__sh-item_outside", function() {
        $( this ).addClass("main__sh-item_outside-active");
        
        setTimeout(() => {
            $( this ).removeClass("main__sh-item_outside-active");
        }, 1000);
    });
});