/* global Item */
'use strict';
// eslint-disable-next-line no-unused-vars
const bookmark = (function () {
  const addItem = function (item) {
    this.items.push(item);
  };

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function (id, newData) {
    let modifyingItem = this.items.find(function (item) {
      return item.id === id;
    });
    Object.assign(modifyingItem, newData);
  };

  const toggleCheckedFilter = function () {
    this.hideCheckedItems = !this.hideCheckedItems;
  };


  const setSearchTerm = function (term) {
    this.searchTerm = term;
  };


  return {
    items: [],
    hideCheckedItems: false,
    searchTerm: '',
    addItem,
    findById,
    findAndUpdate,
    findAndDelete,
    toggleCheckedFilter,
    setSearchTerm
  };
}());
