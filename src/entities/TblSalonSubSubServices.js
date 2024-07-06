import { EntitySchema } from 'typeorm';

export const TblSalonSubSubServices = new EntitySchema({
  name: 'TblSalonSubSubServices',
  tableName: 'tbl_salon_sub_sub_services',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
    },
    main_service_id: {
      type: 'int',
    },
  },
});
