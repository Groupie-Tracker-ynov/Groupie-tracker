DB_FILE="./grptracker.db"

QUERY="SELECT COUNT(*) FROM Artiste;"

COUNT=$(sqlite3 "$DB_FILE" "$QUERY")

echo "Nombre de lignes dans la table 'Artiste' : $COUNT"
        