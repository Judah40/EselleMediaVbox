export type Users = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    username: string;
    dateOfBirth:  string;
    gender: "Male" | "Female";
    address: string;
    role: "Admin" | "User";
    phoneNumber: string;
    profile_picture: string;
    isActive: boolean;
    isDeleted: boolean;
  };


//   firstName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   middleName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   lastName: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   dateOfBirth: {
//     type: Sequelize.DATEONLY,
//     allowNull: false,
//   },

//   gender: {
//     type: Sequelize.ENUM("Male", "Female"),
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   address: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   role: {
//     type: Sequelize.ENUM("Admin", "User"),
//     allowNull: false,
//     defaultValue: "User",
//   },
//   phoneNumber: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   profile_picture: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   otp: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
//   isActive: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
//   isDeleted: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },