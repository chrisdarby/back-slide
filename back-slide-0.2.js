/**
 * BackSlide - Image Background Slider
 * 
 * @author Christopher Darby
 * @version 0.2
 * @copyright (c) 2013, Chris Darby
 * @license http://www.gnu.org/copyleft/gpl.html GPL v2
 */
 
var backSlide = {
    current: 0,
	duration: 6000,
	speed: 2000,
    t: null,
    r: null,
    width: null,
	// Moves to the next image
    moveRight: function() {
        var next = backSlide.current + 1;

        var win = $(window).width();
        var position = (next * win);

        $("#slider-container").animate({marginLeft: "-" + position}, backSlide.speed, function() {
            backSlide.current = backSlide.current + 1;
            if (backSlide.current == 4) {
                $("#slider-container").css("margin-left", "0px");
                backSlide.current = 0;
            }

            clearTimeout(backSlide.t);
            backSlide.t = setTimeout('backSlide.moveRight()', backSlide.duration);
        });
    },
	// Resets the image and dive widths on resize or refresh
    resetWidths: function() {
        var win = $(window).width();
        backSlide.width = win;
        $(".slider").css("width",win);
        $(".slider-container").css("width", (win * 6));
        $(".slide").css("width", win);
        $(".beginning").css("margin-left", "-" + win + "px");
    },
    createSlider: function(id, slides) {
        var html = '';
        html += '<div class="slider">';
        html += '<div id="slider-container" class="slider-container">';
        html += '<div class="slide slide_' + slides + ' beginning"></div>';

        var start = 0;
        while (start < slides) {
            html += '<div class="slide slide_' + (start + 1) + '"></div>';
            start++;
        }

        html += '<div class="slide slide_1 end"></div>';
        html += '</div>';
        html += '</div>';
        html += backSlide.createNav(slides);

        $("#" + id).html(html);
        backSlide.resetWidths();
        setTimeout('backSlide.processSlider()', 1000);
    },
    createNav: function(slides) {
        var html = '<div class="slider-nav">';
        html += '<ul>';
        var start = 0;
        while (start < slides) {
            html += '<li onclick="backSlide.gotoPosition(' + start + ')">' + start + '</li>';
            start++;
        }

        html += '</ul>';
        html += '</div>';

        return html;
    },
    init: function(id, slides) {
        $(document).ready(function() {
            backSlide.createSlider(id, slides);
        });

        $(window).resize(function() {
            backSlide.resetWidths();
        });
    },
    processSlider: function() {
        clearTimeout(backSlide.t);
        backSlide.t = setTimeout('backSlide.moveRight()', backSlide.duration);
    }
}