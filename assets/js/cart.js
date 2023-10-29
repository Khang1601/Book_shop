

// =======================Toast message============================
function showSuccessToast() {
    toast({
        title: "Thành công!",
        message: "Đã xóa sản phẩm khỏi giỏ hàng.",
        type: "success",
        duration: 5000
    });
}
function showSuccessToast_increase() {
    toast({
        title: "Thành công!",
        message: "Đã tăng thêm 1 sản phẩm.",
        type: "success",
        duration: 5000
    });
}
function showSuccessToast_decrease() {
    toast({
        title: "Thành công!",
        message: "Đã giảm đi 1 sản phẩm.",
        type: "success",
        duration: 5000
    });
}

//=====================Toast function===============================
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
        const toast = document.createElement("div");

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            main.removeChild(toast);
        }, duration + 1000);

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoveId);
            }
        };

        const icons = {
            //hiển thị icon
            //lấy ở fontawesome
            //<i class="fa fa-exclamation-circle" aria-hidden="true"></i>
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
        // lấy ra thời gian delay
        // toFixed(2) , lấy 2 số sau dấu phẩy 3.22  4.78 45.66
        const delay = (duration / 1000).toFixed(2);

        toast.classList.add("toast", `toast--${type}`);
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fas fa-times"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}


//========================Convert VND========================================================
//hàm convert tiền tệ
const VND = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

//=====================Render table data===============================
function renderTableData(productList) {
    let tableDataString = ``;

    for (let i = 0; i < productList.length; i++) {
        tableDataString += `
            <tr>
                <td scope="row">${i + 1}</td>
                <td>${productList[i].name}</td>
                <td>${VND.format(productList[i].price)}</td>
                <td>
                    <img style="width: 100px; height: 100px; border-radius: 50%;" src="${productList[i].avatar}" >
                </td>
                <td>${productList[i].category}</td>
                <td>
                    <button onclick="updateItem(${productList[i].id}, '-')">-</button>
                    ${productList[i].quantity}
                    <button onclick="updateItem(${productList[i].id}, '+')">+</button>
                </td>
                <td>${VND.format(productList[i].quantity * productList[i].price)}</td>
                <td><button onclick="deleteItem(${productList[i].id})" type="button" class="btn btn-danger">Delete</button></td>
            </tr>
        `
    }

    tableDataString += `
            <tr id="table_data_row">
                <td></td>
                <td><b>Tổng Cộng</b></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <b> 
                        ${VND.format(productList.reduce((result, nextItem) => {
                            return result += (nextItem.quantity * nextItem.price)
                        }, 0))}
                    </b>
                </td>
                <td></td>
            </tr>
        `
    document.getElementById("table_data").innerHTML = tableDataString;
}
renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)


function deleteItem(productId) {
    if (!confirm("Bạn muốn xóa sản phẩm này?")) {
        return
    }

    //toast xóa sp
    showSuccessToast()

    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let userCart = userLogin.carts;
    userLogin.carts = userCart.filter(item => item.id != productId);

    //save to local
    localStorage.setItem("userLogin", JSON.stringify(userLogin))

    let users = JSON.parse(localStorage.getItem("users"));

    users = users.map(user => {
        if (user.id == userLogin.id) {
            return userLogin
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users))

    // reload
    renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)

}


function updateItem(productId, type) {
    let userLogin = JSON.parse(localStorage.getItem("userLogin"));
    let userCart = userLogin.carts;
    if (type == '-') { //giảm sp

        //toast giảm sp
        showSuccessToast_decrease()
        for (let i in userLogin.carts) {
            if (userLogin.carts[i].id == productId) {

                if (userLogin.carts[i].quantity == 1) {
                    deleteItem(productId);
                    return
                } else {
                    userLogin.carts[i].quantity -= 1;
                }

                break;
            }
        }
    } else { //tăng sp

        //toast tăng sp
        showSuccessToast_increase()
        userLogin.carts = userCart.map(item => {
            if (item.id == productId) {
                item.quantity += 1;

            }
            return item
        });
    }

    //save to local
    localStorage.setItem("userLogin", JSON.stringify(userLogin))

    let users = JSON.parse(localStorage.getItem("users"));

    users = users.map(user => {
        if (user.id == userLogin.id) {
            return userLogin
        }
        return user
    })
    localStorage.setItem("users", JSON.stringify(users))
    // reload
    renderTableData(JSON.parse(localStorage.getItem("userLogin")).carts)
}

//=======================Sort price=============================================
let flag = false;
function sortByPrice() {
  let products = JSON.parse(localStorage.getItem("userLogin")).carts;
  if (flag) {
    products.sort((a, b) => a.price - b.price);
  } else {
    products.sort((a, b) => b.price - a.price);
  }
  flag = !flag;
  renderTableData(products)
}