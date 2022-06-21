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

function deleteproduct(id) {
  // let products = localStorage.getItem("product");
  // products = JSON.parse(products).filter((pro) => pro._id != index);
  axios.delete("http://localhost:3000/deleteProduct/" + id);
  document.getElementsByClassName(id)[0].remove();
  // localStorage.setItem("product", JSON.stringify(products));

  // showProducts();
}

showProducts();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  // let products = localStorage.getItem("product");

  // if (products != null) {
  //   p_id = JSON.parse(products).length + 1;
  // } else {
  //   p_id = 1;
  // }

  let p_title = document.getElementById("productTitle");
  let p_category = document.getElementById("productCategory");
  let p_quantity = document.getElementById("productQuantity");
  let p_price = document.getElementById("productPrice");

  let prodDiv = document.querySelector(".product-wrapper");
  try {
    prodDiv.querySelector("h1").remove();
  } catch (e) {}

  let new_product = {
    // _id: p_id,
    name: p_title.value,
    category: p_category.value,
    quantity: p_quantity.value,
    price: p_price.value,
  };
  let axiosConfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  };
  axios
    .post("http://localhost:3000/addProduct", new_product, axiosConfig)
    .then((res) => {
      data = document.createElement("div");
      data.innerHTML = `
          <div class="card-body"">
          <h5 class="card-title">${res.data.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${res.data.category}</h6>
          <p>Stock: ${res.data.quantity} Price : ${res.data.price} $</p>
          <a id ="${res.data._id}" href="#" onclick="deleteproduct(this.id)" class="btn btn-primary">
          Delete
          </a>
          <a id ="${res.data._id}" href="#" onclick="edit(this.id)" class="btn btn-primary">
        Manage
        </a>
          </div>`;
      data.classList.add("product-card");
      data.classList.add(res.data._id);
      prodDiv.appendChild(data);

      console.log(res.data);
    });
  // fetch("http://localhost:3000/addProduct", {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json;charset=utf-8",
  //   },
  //   body: JSON.stringify(new_product),
  // }).then((e) => {
  //   console.log(e);
  // });

  // if (products == null) {
  //   products = [];
  // } else {
  //   products = JSON.parse(products);
  // }
  // products.push(new_product);
  // localStorage.setItem("product", JSON.stringify(products));
});

function showProducts() {
  // let product = localStorage.getItem("product");

  // let prodDiv = document.querySelector(".product-wrapper");
  // prodDiv.innerHTML = "";
  // if (product == "[]" || product == null) {
  //   let noProduct = document.createElement("h1");
  //   noProduct.innerText = "You have no Products. Try adding Products first!";
  //   prodDiv.appendChild(noProduct);
  // }
  let product = [];
  let axiosConfig = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  };
  axios.get("http://localhost:3000/getProducts", axiosConfig).then((res) => {
    console.log(res.data);
    res.data.products.map((pro) => {
      product.push(pro);
    });
    let prodDiv = document.querySelector(".product-wrapper");
    prodDiv.innerHTML = "";

    product.map((pro) => {
      let data = document.createElement("div");
      data.innerHTML = `
          <div class="card-body"">
          <h5 class="card-title">${pro.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${pro.category}</h6>
          <p>Stock: ${pro.quantity} Price : ${pro.price} $</p>
          <a id ="${pro._id}" href="#" onclick="deleteproduct(this.id)" class="btn btn-primary">
          Delete
          </a>
          <a id ="${pro._id}" href="#" onclick="edit(this.id)" class="btn btn-primary">
        Manage
        </a>
          </div>`;
      data.classList.add("product-card");
      data.classList.add(res.data._id);
      prodDiv.appendChild(data);
    });
  });

  // if (product != null) {
}
// }

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
