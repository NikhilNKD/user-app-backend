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
      unique: true,
    },
    shopkeeperName: {
      type: 'varchar',
      nullable: true,
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
    category: {
      type: 'varchar',
      nullable: true,
    },
    shopBanner: {
      type: 'varchar',
      nullable: true,
    },
    profilePicture: {
      type: 'varchar',
      nullable: true,
    },
    subCategory: {
      type: 'varchar',
      nullable: true,
    },
    shopID: {
      type: 'varchar',
      nullable: true,
      unique: true,
    },
    shopType: {
      type: 'enum',
      enum: ['general', 'service'],
      nullable: false,
    },
    deliverToHome: {
      type: 'varchar',
      length: 3,
      nullable: true,
    },
  },
});
