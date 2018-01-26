'use strict';

const Item = (function () {

  const validateName = function (name) {
    if (!name) throw new TypeError('Name must not be blank');
  };

  const create = function (name) {
    return {
      id: cuid(),
      name,
      rating: false,
      newTitle: false,/* from event listener */
      editing: false /* triggered by event listener on title */
    };
  };

  return {
    validateName,
    create,
  };

}());

