// =======================Toast message============================
function showSuccessToast() {
  toast({
    title: "Thành công!",
    message: "Đã thêm sản phẩm vào giỏ hàng.",
    type: "success",
    duration: 5000
  });
}
function showErrorToast() {
  toast({
    title: "Thất bại!",
    message: "Đã xóa sản phẩm khỏi giỏ hàng.",
    type: "error",
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


//=====================Log in + Log out=========================================================
function logout() {
  if (confirm("Bạn có chắc chán muốn đăng xuất?")) {
    localStorage.removeItem("userLogin")
    window.location.reload();
  }
}

function checkLogin() {
  let btn_adminEL = document.getElementById("btn_admin");

  let avatar_displayEL = document.getElementById("avatar_display");
  let email_displayEL = document.getElementById("email_display");
  let btn_logoutEL = document.getElementById("btn_logout");
  let btn_loginEL = document.getElementById("btn_login");

  if (localStorage.getItem("userLogin")) {  //đã đăng nhập
    // avatar_displayEL.style.display = "block";
    // avatar_displayEL.src = JSON.parse(localStorage.getItem("users")).find(user => user.id == localStorage.getItem("userLogin")).avatar;
    // email_displayEL.style.display = "block";
    // email_displayEL.innerText = JSON.parse(localStorage.getItem("users")).find(user => user.id == localStorage.getItem("userLogin")).email;

    if (JSON.parse(localStorage.getItem("userLogin")).role == "1" || JSON.parse(localStorage.getItem("userLogin")).email == "admin@gmail.com") {
      btn_adminEL.style.display = "block"
    } else {
      btn_adminEL.style.display = "none"
    }

    avatar_displayEL.style.display = "block";
    avatar_displayEL.src = JSON.parse(localStorage.getItem("userLogin")).avatar;

    email_displayEL.style.display = "block";
    email_displayEL.innerText = JSON.parse(localStorage.getItem("userLogin")).email;

    btn_logoutEL.style.display = "block";
    btn_loginEL.style.display = "none";
  } else {  //chưa đăng nhập
    btn_adminEL.style.display = "none"
    avatar_displayEL.src = "./assets/images/user.png";
    email_displayEL.style.display = "block";
    btn_logoutEL.style.display = "none";
    btn_loginEL.style.display = "block";
  }
}
checkLogin();

//====================Update products + users==========================================================
let categories = ["Thriller", "Science fiction", "Novel", "Self help"]

//tạo danh sách products ---> đưa lên local
let products = [
  {
    id: Date.now() * Math.random(),
    name: "Black Night",
    price: 160000,
    avatar: "./assets/images/book-1.png",
    category_id: 2,
    category: categories[2],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "About The First Night",
    price: 170000,
    avatar: "./assets/images/book-2.png",
    category_id: 0,
    category: categories[0],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Open The Sky",
    price: 180000,
    avatar: "./assets/images/book-3.png",
    category_id: 2,
    category: categories[2],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Book Hard Cover",
    price: 190000,
    avatar: "./assets/images/book-4.png",
    category_id: 2,
    category: categories[2],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "The Big Book Of Science",
    price: 200000,
    avatar: "./assets/images/book-5.png",
    category_id: 1,
    category: categories[1],
    sale: "-50%"
  },
  {
    id: Date.now() * Math.random(),
    name: "By The Air",
    price: 150000,
    avatar: "./assets/images/book-6.png",
    category_id: 1,
    category: categories[1],
    sale: "-50%"
  },
  {
    id: Date.now() * Math.random(),
    name: "Murdering Last Year",
    price: 150000,
    avatar: "./assets/images/book-7.png",
    category_id: 0,
    category: categories[0],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Stay Healthy",
    price: 150000,
    avatar: "./assets/images/book-8.png",
    category_id: 3,
    category: categories[3],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Self Care",
    price: 150000,
    avatar: "./assets/images/book-9.png",
    category_id: 3,
    category: categories[3],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Welcome to Space",
    price: 150000,
    avatar: "./assets/images/book-10.png",
    category_id: 1,
    category: categories[1],
    sale: "-50%"
  },
  {
    id: Date.now() * Math.random(),
    name: "Monsoon",
    price: 150000,
    avatar: "./assets/images/book-11.png",
    category_id: 2,
    category: categories[2],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Every Thing You Ever",
    price: 150000,
    avatar: "./assets/images/book-12.png",
    category_id: 3,
    category: categories[3],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Graphic Design School",
    price: 150000,
    avatar: "./assets/images/book-13.png",
    category_id: 1,
    category: categories[1],
    sale: "-50%"
  },
  {
    id: Date.now() * Math.random(),
    name: "Food Poison",
    price: 150000,
    avatar: "./assets/images/book-14.png",
    category_id: 3,
    category: categories[3],
    sale: "0"
  },
  {
    id: Date.now() * Math.random(),
    name: "Design",
    price: 150000,
    avatar: "./assets/images/book-15.png",
    category_id: 1,
    category: categories[1],
    sale: "-50%"
  },
  {
    id: Date.now() * Math.random(),
    name: "World News",
    price: 150000,
    avatar: "./assets/images/book-16.png",
    category_id: 3,
    category: categories[3],
    sale: "0"
  },
]
//đưa danh sách products lên local
if (!localStorage.getItem("products")) { //chưa có danh sách products thì đẩy lên local
  localStorage.setItem("products", JSON.stringify(products))
}

//tạo danh sách users ---> đưa lên local
let users = [
  {
    id: Date.now() * Math.random(),
    email: "admin@gmail.com",
    password: "123",
    role: 1,// 1: admin, 0: member,
    phoneNumber: '0329577177',
    avatar: "https://thumbs.dreamstime.com/b/admin-sign-laptop-icon-stock-vector-166205404.jpg",
    address: "123 Võ Văn Ngân, Thủ Đức",
    carts: [],
  },
  {
    id: Date.now() * Math.random(),
    email: "member@gmail.com",
    password: "123",
    role: 0,// 1: admin, 0: member,
    phoneNumber: '0815777339',
    avatar: "https://cdn-icons-png.flaticon.com/512/1534/1534903.png",
    address: "456 Tân kỳ Tân quý, Bình Tân",
    carts: [],
  }
]

//đưa danh sách users lên local
if (!localStorage.getItem("users")) { //chưa có danh sách users thì đẩy lên local
  localStorage.setItem("users", JSON.stringify(users))
}

//========================Pagination===============================================================
// let productsListPagination=JSON.parse(localStorage.getItem("products"))||[];
// let items=4;
// let totalPage=Math.ceil(productsListPagination.length/items);
// let currentPage=1;
// let start;
// let end;

// //function render listpage
// function pagination(){
//   let element="";
//   for(let i = 0; i<totalPage; i++){
//       element+=`<span onclick="choosePage(${i+1})" class="page">${i+1}</span>`
//   }
//   document.getElementsByClassName("list-page")[0].innerHTML=element;
// }
// pagination();

// //function chọn trang hiện tại
// function choosePage(current) {
//   console.log("111",current);
//   let pages=document.getElementsByClassName("page");
//   for (let i = 0; i < pages.length; i++) {
//       if (i==current-1) {
//           pages[i].classList.add("active")
//       } else {
//           pages[i].classList.remove("active")
//       }
//   }
//   currentPage=current;
//   startEnd(current);   
// }
// choosePage(1);

// //function tính toán ptử bắt đầu lấy và kết thúc lấy
// function startEnd(currents) {
//   start=(currents-1)*items;
//   end=currents*items;
//   renderTableData();
// }
// startEnd(1);

// //function next page
// function nextPage() {
//   console.log("next");
//   currentPage=++currentPage;
//   if (currentPage>totalPage) {
//       currentPage=4;
//       return;
//   }
//   startEnd(currentPage);
//   choosePage(currentPage);
//   renderTableData();
// }

// //function previous page
// function previousPage() {
//   console.log("previous");
//   currentPage=--currentPage;
//   if (currentPage<=0) {
//       currentPage=1;
//       return;
//   }
//   startEnd(currentPage);
//   choosePage(currentPage);
//   renderTableData();
// }

//========================Convert VND========================================================
//hàm convert tiền tệ
const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

//========================Filter category========================================================
//1. Gọi hàm filterProductsByCategory khi người dùng click chọn danh mục
//==>> Gán sự kiện click cho các nút danh mục để gọi hàm filterProductsByCategory với danh mục tương ứng
document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedCategory = button.getAttribute("data-category");
      filterProductsByCategory(selectedCategory);
    });
  });
});

//2. Tạo hàm filterProductsByCategory để lọc và hiển thị sản phẩm tương ứng với danh mục được chọn
function filterProductsByCategory(category) {
  const filteredProducts = category === "Tất cả" ?
    JSON.parse(localStorage.getItem("products")) :
    JSON.parse(localStorage.getItem("products")).filter(product => product.category === category);

  renderTableData(filteredProducts);
}
///////////////////////////////////////////////////////////////////////////////////////////////////
// function prevPage() {
//   if (currentPage > 1) {
//     currentPage--;
//     renderTableData(JSON.parse(localStorage.getItem("products")));
//   }
// }

// function nextPage() {
//   const totalPages = Math.ceil(products.length / productsPerPage);
//   if (currentPage < totalPages) {
//     currentPage++;
//     renderTableData(JSON.parse(localStorage.getItem("products")));
//   }
// }


//========================Render table data========================================================
// const productsPerPage = 4; // Số sản phẩm trên mỗi trang
// let currentPage = 1; // Trang hiện tại

//function render sản phẩm
function renderTableData(productList) {
  // const startIndex = (currentPage - 1) * productsPerPage;
  // const endIndex = startIndex + productsPerPage;

  let tableDataString = ``;

  for (let i = 0; i < productList.length; i++) {
    // for (let i = startIndex; i < endIndex && i < productList.length; i++) {

    // if(i>=start&&i<end){

    tableDataString += `
      <li>
        <div class="product-card">

          <span class="card-saleoff">${productList[i].sale}</span> 
          <span class="card-category">${productList[i].category}</span>

          <div class="card-banner img-holder" style="--width: 384; --height: 480;">
            
            <img src="${productList[i].avatar}" width="384" height="480" loading="lazy" alt="Black Night" class="img-cover">
     
            <div class="card-action">

              <button class="action-btn" aria-label="quick view" title="Xem nhanh">
                <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
              </button>

              <button class="action-btn" aria-label="add to wishlist" title="Thêm vào Wishlist">
                <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
              </button>

              <button class="action-btn" aria-label="compare" title="So sánh">
                <ion-icon name="repeat-outline" aria-hidden="true"></ion-icon>
              </button>

              <button onclick="buyItem(${productList[i].id})" class="action-btn" aria-label="add to cart" title="Thêm vào giỏ hàng">
                <ion-icon name="bag-handle-outline" aria-hidden="true"></ion-icon>
              </button>

            </div>
          </div>
 
          <div class="card-content">

            <h3 class="h3">
              <a href="#" class="card-title">${productList[i].name}</a>
            </h3>

            <p class="card-category">${productList[i].category}</p> <!-- Hiển thị danh mục -->

            <data class="card-price" value="150">${VND.format(productList[i].price)}</data>

            <div class="rating">

            </div>

          </div>

        </div>
      </li> 
      `
    // }
  }
  document.getElementById("table_data").innerHTML = tableDataString;

}
renderTableData(JSON.parse(localStorage.getItem("products")));



//=====================Sale off time====================================================
function saleoffProducts() {
  const days = document.getElementById('days');
  const hours = document.getElementById('hours');
  const minutes = document.getElementById('minutes');
  const seconds = document.getElementById('seconds');

  const currentYear = new Date().getFullYear();

  // const newYearTime=new Date(`August 30 ${currentYear+1} 00:00:00:00`);
  const newYearTime = new Date(`August 30 ${currentYear} 00:00:00:00`);


  //update countdowntime
  function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    // console.log(s);

    days.innerHTML = d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;

    if (d == 0 & h == 0 && m == 0 && s == 0) {  //kết thúc chương trình giảm giá
      alert("Chương trình giảm giá 50% sách đã kết thúc")
      for (let i = 0; i < products.length; i++) {
        let saleValue = parseFloat(document.querySelectorAll(".card-saleoff")[i].innerText.trim());

        document.querySelectorAll(".card-saleoff")[i].style.display = "none";
        // document.querySelectorAll(".card-saleoff")[i].style.color="yellow";
      }
    } else { //đang có chương trình giảm giá
      for (let i = 0; i < products.length; i++) {
        let saleValue = parseFloat(document.querySelectorAll(".card-saleoff")[i].innerText.trim());
        if (saleValue == 0) {
          document.querySelectorAll(".card-saleoff")[i].style.display = "none";
          // document.querySelectorAll(".card-saleoff")[i].style.color="yellow";
        }
      }
    }
  }
  setInterval(updateCountdown, 1000);
}
saleoffProducts()


//====================Search products==========================================================
function removeAccentLowerCase(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

function searchByInfo(event) {
  //clone về biến productCopy
  let productCopy = [...JSON.parse(localStorage.getItem("products"))];
  //filter ko làm thay đổi mảng ban đầu ---> tìm nội dung nhập vô ở product.name
  productCopy = productCopy.filter(product => removeAccentLowerCase(product.name + product.price + product.category).includes(removeAccentLowerCase(event.target.value)));
  renderTableData(productCopy);
}

//====================Add to cart==========================================================
//fuction lấy thông tin products từ id
function getProductById(productId) {
  return JSON.parse(localStorage.getItem("products")).find(product => product.id == productId);
}

function buyItem(productId) {

  let userLogin = localStorage.getItem("userLogin");
  if (userLogin) { /* đã đăng nhập */
    userLogin = JSON.parse(userLogin);

    // console.log("productId",productId)
    // console.log("productId",getProductById(productId))


    let itemIncart = userLogin.carts.find(item => item.id == productId);
    if (itemIncart) {  /* đã mua rồi ---> tăng quantity lên 1 */
      itemIncart.quantity += 1;

      let carts = userLogin.carts.map(item => {
        if (item.id == itemIncart.id) {
          return itemIncart
        }
        return item
      })

      userLogin.carts = carts;

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

    } else {      /* chưa mua ---> thêm mới */

      let product = getProductById(productId);
      product.quantity = 1;
      userLogin.carts.push(product)
      //save to local
      localStorage.setItem("userLogin", JSON.stringify(userLogin))


      //map thay đổi danh sách ban đầu thành danh sách mới, duyệt qua toàn bộ danh sách
      //kiểm tra xem user.id có trùng với userLogin.id ko
      //nếu trùng cho thông tin thằng đang đăng nhập lên thằng cũ users
      //ko trùng thì trả về thằng cũ users
      //---> lưu lên local
      let users = JSON.parse(localStorage.getItem("users"));
      users = users.map(user => {
        if (user.id == userLogin.id) {
          return userLogin
        }
        return user
      })

      // for (let i = 0; i < users.length; i++) {
      //     if(users[i].id == userLogin.id) {
      //         users[i] = userLogin;
      //     }
      // }

      localStorage.setItem("users", JSON.stringify(users))
    }
  } else { /* chưa đăng nhập vẫn mua đc */

    let cart_notlogin = JSON.parse(localStorage.getItem("cart_notlogin")) || [];

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    let itemInCart = cart_notlogin.find(item => item.id == productId);

    if (itemInCart) { //đã có --> +1
      itemInCart.quantity += 1;
    } else { //chưa có --> thêm mới
      let product = getProductById(productId);
      product.quantity = 1;
      cart_notlogin.push(product);
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem("cart_notlogin", JSON.stringify(cart_notlogin));

  }
  showSuccessToast();
  countCart();
}

// hiển thị người dùng nào đang đăng nhập
// if (localStorage.getItem("userLogin")) {
//   document.getElementById("userlogin").innerText = "User đang login: " + JSON.parse(localStorage.getItem("userLogin")).email
// }

//function hiển thị số sản phẩm đã thêm vào giỏ hàng
function countCart() {
  let userLogin = localStorage.getItem("userLogin");
  let cart_count_el = document.getElementById("cart_count");

  let cart_notlogin = JSON.parse(localStorage.getItem("cart_notlogin")) || [];

  if (userLogin) {  //nếu đã đăng nhập ---> giỏ hàng hiện số sản phẩm
      cart_count_el.innerText = JSON.parse(userLogin).carts.reduce((result, nextItem) => {
      return result += nextItem.quantity;
    }, 0)
  } else {  //nếu chưa đăng nhập 
    cart_count_el.innerText = 0;
    // cart_count_el.innerText = cart_notlogin.reduce((result, nextItem) => {
    //   return result += nextItem.quantity;
    // }, 0)
  }
}
countCart();

//=======================Sort price=============================================
let flag = false;
function sortByPrice() {
  let products = JSON.parse(localStorage.getItem("products"));
  if (flag) {
    products.sort((a, b) => a.price - b.price);
  } else {
    products.sort((a, b) => b.price - a.price);
  }
  flag = !flag;
  renderTableData(products)
}

//=======================Change images + Open review/vieo=============================================
let images_book = ["./assets/images/hero-banner1.png",
  "./assets/images/hero-banner2.png",
  "./assets/images/hero-banner3.png",
  "./assets/images/hero-banner4.png",
]
let desc_book = ["The Call Of The Wild (Tiếng gọi của hoang dã) là câu chuyện cuộc đời phiêu lưu mạo hiểm của chú chó Buck. Buck bị bắt cóc từ trang trại của người chủ giàu có và trở thành chó kéo xe ở khu vực Alaska lạnh giá trong thời kì người ta đổ xô đi tìm vàng thế kỉ 19. Từ cuộc sống bình yên, được cưng chiều, Buck phải làm việc rất khổ cực, chịu đói chịu rét với đủ hạng người độc ác...",
  "White Fang (Nanh Trắng) là một câu truyện về cuộc hành trình của một con chó sói lai chó nhà để trở thành một kẻ được khai hóa trong lãnh thổ Yukon của Canada trong thời kỳ đổ xô đi tìm vàng Klondike cuối thế kỷ 19. Truyện nói sói thì vốn dĩ là động vật hoang dã nhưng nếu chúng ta biết cách thuần phục nó, cũng giống như những thú cưng mà bây giờ người ta thương nuôi...",
  "A Dog's Way Home (Đường Về Nhà Của Cún Con) kể về một cô chó Bella được anh chàng Lucas nhận nuôi. Trong một sự cố cô cún bị đưa đi xa chủ của mình và từ lúc ấy hành trình tự tìm đường về của cô bắt đầu. Chúng ta thường nghe về chó là một loại động vật trung thành, điều đó đúng và được thể hiện rõ trong bộ phim này. Khi Bella bị lạc, cô cún có thể hoàn toàn...",
  "Hachiko (Chú chó đợi chờ) được chuyển ngữ từ cuốn sách Hachiko. El perro que esperaba của nhà văn người Tây Ban Nha Luis Prats. Tác phẩm kể lại một câu chuyện có thật về chú chó Hachiko được một giáo sư nông nghiệp ở Tokyo là ngài Eisaburo Ueno nhận nuôi. Hachiko đặc biệt quấn quýt với chủ. Nó có một thói quen là chạy ra ga Shibuya mỗi buổi chiều để chờ..."
]
let link_book_review = ["https://reviewsach.net/tieng-goi-noi-hoang-da/",
  "https://reviewsach.net/nanh-trang/",
  "https://moveek.com/bai-viet/review-duong-ve-nha-cua-cun-con-cam-dong-va-chan-thanh-1/25761",
  "https://reviewsach.net/hachiko-chu-cho-doi-cho/"]
let link_book_video = ["https://www.youtube.com/watch?v=3LIDv8RZmyk",
  "https://www.youtube.com/watch?v=9GxB2X1PfXQ",
  "https://www.youtube.com/watch?v=nfMUcafyZhc",
  "https://www.youtube.com/watch?v=vrPsDSNm7PU"]

//function click làm đổi ảnh
var count = 0;
function increaseImg() {
  count++;
  if (count > images_book.length - 1) {
    count = 0;
  }
  document.getElementById("hero-banner-img").src = images_book[count];
  document.getElementsByClassName("hero-text")[0].innerText = desc_book[count];
  console.log("tiến");
}

function decreaseImg() {
  count--;
  if (count < 0) {
    count = images_book.length - 1;
  }
  document.getElementById("hero-banner-img").src = images_book[count];
  document.getElementsByClassName("hero-text")[0].innerText = desc_book[count];
  console.log("lùi");
}

// mở review
function openReview() {
  switch (count) {
    case 0:
      window.open(link_book_review[0]);
      break;
    case 1:
      window.open(link_book_review[1]);
      break;
    case 2:
      window.open(link_book_review[2]);
      break;
    default:
      window.open(link_book_review[3]);
  }
}
// mở video 
function openVideo() {
  switch (count) {
    case 0:
      window.open(link_book_video[0]);
      break;
    case 1:
      window.open(link_book_video[1]);
      break;
    case 2:
      window.open(link_book_video[2]);
      break;
    default:
      window.open(link_book_video[3]);
  }
}

//====================Render + Choose star==========================================================
// render star
function renderStar() {
  let text = "";
  for (let i = 0; i < 5; i++) {
    text += `
          <span onclick=chooseStar(${i}) class="material-symbols-outlined">
              star
          </span>
          `
  }
  document.getElementsByClassName("rate-star")[0].innerHTML = text;
}
renderStar();

// click chọn star
function chooseStar(id) {
  console.log(id);
  // let elm=document.getElementsByTagName("span");
  let elm = document.getElementsByClassName("material-symbols-outlined");

  for (let i = 0; i < elm.length; i++) {
    if (i <= id) {
      elm[i].classList.add("yellow-star"); //thêm class .yellow-star
    } else {
      elm[i].classList.remove("yellow-star");
    }

  }
}

//==============================================================================
//---Callback là một hàm sẽ được thực hiện sau khi một hàm khác đã thực hiện xong - vì thế nó có tên là callback
//Trong JavaScript, hàm là đối tượng. Do đó, các hàm có thể lấy các hàm làm đối số và 
//có thể được trả về bởi các hàm khác. Các hàm thực hiện điều này được gọi là 
//higher - order function (Hàm bậc cao hơn). 
//---Bất kỳ hàm nào được truyền dưới dạng đối số được gọi là hàm callback.

/**
 * thêm sự kiện vào các phần tử
 */
const addEventOnElem = function (elm, type, callback) {
  if (elm.length > 1) {
    for (let i = 0; i < elm.length; i++) {
      elm[i].addEventListener(type, callback);
    }
  } else {
    elm.addEventListener(type, callback);
  }
}

//======================Navbar toogle Menu========================================================
/**
 * navbar toogle 
 * là một tính năng thường được sử dụng trong các trang web để điều khiển menu điều hướng (navbar) 
 * trên thiết bị di động hoặc trên các kích thước màn hình nhỏ
 */


//("[data-navbar]") tìm phần tử có thuộc tính data-navbar
//(".data-navbar") tìm phần tử có lớp data-navbar

//navbar
const navbar = document.querySelector("[data-navbar]");
//btn menu, btn close menu, overlay
const navToggler = document.querySelectorAll("[data-nav-toggler]");
//overlay
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}
addEventOnElem(navToggler, "click", toggleNavbar);


//===================Header + Backtopbtn===========================================================
/**
 * active header và backtopbtn khi cuộn xuống 100px
 */

//toàn bộ header
const header = document.querySelector("[data-header]");
//btn backtotop
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}
addEventOnElem(window, "scroll", activeElemOnScroll);


//===================Filter===========================================================
/**
 * filter functionality 
 * chức năng lọc là một tính năng trong các ứng dụng hoặc trang web cho phép người dùng lựa chọn 
 * hoặc áp dụng một tập hợp các tiêu chí để lọc và hiển thị các dữ liệu phù hợp
 */

//3 btn data-filter-btn: featured, suggest và suggest
const filterBtn = document.querySelectorAll("[data-filter-btn]");
//3 thuộc tính data-filter: featured, suggest và suggest
const filterItems = document.querySelectorAll("[data-filter]");

let lastClickedBtn = filterBtn[0];

const filter = function () {
  lastClickedBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedBtn = this;

  for (let i = 0; i < filterItems.length; i++) {
    if (filterItems[i].dataset.filter === this.dataset.filterBtn) {
      filterItems[i].style.display = "block";
    } else {
      filterItems[i].style.display = "none";
    }
  }
}
addEventOnElem(filterBtn, "click", filter);




