for file in $(find ./migs -name '*.sql' -type f); do
    {
        printf %s\\n 'BEGIN TRANSACTION;'
        cat "$file"
        printf %s\\n 'COMMIT;'
    } | sqlite3 "fuck-idealni-najemnik.sqlite" 2> "migrationerr.log"
 
done