
//=====================Toast function===========================
 // Toast function
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
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle"
        };
        const icon = icons[type];
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
if(localStorage.getItem("userLogin")) {
    alert("Bạn đã đăng nhập!")
    window.location.href='/'
}

const validateEmail = {
    isEmail: function (emailString) {
        // regex email
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailString)
    }
}

const validatePassword = {
    isPassword: function (passwordString) {
        //regex password có nhiều hơn 3 ký tự
        return /^.{3,}$/.test(passwordString)
    }
}

const validatePhoneNumber = {
    isPhoneNumber: function (phoneNumberString){
        //regex phonenumber có 10 ký tự
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(phoneNumberString)
    }
}

const validateAddress = {
    isAddress: function (addressString) {
        //regex address có nhiều hơn 3 ký tự
        return /^.{3,}$/.test(addressString)
    }
}

const validateAvatar = {
    isAvatar: function (avatarString) {
        //regex avatar có nhiều hơn 3 ký tự
        return /^.{3,}$/.test(avatarString)
    }
}

function register(eventForm) {
    /* Ngăn chặn hành vi mặc định của form (hành vi gọi tới action) */
    eventForm.preventDefault();

    if (!(validateEmail.isEmail(eventForm.target.email.value))) {
        showErrorToast_email()
        // alert("Email không đúng định dạng!")
        return
    }

    if (!(validatePassword.isPassword(eventForm.target.password.value))) {
        // alert("Password không đúng định dạng!")
        showErrorToast_password()
        return
    }

    if (!(validatePhoneNumber.isPhoneNumber(eventForm.target.phoneNumber.value))) {
        // alert("SĐT không đúng định dạng!")
        showErrorToast_phonenumber()
        return
    }

    if (eventForm.target.password.value != eventForm.target.password_confirm.value) {
        // alert("Mật khẩu và mật khẩu nhập lại phải giống nhau!")
        showErrorToast_passwordwrong()
        return
    }

    if (!(validateAddress.isAddress(eventForm.target.address.value))) {
        // alert("Address không đúng định dạng!")
        showErrorToast_address()
        return
    }

    if (!(validateAvatar.isAvatar(eventForm.target.avatar.value))) {
        // alert("Avatar không đúng định dạng!")
        showErrorToast_avatar()
        return
    }


    if (localStorage.getItem("users")) {  // người thứ n
        let users = JSON.parse(localStorage.getItem("users"));
        
        if (users.find(user => user.email == eventForm.target.email.value)) { //Email đã tồn tại ---> return luôn
            // alert("Email đã tồn tại!")
            showErrorToast_emailexist();
            return
        }

        if(eventForm.target.email.value.includes("admin@gmail.")){
            // alert("Email ko đc chứa admin!")
            showErrorToast_email_noticlude_admin();
            return
        }

        users.push(
            {
                id: Date.now() * Math.random(),
                email: eventForm.target.email.value,
                password: eventForm.target.password.value,
                role: 0, // 1: admin, 0: member,
                phoneNumber: eventForm.target.phoneNumber.value,
                avatar: eventForm.target.avatar.value,
                address: eventForm.target.address.value,
                carts: []
            }
        )

        localStorage.setItem("users", JSON.stringify(users)) // save

        // alert("Đăng ký thành công")
        showSuccessToast()
        window.location.href = "./login.html"
    }else {  // người dùng đầu tiên 
        localStorage.setItem("users", JSON.stringify([
            {   
                id: Date.now() * Math.random(),
                email: eventForm.target.email.value,
                password: eventForm.target.password.value,
                role: 0, // 1: admin, 0: member,
                phoneNumber: eventForm.target.phoneNumber.value,
                avatar: eventForm.target.avatar.value,
                address: eventForm.target.address.value,
                carts: []
            }
        ]))
        // alert("Đăng ký thành công")
        showSuccessToast()
        window.location.href = "./login.html"
    }
}

