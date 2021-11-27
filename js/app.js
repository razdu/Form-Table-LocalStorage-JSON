let tbl = document.querySelector('#contacts-tbl tbody');
const contactKeys = ['fname', 'lname', 'phone', 'email', 'id'],
	keyStrings = ['First name', 'Last name', 'Phone number', 'Email']
ls = localStorage;
let contactID = 0,
	errMsg = [],
	contacts = [],
	selectedRow;

setContactID();
renderTable();

function clearTable() {
	tbl.innerHTML = '';
}

function setContactID() {
	let item = 'contactID';
	let cID = getLocal(item, false);
	if (contactID != 0 || contactID != cID) {
		contactID = contactID > cID ? contactID : cID;
		setLocal(item, contactID);
	} else if (contactID == cID) {
		//setLocal(item, contactID);
		console.log('local updated');
	} else {
		console.log('error');
	}
	return contactID
}

function renderTable() {
	local = getLocal('contacts', false);
	if (local) {
		local.forEach(c => {
			addRecord(c);
		});
	} else {
		console.log('nothing to load');
	}
}

function onSubmit() {
	let formData = getFormData();
	let item = 'contacts';
	if (formData) {
		if (selectedRow == null) {
			setContactID();
			formData['id'] = ++contactID;
			contacts = getLocal('contacts', contacts);
			contacts.push(formData);
			setLocal('contacts', contacts);
			clearTable();
			renderTable()
		} else {
			let rowID = tbl.rows[selectedRow].cells[4]
			updateLocal(rowID, formData);
			clearTable();
			renderTable();
		}
	}
	selectedRow = null;
}

function getFormData() {
	let inputData = document.querySelectorAll('input');
	let dataObj = {};
	errMsg = [];
	inputData.forEach((inpt, i) => {
		if (inpt.value == '') {
			//if empty string
			errMsg.push(`${keyStrings[i]} can't be empty`);
		} else {
			dataObj[inpt.name] = inpt.value;
		}
	});
	if (errMsg.length == 0) {
		resetForm(inputData);
		showErrors(false);
		return dataObj
	} else {
		showErrors(errMsg);
		return false
	}
}

function setFormData(elem) {
	let inputData = document.querySelectorAll('input');
	inputData.forEach((inpt, i) => {
		inpt.value = elem[i].innerHTML
	});
}

function resetForm(inputs) {
	inputs.forEach((inpt) => {
		inpt.value = "";
	})
}

function addRecord(contactObj) {
	let row = tbl.insertRow(tbl.length);
	let dataCells = [];
	for (let i = 0; i < contactKeys.length; i++) {
		dataCells[i] = row.insertCell()
		dataCells[i].innerHTML = contactObj[contactKeys[i]];
	}
	actCell = row.insertCell()
	actCell.innerHTML = `<button onclick='updateRecord(this)'>Edit</button>
    <button onclick='removeRecord(this)'>X</button>`
}

function updateRecord(elem) {
	selectedRow = elem.parentElement.parentElement.rowIndex - 1;
	setFormData(tbl.rows[selectedRow].cells);
}

function removeRecord(elem) {
	selectedRow = elem.parentElement.parentElement.rowIndex - 1;
	//console.log(tbl.rows[selectedRow].cells[4]);
	let id = tbl.rows[selectedRow].cells[4];
	let item = 'contacts';
	let cID = id.innerText;
	contacts = getLocal(item)
	let rowIndex = contacts.findIndex(obj => obj.id == cID)
	contacts.splice(rowIndex, 1);
	setLocal(item, contacts);
	clearTable();
	renderTable();
	selectedRow = null;
}

function updateLocal(id, data) {
	let item = 'contacts';
	let cID = id.innerHTML;
	contacts = getLocal(item)
	let rowIndex = contacts.findIndex(obj => obj.id == cID)
	for (let i = 0; i < contactKeys.length - 1; i++) {
		contacts[rowIndex][contactKeys[i]] = data[contactKeys[i]];
	}
	setLocal(item, contacts)
}

function setLocal(item, data) {
	let local = JSON.stringify(data);
	ls.setItem(item, local);
}

function getLocal(item) {
	let local = ls.getItem(item);
	if (local) {
		data = JSON.parse(local);
		return data
	}
	return false
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
	}

}