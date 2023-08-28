import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
function Addproducts() {
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		address: '',
		salary: '',
		image: ''
	})

	const handleSubmit = (event) => {
		event.preventDefault();
		const formdata = new FormData();
		formdata.append("name", data.name);
		formdata.append("Price", data.email);
		formdata.append("Quantity", data.password);
		formdata.append("Threshold", data.address);
		formdata.append("Description", data.salary);
		formdata.append("image", data.image);
	}
	return (
		<div className='d-flex flex-column align-items-center pt-4'>
			<h2>Add Products</h2>
			<form class="row g-3 w-50" onSubmit={handleSubmit}>
			<div class="col-12">
					<label for="inputName" class="form-label">Name</label>
					<input type="text" class="form-control" id="ProductName" placeholder='Product Name' autoComplete='off'
					onChange={e => setData({...data, name: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputEmail4" class="form-label">Price</label>
					<input type="text" class="form-control" id="price" placeholder='Product Price' autoComplete='off'
					onChange={e => setData({...data, price: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputPassword4" class="form-label">Quantity</label>
					<input type="Quantity" class="form-control" id="Quantity" placeholder='Quantity'
					 onChange={e => setData({...data, Quantity: e.target.value})}/>
				</div>
				<div class="col-12">
					<label for="inputSalary" class="form-label">Threshold</label>
					<input type="text" class="form-control" id="Threshold" placeholder="Threshold" autoComplete='off'
					onChange={e => setData({...data, Threshold: e.target.value})}/>
				 </div>
                 <div class="col-12">
                 <label for="Category">Choose category:</label> 
                 <select name="Beauty" id="Beauty"> 
                 <option value="Hardware">Hardware</option> 
                 <option value="food">food</option> 
                 <option value="Grocery">Grocery</option> 
            
                    </select>
  

				</div>
				<div class="col-12">
					<label for="inputAddress" class="form-label">Description</label>
					<input type="text" class="form-control" id="inputAddress" placeholder="Producr Description" autoComplete='off'
					onChange={e => setData({...data, Description: e.target.value})}/>
				</div>
				<div class="col-12 mb-3">
					<label class="form-label" for="inputGroupFile01">Select Image</label>
					<input type="file" class="form-control" id="inputGroupFile01"
					onChange={e => setData({...data, image: e.target.files[0]})}/>
				</div>
				<div class="col-12">
					<button type="submit" class="btn btn-primary">Add</button>
				</div>
			</form>
		</div>

	)
}

export default Addproducts