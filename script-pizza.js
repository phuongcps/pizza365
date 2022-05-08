// 1.Script ajax

// Check Voucher và trả về %giảm giá (Nếu không hợp lệ trả về 0%)
function callAjaxApiVoucher (paramID) {
  let vDiscountValue = "";
  
  $.ajax({
    url : `https://http-cors-proxy.p.rapidapi.com/http://42.115.221.44:8080/devcamp-voucher-api/voucher_detail/${paramID}`,
    type : "GET",
    crossDomain: true,
    dataType : "json",
    headers : {
      "x-requested-with": "example.com",
      "X-RapidAPI-Host": "http-cors-proxy.p.rapidapi.com",
      "X-RapidAPI-Key": "1f5aad35bemsh5342bef6641da76p1de60djsn0b865307f49e"
    },
    async: false,
    success : pValue => {
      vDiscountValue = pValue.phanTramGiamGia;
    },
    error : () => vDiscountValue = 0
    });

  return vDiscountValue;
}

// Load data nước
function loadDataDrink () {
  "use strict";
  $.ajax({
    url : `https://http-cors-proxy.p.rapidapi.com/http://42.115.221.44:8080/devcamp-pizza365/drinks`,
    type : "GET",
    crossDomain: true,
    dataType : "json",
    headers : {
      "x-requested-with": "example.com",
      "X-RapidAPI-Host": "http-cors-proxy.p.rapidapi.com",
      "X-RapidAPI-Key": "1f5aad35bemsh5342bef6641da76p1de60djsn0b865307f49e"
    },
    async : false,
    success : pValue => {
      addDataToSelectDrink ("#select-drink,#drink-confirm,select[data-property=idLoaiNuocUong]",pValue)
    },
    error : pErr => console.log(pErr)
  })

  // Đổ data vào ô select drink
  function addDataToSelectDrink (paramID,paramDataDrinkObj) {
    for (let bValue of paramDataDrinkObj) {
      $(paramID).append(`<option value="${bValue.maNuocUong}">`
                        +`${bValue.tenNuocUong}</option>`);
    }

  }
}

// Gửi đơn hàng và tạo đơn tại backend khi đã confirm
function callAjaxGetOrderId (paramOrderObj) {
  $.ajax ({
    url : "https://http-cors-proxy.p.rapidapi.com/http://42.115.221.44:8080/devcamp-pizza365/orders",
    type : "POST",
    crossDomain : true,
    dataType : "json",
    data : JSON.stringify(paramOrderObj),
    contentType : "application/json;charset=UTF-8",
    headers: {
      'x-requested-with': 'example.com',
      'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
      'X-RapidAPI-Key': '1f5aad35bemsh5342bef6641da76p1de60djsn0b865307f49e'
    },
    async : false,
    success : pValue => exportOrderId(pValue,paramOrderObj),
    error : () => console.log("failed")
  })
  // console.log(encodeURIComponent("http://42.115.221.44:8080/devcamp-pizza365/orders"));
  // fetch ("https://http-cors-proxy.p.rapidapi.com/http://42.115.221.44:8080/devcamp-pizza365/orders",{
  //   method : "POST",
  //   body: JSON.stringify(paramOrderObj),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'x-requested-with': 'example.com',
  //     'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
  //     'X-RapidAPI-Key': '1f5aad35bemsh5342bef6641da76p1de60djsn0b865307f49e'
  //   },  
  // }).then (respone => respone.json())
  //   .then (vDate => console.log(vDate))
  //   .catch (err => console.log("Loi"))
} 


function callAjaxByOrderId(paramId) {
$.ajax({
  url : "https://cors-anywhere.herokuapp.com/http://42.115.221.44:8080/devcamp-pizza365/orders/"+paramId,
  type : "GET",
  dataType : "json",
  async : false,
  headers: {
    'Content-Type': 'application/json',
    'x-requested-with': 'example.com',
    'X-RapidAPI-Host': 'http-cors-proxy.p.rapidapi.com',
    'X-RapidAPI-Key': '1f5aad35bemsh5342bef6641da76p1de60djsn0b865307f49e'
  },  
  success : (pValue) => {
    alert(`Lấy đơn hàng by Order Id thành công`);
    exportSearchByOrderId (pValue)
  },
  error : () => alert (`Không tồn tại đơn hàng`),
})
}
// End of Ajax JS

// 2 Modal Confirm

function modalConfirmOrder () {
  const g_MODAL_CONFIRM_ORDER = 
  `<div id="modal-confirm-order" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Xác nhận đơn hàng</h5>
          <button class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="container">
            <p class="h3 text-center mt-5"> Chi tiết đơn hàng</p>
            <div id="modal-order-confirm-info">
              <div title="order-detail"  class="row form-group">
                <label>Họ và tên</label>
                <input data-property="hoTen" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail" class="row form-group">
                <label>Email</label>
                <input data-property="email" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail" class="row form-group">
                <label>Số điện thoại</label>
                <input data-property="soDienThoai" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail" class="row form-group">
                <label>Địa chỉ</label>
                <input data-property="diaChi" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Lời nhắn</label>
                <input data-property="loiNhan" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail" class="row form-group">
                <label>Combo Pizza</label>
                <select data-property="kichCo" type="text" class="form-control" disabled>
                  <option value="">Chọn Pizza Size</option>
                  <option value="S">Small</option>
                  <option value="M">Medium</option>
                  <option value="L">Large</option>
                </select>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Đường kính Pizza (cm)</label>
                <input data-property="duongKinh" type="text" class="form-control" alt="duongKinh" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Sườn nướng (miếng)</label>
                <input data-property="suon" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Salad (gr)</label>
                <input data-property="salad" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Đồ uống</label>
                <select data-property="idLoaiNuocUong" class="form-control" disabled>
                  ${$("#select-drink").prop("innerHTML")}
                </select>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Số lượng nước uống</label>
                <input data-property="soLuongNuoc" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Loại Pizza (pizza type)</label>
                <select data-property="loaiPizza" type="text" class="form-control" disabled>
                  <option value="">Chọn Pizza Type</option>
                  <option value="seafood">OCEAN MANIA</option>
                  <option value="bacon">CHEESY CHICKEN BACON</option>
                  <option value="hawaii">HAWAIIAN</option>
                </select>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Giá</label>
                <input data-property="thanhTien" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Voucher ID (mã voucher)</label>
                <input data-property="idVourcher" type="text" class="form-control" disabled>
              </div>
              <div  title="order-detail" class="row form-group">
                <label>Giảm giá (% discount)</label>
                <input data-property="giamGia" type="text" class="form-control" disabled>
              </div>
              <div title="order-detail"  class="row form-group">
                <label>Thành tiền phải thanh toán</label>
                <input data-property="giaCuoiCung" type="text" class="form-control" disabled>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-danger" data-dismiss="modal">Quay lại</button>
          <button id="modal-btn-confirm-order" class="btn btn-warning">Tạo đơn</button>
        </div>
      </div>
    </div>
  </div>`

  let bNewModal = $.parseHTML(g_MODAL_CONFIRM_ORDER)

  return bNewModal ;
}

// End of Modal Confirm 


// 3. Closure stored HTML (Anti modify HTML)

// Closure ứng dụng , nested function
function storedElementHTML (paramAllSelector) {

  paramAllSelector = !Array.isArray(paramAllSelector) ? [paramAllSelector] : paramAllSelector;

  const vAllAttributeElement = paramAllSelector.map((element) => {
    var bAllAttributeObj = {};
    element.getAttributeNames().forEach((attributeName) =>
      bAllAttributeObj[attributeName] = element.getAttribute(attributeName));
    return bAllAttributeObj;
  });

  const vGetAttributeElement = {

    // Arrow function , bỏ từ function và thay bằng dấu =>
    // Nếu chỉ có 1 hành động duy nhất thì bỏ luôn scope {} và thay bằng hành động , đồng thời bỏ chữ return
    // Nếu chỉ có 1 tham số thì không cần dấu () mà ghi thẳng param ra
    getAllElementJquery : () => $(paramAllSelector),
    getAllElement : () => paramAllSelector,
    getElementByIndex : index => paramAllSelector[index],
    // chỉ tính các attribute trên dom (Ko có các attribute trong data jquery)
    getAttributeValue : (index,attribute) => vAllAttributeElement[index][attribute],

    // Đổi từ dataset sang data Jquery và khóa lại
    changeDatasetToDataJqueryAndSeal : () => changeDatasetToDataJqueryAndSeal(),

    // Find index
    findIndexByAttributeOrData : (typeAttribute,typeSearch,attribute,value) => findIndex(typeAttribute,typeSearch,attribute,value),
    findIndexElementByNode : element => paramAllSelector.findIndex((allElement) => allElement.isSameNode(element) == true),

    // Reset Element về mặc định
    resetElement : element => resetElement(element)
  }

  function resetElement (paramElement) {
    if (paramElement !== undefined && paramElement.nodeType != 1) {
      throw("ResetElement : Giá trị nhập vào là phải Node")
    }
    paramElement = paramElement === undefined ? paramAllSelector : paramElement;
    paramElement = !Array.isArray(paramElement) ? [paramElement] : paramElement;
    
    paramElement.forEach(function(pValue){
      var vIndex = vGetAttributeElement.findIndexElementByNode(pValue);
      for(let bIndex in vAllAttributeElement[vIndex]) {
        if (pValue.getAttribute(bIndex) != vAllAttributeElement[vIndex][bIndex]) {
          pValue.setAttribute(bIndex,vAllAttributeElement[vIndex][bIndex]);
        }
      }
    })
    
  }

  function findIndex (pTypeAttribute,pTypeSearch,pAttribute,pValue) {
    var vFindIndex = {
      attribute : {
        exactly: (pAttribute,value) => vAllAttributeElement.findIndex(allAttribute => allAttribute[pAttribute] == value),
        contains: (pAttribute,value) => vAllAttributeElement.findIndex(allAttribute => allAttribute[pAttribute].includes(value)),
        regexp : (pAttribute,value) => vAllAttributeElement.findIndex(allAttribute => value.test(allAttribute[pAttribute]))
      },
      data : {
        exactly: (pAttribute,value) => paramAllSelector.findIndex(allElement => $(allElement).data(pAttribute) == value),
        contains: (pAttribute,value) => paramAllSelector.findIndex(allElement => $(allElement).data(pAttribute).includes(value)),
        regexp : (pAttribute,value) => paramAllSelector.findIndex(allElement => value.test($(allElement).data(pAttribute)))
      }
    }

    if (vFindIndex[pTypeAttribute] === undefined) {
      throw (`Find Index : Type Attribute phải là attribute hoặc data`)
    } else if (vFindIndex[pTypeAttribute][pTypeSearch] === undefined) {
      throw (`Find Index : Type Search phải là exactly,contains hoặc regexp`)
    }
    return vFindIndex[pTypeAttribute][pTypeSearch](pAttribute,pValue)

  }

  function changeDatasetToDataJqueryAndSeal () {
  $(paramAllSelector).each(function(pIndex) {
    for(let bDataset in this.dataset) {
      delete vAllAttributeElement[pIndex][`data-${bDataset}`];
      $(this).data(`data-${bDataset}`,this.dataset[bDataset])
             .removeData(bDataset)
             .removeAttr(`data-${bDataset}`);
      var bData = bDataset.slice(0,1).toUpperCase() + bDataset.slice(1).toLowerCase();

      Object.defineProperties($(this).data(),{
        [`data${bData}`] : {
          writable : false,
          configurable : false,
        }
      })
    }
  })
}
  
  return vGetAttributeElement;
}

// End of Closure Store HTML 

// 4. Dynamic check error


// Check data input từng ô (Có tương thích với select2)
function dynamicCheckDataForm (paramElement,paramAllElement,paramObjectRequest = "") {
  var vResult = "";
  paramElement.parentElement.querySelectorAll(".form-control,.select2-selection").forEach(element => element.classList.remove("is-invalid","is-valid"));
  let bValueCheck = paramObjectRequest ? paramObjectRequest[paramElement.dataset.property ? paramElement.dataset.property : $(paramElement).data("dataProperty")] : paramElement.value.trim();
  vResult = checkDataValid (paramElement,paramAllElement,paramObjectRequest);
    if (vResult) {
      paramElement.parentElement.getElementsByClassName("invalid-feedback")[0].innerHTML = vResult;
      paramElement.parentElement.querySelectorAll(".form-control,.select2-selection").forEach(element => element.classList.add("is-invalid"));      
      return;
    } else if (bValueCheck) {
        paramElement.classList.add("is-valid");
        paramElement.parentElement.querySelectorAll(".form-control,.select2-selection").forEach(element => element.classList.add("is-valid"))
    };      
}

// Check data valid dựa vào data-property và data-checktype trong ô input
function checkDataValid (paramElementCheck,paramAllElement = "",paramObjectRequest = "") {
  paramElementCheck = !Array.isArray(paramElementCheck) ? [paramElementCheck] : paramElementCheck;
  let vErrorDetail = {
    required : (value,title) => 
              !value ? `${title} chưa được điền hoặc chọn` : "",

    // p{L} : Các chữ Latin , \s:Khoảng trắng , ^[] , +
    name : (value,title) => (!/^([\p{L}\s]+[\p{L}]\s?)*$/u.test(value)) ? 
           `${title} nhập vào không hợp lệ (Chỉ gồm chữ, không có số và ký tự đặc biệt)` : "",

    email : (value,title) => 
            (!/^(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+)*$/.test(value)) ? 
            `${title} nhập vào không hợp lệ` : "",
        

    // số đầu là 0 - có thể thay 0 bằng 84 hoặc +84 , số thứ 2 là một trong các số 35789, tổng là 10 số 
    phone : (value,title) => (!/^((\+*84|[0]{1})+[35789]{1}[0-9]{8})*$/.test(value)) ? 
            `${title} nhập vào không hợp lệ` : "",

    minChar : (number,value,title) => (value && value.length < number) ? 
          `${title} phải có ít nhất ${number} ký tự` : "",

    minValue : (number,value,title) => (value && value < number) ? 
          `${title} phải lớn hơn hoặc bằng ${number}` : "",

    maxChar : (number,value,title) => (value && value.length > number) ? 
          `${title} chỉ có nhiều nhất ${number} ký tự` : "",

    maxValue : (number,value,title) => (value && value > number) ? 
          `${title} phải nhỏ hơn hoặc bằng ${number}` : "",

    // Chữ đầu tiên là chữ, các ký tự tiếp theo là chữ , số hoặc .-_ tối thiểu 6 ký tự
    username : (value,title) => (value && !/^([a-zA-Z]{1}[a-zA-Z.-_\d]{5,})*$/.test(value)) ? `${title} không hợp lệ` : "",

    // Hoặc là 0 hoặc lớn hơn 0, là số (Không được có số 0 ở đầu)
    price : (value,title) => (value && !/^(^0$|[1-9]{1}[\d]*)*$/.test(value)) ? `${title} không phải là số, không có số 0 ở đầu hoặc giá phải bằng 0` : "",

    // Phải nhỏ hơn hoặc bằng price
    discountPrice : (originalValue,discountValue,title) => (discountValue && Number(discountValue) > Number(originalValue)) ? 
    `${title} phải nhỏ hơn hoặc bằng giá gốc` : "",

    number : (value,title) => (!/^[\d]*$/.test(value)) ? `${title} phải là số` : "",
    
    image : 4,

    radiocheck : 5,

    checkboxcheck : 1,

    website : (value,title) => (value && !/^(\w+([\.-]?\w+)*(\.\w{2,4}))*$/.test(value)) ? `${title} không hợp lệ` : "",

    // -90.0000 tới 90.0000
    geoLat : (value,title) => (value && !/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(value)) ? `${title} không hợp lệ` : "",
    // -180.0000 tới 180.0000
    geoLng : (value,title) => (value && !/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/.test(value)) ? `${title} không hợp lệ` : "",

    // XXXXX hoặc XXXXX-XXXX
    zipcodeUS : (value,title) => (value && !/^(\d{5}-\d{4}|\d{5})*$/.test(value)) ? `${title} không hợp lệ` : "",

    // {8,} : ít nhất 8 ký tự ;
    // (?=.*[a-z]) : ít nhất 1 ký tự thường ;
    // (?=.*[A-Z]) : ít nhất 1 ký tự hoa ;
    // (?=.*\d) : ít nhất 1 số ;
    // (?=.*[@$!%*?&]) : ít nhất 1 ký tự đặc biệt
    password : (value,title) => (value && !/^((?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,})*$/.test(value)) ? `${title} không hợp lệ` : "",

    recheckpass : (value,recheckvalue,title) => (recheckvalue && value != recheckvalue) ? 
                  `${title} và password phải trùng khớp nhau` : "", 

    // Updating
  };

  var vErrorCheck = "";

  paramElementCheck.forEach((pValue) => {
    let bCheckType = pValue.dataset.checktype ? pValue.dataset.checktype.split("|") : $(pValue).data("dataChecktype").split("|");
    let bTitle = pValue.title;
    let bValueCheck = paramObjectRequest ? paramObjectRequest[pValue.dataset.property ? pValue.dataset.property : $(pValue).data("dataProperty")] : pValue.value.trim();
    let bError = "";
    let bCheckIndex = 0;

    while (!bError && bCheckIndex < bCheckType.length) {
      switch (true) {

        case bCheckType[bCheckIndex].includes(":") : {
          let bTypeWithNumber = bCheckType[bCheckIndex].split(":");
          bError = vErrorDetail[bTypeWithNumber[0]](bTypeWithNumber[1],bValueCheck,bTitle);
          vErrorCheck += bError ? bError + '\n' : "";
        };
        break;

        case bCheckType[bCheckIndex] == "recheckpass" : {
          let bPasswordValue = paramAllElement.find(pValue => /^(?!.*\brecheckpass\b.*).*\bpassword\b.*$/.test(pValue.dataset.checktype) || /^(?!.*\brecheckpass\b.*).*\bpassword\b.*$/.test($(pValue).data("dataCheckType"))).value.trim();
          bError = vErrorDetail[bCheckType[bCheckIndex]](bPasswordValue,bValueCheck,bTitle);
          vErrorCheck += bError ? bError + `\n` : "";
        };
        break;

        case bCheckType[bCheckIndex] == "discountPrice" : {
          let bOriginal  = paramAllElement.find(pValue => /^(?!.*\bdiscountPrice\b.*).*\bprice\b.*$/.test(pValue.dataset.checktype) || /^(?!.*\bdiscountPrice\b.*).*\bprice\b.*$/.test($(pValue).data("dataCheckType"))).value.trim();
          bError = vErrorDetail[bCheckType[bCheckIndex]](bOriginal,bValueCheck,bTitle);
          vErrorCheck += bError ? bError + `\n` : "";
        };
        break;

        default : {
          bError = vErrorDetail[bCheckType[bCheckIndex]](bValueCheck,bTitle);
          vErrorCheck += bError ? bError + `\n` : "";
        }
      }
      ++bCheckIndex;
    }
  })

  return vErrorCheck;
}

// End of dynamic check error

// 5.Seal and Freeze Nested Object 
// Testing đệ quy (recursive) để cố định toàn bộ Object (Seal hoặc freeze) tránh sửa dữ liệu
// Rest parameter (...paramObject) - Không phải Spread

function modifyAllObject (paramAction,...paramObject) {
  // paramAction là "freeze" hoặc "seal" 

  try {
    if(!(paramAction == "freeze" || paramAction == "seal")) {
      throw ("Đây không phải tính năng freeze hay seal")
    }
  
    if(!paramObject.length) {
      throw ("Hàm Freeze Seal không có dữ liệu đầu vào");
    }
  }

  catch (err) {
    console.error(err);
    return;
  }
    for (let bValue of paramObject) {
      for (let bIndexObj in bValue) {
        if (typeof bValue[bIndexObj] == "object") {
          modifyAllObject (paramAction,bValue[bIndexObj]);
        }
        Object[paramAction] (bValue);
      }
    }
}

// End of Modify Object

// Clear All Input
function clearAllInput () {
  $("#order [title='info-customer-input'] :input").removeClass("is-valid is-invalid").val("")
  $("#select-drink").val("");
  gSelectedPizzaSize = "";
  gSelectedPizzaType = "";
  gSelectedPizzaTypeDetail = "";
}