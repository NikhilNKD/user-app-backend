import { EntitySchema } from 'typeorm';
import { Shopkeeper } from './Shopkeeper.js'; // Ensure this path is correct

export const ShopkeeperService = new EntitySchema({
  name: 'ShopkeeperService',
  tableName: 'shopkeeper_services',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    serviceName: {
      type: 'varchar',
      length: 255,
    },
    description: {
      type: 'varchar',
      length: 500,
      nullable: true,
    },
    serviceType: {
    //   type: 'enum',
    //   enum: ['Men', 'Women', 'Unisex'],
    type: 'varchar',  
    length: 255, 
    },
    price: {
        type: 'decimal',
    },
    shopID: {
        type: 'varchar',  
        nullable: true
    },
  },
  relations: {
    shopkeeper: {
      target: Shopkeeper,
      type: 'many-to-one',
      joinColumn: { name: 'shopID' },
      // No inverseSide is needed as we're not defining the relationship in the Shopkeeper table
      onDelete: 'SET NULL', // Optionally set to 'SET NULL' to handle deletions
    },
  },
});
