import Sequelize from 'sequelize';
import sequelize from '../../config/conexion.js';

const Categoria = sequelize.define('categoria',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre:{
        type: Sequelize.TEXT
    }
}, {
    timestamps: false,
    tableName: 'categoria'
});

export default Categoria;