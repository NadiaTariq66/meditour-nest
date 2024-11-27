
import {CreateServiceDto} from './dto/service.dto.js'
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Services } from '../schemas/services/service.schema';;
import { Model } from "mongoose";



@Injectable()
export class ServicesService {
    constructor(
        @InjectModel(Services.name) private servicesModel:Model<Services>
         
    ){}
    async addProduct(createServiceDto: CreateServiceDto) {
       
        try {
          const { product, price, description} = createServiceDto;
      
          const newService= new this.servicesModel({
            product,
            price,
            description
    
          });
      
          // Save user to DB
       const products=   await newService.save();
       return { message: 'Services created successfully',
        products:products,
 
       }; // Add meaningful response
    } catch (error) {
      console.error('Error in signup:', error.message);
      throw new Error('An error occurred while creating the product');
    }
  }
      async getAllProducts (page: number, limit: number){
        try {
          // Fetch all products
           // Fetch the paginated products from the database
      const skip = (page - 1) * limit; // Example of using pagination
          const products = await this.servicesModel.find().skip(skip).limit(limit).exec();
          
      // Get the total number of products to calculate total pages
      const totalCount = await this.servicesModel.countDocuments().exec();
      const totalPages = Math.ceil(totalCount / limit);
 
          return{ products,totalPages,totalCount,currentPage: page,
            pageSize: limit};
        } catch (error) {
          console.error('Error fetching products:', error.message);
          throw new Error('An error occurred while fetching products');
        }
      }

      async getProduct(id:string){
        try {

          const productDetail = await this.servicesModel.findById(id);
          console.log(productDetail)
 
          return productDetail
        } catch (error) {
          console.error('Error fetching products:', error.message);
          throw new Error('An error occurred while fetching products');
        }
      }

       async updateProduct(id:string, updateServiiceDto: CreateServiceDto){
        try {
          const { product, price, description} = updateServiiceDto;
      
          const updateProduct= new this.servicesModel({
            product,
            price,
            description
    
          }, { new: true, runValidators: true } );
      
         // If no product found, throw an error
    if (!updateProduct) {
      throw new Error('Product not found');
    }

    return updateProduct; // Return the updated product
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw new Error('An error occurred while updating the product');
  }
}
async deleteProduct(id:string){
  try {

    const deletedProduct = await this.servicesModel.findByIdAndDelete(id);
    console.log(deletedProduct)

    return {deletedProduct}
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw new Error('An error occurred while fetching products');
  }

}}
