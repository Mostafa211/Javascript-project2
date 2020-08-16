

var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var searchInput = document.getElementById("searchInput");

var productList ;

if(localStorage.getItem("ourProducts") == null){
    productList = [];
}
else{
    productList = JSON.parse(localStorage.getItem("ourProducts"));
    displayProduct(productList);
}

function addProduct()
{
    var product =
    {
        name: productNameInput.value,
        price: productPriceInput.value,
        category: productCategoryInput.value,
        desc: productDescInput.value,
    }
    productList.push(product);
    localStorage.setItem("ourProducts" , JSON.stringify(productList))
    displayProduct(productList);
    clearForm();
}

function displayProduct(anyArray){
    var tableContent = "";
    for(var i = 0 ; i < anyArray.length ; i++){
        tableContent += `<tr>
                            <td>${i}</td>
                            <td>${productList[i].name}</td>
                            <td>${productList[i].price}</td>
                            <td>${productList[i].category}</td>
                            <td>${productList[i].desc}</td>
                            <td><button onclick="updateProduct()" class="btn btn-warning">update</td>
                            <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</td>
                        </tr>`;
    }

    document.getElementById('tableBody').innerHTML = tableContent;
}


function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function deleteProduct(index){
    productList.splice(index , 1);
    localStorage.setItem("ourProducts" , JSON.stringify(productList))
    displayProduct(productList);
}

function validateProductName(productName){
    var regex = /^[A-Z][a-z]{3,6}$/;
    if(regex.test(productName) == true){
        productNameAlert.classList.replace("d-block","d-none");
        productNameInput.classList.remove("is-invalid");
        productNameInput.classList.add("is-valid");
    }

    else{
        productNameAlert.classList.replace("d-none","d-block");
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.add("is-invalid");
    }
}

productNameInput.addEventListener("keyup" , function(){
    validateProductName(productNameInput.value);
});


function validateProductPrice(productPrice){
    var regex = /^([1-9][0-9]{2,3}|10000)$/;
    if(regex.test(productPrice) == true){
        productPriceAlert.classList.replace("d-block","d-none");
        productPriceInput.classList.remove("is-invalid");
        productPriceInput.classList.add("is-valid");
    }

    else{
        productPriceAlert.classList.replace("d-none","d-block");
        productPriceInput.classList.remove("is-valid");
        productPriceInput.classList.add("is-invalid");
    }
}

productPriceInput.addEventListener("keyup" , function(){
    validateProductPrice(productPriceInput.value);
});
