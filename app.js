const btnSubmit = document.querySelector("#add-book");
const hideAll = document.querySelector("#hide");
const Add = document.querySelector("button");
const ul = document.querySelector("#book-list ul");
const search = document.querySelector("#search-books input");

const items = JSON.parse(localStorage.getItem("items")) || []; // if already exists get from storage otherwise create empty array

function addItem(e) {
  e.preventDefault();
  console.log("inside ");
  const value = this.querySelector("input[type=text]").value;
  if (value === null || value.match(/^ *$/) !== null) {
    alert("add element!");
  } else {
    console.log("val ", value);
    const item = {
      id: Date.now() + Math.floor(Math.random() * 10),
      value: value,
      done: false,
    };
    items.push(item);
    populateList(items, ul);
    localStorage.setItem("items", JSON.stringify(items));
  }

  this.reset(); // for resetting the input field
}
function populateList(items = [], ul) {
  ul.innerHTML = items
    .map((item, i) => {
      return `
        <li>
        <div class="listItem">
        <input type = "checkbox" data-id=${item.id} ${
        item.done ? "checked" : ""
      }/>
        <label  for "item${i}" data-id=${item.id}>${item.value}</label>
        <button class="delete" data-id=${item.id}  >Delete </button>
        </div>
        </li>
        `;
    })
    .join("");
}
//<i class="fa fa-trash-o"></i>
function hid() {
  console.log("inside");
  if (hideAll.checked) {
    console.log("it's checked");
    document.querySelector("#book-list ul").style.display = "none";
  } else {
    console.log("not checked");
    document.querySelector("#book-list ul").style.display = "inline";
  }
}
function del(e) {
  if (e.target.matches("button")) {
    const el = e.target;
    //console.log(el);
    Index = items.findIndex(
      (obj) => obj.id == el.dataset.id
      //console.log("dataset id", el.dataset.id);
      //console.log("item id", obj.id);
    );
    //console.log(Index);
    items.splice(Index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    populateList(items, ul);
  }
}
function Search() {
  let str = this.value;
  const filtered = items.filter((item) =>
    item.value.toLowerCase().includes(str.toLowerCase())
  );
  //console.log("filtered", filtered);
  populateList(filtered, ul);
}
search.addEventListener("keyup", Search);
btnSubmit.addEventListener("submit", addItem);
hideAll.addEventListener("click", hid);
ul.addEventListener("click", del);
populateList(items, ul);
