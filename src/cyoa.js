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
 */

/* 
 * A stab at a mobile/responsive version of the original slider
 * inspired by Chris Coyier's flexslider, the text is positioned over the image
 * because images resize way better than background-images.
 * The width:100% on images + percentage selectors do most of the resizing, plus a few media queries
 * for style. NB, to be fully responsive the slides must be wrapped in a responsive container
 * and the meta viewport must be set in the doc head.
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
            separator : '|',
            control_position: 'split',
            init : function(story, options) {
                that = this;
                that.story = story;
                if (options) {
                    for ( var option in options ) {
                        that[option] = options[option];
                    }
                }

                if (typeof(story) === 'string') {
                    //is a google spreadsheet
                    that.story = that.make_story_from_google_spreadsheet(story);
                    return that;
                }
                    
                that.create_cover();
                for ( var page in that.story ) {
                    that.create_page(page);
                }
                that.add_to_path(that.start_page);
                that.display_page(that.start_page);
                return that;
            },
            make_story_from_google_spreadsheet: function(spreadsheet_id) {
                Tabletop.init({ 
                    key: spreadsheet_id,
                    callback: function(data) {
                        var story_data = that.make_story_data_from_spreadsheet_data(data);
                        that.init(story_data, options);
                    },
                    simpleSheet: true
                });
            },
            make_story_data_from_spreadsheet_data: function(data) {
                var story = {};
                that.start_page = 'cyoa_page_' + that.clean_slug(data[0].slug);
                for (var i = 0; i < data.length; i++) {
                    var row = data[i];
                    var page = {}; 
                    page.html = that.build_story_page_html_from_row(row);
                    page.connects = that.make_connects_data_from_row(row);
                    story['cyoa_page_' + that.clean_slug(row.slug)] = page;
                }
                return story;
            },
           build_story_page_html_from_row: function(row) {
                return ( row.title 
                            ? '<h1>' + row.title + '</h1>' 
                            : ''  )
                    + '<p>' + row.text + '</p>'
                    +'<img src ='
                    + (row.backgroundimage)
                    + '>' ;
            },
            clean_slug: function(slug) {
                return slug.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
            },
            make_connects_data_from_row: function(row) {
                var connections = [];
                var connects_to = row.connectsto.split(that.separator);
                var connects_labels = row.connectstext.split(that.separator);
                for (var i = 0; i < connects_to.length; i++) {
                    connection = connects_to[i].toLowerCase();
                    var connection = connection.replace(/[^a-zA-Z0-9]/g, '');
                    connections.push({
                        'link' : 'cyoa_page_' + connection,
                        'html' : connects_labels[i]
                    });
                }
                return connections;
            },
            create_cover : function() {
                container_elem = $('#' + that.container);
                container_elem.addClass('cyoa_container');
            },
            create_back_button_elem : function() {
                back_button_elem = $('<li id="cyoa_back_button"' + 
                    ' class="disabled generic" value="back">Back</li>'
                );
                back_button_elem.click(function(){that.back();});
                back_button_elem.addClass('cyoa_top_controls');
                return back_button_elem;
            },
            create_reset_button_elem : function() {
                reset_button_elem = $('<li id="cyoa_reset_button"' + 
                    ' class="disabled generic" value="reset">Reset</li>'
                );
                reset_button_elem.click(function(){that.reset();});
                reset_button_elem.addClass('cyoa_top_controls');
                return reset_button_elem;
            },
            create_page : function(page) {
                that.story[page].element = that.create_page_element(page); 
                that.story[page].element.addClass('cyoa_hide');
                that.story[page].element.append(that.create_controls(page));
                container_elem.append(that.story[page].element);
            },
            create_page_element : function(page) {
                var page_obj = that.story[page];
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
                return element;
            },
            add_to_path : function(page) {
                path.push(page);
                if (path.length > 1) {
                    back_button_elem.removeClass('disabled');
                    reset_button_elem.removeClass('disabled');
                }
            },
            create_controls : function(page) {
                var controls_container = $('<ul id="' + page + '_controls" class="cyoa_controls"></ul>');
                if ( that.control_position == 'centered') {
                    controls_container.addClass('centered');
                }
                if (that.control_position == 'split') {
                    controls_container.addClass('split');
                }
                if (that.control_position == 'right') {
                    controls_container.addClass('right');
                }
                if (that.control_position == 'left') {
                    controls_container.addClass('left');
                }
                var choices = that.story[page].connects;
                var bind_control = function(choice, control) {
                    control.click(function() {
                        that.add_to_path(choice);
                        that.display_page(choice);
                    });
                };

                for ( var connect in choices ) {
                    var decision = choices[connect];
                    if ( !that.story[decision.link] ) {
                        continue;
                    }

                    var control = $('<li class="cyoa_controler_' + decision.link + '"></li>');
                    control.append($('<span>' + decision.html + '</span>'));
                    bind_control(decision.link, control);
                    controls_container.append(control);
                }
                controls_container.append(that.create_reset_button_elem());
                controls_container.append(that.create_back_button_elem());
                return controls_container;
            },
            display_page : function(page) {
                //maybe fancy this up inna bit, have it slide or somethign
                $('.cyoa_page').addClass('cyoa_hide').removeClass('cyoa_show');
                $('#' + page + '_container').removeClass('cyoa_hide');
                $('#' + page + '_container').addClass('cyoa_show');
                return that;
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

    $.fn.Cyoa = function(story, options) {
        options = options || {};
        options.container = this.attr('id');
        this.cyoa = $.Cyoa(story, options);
        return this;
    };
}(jQuery));
