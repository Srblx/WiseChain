--? Return all course without sequences
SELECT c.id, c.main_title
FROM Course c
LEFT JOIN Sequence s ON c.id = s.course_id
WHERE s.id IS NULL;

--? Return all courses with your sequences
SELECT c.id AS course_id, c.main_title, c.description, s.id 
AS sequence_id, s.index, s.title 
AS sequence_title, s.containt 
FROM Course c 
INNER JOIN Sequence s ON c.id = s.course_id 
ORDER BY c.main_title, s.index;

--& Drop course by id 
DELETE FROM Sequence 
WHERE course_id = 'e6f817d7-3933-11ef-85a9-0242ac170002';

--~ Add new article with course 
-- Insérer l'article principal
SET @article_id2 = UUID();

INSERT INTO Article (id, title, summary, img, created_at, user_id, category_id)
VALUES (
  @article_id2,
  'Crypto : La SEC clôture l\'enquête sur le BUSD sans sanctions, annonce Paxos !',
  'La nouvelle est tombée comme un coup de tonnerre dans la sphère crypto : la SEC a officiellement mis fin à son enquête sur le stablecoin BUSD sans prendre de mesures coercitives. Paxos, l’émetteur du stablecoin, a annoncé cette nouvelle avec un soupir de soulagement.',
  'inDB/article/sec-busd.jpg',
  NOW(),
  'clye24ujy0000mim75lco2jnd',
  '985eca76-3dc2-11ef-b3fd-0242ac140002'
);

-- Insérer les séquences de l'article
INSERT INTO SequenceArticle (id, `index`, title, containt, img, article_id)
VALUES
  (UUID(), 28, 'La fin d’une enquête crypto surveillée de près', 'La SEC a récemment clôturé son enquête sur le BUSD, un stablecoin émis par Paxos en partenariat avec Binance. L’annonce a été faite jeudi par Paxos, signalant la fin de mois de spéculation et d’incertitude.', NULL, @article_id2),
  (UUID(), 29, 'Les enjeux réglementaires du BUSD', 'Le BUSD, stablecoin adossé au dollar américain, a vu sa capitalisation boursière atteindre des sommets avant que les régulateurs ne s’en mêlent.', NULL, @article_id2),
  (UUID(), 30, 'L’avenir des Stablecoins après la décision de la SEC', 'La décision de la SEC de clore l’enquête sans sanctions ouvre la voie à une nouvelle ère pour les stablecoins. Paxos a exprimé son optimisme quant à l’adoption future de ces actifs par les grandes entreprises mondiales.', NULL, @article_id2);