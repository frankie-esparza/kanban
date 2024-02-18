create or replace function extr( tabname text ) returns text[] as
$$

declare cols text[];

begin
    SELECT array(SELECT column_name::text FROM information_schema.columns
      WHERE table_name = tabname) INTO cols;
    return cols;
end;
$$
language 'plpgsql';
