/* global api bookmark newItemName */
'use strict';
// eslint-disable-next-line no-unused-vars
const bookmarkList = (function () {

  function generateItemElement(item) {
    let itemTitle = `<span class="bookmark-item bookmark-item__checked">${item.name}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
          <input class="bookmark-item type="text" value="${item.name}" />
        </form>
      `;
    }

    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${itemTitle} 
        <div class="bookmark-item-controls">
          <button class="bookmark-item-toggle js-item-toggle">
            <span class="button-label">check</span>
          </button>
          <div class="ratings">
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
          </div>
          <button class="bookmark-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
          <label class="switch">
            <input type="checkbox">
            <span class="slider round"></span>
          </label>
        </div>
      </li>`;


    
  }

//   <li class="js-item-element" data-item-id="${item.id}"> ${itemTitle}
//     <div class="bookmark-item-controls">
//       <div class="ratings">
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star checked"></span>
//         <span class="fa fa-star"></span>
//         <span class="fa fa-star"></span>
//       </div>
//       <label class="switch">
//         <input type="checkbox">
//           <span class="slider round"></span>
//                         </label>
//     </div>
//       <!-- end of sample list element -->
// </li>


  function generateBookmarkItemsString(bookmarkList) {
    const items = bookmarkList.map((item) => generateItemElement(item));
    return items.join('');
  }


  function render() {
    // Filter item list if bookmark prop is true by item.checked === false
    let items = bookmark.items;
    if (bookmark.hideCheckedItems) {
      items = bookmark.items.filter(item => !item.checked);
    }

    // Filter item list if bookmark prop `searchTerm` is not empty
    if (bookmark.searchTerm) {
      items = bookmark.items.filter(item => item.name.includes(bookmark.searchTerm));
    }

    // render the bookmark list in the DOM
    console.log('`render` ran');
    const bookmarkListItemsString = generateBookmarkItemsString(items);

    // insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListItemsString);
  }


  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const newItemName = $('.js-bookmark-list-entry').val();
      $('.js-bookmark-list-entry').val('');
      api.createItem(newItemName, (newItem) => {
        bookmark.addItem(newItem);
        render();
      });
    });
  }

  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }

  function handleItemCheckClicked() {
    $('.js-bookmark-list').on('click', '.js-item-toggle', event => {
      const id = getItemIdFromElement(event.currentTarget);
      const item = bookmark.findById(id);
      api.updateItem(id, { checked: !item.checked }, () => {
        bookmark.findAndUpdate(id, { checked: !item.checked });
        render();
      });
    });
  }

  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmark-list').on('click', '.js-item-delete', event => {
      // get the index of the item in bookmark.items
      const id = getItemIdFromElement(event.currentTarget);
      // delete the itegim
      api.deleteItem(id, () => {
        bookmark.findAndDelete(id);
        render();
      });
    });
  }

  function handleEditBookmarkItemSubmit() {
    $('.js-bookmark-list').on('submit', '#js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.bookmark-item').val();
      api.updateItem(id, { name: itemName }, () => {
        bookmark.findAndUpdateName(id, { name: itemName });
        render();
      });
    });
  }



  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      bookmark.toggleCheckedFilter();
      render();
    });
  }

  function handleBookmarkListSearch() {
    $('.js-bookmark-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      bookmark.setSearchTerm(val);
      render();
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    handleEditBookmarkItemSubmit();
    handleToggleFilterClick();
    handleBookmarkListSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
