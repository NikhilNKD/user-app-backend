import { EntitySchema } from 'typeorm';

export const TblProductMaster = new EntitySchema({
  name: 'TblProductMaster',
  tableName: 'tbl_product_master',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    main_category: {
      type: 'varchar',
    },
    product_name: {
      type: 'varchar',
    },
    brand_name: {
      type: 'varchar',
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    weight: {
      type: 'varchar',
    },
    picture_path: {
      type: 'varchar',
    },
  },
});
