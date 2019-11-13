$( document ).ready(function() {
    $( document ).on("click", ".main__sh-item_outside", function() {
        $( this ).addClass("main__sh-item_outside-active");
        
        setTimeout(() => {
            $( this ).removeClass("main__sh-item_outside-active");
        }, 1000);
    });
});