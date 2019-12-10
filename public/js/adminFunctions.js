//Auth Functions

//*****************************STOCK****************************** */
function showDelete() {
    document.getElementById('removeStock').style.display = 'inline';
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('deleteButton').style.display = 'none';
    document.getElementById('stockCancel').style.display = 'inline';
}

function showEdit() {
    document.getElementById('updateStock').style.display = 'inline';
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('deleteButton').style.display = 'none';
    document.getElementById('stockCancel').style.display = 'inline';
}

function showAdd() {
    document.getElementById('addStock').style.display = 'inline';
    document.getElementById('addButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'none';
    document.getElementById('deleteButton').style.display = 'none';
    document.getElementById('stockCancel').style.display = 'inline';
}

function stockCancel() {
    document.getElementById('addButton').style.display = 'inline';
    document.getElementById('editButton').style.display = 'inline';
    document.getElementById('deleteButton').style.display = 'inline';
    document.getElementById('addStock').style.display = 'none';
    document.getElementById('updateStock').style.display = 'none';
    document.getElementById('removeStock').style.display = 'none';
    document.getElementById('stockCancel').style.display = 'none';
}

//***************************UPDATES*************************** */

function showUpdateDelete() {
    document.getElementById('deleteUpdate').style.display = 'inline';
    document.getElementById('addUpdateBtn').style.display = 'none';
    document.getElementById('editUpdate').style.display = 'none';
    document.getElementById('removeUpdate').style.display = 'none';
    document.getElementById('updateCancel').style.display = 'inline';  
}

function showEditUpdate() {
    document.getElementById('changeUpdates').style.display = 'inline';
    document.getElementById('addUpdateBtn').style.display = 'none';
    document.getElementById('editUpdate').style.display = 'none';
    document.getElementById('removeUpdate').style.display = 'none';
    document.getElementById('updateCancel').style.display = 'inline';  
}

function showAddUpdate() {
    document.getElementById('addUpdate').style.display = 'inline';
    document.getElementById('addUpdateBtn').style.display = 'none';
    document.getElementById('editUpdate').style.display = 'none';
    document.getElementById('removeUpdate').style.display = 'none';
    document.getElementById('updateCancel').style.display = 'inline';  
}

function updateCancel() {
    document.getElementById('addUpdate').style.display = 'none';
    document.getElementById('deleteUpdate').style.display = 'none';
    document.getElementById('changeUpdates').style.display = 'none';
    document.getElementById('removeUpdate').style.display = 'inline';
    document.getElementById('editUpdate').style.display = 'inline';
    document.getElementById('addUpdateBtn').style.display = 'inline';
    document.getElementById('updateCancel').style.display = 'none';
}

//***************************CALENDAR*************************** */

function showAddEvent() {
    document.getElementById('addEvent').style.display = 'inline';
    document.getElementById('addEventBtn').style.display = 'none';
    document.getElementById('editEvents').style.display = 'none';
    document.getElementById('calendarCancel').style.display = 'inline';  
}

function editEvents() {
    document.getElementById('selectMonth').style.display = 'inline';
    document.getElementById('addEventBtn').style.display = 'none';
    document.getElementById('editEvents').style.display = 'none';
    document.getElementById('calendarCancel').style.display = 'inline';  
}

function calendarCancel() {
    document.getElementById('addEvent').style.display = 'none';
    document.getElementById('selectMonth').style.display = 'none';
    document.getElementById('editEvents').style.display = 'inline';
    document.getElementById('addEventBtn').style.display = 'inline';
    document.getElementById('calendarCancel').style.display = 'none';
}

function recurringButton() {
    document.getElementById('recurring').style.display = 'inline';
    document.getElementById('recurringBtn').style.display = 'none';
    document.getElementById('recurringCancel').style.display = 'inline';
}

function cancelRecurring() {
    document.getElementById('recurring').style.display = 'none';
    document.getElementById('recurringBtn').style.display = 'inline';
    document.getElementById('recurringCancel').style.display = 'none';
}