import React, {useState } from 'react'

function Employee() {
  const [data, setData] = useState([])
     return (
     <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Product List</h3>
      </div>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>orders</th>
              <th>Sales</th>
            </tr>
          </thead>
          <tbody>
            {data.map((products, index) => {
              return <tr key={index}>
                  <td>{products.name}</td>
                  <td>{
                    <img src={`http://localhost:8081/images/`+products.image} alt="" className='employee_image'/>
                    }</td>
                  <td>{products.email}</td>
                  <td>{products.address}</td>
                  <td>{products.salary}</td>
                  <td>
                    <button className='btn btn-sm btn-danger'>delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee