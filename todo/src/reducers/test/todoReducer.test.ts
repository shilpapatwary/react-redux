import chai from 'chai';
import store from '.';
import { addItemAction, deleteItemAction, markItemAsComplete, markItemAsInComplete, editItemAction, moveItemAction } from '../../actions';
chai.should();
// //1. Add Item
// 1. Edit Item
// 1. Delete Item
// 1. Move Item
// 1. Mark Item as Complete
// 1. Mark Item as Incomplete

describe('TodoReducer', function() {
  describe('store.dispatch(addItemReducer(""))', function() {
    it('should add item', function() {
      store.dispatch(addItemAction({
            id: "67890",
            name: "item1",
            isComplete: false,
            index: 3
      }));
      const currentItem =  store.getState().currentItem || {};
      currentItem.should.have.property('name').and.equal('item1');
    });
  });

  describe('store.dispatch(deleteItemReducer(""))', function() {
    it('should delete item', function() {
    const items = store.getState().items || {};
    items.should.be.of.length(3);
    store.dispatch(deleteItemAction('12345'));
    const newItems = store.getState().items || {};
    newItems.should.be.of.length(2);
    });
  });
  
  
  describe('store.dispatch(markItemAsComplete(""))', function() {
    it('mark item as completed', function() {
    store.dispatch(markItemAsComplete('12345'));
    const currentItem =  store.getState().currentItem || {};
    currentItem.should.have.property('isComplete').and.equal(true);
    });
  });

  describe('store.dispatch(markItemAsInComplete(""))', function() {
    it('mark item as incomplete', function() {
    store.dispatch(markItemAsInComplete('12345'));
    const currentItem =  store.getState().currentItem || {};
    currentItem.should.have.property('isComplete').and.equal(false);
    });
  });
  describe('store.dispatch(editItemAction("item updated"))', function() {
    it('edit item name', function() {
    store.dispatch(editItemAction('12345', 'updated name'));
    const currentItem =  store.getState().currentItem || {};
    currentItem.should.have.property('name').and.equal('updated name');
    });
  });
  describe('store.dispatch(moveItemAction("item updated"))', function() {
    it('edit item name', function() {
    store.dispatch(moveItemAction('12365',1));
    const currentItem =  store.getState().currentItem || {};
    currentItem.should.have.property('index').and.equal(2);
    });
  });

});

