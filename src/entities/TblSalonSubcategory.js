// src/entities/TblSalonSubcategory.js
import { EntitySchema } from 'typeorm';
import { Category } from './Category.js';

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
      length: 255,
    },
    categoryId: {
      type: 'int',
      name: 'category_id',
    },
  },
  relations: {
    category: {
      type: 'many-to-one',
      target: 'Category',
      inverseSide: 'subCategories',
      joinColumn: { name: 'category_id' },
    },
  },
});
