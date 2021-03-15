{   
    function readTextFile(file, callback) {
        var rawFile = new XMLHttpRequest();
        rawFile.overrideMimeType("application/json");
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4 && rawFile.status == "200") {
                callback(rawFile.responseText);
            }
        }
        rawFile.send(null);
    }

    $('#btnBurger').on('click', function(){
        printData(data,0);
    });

    $('#btnTaco').on('click', function(){
        printData(data,1);
    });

    $('#btnsalad').on('click', function(){
        printData(data,2);
    });

    $('#btnDessert').on('click', function(){
        printData(data,3);
    });

    $('#btnDrink').on('click', function(){
        printData(data,4);
    });

    $('#btnCarro').on('click', function(){
        buildCarro();
    });

    function printData(data,j){
        var cont = document.getElementById("content")
        var row =  `<div class="container">
                        <hr>
                        <h2 class="text-center">${data[j].name}</h2>
                        <hr>
                    </div>
                    <div class="container">
                        <div id="cajas" class="row d-flex align-items-stretch">
                        
                        </div>
                    </div>`
        cont.innerHTML = row
        cont = document.getElementById("cajas")
        for(var i = 0; i<data[0].products.length; i ++){
            row =  `<div class="col-3 box">
                        <div class="innerbox">
                            <img src="${data[j].products[i].image}" >
                            <div class="information">
                                <h4>${data[j].products[i].name}</h4>
                                <p>${data[j].products[i].description}</p>
                                <p><strong>$${data[j].products[i].price}</strong></p>
                                <button id="col" class="btn gray-btn" onclick="addToCart(${j},${i})">add to car</button>
                            </div>
                        </div>
                    </div>`
            cont.innerHTML += row                        
        }
    }

    function buildCarro(){
        total = Math.round((total + Number.EPSILON) * 100) / 100;
        var cont = document.getElementById("content")
        var row =  `<div class="container">
                        <hr>
                        <h2 class="text-center">Order detail</h2>
                        <hr>
                    </div>
                    <div class="container">
                        <table class="table table-striped">
                            <tr>
                                <th>Item</th>
                                <th>Qty.</th>
                                <th>Description</th>
                                <th>Unit Price</th>
                                <th>Amount</th>
                                <th>Modify</th>
                            <tr>
                            <tbody id="carTable">

                            </tbody>
                        </table>        
                        <div class="row">
                            <div id="total" class="col-6">
                                <p><strong>Total: $${total}</strong></p>
                            </div>
                            <div class="text-right col-6">
                                <button type="button" class="btn cancel" data-toggle="modal" data-target="#cancel">Cancel</button>
                                <button type="button" class="btn confirm" onclick="confirmOrder()">Confirm Order</button>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="cancel" role="dialog">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Cancel the order</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <p>Are you sure about cancelling the order?</p>
                                </div>
                                <div class="modal-footer">
                                    <div class="mb-2">
                                        <button type="button" class="btn confirm" data-dismiss="modal" onclick="cancelOrder()">Yes, i want to cancel the order</button>
                                    </div>
                                    <div>
                                        <button type="button" class="btn cancel" data-dismiss="modal">No, i want to continue adding products</button>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                    `
        cont.innerHTML = row
        cont = document.getElementById("carTable")
        for(var i = 0; i<car.length; i++){
            var row =  `<tr>
                            <td><strong>${i+1}</strong></td>
                            <td>${car[i].quantity}</td>
                            <td>${car[i].description}</td>
                            <td>${car[i].price}</td>
                            <td>${car[i].amount}</td>
                            <td><button id="col" class="btn gray-btn" onclick="plusToCart(${i})">+</button>  <button id="col" class="btn gray-btn" onclick="removeFromCart(${i})">-</button></td>
                        </tr>`
            cont.innerHTML += row                        
        }
    }

    function addToCart(cat,ind){
        cart++;
        var found = false;
        var prod = data[cat].products[ind];
        for(var i=0; i < car.length && !found; i++) {
            if(car[i].description == prod.name){
                car[i].quantity += 1;
                car[i].amount += car[i].price;
                found = true;
            }
        }        
        if(!found){
            car.push({'description':prod.name,'quantity':1,'price':prod.price,'amount':prod.price,'cat':cat,'ind':ind});
        }
        total += prod.price;
        document.getElementById("cont").innerHTML = cart + " items";
    }

    function colorTable(){
        total = Math.round((total + Number.EPSILON) * 100) / 100;
        cont = document.getElementById("total")
        cont.innerHTML = `<p><strong>Total: $${total}</strong></p>`;
        cont = document.getElementById("carTable")
        cont.innerHTML = ``;
        for(var i = 0; i<car.length; i++){
            var row =  `<tr>
                            <td><strong>${i+1}</strong></td>
                            <td>${car[i].quantity}</td>
                            <td>${car[i].description}</td>
                            <td>${car[i].price}</td>
                            <td>${car[i].amount}</td>
                            <td><button id="col" class="btn gray-btn" onclick="plusToCart(${i})">+</button>  <button id="col" class="btn gray-btn" onclick="removeFromCart(${i})">-</button></td>
                        </tr>`
            cont.innerHTML += row                        
        }
        document.getElementById("cont").innerHTML = cart + " items";
    }

    function plusToCart(ind){
        cart++;
        total += car[ind].price;
        car[ind].quantity += 1;
        car[ind].amount += car[ind].price;
        colorTable();
        
    }

    function removeFromCart(ind){
        cart--;
        total -= car[ind].price;
        if(car[ind].quantity <= 1){
            car.splice(ind,1);
        }
        else{
            car[ind].quantity -= 1;
            car[ind].amount -= car[ind].price;
        }
        colorTable();
    }

    function confirmOrder(){
        console.log(car);
    }

    function cancelOrder(){
        cart = 0;
        car = [];
        total = 0;
        colorTable();
    }
    
    /*$(document).ready(function(){
        $('#col').on('click', function(){
            addToCart();
            console.log('add');
        });
    });    */

    //usage:
    var car = []
    var data = null
    var cart = 0
    var total = 0
    readTextFile("./data.json", function(text){
        data = JSON.parse(text);
        printData(data,0);
        console.log(data);
    });

    

  }