// entities/SubCategory.js
import { EntitySchema } from 'typeorm';

export const SubCategory = new EntitySchema({
  name: 'SubCategory',
  tableName: 'tbl_salon_subcategory',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    category_id: {
      type: 'int',
    },
    name: {
      type: 'varchar',
      length: 100,
    },
  },
});
