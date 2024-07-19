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
    subCategory: {
      type: 'varchar',
      length: 255,
      name: 'sub_category',
    },
  },
  //relations: {
  //  category: {
  //    type: 'many-to-one',
  //    target: 'Category',
  //    joinColumn: { name: 'category_id' },
  //  },
  //},
});
