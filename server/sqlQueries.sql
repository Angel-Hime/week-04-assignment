CREATE TABLE feedback(
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR(255),
  secondname VARCHAR(255),
  comment TEXT,
  likes INT
);

INSERT INTO feedback (firstname, secondname, comment, likes) VALUES (
  'Annabel', 'Peart', 'This assignment is pretty mid but it works', 0
);