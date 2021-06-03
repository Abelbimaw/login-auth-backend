const { nanoid } = require('nanoid');
const users = require('./users');

const RegisterNewUser = (request, h) => {
  const { username, email, password, nama_lengkap } = request.payload;

  const user_id = nanoid(16);
  const jenis_id = [];
  const createdAt = new Date().toISOString();

  const newUser = {
    user_id,
    jenis_id,
    username,
    email,
    password,
    nama_lengkap,
    createdAt,
  };

  users.push(newUser);

  const isSuccess = users.filter(user => user.user_id === user_id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId: user_id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'User gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const loginUser = (request, h) => {
  const { username, password, } = request.payload;
  const { user_id } = request.params;

  const cekUser = users.filter((user) => user.username === username);
  const cekPass = users.filter((users) => users.password === password);

  const index = users.filter((user) => user.user_id === user_id);

  console.log("CekUser = " + cekUser + "cek pass = "+ cekPass + "user "+ username+"pass "+password);
  if (username == cekUser && password == cekPass) {
    return h.response({
      status: 'success',
      message: 'login success',
      data: {
        username,
        email,
        nama_lengkap,
      }
    })
      .code(200);
  }
  const response = h.response({
    status:'fail',
    message: 'fail login',
  })
    .code(400);
  return response; 
}

module.exports = { RegisterNewUser, loginUser };
