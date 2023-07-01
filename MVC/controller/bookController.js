const Response = require("../model/Response");
const httpStatus = require("http-status");
const query = require("../database/connect");
const bookValidator = require("../utils/bookValidator");
const { response } = require("express");

const getBooks = async (req, res) => {
  try {
    const sql = 'SELECT * FROM books';
    const rows = await query(sql);
    
    if (!rows || rows.length === 0) {
        const response = new Response.Error(true, "Cant Find Table")
        return res.status(httpStatus.BAD_REQUEST).json(response);
    } else {
        const data = rows.map((data)=>{
            const { id_book, title, price } = data
            return { id_book, title, price }
        })
        const response = new Response.Success(true, "Table Find", data)
        return res.status(httpStatus.OK).json(response);
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
};

const getBook = async (req,res) => {
    try {
        const { id } = req.params
        const sql = `SELECT * FROM books WHERE id_book = ${id} `;
        const rows = await query(sql)

        if (!rows || rows.length === 0) {
            const response = new Response.Error(true, "Cant Find Data")
            return res.status(httpStatus.BAD_REQUEST).json(response);
        } else {
            const response = new Response.Success(true, "Data Find", rows[0])
            return res.status(httpStatus.OK).json(response);
        }
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
    }
}

const insertBook = async (req, res) => {
    try {
      const addBook = await bookValidator.validateAsync(req.body);
      const { title, description, price, amount } = addBook;
      const sql = `INSERT INTO books (title, description, price, amount) VALUES (?,?,?,?)`;
      const values = [title, description, price, amount];
      await query(sql, values);
  
      const insertedData = {
        title,
        description,
        price,
        amount
      };
  
      const response = new Response.Success(false, "Success Insert Book", insertedData);
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      const response = new Response.Error(true, error.message);
      return res.status(httpStatus.BAD_REQUEST).json(response);
    }
  };

  const updateBook = async (req,res) =>{
    try {
      const { id } = req.params
      const { title, description, price, amount } = req.body

      let update = []
      let values = []

      if(title){
        update.push("title = ?")
        values.push(title)
      }

      if(description){
        update.push("description = ?")
        values.push(description)
      }

      if(price){
        update.push("price = ?")
        values.push(price)
      }

      if(amount){
        update.push("amount = ?")
        values.push(amount)
      }

      if(!id){
        const response = new Response.Error(true, "Cant Find Id")
        return res.status(httpStatus.BAD_REQUEST).json(response)
      }else{
        const sqlFindBook = "SELECT * FROM books WHERE id_book = ?";
        const book = await query(sqlFindBook, [id]);

        if (book.length === 0) {
          const response = new Response.Error(true, "Book not found");
          return res.status(httpStatus.BAD_REQUEST).json(response);
        }
        const updateString = update.join(", ")
        const sql = `UPDATE books SET ${updateString} WHERE id_book = ?`
        values.push(id)

        await query(sql,values)
        const updatedBook = { ...book[0], ...req.body };
        const response = new Response.Success(false, "Success Update Book", updatedBook);
        return res.status(httpStatus.OK).json(response);
      }
      
    } catch (error) {
      const response = new Response.Error(true, error.message);
      return res.status(httpStatus.OK).json(response);
    }
  }

  const deleteBook = async (req, res) => {
    try {
      const { id } = req.params;
      const sqlFindBook = `SELECT * FROM books WHERE id_book = ?`
      const book = await query(sqlFindBook, [id])

      if(book.length === 0){
        const response = new Response.Error(true, "Book not Found")
        return res.status(httpStatus.BAD_REQUEST).json(response)
      }else{
        const sql = `DELETE FROM books WHERE id_book = ?`;
        const values = [id];
        await query(sql, values);
        
        const response = new Response.Success(false, "Success Delete"); 
        return res.status(httpStatus.OK).json(response);
      }
      
    } catch (error) {
      const response = new Response.Error(true, error.message);
      return res.status(httpStatus.OK).json(response);
    }
  }
  

module.exports = { getBooks, getBook, insertBook, updateBook, deleteBook };
