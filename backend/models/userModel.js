// In-memory user storage
let users = [];
let userId = 1;

const userModel = {
  // Create a new user
  create: (userData) => {
    const user = {
      id: userId++,
      ...userData,
      createdAt: new Date()
    };
    users.push(user);
    return user;
  },

  // Find user by email
  findByEmail: (email) => {
    return users.find(user => user.email === email);
  },

  // Find user by ID
  findById: (id) => {
    return users.find(user => user.id === parseInt(id));
  },

  // Get all users (without passwords)
  getAll: () => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    }));
  },

  // Check if email exists
  emailExists: (email) => {
    return users.some(user => user.email === email);
  }
};

module.exports = userModel;
