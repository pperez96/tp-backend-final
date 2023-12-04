import Sequelize from 'sequelize';

const sequelize = new Sequelize(
    'db_venta_de_productos',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

export default sequelize; 