let tbl = document.querySelector('#contacts-tbl tbody');
const contactKeys = ['fname', 'lname', 'phone', 'email', 'id'],
	ls = localStorage;
let contactID = 0,
	errMsg = [],
	contacts = [],
	selectedRow;
setContactID();
loadFromLocal();

function setContactID() {
	console.log('processing ID..')
	//get from local
	let item = 'contactID';
	let cID = getFromLocal(item, false);
	if (contactID != 0 || contactID != cID) {
		//if this app ID not zero OR have local value
		contactID = contactID > cID ? contactID : cID;
		addLocal(item, contactID);
	} else if (contactID == cID) {
		//addLocal(item, contactID);
		//console.log('local updated');
	} else {
		console.log('error');
	}

	console.log(`got ID [${contactID}]`);
	return contactID
}

function loadFromLocal() {
	local = getFromLocal('contacts', false);
	if (local) {
		local.forEach(c => {
			addRecord(c);
		});
	console.log('local loaded');
	}else{
		console.log('nothing to load');
	}
}

function onSubmit(selectedRow = null) {
	console.log('submitted!');
	let formData = getFormData();
	let item = 'contacts';
	if (formData) {
		formData['id'] = ++contactID;
		setContactID();
		console.log('got -->', formData);
		if (selectedRow == null) {
			//Add new record
			addRecord(formData);
			console.log('add record: ', formData);
			contacts = getFromLocal('contacts', contacts);
			contacts.push(formData);
			addLocal('contacts', contacts);
			//keep to local
			//addLocal(formData);
		} else {
			//update this record
			updateRecord();
		}
	}

}

function getFormData() {
	let inputData = document.querySelectorAll('input');
	let dataObj = {};
	errMsg = [];
	console.log('collecting: ', inputData);
	inputData.forEach((inpt) => {
		if (inpt.value == '') {
			//if empty string
			errMsg.push(`${inpt.name} can't be empty`);
		} else {
			//not empty
			dataObj[inpt.name] = inpt.value;
		}
		console.log(inpt.value);

	});
	console.log(errMsg.length == 0);
	if (errMsg.length == 0) {
		//if no errors found
		console.log('no errors');

		resetInputs(inputData);
		showErrors(false);
	} else {
		showErrors(errMsg);
		return false
	}
	console.log('obj-->' + dataObj);
	console.log('contacts:\n' + contacts);

	return dataObj
}

function resetInputs(inputs) {
	inputs.forEach((inpt) => {
		inpt.value = "";
	})
}

function addRecord(formData) {
	let row = tbl.insertRow(tbl.length-1);
	let dataCells = [];
	for (let i = 0; i < contactKeys.length; i++) {
		dataCells[i] = row.insertCell()
		dataCells[i].innerHTML = formData[contactKeys[i]];
	}
	actCell = row.insertCell()
	actCell.innerHTML = `<button onclick='updateRecord(this)'>Edit</button>
    <button onclick='removeRecord(this)'>X</button>`
	//console.log(dataCells);
	return
}

function updateRecord(elem) {
	console.log('updated...');
	console.log(elem.parentElement.parentElement);
	selectedRow=elem.parentElement.parentElement.rowIndex;
	console.log(selectedRow);
}

function removeRecord() {
	console.log('removed');
}

function addLocal(item, data) {
	//add to locall an item with the name inside 'item' with the 'data' content
	let local = JSON.stringify(data);
	console.log('set item: ' + local);
	ls.setItem(item, local);
}

function getFromLocal(item, data) {
	//get from local 'item' obj
	console.log('searching local ' + item);
	let local = ls.getItem(item);
	if (local) {
		//if localize=if lpcal not empty string
		console.log('Found... ' + local);
		data = JSON.parse(local);
	} else if (data) {
		//if NOT localize=if local empy string
		console.log('NOT found!');
		addLocal(item, data);
	}
	console.log(`got from local < ${item} > \n\t\tDONE!`);
	return data
}

function showErrors(errMsg) {
	let errBox = document.querySelector('#errorBox');
	let elem = document.querySelector('#errorMsg');
	elem.innerHTML = '';
	if (errMsg) {
		errBox.classList.remove('hide');
		errMsg.forEach((err) => {
			let msg = document.createElement('p');
			msg.innerHTML = err;
			elem.appendChild(msg);
		})
	} else {
		errBox.classList.add('hide');
		console.log('no errors found..');
	}

}