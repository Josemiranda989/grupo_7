module.exports = (sequelize, DataTypes) => {

    let alias = 'Category';
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false

        },
        activityName: {
            type: DataTypes.STRING(100),
            allowNull: false

        },
    };
    let config = {
        tableName: 'categories',
        timestamps: false
    };
    const Category = sequelize.define(alias, cols, config);

    return Category;
};