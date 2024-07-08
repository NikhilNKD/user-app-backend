import { EntitySchema } from 'typeorm';

export const TblSalonSubcategory = new EntitySchema({
  name: 'TblSalonSubcategory',
  tableName: 'tbl_salon_subcategory',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    category_id: {
      type: 'int',
    },
  },
});
