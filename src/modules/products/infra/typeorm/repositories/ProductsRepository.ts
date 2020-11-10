import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      name, 
      price, 
      quantity
    })

    await this.ormRepository.save(product)

    return product
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.find({
      where:{name}
    })

    return product[0]
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product=> product.id)
  
    const foundProducts = await this.ormRepository.find({
      where:{
        id: In(productsIds)
      }
    })  

    return foundProducts
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    // const productsIds = products.map(product=> product.id)
    // const allProducts = await this.ormRepository.find()

    // allProducts.map(product=>{
    //   const index = productsIds.findIndex(item=>product.id === item)
      
    //   if(index > 0){
    //     const updatedProduct = Object.assign(product, {
    //       quantity: products[index].quantity
    //     })
    //     return updatedProduct
    //   }

    //   return product
    // })

    // return allProducts
    return await this.ormRepository.save(products)
  }
}

export default ProductsRepository;
