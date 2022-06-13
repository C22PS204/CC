const users = require('./users');
const {nanoid} = require('nanoid');

const addUserHandler = (req, res) => {
const {
        email,
        username,
        password,
    } = request.payload;

    const id = nanoid(16);

    if (!username) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan pengguna. Mohon isi nama pengguna',
        });
        response.code(400);
        return response;
    }

    const newUser = {
        email,
        username,
        password,
        id,
    };
    users.push(newUser);

    const isSuccess = users.filter((user) => user.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'pengguna berhasil ditambahkan',
            data: {
                userId: id,
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'error',
        message: 'pengguna gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllUsersHandler = (request, h) => {
    const {username, finished, reading} = request.params;
    if (username !== undefined) {
      const user = users.filter(
          (user) => user.username.toLowerCase().includes(username.toLowerCase()),
      );
      const response = h.response({
        status: 'success',
        data: {
          users: user.map((user) => ({
            email: user.email,
            username: user.username,
            id: user.id,
          }),
          ),
        },
      });
      response.code(200);
      return response;
    }
    if (finished !== undefined) {
      const user = users.filter(
          (user) => Number(user.finished) === Number(finished),
      );
      const response = h.response({
        status: 'success',
        data: {
          users: user.map((user) => ({
            id: user.id,
            email: user.email,
            username: user.username,
          }),
          ),
        },
      });
      response.code(200);
      return response;
    }
    if (reading !== undefined) {
      const user = users.filter(
          (user) => Number(user.reading) === Number(reading),
      );
      const response = h.response({
        status: 'success',
        data: {
          users: user.map((user) => ({
            id: user.id,
            email: user.email,
            username: user.username,
          }),
          ),
        },
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'success',
      data: {
        users: users.map((user) => ({
          id: user.id,
          email: user.email,
          username: user.username,
        }),
        ),
      },
    });
    response.code(200);
    return response;
  };

  const getUserByIdHandler = (request, h) => {
    const {userId} = request.params;
    const user = users.filter((user) => user.id === userId)[0];
    if (user !== undefined) {
      const response = h.response({
        status: 'success',
        data: {
          user,
        },
      },
      );
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'pengguna tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  const editUserByIdHandler = (request, h) => {
    const {userId} = request.params;
    const {
      email,
      username,
      password,
    } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = users.findIndex((user) => user.id === userId);
    if (!username) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui pengguna. Mohon isi nama pengguna',
      });
      response.code(400);
      return response;
    }
    if (password == password) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui password. password tidak boleh sama dengan yang lama',
      });
      response.code(400);
      return response;
    }
    if (index !== -1) {
      users[index] = {
        ...users[index],
        email,
        username,
        password,
      };
      const response = h.response({
        status: 'success',
        message: 'pengguna berhasil diperbarui',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui pengguna. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };
  const deleteUserByIdHandler = (request, h) => {
    const {userId} = request.params;
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      const response = h.response({
        status: 'success',
        message: 'pengguna berhasil dihapus',
      });
      response.code(200);
      return response;
    }
    const response = h.response({
      status: 'fail',
      message: 'pengguna gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  };

module.exports = {
    addUserHandler,
    getAllUsersHandler,
    getUserByIdHandler,
    editUserByIdHandler,
    deleteUserByIdHandler,
};