import { EntitySchema } from 'typeorm';

export const Shopkeeper = new EntitySchema({
  name: 'Shopkeeper',
  tableName: 'shopkeepers',
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
    shopkeeperName: {
      type: 'varchar',
    },
    shopID: {
      type: 'varchar',
      nullable: true,
    },
    pincode: {
      type: 'varchar',
      nullable: true,
    },
    shopState: {
      type: 'varchar',
      nullable: true,
    },
    city: {
      type: 'varchar',
      nullable: true,
    },
    address: {
      type: 'text',
      nullable: true,
    },
    salesAssociateNumber: {
      type: 'varchar',
      length: 15,
      nullable: true,
    },
    selectedCategory: {
      type: 'varchar',
      nullable: true,
    },
    selectedSubCategory: {
      type: 'varchar',
      nullable: true,
    },
    deliverToHome: {
      type: 'varchar',
      length: 3,
      nullable: true,
    },
  },
});
