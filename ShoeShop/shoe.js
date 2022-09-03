class Product {
    constructor(id, name, photo, size, color, price, quantity) {
        this.id = id;
        this.name = name;
        this.photo = photo;
        this.size = size;
        this.color = color;
        this.price = price;
        this.quantity = quantity;
    }
}
const product_key = "data";
var products = [];

// Lưu mã nguồn bằng localstorage
function init() {
    if (localStorage.getItem(product_key) == null) {
        products = [new Product(
            1,
            "Nike",
            "https://media.istockphoto.com/photos/white-sneaker-on-a-blue-gradient-background-mens-fashion-sport-shoe-picture-id1303978937?b=1&k=20&m=1303978937&s=170667a&w=0&h=az5Y96agxAdHt3XAv7PP9pThdiDpcQ3otWWn9YuJQRc=",
            "36,37,38",
            "White",
            650000,
            10,
        ),
        new Product(
            2,
            "Classic",
            "https://media.istockphoto.com/photos/white-sneakers-shoes-on-colorful-background-picture-id1293462379?k=20&m=1293462379&s=612x612&w=0&h=PFmGNk32WAJ5LceHqqN6F2qDR1UBCjF8umfoozn1_ds=",
            "36,37,38",
            "Black",
            450000,
            20,
        ),
        new Product(
            3,
            "Adidas",
            "https://media.istockphoto.com/photos/side-view-of-one-white-unisex-sneaker-with-velcro-fasteners-standing-picture-id1329466914?k=20&m=1329466914&s=612x612&w=0&h=gXE7cFAInh_4T4-BDYpV7nQiZvtH1FdYAV3SVgifR_k=",
            "36,37,38",
            "White",
            750000,
            15,
        ),
    ];
        setData(product_key, products);
    } else {
        products = getData(product_key);
    }

}
function setData(key, data) {
    return localStorage.setItem(key, JSON.stringify(data));
}
function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}


// Hiển thị sản phẩm

function renderProduct(renderProduct) {
    let htmls = renderProduct.map(function (product) {
        return ` <tr class="text-center">
        <td>${product.name}</td>
        <td>
        <img class="photo-sm" src="${product.photo}" alt="Invalid photo">
        </td>
        <td>${product.size}</td>
        <td>${product.color}</td>
        <td>${product.price}</td>
        <td>${product.quantity}</td>
        <td>
            <button class="btn-edit-delete btn-edit " onclick= "makeEdit(${product.id})">Edit</button>
            <button class="btn-edit-delete btn-delete" onclick = "makeDelete(${product.id})">Delete</button>
        </td>
    </tr>`
    })
    document.querySelector(".tbody").innerHTML = htmls.join("");
}

// Khi click vào để mở add

function openAdd() {
    document.querySelector(".model-container").classList.add('show');

}

// Đóng nút x
function closeAdd() {
    document.querySelector(".model-container").classList.remove('show');
    reset()

}
// Cancel khi bung màn add lên

function makeCancel() {
    document.querySelector(".model-container").classList.remove('show');
    reset()
}

// Thêm sản phẩm khi bung màn add lên

function makeAdd() {
    let id = findMaxid() + 1;
    let name = document.querySelector("#name").value;
    let photo = document.querySelector("#photo").value;
    let size = document.querySelector("#size").value;
    let color = document.querySelector("#color").value;
    let price = document.querySelector("#price").value;
    let quantity = document.querySelector("#quantity").value;
    if ( name.trim() == "" || name == null || photo.trim()=="" || photo == null || color.trim() == "" || color == null || size.trim() == "" || size == null) {
        alert("Please You can enter wrong information and empty string");
        return;
    };
    if (quantity < 0 || quantity == "") {
        alert('Quantity cannot be negative and empty string');
        return;
    };
    if (price <= 0 || price > 1000000 || price == "") {
        alert('Price cannot be negative and than more one milion and empty string');
        return;
    };
    let newProduct = new Product(
        id,
        name,
        photo,
        size,
        color,
        price,
        quantity,
    )


    products.unshift(newProduct);
    setData(product_key, products);
    renderProduct(products);
    reset()
    closeAdd()

}
// reset 
function reset() {
    // thêm id =0 để khi reset lại sẽ không giữa id của thằng trc
    document.querySelector("#productId").value = "0";
    document.querySelector("#name").value = "";
    document.querySelector("#photo").value = "";
    document.querySelector("#size").value = "";
    document.querySelector("#color").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#quantity").value = "";
    document.querySelector(".btn-warning").classList.add('d-none');
    document.querySelector(".btn-primary").classList.remove('d-none');

}

// id
function findMaxid() {
    let arrCopy = [...products];
    arrCopy.sort(function (p1, p2) {
        return p2.id - p1.id;
    })
    console.log("max id: " + arrCopy[0].id);
    return arrCopy[0].id;
}
// P2-p1 giảm dần, nhưg id thì tăng lên 

// xóa sản phẩm

function makeDelete(id) {
    let index = products.findIndex(function (p) {
        return p.id == id;
    })
    let confir = confirm('Are you sure?');
    if (confir) {
        products.splice(index, 1);
        setData(product_key, products);
        renderProduct(products);
    }
}

// chỉnh sửa thông tin sản phẩm

function makeEdit(productId) {
    openAdd();
    document.querySelector(".btn-warning").classList.remove('d-none');
    document.querySelector(".btn-primary").classList.add('d-none');

    let product = products.find(function (pro) {
        return pro.id == productId;
    })
    console.log(product)
    document.querySelector("#productId").value = product.id;
    document.querySelector("#name").value = product.name;
    document.querySelector("#photo").value = product.photo;
    document.querySelector("#size").value = product.size;
    document.querySelector("#color").value = product.color;
    document.querySelector("#price").value = product.price;
    document.querySelector("#quantity").value = product.quantity;
    

    document.querySelector(".modeltitle").innerText = "Update the Shoe";
}

// lưu sản phẩm khi edit bung màn 

function makeSave() {
    let id = document.querySelector("#productId").value;
    let product = products.find(function (pro) {
        return pro.id == id;
    })

    product.name = document.querySelector("#name").value;
    product.photo = document.querySelector("#photo").value;
    product.size = document.querySelector("#size").value;
    product.color = document.querySelector("#color").value;
    product.price = document.querySelector("#price").value;
    product.quantity = document.querySelector("#quantity").value;

    if (product.name.trim() == "" || product.name == null ||  product.photo.trim()== "" ||  product.photo==null
    || product.color.trim() == "" || product.color== null || product.size.trim() == "" || product.size == null ) {
        alert("Please input  the name product and empty string and wrong information");
        return;
    };
   
    if (product.quantity < 0 || product.quantity == "") {
        alert('Quantity cannot be negative and empty string');
        return;
    };
    if (product.price <= 0 || product.price > 1000000 || product.price == "") {
        alert('Price cannot be negative and than more one milion and empty string');
        return;
    };


    setData(product_key, products);
    closeAdd();
    renderProduct(products);
}

// Tìm kiếm

function search() {
    let keyword = document.querySelector("#search").value;
    console.log(keyword);
    let result = products.filter(function (product) {
        return product.name.toLowerCase().includes(keyword.toLowerCase())
    });
    renderProduct(result);
    console.log(result);
}


init()
renderProduct(products);
