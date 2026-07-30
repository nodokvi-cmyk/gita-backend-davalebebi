import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  private productList = [
    { id: 1, price: 5000, name: "Iphone 17 Pro Max", category: "Electronic Device", description: "Latest model", quantity: 20},
    { id: 2, price: 4200, name: "Samsung Galaxy S26 Ultra", category: "Electronic Device", description: "Flagship smartphone with AI features", quantity: 15 },
    { id: 3, price: 6500, name: "MacBook Pro 16 M4", category: "Electronic Device", description: "Powerful laptop for professionals", quantity: 10 },
    { id: 4, price: 1200, name: "Sony WH-1000XM6", category: "Audio", description: "Premium noise-canceling headphones", quantity: 30 },
    { id: 5, price: 2800, name: "iPad Pro 13-inch", category: "Electronic Device", description: "Ultra-thin tablet with OLED display", quantity: 12 },
    { id: 6, price: 1800, name: "Dell XPS 13", category: "Electronic Device", description: "Compact and powerful ultrabook", quantity: 8 },
    { id: 7, price: 1500, name: "Apple Watch Ultra 3", category: "Wearables", description: "Rugged smartwatch for extreme adventures", quantity: 25 },
    { id: 8, price: 3200, name: "LG C4 OLED 55-inch", category: "TV & Video", description: "4K Smart TV with high refresh rate", quantity: 5 },
    { id: 9, price: 2200, name: "PlayStation 5 Pro", category: "Gaming", description: "Next-gen gaming console", quantity: 18 },
    { id: 10, price: 900, name: "Logitech MX Master 4 Bundle", category: "Accessories", description: "Ergonomic mouse and keyboard set", quantity: 40 }
  ]

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll(hasSubscription: boolean) {
    const products = this.productList
    
    if(hasSubscription === true){
      return products.map((p) => ({
        ...p,
        price: (p.price * 75) / 100
      }))
    }

    return products
  }

  findOne(id: number, hasSubscription: boolean) {
    const product = this.productList.find((p) => p.id === id)

    if(!product){
      throw new NotFoundException("Productn ot found")
    }

    if(hasSubscription){
      return {
        ...product,
        price: (product.price * 75) / 100
      }
    }
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
