import { EntitySchema } from 'typeorm';

export const TblSalonMainServices = new EntitySchema({
  name: 'TblSalonMainServices',
  tableName: 'tbl_salon_main_services',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      length: 255,
    },
    description: {
      type: 'varchar',
      length: 500,
    },
    subCategoryId: {
      type: 'int',
    },
  },
//  relations: {
//    subCategory: {
//      target: 'TblSalonSubcategory',
//      type: 'many-to-one',
//      joinColumn: {
//        name: 'sub_category_id',
//      },
//    },
//  },
});
