/* eslint-disable no-undef */
'use strict';
//allow users to add, check, uncheck, and remove items from a shopping list
//link to an external jQuery and locally hosted JS file index.js
//linking from JS file to index.html
//use this and event delegation
//users enter items they want to purchase (text + .click 'return' or 'add item' button)
//users can check and uncheck items on list by .click "Check" button
//users can permanently remove items from list
//put script elements at the bottom of <body> element
//possible jQuery elements to use .submit(), .preventDefault(), toggleClass(), and closest()
const STORE = [
  { id: cuid(), name: 'apples', checked: false },
  { id: cuid(), name: 'oranges', checked: false },
  { id: cuid(), name: 'milk', checked: true },
  { id: cuid(), name: 'bread', checked: false }
];

function generateItemElement(item) {
  return `
    <li data-item-id='${item.id}'><span class='shopping-item ${
    item.checked ? 'shopping-item_checked' : ''
  }'>
    ${item.name}</span>
        <div class='shopping-item-controls'>
            <button class='shopping-item-toggle'>
                <span class='button-label'>check</span>
            </button>
            <button class='shopping-item-delete'>
                <span class='button-label'>delete</span>
            </button>
        </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) =>
    generateItemElement(item, index)
  );
  return items.join('');
}

function renderShoppingList() {
  //this function will render shopping list in DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  //insert that HTML into the DOM
  $('.shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({ id: cuid(), name: itemName, checked: false });
}

function handleNewItemSubmit() {
  //this function will be responsible for when users add a new shopping list item
  $('form').submit(function(event) {
    event.preventDefault();
    console.log('submit');
    const newItemName = $('shopping-list-entry').val();
    $('shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggle checked property for item with id ' + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item)
    .closest('li')
    .data('item-id');
}

function handleItemCheckClicked() {
  //this function responsible for when user clicks the "check" button on a shopping list item
  $('.shopping-list').on('click', '.shopping-item-toggle', event => {
    console.log('`handleItemCheckClicked ` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function deleteListItem(itemId) {
  console.log(`Deleting item with id ${itemId} from shopping list`);
  const itemIndex = STORE.findIndex(item => item.id === itemId);
  STORE.splice(itemIndex, 1);
}
function handleDeleteItemClicked() {
  //this function responsible for when users want to delete a shopping list item
  $('.shopping-list').on('click', '.shopping-item-delete', event => {
    const itemIndex = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  });
}

//this will be the callback function when the page loads. it's responsible for initially
//rendering the shopping list and activating the individual functions that handle new
//item submission and user clicks on the "check" and "delete" buttons for individual shopping list items
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

//when page loads call `handleShoppingList`
$(handleShoppingList);
