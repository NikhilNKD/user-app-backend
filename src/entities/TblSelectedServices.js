import { EntitySchema } from 'typeorm';

export const TblSelectedServices = new EntitySchema({
  name: 'TblSelectedServices',
  tableName: 'tbl_selected_services',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    phoneNumber: {
      type: 'varchar',
      length: 15,
    },
    mainServiceId: {
      type: 'int',
    },
    subServiceId: {
      type: 'int',
      nullable: true,
    },
    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: true,
    },
  },
});
