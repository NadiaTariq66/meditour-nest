
import{CreateServiceDto} from './dto/service.dto.js';
import { ServicesService } from './services.service.js';
import { Controller, Post, Body, Param,Get,Query,Patch,Delete } from '@nestjs/common';



@Controller('services')
export class ServicesController {

  constructor(private readonly ServicesService: ServicesService) {}

  @Post('addProduct')
  async addProduct(@Body() createServiceDto: CreateServiceDto) {
    try {
      const result = await this.ServicesService.addProduct(createServiceDto);
      return {
        statusCode: 201,  // Status code for Created
        message: result.message,
        products: result.products,
      };
    } catch (error) {
      return {
        statusCode: 400,  // Bad Request
        message: error.message,
      };
    }
  }




  @Get('getAllProducts')
  async getAllProducts(@Query('page') page = 1, @Query('limit') limit = 10,createServiceDto){
    try{
       // Ensure page and limit are numbers and handle defaults if not provided
       const pageNumber = 10;
      //  const pageSize = 10;
      const product = await this.ServicesService.getAllProducts(createServiceDto,pageNumber);
      return {
        statusCode: 200,
        message: 'Products retrieved successfully',
        products: product,  // The array of all product data
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message || 'An error occurred while fetching products',
      };
    }
  }


  @Get('getProduct/:id')

  async getProduct(@Param('id') id: string){
    try{
  const productDetail= await  this.ServicesService.getProduct(id);
  if (!productDetail) {
    throw new Error('Product not found');
  }
    return productDetail
  }
catch (error) {
  return {
    statusCode: 400,
    message: error.message || 'An error occurred while fetching products',
  };
}
}

 @Patch('updateProduct/:id')
 

 async updateProduct(@Param('id') id: string, @Body() updateProductDto: CreateServiceDto) {

  try {
    const updatedProduct = await this.ServicesService.updateProduct(id, updateProductDto);
    return {
      statusCode: 200, // Success status code
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  } catch (error) {
    return {
      statusCode: 400, // Bad Request
      message: error.message || 'An error occurred while updating the product',
    };
  }
}

@Delete('deleteProduct:id')

  async deleteProduct( @Param('id') id:string){

    try{
      const deletedProduct = await this.ServicesService.deleteProduct(id);

      if (!deletedProduct) {
        return {
          statusCode: 404, // Not Found
          message: 'Product not found or already deleted',
        };
      }
      return {
        statusCode: 200, // Success
        message: 'Product deleted successfully',
        product: deletedProduct,
      };
    } catch (error) {
      return {
        statusCode: 400, // Bad Request
        message: error.message || 'An error occurred while deleting the product',
      };
    }
  }
}
