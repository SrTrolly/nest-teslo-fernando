import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { initialData } from './data/seed-data';


@Injectable()
export class SeedService {

  constructor(
    private productsService: ProductsService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }


  async runSeed() {

    await this.insertNewProducts();
    return "SEED EXECUTED"
  }


  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;

    const insertPromises = [];

    products.forEach(product => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }


}
