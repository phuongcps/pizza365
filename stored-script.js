    // for (let bValue of paramDataDrinkObj) {
    //   $(paramID).append(`<option value="${bValue.maNuocUong}">`
    // +`${bValue.tenNuocUong}</option>`);

    //  // Cách 2 
    //  $(paramID).append(document.createElement("option"));
    //  $(`${paramID} option:last-child`).val(vDrinkValueData[bIndex].maNuocUong).text(vDrinkValueData[bIndex].tenNuocUong)

    // // Gọi API để kiểm tra Voucher hợp lệ không (Lưu trữ)
// function callApiCheckVoucher (paramXmlHttp,paramVoucherId) {
//   const vVOUCHER_DETAILS_URL = "http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/";
//   var vUrlAPICall = vVOUCHER_DETAILS_URL+paramVoucherId;

//   paramXmlHttp.open("GET",vUrlAPICall,false)
//   paramXmlHttp.send();
// }



//   // Gọi API lấy danh sách nước và đổ data vào ô select nước (Lưu trữ làm tài liệu)
//   function loadDataDrink2 () {
//     "use strict";

//     var vXmlHttp = new XMLHttpRequest();
//     vXmlHttp.open("GET", "http://42.115.221.44:8080/devcamp-pizza365/drinks", true);
//     vXmlHttp.send();
//     vXmlHttp.onreadystatechange = function() { 
//       if (this.readyState == 4 && this.status == 200) {
//         addDataToSelectDrink ("#select-drink,#drink-confirm",this.responseText);
//         //testDataInput() //sử dụng khi muốn điền nhanh dữ liệu input test code
//       }
//     }
//   }

// // Dùng để tạo API đơn hàng cho back-end và trả Order ID cho khách hàng (lưu trữ)
// function sendOrderData2 (paramOrderObj) {
//     var vOrderAPICall = new XMLHttpRequest () ;
//     callAPIGetOrder (vOrderAPICall,paramOrderObj)
//     vOrderAPICall.onreadystatechange = function () {
//       if (this.readyState == 4 && this.status == 201) { // status 201 tao thanh cong
//         // vì đã tạo đơn hàng back-end thành công nên ta xóa đơn hàng trên front-end tránh sự cố
//         for (let bValue in paramOrderObj) {
//           delete paramOrderObj [bValue]
//         }
//         var vCreatedOrder = JSON.parse(this.responseText);
//         console.log(`%cĐơn hàng đã được gửi đến cửa hàng . Thông tin đơn hàng`,"color:red")
//         console.log(vCreatedOrder);
//         // Hiện khung trả Order ID và xuất Order ID
//         $("#div-order-id-return").show("slow");
//         $("#order-id-return").val(vCreatedOrder.orderId);
//         // Gán Url sang trang viewOrder vào các nút
//         $("a[name=order-detail-info]").each(function(){
//           this.href = `viewOrder.html?id=${vCreatedOrder.id}&orderId=${vCreatedOrder.orderId}`
//         });
//         alert ("Đơn hàng đã được gửi đến cửa hàng. Xem cuối trang web để nhận Order ID");
//         }
//       }
//   }

//   // Gọi API để post đơn hàng khách hàng
//   function callAPIGetOrder (paramXmlHttp,paramOrderObj) {
//     paramXmlHttp.open("POST","http://42.115.221.44:8080/devcamp-pizza365/orders", true);
//     paramXmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//     paramXmlHttp.send(JSON.stringify(paramOrderObj));
//   }
