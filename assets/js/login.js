
//=====================Toast function===========================
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


//=====================Main===========================
if (localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href = '/'
}

//function khi nhấn login
function login(event) {
    event.preventDefault();
    let infor = { //các giá trị nhập vào form
        email: event.target.email.value,
        password: event.target.password.value,
    }

    if (localStorage.getItem("users")) { //nếu có các users
        let users = JSON.parse(localStorage.getItem("users"));

        //Hàm mũi tên này nhận một đối tượng user cá nhân làm đối số và kiểm tra xem thuộc tính email của nó 
        //có khớp với thuộc tính email của đối tượng infor không. Nếu điều kiện đúng, phương thức find sẽ trả về 
        //đối tượng user hiện tại là kết quả.
        let user = users.find(user => user.email == infor.email);

        if (user) {  //tìm thấy user
            if (user.password == infor.password) {  //ktra password - đúng password
                // login thành công!
                // localStorage.setItem("userLogin", user.id)

                if ( user.role == 1) { //user.email.includes("admin@gmail.") &&
                    // alert("đây là tài khoản admin")
                    localStorage.setItem("userLogin", JSON.stringify(
                        {
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            role: "1", // 1: admin, 0: member
                            phoneNumber: user.phoneNumber,
                            avatar: user.avatar,
                            address: user.address,
                            carts: user.carts
                        }
                    ))
                }else{
                    // alert("tài khoản thường")
                    localStorage.setItem("userLogin", JSON.stringify(
                        {
                            id: user.id,
                            email: user.email,
                            password: user.password,
                            role: "0", // 1: admin, 0: member
                            phoneNumber: user.phoneNumber,
                            avatar: user.avatar,
                            address: user.address,
                            carts: user.carts
                        }
                    ))
                }

                
                // alert("Bạn đã đăng nhập thành công!")
                showSuccessToast()
                window.location.href = '../../index.html'
            } else { //ktra password - sai password
                // alert("Tài khoản or mật khẩu không chính xác!")
                showErrorToast_passwordwrong();
            }
        } else { //ko tìm thấy user
            // alert("Người dùng không tồn tại!")
            showErrorToast_userwrong();
        }
    } else { //nếu ko có các users
        // alert("Sever bận!")
        showErrorToast_sever();
    }

}