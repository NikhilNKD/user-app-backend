// entities/Shop.js
import { EntitySchema } from 'typeorm';

export const Shop = new EntitySchema({
  name: 'Shop',
  tableName: 'shops',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 100,
    },
    pincode: {
      type: 'varchar',
      length: 10,
    },
    // Add other shop fields here if needed
  },
});
