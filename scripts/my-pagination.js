
(function($){
    
    var paginate = {
        startPos: function(pageNumber, perPage) {

            return pageNumber * perPage;
        },

        getPage: function(items, startPos, perPage) {
           
            var page = [];

         
            items = items.slice(startPos, items.length);

          
            for (var i=0; i < perPage; i++) {
                page.push(items[i]); }

            return page;
        },

        totalPages: function(items, perPage) {
          
            return Math.ceil(items.length / perPage);
        },

        createBtns: function(totalPages, currentPage) {
          
            var pagination = $('<div class="pagination" />');

       
            pagination.append('<span class="pagination-button">首</span>');

       
            for (var i=1; i <= totalPages; i++) {
              
                if (totalPages > 5 && currentPage !== i) {
            
                    if (currentPage === 1 || currentPage === 2) {
                        // show first 5 pages
                        if (i > 5) continue;
                    // if on last two pages
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        // show last 5 pages
                        if (i < totalPages - 4) continue;
                    // otherwise show 5 pages w/ current in middle
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue; }
                    }
                }

                // markup for page button
                var pageBtn = $('<span class="pagination-button page-num" />');

                // add active class for current page
                if (i == currentPage) {
                    pageBtn.addClass('active'); }

                pageBtn.text(i);

                pagination.append(pageBtn);
            }

            pagination.append($('<span class="pagination-button">末</span>'));

            return pagination;
        },

        createPage: function(items, currentPage, perPage) {
            $('.pagination').remove();

            var container = items.parent(),
                // detach items from the page and cast as array
                items = items.detach().toArray(),
                // get start position and select items for page
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);

            $.each(page, function(){
                // prevent empty items that return as Window
                if (this.window === undefined) {
                    container.append($(this)); }
            });

            // prep pagination buttons and add to page
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);

            container.after(pageButtons);
        }
    };

    $.fn.paginate = function(perPage) {
        var items = $(this);

        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5; }

        // don't fire if fewer items than perPage
        if (items.length <= perPage) {
            return true; }

        // ensure items stay in the same DOM position
        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        // paginate the items starting at page 1
        paginate.createPage(items, 1, perPage);

        $(document).on('click', '.pagination-button', function(e) {
            // get current page from active button
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            newPage = parseInt(target.text(), 10);
            if (target.text() == '首') newPage = 1;
            if (target.text() == '末') newPage = totalPages;

            // ensure newPage is in available range
            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage); }
        });
    };

})(jQuery);

$('.portfolio').paginate(2);