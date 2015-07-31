Modernizr.load([{
    load: '//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
    }, {
    test: window.jQuery,
    nope: 'bower/jquery/dist/jquery.js',
    both: ['js/plugins.js','bower/bpopup/jquery.bpopup.min.js','bower/jquery-placeholder/jquery.placeholder.min.js'],
    complete: function () {
        app(jQuery, true).run();
    }
}]);

function app($, DEBUG) {

    var replacedSVGs = [];


    function init() {

        /** Загрузка SVG**/

        $('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            replacedSVGs.push(imgURL);

            $.get(imgURL, function (data) {
                var $svg = $(data).find('svg');

                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }

                $svg = $svg.removeAttr('xmlns:a');
                $img.replaceWith($svg);

            }, 'xml');

        });

        /** Placeholder fix **/

        $('input, textarea').placeholder({ customClass: 'jquery-fix-placeholder' });

        /** Инициализация el **/

        $('.s-menu__item a').on('click',function(e) {
            $('.s-menu__item--active').removeClass('s-menu__item--active');
            $(e.target).parent().addClass('s-menu__item--active');
        });

        $('.v_works__add-link').on('click', function(e){
            e.preventDefault();
            $('.popup').bPopup({
                transition: 'slideIn',
                closeClass: "popup--close",
                opacity: 0.75,
                modalColor: "#58697a"
            });
        });

    }

    return {
        run: function () {

            try {
                init();
            }

            catch (e) {
                return e.message;
            }

            if (DEBUG) {
                console.group('Debug');
                console.log('App started!');
                console.log(replacedSVGs.join('\n'));
                console.groupEnd();
            }
        }

    };

}