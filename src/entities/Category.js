import { EntitySchema } from 'typeorm';

export const Category = new EntitySchema({
  name: 'Category',
  tableName: 'category',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    type: {
      type: 'varchar',
    },
  },
});
