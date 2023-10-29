
//========================Convert VND========================================================
//hàm convert tiền tệ
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

//============================Print users======================================================
// function print users
function printUsers() {
    let users = JSON.parse(localStorage.getItem("users"));


    // carts = users[1].carts[0].name;
    // console.log("***",carts)

    // carts = users[2].carts[0].name + ", " + users[2].carts[1].name;
    // console.log("***",carts)

    // carts = JSON.parse(localStorage.getItem("users"))[1].carts[0].name + " x " + JSON.parse(localStorage.getItem("users"))[1].carts[0].quantity;
    // console.log("***",carts)

    // carts = JSON.parse(localStorage.getItem("users")).carts
    // console.log("***",carts)



    let tableContentString = ``;
    for (let i = 0; i < users.length; i++) {

            //sử dụng .map() để lặp qua mảng carts của mỗi người dùng và lấy ra tên của từng sản phẩm 
            //bằng cách sử dụng cartItem.name. Sau đó, chúng tôi đã sử dụng .join(", ") để nối các tên sản phẩm 
            //bằng dấu phẩy và khoảng trắng để tạo ra một chuỗi chứa các tên sản phẩm
            // let cartItems = users[i].carts.map(cartItem => cartItem.name).join(", "); // Get product names
            let cartItems = users[i].carts.map(cartItem => ` ${cartItem.name} (x${cartItem.quantity}) `).join(", ");

            tableContentString += `
                <tr>     
                    <td>${i + 1}</td>
                    <td>${users[i].id}</td>
                    <td>${users[i].role}</td>
                    <td>
                        <img src="${users[i].avatar}" alt="" style="width: 50px; height: 50px; border-radius: 50%;">
                    </td>
                    <td>${users[i].email}</td>
                    <!-- <td>${users[i].password}</td> -->
                    <td>${users[i].phoneNumber}</td>
                    <td>${users[i].address}</td>
                    <td class="limited-cell">
                        <!-- ${users[i].carts} -->
                        ${cartItems}
                    </td>
                    <td class="tool_delete_edit">
                        <button onclick="deleteUser(${users[i].id})" type="button" class="btn btn-delete">Delete</button>
                        <button onclick="loadDataEdit(${users[i].id})" type="button" class="btn btn-edit">Edit</button>
                    </td>
                </tr>
            `
    }

    document.getElementById("table_user").innerHTML = tableContentString;
}
printUsers();

//============================Add user======================================================
function addUser(event) {
    event.preventDefault();

    let newUser = {
        id: event.target.id.value,
        role: event.target.role.value,
        avatar: event.target.avatar.value,
        email: event.target.email.value,
        // password: event.target.password.value,
        phoneNumber: event.target.phoneNumber.value,
        address: event.target.address.value,
        carts: []
    }

    let users = JSON.parse(localStorage.getItem("users")); // get

    users.push(newUser); // xử lý

    localStorage.setItem("users", JSON.stringify(users)) // save

    //nhấn add xong rồi xóa, trở lại ban đầu
    event.target.id.value = ""
    event.target.role.value = ""
    event.target.avatar.value = ""
    event.target.email.value = ""
    // event.target.password.value = ""
    event.target.phoneNumber.value = ""
    event.target.address.value = ""
 

    printUsers(); // load lại data
}

//============================Delete user======================================================
function deleteUser(userId) {

    let users = JSON.parse(localStorage.getItem("users")); // get

    users = users.filter(user => user.id != userId);

    localStorage.setItem("users", JSON.stringify(users)) // save

    printUsers(); // load lại data
}

//===========================Edit user data=======================================================
function loadDataEdit(userId) {
    if (localStorage.getItem("users")) {
        let user = JSON.parse(localStorage.getItem("users")).find(user => user.id == userId);

        if (!user) {
            alert("Không tìm thấy người dùng!")
            return
        }

        const updateFormElement = document.getElementById("updateform_user");

        updateFormElement.querySelector(".updateform_user_id").value = user.id;
        updateFormElement.querySelector(".updateform_user_role").value = user.role;
        updateFormElement.querySelector(".updateform_user_avatar").value = user.avatar;
        updateFormElement.querySelector(".updateform_user_email").value = user.email;
        // updateFormElement.querySelector(".updateform_user_password").value = user.password;
        updateFormElement.querySelector(".updateform_user_phoneNumber").value = user.phoneNumber;
        updateFormElement.querySelector(".updateform_user_address").value = user.address;
    }
}


//========================Save user==========================================================
function saveUser(event) {
    event.preventDefault();

    let userUpdate = {

        id: event.target.id.value,
        role: event.target.role.value,
        avatar: event.target.avatar.value,
        email: event.target.email.value,
        // password: event.target.password.value,
        phoneNumber: event.target.phoneNumber.value,
        address: event.target.address.value,
        carts: []
    }

    let users = JSON.parse(localStorage.getItem("users")); // get

    // for (let i = 0; i < users.length; i++) {
    //     if (users[i].id == userUpdate.id) {
    //         users[i] = userUpdate;
    //         break
    //     }
    // }

    // for (let i in users) {
    //     if (users[i].id == userUpdate.id) {
    //         users[i] = userUpdate;
    //         break
    //     }
    // }

    users = users.map((user, index) => {
        if (user.id == userUpdate.id) {
            return userUpdate
        }
        return user
    })

    localStorage.setItem("users", JSON.stringify(users)) // save

    printUsers(); // load lại data
}





/* =============================================================================================== */
/* ====================================PRODUCT==================================================== */
/* =============================================================================================== */


//============================Print products======================================================
// function print products
function printProducts() {
    let products = JSON.parse(localStorage.getItem("products"));

    let tableContentString_products = ``;
    for (let i = 0; i < products.length; i++) {    
            tableContentString_products += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${products[i].id}</td>
                    <td>${products[i].name}</td>
                    <td>
                        ${products[i].avatar}
                    </td>
                    <td>${products[i].category}</td>
                    <td>${VND.format(products[i].price)}</td>
                    <td>${products[i].sale}</td>
                    
                    <td>
                        <button onclick="deleteProduct(${products[i].id})" type="button" class="btn btn-delete">Delete</button>
                        <button onclick="loadDataEdit_product(${products[i].id})" type="button" class="btn btn-edit">Edit</button>
                    </td>
                </tr>
            `
    }

    document.getElementById("table_product").innerHTML = tableContentString_products;
}
printProducts();

//============================Add products======================================================
function addProduct(event) {
    event.preventDefault();

    let newProduct = {
        id: event.target.id.value,
        name: event.target.name.value,
        avatar: event.target.avatar.value,
        category: event.target.category.value,
        price: event.target.price.value,
        sale: event.target.sale.value,
    }

    let products = JSON.parse(localStorage.getItem("products")); // get

    products.push(newProduct); // xử lý

    localStorage.setItem("products", JSON.stringify(products)) // save

    //nhấn add xong rồi xóa, trở lại ban đầu
    event.target.id.value = ""
    event.target.name.value = ""
    event.target.avatar.value = ""
    event.target.category.value = ""
    event.target.price.value = ""
    event.target.sale.value = ""

    printProducts(); // load lại data
}

//============================Delete product======================================================
function deleteProduct(productId) {

    let products = JSON.parse(localStorage.getItem("products")); // get

    products = products.filter(product => product.id != productId);

    localStorage.setItem("products", JSON.stringify(products)) // save

    printProducts(); // load lại data
}

//===========================Edit product data=======================================================
function loadDataEdit_product(productId) {
    if (localStorage.getItem("products")) {
        let product = JSON.parse(localStorage.getItem("products")).find(product => product.id == productId);

        if (!product) {
            alert("Không tìm thấy sách!")
            return
        }

        const updateFormElement = document.getElementById("updateform_product");

        updateFormElement.querySelector(".updateform_product_id").value = product.id;
        updateFormElement.querySelector(".updateform_product_name").value = product.name;
        updateFormElement.querySelector(".updateform_product_avatar").value = product.avatar;
        updateFormElement.querySelector(".updateform_product_category").value = product.category;
        updateFormElement.querySelector(".updateform_product_price").value = product.price;
        updateFormElement.querySelector(".updateform_product_sale").value = product.sale;
    }
}

//========================Save product==========================================================
function saveProduct(event) {
    event.preventDefault();

    let productUpdate = {

        id: event.target.id.value,
        name: event.target.name.value,
        avatar: event.target.avatar.value,
        category: event.target.category.value,
        price: event.target.price.value,
        sale: event.target.sale.value,
    }

    let products = JSON.parse(localStorage.getItem("products")); // get

    products = products.map((product, index) => {
        if (product.id == productUpdate.id) {
            return productUpdate
        }
        return product
    })

    localStorage.setItem("products", JSON.stringify(products)) // save

    printProducts(); // load lại data
}