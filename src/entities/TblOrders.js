import { EntitySchema } from 'typeorm';

export const TblOrders = new EntitySchema({
  name: 'TblOrders',
  tableName: 'tbl_orders',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    customerName: {
      type: 'varchar',
    },
    custPhoneNumber: {
      type: 'varchar',
      length: 15,
    },
    cartItems: {
      type: 'text',
    },
    totalPrice: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    selectedDate: {
      type: 'date',
    },
    selectedTime: {
      type: 'time',
    },
    shopID: {
      type: 'varchar',
      nullable: true,
    },
    shopkeeperName: {
      type: 'varchar',
      nullable: true,
    },
    shopkeeperPhonenumber: {
      type: 'varchar',
      length: 15,
    },
    created_at: {
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
});
