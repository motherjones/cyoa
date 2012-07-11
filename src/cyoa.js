/*
 * cyoa, a choose your own adventure type thing.
 * https://github.com/motherjones/cyoa
 *
 * Copyright (c) 2012 Ben Breedlove
 * Licensed under the MIT, GPL licenses.
 *
 *  actuall expected use does not include choose your own adventures, sadly.
 *  still plenty good for making flowchart like deals
 *
 * options looks like { 
 *     container: 'id of html element which holds the story',
 *     start_page : 'optional, the key of the story page you start on, defaults to "start"'
 * }
 * story looks like
 * {
 *      start : {  // default start page, if you want to call it something different, you have to set it in the options
 *          img: 'http://www.url/img.png',
 *          connects: { 
 *          'page_2': 'Some text here',
 *          'death_by_water': 'The hanged man', 
 *          'foobarbaz' : 'variables'
 *          }
 *      },
 *      page_2 : {
 *          html: '<h1>Arbitrary html goes here !!! WhoooO!!!',
 *          connects: {'death_by_water' : 'I hate fortune tellers'},
 *      },
 *      death_by_water : {
 *          img: 'http://wasteland.org/fear.jpg',
 *          select_img: 'http://placekitten.com/100/100' //optional
 *      }
 * }
 */

(function($) {

    $.Cyoa = function(story, options) {
        var container_elem;
        var back_button_elem;
        var reset_button_elem;
        var path = [];
        var that;

        var cyoa = {
            start_page : 'start',
            container : 'cyoa_container',
            init : function() {
                that = this;
                for ( var option in options ) {
                    that[option] = options[option];
                }
                that.create_cover();
                for ( var page in story ) {
                    that.create_page(page);
                }
                that.add_to_path(that.start_page);
                that.display_page(that.start_page);
            },
            create_cover : function() {
                container_elem = $('#' + that.container);
                container_elem.addClass('cyoa_container');
                container_elem.append(that.create_reset_button_elem());
                container_elem.append(that.create_back_button_elem());
            },
            create_back_button_elem : function() {
                back_button_elem = $('<button id="cyoa_back_button"' + 
                    ' class="disabled" value="back">BACK</button>'
                );
                back_button_elem.click(function(){that.back();});
                back_button_elem.addClass('cyoa_top_controls');
                return back_button_elem;
            },
            create_reset_button_elem : function() {
                reset_button_elem = $('<button id="cyoa_reset_button"' + 
                    ' class="disabled" value="reset">RESET</button>'
                );
                reset_button_elem.click(function(){that.reset();});
                reset_button_elem.addClass('cyoa_top_controls');
                return reset_button_elem;
            },
            create_page : function(page) {
                story[page].element = that.create_page_element(page); 
                story[page].element.hide();
                container_elem.append(story[page].element);
            },
            create_page_element : function(page) {
                var page_obj = story[page];
                var content = page_obj.html ? 
                    page_obj.html : 
                    page_obj.img ? 
                        '<img src="' + page_obj.img + '" />' : 
                        page_obj.text ? 
                            '<p>' + page_obj.text + '</p>' : 
                            '<p>No content provided.  That\'s unfortunate';
                var element = $(
                      '<div id="' + page + '_container" class="cyoa_page">' + 
                      '<div class="cyoa_content">' + 
                      content + '</div></div>'
                );
                element.append(that.create_selection_buttons(page));
                return element;
            },
            add_to_path : function(page) {
                path.push(page);
                if (path.length > 1) {
                    back_button_elem.removeClass('disabled');
                    reset_button_elem.removeClass('disabled');
                }
            },
            create_selection_buttons : function(page) {
                var controler_container = $('<ul id="' + page + '_controls" class="cyoa_controls"></ul>');
                var choices = story[page].connects;
                if ( !choices ) { //must be the end of a line
                    return controler_container;
                }
                var bind_control = function(choice, control) {
                    control.click(function() {
                        that.add_to_path(choice);
                        that.display_page(choice);
                    });
                };

                for ( var connect in choices ) {
                    var decision = choices[connect];
                    if ( !story[connect] ) {
                        continue;
                    }

                    var control = $('<li class="cyoa_controler_' + connect + '"></li>');
                    control.append($('<span>' + decision + '</span>'));
                    bind_control(connect, control);
                    controler_container.append(control);
                }
                return controler_container;
            },
            display_page : function(page) {
                //maybe fancy this up inna bit, have it slide or somethign
                $('.cyoa_page').hide();
                $('#' + page + '_container').show();
            },
            back : function() {
                if ( path.length === 1 ) {
                    back_button_elem.addClass('disabled');
                    reset_button_elem.addClass('disabled');
                    return;
                }
                path.pop();
                that.display_page( path[path.length - 1] );
                if ( path.length === 1 ) {
                    back_button_elem.addClass('disabled');
                    reset_button_elem.addClass('disabled');
                }
            },
            reset : function() {
                while (path.length > 1) {
                    path.pop();
                }
                that.display_page(path[0]);
                back_button_elem.addClass('disabled');
                reset_button_elem.addClass('disabled');
            }
        };
        return cyoa.init(story, options);
    };
}(jQuery));
