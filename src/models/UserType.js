const userType = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    typeName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: {
          msg: 'Category name is required.'
        },
        isAlpha: {
          msg: 'Category can only be a string.'
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  // eslint-disable-next-line no-unused-vars
  UserType.associate = (models) => {
  };
  return UserType;
};
export default userType;
