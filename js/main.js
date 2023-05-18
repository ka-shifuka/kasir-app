feather.replace();

//main app
//localstorage
let data = {};
const DATA_KASIR_APP = "DATA_KASIR_APP";
//if localstorage have a data render it
if (localStorage.getItem(DATA_KASIR_APP)) {
  let value = JSON.parse(localStorage.getItem(DATA_KASIR_APP));
  for (let i in value) {
    data[i] = [value[i][0], value[i][1]];
    createRow(i, value[i][0], value[i][1]);
    noIndex = i;
  }
}
//syncron to localstorage
function syncLocalStorage(event, goodsName, price, category) {
  switch (event) {
    case "ADD":
      data[goodsName] = [price, category];
      break;
    case "REMOVE":
      delete data[goodsName];
      break;
  }

  localStorage.setItem(DATA_KASIR_APP, JSON.stringify(data));
}
//end localstorage

function remove(element) {
  let goodsName = element.parentElement.parentElement;
  syncLocalStorage("REMOVE", goodsName.id);
  goodsName.remove();
}

function add() {
  let goodsName = document.querySelector("#goods");
  let price = document.querySelector("#price");
  let category = document.querySelector("#category");

  let formatPrice = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price.value);

  if (!haveValue(goodsName.value, price)) {
    return;
  }
  createRow(goodsName.value, formatPrice, category.value);
  syncLocalStorage("ADD", goodsName.value.trim(), formatPrice, category.value);

  goodsName.value = "";
  price.value = "";
}

function createRow(goodsName, price, category) {
  let listGoods = document.querySelector("#list-goods");
  let newRow = `
            <tr id="${goodsName.trim()}">
              <td>${goodsName}</td>
              <td>${price}</td>
              <td>${category}</td>
              <td>
                <i
                  onclick="remove(this)"
                  class="feather-16 text-danger bi bi-trash"
                ></i>
              </td>
            </tr>
  `;

  listGoods.insertAdjacentHTML("afterbegin", newRow);
}

//search engine
const searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("keyup", function () {
  let list = document.querySelector("#list-goods");
  let filter = this.value.toLowerCase();
  let listFilter = list.querySelectorAll("tr");

  for (let i = 0; i < listFilter.length; i++) {
    let textValue = listFilter[i].id;
    if (textValue.toLowerCase().indexOf(filter) > -1) {
      listFilter[i].style.display = "";
    } else {
      listFilter[i].style.display = "none";
    }
  }
});
//end search engine
//end main app

//protocol
// check if the form have value will be true and vise versa
function haveValue(goodsName, price) {
  if (goodsName == "" || price == 0) {
    swal({
      title: "Data tidak valid",
      text: "silahkan memaksukkan data nama barang dan harga dengan data yang valid",
      icon: "warning",
    });
    return false;
  }
  return true;
}
//end protocol
