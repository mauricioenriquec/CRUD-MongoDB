import Producto from '../models/Producto.js'

class ProductoController {
  static async index(req, res) {
    try {
      const productos = await Producto.find()
      res.json(productos)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async find(req, res) {
    try {
      const { id } = req.params
      const producto = await Producto.findById(id)
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }
      res.json(producto)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async create(req, res) {
    try {
      const { nombre, categoria, precio, stock, vendedor, descuento, descontinuado } = req.body
      const newProduct = new Producto({
        nombre, categoria, precio, stock, vendedor, descuento, descontinuado
      })
      await newProduct.save()
      res.status(201).json(newProduct)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params
      const { nombre, categoria, precio, stock, vendedor, descuento, descontinuado } = req.body

      const productoActualizado = await Producto.findByIdAndUpdate(
        id,
        { nombre, categoria, precio, stock, vendedor, descuento, descontinuado },
        { new: true }
      )

      if (!productoActualizado) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      res.json(productoActualizado)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async partialUpdate(req, res) {
    try {
      const { id } = req.params
      const { nombre, categoria, precio, stock, vendedor, descuento, descontinuado } = req.body

      const productoActualizado = await Producto.findByIdAndUpdate(
        id,
        { nombre, categoria, precio, stock, vendedor, descuento, descontinuado },
        { new: true }
      )

      if (!productoActualizado) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }

      res.json(productoActualizado)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const productoEliminado = await Producto.findByIdAndDelete(id)
      if (!productoEliminado) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }
      res.json({ message: 'Producto eliminado correctamente' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default ProductoController
