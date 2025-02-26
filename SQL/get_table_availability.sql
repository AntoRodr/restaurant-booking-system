SELECT 
  floor, 
  COUNT(*) AS total_tables,
  SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) AS available_tables,
  SUM(CASE WHEN status = 'reserved' THEN 1 ELSE 0 END) AS reserved_tables,
  SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) AS occupied_tables
FROM tables
GROUP BY floor;
