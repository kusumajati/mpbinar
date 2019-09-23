# mpbinar
<h3>Autentikasi</h3>
<ol>
	<li>Autentikasi "Authentication.js" di buat sebagai middleware untuk cek jika user sudah login sebelum akses endpoint </li>
	<li>Contoh endpointnya adalah "productCreate", "/product" dengan method POST</li>

</ol>

<h4>Steps:</h4>
<ol>
	<li>Buat endpoint untuk login dengan response user._id</li>
	<li>Buat middleware "Authentication.js" dengan handler User.findById(req.headers.user._id), set "req.userId = userId", dan next() jika ada authorization di request header<li>
	<li>Pasang Authentication.js sebagai middleware untuk productCreate,  app.post("/product", Authentication, product.productCreate)</li>
	<li>user._id ditaruh sebagai request header dari front-end (postman atau react app) untuk endpoint productCreate</li>

</ol>

<h3>Data Relation menggunakan mongoose</h3>
<ol>
	<li>set userId di setiap produk yang dibuat oleh user </li>
	<li>push setiap productId di user database untuk setiap produk yang dibuat oleh user</li>

</ol>
<h4>Steps:</h4>
<ol>
	<li>di product.model.js, buat satu properti user:{type:mongoose.Schema.Types.ObjectId, ref:"User"}</li>
	<li>di user.model.js, buat satu properti products:[{type:mongoose.Schema.Types.ObjectId, ref:"Product"}]<li>
	<li>di product.controller.js, buat logic untuk handle productCreate</li>
	<li>dengan isi 'name' dan 'price' berasal dari req.body, dan 'user' berasal dari req.userId (berasal dari Authentication.js)</li>
	<li>simpan product yang baru dibuat dengan, then(product=>{}),  </li>
	<li>cari user, User.findById(product.user), simpan callback dengan nama 'user', then(product=>{}) </li>
	<li>push array yang berisi product yang baru dibuat ke user yang kalian find, user.products.push(product)</li>
	<li>di userShow dan productShow, populate masing2 'type:mongoose.Schema.Types.ObjectId', dengan .populate('NamaProperti') sebelum fungsi  .then(()=>)  </li>

</ol>


