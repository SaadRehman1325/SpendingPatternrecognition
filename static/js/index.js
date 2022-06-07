function edit(index) {
  let products = localStorage.getItem("product");
  let product = JSON.parse(products).find((pro) => pro._id == index);
  let productId = product._id;
  let p_title = "bags";
  let p_category = "assessories";
  let p_quantity = "100";
  let p_price = "2000";

  let newProduct = {
    _id: productId,
    name: p_title,
    collection: p_category,
    quantity: p_quantity,
    price: p_price,
  };

  products = JSON.parse(products).filter((pro) => pro._id != index);

  JSON.parse(products).push(newProduct);

  localStorage.setItem("product", JSON.stringify(products));

  showProducts();
}

function deleteproduct(index) {
  let products = localStorage.getItem("product");
  products = JSON.parse(products).filter((pro) => pro._id != index);

  localStorage.setItem("product", JSON.stringify(products));

  showProducts();
}

showProducts();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let products = localStorage.getItem("product");

  if (products != null) {
    p_id = JSON.parse(products).length + 1;
  } else {
    p_id = 1;
  }

  let p_title = document.getElementById("productTitle");
  let p_category = document.getElementById("productCategory");
  let p_quantity = document.getElementById("productQuantity");
  let p_price = document.getElementById("productPrice");

  let prodDiv = document.querySelector(".product-wrapper");
  try {
    prodDiv.querySelector("h1").remove();
  } catch (e) {}

  data = document.createElement("div");
  data.innerHTML = `
      <div class="card-body">
      <h5 class="card-title">${p_title.value}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${p_category.value}</h6>
      <p>Stock: ${p_quantity.value} Price : ${p_price.value} $</p>
      <a id ="${p_id}" href="#" onclick="deleteproduct(this.id)" class="btn btn-primary">
      Delete
      </a>
      <a id ="${p_id}" href="#" onclick="" class="btn btn-primary edit">
      Manage
      </a>
      </div>`;
  data.classList.add("product-card");
  prodDiv.appendChild(data);

  let new_product = {
    _id: p_id,
    name: p_title.value,
    collection: p_category.value,
    quantity: p_quantity.value,
    price: p_price.value,
  };
  if (products == null) {
    products = [];
  } else {
    products = JSON.parse(products);
  }
  products.push(new_product);
  localStorage.setItem("product", JSON.stringify(products));
});

function showProducts() {
  let product = localStorage.getItem("product");

  let prodDiv = document.querySelector(".product-wrapper");
  prodDiv.innerHTML = "";
  if (product == "[]" || product == null) {
    let noProduct = document.createElement("h1");
    noProduct.innerText = "You have no Products. Try adding Products first!";
    prodDiv.appendChild(noProduct);
  }
  if (product != null) {
    JSON.parse(product).map((pro) => {
      data = document.createElement("div");
      data.innerHTML = `
        <div class="card-body">
        <h5 class="card-title">${pro.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${pro.collection}</h6>
        <p>Stock: ${pro.quantity} Price : ${pro.price} $</p>
        <a id ="${pro._id}" href="#" onclick="deleteproduct(this.id)" class="btn btn-primary">
        Delete
        </a>
        <a id ="${pro._id}" href="#" onclick="edit(this.id)" class="btn btn-primary">
      Manage
      </a>
        </div>`;
      data.classList.add("product-card");
      prodDiv.appendChild(data);
    });
  }
}

async function Button() {
  let [fileHandle] = await window.showOpenFilePicker({
    types: [
      {
        description: "Images",
        accept: {
          "image/*": [".png", ".gif", ".jpeg", ".jpg"],
        },
      },
    ],
  });

  let fileData = await fileHandle.getFile();
  Tesseract.recognize(`${fileData.name}`, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    alert(
      "\t The recognized text is given below:\n------------------------------------------\n" +
        text
    );
  });
}
