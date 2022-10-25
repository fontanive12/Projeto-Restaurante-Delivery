module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', 
    [
      {
        name: "Mateus",
        password: "12345",
        email: "mateus@mateus.com",
        age: 24,
        sex: "M",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('users', null, {}),
};