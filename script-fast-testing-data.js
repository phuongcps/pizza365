// dùng cho mục đích điền nhanh dữ liệu input để test code
function testDataInput () {
    $("#input-fullname").val("Phương Nguyễn");
    $("#input-email").val("phuongnguyen@gmail.com");
    $("#input-dien-thoai").val("0909090909" );
    $("#input-dia-chi").val("Hồ Chí Minh");
    $("#input-voucher").val(70056); // 12354, 46253, 96462, 44306
    $("#select-drink").val("COCA");
    $("#drink-confirm").val("COCA");
    $("#input-message").val("Đế mỏng");
    gSelectedPizzaSize = "L";
    $("#select-pizza-size").val(gSelectedPizzaSize);
    gSelectedPizzaType = "hawaii";
    $("#select-pizza-type").val(gSelectedPizzaType);
    gSelectedPizzaTypeDetail = gTYPE_OF_PIZZA_DETAIL[gSelectedPizzaType].typeName;
}
