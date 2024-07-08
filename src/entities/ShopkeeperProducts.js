import { EntitySchema } from 'typeorm';

export const ShopkeeperProducts = new EntitySchema({
  name: 'ShopkeeperProducts',
  tableName: 'shopkeeper_products',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
    },
    productId: {
      type: 'int',
    },
  },
});
