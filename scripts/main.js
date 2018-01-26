/* global bookmarkList api */

'use strict';

$(document).ready(function () {
  bookmarkList.bindEventListeners();
  bookmarkList.render();
  api.getItems((items) => {
    items.forEach((item) => bookmark.addItem(item));
    /* test code */
    // const item = bookmark.items[0];
    // console.log('current name: ' + item.name);
    // bookmark.findAndUpdate(item.id, { name: 'stuff' });
    // console.log('new name: ' + item.name);
    bookmarkList.render();
  });
});