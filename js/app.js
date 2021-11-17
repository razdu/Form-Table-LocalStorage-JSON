let tbl = document.querySelector('#contacts-tbl tbody');
const contacts = {},
    favContacts = {}
let contactID = 0,
    selectedRow = null;
//addRecord(['first', 'last', 'phone', 'email', 'ID']);
const ls = localStorage;
setContactID();

function setContactID() {
    console.log('processing ID..')
    // get from local
    let cID = getFromLocal('contactID', contactID);
    //console.log('cID = ', cID);
    if (contactID != 0 || cID) {
        //if this app ID not zero OR have local value
        console.log('contactID not zero...take highest ID!');
        //console.log('contactID = ', contactID);
        contactID = contactID > cID ? contactID : cID;
        addLocal('contactID', contactID)
    } else if (contactID == 0) {
        console.log('contactID is ' + contactID);
        //console.log('contactID = ', contactID);
    } else {
        console.log('error');
    }
    console.log(`got ID [${contactID}]`);
    return contactID
}

function onSubmit() {
    console.log('submitted!');
    let formData = getFormData();
    console.log(formData.length);
    formData[formData.length] = setContactID();
    if (selectedRow == null) {
        //Add new record
        addRecord(formData);

        //keep to local
        //addLocal(formData);


    } else {
        //update this record
    }
}

function getFormData() {
    let inputData = document.querySelectorAll('input');
    let dataArr = [];
    inputData.forEach((inpt) => {
        //console.log(inpt.value);
        if(inpt==''){
            //if empty string
            errMsg.push = `${inpt.name} can't be empty`
        }else{
            //not empty
            dataArr.push(inpt.value)
        }
    })
    //dataArr.pop();
    console.log(dataArr);
    resetInputs(inputData)
    return dataArr
}

function resetInputs(inputs) {
    inputs.forEach((inpt) => {
        inpt.value = "";
    })
}

function addRecord(formData) {
    let row = tbl.insertRow(tbl.length);
    console.log(row);
    let dataCells = [];
    formData.forEach((d, i) => {
        dataCells[i] = row.insertCell()
        dataCells[i].innerHTML = d;
        i++;
    })
    actCell = row.insertCell()
    actCell.innerHTML = `<button onclick='editRecord(this)'>Edit</button>
    <button onclick='removeRecord(this)'>X</button>`
    //console.log(dataCells);
    return
}

function editRecord() {
    console.log('to edit...');
    //selectedRow = 
}

function updateRecord() {
    console.log('updated...');
}

function removeRecord() {
    console.log('removed');
}

function addLocal(item, data) {
    let obj = {};
    obj[item] = data;
    let local = JSON.stringify(obj);
    ls.setItem(item, local);
    return obj
}

function getFromLocal(item, data) {
    console.log('searching local ' + item);
    let local = ls.getItem(item);
    if (local) {
        //if localize
        console.log('Found!');
        console.log('get ' + item + ' value...');
        data = JSON.parse(local);
        console.log('data --> ', data);
    } else {
        //if NOT localize
        console.log('NOT found!');
        console.log('set local ' + item);
        data = addLocal(item, data);
        console.log('data --> ', data);
    }
    console.log(`got from local < ${data[item]} > \n\t\tDONE!`);
    return data[item]
}
toggleClass(['first', 'last']);

function toggleClass(errMsg = false) {
    let elem = document.querySelector('#errorMsg');
    //debugger
    if (errMsg) {
        elem.classList.remove('hide');
        errMsg.forEach((err) => {
            let msg = document.createElement('p');
            msg.innerHTML = err;
            elem.appendChild(msg);
        })
    } else {
        elem.classList.add('hide');
    }
    console.log('no errors found..');
}