const {
   mmb_ge_mm3,
   mmb_ge_mm4,
   mmb_siemens,
   mmb_siemens_non_tim,
   mmb_edu2,
} = require('../parse/_helpers/pg-schemas');
const pgp = require('pg-promise')();

const pg_tables = {
   ge: {
      mm3: new pgp.helpers.TableName({
         table: 'ge_mm3',
         schema: 'mag',
      }),
      mm4: new pgp.helpers.TableName({
         table: 'ge_mm4',
         schema: 'mag',
      }),
   },
   siemens: {
      default: new pgp.helpers.TableName({
         table: 'siemens',
         schema: 'mag',
      }),
      non_tim: new pgp.helpers.TableName({
         table: 'siemens_non_tim',
         schema: 'mag',
      }),
   },
   edu: {
      v1: new pgp.helpers.TableName({ table: 'v1', schema: 'edu' }),
      v2: new pgp.helpers.TableName({ table: 'v2', schema: 'edu' }),
   },
};

const pg_column_sets = {
   ge: {
      mm3: new pgp.helpers.ColumnSet(Object.keys(mmb_ge_mm3), {
         table: pg_tables.ge.mm3,
      }),
      mm4: new pgp.helpers.ColumnSet(Object.keys(mmb_ge_mm4), {
         table: pg_tables.ge.mm4,
      }),
   },
   siemens: {
      default: new pgp.helpers.ColumnSet(Object.keys(mmb_siemens), {
         table: pg_tables.siemens.default,
      }),
      non_tim: new pgp.helpers.ColumnSet(Object.keys(mmb_siemens_non_tim), {
         table: pg_tables.siemens.non_tim,
      }),
   },
   edu: {
      // v1: new pgp.helpers.ColumnSet(Object.keys(mmb_edu2), {
      //    table: pg_tables.edu.v1,
      // }),
      v2: new pgp.helpers.ColumnSet(Object.keys(mmb_edu2), {
         table: pg_tables.edu.v2,
      }),
   },
};

module.exports = pg_column_sets;
