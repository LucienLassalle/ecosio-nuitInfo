INSERT INTO question (questionLabel, questionExplication) VALUES
	("Quel moyen de transport consomme le plus par passager ?", "L'avion consomme de 145 à 285 g de CO2/km/passager"),
	("Quel pourcentage de consommation d'eau représente le domaine du nucléaire ?", "Le nucléaire représente 30% de la consommation d'eau douce française"),
	("Quel domaine est le plus gros générateur de Co2 dans le monde ?", "Le domaine de l'électricité représente 41% de la génération de Co2 dans le monde"),
	("Quel domaine est le plus gros générateur de Co2 en France ?", "Le domaine du transort représente 41% de la génération de Co2 en France"),
	("Sur combien d'années s'évaluent les variations du climat ?", "Il ne faut pas confondre climat et météo ! La météo renvoie au « temps qu’il fait », à un instant donné ou sur une courte période (une journée, une semaine, etc.). Le climat, en revanche, s’étudie sur des périodes d’au moins 30 ans"),
	("Qu'est ce qu'un climatoscpetique ?", "Nous essayons fermement de prouver aux climatoscpetiques que le réchauffement climatique est bien réel, et qu'il met en danger notre futur"),
	("Quelle est la différence de température sur le globe entre le XIX siècle et aujourd'hui ?", "Croire qu’un changement de quelques degrés n’a pas de conséquences, c’est confondre climat et météo ! Si un écart de quelques degrés au cours d’une journée est un phénomène quotidien quand on parle de météo, c’est en revanche d’un réel bouleversement lorsqu’il s’agit du climat mondial"),
	("Est-il trop tard pour agir contre le réchauffement climatique ?", "Ce n’est jamais trop tard : plus le réchauffement sera élevé, plus les conséquences seront graves. Il faut agir pour limiter le plus possible cette hausse des températures !");

SELECT questionId INTO @transport FROM question WHERE questionLabel = "Quel moyen de transport consomme le plus par passager ?";
SELECT questionId INTO @consommation_eau FROM question WHERE questionLabel = "Quel pourcentage de consommation d'eau représente le domaine du nucléaire ?";
SELECT questionId INTO @generateur_co2_monde FROM question WHERE questionLabel = "Quel domaine est le plus gros générateur de Co2 dans le monde ?";
SELECT questionId INTO @generateur_co2_france FROM question WHERE questionLabel = "Quel domaine est le plus gros générateur de Co2 en France ?";
SELECT questionId INTO @variation_climat FROM question WHERE questionLabel = "Sur combien d'années s'évaluent les variations du climat ?";
SELECT questionId INTO @climatosceptique FROM question WHERE questionLabel = "Qu'est ce qu'un climatoscpetique ?";
SELECT questionId INTO @difference_temperature FROM question WHERE questionLabel = "Quelle est la différence de température sur le globe entre le XIX siècle et aujourd'hui ?";
SELECT questionId INTO @agir FROM question WHERE questionLabel = "Est-il trop tard pour agir contre le réchauffement climatique ?";

INSERT INTO answer (answerLabel, answerBinary, questionId) VALUES 
	("La voiture", 0, @transport),
	("Le bateau", 0, @transport),
	("L'avion", 1, @transport),
	
	("10%", 0, @consommation_eau),
	("30%", 1, @consommation_eau),
	("40%", 0, @consommation_eau),
	
	("L'électricité", 1, @generateur_co2_monde),
	("Le transport", 0, @generateur_co2_monde),
	("Le résidentiel", 0, @generateur_co2_monde),
	
	("L'électricité", 0, @generateur_co2_france),
	("Le transport", 1, @generateur_co2_france),
	("Le résidentiel", 0, @generateur_co2_france),
	
	("3 ans", 0, @variation_climat),
	("5 ans", 0, @variation_climat),
	("30 ans", 1, @variation_climat),
	
	("Quelqu'un qui ne croit pas au climat", 0, @climatosceptique),
	("Quelqu'un qui remet en cause les thèses du changement climatique", 1, @climatosceptique),
	("Quelqu'un qui ne croit pas en le dieu Climatos", 0, @climatosceptique),
	
	("La température à augmentée de 1,1°C", 1, @difference_temperature),
	("La température à baissée de 1,1°C", 0, @difference_temperature),
	("La température n'a pas changée", 0, @difference_temperature),
	
	("Oui", 0, @agir),
	("Non", 1, @agir),
	("Cela dépend de beaucoup de choses", 0, @agir);
