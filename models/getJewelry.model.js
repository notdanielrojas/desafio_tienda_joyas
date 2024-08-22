const format = require("pg-format");
const pool = require("./database.model");

const getJewelry = async ({ limits = 10, order_by = "id_ASC", page = 0 }) => {
  const [field, direction] = order_by.split("_");
  const offset = Math.abs(page - 1) * limits;
  const formattedQuery = format(
    `SELECT * FROM inventario ORDER BY %I %s LIMIT %s OFFSET %s`,
    field,
    direction,
    limits,
    offset
  );

  const { rows: joyas } = await pool.query(formattedQuery);
  return joyas;
};

const getJewelryByFilters = async ({
  precio_max,
  precio_min,
  categoria,
  metal,
}) => {
  let filters = [];
  let values = [];

  const addFilter = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = values;
    filters.push(`${campo} ${comparador} $${length}`);
  };

  if (precio_max) addFilter("precio", "<=", precio_max);
  if (precio_min) addFilter("precio", ">=", precio_min);
  if (categoria) addFilter("categoria", "=", categoria);
  if (metal) addFilter("metal", "=", metal);

  let consulta = "SELECT * FROM inventario";

  if (filters.length > 0) {
    consulta += ` WHERE ${filters.join(" AND ")}`;
  }

  const { rows: joyas } = await pool.query(consulta, values);
  return joyas;
};

const getHATEOAS = (joyas) => {
  const Stocktotal = joyas.reduce((acc, j) => acc + j.stock, 0);
  const results = joyas
    .map((j) => ({
      name: j.nombre,
      href: `/joyas/joya/${j.id}`,
    }))
    .slice(0, 4);

  return {
    total: joyas.length,
    Stocktotal,
    results,
  };
};

module.exports = { getJewelry, getJewelryByFilters, getHATEOAS };
