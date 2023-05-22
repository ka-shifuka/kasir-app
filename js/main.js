feather.replace();

//main app
//localstorage
let data = {};
const DATA_KASIR_APP = "DATA_KASIR_APP";
//if localstorage have a data render it
if (localStorage.getItem(DATA_KASIR_APP)) {
  let value = JSON.parse(localStorage.getItem(DATA_KASIR_APP));
  for (let i in value) {
    data[i] = {
      price: value[i].price,
      category: value[i].category,
    };
    createRow(i, value[i].price, value[i].category);
    noIndex = i;
  }
  console.log(data);
}
//syncron to localstorage
function syncLocalStorage(event, goodsName, price_, category_) {
  switch (event) {
    case "ADD":
      data[goodsName] = {
        price: price_,
        category: category_,
      };
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
  swal({
    title: "hapus barang ini",
    text: `ini akan menghapus barang ${goodsName.id} secara permanen`,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "hapus",
    cancelButtonText: "batalkan",
    closeOnConfirm: false,
    closeOnCancel: false,
  }).then(function (isConfirm) {
    if (isConfirm) {
      swal({
        title: "dihapus",
        icon: "success",
      });
      goodsName.remove();
      return;
    }
    swal({
      title: "dibatalkan",
      icon: "warning",
    });
  });
}

function add() {
  let goodsName = document.querySelector("#goods");
  let price = document.querySelector("#price");
  let category = document.querySelector("#category");

  let formatPrice = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
  }).format(price.value);

  if (!dataValid(goodsName.value, price)) {
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
              <td><span class="no"></span></td>
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

  listFilter.forEach((data) => {
    let textValue = data.id.toLowerCase();
    if (textValue.indexOf(filter.trim()) > -1) {
      data.style.display = "";
    } else {
      data.style.display = "none";
    }
  });
});
//end search engine
//end main app

//protocol
// check if the form have value will be true and vise versa
function dataValid(goodsName, price) {
  let symbol = "%^!{}>:;,?<=÷×+€£¥₩_|《》¡¿¤`~°♡*";
  for (let i of goodsName) {
    if (symbol.indexOf(goodsName[i]) > -1) {
      swal({
        title: "Data tidak valid",
        text: `simbol ini ${goodsName[i]} dilarang`,
        icon: "warning",
      });
      return false;
    }
  }
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
