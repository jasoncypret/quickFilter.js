(function ($) {
    $.fn.quickFilter = function (options) {
        var defaults = {
            list        : '#list',
            target      : 'li',
            noResults   : '#noResults',
            look        : 'li',
            loadCall    : function () {},
            blankCall   : function () {},
            noneCall    : function () {},
            foundCall   : function () {}
        };
        options = $.extend(defaults, options); 

        if ( $(options.list).length ) {
            var rows = $(options.list).children(options.target),
                cache = rows.map( function () {
                    if ( options.target !== options.look ) {
                        return $(this).find(options.look).text().toLowerCase();
                    } else {
                        return $(this).text().toLowerCase();
                    }
                });
            this.keyup(filter)
                .parents('form').submit(
                    function () {
                      return false;
                    }
                );
        }
        options.loadCall.call(this);
        return this;

        function filter () {
            var term = $.trim( $(this).val().toLowerCase() ),
                searchTokens = term.split(" "),
                haveMatch;
            $(options.noResults).hide();

            if ( !term ) {
                rows.show();
                options.blankCall.call(this);
            } else {
                var matches = 0;
                rows.hide();
                cache.each( function (i) {
                    
                    var dictionary = cache[i];
                    for (var k=0, len=searchTokens.length; k<len; k++) {
                        haveMatch = false;
                        if (dictionary.indexOf(searchTokens[k]) >= 0) {
                            haveMatch = true;
                        } else {
                            break;
                        } 
                    };
                    if ( haveMatch ) {
                        $(rows[i]).addClass('show');
                        matches++
                    } else {
                        $(rows[i]).removeClass('show');
                    }                       
                });
                if (matches >= 1) {
                    $(options.list + ' .show').show();
                    options.foundCall.call(this);
                } else {
                    $(options.noResults).show();
                    options.noneCall.call(this);    
                }
            }
        }

    };
})(jQuery);