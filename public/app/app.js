// const App = () => {
//   const [products, setProducts] = React.useState([]);
//   const [form, setForm] = React.useState({
//     name: "",
//     price: "",
//   });

//   React.useEffect(() => {
//     fetchProducts();
//   }, []);

//   function fetchProducts() {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => {
//         setProducts(data);
//       });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!form.name || !form.price) {
//       return;
//     }

//     fetch("/api/products", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         fetchProducts();
//         setForm({
//           name: "",
//           price: "",
//         });
//       });
//   }

//   //   updateForm
//   function updateForm(e, feild) {
//     if (feild === "name") {
//       setForm({
//         ...form,
//         name: e.target.value,
//       });
//     } else if (feild === "price") {
//       setForm({
//         ...form,
//         price: e.target.value,
//       });
//     }
//   }

//   const deleteProduct = (productId) => {
//     fetch(`/api/products/${productId}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         fetchProducts();
//         console.log(data);
//       });
//   };

//   const editProduct = (productId) => {
//     const newName = prompt("Enter new product name");
//     const newPrice = prompt("Enter new price");

//     if (!newName || !newPrice) return;

//     fetch(`/api/products/${productId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name: newName, price: newPrice }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         fetchProducts(); // Update list after edit
//         console.log("Updated:", data);
//       });
//   };

//   return (
//     <>
//       <div className="card">
//         <div className="card-header">Add a product</div>
//         <div className="card-body">
//           <form onClick={handleSubmit}>
//             <input
//               value={form.name}
//               onChange={(e) => updateForm(e, "name")}
//               type="text"
//               placeholder="Product name..."
//               className="form-control mt-3"
//             />
//             <input
//               value={form.price}
//               onChange={(e) => updateForm(e, "price")}
//               type="text"
//               placeholder="Product name..."
//               className="form-control mt-3 ml-3"
//             />
//             <button type="submit" className="btn btn-primary mt-3">
//               submit
//             </button>
//           </form>
//         </div>
//       </div>
//       <ul className="list-group mt-4">
//         {products.map((product) => {
//           return (
//             <li
//               key={product.id}
//               className="list-group-item d-flex justify-content-between align-items-center"
//               aria-current="true"
//             >
//               <div>
//                 <strong>{product.name}: </strong>${product.price}
//               </div>
//               <button
//                 className="btn btn-warning ml-2"
//                 onClick={() => editProduct(product.id)}
//               >
//                 Edit
//               </button>

//               <button
//                 className="btn "
//                 onClick={() => deleteProduct(product.id)}
//               >
                // <svg
                //   xmlns="http://www.w3.org/2000/svg"
                //   width="16"
                //   height="16"
                //   fill="currentColor"
                //   className="bi bi-trash3"
                //   viewBox="0 0 16 16"
                // >
                //   <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                // </svg>
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </>
//   );
// };

// ReactDOM.render(<App />, document.getElementById("app"));


const App = () => {
  const [products, setProducts] = React.useState([]);
  const [form, setForm] = React.useState({ name: '', price: '' });
  const [editId, setEditId] = React.useState(null);
  const [editForm, setEditForm] = React.useState({ name: '', price: '' });

  React.useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.price) return;

    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(res => res.json())
      .then(() => {
        fetchProducts();
        setForm({ name: '', price: '' });
      });
  }

  function updateForm(e, field) {
    setForm({ ...form, [field]: e.target.value });
  }

  function handleEditForm(e, field) {
    setEditForm({ ...editForm, [field]: e.target.value });
  }

  function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => fetchProducts());
  }

  function editProduct(product) {
    setEditId(product.id);
    setEditForm({ name: product.name, price: product.price });
  }

  function saveEdit(productId) {
    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    }).then(res => res.json())
      .then(() => {
        setEditId(null);
        fetchProducts();
      });
  }

  return (
    <>
      <div className="card">
        <div className="card-header">Add a product</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input value={form.name} onChange={(e) => updateForm(e, 'name')} type="text" placeholder="Product name" className="form-control mt-3" />
            <input value={form.price} onChange={(e) => updateForm(e, 'price')} type="text" placeholder="Product price" className="form-control mt-3" />
            <button type="submit" className="btn btn-primary mt-3">Submit</button>
          </form>
        </div>
      </div>

      <ul className="list-group mt-4">
        {products.map((product) => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editId === product.id ? (
              <div>
                <input className="me-2" value={editForm.name} onChange={(e) => handleEditForm(e, 'name')} />
                <input className="me-2" value={editForm.price} onChange={(e) => handleEditForm(e, 'price')} />
                <button className="btn btn-success btn-sm me-2" onClick={() => saveEdit(product.id)}>Save</button>
                <button className="btn btn-secondary btn-sm ml-2" onClick={() => setEditId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <strong>{product.name}: </strong> ${product.price}
              </div>
            )}

            {editId !== product.id && (
              <div>
                <button className="btn btn-warning btn-sm me-4" onClick={() => editProduct(product)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product.id)}>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash3"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                </svg>
                </button>
                
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
