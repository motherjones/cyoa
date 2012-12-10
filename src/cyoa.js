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
            control_location : 'top',
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
                if ( that.control_location === 'top' ) {
                    container_elem.append(that.create_controls());
                }
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
                return '<div '
                    + ( row.backgroundimage 
                            ? 'style="background-image: url(\'' + row.backgroundimage + '\');">' 
                            : '>' )
                    + ( row.topimage 
                            ? '<img src="' + row.topimage + '" class="topimage"></img>' 
                            : ''  )
                    + ( row.title 
                            ? '<h1>' + row.title + '</h1>' 
                            : ''  )
                   	+ ( row.middleimage 
		                    ? '<img src="' + row.middleimage + '" class="middleimage"></img>' 
		                    : ''  )
                    + '<p>' + row.text + '</p>'
                    + ( row.bottomimage 
                            ? '<img src="' + row.bottomimage + '" class="bottomimage"></img>' 
                            : ''  )
                    + '</div>';
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
            create_controls : function() {
                var control_container = jQuery('<div class="control_container">');
                control_container.append(that.create_reset_button_elem());
                control_container.append(that.create_back_button_elem());
                return control_container;
            },
            create_back_button_elem : function() {
                back_button_elem = $('<button id="cyoa_back_button"' + 
                    ' class="disabled" value="back">Back</button>'
                );
                back_button_elem.click(function(){that.back();});
                back_button_elem.addClass('cyoa_top_controls');
                return back_button_elem;
            },
            create_reset_button_elem : function() {
                reset_button_elem = $('<button id="cyoa_reset_button"' + 
                    ' class="disabled" value="reset">Reset</button>'
                );
                reset_button_elem.click(function(){that.reset();});
                reset_button_elem.addClass('cyoa_top_controls');
                return reset_button_elem;
            },
            create_page : function(page) {
                that.story[page].element = that.create_page_element(page); 
                that.story[page].element.addClass('cyoa_hide');
                if ( that.control_location === 'bottom' ) {
                    that.story[page].element.append(that.create_controls());
                }
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
                var choices = that.story[page].connects;
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
                    if ( !that.story[decision.link] ) {
                        continue;
                    }

                    var control = $('<li class="cyoa_controler_' + decision.link + '"></li>');
                    control.append($('<span>' + decision.html + '</span>'));
                    bind_control(decision.link, control);
                    controler_container.append(control);
                }
                return controler_container;
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
