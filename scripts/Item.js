'use strict';

const Item = (function () {

  const create = function (name) {
    return {
      id: cuid(),
      name, 
      site: false
      description: false
      rating: false,
      newTitle: false,/* from event listener */
      editing: false /* triggered by event listener on toggle switch */
    };
  };

  return {
    create,
  };

}());

