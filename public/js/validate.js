//Validate.js

function validateAddStock() {
    if(document.addStock.itemName.value == '') {
        alert('Please Enter an Item Name');
        return false;
    }
    if(document.addStock.itemDescription.value == '') {
        alert('Please Enter an Item Description');
        return false;
    }
    if(document.addStock.price.value == '') {
        alert('Please Enter an Item Price');
        return false;
    }
    if(document.addStock.quantity.value == '') {
        alert('Please Enter an Item Quantity');
        return false;
    }
    if(document.addStock.stockImg.value == '') {
        alert('Please Select an Image');
        return false;
    }
    return true;
}

function validateAddUpdate() {
    if(document.addUpdate.updateTitle.value == '') {
        alert('Please Enter a title for your post');
        return false;
    }
    if(document.addUpdate.updateText.value == '') {
        alert('Please Enter a body for your post');
        return false;
    }
    return true;
}

function validateAddEvent() {
    if(document.addEvent.eventName.value == '') {
        alert('Please Enter a title for your event');
        return false;
    }   
    if(document.addEvent.sMonth.value == '') {
        alert('Please Enter a valid date for your event');
        return false;
    }   
    if(document.addEvent.sDay.value == '') {
        alert('Please Enter a valid date for your event');
        return false;
    }   
    if(document.addEvent.sYear.value == '') {
        alert('Please Enter a valid date for your event');
        return false;
    } 
    return true;  
}
// function validateEditStock() {
//     for(let i = 0; i<document.updateStock.length; i++){
//         console.log('Is this working?');
//     }
// }

// validateEditStock();