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
    },
    description: {
      type: 'text',
      nullable: true,
    },
    category: {
      type: 'varchar',
      nullable: true,
    },
  },
});
