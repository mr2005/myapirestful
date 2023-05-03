import { pool } from "../db/db.js";


export const getPropiedades = async (req, res) => {
    try {
      const [rows] = await pool.query("SELECT * FROM propiedades");
      res.json(rows);
    } catch (error) {
      return res.status(500).json({ message: "Algo no fue bien" });
    }
  };

  export const getPropiedad = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("SELECT * FROM propiedades WHERE id = ?", [
        id,
      ]);
  
      if (rows.length <= 0) {
        return res.status(404).json({ message: "Propiedad no encontrada" });
      }
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo no fue bien" });
    }
  };

  export const deletePropiedad = async (req, res) => {
    try {
      const { id } = req.params;
      const [rows] = await pool.query("DELETE FROM propiedades WHERE id = ?", [id]);
  
      if (rows.affectedRows <= 0) {
        return res.status(404).json({ message: "Propiedad no encontrada" });
      }
  
      res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: "Algo no fue bien" });
    }
  };

export const addPropiedad = async (req, res) => {
    try {
      const { titulo, precio, ano, categoria, direccion, descripcion } = req.body;
      const [rows] = await pool.query(
        "INSERT INTO propiedades (titulo, precio, ano, categoria, direccion, descripcion) VALUES (?, ?, ?, ?, ?, ?)",
        [titulo, precio, ano, categoria, direccion, descripcion ]
      );
      res.status(201).json({ id: rows.insertId, titulo, precio, ano, categoria, direccion, descripcion });
    } catch (error) {
      return res.status(500).json({ message: "Algo no fue bien" });
    }
  };

  export const updatePropiedad = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, precio, ano, categoria, direccion, descripcion } = req.body;
  
      const [result] = await pool.query(
        "UPDATE propiedades SET titulo = IFNULL(?, titulo), precio = IFNULL(?, precio), ano = IFNULL(?, ano), categoria = IFNULL(?, categoria),direccion = IFNULL(?, direccion), descripcion = IFNULL(?, descripcion) WHERE id = ?",
        [titulo, precio, ano, categoria, direccion, descripcion, id]
      );
  
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Propiedad no encontrada" });
  
      const [rows] = await pool.query("SELECT * FROM propiedades WHERE id = ?", [
        id,
      ]);
  
      res.json(rows[0]);
    } catch (error) {
      return res.status(500).json({ message: "Algo no fue bien" });
    }
  };
  
 
  
  export const methods = {
    getPropiedad,
    getPropiedades,
    addPropiedad,
    updatePropiedad,
    deletePropiedad
};
  