/* global Item */
'use strict';
// eslint-disable-next-line no-unused-vars
const bookmark = (function () {
  const addItem = function (item) {
    // try {
    //   Item.validateName(name);
    //   this.items.push(Item.create(name));
    // } catch(e) {
    //   console.log(e.message);
    // }
    this.items.push(item);
  };

  const findById = function (id) {
    return this.items.find(item => item.id === id);
  };

    // const findAndToggleChecked = function(id) {
    //   const item = this.findById(id);
    //   item.checked = !item.checked;
    // };

  const findAndDelete = function (id) {
    this.items = this.items.filter(item => item.id !== id);
  };

    // const findAndUpdateName = function(id, name) {
    //   try {
    //     Item.validateName(name);
    //     const item = this.findById(id);
    //     item.name = name;
    //   } catch(e) {
    //     console.log('Cannot update name: ' + e.message);
    //   }
    // }
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
