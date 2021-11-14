let selectedRow = null;
let tbl = document.querySelector('#contacts-tbl tbody');
addRecord(['first', 'last', 'phone', 'email']);

function onSubmit(e) {
    console.log('submitted!');
    let formData = getFormData();
    if (selectedRow == null) {
        //Add new record
        addRecord(formData);
    } else {
        //update this record
    }
}

function getFormData() {
    let inputData = document.querySelectorAll('input');
    let dataArr = [];
    inputData.forEach((inpt) => {
        //console.log(inpt.value);
        dataArr.push(inpt.value)
    })
    dataArr.pop();
    //console.log(dataArr);
    resetInputs(inputData)
    return dataArr
}

function resetInputs(inputs) {
    inputs.forEach((inpt, i) => {
        if (i != 4) {
            inpt.value = "";
        }
    })
}

function addRecord(formData) {
    let row = tbl.insertRow(tbl.length);
    //console.log(row);
    let dataCells = [];
    formData.forEach((d,i) => {
        dataCells[i] = row.insertCell()
        dataCells[i].innerHTML = d;
        i++;
    })
    idCell = row.insertCell()
    actCell = row.insertCell()
    idCell = "id"

    //console.log(dataCells);
}