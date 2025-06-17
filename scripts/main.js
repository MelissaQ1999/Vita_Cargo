// ----- In dit JavaScript bestand vindt je de code die voor elke pagina nodig is ----- //

// ----- Lader van de website ----- //
$(window).on("load",function(){
    $("#loaderInner").fadeOut("slow");
    $("#doc-loader").delay(400).fadeOut("slow");
});


// ----- Hamburgermenu (de drie streepjes) ----- //
$(document).ready(function(){
	// menu click event
	$('.menuBtn').click(function() {
		$(this).toggleClass('act');
			if($(this).hasClass('act')) {
                $('.mainMenu').addClass('act');
                $('header').addClass('act');
                $('a.logo').addClass('act');
                $('lang-switch').addClass('act');
                toggleBodyScrolling(); // Schakel scrollen van de achtergrond uit
            }
			else {
                $('.mainMenu').removeClass('act');
                $('header').removeClass('act');
                $('a.logo').removeClass('act');
                $('lang-switch').removeClass('act');
                toggleBodyScrolling(); // Schakel scrollen van de achtergrond in
            }
    });

    function toggleBodyScrolling() {
        document.body.style.overflow = (document.body.style.overflow === "hidden") ? "auto" : "hidden";
    }
});