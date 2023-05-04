

class Section {
constructor ({ renderer }, containerSelector) {
    //this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);

}

addNewItem(element) {
    this._container.prepend(element);
  }

addItems(element) {
  this._container.append(element);
}  

renderItems = (items) => {
  items.forEach((item) => {
      this._renderer(item);  
    });
  }


}

export default Section;

