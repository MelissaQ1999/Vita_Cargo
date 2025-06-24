// ----- In this JavaScript file you will find the code needed for each page ----- //

// ----- Website Loader ----- //
$(window).on("load",function(){
    $("#loaderInner").fadeOut("slow");
    $("#doc-loader").delay(400).fadeOut("slow");
});


// ----- Hamburger menu (the three lines) ----- //
$(document).ready(function(){
	// menu click event
	$('.menuBtn').click(function() {
		$(this).toggleClass('act');
			if($(this).hasClass('act')) {
                $('.mainMenu').addClass('act');
                $('header').addClass('act');
                $('a.logo').addClass('act');
                $('lang-switch').addClass('act');
                toggleBodyScrolling(); // Disable background scrolling
            }
			else {
                $('.mainMenu').removeClass('act');
                $('header').removeClass('act');
                $('a.logo').removeClass('act');
                $('lang-switch').removeClass('act');
                toggleBodyScrolling(); // Enable background scrolling
            }
    });

    function toggleBodyScrolling() {
        document.body.style.overflow = (document.body.style.overflow === "hidden") ? "auto" : "hidden";
    }
});


// ----- Button to return to the top of the page ----- //
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('backToTopContainer');
    const button    = document.getElementById('backToTop');
    const footer    = document.querySelector('footer');
    const margin    = 20;  // Default distance from footer in px

    function updateBackToTop() {
        // Fade in after scroll > 200 px
        if (window.scrollY > 200) {
            container.classList.add('visible');
        } else {
            container.classList.remove('visible');
        }

        // Determine overlap with footer
        const rect = footer.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            const overlap = window.innerHeight - rect.top;
            container.style.bottom = `${overlap + margin}px`;
        } else {
            // Footer not yet in view
            container.style.bottom = `${margin}px`;
        }
    }

    // Bind scroll + resize
    window.addEventListener('scroll', updateBackToTop);
    window.addEventListener('resize', updateBackToTop);

    // One-time init
    updateBackToTop();

    // Smooth scroll to top
    button.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
